(function(e){function t(t){for(var o,r,l=t[0],c=t[1],s=t[2],u=0,p=[];u<l.length;u++)r=l[u],Object.prototype.hasOwnProperty.call(a,r)&&a[r]&&p.push(a[r][0]),a[r]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);d&&d(t);while(p.length)p.shift()();return i.push.apply(i,s||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,r=1;r<n.length;r++){var l=n[r];0!==a[l]&&(o=!1)}o&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var o={},r={3:0},a={3:0},i=[];function l(e){return c.p+"js/"+({}[e]||e)+".js"}function c(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={4:1,5:1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var o="css/"+({}[e]||e)+"."+{1:"31d6cfe0",2:"31d6cfe0",4:"ba8d6182",5:"4fa91f3f",6:"31d6cfe0",7:"31d6cfe0",8:"31d6cfe0",9:"31d6cfe0"}[e]+".css",a=c.p+o,i=document.getElementsByTagName("link"),l=0;l<i.length;l++){var s=i[l],u=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(u===o||u===a))return t()}var p=document.getElementsByTagName("style");for(l=0;l<p.length;l++){s=p[l],u=s.getAttribute("data-href");if(u===o||u===a)return t()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=t,d.onerror=function(t){var o=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+o+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=o,delete r[e],d.parentNode.removeChild(d),n(i)},d.href=a;var f=document.getElementsByTagName("head")[0];f.appendChild(d)})).then((function(){r[e]=0})));var o=a[e];if(0!==o)if(o)t.push(o[2]);else{var i=new Promise((function(t,n){o=a[e]=[t,n]}));t.push(o[2]=i);var s,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=l(e);var p=new Error;s=function(t){u.onerror=u.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;p.message="Loading chunk "+e+" failed.\n("+o+": "+r+")",p.name="ChunkLoadError",p.type=o,p.request=r,n[1](p)}a[e]=void 0}};var d=setTimeout((function(){s({type:"timeout",target:u})}),12e4);u.onerror=u.onload=s,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=o,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)c.d(n,o,function(t){return e[t]}.bind(null,o));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="",c.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=t,s=s.slice();for(var p=0;p<s.length;p++)t(s[p]);var d=u;i.push([0,0]),n()})({0:function(e,t,n){e.exports=n("2f39")},"0047":function(e,t,n){},"2f39":function(e,t,n){"use strict";n.r(t);n("e6cf"),n("5319"),n("7d6e"),n("e54f"),n("985d"),n("0047");var o=n("2b0e"),r=n("1f91"),a=n("42d2"),i=n("b05d"),l=n("2a19"),c=n("f508");o["a"].use(i["a"],{config:{},lang:r["a"],iconSet:a["a"],plugins:{Notify:l["a"],Loading:c["a"]}});var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"q-app"}},[n("router-view")],1)},u=[],p={name:"App"},d=p,f=n("2877"),h=Object(f["a"])(d,s,u,!1,null,null,null),m=h.exports,g=n("2f62");o["a"].use(g["a"]);var b=function(){const e=new g["a"].Store({modules:{},strict:!1});return e},w=n("8c4f");const y=[{path:"/",component:()=>Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"713b")),children:[{path:"/",component:()=>Promise.all([n.e(0),n.e(6)]).then(n.bind(null,"8b24"))}]},{path:"/register",component:()=>Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"713b")),children:[{path:"/register",component:()=>Promise.all([n.e(0),n.e(7)]).then(n.bind(null,"3ae4"))}]},{path:"/jobs",component:()=>Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"9329")),children:[{path:"/jobs",component:()=>Promise.all([n.e(0),n.e(4)]).then(n.bind(null,"8758"))}]},{path:"/profile",component:()=>Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"9329")),children:[{path:"/profile",component:()=>Promise.all([n.e(0),n.e(5)]).then(n.bind(null,"996f"))}]},{path:"/admin",component:()=>Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"9329")),children:[{path:"/admin",component:()=>Promise.all([n.e(0),n.e(9)]).then(n.bind(null,"de12"))}]},{path:"*",component:()=>Promise.all([n.e(0),n.e(8)]).then(n.bind(null,"e51e"))}];var v=y;o["a"].use(w["a"]);var P=function(){const e=new w["a"]({scrollBehavior:()=>({x:0,y:0}),routes:v,mode:"hash",base:""});return e},k=async function(){const e="function"===typeof b?await b({Vue:o["a"]}):b,t="function"===typeof P?await P({Vue:o["a"],store:e}):P;e.$router=t;const n={router:t,store:e,render:e=>e(m),el:"#q-app"};return{app:n,store:e,router:t}},S=({Vue:e})=>{e.prototype.$getNotifications=async()=>{FCM.onNotification((e=>{l["a"].create({message:e.body,caption:e.title,multiLine:!0,color:"secondary",position:"top"})}))},e.prototype.$getTokenNotifications=async()=>await FCM.getToken()},j=n("bc3a"),C=n.n(j);const E=C.a.create({baseURL:"https://geowork-api.herokuapp.com/api"});var O=({Vue:e})=>{e.prototype.$axios=E},x=async({store:e,router:t})=>{t.beforeEach(((e,t,n)=>{const o=window.localStorage.getItem("token");let r=!1;return"/"!=e.path&&"/register"!=e.path||(r=!0),o||0!=r?o&&1==r?n({path:"/jobs"}):void n():n({path:"/"})}))},M=async({store:e,router:t})=>{t.beforeEach(((e,t,n)=>{const o=window.localStorage.getItem("role");let r=!1;if("/admin"==e.path&&(r=!0),"admin"!=o&&1==r)return n({path:"/jobs"});n()}))},_=n("0967"),T=async({store:e,router:t})=>{t.beforeEach((async(e,t,n)=>{if(1!=_["b"].is.desktop){if(window.localStorage.getItem("token")||window.localStorage.getItem(0!="token".length)){const e=window.localStorage.getItem("FCMtoken"),t=await FCM.getToken();if(e!==t)try{window.localStorage.setItem("FCMtoken",t),await E.patch("/FCMtoken-renew",{FCMtoken:t},{headers:{token:window.localStorage.getItem("token")}})}catch(o){console.log(o.response.data)}else console.log("token updated")}n()}else n()}))};const L="";async function N(){const{app:e,store:t,router:n}=await k();let r=!1;const a=e=>{r=!0;const t=Object(e)===e?n.resolve(e).route.fullPath:e;window.location.href=t},i=window.location.href.replace(window.location.origin,""),l=[S,O,x,M,T];for(let s=0;!1===r&&s<l.length;s++)if("function"===typeof l[s])try{await l[s]({app:e,router:n,store:t,Vue:o["a"],ssrContext:null,redirect:a,urlPath:i,publicPath:L})}catch(c){return c&&c.url?void(window.location.href=c.url):void console.error("[Quasar] boot error:",c)}!0!==r&&document.addEventListener("deviceready",(()=>{o["a"].prototype.$q.cordova=window.cordova,new o["a"](e)}),!1)}N()}});