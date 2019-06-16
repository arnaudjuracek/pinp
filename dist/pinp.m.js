var t=function(t,i){null==i&&(i=Object.getPrototypeOf(t));for(var n=0,e=Object.getOwnPropertyNames(i);n<e.length;n+=1){var o=e[n];"function"==typeof i[o]&&(t[o]=i[o].bind(t))}},i=function(i,n){void 0===n&&(n={});var e=n.noOOB;void 0===e&&(e=!0);var o=n.debug;void 0===o&&(o=!1);var r=n.maxSolverIterations;void 0===r&&(r=999);var s=n.pushBehavior;void 0===s&&(s="both"),this.boxes=i,this.noOOB=e,this.debug=o,this.maxSolverIterations=r,this.pushBehavior=s,this.update(),t(this)};i.prototype.freeze=function(){this.frozen||(this.frozen=!0,this.boxes.forEach(function(t){return t.freeze()}))},i.prototype.unfreeze=function(){this.frozen&&(this.frozen=!1,this.boxes.forEach(function(t){return t.unfreeze()}))},i.prototype.update=function(){this.frozen||(this._updateBoundingBox(),this.noOOB&&this.ensureInBounds())},i.prototype._updateBoundingBox=function(){var t=this,n=i.computeBoundingBox(this.boxes);Object.entries(n).forEach(function(i){t[i[0]]=i[1]})},i.computeBoundingBox=function(t){var i=0,n=0,e=0,o=0;return t.forEach(function(t){t.boundingBox||t.update(),i=Math.min(i,t.xmin),n=Math.min(n,t.ymin),e=Math.max(e,t.xmax),o=Math.max(o,t.ymax)}),{x:i,y:n,width:e,height:o,xmin:i,xmax:i+e,ymin:n,ymax:n+o}},i.prototype.ensureInBounds=function(){var t=-Math.min(0,this.xmin),i=-Math.min(0,this.ymin);(t||i)&&(this.boxes.forEach(function(n){return n.move(n.x+t,n.y+i)}),this._updateBoundingBox())},i.prototype.pack=function(t){var i=this;void 0===t&&(t={});var n=t.maxSolverIterations;void 0===n&&(n=this.maxSolverIterations);var e=t.debug;void 0===e&&(e=this.debug);var o=t.pushBehavior;void 0===o&&(o=this.pushBehavior),this.boxes=this.boxes.sort(function(t,i){return i.lastMove-t.lastMove}),this.boxes.forEach(function(t,i){t.frozen?t.move(t.frozenBoundingBox.x,t.frozenBoundingBox.y):t.update(),e&&(t.packingOrder=i,t.element.setAttribute("data-packing-order",i))});for(var r=0,s=this.boxes.filter(function(t){return i.boxes.some(t.collide)}),a=function(){var t=s.shift(),n=i.boxes.filter(t.collide);n&&n.length&&n.forEach(function(i){var n=t.delta(i),r="horizontal"===o||"vertical"!==o&&Math.abs(n[0])>=Math.abs(n[1]);e&&console.log({current:t.packingOrder,collide:i.packingOrder,delta:n,direction:r?"horizontal":"vertical"}),r&&n[0]<=0&&i.move(t.xmax,i.y),r&&n[0]>0&&i.move(t.xmin-i.width,i.y),!r&&n[1]<=0&&i.move(i.x,t.ymax),!r&&n[1]>0&&i.move(i.x,t.ymin-i.height),s.push(i)})};s.length&&++r<n;)a();this.update()};var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function e(t,i){return t(i={exports:{}},i.exports),i.exports}var o=e(function(t){!function(i,n){t.exports?t.exports=n():i.getSize=n()}(window,function(){function t(t){var i=parseFloat(t);return-1==t.indexOf("%")&&!isNaN(i)&&i}var i="undefined"==typeof console?function(){}:function(t){console.error(t)},n=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],e=n.length;function o(t){var n=getComputedStyle(t);return n||i("Style returned "+n+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),n}var r,s=!1;return function i(a){if(function(){if(!s){s=!0;var n=document.createElement("div");n.style.width="200px",n.style.padding="1px 2px 3px 4px",n.style.borderStyle="solid",n.style.borderWidth="1px 2px 3px 4px",n.style.boxSizing="border-box";var e=document.body||document.documentElement;e.appendChild(n);var a=o(n);r=200==Math.round(t(a.width)),i.isBoxSizeOuter=r,e.removeChild(n)}}(),"string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var h=o(a);if("none"==h.display)return function(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},i=0;i<e;i++)t[n[i]]=0;return t}();var d={};d.width=a.offsetWidth,d.height=a.offsetHeight;for(var u=d.isBorderBox="border-box"==h.boxSizing,c=0;c<e;c++){var p=n[c],f=parseFloat(h[p]);d[p]=isNaN(f)?0:f}var g=d.paddingLeft+d.paddingRight,v=d.paddingTop+d.paddingBottom,l=d.marginLeft+d.marginRight,m=d.marginTop+d.marginBottom,x=d.borderLeftWidth+d.borderRightWidth,y=d.borderTopWidth+d.borderBottomWidth,b=u&&r,E=t(h.width);!1!==E&&(d.width=E+(b?0:g+x));var w=t(h.height);return!1!==w&&(d.height=w+(b?0:v+y)),d.innerWidth=d.width-(g+x),d.innerHeight=d.height-(v+y),d.outerWidth=d.width+l,d.outerHeight=d.height+m,d}}})}),r=e(function(t){var i,e;i="undefined"!=typeof window?window:n,e=function(){function t(){}var i=t.prototype;return i.on=function(t,i){if(t&&i){var n=this._events=this._events||{},e=n[t]=n[t]||[];return-1==e.indexOf(i)&&e.push(i),this}},i.once=function(t,i){if(t&&i){this.on(t,i);var n=this._onceEvents=this._onceEvents||{};return(n[t]=n[t]||{})[i]=!0,this}},i.off=function(t,i){var n=this._events&&this._events[t];if(n&&n.length){var e=n.indexOf(i);return-1!=e&&n.splice(e,1),this}},i.emitEvent=function(t,i){var n=this._events&&this._events[t];if(n&&n.length){n=n.slice(0),i=i||[];for(var e=this._onceEvents&&this._onceEvents[t],o=0;o<n.length;o++){var r=n[o];e&&e[r]&&(this.off(t,r),delete e[r]),r.apply(this,i)}return this}},i.allOff=function(){delete this._events,delete this._onceEvents},t},t.exports?t.exports=e():i.EvEmitter=e()}),s=e(function(t){!function(i,n){t.exports?t.exports=n(i,r):i.Unipointer=n(i,i.EvEmitter)}(window,function(t,i){function n(){}var e=n.prototype=Object.create(i.prototype);e.bindStartEvent=function(t){this._bindStartEvent(t,!0)},e.unbindStartEvent=function(t){this._bindStartEvent(t,!1)},e._bindStartEvent=function(i,n){var e="mousedown";t.PointerEvent?e="pointerdown":"ontouchstart"in t&&(e="touchstart"),i[(n=void 0===n||n)?"addEventListener":"removeEventListener"](e,this)},e.handleEvent=function(t){var i="on"+t.type;this[i]&&this[i](t)},e.getTouch=function(t){for(var i=0;i<t.length;i++){var n=t[i];if(n.identifier==this.pointerIdentifier)return n}},e.onmousedown=function(t){var i=t.button;i&&0!==i&&1!==i||this._pointerDown(t,t)},e.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])},e.onpointerdown=function(t){this._pointerDown(t,t)},e._pointerDown=function(t,i){t.button||this.isPointerDown||(this.isPointerDown=!0,this.pointerIdentifier=void 0!==i.pointerId?i.pointerId:i.identifier,this.pointerDown(t,i))},e.pointerDown=function(t,i){this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,i])};var o={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"]};return e._bindPostStartEvents=function(i){if(i){var n=o[i.type];n.forEach(function(i){t.addEventListener(i,this)},this),this._boundPointerEvents=n}},e._unbindPostStartEvents=function(){this._boundPointerEvents&&(this._boundPointerEvents.forEach(function(i){t.removeEventListener(i,this)},this),delete this._boundPointerEvents)},e.onmousemove=function(t){this._pointerMove(t,t)},e.onpointermove=function(t){t.pointerId==this.pointerIdentifier&&this._pointerMove(t,t)},e.ontouchmove=function(t){var i=this.getTouch(t.changedTouches);i&&this._pointerMove(t,i)},e._pointerMove=function(t,i){this.pointerMove(t,i)},e.pointerMove=function(t,i){this.emitEvent("pointerMove",[t,i])},e.onmouseup=function(t){this._pointerUp(t,t)},e.onpointerup=function(t){t.pointerId==this.pointerIdentifier&&this._pointerUp(t,t)},e.ontouchend=function(t){var i=this.getTouch(t.changedTouches);i&&this._pointerUp(t,i)},e._pointerUp=function(t,i){this._pointerDone(),this.pointerUp(t,i)},e.pointerUp=function(t,i){this.emitEvent("pointerUp",[t,i])},e._pointerDone=function(){this._pointerReset(),this._unbindPostStartEvents(),this.pointerDone()},e._pointerReset=function(){this.isPointerDown=!1,delete this.pointerIdentifier},e.pointerDone=function(){},e.onpointercancel=function(t){t.pointerId==this.pointerIdentifier&&this._pointerCancel(t,t)},e.ontouchcancel=function(t){var i=this.getTouch(t.changedTouches);i&&this._pointerCancel(t,i)},e._pointerCancel=function(t,i){this._pointerDone(),this.pointerCancel(t,i)},e.pointerCancel=function(t,i){this.emitEvent("pointerCancel",[t,i])},n.getPointerPoint=function(t){return{x:t.pageX,y:t.pageY}},n})}),a=e(function(t){!function(i,n){t.exports?t.exports=n(i,s):i.Unidragger=n(i,i.Unipointer)}(window,function(t,i){function n(){}var e=n.prototype=Object.create(i.prototype);e.bindHandles=function(){this._bindHandles(!0)},e.unbindHandles=function(){this._bindHandles(!1)},e._bindHandles=function(i){for(var n=(i=void 0===i||i)?"addEventListener":"removeEventListener",e=i?this._touchActionValue:"",o=0;o<this.handles.length;o++){var r=this.handles[o];this._bindStartEvent(r,i),r[n]("click",this),t.PointerEvent&&(r.style.touchAction=e)}},e._touchActionValue="none",e.pointerDown=function(t,i){this.okayPointerDown(t)&&(this.pointerDownPointer=i,t.preventDefault(),this.pointerDownBlur(),this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,i]))};var o={TEXTAREA:!0,INPUT:!0,SELECT:!0,OPTION:!0},r={radio:!0,checkbox:!0,button:!0,submit:!0,image:!0,file:!0};return e.okayPointerDown=function(t){var i=!o[t.target.nodeName]||r[t.target.type];return i||this._pointerReset(),i},e.pointerDownBlur=function(){var t=document.activeElement;t&&t.blur&&t!=document.body&&t.blur()},e.pointerMove=function(t,i){var n=this._dragPointerMove(t,i);this.emitEvent("pointerMove",[t,i,n]),this._dragMove(t,i,n)},e._dragPointerMove=function(t,i){var n={x:i.pageX-this.pointerDownPointer.pageX,y:i.pageY-this.pointerDownPointer.pageY};return!this.isDragging&&this.hasDragStarted(n)&&this._dragStart(t,i),n},e.hasDragStarted=function(t){return Math.abs(t.x)>3||Math.abs(t.y)>3},e.pointerUp=function(t,i){this.emitEvent("pointerUp",[t,i]),this._dragPointerUp(t,i)},e._dragPointerUp=function(t,i){this.isDragging?this._dragEnd(t,i):this._staticClick(t,i)},e._dragStart=function(t,i){this.isDragging=!0,this.isPreventingClicks=!0,this.dragStart(t,i)},e.dragStart=function(t,i){this.emitEvent("dragStart",[t,i])},e._dragMove=function(t,i,n){this.isDragging&&this.dragMove(t,i,n)},e.dragMove=function(t,i,n){t.preventDefault(),this.emitEvent("dragMove",[t,i,n])},e._dragEnd=function(t,i){this.isDragging=!1,setTimeout(function(){delete this.isPreventingClicks}.bind(this)),this.dragEnd(t,i)},e.dragEnd=function(t,i){this.emitEvent("dragEnd",[t,i])},e.onclick=function(t){this.isPreventingClicks&&t.preventDefault()},e._staticClick=function(t,i){this.isIgnoringMouseUp&&"mouseup"==t.type||(this.staticClick(t,i),"mouseup"!=t.type&&(this.isIgnoringMouseUp=!0,setTimeout(function(){delete this.isIgnoringMouseUp}.bind(this),400)))},e.staticClick=function(t,i){this.emitEvent("staticClick",[t,i])},n.getPointerPoint=i.getPointerPoint,n})}),h=e(function(t){!function(i,n){t.exports?t.exports=n(i,o,a):i.Draggabilly=n(i,i.getSize,i.Unidragger)}(window,function(t,i,n){function e(t,i){for(var n in i)t[n]=i[n];return t}var o=t.jQuery;function r(t,i){this.element="string"==typeof t?document.querySelector(t):t,o&&(this.$element=o(this.element)),this.options=e({},this.constructor.defaults),this.option(i),this._create()}var s=r.prototype=Object.create(n.prototype);r.defaults={},s.option=function(t){e(this.options,t)};var a={relative:!0,absolute:!0,fixed:!0};function h(t,i,n){return n=n||"round",i?Math[n](t/i)*i:t}return s._create=function(){this.position={},this._getPosition(),this.startPoint={x:0,y:0},this.dragPoint={x:0,y:0},this.startPosition=e({},this.position);var t=getComputedStyle(this.element);a[t.position]||(this.element.style.position="relative"),this.on("pointerDown",this.onPointerDown),this.on("pointerMove",this.onPointerMove),this.on("pointerUp",this.onPointerUp),this.enable(),this.setHandles()},s.setHandles=function(){this.handles=this.options.handle?this.element.querySelectorAll(this.options.handle):[this.element],this.bindHandles()},s.dispatchEvent=function(t,i,n){var e=[i].concat(n);this.emitEvent(t,e),this.dispatchJQueryEvent(t,i,n)},s.dispatchJQueryEvent=function(i,n,e){var o=t.jQuery;if(o&&this.$element){var r=o.Event(n);r.type=i,this.$element.trigger(r,e)}},s._getPosition=function(){var t=getComputedStyle(this.element),i=this._getPositionCoord(t.left,"width"),n=this._getPositionCoord(t.top,"height");this.position.x=isNaN(i)?0:i,this.position.y=isNaN(n)?0:n,this._addTransformPosition(t)},s._getPositionCoord=function(t,n){if(-1!=t.indexOf("%")){var e=i(this.element.parentNode);return e?parseFloat(t)/100*e[n]:0}return parseInt(t,10)},s._addTransformPosition=function(t){var i=t.transform;if(0===i.indexOf("matrix")){var n=i.split(","),e=0===i.indexOf("matrix3d")?12:4,o=parseInt(n[e],10),r=parseInt(n[e+1],10);this.position.x+=o,this.position.y+=r}},s.onPointerDown=function(t,i){this.element.classList.add("is-pointer-down"),this.dispatchJQueryEvent("pointerDown",t,[i])},s.dragStart=function(t,i){this.isEnabled&&(this._getPosition(),this.measureContainment(),this.startPosition.x=this.position.x,this.startPosition.y=this.position.y,this.setLeftTop(),this.dragPoint.x=0,this.dragPoint.y=0,this.element.classList.add("is-dragging"),this.dispatchEvent("dragStart",t,[i]),this.animate())},s.measureContainment=function(){var t=this.getContainer();if(t){var n=i(this.element),e=i(t),o=this.element.getBoundingClientRect(),r=t.getBoundingClientRect(),s=e.borderLeftWidth+e.borderRightWidth,a=e.borderTopWidth+e.borderBottomWidth,h=this.relativeStartPosition={x:o.left-(r.left+e.borderLeftWidth),y:o.top-(r.top+e.borderTopWidth)};this.containSize={width:e.width-s-h.x-n.width,height:e.height-a-h.y-n.height}}},s.getContainer=function(){var t=this.options.containment;if(t)return t instanceof HTMLElement?t:"string"==typeof t?document.querySelector(t):this.element.parentNode},s.onPointerMove=function(t,i,n){this.dispatchJQueryEvent("pointerMove",t,[i,n])},s.dragMove=function(t,i,n){if(this.isEnabled){var e=n.x,o=n.y,r=this.options.grid,s=r&&r[0],a=r&&r[1];e=h(e,s),o=h(o,a),e=this.containDrag("x",e,s),o=this.containDrag("y",o,a),o="x"==this.options.axis?0:o,this.position.x=this.startPosition.x+(e="y"==this.options.axis?0:e),this.position.y=this.startPosition.y+o,this.dragPoint.x=e,this.dragPoint.y=o,this.dispatchEvent("dragMove",t,[i,n])}},s.containDrag=function(t,i,n){if(!this.options.containment)return i;var e="x"==t?"width":"height",o=h(-this.relativeStartPosition[t],n,"ceil"),r=this.containSize[e];return r=h(r,n,"floor"),Math.max(o,Math.min(r,i))},s.onPointerUp=function(t,i){this.element.classList.remove("is-pointer-down"),this.dispatchJQueryEvent("pointerUp",t,[i])},s.dragEnd=function(t,i){this.isEnabled&&(this.element.style.transform="",this.setLeftTop(),this.element.classList.remove("is-dragging"),this.dispatchEvent("dragEnd",t,[i]))},s.animate=function(){if(this.isDragging){this.positionDrag();var t=this;requestAnimationFrame(function(){t.animate()})}},s.setLeftTop=function(){this.element.style.left=this.position.x+"px",this.element.style.top=this.position.y+"px"},s.positionDrag=function(){this.element.style.transform="translate3d( "+this.dragPoint.x+"px, "+this.dragPoint.y+"px, 0)"},s.staticClick=function(t,i){this.dispatchEvent("staticClick",t,[i])},s.setPosition=function(t,i){this.position.x=t,this.position.y=i,this.setLeftTop()},s.enable=function(){this.isEnabled=!0},s.disable=function(){this.isEnabled=!1,this.isDragging&&this.dragEnd()},s.destroy=function(){this.disable(),this.element.style.transform="",this.element.style.left="",this.element.style.top="",this.element.style.position="",this.unbindHandles(),this.$element&&this.$element.removeData("draggabilly")},s._init=function(){},o&&o.bridget&&o.bridget("draggabilly",r),r})}),d=function(i,n){var e=this;void 0===n&&(n={});var o=n.container;void 0===o&&(o=document.documentElement);var r=n.grid;void 0===r&&(r=[1,1]);var s=n.debug;if(void 0===s&&(s=!1),!i)throw new TypeError("Box constructor expects HTMLElement, "+typeof i+" given");this.grid=r,this.debug=s,this.element=i,this.element.style.position="absolute",this.container=o,this.lastMove=Date.now(),this.dragInstance=new h(i,{grid:r,containment:o}),this.dragInstance.on("dragStart",function(){e.isDragging=!0}),this.dragInstance.on("dragMove",function(){e.lastMove=Date.now()}),this.dragInstance.on("dragEnd",function(){e.isDragging=!1}),t(this)};function u(){}d.prototype.destroy=function(){this.dragInstance.destroy()},d.prototype.collide=function(t){return this.collideOnXAxis(t)&&this.collideOnYAxis(t)},d.prototype.delta=function(t){return[this.center.x-t.center.x,this.center.y-t.center.y]},d.prototype.freeze=function(){this.frozen||(this.frozen=!0,this.frozenBoundingBox=this._computeBoundingBox(),this.debug&&this.element.classList.add("frozen"))},d.prototype.unfreeze=function(){this.frozen=!1,this.debug&&this.element.classList.remove("frozen")},d.prototype.collideOnYAxis=function(t){if(t)return t!==this&&this.xmax>t.xmin&&this.xmin<t.xmax},d.prototype.collideOnXAxis=function(t){if(t)return t!==this&&this.ymax>t.ymin&&this.ymin<t.ymax},d.prototype.move=function(t,i){this.isDragging||(this.dragInstance.setPosition(t,i),this.lastMove=Date.now(),this.update())},d.prototype.update=function(){var t=this;this.boundingBox=this._computeBoundingBox(),Object.keys(this.boundingBox).forEach(function(i){t[i]=t.boundingBox[i]})},d.prototype._computeBoundingBox=function(){var t=this.element.getBoundingClientRect(),i=t.width,n=t.height,e=this.dragInstance.position.x,o=this.dragInstance.position.y;return Object.freeze({x:e,y:o,width:i,height:n,xmin:e,ymin:o,xmax:e+i,ymax:o+n,center:{x:e+i/2,y:o+n/2}})};export default function(t){void 0===t&&(t={});var n=t.container;void 0===n&&(n=".pinp-container");var e=t.debug;void 0===e&&(e=!1);var o=t.grid;void 0===o&&(o=[50,50]);var r=t.maxSolverIterations;void 0===r&&(r=999);var s=t.noOOB;void 0===s&&(s=!0);var a=t.pushBehavior;void 0===a&&(a="both");var h=t.updateContainerHeight;void 0===h&&(h=!0);var c=t.updateContainerWidth;void 0===c&&(c=!0);var p=t.willUpdate;void 0===p&&(p=u);var f,g=t.didUpdate;void 0===g&&(g=u),f=n,n=("object"==typeof window.HTMLElement?f instanceof window.HTMLElement:f&&"object"==typeof f&&null!==f&&1===f.nodeType&&"string"==typeof f.nodeName)?n:document.querySelector(n);var v=new i([],{debug:e,maxSolverIterations:r,noOOB:s,pushBehavior:a});return{add:function(t){var i=new d(t,{container:n,debug:e,grid:o});i.dragInstance.on("dragStart",v.freeze),i.dragInstance.on("dragMove",function(){window.requestAnimationFrame(function(){p(),i.unfreeze(),v.pack({debug:!1}),g()})}),i.dragInstance.on("dragEnd",function(){v.unfreeze(),l()}),v.boxes.push(i)},update:l,get boxes(){return v.boxes},get width(){return v.xmax},get height(){return v.ymax}};function l(){window.requestAnimationFrame(function(){p(),v.pack(),c&&(n.style.width=v.xmax+"px"),h&&(n.style.height=v.ymax+"px"),g()})}}
//# sourceMappingURL=pinp.m.js.map
