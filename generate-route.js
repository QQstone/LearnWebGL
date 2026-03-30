#!/usr/bin/env node

// ESM imports
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 配置路径
const cwd = process.cwd();
const PAGES_DIR = path.resolve(cwd, 'src', 'pages');
const ROUTES_FILE = path.resolve(cwd, 'src', 'routes', 'sections.tsx');
const NAV_CONFIG_FILE = path.resolve(cwd, 'src', 'layouts', 'config-nav-dashboard.tsx');
const TEMPLATE_FILE = path.resolve(__dirname, 'templates', 'three-cube-page.tsx');

// 工具函数
function kebabToTitle(str) {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

function kebabToPascal(str) {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
}

function sanitizePath(input) {
    if (input.includes('..') || input.includes(':') || input.startsWith('/')) {
        throw new Error('Invalid route path: contains unsafe characters.');
    }
    return input.replace(/^\/+|\/+$/g, '');
}

async function ensureDir(dir) {
    try {
        await fs.access(dir);
    } catch {
        await fs.mkdir(dir, { recursive: true });
    }
}

function logSuccess(msg) {
    console.log('\x1b[32m✓\x1b[0m', msg);
}

function logError(msg) {
    console.error('\x1b[31m✗\x1b[0m', msg);
    process.exit(1);
}

function showHelp() {
    console.log(`
Usage: node generate-route.js <route-path>

Examples:
  node generate-route.js user-profile
  node generate-route.js three-js/cube-demo
`);
    process.exit(0);
}

// 主函数
async function main() {
    const args = process.argv.slice(2);

    if (args.includes('-h') || args.includes('--help') || args.length === 0) {
        showHelp();
    }

    let rawRoute = args[0];
    try {
        rawRoute = sanitizePath(rawRoute);
    } catch (e) {
        logError(e.message);
    }

    const routeParts = rawRoute.split('/');
    const lastPart = routeParts[routeParts.length - 1];
    const componentDir = path.join(PAGES_DIR, ...routeParts);
    const componentFile = path.join(componentDir, 'index.tsx');

    // 检查组件是否已存在
    try {
        await fs.access(componentFile);
        logError(`Component already exists: ${componentFile}`);
    } catch { }

    const componentName = kebabToPascal(lastPart);
    const readableName = kebabToTitle(lastPart);
    const routePath = rawRoute;

    // 读取并写入组件模板
    let templateContent;
    try {
        templateContent = await fs.readFile(TEMPLATE_FILE, 'utf8');
    } catch (err) {
        logError(`Template file not found: ${TEMPLATE_FILE}\nPlease create it in your project root: templates/three-cube-page.tsx`);
    }

    templateContent = templateContent
        .replace(/{{COMPONENT_NAME}}/g, componentName)
        .replace(/{{READABLE_NAME}}/g, readableName);

    await ensureDir(componentDir);
    await fs.writeFile(componentFile, templateContent.trim() + '\n', 'utf8');
    logSuccess(`Created component: ${componentFile}`);

    // 更新路由和导航
    await updateRoutesFile(routePath, rawRoute, componentName);
    await updateNavConfigFile(routePath, readableName);

    console.log('\n🎉 Route generation completed successfully!');
}

// 更新 routes/sections.tsx：支持 useRoutes + children 结构
async function updateRoutesFile(routePath, rawRoute, componentName) {
  let content;
  try {
    content = await fs.readFile(ROUTES_FILE, 'utf8');
  } catch {
    logError(`Routes file not found: ${ROUTES_FILE}`);
  }

  // 防重复
  if (content.includes(`export const ${componentName}Page =`)) {
    logError(`Component ${componentName}Page already defined.`);
  }
  if (content.includes(`path: '${routePath}'`)) {
    logError(`Route path already registered: ${routePath}`);
  }

  // === 第一步：添加 lazy export ===
  const lazyExportRegex = /export\s+const\s+\w+Page\s*=\s*lazy\s*\(\s*\(\)\s*=>\s*import\s*\([^)]+\)\s*\)\s*;/g;
  let lastExportEnd = -1;
  let match;
  while ((match = lazyExportRegex.exec(content)) !== null) {
    lastExportEnd = match.index + match[0].length;
  }

  if (lastExportEnd === -1) {
    logError(`No lazy page exports found in ${ROUTES_FILE}.`);
  }

  const newExport = `\nexport const ${componentName}Page = lazy(() => import('src/pages/${rawRoute}'));`;
  content = content.slice(0, lastExportEnd) + newExport + content.slice(lastExportEnd);

  // === 第二步：插入到 children 数组末尾 ===
  const childrenStartMatch = /children:\s*\[/g.exec(content);
  if (!childrenStartMatch) {
    logError(`Cannot find 'children: [' in ${ROUTES_FILE}.`);
  }

  const startIndex = childrenStartMatch.index + childrenStartMatch[0].length;
  let depth = 1;
  let pos = startIndex;

  while (pos < content.length && depth > 0) {
    const char = content[pos];
    if (char === '[') depth++;
    else if (char === ']') depth--;
    pos++;
  }

  if (depth !== 0) {
    logError(`Unmatched brackets in children array.`);
  }

  let insertPosition = pos - 1;
  const beforeInsert = content.slice(0, insertPosition).trimEnd();
  const needsComma = !beforeInsert.endsWith(',');

  if (needsComma) {
    let i = insertPosition - 1;
    while (i >= 0 && /\s/.test(content[i])) i--;
    if (i >= 0 && content[i] !== ',') {
      content = content.slice(0, i + 1) + ',' + content.slice(i + 1);
      insertPosition = i + 2;
    }
  }

  const indent = '        ';
  const newRoute = `\n${indent}{ path: '${routePath}', element: <${componentName}Page /> },`;
  const updatedContent = content.slice(0, insertPosition) + newRoute + content.slice(insertPosition);

  await fs.writeFile(ROUTES_FILE, updatedContent, 'utf8');
  logSuccess(`Updated routes and added lazy component: ${ROUTES_FILE}`);
}

// 更新导航配置
async function updateNavConfigFile(routePath, readableName) {
    let content;
    try {
        content = await fs.readFile(NAV_CONFIG_FILE, 'utf8');
    } catch {
        logError(`Nav config file not found: ${NAV_CONFIG_FILE}`);
    }

    if (content.includes(`href: '${routePath}'`)) {
        logError(`Nav item already exists: ${routePath}`);
    }

    const insertMarker = /(\s*\]\s*;?\s*$)/m;
    if (!insertMarker.test(content)) {
        logError(`Cannot find nav items array end in ${NAV_CONFIG_FILE}`);
    }

    const newItem = `
  {
    title: '${readableName}',
    path: '${routePath}',
    icon: icon('ic-analytics'),
  },`;

    const updatedContent = content.replace(insertMarker, `${newItem}$1`);
    await fs.writeFile(NAV_CONFIG_FILE, updatedContent, 'utf8');
    logSuccess(`Updated nav config: ${NAV_CONFIG_FILE}`);
}

// 执行
main().catch(err => {
    console.error('Unexpected error:', err);
    process.exit(1);
});