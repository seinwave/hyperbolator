(this.webpackJsonphyperbolator=this.webpackJsonphyperbolator||[]).push([[0],[,,,,,,,,,function(e,t,a){e.exports=a(20)},,,,,function(e,t,a){},function(e,t,a){},,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(7),c=a.n(o),l=(a(14),a(8)),i=a(1),s=(a(15),a(16),a(2)),p=a(3),u=a(5),d=a(4),h=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},r.a.createElement("h4",{className:"white"},"A nonsense project by ",r.a.createElement("a",{rel:"noopener noreferrer",target:"_blank",href:"https://mattseidholz.com",className:""},"Matt Seidholz")))}}]),a}(r.a.Component),m=(a(17),a(18),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(e){var t=this.props.dispatch;return r.a.createElement("input",{type:"range",max:"500",onChange:function(e){return function(e){var a=Math.floor(e.target.value/100);console.log("The hyperbolator is set to ",a),t({type:"SET_HYPERBOLATION",hyperLevel:a})}(e)}})}}]),a}(r.a.Component)),f=(a(19),function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(e){var t=this.props,a=t.data,n=t.startHyperbolation,o=t.dispatch,c=a.hyperLevel;return r.a.createElement("div",null,r.a.createElement("button",{className:"hyper_button",onClick:function(e){return n(e)}},"Hyperbolate at level ",c),r.a.createElement("div",{class:"line_break"},r.a.createElement("h3",null,"- Or -")),r.a.createElement("button",{className:"cancel_button",onClick:function(e){return o({type:"EMPTY"}),void fetch("https://hyperbolator.herokuapp.com/delete",{headers:{Accept:"application/json","Content-Type":"application/json","Access-Control-Allow-Origin":"*"},method:"POST"}).then((function(e){return e.json()})).then(o({type:"FILE_IS_READY",ready:0}))}},"Remove & Start Over"))}}]),a}(r.a.Component)),b=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={currentCount:2,dots:0},n}return Object(p.a)(a,[{key:"countDown",value:function(){if(this.setState({currentCount:this.state.currentCount-.2,dots:this.state.dots+1}),this.state.currentCount<1)return this.props.dispatch({type:"FILE_IS_READY",ready:2})}},{key:"componentDidMount",value:function(){this.intervalId=setInterval(this.countDown.bind(this),200)}},{key:"componentWillUnmount",value:function(){clearInterval(this.intervalId)}},{key:"render",value:function(e){return r.a.createElement("div",{className:"box_holder"},r.a.createElement("div",{id:"load-box",className:"drag-drop-zone"},r.a.createElement("svg",{class:"bi bi-file-earmark-check",width:"4em",height:"5.5em",viewBox:"0 0 16 16",fill:"#3399ff",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{"fill-rule":"evenodd",d:"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm8-7A8 8 0 1 1 0 8a8 8 0 0 1 16 0z"}),r.a.createElement("path",{"fill-rule":"evenodd",d:"M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"})),r.a.createElement("h3",{class:"load_dots"}," ",[".","..","...","..",".","..","..."][this.state.dots])))}}]),a}(n.Component),v=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(p.a)(a,[{key:"render",value:function(e){var t=this.props.dispatch;return r.a.createElement("div",null,r.a.createElement("button",{className:"cancel_button",onClick:function(e){return t({type:"EMPTY"}),void t({type:"FILE_IS_READY",ready:0})}},"Start Over"))}}]),a}(n.Component),E=function(e){Object(u.a)(a,e);var t=Object(d.a)(a);function a(){var e;return Object(s.a)(this,a),(e=t.call(this)).inputOpenFileRef=r.a.createRef(),e}return Object(p.a)(a,[{key:"render",value:function(e){var t=this,a=this.props,n=a.data,o=a.dispatch,c=/doc/,l=/txt/,i=/docx/,s=function(e){return c.test(e[0].name)||l.test(e[0].name)||i.test(e[0].name)?o({type:"FILE_IS_READY",ready:1}):(console.log("wrong!"),o({type:"FILE_IS_READY",ready:4}))},p=function(){fetch("https://hyperbolator.herokuapp.com/".concat(n.hyperLevel),{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify({file:n.fileList[0]})}).then((function(e){return e.blob()})).then((function(e){var t=URL.createObjectURL(e),a=document.createElement("a");a.style="display: none",a.href=t,a.download="Your Hyperbolation",document.body.appendChild(a),a.click(),a.remove()}))};return 1===n.ready?r.a.createElement(b,{data:n,dispatch:o,startHyperbolation:p}):2===n.ready?r.a.createElement("div",{className:"box_holder"},r.a.createElement("div",{id:"box",className:"drag-drop-zone"},r.a.createElement("svg",{className:"bi bi-file-earmark-check",width:"4em",height:"5.5em",viewBox:"0 0 16 16",fill:"#3399ff",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{d:"M9 1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5v-1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h5v2.5A1.5 1.5 0 0 0 10.5 6H13v2h1V6L9 1z"}),r.a.createElement("path",{"fill-rule":"evenodd",d:"M15.854 10.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708l1.146 1.147 2.646-2.647a.5.5 0 0 1 .708 0z"})),r.a.createElement("p",{className:"finale"},"Your file is ready for Hyperbolation")),r.a.createElement(m,{data:n,dispatch:o}),r.a.createElement("div",{className:"break"}),r.a.createElement(f,{data:n,dispatch:o,startHyperbolation:p})):4===n.ready?r.a.createElement("div",{className:"box_holder"},r.a.createElement("div",{id:"load-box",className:"drag-drop-zone"},r.a.createElement("svg",{className:"bi bi-x-circle-fill",width:"4em",height:"5.5em",viewBox:"0 0 16 16",fill:"#ff7f7f",xmlns:"http://www.w3.org/2000/svg"},r.a.createElement("path",{"fill-rule":"evenodd",d:"M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.146-3.146a.5.5 0 0 0-.708-.708L8 7.293 4.854 4.146a.5.5 0 1 0-.708.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .708.708L8 8.707l3.146 3.147a.5.5 0 0 0 .708-.708L8.707 8l3.147-3.146z"})),r.a.createElement("h2",null,"Rejected."),r.a.createElement("h4",null,"The Hyperbolator only accepts .txt, .doc, or .docx files")),r.a.createElement("div",{class:"break"}),r.a.createElement(v,{dispatch:o})):r.a.createElement("div",{className:"box_holder"},r.a.createElement("div",{id:"box",className:"drag-drop-zone",onDrop:function(e){return function(e){e.preventDefault(),e.stopPropagation(),e.target.className="drag-drop-zone";var t=e.dataTransfer.files,a=new FormData;return a.append("file",t[0]),fetch("https://hyperbolator.herokuapp.com/upload",{headers:{"Access-Control-Allow-Origin":"*"},method:"POST",body:a}).then((function(e){return e.json()})).then((function(e){return n.fileList.push(e)})).then(s(t))}(e)},onDragOver:function(e){return function(e){e.preventDefault(),e.stopPropagation(),e.dataTransfer.dropEffect="copy",o({type:"SET_IN_DROP_ZONE",inDropZone:!0})}(e)},onDragEnter:function(e){return function(e){e.preventDefault(),e.stopPropagation(),o({type:"SET_DROP_DEPTH",dropDepth:n.dropDepth+1}),e.target.className+="_dragged"}(e)},onDragLeave:function(e){return function(e){e.stopPropagation(),"box"===e.target.id&&(e.target.className="drag-drop-zone"),e.preventDefault(),e.stopPropagation(),o({type:"SET_DROP_DEPTH",dropDepth:n.dropDepth-1}),n.dropDepth>0||o({type:"SET_IN_DROP_ZONE",inDropZone:!1})}(e)}},r.a.createElement("div",{className:"button_holder"},r.a.createElement("input",{ref:this.inputOpenFileRef,type:"file",accept:".docx, .txt, .doc",onChange:function(e){e.stopPropagation(),e.preventDefault();var t=e.target.files,a=new FormData;return a.append("file",t[0]),fetch("https://hyperbolator.herokuapp.com/upload",{headers:{"Access-Control-Allow-Origin":"*"},method:"POST",body:a}).then((function(e){return e.json()})).then((function(e){return n.fileList.push(e)})).then(s(t))},style:{display:"none"}}),r.a.createElement("button",{class:"upload_button",onClick:function(){t.inputOpenFileRef.current.click()}},"Choose a File")),r.a.createElement("img",{alt:"download arrow",src:"./assets/dl_icon.png"}),r.a.createElement("p",{class:"drag_prompt"},"Or drag files here to upload")))}}]),a}(r.a.Component);var y=function(){var e={ready:0,innerWidth:0,hyperLevel:0,dropDepth:0,inDropZone:!1,fileList:[]},t=r.a.useReducer((function(t,a){switch(a.type){case"SET_DROP_DEPTH":return Object(i.a)(Object(i.a)({},t),{},{dropDepth:a.dropDepth});case"SET_IN_DROP_ZONE":return Object(i.a)(Object(i.a)({},t),{},{inDropZone:a.inDropZone});case"ADD_FILE_TO_LIST":return Object(i.a)(Object(i.a)({},t),{},{fileList:t.fileList.concat(a.files)});case"SET_HYPERBOLATION":return Object(i.a)(Object(i.a)({},t),{},{hyperLevel:a.hyperLevel});case"WINDOW_RESIZE":return Object(i.a)(Object(i.a)({},t),{},{innerWidth:a.innerWidth});case"FILE_IS_READY":return Object(i.a)(Object(i.a)({},t),{},{ready:a.ready});case"EMPTY":return Object(i.a)(Object(i.a)({},t),{},{fileList:[]});case"RESET":return Object(i.a)(Object(i.a)({},t),{},{state:e})}}),e),a=Object(l.a)(t,2),n=a[0],o=a[1];return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("h1",null,"Truth is Dead."),r.a.createElement("h2",null,"Use the ",r.a.createElement("code",null," Hyperbolator")," instead."),r.a.createElement(E,{data:n,dispatch:o})),r.a.createElement(h,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[9,1,2]]]);
//# sourceMappingURL=main.18bb6ee3.chunk.js.map