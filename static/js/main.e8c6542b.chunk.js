(this.webpackJsonpregexes=this.webpackJsonpregexes||[]).push([[0],{15:function(e,t){e.exports={formatDate:function(e){return e.getFullYear().toString(10)+"-"+(e.getMonth()+1).toString(10).padStart(2,"0")+"-"+e.getDate().toString(10).padStart(2,"0")},formatTimestamp:function(e,t){return"undefined"===typeof t&&(t=!0),e.getFullYear().toString(10)+"-"+(e.getMonth()+1).toString(10).padStart(2,"0")+"-"+e.getDate().toString(10).padStart(2,"0")+" "+e.getHours().toString(10).padStart(2,"0")+":"+e.getMinutes().toString(10).padStart(2,"0")+":"+e.getSeconds().toString(10).padStart(2,"0")+(t?"."+e.getMilliseconds().toString(10).padStart(3,"0"):"")},formatTimespan:function(e){const t=Math.floor(e%1e3),a=Math.floor(e/1e3),s=a%60,n=Math.floor(a/60),r=n%60;return Math.floor(n/60).toString().padStart(2,0)+":"+r.toString().padStart(2,0)+":"+s.toString().padStart(2,0)+"."+t.toString().padStart(3,0)},formatTotalSeconds:function(e){const t=Math.floor(e%1e3);return Math.floor(e/1e3).toString()+"."+t.toString().padStart(3,0)}}},58:function(e,t,a){},59:function(e,t,a){"use strict";a.r(t);var s=a(1),n=a.n(s),r=a(27),c=a.n(r),l=a(9),i=a(2);const o={INDEX:"/",MATCHER:"/",MATCH_ALL:"/match-all"},h={BROWSER_JS:{title:"JavaScript (browser)",value:"browser-js"},NODE_JS:{title:"JavaScript (node.js)",value:"node-js"},PHP:{title:"PHP",value:"php"},PYTHON:{title:"Python",value:"python"},RUBY:{title:"Ruby",value:"ruby"},DOTNET:{title:".NET (C#)",value:"dotnet"},JVM:{title:"JVM (Kotlin)",value:"jvm"},PCRE1:{title:"PCRE1 (C++)",value:"pcre1"},PCRE2:{title:"PCRE2 (C++)",value:"pcre2"}},u=Object.values(h),m=e=>Object.values(h).find((t=>t.value===e)),{nanoid:g}=a(60),{formatTimestamp:j}=a(15);var d=a(15),p=a(28),b=a.n(p);const x=new class{constructor(){this._client=b.a.create({timeout:5e3})}buildURL(e){return`http://188.225.47.232:3001/${e}`}async matchAll(e,t,a,s,n){const{data:r}=await this._client.request({method:"post",url:this.buildURL("match-all"),params:{requestId:e},data:{engineValues:t,text:a,pattern:s,flagsValue:n}});return r}};const O=new class{constructor(e,t){this._storage=e,this._key=t}getEngines(e=u){try{return JSON.parse(this._storage.getItem(this._key)).map((e=>m(e))).filter(Boolean)||e}catch(t){return e}}setEngines(e){try{const t=e.map((e=>e.value));return this._storage.setItem(this._key,JSON.stringify(t)),!0}catch(t){return!1}}}(localStorage,"regexes__engines");var S=a(0);const _=[],f={IGNORE_CASE:{title:"Ignore Case",value:"i"},SINGLE_LINE:{title:"Single Line",value:"s"},MULTILINE:{title:"Multiline",value:"m"},UNICODE:{title:"Unicode",value:"u"}},v=(e,t)=>a=>{const s=a.includes(t);return Object.values(e).filter((e=>s?a.includes(e)&&e!==t:a.includes(e)||e===t))},N=async(e,t,a,s,n)=>{const r=h.BROWSER_JS.value,c=t.filter((e=>e!==h.BROWSER_JS.value)),l=[];if(t.includes(r)){const e=((e,t,a,s)=>{const n=new Date;try{const r=new RegExp(a,`${s}g`),c=t.matchAll(r),l=Array.from(c);return{engineValue:e,performance:new Date-n,matches:l.map((e=>({index:e.index,substring:e[0]})))}}catch(r){return{engineValue:e,performance:new Date-n,error:{message:r.message}}}})(r,a,s,n);l.push(e)}if(c.length>0)try{const t=await x.matchAll(e,c,a,s,n);l.push(...t.results)}catch(i){l.push({engineValue:"remote",error:{message:i.message}})}return l},E=(e,t)=>{if(0===t.length)return[e];let a=0;const s=[];for(const n of t)s.push(e.substring(a,n.index),n.substring),a=n.index+n.substring.length;return s.push(e.substring(a)),s},M=()=>{const[e,t]=n.a.useState(u),[a,s]=n.a.useState(""),[r,c]=n.a.useState(""),[l,i]=n.a.useState([]),[p,b]=n.a.useState(_),[x,M]=n.a.useState(),y=n.a.useRef();return n.a.useEffect((()=>{t(O.getEngines())}),[]),n.a.useEffect((()=>{O.setEngines(e)}),[e]),n.a.useEffect((()=>{b(_)}),[a,r,l]),Object(S.jsx)(S.Fragment,{children:Object(S.jsxs)("main",{className:"matcher-page",children:[Object(S.jsx)("h1",{children:"Regular Expression Pattern Matcher"}),Object(S.jsxs)("div",{className:"matcher-page__inner",children:[Object(S.jsxs)("form",{method:"post",action:o.MATCH_ALL,children:[Object(S.jsxs)("fieldset",{className:"matcher-page__item",children:[Object(S.jsx)("legend",{className:"matcher-page__item-title",children:"Engines"}),Object(S.jsx)("div",{className:"matcher-page__engines-inner",children:Object.values(h).map((a=>Object(S.jsxs)("label",{className:"matcher-page__checkbox-label",children:[Object(S.jsx)("input",{type:"checkbox",name:"engines",value:a.value,checked:e.includes(a),onChange:()=>{t(v(h,a))},disabled:a.disabled}),a.title]},a.value)))})]}),Object(S.jsxs)("div",{className:"matcher-page__item",children:[Object(S.jsx)("label",{className:"matcher-page__item-title",children:"Text"}),Object(S.jsx)("textarea",{name:"text",rows:"3",value:a,onChange:e=>s(e.currentTarget.value)})]}),Object(S.jsxs)("div",{className:"matcher-page__item",children:[Object(S.jsx)("label",{htmlFor:"matcher-pattern",className:"matcher-page__item-title",children:"Pattern (regular expression)"}),Object(S.jsx)("div",{className:"matcher-page__pattern-inner",children:Object(S.jsx)("input",{id:"matcher-pattern",type:"text",name:"pattern",value:r,onChange:e=>c(e.currentTarget.value)})})]}),Object(S.jsx)("fieldset",{className:"matcher-page__item",children:Object.values(f).map((e=>Object(S.jsxs)("label",{className:"matcher-page__checkbox-label",children:[Object(S.jsx)("input",{type:"checkbox",name:"flags",value:e.value,checked:l.includes(e),onChange:()=>{i(v(f,e))}}),e.title," (/",e.value,")"]},e.value)))}),Object(S.jsx)("button",{type:"submit",disabled:0===e.length,onClick:t=>{t.preventDefault();const s=(({isSafe:e=!0})=>e?g():j(new Date))({isSafe:!1}),n=e.map((e=>e.value)),c=l.map((e=>e.value)).join("");M(y.current=s),b(_),N(s,n,a,r,c).then((e=>{y.current===s&&(b(e),M(y.current=void 0))})).catch((()=>{y.current===s&&M(y.current=void 0)}))},children:"Match All"})]}),Object(S.jsxs)("ul",{className:"matcher-page__results",children:[0===e.length&&Object(S.jsx)("li",{className:"matcher-page__item",children:Object(S.jsx)("span",{children:"No engines checked. Please select one..."})},"all"),e.length>0&&0===p.length&&Object(S.jsxs)("li",{className:"matcher-page__item",children:[!x&&Object(S.jsx)("span",{children:"Click \xabMatch All\xbb button to receive results..."}),x&&Object(S.jsx)("span",{children:"Evaluating..."})]},"all"),p.length>0&&p.map((({engineValue:e,performance:t,matches:s,error:n})=>{let r="";r=n?"Error":0===s.length?"No matches found":"Matches";const c=m(e);return Object(S.jsxs)("li",{className:"matcher-page__item",children:[Object(S.jsxs)("h2",{className:"matcher-page__item-title",children:[c?c.title:e," - ",r,Number.isFinite(t)&&Object(S.jsxs)("span",{className:"matcher-page__result-performance",children:[" (in ",Object(d.formatTotalSeconds)(t),"s)"]})]}),n&&Object(S.jsx)(S.Fragment,{children:Object(S.jsx)("span",{children:n.message})}),!n&&s.length>0&&Object(S.jsx)(S.Fragment,{children:Object(S.jsx)("ol",{children:s.map(((e,t)=>Object(S.jsxs)("li",{children:["\u201c",e.substring,"\u201c"]},t)))})}),!n&&Object(S.jsx)("p",{className:"matcher-page__text-with-matches",children:E(a,s).map(((e,t)=>t%2===1?Object(S.jsx)("b",{children:e},t):Object(S.jsx)("span",{children:e},t)))})]},e)}))]})]})]})})},y=()=>Object(S.jsx)(S.Fragment,{children:Object(S.jsxs)("main",{className:"not-found-page",children:[Object(S.jsx)("h1",{children:"\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u0430"}),Object(S.jsx)(l.b,{className:"page-link",to:o.INDEX,children:"\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u043d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443"})]})}),C=()=>Object(S.jsx)(S.Fragment,{children:Object(S.jsxs)(i.c,{children:[Object(S.jsx)(i.a,{exact:!0,path:o.MATCHER,children:Object(S.jsx)(M,{})}),Object(S.jsx)(i.a,{children:Object(S.jsx)(y,{})})]})});a(58);c.a.render(Object(S.jsx)(s.StrictMode,{children:Object(S.jsx)(l.a,{children:Object(S.jsx)(C,{})})}),document.querySelector("#root"))}},[[59,1,2]]]);
//# sourceMappingURL=main.e8c6542b.chunk.js.map