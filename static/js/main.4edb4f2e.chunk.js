(this.webpackJsonpregexes=this.webpackJsonpregexes||[]).push([[0],{57:function(e,t,a){},58:function(e,t,a){"use strict";a.r(t);var c=a(0),s=a.n(c),l=a(26),r=a.n(l),n=a(9),i=a(2);const h={INDEX:"/",MATCHER:"/",MATCH_ALL:"/match-all"};var j=a(27),m=a.n(j);const d=new class{constructor(){this._client=m.a.create({timeout:5e3})}async matchAll(e,t,a,c){const{data:s}=await this._client.get("http://localhost:3001/match-all",{params:{engineValues:e,text:t,pattern:a,flagsValue:c}});return s}};var u=a(1);const b={BROWSER_JS:{title:"JavaScript (browser)",value:"browser-js"},NODE_JS:{title:"JavaScript (node.js)",value:"node-js"},PHP:{title:"PHP",value:"php",disabled:!0}},o={IGNORE_CASE:{title:"Ignore Case",value:"i"},SINGLE_LINE:{title:"Single Line",value:"s"},MULTILINE:{title:"Multiline",value:"m"}},p=(e,t)=>a=>{const c=a.includes(t);return Object.values(e).filter((e=>c?a.includes(e)&&e!==t:a.includes(e)||e===t))},x=()=>{const[e,t]=s.a.useState([b.NODE_JS]),[a,c]=s.a.useState(""),[l,r]=s.a.useState(""),[n,i]=s.a.useState([]),[j,m]=s.a.useState(!1),[x,O]=s.a.useState([]),[g,_]=s.a.useState();return Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("main",{className:"matcher-page",children:[Object(u.jsx)("h1",{children:"Regular Expression Pattern Matcher"}),Object(u.jsxs)("form",{method:"post",action:h.MATCH_ALL,children:[Object(u.jsxs)("fieldset",{className:"matcher-page__item",children:[Object(u.jsx)("legend",{className:"matcher-page__item-title",children:"Engine"}),Object.values(b).map((a=>Object(u.jsxs)("label",{className:"matcher-page__checkbox-label",children:[Object(u.jsx)("input",{type:"checkbox",name:"engines",value:a.value,checked:e.includes(a),onChange:()=>{t(p(b,a))},disabled:a.disabled}),a.title]},a.value)))]}),Object(u.jsxs)("div",{className:"matcher-page__item",children:[Object(u.jsx)("label",{className:"matcher-page__item-title",children:"Text"}),Object(u.jsx)("textarea",{name:"text",rows:"3",value:a,onChange:e=>c(e.currentTarget.value)})]}),Object(u.jsxs)("div",{className:"matcher-page__item",children:[Object(u.jsx)("label",{htmlFor:"matcher-pattern",className:"matcher-page__item-title",children:"Pattern (regular expression)"}),Object(u.jsx)("div",{className:"matcher-page__pattern-inner",children:Object(u.jsx)("input",{id:"matcher-pattern",type:"text",name:"pattern",value:l,onChange:e=>r(e.currentTarget.value)})})]}),Object(u.jsx)("fieldset",{className:"matcher-page__item",children:Object.values(o).map((e=>Object(u.jsxs)("label",{className:"matcher-page__checkbox-label",children:[Object(u.jsx)("input",{type:"checkbox",name:"flags",value:e.value,checked:n.includes(e),onChange:()=>{i(p(o,e))}}),e.title," (/",e.value,")"]},e.value)))}),Object(u.jsx)("button",{type:"submit",onClick:t=>{t.preventDefault(),m(!1),_(),O([]);const c="g"+n.map((e=>e.value)).join("");if(e.includes(b.BROWSER_JS)){const e=((e,t,a,c)=>{try{const e=new RegExp(a,c),s=t.matchAll(e);return{matches:Array.from(s)}}catch(s){return{error:s}}})(b.BROWSER_JS.value,a,l,c);O(e.matches),_(e.error),m(!0)}const s=e.filter((e=>e!==b.BROWSER_JS));s&&d.matchAll(s,a,l,c).then((([e])=>{O(e.matches),_(e.error)})).catch((e=>{_(e)})).finally((()=>{m(!0)}))},children:"Match All"}),j&&g&&Object(u.jsxs)("div",{className:"matcher-page__item",children:[Object(u.jsx)("span",{className:"matcher-page__item-title",children:"Error"}),Object(u.jsx)("span",{children:g.message})]}),j&&!g&&0===x.length&&Object(u.jsx)("div",{className:"matcher-page__item",children:Object(u.jsx)("span",{className:"matcher-page__item-title",children:"No matches found. Try to adjust your search..."})}),j&&!g&&x.length>0&&Object(u.jsxs)("div",{className:"matcher-page__item",children:[Object(u.jsx)("span",{className:"matcher-page__item-title",children:"Matches"}),Object(u.jsx)("ol",{children:x.map(((e,t)=>Object(u.jsxs)("li",{children:["\u201c",e[0],"\u201c"]},t)))})]})]})]})})},O=()=>Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)("main",{className:"not-found-page",children:[Object(u.jsx)("h1",{children:"\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u0430"}),Object(u.jsx)(n.b,{className:"page-link",to:h.INDEX,children:"\u0412\u0435\u0440\u043d\u0443\u0442\u044c\u0441\u044f \u043d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0443"})]})}),g=()=>Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)(i.c,{children:[Object(u.jsx)(i.a,{exact:!0,path:h.MATCHER,children:Object(u.jsx)(x,{})}),Object(u.jsx)(i.a,{children:Object(u.jsx)(O,{})})]})});a(57);r.a.render(Object(u.jsx)(c.StrictMode,{children:Object(u.jsx)(n.a,{children:Object(u.jsx)(g,{})})}),document.querySelector("#root"))}},[[58,1,2]]]);
//# sourceMappingURL=main.4edb4f2e.chunk.js.map