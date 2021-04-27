(this["webpackJsonpdropdown-tabs"]=this["webpackJsonpdropdown-tabs"]||[]).push([[0],{20:function(e,t,n){},21:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n(0),o=n.n(r),c=n(10),l=n.n(c),i=n(2),s=n(3),u=n(4);var d=n(6),b=n.n(d);var v,f=n(7);function j(e,t){var n=t.reduce((function(e,t){return e[t.key]=t,e}),{}),a=!1,r=e.map((function(e){var t=n[e.key];return t?(a=!0,delete n[e.key],t):e})),o=Object.values(n);return o.length&&(a=!0,r.push.apply(r,Object(f.a)(o))),a?r:e}function p(e,t,n,a){var r=new Set(Array.isArray(t)?t:[t]),o=!1,c=e.sections.map((function(e){var t=!1,c=e.tabs.map((function(e){if(r.has(e.key)){var o="toggle"===a?!e[n]:a;if(e[n]!==o)return t=!0,Object(i.a)(Object(i.a)({},e),{},Object(u.a)({},n,o))}return e}));return t?(o=!0,Object(i.a)(Object(i.a)({},e),{},{tabs:c})):e}));return o?Object(i.a)(Object(i.a)({},e),{},{sections:c}):e}function y(e,t){switch(t.type){case v.SetActiveKey:return Object(i.a)(Object(i.a)({},e),{},{activeKey:t.payload});case v.CloseTabs:return function(e,t,n){var a=function(e,t){for(var n=0;n<e.length;n++){var a=e[n].tabs.findIndex((function(e){return e.key===t}));if(-1!==a)return{sectionIndex:n,tabIndex:a}}}(e.sections,t);if(!a)return console.error("trying to close non-existing tab"),e;var r=a.sectionIndex,o=a.tabIndex;if(n=e.activeKey,e.activeKey===t){var c=e.sections[r];if(c.tabs.length>1){var l=o?o-1:1;n=c.tabs[l].key}else{for(var i,s,d,v,f=null,j=r;j>=0;j++){var p=e.sections[j].tabs;if(p.length){f=p[p.length-1];break}}n=(null!==(i=null===(s=f)||void 0===s?void 0:s.key)&&void 0!==i?i:e.tabs.length)&&null!==(d=null===(v=e.tabs[e.tabs.length-1])||void 0===v?void 0:v.key)&&void 0!==d?d:null}}return b()(e,{activeKey:{$set:n},sections:Object(u.a)({},r,{tabs:{$splice:[[o,1]]}})})}(e,t.payload.key,t.payload.newActiveKey);case v.AddTabs:return function(e,t){if(!Object.keys(t).length)return e;var n=t.tabs,a=t.dropdownTabs,r=(null===n||void 0===n?void 0:n.length)?b()(e,{tabs:{$apply:function(e){return j(e,n)}}}):e;if(!a)return r;var o=new Set(Object.keys(a));if(r.sections.forEach((function(e){return o.delete(e.key)})),o.size)throw new Error("Trying to add dropdown tabs to non-existing section");return b()(r,{sections:{$apply:function(e){var t=!1,n=e.map((function(e){var n;if(!(null===(n=a[e.key])||void 0===n?void 0:n.length))return e;var r=j(e.tabs,a[e.key]);return r!==e.tabs?(t=!0,Object(i.a)(Object(i.a)({},e),{},{tabs:r})):e}));return t?n:e}}})}(e,t.payload);case v.StarTabs:return function(e,t,n){return p(e,t,"starred","star"===n||"unstar"!==n&&n)}(e,t.payload.keys,t.payload.mode);case v.LockTabs:return function(e,t,n){return p(e,t,"locked","lock"===n||"unlock"!==n&&n)}(e,t.payload.keys,t.payload.mode);case v.RemoveTabs:return function(e,t){var n=Array.isArray(t)?new Set(t):new Set([t]),a=e.tabs.filter((function(e){return!n.has(e.key)}));a.length===e.tabs.length&&(a=e.tabs);var r=e.sections.some((function(e){return e.tabs.some((function(e){return n.has(e.key)}))}));if(a===e.tabs&&!r)return e;var o=e.sections.reduce((function(e,t){var a=t.tabs.filter((function(e){return!n.has(e.key)}));return a.length===t.tabs.length?(e.push(t),e):(e.push(Object(i.a)(Object(i.a)({},t),{},{tabs:a})),e)}),[]);return Object(i.a)(Object(i.a)({},e),{},{tabs:a,sections:o})}(e,t.payload);case v.SetState:return"function"===typeof t.payload?t.payload(e):t.payload;default:return e}}!function(e){e[e.SetActiveKey=0]="SetActiveKey",e[e.AddTabs=1]="AddTabs",e[e.RemoveTabs=2]="RemoveTabs",e[e.CloseTabs=3]="CloseTabs",e[e.LockTabs=4]="LockTabs",e[e.StarTabs=5]="StarTabs",e[e.SetState=6]="SetState"}(v||(v={}));var O=Object(r.createContext)({}),h=function(e){var t=e.defaultActiveKey,n=e.initialTabs,o=e.initialSections,c=e.children,l=Object(r.useReducer)(y,{activeKey:null!==t&&void 0!==t?t:null,tabs:null!==n&&void 0!==n?n:[],sections:null!==o&&void 0!==o?o:[]}),u=Object(s.a)(l,2),d=u[0],b=u[1],f=Object(r.useCallback)((function(e){b({type:v.SetActiveKey,payload:e})}),[]),j=Object(r.useCallback)((function(e){b({type:v.AddTabs,payload:e})}),[]),p=Object(r.useCallback)((function(e){b({type:v.RemoveTabs,payload:e})}),[]),h=Object(r.useCallback)((function(e,t){b({type:v.CloseTabs,payload:{key:e,newActiveKey:t}})}),[]),m=Object(r.useCallback)((function(e){b({type:v.RemoveTabs,payload:e})}),[]),k=Object(r.useCallback)((function(e){b({type:v.LockTabs,payload:{keys:e,mode:"lock"}})}),[]),g=Object(r.useCallback)((function(e){b({type:v.LockTabs,payload:{keys:e,mode:"unlock"}})}),[]),w=Object(r.useCallback)((function(e){b({type:v.LockTabs,payload:{keys:e,mode:"toggle"}})}),[]),x=Object(r.useCallback)((function(e){b({type:v.StarTabs,payload:{keys:e,mode:"star"}})}),[]),T=Object(r.useCallback)((function(e){b({type:v.StarTabs,payload:{keys:e,mode:"unstar"}})}),[]),C=Object(r.useCallback)((function(e){b({type:v.StarTabs,payload:{keys:e,mode:"toggle"}})}),[]),E=Object(r.useCallback)((function(e){b({type:v.SetState,payload:e})}),[]);return Object(a.jsx)(O.Provider,{value:Object(i.a)(Object(i.a)({},d),{},{addTabs:j,removeTabs:p,setActiveKey:f,onTabClose:m,closeDropdownTab:h,lockTabs:k,unlockTabs:g,toggleLock:w,starTabs:x,unstarTabs:T,toggleStar:C,setState:E}),children:c})};var m=function(){return Object(r.useContext)(O)},k=n(12),g=n(11),w=Object(g.withNaming)({e:"__",m:"_",v:"_"}),x=w("tab"),T=o.a.forwardRef((function(e,t){var n=e.title,r=e.active,o=Object(k.a)(e,["title","active"]);return Object(a.jsx)("div",Object(i.a)(Object(i.a)({ref:t,className:x({active:r}),role:"tab"},o),{},{children:Object(a.jsx)("span",{className:x("title"),children:n})}))}));function C(){return(C=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function E(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var S=r.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"}),K=r.createElement("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"});function N(e,t){var n=e.title,a=e.titleId,o=E(e,["title","titleId"]);return r.createElement("svg",C({xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px",fill:"currentColor",ref:t,"aria-labelledby":a},o),n?r.createElement("title",{id:a},n):null,S,K)}var A=r.forwardRef(N);n.p;function I(){return(I=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function L(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var R=r.createElement("g",{fill:"none"},r.createElement("path",{d:"M0 0h24v24H0V0z"}),r.createElement("path",{d:"M0 0h24v24H0V0z",opacity:.87})),D=r.createElement("path",{d:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"});function M(e,t){var n=e.title,a=e.titleId,o=L(e,["title","titleId"]);return r.createElement("svg",I({xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px",fill:"currentColor",ref:t,"aria-labelledby":a},o),n?r.createElement("title",{id:a},n):null,R,D)}var P=r.forwardRef(M);n.p;function z(){return(z=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function V(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var H=r.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"}),B=r.createElement("path",{d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"});function W(e,t){var n=e.title,a=e.titleId,o=V(e,["title","titleId"]);return r.createElement("svg",z({xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px",fill:"currentColor",ref:t,"aria-labelledby":a},o),n?r.createElement("title",{id:a},n):null,H,B)}var $=r.forwardRef(W),_=(n.p,w("dropdown-menu")),J=w("dropdown-menu-item"),F=w("icon");function X(e){var t=e.title,n=e.tabs,r=e.onChange,o=e.activeKey;return Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)("div",{className:_("section-title"),children:Object(a.jsx)("span",{className:"text-truncate",children:t})}),Object(a.jsx)("ul",{className:_("section"),children:null===n||void 0===n?void 0:n.map((function(e){return Object(a.jsx)(q,{tab:e,onClick:function(){return r(e.key)},active:o===e.key},e.key)}))})]})}function q(e){var t=e.tab,n=e.onClick,r=e.active,o=e.disabled,c=m().closeDropdownTab,l=t.locked,i=t.starred,s=t.title;return Object(a.jsxs)("li",{className:J({active:r,locked:l,disabled:o}),onClick:o?void 0:n,children:[i&&Object(a.jsx)($,{className:F({small:!0},[J("star-icon")])}),l&&Object(a.jsx)(P,{className:F({small:!0},[J("lock-icon")])}),Object(a.jsx)("span",{className:J("title",["text-truncate"]),children:s}),!l&&Object(a.jsx)(A,{onClick:function(e){e.stopPropagation(),c(t.key)},className:F({small:!0},[J("close-icon")])})]})}var G=function(e){var t=e.onChange,n=e.sections,r=e.activeKey;return Object(a.jsx)("div",{className:_(),onClick:function(e){return e.stopPropagation()},children:n.map((function(e,n){var o;return!!(null===(o=e.tabs)||void 0===o?void 0:o.length)&&Object(a.jsx)(X,Object(i.a)(Object(i.a)({onChange:t},e),{},{activeKey:r}))}))})};var Q=function(e,t){Object(r.useEffect)((function(){if(e.current)return document.addEventListener("mousedown",n),function(){document.removeEventListener("mousedown",n)};function n(n){var a;(null===(a=e.current)||void 0===a?void 0:a.contains(n.target))||t(n)}}),[e,t])};var U=function(e,t){for(var n=null,a=null,r=0;!n&&r<(null===t||void 0===t?void 0:t.length);r++){var o,c;a=(n=null!==(o=null===(c=t[r].tabs)||void 0===c?void 0:c.find((function(t){return t.key===e})))&&void 0!==o?o:null)?t[r]:null}return{tab:n,section:a}};function Y(){return(Y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}function Z(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var ee=r.createElement("path",{d:"M0 0h24v24H0V0z",fill:"none"}),te=r.createElement("path",{d:"M7 10l5 5 5-5H7z"});function ne(e,t){var n=e.title,a=e.titleId,o=Z(e,["title","titleId"]);return r.createElement("svg",Y({xmlns:"http://www.w3.org/2000/svg",height:"24px",viewBox:"0 0 24 24",width:"24px",fill:"currentColor",ref:t,"aria-labelledby":a},o),n?r.createElement("title",{id:a},n):null,ee,te)}var ae=r.forwardRef(ne),re=(n.p,w("tab")),oe=w("dropdown-tab");function ce(e){var t=e.isOpen,n=e.sectionTitle,r=e.title,o=e.starred,c=e.locked;return Object(a.jsxs)("div",{className:oe(),children:[Object(a.jsx)("span",{className:oe("section-title",["text-truncate"]),children:n}),Object(a.jsx)("span",{className:oe("title",["text-truncate"]),children:r}),o&&Object(a.jsx)("span",{className:oe("indicator",{star:!0})}),c&&Object(a.jsx)("span",{className:oe("indicator",{lock:!0})}),Object(a.jsx)(ae,{className:oe("dropdown-icon",{open:t})})]})}var le=o.a.forwardRef((function(e,t){var n,o,c,l,i,u=e.onWidthChange,d=e.onChange,b=e.sections,v=e.activeKey,f=e.defaultKey,j=e.placeholder,p=void 0===j?"ACTIVE TABS":j,y=Object(r.useState)(!1),O=Object(s.a)(y,2),h=O[0],m=O[1],k=Object(r.useState)((function(){return U(null!==v?v:f,b)})),g=Object(s.a)(k,2),w=g[0],x=g[1];Object(r.useEffect)((function(){x((function(e){var t,n=U(v,b);n.tab||(n=U(null===(t=e.tab)||void 0===t?void 0:t.key,b));return n.tab!==e.tab||n.section!==e.section?n:e}))}),[b,v]);var T=(null===(n=w.tab)||void 0===n?void 0:n.key)===v,C=Object(r.useCallback)((function(){m((function(e){return!e&&(T?!e:!w.tab)})),w.tab&&d(w.tab.key)}),[T,w.tab,d]);Object(r.useEffect)((function(){T||m(!1)}),[T]);var E=Object(r.useCallback)((function(e){null===d||void 0===d||d(e),m(!1)}),[d]),S=Object(r.useRef)(null),K=Object(r.useRef)({}),N=Object(r.useCallback)((function(){m(!1)}),[]);Q(K,N),Object(r.useLayoutEffect)((function(){var e,t=null!==(e=K.current.clientWidth)&&void 0!==e?e:0;S.current!==t&&(S.current=t,null===u||void 0===u||u(t))}));var A=null===(o=w.tab)||void 0===o?void 0:o.title,I=null===(c=w.section)||void 0===c?void 0:c.title,L=null===(l=w.tab)||void 0===l?void 0:l.starred,R=null===(i=w.tab)||void 0===i?void 0:i.locked;return Object(a.jsxs)("div",{ref:function(e){t&&("function"===typeof t?t(e):t.current=e),K.current=e},className:re({active:T,dropdown:!0}),style:{position:"relative"},onClick:C,children:[w.tab&&Object(a.jsx)(ce,{isOpen:h,sectionTitle:I,title:A,starred:L,locked:R}),!w.tab&&p,h&&Object(a.jsx)(G,{sections:b,onChange:E,activeKey:v})]})}));var ie=function(e){var t=e.left,n=e.width;return Object(a.jsx)("div",{className:"tabs-slider",style:{left:t,width:n}})},se={isDisplayed:!1,width:0,left:0};function ue(e,t){return e.isDisplayed===t.isDisplayed&&e.left===t.left&&e.width===t.width}var de=function(e,t){var n=Object(r.useRef)({tabsElements:{},dropdownTabElement:null}),a=Object(r.useState)({isDisplayed:!1,width:0,left:0}),o=Object(s.a)(a,2),c=o[0],l=o[1];Object(r.useLayoutEffect)((function(){var a,r,o,c;if(null!=e){var i,s=n.current.tabsElements[e];if(!s)s=!!(null===(i=U(e,t))||void 0===i?void 0:i.tab)?n.current.dropdownTabElement:null;var u={isDisplayed:!!s,width:null!==(a=null===(r=s)||void 0===r?void 0:r.getBoundingClientRect().width)&&void 0!==a?a:0,left:null!==(o=null===(c=s)||void 0===c?void 0:c.offsetLeft)&&void 0!==o?o:0};l((function(e){return ue(e,u)?e:u}))}else l((function(e){return ue(e,se)?e:se}))}));var u=Object(r.useCallback)((function(){l((function(e){var t,a,r,o;return Object(i.a)(Object(i.a)({},e),{},{width:null!==(t=null===(a=n.current.dropdownTabElement)||void 0===a?void 0:a.getBoundingClientRect().width)&&void 0!==t?t:0,left:null!==(r=null===(o=n.current.dropdownTabElement)||void 0===o?void 0:o.offsetLeft)&&void 0!==r?r:0})}))}),[]);return{elementsRef:n,sliderDisplayInfo:c,onDropdownTabWidthChange:u}};var be=function(e){var t=e.tabs,n=e.sections,o=e.onChange,c=(e.onDropdownTabClose,e.activeKey),l=e.defaultActiveKey,i=Object(r.useState)((function(){return void 0!==c?c:null!==l&&void 0!==l?l:null})),u=Object(s.a)(i,2),d=u[0],b=u[1],v=Object(r.useCallback)((function(e){o&&e!==Symbol.for("dropdownTab")&&o(e),b(e)}),[o]),f=void 0!==c?c:d,j=Object(r.useMemo)((function(){return n.some((function(e){return e.tabs.length}))}),[n]),p=de(f,n),y=p.elementsRef,O=p.sliderDisplayInfo,h=p.onDropdownTabWidthChange;return Object(a.jsxs)("div",{className:"tabs",children:[t.map((function(e){return Object(a.jsx)(T,{title:e.title,ref:function(t){y.current.tabsElements[e.key]=t},onClick:function(){return v(e.key)},active:f===e.key},e.key)})),j&&Object(a.jsx)(le,{ref:function(e){return y.current.dropdownTabElement=e},activeKey:f,onChange:v,sections:n,defaultKey:l,onWidthChange:h}),O.isDisplayed&&Object(a.jsx)(ie,{left:O.left,width:O.width})]})};var ve=function(){var e=m(),t=e.tabs,n=e.sections,r=e.activeKey,o=e.setActiveKey,c=e.onTabClose;return Object(a.jsx)(be,{activeKey:r,tabs:t,sections:n,onChange:function(e){return o(e)},onDropdownTabClose:c})};var fe=function(e){var t=e.children,n=e.tag,r=void 0===n?"section":n;return Object(a.jsx)(r,{children:t})},je=w("tab-pane");function pe(e){var t=e.className,n=e.active,r=e.tab;return Object(a.jsx)("div",{className:je({active:n,hidden:!n},[t]),role:"tabpanel",children:Object(a.jsx)(fe,{children:Object(a.jsx)("h1",{children:r.title})})})}var ye=Object(r.memo)(pe),Oe=w("tap-panes-container");var he=function(e){var t=e.className,n=e.classNameInner,o=m(),c=o.tabs,l=o.sections,i=o.activeKey,s=Object(r.useMemo)((function(){var e,t,n=c?Object(f.a)(c):[];return n=null!==(e=null===l||void 0===l||null===(t=l.reduce)||void 0===t?void 0:t.call(l,(function(e,t){var n;return(null===(n=t.tabs)||void 0===n?void 0:n.length)&&e.push.apply(e,Object(f.a)(t.tabs)),e}),n))&&void 0!==e?e:n}),[c,l]),u=Object(r.useRef)(null);Object(r.useEffect)((function(){u.current=i}),[i]);var d=Object(r.useMemo)((function(){return s.findIndex((function(e){return e.key===i}))}),[s,i]);return Object(a.jsx)("div",{className:Oe(null,[t]),children:Object(a.jsx)("div",{className:Oe("inner",null,[n]),style:{transform:"translateX(-".concat(d,"00%)")},children:s.map((function(e){return Object(a.jsx)(ye,{active:i===e.key,tab:e},e.key)}))})})};function me(){var e=[{key:"s0",title:"Active",tabs:[{key:"dropdownTab0",title:"Dropdown Tab 0"},{key:"dropdownTab1",title:"Menu item 1",locked:!0,starred:!0}]},{key:"s1",title:new Array(10).fill("Long Section Title").join(" "),tabs:[{key:"dropdownTab2",title:new Array(10).fill("Dropdown menu item 2").join(" "),starred:!0},{key:"dropdownTab3",title:"Dropdown tab 3",locked:!0}]},{key:"s2",title:"Empty Section",tabs:[]}];return Object(a.jsx)(h,{defaultActiveKey:"0",initialTabs:[{key:"0",title:"OVERVIEW"}],initialSections:e,children:Object(a.jsxs)("main",{style:{padding:100},children:[Object(a.jsx)(ve,{}),Object(a.jsx)(he,{}),Object(a.jsx)(ge,{})]})})}var ke=10;function ge(){var e,t=Object(r.useContext)(O),n=t.activeKey,o=t.setActiveKey,c=t.toggleStar,l=t.toggleLock,i=t.sections,s=t.closeDropdownTab,u=t.addTabs,d=!!(null===(e=U(n,i))||void 0===e?void 0:e.tab);return Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Change dropdown tab"}),Object(a.jsx)("button",{disabled:!d,onClick:function(){n&&c(n)},children:"Toggle Star"}),Object(a.jsx)("button",{disabled:!d,onClick:function(){n&&l(n)},children:"Toggle Lock"}),Object(a.jsx)("button",{disabled:!d,onClick:function(){n&&s(n)},children:"Close"}),Object(a.jsx)("button",{onClick:function(){var e="dropdownTab".concat(ke++);u({dropdownTabs:{s0:[{key:e,title:"New Tab"}]}}),o(e)},children:"Add"})]})}n(20);var we=document.getElementById("root");l.a.render(Object(a.jsx)(me,{}),we)}},[[21,1,2]]]);
//# sourceMappingURL=main.377e8897.chunk.js.map