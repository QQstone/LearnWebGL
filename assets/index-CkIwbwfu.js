import{r as ve,j as We}from"./index-BYSi3_To.js";import{T as Je,g as ge,h as De,L as Ze,i as Q,F as He,b as z,j as H,k as Qe,l as et,m as tt,f as q,n as ee,o as P,V as Pe,a as K,p as nt,q as st,O as $e,r as Ge,s as it,B as le,t as rt,u as te,v as Ue,w as _e,N as Be,x as ot,y as ce,z as at,E as j,G as lt,H as ct,J as ht,K as ut,M as xe,Q as dt,U as pt,X as ft,d as mt,Y as he,P as Ve,Z as k,_ as gt,$ as _t,a0 as xt,a1 as Tt,a2 as je,a3 as Re,a4 as oe,a5 as Ke,a6 as Et,a7 as wt,a8 as bt,a9 as yt,aa as At,ab as vt,ac as Rt,ad as Lt,ae as Te,af as Le,ag as Se,ah as Me,ai as ze,aj as St,ak as Mt,al as Ct,am as se,an as ue,ao as ie,S as It,W as Ft,ap as Nt}from"./three.module-CxX1q5Pt.js";import{O as Ot}from"./OrbitControls-4AIfLTr_.js";/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class D{constructor(e,t,n,s,r="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),D.nextNameID=D.nextNameID||0,this.$name.id=`lil-gui-name-${++D.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",i=>i.stopPropagation()),this.domElement.addEventListener("keyup",i=>i.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("lil-disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class kt extends D{constructor(e,t,n){super(e,t,n,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Ee(u){let e,t;return(e=u.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=u.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=u.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}const Dt={isPrimitive:!0,match:u=>typeof u=="string",fromHexString:Ee,toHexString:Ee},ne={isPrimitive:!0,match:u=>typeof u=="number",fromHexString:u=>parseInt(u.substring(1),16),toHexString:u=>"#"+u.toString(16).padStart(6,0)},Ht={isPrimitive:!1,match:u=>Array.isArray(u)||ArrayBuffer.isView(u),fromHexString(u,e,t=1){const n=ne.fromHexString(u);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([u,e,t],n=1){n=255/n;const s=u*n<<16^e*n<<8^t*n<<0;return ne.toHexString(s)}},Pt={isPrimitive:!1,match:u=>Object(u)===u,fromHexString(u,e,t=1){const n=ne.fromHexString(u);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:u,g:e,b:t},n=1){n=255/n;const s=u*n<<16^e*n<<8^t*n<<0;return ne.toHexString(s)}},$t=[Dt,ne,Ht,Pt];function Gt(u){return $t.find(e=>e.match(u))}class Ut extends D{constructor(e,t,n,s){super(e,t,n,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Gt(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const r=Ee(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class de extends D{constructor(e,t,n){super(e,t,n,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Bt extends D{constructor(e,t,n,s,r,i){super(e,t,n,"lil-number"),this._initInput(),this.min(s),this.max(r);const a=i!==void 0;this.step(a?i:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const t=()=>{let f=parseFloat(this.$input.value);isNaN(f)||(this._stepExplicit&&(f=this._snap(f)),this.setValue(this._clamp(f)))},n=f=>{const y=parseFloat(this.$input.value);isNaN(y)||(this._snapClampSetValue(y+f),this.$input.value=this.getValue())},s=f=>{f.key==="Enter"&&this.$input.blur(),f.code==="ArrowUp"&&(f.preventDefault(),n(this._step*this._arrowKeyMultiplier(f))),f.code==="ArrowDown"&&(f.preventDefault(),n(this._step*this._arrowKeyMultiplier(f)*-1))},r=f=>{this._inputFocused&&(f.preventDefault(),n(this._step*this._normalizeMouseWheel(f)))};let i=!1,a,o,l,h,c;const d=5,p=f=>{a=f.clientX,o=l=f.clientY,i=!0,h=this.getValue(),c=0,window.addEventListener("mousemove",x),window.addEventListener("mouseup",b)},x=f=>{if(i){const y=f.clientX-a,g=f.clientY-o;Math.abs(g)>d?(f.preventDefault(),this.$input.blur(),i=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(y)>d&&b()}if(!i){const y=f.clientY-l;c-=y*this._step*this._arrowKeyMultiplier(f),h+c>this._max?c=this._max-h:h+c<this._min&&(c=this._min-h),this._snapClampSetValue(h+c)}l=f.clientY},b=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",x),window.removeEventListener("mouseup",b)},T=()=>{this._inputFocused=!0},m=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",p),this.$input.addEventListener("focus",T),this.$input.addEventListener("blur",m)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const e=(m,f,y,g,S)=>(m-f)/(y-f)*(S-g)+g,t=m=>{const f=this.$slider.getBoundingClientRect();let y=e(m,f.left,f.right,this._min,this._max);this._snapClampSetValue(y)},n=m=>{this._setDraggingStyle(!0),t(m.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",r)},s=m=>{t(m.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",r)};let i=!1,a,o;const l=m=>{m.preventDefault(),this._setDraggingStyle(!0),t(m.touches[0].clientX),i=!1},h=m=>{m.touches.length>1||(this._hasScrollBar?(a=m.touches[0].clientX,o=m.touches[0].clientY,i=!0):l(m),window.addEventListener("touchmove",c,{passive:!1}),window.addEventListener("touchend",d))},c=m=>{if(i){const f=m.touches[0].clientX-a,y=m.touches[0].clientY-o;Math.abs(f)>Math.abs(y)?l(m):(window.removeEventListener("touchmove",c),window.removeEventListener("touchend",d))}else m.preventDefault(),t(m.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",c),window.removeEventListener("touchend",d)},p=this._callOnFinishChange.bind(this),x=400;let b;const T=m=>{if(Math.abs(m.deltaX)<Math.abs(m.deltaY)&&this._hasScrollBar)return;m.preventDefault();const y=this._normalizeMouseWheel(m)*this._step;this._snapClampSetValue(this.getValue()+y),this.$input.value=this.getValue(),clearTimeout(b),b=setTimeout(p,x)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",T,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",e),document.body.classList.toggle("lil-dragging",e),document.body.classList.toggle(`lil-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Vt extends D{constructor(e,t,n,s){super(e,t,n,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{const n=document.createElement("option");n.textContent=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}}class jt extends D{constructor(e,t,n){super(e,t,n,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Kt=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.lil-root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.lil-root > .lil-children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.lil-allow-touch-styles, .lil-gui.lil-allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.lil-force-touch-styles, .lil-gui.lil-force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.lil-auto-place, .lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-controller.lil-disabled {
  opacity: 0.5;
}
.lil-controller.lil-disabled, .lil-controller.lil-disabled * {
  pointer-events: none !important;
}
.lil-controller > .lil-name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-controller .lil-widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-controller.lil-string input {
  color: var(--string-color);
}
.lil-controller.lil-boolean {
  cursor: pointer;
}
.lil-controller.lil-color .lil-display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-controller.lil-color .lil-display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-controller.lil-color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-controller.lil-color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-controller.lil-option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-controller.lil-option .lil-display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-display.lil-focus {
    background: var(--focus-color);
  }
}
.lil-controller.lil-option .lil-display.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-option .lil-display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-controller.lil-option .lil-widget,
.lil-controller.lil-option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-widget:hover .lil-display {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number input {
  color: var(--number-color);
}
.lil-controller.lil-number.lil-has-slider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-controller.lil-number .lil-slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-controller.lil-number .lil-slider:hover {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number .lil-slider.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-number .lil-slider.lil-active .lil-fill {
  opacity: 0.95;
}
.lil-controller.lil-number .lil-fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-dragging * {
  cursor: ew-resize !important;
}
.lil-dragging.lil-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .lil-title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .lil-title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .lil-title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-dragging) .lil-gui .lil-title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .lil-title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.lil-root > .lil-title:focus {
  text-decoration: none !important;
}
.lil-gui.lil-closed > .lil-title:before {
  content: "▸";
}
.lil-gui.lil-closed > .lil-children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.lil-closed:not(.lil-transition) > .lil-children {
  display: none;
}
.lil-gui.lil-transition > .lil-children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .lil-children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.lil-root > .lil-children > .lil-gui > .lil-title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.lil-root > .lil-children > .lil-gui.lil-closed > .lil-title {
  border-bottom-color: transparent;
}
.lil-gui + .lil-controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .lil-title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .lil-children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .lil-controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .lil-controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .lil-controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .lil-controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .lil-controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAALkAAsAAAAABtQAAAKVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDMgqBBIEbATYCJAMUCwwABCAFhAoHgQQbHAbIDiUFEYVARAAAYQTVWNmz9MxhEgodq49wYRUFKE8GWNiUBxI2LBRaVnc51U83Gmhs0Q7JXWMiz5eteLwrKwuxHO8VFxUX9UpZBs6pa5ABRwHA+t3UxUnH20EvVknRerzQgX6xC/GH6ZUvTcAjAv122dF28OTqCXrPuyaDER30YBA1xnkVutDDo4oCi71Ca7rrV9xS8dZHbPHefsuwIyCpmT7j+MnjAH5X3984UZoFFuJ0yiZ4XEJFxjagEBeqs+e1iyK8Xf/nOuwF+vVK0ur765+vf7txotUi0m3N0m/84RGSrBCNrh8Ee5GjODjF4gnWP+dJrH/Lk9k4oT6d+gr6g/wssA2j64JJGP6cmx554vUZnpZfn6ZfX2bMwPPrlANsB86/DiHjhl0OP+c87+gaJo/gY084s3HoYL/ZkWHTRfBXvvoHnnkHvngKun4KBE/ede7tvq3/vQOxDXB1/fdNz6XbPdcr0Vhpojj9dG+owuSKFsslCi1tgEjirjXdwMiov2EioadxmqTHUCIwo8NgQaeIasAi0fTYSPTbSmwbMOFduyh9wvBrESGY0MtgRjtgQR8Q1bRPohn2UoCRZf9wyYANMXFeJTysqAe0I4mrherOekFdKMrYvJjLvOIUM9SuwYB5DVZUwwVjJJOaUnZCmcEkIZZrKqNvRGRMvmFZsmhP4VMKCSXBhSqUBxgMS7h0cZvEd71AWkEhGWaeMFcNnpqyJkyXgYL7PQ1MoSq0wDAkRtJIijkZSmqYTiSImfLiSWXIZwhRh3Rug2X0kk1Dgj+Iu43u5p98ghopcpSo0Uyc8SnjlYX59WUeaMoDqmVD2TOWD9a4pCRAzf2ECgwGcrHjPOWY9bNxq/OL3I/QjwEAAAA=") format("woff2");
}`;function zt(u){const e=document.createElement("style");e.innerHTML=u;const t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}let Ce=!1;class ae{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:s,title:r="Controls",closeFolders:i=!1,injectStyles:a=!0,touchStyles:o=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),o&&this.domElement.classList.add("lil-allow-touch-styles"),!Ce&&a&&(zt(Kt),Ce=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=i}add(e,t,n,s,r){if(Object(n)===n)return new Vt(this,e,t,n);const i=e[t];switch(typeof i){case"number":return new Bt(this,e,t,n,s,r);case"boolean":return new kt(this,e,t);case"string":return new jt(this,e,t);case"function":return new de(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,i)}addColor(e,t,n=1){return new Ut(this,e,t,n)}addFolder(e){const t=new ae({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof de||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof de)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("lil-transition");const n=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const s=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!e),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}}function Ie(u,e){if(e===Je)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),u;if(e===ge||e===De){let t=u.getIndex();if(t===null){const i=[],a=u.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)i.push(o);u.setIndex(i),t=u.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),u}const n=t.count-2,s=[];if(e===ge)for(let i=1;i<=n;i++)s.push(t.getX(0)),s.push(t.getX(i)),s.push(t.getX(i+1));else for(let i=0;i<n;i++)i%2===0?(s.push(t.getX(i)),s.push(t.getX(i+1)),s.push(t.getX(i+2))):(s.push(t.getX(i+2)),s.push(t.getX(i+1)),s.push(t.getX(i)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=u.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),u}class Xt extends Ze{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Zt(t)}),this.register(function(t){return new Qt(t)}),this.register(function(t){return new cn(t)}),this.register(function(t){return new hn(t)}),this.register(function(t){return new un(t)}),this.register(function(t){return new tn(t)}),this.register(function(t){return new nn(t)}),this.register(function(t){return new sn(t)}),this.register(function(t){return new rn(t)}),this.register(function(t){return new Jt(t)}),this.register(function(t){return new on(t)}),this.register(function(t){return new en(t)}),this.register(function(t){return new ln(t)}),this.register(function(t){return new an(t)}),this.register(function(t){return new qt(t)}),this.register(function(t){return new dn(t)}),this.register(function(t){return new pn(t)})}load(e,t,n,s){const r=this;let i;if(this.resourcePath!=="")i=this.resourcePath;else if(this.path!==""){const l=Q.extractUrlBase(e);i=Q.resolveURL(l,this.path)}else i=Q.extractUrlBase(e);this.manager.itemStart(e);const a=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},o=new He(this.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.setRequestHeader(this.requestHeader),o.setWithCredentials(this.withCredentials),o.load(e,function(l){try{r.parse(l,i,function(h){t(h),r.manager.itemEnd(e)},a)}catch(h){a(h)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const i={},a={},o=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(o.decode(new Uint8Array(e,0,4))===Xe){try{i[A.KHR_BINARY_GLTF]=new fn(e)}catch(c){s&&s(c);return}r=JSON.parse(i[A.KHR_BINARY_GLTF].content)}else r=JSON.parse(o.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new Ln(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const c=this.pluginCallbacks[h](l);c.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[c.name]=c,i[c.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const c=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(c){case A.KHR_MATERIALS_UNLIT:i[c]=new Wt;break;case A.KHR_DRACO_MESH_COMPRESSION:i[c]=new mn(r,this.dracoLoader);break;case A.KHR_TEXTURE_TRANSFORM:i[c]=new gn;break;case A.KHR_MESH_QUANTIZATION:i[c]=new _n;break;default:d.indexOf(c)>=0&&a[c]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+c+'".')}}l.setExtensions(i),l.setPlugins(a),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function Yt(){let u={};return{get:function(e){return u[e]},add:function(e,t){u[e]=t},remove:function(e){delete u[e]},removeAll:function(){u={}}}}const A={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class qt{constructor(e){this.parser=e,this.name=A.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,o=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new z(16777215);o.color!==void 0&&h.setRGB(o.color[0],o.color[1],o.color[2],H);const c=o.range!==void 0?o.range:0;switch(o.type){case"directional":l=new tt(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new et(h),l.distance=c;break;case"spot":l=new Qe(h),l.distance=c,o.spot=o.spot||{},o.spot.innerConeAngle=o.spot.innerConeAngle!==void 0?o.spot.innerConeAngle:0,o.spot.outerConeAngle=o.spot.outerConeAngle!==void 0?o.spot.outerConeAngle:Math.PI/4,l.angle=o.spot.outerConeAngle,l.penumbra=1-o.spot.innerConeAngle/o.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+o.type)}return l.position.set(0,0,0),B(l,o),o.intensity!==void 0&&(l.intensity=o.intensity),l.name=t.createUniqueName(o.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(o){return n._getNodeRef(t.cache,a,o)})}}class Wt{constructor(){this.name=A.KHR_MATERIALS_UNLIT}getMaterialType(){return q}extendParams(e,t,n){const s=[];e.color=new z(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const i=r.baseColorFactor;e.color.setRGB(i[0],i[1],i[2],H),e.opacity=i[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,ee))}return Promise.all(s)}}class Jt{constructor(e){this.parser=e,this.name=A.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Zt{constructor(e){this.parser=e,this.name=A.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:P}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],i=s.extensions[this.name];if(i.clearcoatFactor!==void 0&&(t.clearcoat=i.clearcoatFactor),i.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",i.clearcoatTexture)),i.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=i.clearcoatRoughnessFactor),i.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",i.clearcoatRoughnessTexture)),i.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",i.clearcoatNormalTexture)),i.clearcoatNormalTexture.scale!==void 0)){const a=i.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Pe(a,a)}return Promise.all(r)}}class Qt{constructor(e){this.parser=e,this.name=A.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:P}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class en{constructor(e){this.parser=e,this.name=A.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:P}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],i=s.extensions[this.name];return i.iridescenceFactor!==void 0&&(t.iridescence=i.iridescenceFactor),i.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",i.iridescenceTexture)),i.iridescenceIor!==void 0&&(t.iridescenceIOR=i.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),i.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=i.iridescenceThicknessMinimum),i.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=i.iridescenceThicknessMaximum),i.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",i.iridescenceThicknessTexture)),Promise.all(r)}}class tn{constructor(e){this.parser=e,this.name=A.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:P}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new z(0,0,0),t.sheenRoughness=0,t.sheen=1;const i=s.extensions[this.name];if(i.sheenColorFactor!==void 0){const a=i.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],H)}return i.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=i.sheenRoughnessFactor),i.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",i.sheenColorTexture,ee)),i.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",i.sheenRoughnessTexture)),Promise.all(r)}}class nn{constructor(e){this.parser=e,this.name=A.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:P}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],i=s.extensions[this.name];return i.transmissionFactor!==void 0&&(t.transmission=i.transmissionFactor),i.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",i.transmissionTexture)),Promise.all(r)}}class sn{constructor(e){this.parser=e,this.name=A.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:P}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],i=s.extensions[this.name];t.thickness=i.thicknessFactor!==void 0?i.thicknessFactor:0,i.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",i.thicknessTexture)),t.attenuationDistance=i.attenuationDistance||1/0;const a=i.attenuationColor||[1,1,1];return t.attenuationColor=new z().setRGB(a[0],a[1],a[2],H),Promise.all(r)}}class rn{constructor(e){this.parser=e,this.name=A.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:P}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class on{constructor(e){this.parser=e,this.name=A.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:P}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],i=s.extensions[this.name];t.specularIntensity=i.specularFactor!==void 0?i.specularFactor:1,i.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",i.specularTexture));const a=i.specularColorFactor||[1,1,1];return t.specularColor=new z().setRGB(a[0],a[1],a[2],H),i.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",i.specularColorTexture,ee)),Promise.all(r)}}class an{constructor(e){this.parser=e,this.name=A.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:P}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],i=s.extensions[this.name];return t.bumpScale=i.bumpFactor!==void 0?i.bumpFactor:1,i.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",i.bumpTexture)),Promise.all(r)}}class ln{constructor(e){this.parser=e,this.name=A.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:P}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],i=s.extensions[this.name];return i.anisotropyStrength!==void 0&&(t.anisotropy=i.anisotropyStrength),i.anisotropyRotation!==void 0&&(t.anisotropyRotation=i.anisotropyRotation),i.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",i.anisotropyTexture)),Promise.all(r)}}class cn{constructor(e){this.parser=e,this.name=A.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],i=t.options.ktx2Loader;if(!i){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,i)}}class hn{constructor(e){this.parser=e,this.name=A.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const i=r.extensions[t],a=s.images[i.source];let o=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(o=l)}return n.loadTextureImage(e,i.source,o)}}class un{constructor(e){this.parser=e,this.name=A.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const i=r.extensions[t],a=s.images[i.source];let o=n.textureLoader;if(a.uri){const l=n.options.manager.getHandler(a.uri);l!==null&&(o=l)}return n.loadTextureImage(e,i.source,o)}}class dn{constructor(e){this.name=A.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),i=this.parser.options.meshoptDecoder;if(!i||!i.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const o=s.byteOffset||0,l=s.byteLength||0,h=s.count,c=s.byteStride,d=new Uint8Array(a,o,l);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(h,c,d,s.mode,s.filter).then(function(p){return p.buffer}):i.ready.then(function(){const p=new ArrayBuffer(h*c);return i.decodeGltfBuffer(new Uint8Array(p),h,c,d,s.mode,s.filter),p})})}else return null}}class pn{constructor(e){this.name=A.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==O.TRIANGLES&&l.mode!==O.TRIANGLE_STRIP&&l.mode!==O.TRIANGLE_FAN&&l.mode!==void 0)return null;const i=n.extensions[this.name].attributes,a=[],o={};for(const l in i)a.push(this.parser.getDependency("accessor",i[l]).then(h=>(o[l]=h,o[l])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(l=>{const h=l.pop(),c=h.isGroup?h.children:[h],d=l[0].count,p=[];for(const x of c){const b=new oe,T=new K,m=new Ke,f=new K(1,1,1),y=new nt(x.geometry,x.material,d);for(let g=0;g<d;g++)o.TRANSLATION&&T.fromBufferAttribute(o.TRANSLATION,g),o.ROTATION&&m.fromBufferAttribute(o.ROTATION,g),o.SCALE&&f.fromBufferAttribute(o.SCALE,g),y.setMatrixAt(g,b.compose(T,m,f));for(const g in o)if(g==="_COLOR_0"){const S=o[g];y.instanceColor=new st(S.array,S.itemSize,S.normalized)}else g!=="TRANSLATION"&&g!=="ROTATION"&&g!=="SCALE"&&x.geometry.setAttribute(g,o[g]);$e.prototype.copy.call(y,x),this.parser.assignFinalMaterial(y),p.push(y)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}}const Xe="glTF",Z=12,Fe={JSON:1313821514,BIN:5130562};class fn{constructor(e){this.name=A.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Z),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Xe)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-Z,r=new DataView(e,Z);let i=0;for(;i<s;){const a=r.getUint32(i,!0);i+=4;const o=r.getUint32(i,!0);if(i+=4,o===Fe.JSON){const l=new Uint8Array(e,Z+i,a);this.content=n.decode(l)}else if(o===Fe.BIN){const l=Z+i;this.body=e.slice(l,l+a)}i+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class mn{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=A.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,i=e.extensions[this.name].attributes,a={},o={},l={};for(const h in i){const c=we[h]||h.toLowerCase();a[c]=i[h]}for(const h in e.attributes){const c=we[h]||h.toLowerCase();if(i[h]!==void 0){const d=n.accessors[e.attributes[h]],p=W[d.componentType];l[c]=p.name,o[c]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(c,d){s.decodeDracoFile(h,function(p){for(const x in p.attributes){const b=p.attributes[x],T=o[x];T!==void 0&&(b.normalized=T)}c(p)},a,l,H,d)})})}}class gn{constructor(){this.name=A.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class _n{constructor(){this.name=A.KHR_MESH_QUANTIZATION}}class Ye extends Mt{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let i=0;i!==s;i++)t[i]=n[r+i];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,i=this.sampleValues,a=this.valueSize,o=a*2,l=a*3,h=s-t,c=(n-t)/h,d=c*c,p=d*c,x=e*l,b=x-l,T=-2*p+3*d,m=p-d,f=1-T,y=m-d+c;for(let g=0;g!==a;g++){const S=i[b+g+a],E=i[b+g+o]*h,R=i[x+g+a],_=i[x+g]*h;r[g]=f*S+y*E+T*R+m*_}return r}}const xn=new Ke;class Tn extends Ye{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return xn.fromArray(r).normalize().toArray(r),r}}const O={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},W={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Ne={9728:Be,9729:te,9984:Et,9985:wt,9986:bt,9987:Ue},Oe={33071:yt,33648:At,10497:_e},pe={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},we={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},V={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},En={CUBICSPLINE:void 0,LINEAR:je,STEP:vt},fe={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function wn(u){return u.DefaultMaterial===void 0&&(u.DefaultMaterial=new j({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Rt})),u.DefaultMaterial}function X(u,e,t){for(const n in t.extensions)u[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function B(u,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(u.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function bn(u,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const c=e[l];if(c.POSITION!==void 0&&(n=!0),c.NORMAL!==void 0&&(s=!0),c.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(u);const i=[],a=[],o=[];for(let l=0,h=e.length;l<h;l++){const c=e[l];if(n){const d=c.POSITION!==void 0?t.getDependency("accessor",c.POSITION):u.attributes.position;i.push(d)}if(s){const d=c.NORMAL!==void 0?t.getDependency("accessor",c.NORMAL):u.attributes.normal;a.push(d)}if(r){const d=c.COLOR_0!==void 0?t.getDependency("accessor",c.COLOR_0):u.attributes.color;o.push(d)}}return Promise.all([Promise.all(i),Promise.all(a),Promise.all(o)]).then(function(l){const h=l[0],c=l[1],d=l[2];return n&&(u.morphAttributes.position=h),s&&(u.morphAttributes.normal=c),r&&(u.morphAttributes.color=d),u.morphTargetsRelative=!0,u})}function yn(u,e){if(u.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)u.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(u.morphTargetInfluences.length===t.length){u.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)u.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function An(u){let e;const t=u.extensions&&u.extensions[A.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+me(t.attributes):e=u.indices+":"+me(u.attributes)+":"+u.mode,u.targets!==void 0)for(let n=0,s=u.targets.length;n<s;n++)e+=":"+me(u.targets[n]);return e}function me(u){let e="";const t=Object.keys(u).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+u[t[n]]+";";return e}function be(u){switch(u){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function vn(u){return u.search(/\.jpe?g($|\?)/i)>0||u.search(/^data\:image\/jpeg/)===0?"image/jpeg":u.search(/\.webp($|\?)/i)>0||u.search(/^data\:image\/webp/)===0?"image/webp":u.search(/\.ktx2($|\?)/i)>0||u.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const Rn=new oe;class Ln{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Yt,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,i=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const o=a.match(/Version\/(\d+)/);s=n&&o?parseInt(o[1],10):-1,r=a.indexOf("Firefox")>-1,i=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&i<98?this.textureLoader=new Ge(this.options.manager):this.textureLoader=new it(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new He(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(i){return i._markDefs&&i._markDefs()}),Promise.all(this._invokeAll(function(i){return i.beforeRoot&&i.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(i){const a={scene:i[0][s.scene||0],scenes:i[0],animations:i[1],cameras:i[2],asset:s.asset,parser:n,userData:{}};return X(r,a,s),B(a,s),Promise.all(n._invokeAll(function(o){return o.afterRoot&&o.afterRoot(a)})).then(function(){for(const o of a.scenes)o.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const i=t[s].joints;for(let a=0,o=i.length;a<o;a++)e[i[a]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const i=e[s];i.mesh!==void 0&&(this._addNodeRef(this.meshCache,i.mesh),i.skin!==void 0&&(n[i.mesh].isSkinnedMesh=!0)),i.camera!==void 0&&this._addNodeRef(this.cameraCache,i.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(i,a)=>{const o=this.associations.get(i);o!=null&&this.associations.set(a,o);for(const[l,h]of i.children.entries())r(h,a.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,i){return n.getDependency(e,i)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[A.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,i){n.load(Q.resolveURL(t.uri,s.path),r,void 0,function(){i(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const i=pe[s.type],a=W[s.componentType],o=s.normalized===!0,l=new a(s.count*i);return Promise.resolve(new le(l,i,o))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(i){const a=i[0],o=pe[s.type],l=W[s.componentType],h=l.BYTES_PER_ELEMENT,c=h*o,d=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,x=s.normalized===!0;let b,T;if(p&&p!==c){const m=Math.floor(d/p),f="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+m+":"+s.count;let y=t.cache.get(f);y||(b=new l(a,m*p,s.count*p/h),y=new rt(b,p/h),t.cache.add(f,y)),T=new Lt(y,o,d%p/h,x)}else a===null?b=new l(s.count*o):b=new l(a,d,s.count*o),T=new le(b,o,x);if(s.sparse!==void 0){const m=pe.SCALAR,f=W[s.sparse.indices.componentType],y=s.sparse.indices.byteOffset||0,g=s.sparse.values.byteOffset||0,S=new f(i[1],y,s.sparse.count*m),E=new l(i[2],g,s.sparse.count*o);a!==null&&(T=new le(T.array.slice(),T.itemSize,T.normalized)),T.normalized=!1;for(let R=0,_=S.length;R<_;R++){const w=S[R];if(T.setX(w,E[R*o]),o>=2&&T.setY(w,E[R*o+1]),o>=3&&T.setZ(w,E[R*o+2]),o>=4&&T.setW(w,E[R*o+3]),o>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}T.normalized=x}return T})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,i=t.images[r];let a=this.textureLoader;if(i.uri){const o=n.manager.getHandler(i.uri);o!==null&&(a=o)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const s=this,r=this.json,i=r.textures[e],a=r.images[t],o=(a.uri||a.bufferView)+":"+i.sampler;if(this.textureCache[o])return this.textureCache[o];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=i.name||a.name||"",h.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(h.name=a.uri);const d=(r.samplers||{})[i.sampler]||{};return h.magFilter=Ne[d.magFilter]||te,h.minFilter=Ne[d.minFilter]||Ue,h.wrapS=Oe[d.wrapS]||_e,h.wrapT=Oe[d.wrapT]||_e,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==Be&&h.minFilter!==te,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[o]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(c=>c.clone());const i=s.images[e],a=self.URL||self.webkitURL;let o=i.uri||"",l=!1;if(i.bufferView!==void 0)o=n.getDependency("bufferView",i.bufferView).then(function(c){l=!0;const d=new Blob([c],{type:i.mimeType});return o=a.createObjectURL(d),o});else if(i.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(o).then(function(c){return new Promise(function(d,p){let x=d;t.isImageBitmapLoader===!0&&(x=function(b){const T=new Te(b);T.needsUpdate=!0,d(T)}),t.load(Q.resolveURL(c,r.path),x,void 0,p)})}).then(function(c){return l===!0&&a.revokeObjectURL(o),B(c,i),c.userData.mimeType=i.mimeType||vn(i.uri),c}).catch(function(c){throw console.error("THREE.GLTFLoader: Couldn't load texture",o),c});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(i){if(!i)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(i=i.clone(),i.channel=n.texCoord),r.extensions[A.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[A.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const o=r.associations.get(i);i=r.extensions[A.KHR_TEXTURE_TRANSFORM].extendTexture(i,a),r.associations.set(i,o)}}return s!==void 0&&(i.colorSpace=s),e[t]=i,i})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,i=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let o=this.cache.get(a);o||(o=new ot,ce.prototype.copy.call(o,n),o.color.copy(n.color),o.map=n.map,o.sizeAttenuation=!1,this.cache.add(a,o)),n=o}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let o=this.cache.get(a);o||(o=new at,ce.prototype.copy.call(o,n),o.color.copy(n.color),o.map=n.map,this.cache.add(a,o)),n=o}if(s||r||i){let a="ClonedMaterial:"+n.uuid+":";s&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),i&&(a+="flat-shading:");let o=this.cache.get(a);o||(o=n.clone(),r&&(o.vertexColors=!0),i&&(o.flatShading=!0),s&&(o.normalScale&&(o.normalScale.y*=-1),o.clearcoatNormalScale&&(o.clearcoatNormalScale.y*=-1)),this.cache.add(a,o),this.associations.set(o,this.associations.get(n))),n=o}e.material=n}getMaterialType(){return j}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let i;const a={},o=r.extensions||{},l=[];if(o[A.KHR_MATERIALS_UNLIT]){const c=s[A.KHR_MATERIALS_UNLIT];i=c.getMaterialType(),l.push(c.extendParams(a,r,t))}else{const c=r.pbrMetallicRoughness||{};if(a.color=new z(1,1,1),a.opacity=1,Array.isArray(c.baseColorFactor)){const d=c.baseColorFactor;a.color.setRGB(d[0],d[1],d[2],H),a.opacity=d[3]}c.baseColorTexture!==void 0&&l.push(t.assignTexture(a,"map",c.baseColorTexture,ee)),a.metalness=c.metallicFactor!==void 0?c.metallicFactor:1,a.roughness=c.roughnessFactor!==void 0?c.roughnessFactor:1,c.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(a,"metalnessMap",c.metallicRoughnessTexture)),l.push(t.assignTexture(a,"roughnessMap",c.metallicRoughnessTexture))),i=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=lt);const h=r.alphaMode||fe.OPAQUE;if(h===fe.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,h===fe.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&i!==q&&(l.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Pe(1,1),r.normalTexture.scale!==void 0)){const c=r.normalTexture.scale;a.normalScale.set(c,c)}if(r.occlusionTexture!==void 0&&i!==q&&(l.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&i!==q){const c=r.emissiveFactor;a.emissive=new z().setRGB(c[0],c[1],c[2],H)}return r.emissiveTexture!==void 0&&i!==q&&l.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,ee)),Promise.all(l).then(function(){const c=new i(a);return r.name&&(c.name=r.name),B(c,r),t.associations.set(c,{materials:e}),r.extensions&&X(s,c,r),c})}createUniqueName(e){const t=ct.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(a){return n[A.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(o){return ke(o,a,t)})}const i=[];for(let a=0,o=e.length;a<o;a++){const l=e[a],h=An(l),c=s[h];if(c)i.push(c.promise);else{let d;l.extensions&&l.extensions[A.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=ke(new ht,l,t),s[h]={primitive:l,promise:d},i.push(d)}}return Promise.all(i)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],i=r.primitives,a=[];for(let o=0,l=i.length;o<l;o++){const h=i[o].material===void 0?wn(this.cache):this.getDependency("material",i[o].material);a.push(h)}return a.push(t.loadGeometries(i)),Promise.all(a).then(function(o){const l=o.slice(0,o.length-1),h=o[o.length-1],c=[];for(let p=0,x=h.length;p<x;p++){const b=h[p],T=i[p];let m;const f=l[p];if(T.mode===O.TRIANGLES||T.mode===O.TRIANGLE_STRIP||T.mode===O.TRIANGLE_FAN||T.mode===void 0)m=r.isSkinnedMesh===!0?new ut(b,f):new xe(b,f),m.isSkinnedMesh===!0&&m.normalizeSkinWeights(),T.mode===O.TRIANGLE_STRIP?m.geometry=Ie(m.geometry,De):T.mode===O.TRIANGLE_FAN&&(m.geometry=Ie(m.geometry,ge));else if(T.mode===O.LINES)m=new dt(b,f);else if(T.mode===O.LINE_STRIP)m=new pt(b,f);else if(T.mode===O.LINE_LOOP)m=new ft(b,f);else if(T.mode===O.POINTS)m=new mt(b,f);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+T.mode);Object.keys(m.geometry.morphAttributes).length>0&&yn(m,r),m.name=t.createUniqueName(r.name||"mesh_"+e),B(m,r),T.extensions&&X(s,m,T),t.assignFinalMaterial(m),c.push(m)}for(let p=0,x=c.length;p<x;p++)t.associations.set(c[p],{meshes:e,primitives:p});if(c.length===1)return r.extensions&&X(s,c[0],r),c[0];const d=new he;r.extensions&&X(s,d,r),t.associations.set(d,{meshes:e});for(let p=0,x=c.length;p<x;p++)d.add(c[p]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ve(k.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new gt(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),B(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),i=s,a=[],o=[];for(let l=0,h=i.length;l<h;l++){const c=i[l];if(c){a.push(c);const d=new oe;r!==null&&d.fromArray(r.array,l*16),o.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new _t(a,o)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,i=[],a=[],o=[],l=[],h=[];for(let c=0,d=s.channels.length;c<d;c++){const p=s.channels[c],x=s.samplers[p.sampler],b=p.target,T=b.node,m=s.parameters!==void 0?s.parameters[x.input]:x.input,f=s.parameters!==void 0?s.parameters[x.output]:x.output;b.node!==void 0&&(i.push(this.getDependency("node",T)),a.push(this.getDependency("accessor",m)),o.push(this.getDependency("accessor",f)),l.push(x),h.push(b))}return Promise.all([Promise.all(i),Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(h)]).then(function(c){const d=c[0],p=c[1],x=c[2],b=c[3],T=c[4],m=[];for(let f=0,y=d.length;f<y;f++){const g=d[f],S=p[f],E=x[f],R=b[f],_=T[f];if(g===void 0)continue;g.updateMatrix&&g.updateMatrix();const w=n._createAnimationTracks(g,S,E,R,_);if(w)for(let L=0;L<w.length;L++)m.push(w[L])}return new xt(r,void 0,m)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const i=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&i.traverse(function(a){if(a.isMesh)for(let o=0,l=s.weights.length;o<l;o++)a.morphTargetInfluences[o]=s.weights[o]}),i})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),i=[],a=s.children||[];for(let l=0,h=a.length;l<h;l++)i.push(n.getDependency("node",a[l]));const o=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(i),o]).then(function(l){const h=l[0],c=l[1],d=l[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,Rn)});for(let p=0,x=c.length;p<x;p++)h.add(c[p]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],i=r.name?s.createUniqueName(r.name):"",a=[],o=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return o&&a.push(o),r.camera!==void 0&&a.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){a.push(l)}),this.nodeCache[e]=Promise.all(a).then(function(l){let h;if(r.isBone===!0?h=new Tt:l.length>1?h=new he:l.length===1?h=l[0]:h=new $e,h!==l[0])for(let c=0,d=l.length;c<d;c++)h.add(l[c]);if(r.name&&(h.userData.name=r.name,h.name=i),B(h,r),r.extensions&&X(n,h,r),r.matrix!==void 0){const c=new oe;c.fromArray(r.matrix),h.applyMatrix4(c)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new he;n.name&&(r.name=s.createUniqueName(n.name)),B(r,n),n.extensions&&X(t,r,n);const i=n.nodes||[],a=[];for(let o=0,l=i.length;o<l;o++)a.push(s.getDependency("node",i[o]));return Promise.all(a).then(function(o){for(let h=0,c=o.length;h<c;h++)r.add(o[h]);const l=h=>{const c=new Map;for(const[d,p]of s.associations)(d instanceof ce||d instanceof Te)&&c.set(d,p);return h.traverse(d=>{const p=s.associations.get(d);p!=null&&c.set(d,p)}),c};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const i=[],a=e.name?e.name:e.uuid,o=[];V[r.path]===V.weights?e.traverse(function(d){d.morphTargetInfluences&&o.push(d.name?d.name:d.uuid)}):o.push(a);let l;switch(V[r.path]){case V.weights:l=Se;break;case V.rotation:l=Me;break;case V.translation:case V.scale:l=Le;break;default:switch(n.itemSize){case 1:l=Se;break;case 2:case 3:default:l=Le;break}break}const h=s.interpolation!==void 0?En[s.interpolation]:je,c=this._getArrayFromAccessor(n);for(let d=0,p=o.length;d<p;d++){const x=new l(o[d]+"."+V[r.path],t.array,c,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(x),i.push(x)}return i}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=be(t.constructor),s=new Float32Array(t.length);for(let r=0,i=t.length;r<i;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Me?Tn:Ye;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function Sn(u,e,t){const n=e.attributes,s=new ze;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],o=a.min,l=a.max;if(o!==void 0&&l!==void 0){if(s.set(new K(o[0],o[1],o[2]),new K(l[0],l[1],l[2])),a.normalized){const h=be(W[a.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new K,o=new K;for(let l=0,h=r.length;l<h;l++){const c=r[l];if(c.POSITION!==void 0){const d=t.json.accessors[c.POSITION],p=d.min,x=d.max;if(p!==void 0&&x!==void 0){if(o.setX(Math.max(Math.abs(p[0]),Math.abs(x[0]))),o.setY(Math.max(Math.abs(p[1]),Math.abs(x[1]))),o.setZ(Math.max(Math.abs(p[2]),Math.abs(x[2]))),d.normalized){const b=be(W[d.componentType]);o.multiplyScalar(b)}a.max(o)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(a)}u.boundingBox=s;const i=new St;s.getCenter(i.center),i.radius=s.min.distanceTo(s.max)/2,u.boundingSphere=i}function ke(u,e,t){const n=e.attributes,s=[];function r(i,a){return t.getDependency("accessor",i).then(function(o){u.setAttribute(a,o)})}for(const i in n){const a=we[i]||i.toLowerCase();a in u.attributes||s.push(r(n[i],a))}if(e.indices!==void 0&&!u.index){const i=t.getDependency("accessor",e.indices).then(function(a){u.setIndex(a)});s.push(i)}return Re.workingColorSpace!==H&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Re.workingColorSpace}" not supported.`),B(u,e),Sn(u,e,t),Promise.all(s).then(function(){return e.targets!==void 0?bn(u,e.targets,t):u})}class Mn extends Ct{constructor(e){super(e),this.type=se}parse(e){const i=function(_,w){switch(_){case 1:throw new Error("THREE.RGBELoader: Read Error: "+(w||""));case 2:throw new Error("THREE.RGBELoader: Write Error: "+(w||""));case 3:throw new Error("THREE.RGBELoader: Bad File Format: "+(w||""));default:case 4:throw new Error("THREE.RGBELoader: Memory Error: "+(w||""))}},h=`
`,c=function(_,w,L){w=w||1024;let F=_.pos,I=-1,v=0,N="",C=String.fromCharCode.apply(null,new Uint16Array(_.subarray(F,F+128)));for(;0>(I=C.indexOf(h))&&v<w&&F<_.byteLength;)N+=C,v+=C.length,F+=128,C+=String.fromCharCode.apply(null,new Uint16Array(_.subarray(F,F+128)));return-1<I?(_.pos+=v+I+1,N+C.slice(0,I)):!1},d=function(_){const w=/^#\?(\S+)/,L=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,M=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,F=/^\s*FORMAT=(\S+)\s*$/,I=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,v={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};let N,C;for((_.pos>=_.byteLength||!(N=c(_)))&&i(1,"no header found"),(C=N.match(w))||i(3,"bad initial token"),v.valid|=1,v.programtype=C[1],v.string+=N+`
`;N=c(_),N!==!1;){if(v.string+=N+`
`,N.charAt(0)==="#"){v.comments+=N+`
`;continue}if((C=N.match(L))&&(v.gamma=parseFloat(C[1])),(C=N.match(M))&&(v.exposure=parseFloat(C[1])),(C=N.match(F))&&(v.valid|=2,v.format=C[1]),(C=N.match(I))&&(v.valid|=4,v.height=parseInt(C[1],10),v.width=parseInt(C[2],10)),v.valid&2&&v.valid&4)break}return v.valid&2||i(3,"missing format specifier"),v.valid&4||i(3,"missing image size specifier"),v},p=function(_,w,L){const M=w;if(M<8||M>32767||_[0]!==2||_[1]!==2||_[2]&128)return new Uint8Array(_);M!==(_[2]<<8|_[3])&&i(3,"wrong scanline width");const F=new Uint8Array(4*w*L);F.length||i(4,"unable to allocate buffer space");let I=0,v=0;const N=4*M,C=new Uint8Array(4),Y=new Uint8Array(N);let ye=L;for(;ye>0&&v<_.byteLength;){v+4>_.byteLength&&i(1),C[0]=_[v++],C[1]=_[v++],C[2]=_[v++],C[3]=_[v++],(C[0]!=2||C[1]!=2||(C[2]<<8|C[3])!=M)&&i(3,"bad rgbe scanline format");let J=0,$;for(;J<N&&v<_.byteLength;){$=_[v++];const G=$>128;if(G&&($-=128),($===0||J+$>N)&&i(3,"bad scanline data"),G){const U=_[v++];for(let Ae=0;Ae<$;Ae++)Y[J++]=U}else Y.set(_.subarray(v,v+$),J),J+=$,v+=$}const qe=M;for(let G=0;G<qe;G++){let U=0;F[I]=Y[G+U],U+=M,F[I+1]=Y[G+U],U+=M,F[I+2]=Y[G+U],U+=M,F[I+3]=Y[G+U],I+=4}ye--}return F},x=function(_,w,L,M){const F=_[w+3],I=Math.pow(2,F-128)/255;L[M+0]=_[w+0]*I,L[M+1]=_[w+1]*I,L[M+2]=_[w+2]*I,L[M+3]=1},b=function(_,w,L,M){const F=_[w+3],I=Math.pow(2,F-128)/255;L[M+0]=ie.toHalfFloat(Math.min(_[w+0]*I,65504)),L[M+1]=ie.toHalfFloat(Math.min(_[w+1]*I,65504)),L[M+2]=ie.toHalfFloat(Math.min(_[w+2]*I,65504)),L[M+3]=ie.toHalfFloat(1)},T=new Uint8Array(e);T.pos=0;const m=d(T),f=m.width,y=m.height,g=p(T.subarray(T.pos),f,y);let S,E,R;switch(this.type){case ue:R=g.length/4;const _=new Float32Array(R*4);for(let L=0;L<R;L++)x(g,L*4,_,L*4);S=_,E=ue;break;case se:R=g.length/4;const w=new Uint16Array(R*4);for(let L=0;L<R;L++)b(g,L*4,w,L*4);S=w,E=se;break;default:throw new Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:f,height:y,data:S,header:m.string,gamma:m.gamma,exposure:m.exposure,type:E}}setDataType(e){return this.type=e,this}load(e,t,n,s){function r(i,a){switch(i.type){case ue:case se:i.colorSpace=H,i.minFilter=te,i.magFilter=te,i.generateMipmaps=!1,i.flipY=!0;break}t&&t(i,a)}return super.load(e,r,n,s)}}const re="/assets/models/robot/";function Nn(){const u=ve.useRef(null);return ve.useEffect(()=>{const e=u.current;if(!e)return;const t=new It,n=new Ve(45,1,.1,100);n.position.set(0,1.4,4);const s=new Ft({canvas:e,antialias:!0}),r=new Ot(n,s.domElement);r.enableDamping=!0,r.target.set(0,1,0);const i=new ae({title:"Robot Joints"}),a=new Nt(s),o=new Mn,l=new Xt;l.setPath(re),l.setResourcePath(re);let h=0,c=null,d=null,p=!0;const x=new ae;x.domElement.style.top="100px";const b=()=>{const{innerWidth:g,innerHeight:S}=window;e.width=g,e.height=S,s.setSize(g,S,!1),n.aspect=g/S,n.updateProjectionMatrix()},T=g=>{const S=new ze().setFromObject(g),E=S.getSize(new K),R=S.getCenter(new K),w=Math.max(E.x,E.y,E.z)/(2*Math.tan(k.degToRad(n.fov/2))),L=w/n.aspect,M=1.2*Math.max(w,L);r.target.copy(R),n.position.set(R.x,R.y+E.y*.15,R.z+M),n.near=Math.max(M/100,.1),n.far=M*100,n.updateProjectionMatrix(),r.update()},m=()=>{h=window.requestAnimationFrame(m),r.update(),s.render(t,n)};b(),m(),window.addEventListener("resize",b),o.load(`${re}env_shop.hdr`,g=>{if(!p){g.dispose();return}d=a.fromEquirectangular(g).texture,t.environment=d,t.background=new z(15658734),g.dispose(),a.dispose()});const f={a:new j({color:15658734,roughness:.5,metalness:0}),b:new j({color:3355443,roughness:.5,metalness:0}),c:new j({color:0,roughness:0,metalness:1}),d:new j({emissive:61950,emissiveIntensity:1}),e:new j({emissive:61950,emissiveIntensity:1}),f:new q({color:13421772}),o:new j({color:11184810,roughness:.5,metalness:0})},y=new Ge;return y.setPath(re),y.load("light1.jpg",g=>{f.d.emissiveMap=g,f.d.needsUpdate=!0}),y.load("light2.jpg",g=>{f.e.emissiveMap=g,f.e.needsUpdate=!0}),y.load("back.jpg",g=>{t.background=g}),l.load("robot.glb",g=>{if(!p)return;c=g.scene;const S=[];c.traverse(E=>{/^j-/i.test(E.name)&&S.push(E),E instanceof xe&&(E.castShadow=!0,E.receiveShadow=!0,E.material=f.c,E.name.includes("a")&&(E.material=f.a),E.name.includes("e")&&(E.material=f.e),E.name.includes("f")&&(E.material=f.e))}),t.add(c),T(c),S.forEach(E=>{const R={x:k.radToDeg(E.rotation.x),y:k.radToDeg(E.rotation.y),z:k.radToDeg(E.rotation.z)},_={...R,reset:()=>{_.x=R.x,_.y=R.y,_.z=R.z,E.rotation.set(k.degToRad(_.x),k.degToRad(_.y),k.degToRad(_.z))}};["j-06"].includes(E.name)&&x.add(_,"x",-180,180,1).name(E.name).onChange(w=>{E.rotation.x=k.degToRad(w)}),["j-01","j-05"].includes(E.name)&&x.add(_,"y",-180,180,1).name(E.name).onChange(w=>{E.rotation.y=k.degToRad(w)}),["j-02","j-03","j-04"].includes(E.name)&&x.add(_,"z",-180,180,1).name(E.name).onChange(w=>{E.rotation.z=k.degToRad(w)})})},void 0,g=>{console.error("Failed to load robot model:",g)}),()=>{p=!1,window.removeEventListener("resize",b),window.cancelAnimationFrame(h),r.dispose(),x.destroy(),i.destroy(),c&&(t.remove(c),c.traverse(g=>{if(!(g instanceof xe))return;g.geometry.dispose(),(Array.isArray(g.material)?g.material:[g.material]).forEach(E=>{Object.values(E).forEach(R=>{R instanceof Te&&R.dispose()}),E.dispose()})})),d==null||d.dispose(),s.dispose()}},[]),We.jsx("canvas",{ref:u})}export{Nn as default};
