import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'User',
    path: '/user',
    icon: icon('ic-user'),
  },
  {
    title: 'Product',
    path: '/products',
    icon: icon('ic-cart'),
    info: (
      <Label color="error" variant="inverted">
        +3
      </Label>
    ),
  },
  {
    title: 'Blog',
    path: '/blog',
    icon: icon('ic-blog'),
  },
  {
    title: 'Laboratory',
    path: '/laboratory',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Graphic',
    path: '/graphic',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Three.js',
    path: '/threeJS',
    icon: icon('ic-analytics'),
  },
   {
    title: 'Geometry',
    path: '/geometry',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Texture',
    path: '/texture',
    icon: icon('ic-analytics'),
  },
  // {
  //   title: 'Sign in',
  //   path: '/sign-in',
  //   icon: icon('ic-lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic-disabled'),
  // },
  {
    title: 'Shader Basic',
    path: 'shader-basic',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Robot',
    path: 'robot',
    icon: icon('ic-analytics'),
  },
];
