(this.webpackJsonppart1=this.webpackJsonppart1||[]).push([[0],{38:function(e,t,n){"use strict";n.r(t);var c=n(14),o=n.n(c),a=n(3),r=n(2),u=n(4),i=n.n(u),l="/api/notes",s={getAll:function(){return i.a.get(l).then((function(e){return e.data}))},create:function(e){return i.a.post(l,e).then((function(e){return e.data}))},update:function(e,t){return i.a.put("".concat(l,"/").concat(e),t).then((function(e){return e.data}))},deleteObject:function(e){return i.a.delete("".concat(l,"/").concat(e)).then((function(e){return e.data}))}},d=n(0),j=function(e){return Object(d.jsx)("button",{onClick:e.deleteObject,children:e.name})},b=function(e){return null===e.message?null:Object(d.jsx)("div",{className:"error",style:{color:"green",fontStyle:"italic",fontSize:16,borderStyle:"solid",backgroundColor:"lightgrey",borderRadius:"5px",padding:"10px",marginBottom:"10px"},children:e.message})},f=function(){var e=Object(r.useState)([]),t=Object(a.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)(""),u=Object(a.a)(o,2),i=u[0],l=u[1],f=Object(r.useState)(""),h=Object(a.a)(f,2),m=h[0],g=h[1],O=Object(r.useState)(""),p=Object(a.a)(O,2),v=p[0],x=p[1],w=Object(r.useState)(null),C=Object(a.a)(w,2),S=C[0],y=C[1];Object(r.useEffect)((function(){console.log("effect"),s.getAll().then((function(e){console.log("promise fulfilled"),c(e)}))}),[]),console.log("render",n.length,"persons");var k=v?n.filter((function(e){return-1!==e.name.toLowerCase().search(v.toLowerCase())})):n;return Object(d.jsxs)("div",{children:[Object(d.jsx)("h2",{children:"Phonebook"}),Object(d.jsx)(b,{message:S}),Object(d.jsxs)("div",{children:["filter shown with ",Object(d.jsx)("input",{value:v,onChange:function(e){console.log("Changed search (state)",e.target.value),x(e.target.value)}})]}),Object(d.jsx)("h2",{children:"Add a new"}),Object(d.jsxs)("form",{onSubmit:function(e){e.preventDefault(),console.log("Submitted: ",e.target);var t={name:i,number:m};if(n.filter((function(e){return e.name===i})).length>0){if(window.confirm("".concat(i," is already added to phonebook, replace the old number with a new one?"))){var o=n.find((function(e){return e.name===i}));s.update(o.id,t).then((function(e){c(n.map((function(t){return t.id!==o.id?t:e}))),y("Changed ".concat(i,"'s phonenumber")),setTimeout((function(){y(null)}),2e3)}))}}else s.create(t).then((function(e){console.log(e),c(n.concat(e)),l(""),g(""),console.log(n),y("Added ".concat(i)),setTimeout((function(){y(null)}),2e3)}))},children:[Object(d.jsxs)("div",{children:["name: ",Object(d.jsx)("input",{value:i,onChange:function(e){console.log("Changed name (state): ",e.target.value),l(e.target.value)}})]}),Object(d.jsxs)("div",{children:["number: ",Object(d.jsx)("input",{value:m,onChange:function(e){console.log("Changed number (state): ",e.target.value),g(e.target.value)}})]}),Object(d.jsx)("div",{children:Object(d.jsx)("button",{type:"submit",children:"add"})})]}),Object(d.jsx)("h2",{children:"Numbers"}),Object(d.jsx)("ul",{children:k.map((function(e){return Object(d.jsxs)("li",{children:[e.name," ",e.number,Object(d.jsx)(j,{name:"Delete",deleteObject:function(){return t=e.id,o=e.name,window.confirm("Delete ".concat(o))&&s.deleteObject(t).then((function(e){c(n.filter((function(e){return e.id!==t})))})).catch((function(e){y("".concat(o," was already deleted")),setTimeout((function(){y(null)}),2e3),c(n.filter((function(e){return e.id!==t})))})),y("".concat(o," was deleted")),void setTimeout((function(){y(null)}),2e3);var t,o}})]},e.name)}))})]})};o.a.render(Object(d.jsx)(f,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.e9075d12.chunk.js.map