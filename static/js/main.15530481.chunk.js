(this.webpackJsonpregexes=this.webpackJsonpregexes||[]).push([[0],{57:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var c=a(1),s=a.n(c),l=a(26),n=a.n(l),r=a(9),i=a(2);const h={INDEX:"/",MATCHER:"/",MATCH_ALL:"/match-all"};var j=a(27),m=a.n(j);const u=new class{constructor(){this._client=m.a.create({timeout:5e3})}async matchAll(e,t,a,c){const{data:s}=await this._client.get("http://localhost:3001/match-all",{params:{engineValues:e,text:t,pattern:a,flagsValue:c}});return s}};var b=a(0);const d={BROWSER_JS:{title:"JavaScript (browser)",value:"browser-js"},NODE_JS:{title:"JavaScript (node.js)",value:"node-js"},PHP:{title:"PHP",value:"php"}},o={IGNORE_CASE:{title:"Ignore Case",value:"i"},SINGLE_LINE:{title:"Single Line",value:"s"},MULTILINE:{title:"Multiline",value:"m"}},g=(e,t)=>a=>{const c=a.includes(t);return Object.values(e).filter((e=>c?a.includes(e)&&e!==t:a.includes(e)||e===t))},x=async(e,t,a,c)=>{const s=d.BROWSER_JS.value,l=e.filter((e=>e!==d.BROWSER_JS.value)),n=[];if(e.includes(s)){const e=((e,t,a,c)=>{try{const s=new RegExp(a,`${c}g`),l=t.matchAll(s);return{engineValue:e,matches:Array.from(l)}}catch(s){return{engineValue:e,error:{message:s.message}}}})(s,t,a,c);n.push(e)}if(l.length>0)try{const e=await u.matchAll(l,t,a,c);n.push(...e)}catch(r){n.push({engineValue:"remote",error:{message:r.message}})}return n},p=()=>{const[e,t]=s.a.useState([d.BROWSER_JS]),[a,c]=s.a.useState(""),[l,n]=s.a.useState(""),[r,i]=s.a.useState([]),[j,m]=s.a.useState([]),[,u]=s.a.useState(!1);return Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("main",{className:"matcher-page",children:[Object(b.jsx)("h1",{children:"Regular Expression Pattern Matcher"}),Object(b.jsxs)("form",{method:"post",action:h.MATCH_ALL,children:[Object(b.jsxs)("fieldset",{className:"matcher-page__item",children:[Object(b.jsx)("legend",{className:"matcher-page__item-title",children:"Engine"}),Object.values(d).map((a=>Object(b.jsxs)("label",{className:"matcher-page__checkbox-label",children:[Object(b.jsx)("input",{type:"checkbox",name:"engines",value:a.value,checked:e.includes(a),onChange:()=>{t(g(d,a))},disabled:a.disabled}),a.title]},a.value)))]}),Object(b.jsxs)("div",{className:"matcher-page__item",children:[Object(b.jsx)("label",{className:"matcher-page__item-title",children:"Text"}),Object(b.jsx)("textarea",{name:"text",rows:"3",value:a,onChange:e=>c(e.currentTarget.value)})]}),Object(b.jsxs)("div",{className:"matcher-page__item",children:[Object(b.jsx)("label",{htmlFor:"matcher-pattern",className:"matcher-page__item-title",children:"Pattern (regular expression)"}),Object(b.jsx)("div",{className:"matcher-page__pattern-inner",children:Object(b.jsx)("input",{id:"matcher-pattern",type:"text",name:"pattern",value:l,onChange:e=>n(e.currentTarget.value)})})]}),Object(b.jsx)("fieldset",{className:"matcher-page__item",children:Object.values(o).map((e=>Object(b.jsxs)("label",{className:"matcher-page__checkbox-label",children:[Object(b.jsx)("input",{type:"checkbox",name:"flags",value:e.value,checked:r.includes(e),onChange:()=>{i(g(o,e))}}),e.title," (/",e.value,")"]},e.value)))}),Object(b.jsx)("button",{type:"submit",onClick:t=>{t.preventDefault();const c=e.map((e=>e.value)),s=r.map((e=>e.value)).join("");u(!0),m([]),x(c,a,l,s).then((e=>{m(e)})).finally((()=>{u(!1)}))},children:"Match All"}),j.length>0&&Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("ul",{className:"matcher-page__results",children:j.map((({engineValue:e,matches:t,error:a})=>{let c="";return c=a?"Error":0===t.length?"No matches found":"Matches",Object(b.jsxs)("div",{className:"matcher-page__item",children:[Object(b.jsxs)("h2",{className:"matcher-page__item-title",children:[e," - ",c]}),a&&Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("span",{children:a.message})}),!a&&t.length>0&&Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("ol",{children:t.map(((e,t)=>Object(b.jsxs)("li",{children:["\u201c",e[0],"\u201c"]},t)))})})]},e)}))})})]})]})})},O=()=>Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)("main",{className:"not-found-page",children:[Object(b.jsx)("h1",{children:"\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u0430"}),Object(b.jsx)(r.b,{className:"page-link",to:h.INDEX,children:"\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u043d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443"})]})}),_=()=>Object(b.jsx)(b.Fragment,{children:Object(b.jsxs)(i.c,{children:[Object(b.jsx)(i.a,{exact:!0,path:h.MATCHER,children:Object(b.jsx)(p,{})}),Object(b.jsx)(i.a,{children:Object(b.jsx)(O,{})})]})});a(57);n.a.render(Object(b.jsx)(c.StrictMode,{children:Object(b.jsx)(r.a,{children:Object(b.jsx)(_,{})})}),document.querySelector("#root"))}},[[58,1,2]]]);
//# sourceMappingURL=main.15530481.chunk.js.map