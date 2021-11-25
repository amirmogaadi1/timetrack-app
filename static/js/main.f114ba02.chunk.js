(this["webpackJsonptimetrack-app"]=this["webpackJsonptimetrack-app"]||[]).push([[0],{171:function(t,e,a){},273:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),i=a(45),c=a.n(i),l=(a(171),a(7)),o=a(348),d=a(349),s=a(116),u=a(339),j=a(350),b=a(94),O=a(16),h=a(334),f=a(341),x=a(340),m=a(277),p=a(345),g=a(342),S=a(281),v=a(344),y=a(17),C=a.n(y);var D=a(1),k=function(){var t=Object(n.useState)(!1),e=Object(l.a)(t,2),a=e[0],r=e[1],i=Object(n.useState)(null),c=Object(l.a)(i,2),d=c[0],s=c[1],u=Object(n.useState)(JSON.parse(localStorage.getItem("data"))||[]),j=Object(l.a)(u,2),y=j[0],k=j[1],I=Object(n.useState)(null),M=Object(l.a)(I,2),T=M[0],w=M[1],H=Object(n.useState)(null),Y=Object(l.a)(H,2),J=Y[0],N=Y[1],A=function(t){return Math.floor(t/36e5)+":"+Math.floor(t/6e4)%60},B=function(){w(null),N(null)};return Object(D.jsxs)(o.a,{sx:{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"},children:[Object(D.jsx)(S.a,{variant:"outlined",color:"success",onClick:function(){return r(!0)},children:"Add Time"}),Object(D.jsx)(v.a,{hideBackdrop:!0,open:a,onClose:function(){return r(!1)},"aria-labelledby":"child-modal-title","aria-describedby":"child-modal-description",children:Object(D.jsxs)(o.a,{sx:Object(b.a)({},{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"background.paper",border:"2px solid #000",boxShadow:24,pt:2,px:4,pb:3}),children:[Object(D.jsx)("h2",{id:"child-modal-title",children:"Add Time"}),Object(D.jsx)(m.b,{dateAdapter:x.a,children:Object(D.jsxs)(h.a,{spacing:3,children:[Object(D.jsx)(g.a,{label:"Start Date&Time",value:T,onChange:function(t){w(t),N(t)},renderInput:function(t){return Object(D.jsx)(f.a,Object(b.a)({},t))}}),Object(D.jsx)(p.a,{label:"End Time",value:J,onChange:function(t){N(t)},renderInput:function(t){return Object(D.jsx)(f.a,Object(b.a)({},t))}})]})}),Object(D.jsxs)("div",{className:"buttons-container",children:[d?Object(D.jsx)(S.a,{variant:"outlined",color:"primary",onClick:function(){!function(){if(T&&J){var t=C.a.duration(C()(J).diff(C()(T))).asHours(),e=A(C.a.duration(C.a.duration(C()(J).diff(C()(T)))._milliseconds));if(t<=0)alert("Start/end date not valid");else{var a=y.findIndex((function(t){return t.id===d})),n=[].concat(Object(O.a)(y.slice(0,a)),[{id:d,startDate:C()(T).toISOString(),endDate:C()(J).toISOString(),duration:t,durationString:e}],Object(O.a)(y.slice(a+1)));k(n),localStorage.setItem("data",JSON.stringify(n)),alert("Time frame updated"),r(!1),s(null),B()}}else alert("Start & end dates are required")}()},children:"Save"}):Object(D.jsx)(S.a,{variant:"outlined",color:"primary",onClick:function(){!function(){if(T&&J){var t=C.a.duration(C()(J).diff(C()(T))).asHours(),e=A(C.a.duration(C.a.duration(C()(J).diff(C()(T)))._milliseconds));t<=0?alert("Start/end date not valid"):(y.push({id:([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(function(t){return(t^crypto.getRandomValues(new Uint8Array(1))[0]&15>>t/4).toString(16)})),startDate:C()(T).toISOString(),endDate:C()(J).toISOString(),durationString:e,duration:t}),localStorage.setItem("data",JSON.stringify(y)),alert("Time frame added"),s(null),B(),r(!1))}else alert("Start & end dates are required")}()},children:"Add"}),Object(D.jsx)(S.a,{onClick:function(){r(!1),B()},children:"Close"})]})]})}),Object(D.jsxs)("table",{className:"table",children:[Object(D.jsx)("thead",{children:Object(D.jsxs)("tr",{children:[Object(D.jsx)("th",{scope:"col",children:"Start"}),Object(D.jsx)("th",{scope:"col",children:"End"}),Object(D.jsx)("th",{scope:"col",children:"Duration(HH:mm)"}),Object(D.jsx)("th",{scope:"col"})]})}),Object(D.jsx)("tbody",{children:y.map((function(t){return Object(D.jsxs)("tr",{children:[Object(D.jsx)("td",{children:C()(t.startDate).format("DD-MM-YYYY HH:mm")}),Object(D.jsx)("td",{children:C()(t.endDate).format("HH:mm")}),Object(D.jsx)("td",{children:t.durationString}),Object(D.jsxs)("td",{children:[Object(D.jsx)(S.a,{variant:"outlined",color:"primary",style:{marginRight:10},onClick:function(){s(t.id),w(t.startDate),N(t.endDate),r(!0)},children:"Update"}),Object(D.jsx)(S.a,{variant:"outlined",color:"error",onClick:function(){k(y.filter((function(e){return e.id!==t.id}))),localStorage.setItem("data",JSON.stringify(y.filter((function(e){return e.id!==t.id}))))},children:"Delete"})]})]},t.id)}))})]})]})},I=a(144),M=function(){var t=Object(n.useState)({}),e=Object(l.a)(t,2),a=e[0],r=e[1],i=Object(n.useState)(JSON.parse(localStorage.getItem("data"))||[]),c=Object(l.a)(i,1)[0],d=Object(n.useState)("monthly"),s=Object(l.a)(d,2),u=s[0],j=s[1];return Object(n.useEffect)((function(){var t=c.reduce((function(t,e){var a=C()(e.startDate).format("monthly"===u?"DD.MM.YYYY":"MMMM");return t[a]?t[a].push(e.duration):t[a]=[e.duration],t}),{}),e=[],a=[];Object.keys(t).map((function(n){var r=0;return t[n].forEach((function(t){r+=t})),e.push(r),a.push(n),!0})),r({labels:a,datasets:[{label:"Hours",data:e,fill:!0,backgroundColor:"#4BC0C033",borderColor:"#4BC0C0FF"}]})}),[c,u]),Object(D.jsxs)(o.a,{sx:{width:"100%",display:"flex",alignItems:"center",flexDirection:"column"},children:[Object(D.jsx)(o.a,{sx:{width:"70%"},children:Object(D.jsx)(I.Line,{data:a,options:{plugins:{title:{display:!0,text:"Time Tracker"}},responsive:!0}})}),Object(D.jsxs)(S.a,{variant:"contained",color:"primary",onClick:function(){j("monthly"===u?"daily":"monthly")},children:["Trigger ",u]})]})},T=function(){var t=r.a.useState("1"),e=Object(l.a)(t,2),a=e[0],i=e[1],c=Object(n.useCallback)((function(t,e){i(e)}),[]);return Object(D.jsx)(o.a,{sx:{width:"100%",typography:"body1"},children:Object(D.jsxs)(s.a,{value:a,children:[Object(D.jsx)(o.a,{sx:{borderBottom:1,borderColor:"divider"},children:Object(D.jsxs)(u.a,{onChange:c,"aria-label":"lab API tabs example",children:[Object(D.jsx)(d.a,{label:"Time Management",value:"1"}),Object(D.jsx)(d.a,{label:"Graph",value:"2"})]})}),Object(D.jsx)(j.a,{value:"1",children:Object(D.jsx)(k,{})}),Object(D.jsx)(j.a,{value:"2",children:Object(D.jsx)(M,{})})]})})},w=function(t){t&&t instanceof Function&&a.e(3).then(a.bind(null,353)).then((function(e){var a=e.getCLS,n=e.getFID,r=e.getFCP,i=e.getLCP,c=e.getTTFB;a(t),n(t),r(t),i(t),c(t)}))};c.a.render(Object(D.jsx)(r.a.StrictMode,{children:Object(D.jsx)(T,{})}),document.getElementById("root")),w()}},[[273,1,2]]]);
//# sourceMappingURL=main.f114ba02.chunk.js.map