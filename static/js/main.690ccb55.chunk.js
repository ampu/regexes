(this.webpackJsonpregexes=this.webpackJsonpregexes||[]).push([[0],{149:function(e,t,a){},150:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a.n(n),r=a(50),c=a.n(r),l=a(11),i=a(2),o=a(51),h=a.n(o);const u={INDEX:"/",MATCHER:"/",MATCH_ALL:"/match-all"},g={BROWSER_JS:{title:"JavaScript (browser)",value:"browser-js"},NODE_JS:{title:"JavaScript (node.js)",value:"node-js"},PHP:{title:"PHP",value:"php"},PYTHON:{title:"Python",value:"python"},RUBY:{title:"Ruby",value:"ruby"},DOTNET:{title:".NET (C#)",value:"dotnet"},JVM:{title:"JVM (Kotlin)",value:"jvm"},GO:{title:"Go",value:"go"},RUST:{title:"Rust",value:"rust"},PCRE1:{title:"PCRE1 (C++)",value:"pcre1"},PCRE2:{title:"PCRE2 (C++)",value:"pcre2"}},m=Object.values(g),j=e=>Object.values(g).find((t=>t.value===e)),d=a(58),p=e=>{const t=[];for(const a of e){(t.find((e=>d(e[0].matches,a.matches)&&d(e[0].error,a.error)))||t[t.push([])-1]).push(a)}return t},{nanoid:b}=a(151),{formatTimestamp:x}=a(26);var O=a(26),S=a(52),_=a.n(S);const f=new class{constructor(){this._client=_.a.create({timeout:1e4})}buildURL(e){return`https://regexes.herokuapp.com/${e}`}async matchAll(e,t,a,n,s){const{data:r}=await this._client.request({method:"post",url:this.buildURL("match-all"),params:{requestId:e},data:{engineValues:t,text:a,pattern:n,flagsValue:s}});return r.results}};const v=new class{constructor(e,t){this._storage=e,this._key=t}getEngines(e=m){try{return JSON.parse(this._storage.getItem(this._key)).map((e=>j(e))).filter(Boolean)||e}catch(t){return e}}setEngines(e){try{const t=e.map((e=>e.value));return this._storage.setItem(this._key,JSON.stringify(t)),!0}catch(t){return!1}}}(localStorage,"regexes__engines");var N=a(0);const E=[],M={IGNORE_CASE:{title:"Ignore Case",value:"i"},SINGLE_LINE:{title:"Single Line",value:"s"},MULTILINE:{title:"Multiline",value:"m"},UNICODE:{title:"Unicode",value:"u"}},R=(e,t)=>a=>{const n=a.includes(t);return Object.values(e).filter((e=>n?a.includes(e)&&e!==t:a.includes(e)||e===t))},y=async(e,t,a,n,s)=>{const r=g.BROWSER_JS.value,c=t.filter((e=>e!==g.BROWSER_JS.value)),l=[];if(t.includes(r)){const e=((e,t,a,n)=>{const s=new Date;try{const r=new RegExp(a,`${n}g`),c=t.matchAll(r),l=Array.from(c);return{engineValue:e,performance:new Date-s,matches:l.map((e=>({index:e.index,substring:e[0]})))}}catch(r){return{engineValue:e,performance:new Date-s,error:{message:r.message}}}})(r,a,n,s);l.push({...e,text:a})}if(c.length>0)try{const t=await f.matchAll(e,c,a,n,s);l.push(...t.map((e=>({...e,text:a}))))}catch(i){l.push({engineValue:"remote",error:{message:i.message}})}return l},C=(e,t)=>{if(0===t.length)return[e];let a=0;const n=[];for(const s of t)n.push(e.substring(a,s.index),s.substring),a=s.index+s.substring.length;return n.push(e.substring(a)),n},T=()=>{const[e,t]=s.a.useState(m),[a,n]=s.a.useState(""),[r,c]=s.a.useState(""),[l,i]=s.a.useState([]),[o,d]=s.a.useState(E),[S,_]=s.a.useState(!1),[f,T]=s.a.useState(),k=s.a.useRef();return s.a.useEffect((()=>{t(v.getEngines())}),[]),s.a.useEffect((()=>{v.setEngines(e)}),[e]),s.a.useEffect((()=>{_(!0)}),[a,r,l]),Object(N.jsx)(N.Fragment,{children:Object(N.jsxs)("main",{className:"matcher-page",children:[Object(N.jsx)("h1",{children:"Regular Expression Pattern Matcher"}),Object(N.jsxs)("div",{className:"matcher-page__inner",children:[Object(N.jsxs)("form",{method:"post",action:u.MATCH_ALL,children:[Object(N.jsxs)("fieldset",{className:"matcher-page__item",children:[Object(N.jsx)("legend",{className:"matcher-page__engine-title",children:"Engines"}),Object(N.jsx)("div",{className:"matcher-page__engines-inner",children:Object.values(g).map((a=>Object(N.jsxs)("label",{className:"matcher-page__checkbox-label",children:[Object(N.jsx)("input",{type:"checkbox",name:"engines",value:a.value,checked:e.includes(a),onChange:()=>{t(R(g,a))},disabled:a.disabled}),a.title]},a.value)))})]}),Object(N.jsxs)("div",{className:"matcher-page__item",children:[Object(N.jsx)("label",{className:"matcher-page__engine-title",children:"Text"}),Object(N.jsx)("textarea",{name:"text",rows:"3",value:a,onChange:e=>n(e.currentTarget.value)})]}),Object(N.jsxs)("div",{className:"matcher-page__item",children:[Object(N.jsx)("label",{htmlFor:"matcher-pattern",className:"matcher-page__engine-title",children:"Pattern (regular expression)"}),Object(N.jsx)("div",{className:"matcher-page__pattern-inner",children:Object(N.jsx)("input",{id:"matcher-pattern",type:"text",name:"pattern",value:r,onChange:e=>c(e.currentTarget.value)})})]}),Object(N.jsx)("fieldset",{className:"matcher-page__item",children:Object.values(M).map((e=>Object(N.jsxs)("label",{className:"matcher-page__checkbox-label",children:[Object(N.jsx)("input",{type:"checkbox",name:"flags",value:e.value,checked:l.includes(e),onChange:()=>{i(R(M,e))}}),e.title," (/",e.value,")"]},e.value)))}),Object(N.jsx)("button",{type:"submit",disabled:0===e.length,onClick:t=>{t.preventDefault();const n=(({isSafe:e=!0})=>e?b():x(new Date))({isSafe:!1}),s=e.map((e=>e.value)),c=l.map((e=>e.value)).join("");T(k.current=n),_(!0),y(n,s,a,r,c).then((e=>{k.current===n&&(d(e),_(!1),T(k.current=void 0))})).catch((()=>{k.current===n&&T(k.current=void 0)}))},children:"Match All"})]}),Object(N.jsxs)("ul",{className:"matcher-page__results",children:[0===e.length&&Object(N.jsx)("li",{className:"matcher-page__item",children:Object(N.jsx)("span",{children:"No engines checked. Please select one..."})},"no-engines"),e.length>0&&(0===o.length||S)&&Object(N.jsxs)("li",{className:"matcher-page__item",children:[!f&&Object(N.jsx)("span",{children:"Click \xabMatch All\xbb button to receive results..."}),f&&Object(N.jsx)("span",{children:"Evaluating..."})]},"can-match"),o.length>0&&p(o).map((e=>{const{engineValue:t,matches:a,error:n,text:s}=e[0];let r="";return r=n?"Error":0===a.length?"No matches found":"Matches",Object(N.jsxs)("li",{className:h()("matcher-page__item",S&&"stale"),children:[Object(N.jsxs)("h2",{className:"matcher-page__group-title",children:[r," ",e.length>1&&`(${e.length} engines)`]}),e.map((({engineValue:e,performance:t})=>{const a=j(e);return Object(N.jsxs)("h3",{className:"matcher-page__group-item-title",children:[a?a.title:e,Number.isFinite(t)&&Object(N.jsxs)("span",{className:"matcher-page__result-performance",children:[" (in ",Object(O.formatTotalSeconds)(t),"s)"]})]},e)})),n&&Object(N.jsx)(N.Fragment,{children:Object(N.jsx)("span",{children:n.message})}),!n&&a.length>0&&Object(N.jsx)(N.Fragment,{children:Object(N.jsx)("ol",{children:a.map(((e,t)=>Object(N.jsxs)("li",{children:["\u201c",e.substring,"\u201c"]},t)))})}),!n&&Object(N.jsx)("p",{className:"matcher-page__text-with-matches",children:C(s,a).map(((e,t)=>t%2===1?Object(N.jsx)("b",{children:e},t):Object(N.jsx)("span",{children:e},t)))})]},t)}))]})]})]})})},k=()=>Object(N.jsx)(N.Fragment,{children:Object(N.jsxs)("main",{className:"not-found-page",children:[Object(N.jsx)("h1",{children:"\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u0430"}),Object(N.jsx)(l.b,{className:"page-link",to:u.INDEX,children:"\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u043d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443"})]})}),w=()=>Object(N.jsx)(N.Fragment,{children:Object(N.jsxs)(i.c,{children:[Object(N.jsx)(i.a,{exact:!0,path:u.MATCHER,children:Object(N.jsx)(T,{})}),Object(N.jsx)(i.a,{children:Object(N.jsx)(k,{})})]})});a(149);c.a.render(Object(N.jsx)(n.StrictMode,{children:Object(N.jsx)(l.a,{children:Object(N.jsx)(w,{})})}),document.querySelector("#root"))},26:function(e,t){e.exports={formatDate:function(e){return e.getFullYear().toString(10)+"-"+(e.getMonth()+1).toString(10).padStart(2,"0")+"-"+e.getDate().toString(10).padStart(2,"0")},formatTimestamp:function(e,t){return"undefined"===typeof t&&(t=!0),e.getFullYear().toString(10)+"-"+(e.getMonth()+1).toString(10).padStart(2,"0")+"-"+e.getDate().toString(10).padStart(2,"0")+" "+e.getHours().toString(10).padStart(2,"0")+":"+e.getMinutes().toString(10).padStart(2,"0")+":"+e.getSeconds().toString(10).padStart(2,"0")+(t?"."+e.getMilliseconds().toString(10).padStart(3,"0"):"")},formatTimespan:function(e){const t=Math.floor(e%1e3),a=Math.floor(e/1e3),n=a%60,s=Math.floor(a/60),r=s%60;return Math.floor(s/60).toString().padStart(2,0)+":"+r.toString().padStart(2,0)+":"+n.toString().padStart(2,0)+"."+t.toString().padStart(3,0)},formatTotalSeconds:function(e){const t=Math.floor(e%1e3);return Math.floor(e/1e3).toString()+"."+t.toString().padStart(3,0)}}}},[[150,1,2]]]);
//# sourceMappingURL=main.690ccb55.chunk.js.map