"use strict";(self.webpackChunkxml_to_json_webstream_docs=self.webpackChunkxml_to_json_webstream_docs||[]).push([[9866],{2838:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>d,contentTitle:()=>i,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>a});var t=s(4848),r=s(8453);const o={},i="Function: streamingSAX()",c={id:"api/functions/streamingSAX",title:"Function: streamingSAX()",description:"streamingSAX\\(options): TransformStream\\\\>",source:"@site/docs/api/functions/streamingSAX.md",sourceDirName:"api/functions",slug:"/api/functions/streamingSAX",permalink:"/xml-to-json-webstream/docs/api/functions/streamingSAX",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"docsSidebar",previous:{title:"Function: streamXMLToJSON()",permalink:"/xml-to-json-webstream/docs/api/functions/streamXMLToJSON"},next:{title:"xml-to-json-webstream",permalink:"/xml-to-json-webstream/docs/api/globals"}},d={},a=[{value:"Type Parameters",id:"type-parameters",level:2},{value:"Parameters",id:"parameters",level:2},{value:"Returns",id:"returns",level:2},{value:"Defined in",id:"defined-in",level:2}];function l(e){const n={a:"a",blockquote:"blockquote",code:"code",em:"em",h1:"h1",h2:"h2",header:"header",p:"p",strong:"strong",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.header,{children:(0,t.jsx)(n.h1,{id:"function-streamingsax",children:"Function: streamingSAX()"})}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"streamingSAX"}),"<",(0,t.jsx)(n.code,{children:"EventsToListen"}),">(",(0,t.jsx)(n.code,{children:"options"}),"): ",(0,t.jsx)(n.code,{children:"TransformStream"}),"<",(0,t.jsx)(n.code,{children:"string"})," | ",(0,t.jsx)(n.code,{children:"Uint8Array"}),", ",(0,t.jsx)(n.a,{href:"/xml-to-json-webstream/docs/api/type-aliases/Event",children:(0,t.jsx)(n.code,{children:"Event"})}),"<",(0,t.jsx)(n.code,{children:"EventsToListen"}),"[",(0,t.jsx)(n.code,{children:"number"}),"]>>"]}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"type-parameters",children:"Type Parameters"}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.strong,{children:"EventsToListen"})," ",(0,t.jsx)(n.em,{children:"extends"})," (",(0,t.jsx)(n.code,{children:'"error"'})," | ",(0,t.jsx)(n.code,{children:'"text"'})," | ",(0,t.jsx)(n.code,{children:'"doctype"'})," | ",(0,t.jsx)(n.code,{children:'"processinginstruction"'})," | ",(0,t.jsx)(n.code,{children:'"sgmldeclaration"'})," | ",(0,t.jsx)(n.code,{children:'"opentagstart"'})," | ",(0,t.jsx)(n.code,{children:'"opentag"'})," | ",(0,t.jsx)(n.code,{children:'"closetag"'})," | ",(0,t.jsx)(n.code,{children:'"attribute"'})," | ",(0,t.jsx)(n.code,{children:'"comment"'})," | ",(0,t.jsx)(n.code,{children:'"opencdata"'})," | ",(0,t.jsx)(n.code,{children:'"cdata"'})," | ",(0,t.jsx)(n.code,{children:'"closecdata"'})," | ",(0,t.jsx)(n.code,{children:'"opennamespace"'})," | ",(0,t.jsx)(n.code,{children:'"closenamespace"'})," | ",(0,t.jsx)(n.code,{children:'"noscript"'}),")[]"]}),"\n",(0,t.jsx)(n.h2,{id:"parameters",children:"Parameters"}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.strong,{children:"options"})]}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.strong,{children:"options.continueOnError?"}),": ",(0,t.jsx)(n.code,{children:"boolean"})," = ",(0,t.jsx)(n.code,{children:"false"})]}),"\n",(0,t.jsx)(n.p,{children:"Continues on error when true. The default of the sax parser is to stop on error pass true to instead continue on error."}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.strong,{children:"options.events"}),": ",(0,t.jsx)(n.code,{children:"EventsToListen"})]}),"\n",(0,t.jsx)(n.p,{children:"The Sax Events to listen to."}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.strong,{children:"options.saxOptions?"})," = ",(0,t.jsx)(n.code,{children:"{}"})]}),"\n",(0,t.jsx)(n.p,{children:"Object bag of settings regarding string formatting. All default to false."}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.strong,{children:"options.saxOptions.lowercase?"}),": ",(0,t.jsx)(n.code,{children:"boolean"})]}),"\n",(0,t.jsx)(n.p,{children:"If true, then lowercase tag names and attribute names in loose mode, rather than uppercasing them."}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.strong,{children:"options.saxOptions.normalize?"}),": ",(0,t.jsx)(n.code,{children:"boolean"})]}),"\n",(0,t.jsx)(n.p,{children:"If true, then turn any whitespace into a single space."}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.strong,{children:"options.saxOptions.position?"}),": ",(0,t.jsx)(n.code,{children:"boolean"})]}),"\n",(0,t.jsx)(n.p,{children:"If true, then track line/col/position"}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.strong,{children:"options.saxOptions.strict?"}),": ",(0,t.jsx)(n.code,{children:"boolean"})]}),"\n",(0,t.jsx)(n.p,{children:'When true enables "unforgiving" mode.'}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.strong,{children:"options.saxOptions.strictEntities?"}),": ",(0,t.jsx)(n.code,{children:"boolean"})]}),"\n",(0,t.jsx)(n.p,{children:"If true, only parse predefined XML entities (&, ', >, <, and \")"}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.strong,{children:"options.saxOptions.trim?"}),": ",(0,t.jsx)(n.code,{children:"boolean"})]}),"\n",(0,t.jsx)(n.p,{children:"Whether or not to trim text and comment nodes."}),"\n",(0,t.jsxs)(n.p,{children:["\u2022 ",(0,t.jsx)(n.strong,{children:"options.saxOptions.xmlns?"}),": ",(0,t.jsx)(n.code,{children:"boolean"})]}),"\n",(0,t.jsx)(n.p,{children:"If true, then namespaces are supported."}),"\n",(0,t.jsx)(n.h2,{id:"returns",children:"Returns"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.code,{children:"TransformStream"}),"<",(0,t.jsx)(n.code,{children:"string"})," | ",(0,t.jsx)(n.code,{children:"Uint8Array"}),", ",(0,t.jsx)(n.a,{href:"/xml-to-json-webstream/docs/api/type-aliases/Event",children:(0,t.jsx)(n.code,{children:"Event"})}),"<",(0,t.jsx)(n.code,{children:"EventsToListen"}),"[",(0,t.jsx)(n.code,{children:"number"}),"]>>"]}),"\n",(0,t.jsxs)(n.p,{children:["A through stream that can be async iterated. Will emit data from any of the events that are listened to in the form ",(0,t.jsx)(n.code,{children:'{event: "event-name", payload: "event-data" }'}),' where "event-name" and "event-data" are the event\'s name and data.']}),"\n",(0,t.jsx)(n.h2,{id:"defined-in",children:"Defined in"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://github.com/johnsonjo4531/xml-to-json-webstream/blob/4a6d5ede6d5de55bf286a795f124a9d92e4f5239/src/index.ts#L157",children:"index.ts:157"})})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(l,{...e})}):l(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>i,x:()=>c});var t=s(6540);const r={},o=t.createContext(r);function i(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);