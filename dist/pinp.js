var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function i(t,i){return t(i={exports:{}},i.exports),i.exports}var n=i(function(t){!function(i,n){t.exports?t.exports=n():i.getSize=n()}(window,function(){function t(t){var i=parseFloat(t);return-1==t.indexOf("%")&&!isNaN(i)&&i}var i="undefined"==typeof console?function(){}:function(t){console.error(t)},n=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],e=n.length;function o(t){var n=getComputedStyle(t);return n||i("Style returned "+n+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),n}var r,s=!1;return function i(h){if(function(){if(!s){s=!0;var n=document.createElement("div");n.style.width="200px",n.style.padding="1px 2px 3px 4px",n.style.borderStyle="solid",n.style.borderWidth="1px 2px 3px 4px",n.style.boxSizing="border-box";var e=document.body||document.documentElement;e.appendChild(n);var h=o(n);r=200==Math.round(t(h.width)),i.isBoxSizeOuter=r,e.removeChild(n)}}(),"string"==typeof h&&(h=document.querySelector(h)),h&&"object"==typeof h&&h.nodeType){var a=o(h);if("none"==a.display)return function(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},i=0;i<e;i++)t[n[i]]=0;return t}();var d={};d.width=h.offsetWidth,d.height=h.offsetHeight;for(var c=d.isBorderBox="border-box"==a.boxSizing,u=0;u<e;u++){var p=n[u],f=parseFloat(a[p]);d[p]=isNaN(f)?0:f}var l=d.paddingLeft+d.paddingRight,g=d.paddingTop+d.paddingBottom,v=d.marginLeft+d.marginRight,m=d.marginTop+d.marginBottom,x=d.borderLeftWidth+d.borderRightWidth,y=d.borderTopWidth+d.borderBottomWidth,b=c&&r,E=t(a.width);!1!==E&&(d.width=E+(b?0:l+x));var _=t(a.height);return!1!==_&&(d.height=_+(b?0:g+y)),d.innerWidth=d.width-(l+x),d.innerHeight=d.height-(g+y),d.outerWidth=d.width+v,d.outerHeight=d.height+m,d}}})}),e=i(function(i){var n,e;n="undefined"!=typeof window?window:t,e=function(){function t(){}var i=t.prototype;return i.on=function(t,i){if(t&&i){var n=this._events=this._events||{},e=n[t]=n[t]||[];return-1==e.indexOf(i)&&e.push(i),this}},i.once=function(t,i){if(t&&i){this.on(t,i);var n=this._onceEvents=this._onceEvents||{};return(n[t]=n[t]||{})[i]=!0,this}},i.off=function(t,i){var n=this._events&&this._events[t];if(n&&n.length){var e=n.indexOf(i);return-1!=e&&n.splice(e,1),this}},i.emitEvent=function(t,i){var n=this._events&&this._events[t];if(n&&n.length){n=n.slice(0),i=i||[];for(var e=this._onceEvents&&this._onceEvents[t],o=0;o<n.length;o++){var r=n[o];e&&e[r]&&(this.off(t,r),delete e[r]),r.apply(this,i)}return this}},i.allOff=function(){delete this._events,delete this._onceEvents},t},i.exports?i.exports=e():n.EvEmitter=e()}),o=i(function(t){!function(i,n){t.exports?t.exports=n(i,e):i.Unipointer=n(i,i.EvEmitter)}(window,function(t,i){function n(){}var e=n.prototype=Object.create(i.prototype);e.bindStartEvent=function(t){this._bindStartEvent(t,!0)},e.unbindStartEvent=function(t){this._bindStartEvent(t,!1)},e._bindStartEvent=function(i,n){var e="mousedown";t.PointerEvent?e="pointerdown":"ontouchstart"in t&&(e="touchstart"),i[(n=void 0===n||n)?"addEventListener":"removeEventListener"](e,this)},e.handleEvent=function(t){var i="on"+t.type;this[i]&&this[i](t)},e.getTouch=function(t){for(var i=0;i<t.length;i++){var n=t[i];if(n.identifier==this.pointerIdentifier)return n}},e.onmousedown=function(t){var i=t.button;i&&0!==i&&1!==i||this._pointerDown(t,t)},e.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])},e.onpointerdown=function(t){this._pointerDown(t,t)},e._pointerDown=function(t,i){t.button||this.isPointerDown||(this.isPointerDown=!0,this.pointerIdentifier=void 0!==i.pointerId?i.pointerId:i.identifier,this.pointerDown(t,i))},e.pointerDown=function(t,i){this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,i])};var o={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"]};return e._bindPostStartEvents=function(i){if(i){var n=o[i.type];n.forEach(function(i){t.addEventListener(i,this)},this),this._boundPointerEvents=n}},e._unbindPostStartEvents=function(){this._boundPointerEvents&&(this._boundPointerEvents.forEach(function(i){t.removeEventListener(i,this)},this),delete this._boundPointerEvents)},e.onmousemove=function(t){this._pointerMove(t,t)},e.onpointermove=function(t){t.pointerId==this.pointerIdentifier&&this._pointerMove(t,t)},e.ontouchmove=function(t){var i=this.getTouch(t.changedTouches);i&&this._pointerMove(t,i)},e._pointerMove=function(t,i){this.pointerMove(t,i)},e.pointerMove=function(t,i){this.emitEvent("pointerMove",[t,i])},e.onmouseup=function(t){this._pointerUp(t,t)},e.onpointerup=function(t){t.pointerId==this.pointerIdentifier&&this._pointerUp(t,t)},e.ontouchend=function(t){var i=this.getTouch(t.changedTouches);i&&this._pointerUp(t,i)},e._pointerUp=function(t,i){this._pointerDone(),this.pointerUp(t,i)},e.pointerUp=function(t,i){this.emitEvent("pointerUp",[t,i])},e._pointerDone=function(){this._pointerReset(),this._unbindPostStartEvents(),this.pointerDone()},e._pointerReset=function(){this.isPointerDown=!1,delete this.pointerIdentifier},e.pointerDone=function(){},e.onpointercancel=function(t){t.pointerId==this.pointerIdentifier&&this._pointerCancel(t,t)},e.ontouchcancel=function(t){var i=this.getTouch(t.changedTouches);i&&this._pointerCancel(t,i)},e._pointerCancel=function(t,i){this._pointerDone(),this.pointerCancel(t,i)},e.pointerCancel=function(t,i){this.emitEvent("pointerCancel",[t,i])},n.getPointerPoint=function(t){return{x:t.pageX,y:t.pageY}},n})}),r=i(function(t){!function(i,n){t.exports?t.exports=n(i,o):i.Unidragger=n(i,i.Unipointer)}(window,function(t,i){function n(){}var e=n.prototype=Object.create(i.prototype);e.bindHandles=function(){this._bindHandles(!0)},e.unbindHandles=function(){this._bindHandles(!1)},e._bindHandles=function(i){for(var n=(i=void 0===i||i)?"addEventListener":"removeEventListener",e=i?this._touchActionValue:"",o=0;o<this.handles.length;o++){var r=this.handles[o];this._bindStartEvent(r,i),r[n]("click",this),t.PointerEvent&&(r.style.touchAction=e)}},e._touchActionValue="none",e.pointerDown=function(t,i){this.okayPointerDown(t)&&(this.pointerDownPointer=i,t.preventDefault(),this.pointerDownBlur(),this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,i]))};var o={TEXTAREA:!0,INPUT:!0,SELECT:!0,OPTION:!0},r={radio:!0,checkbox:!0,button:!0,submit:!0,image:!0,file:!0};return e.okayPointerDown=function(t){var i=!o[t.target.nodeName]||r[t.target.type];return i||this._pointerReset(),i},e.pointerDownBlur=function(){var t=document.activeElement;t&&t.blur&&t!=document.body&&t.blur()},e.pointerMove=function(t,i){var n=this._dragPointerMove(t,i);this.emitEvent("pointerMove",[t,i,n]),this._dragMove(t,i,n)},e._dragPointerMove=function(t,i){var n={x:i.pageX-this.pointerDownPointer.pageX,y:i.pageY-this.pointerDownPointer.pageY};return!this.isDragging&&this.hasDragStarted(n)&&this._dragStart(t,i),n},e.hasDragStarted=function(t){return Math.abs(t.x)>3||Math.abs(t.y)>3},e.pointerUp=function(t,i){this.emitEvent("pointerUp",[t,i]),this._dragPointerUp(t,i)},e._dragPointerUp=function(t,i){this.isDragging?this._dragEnd(t,i):this._staticClick(t,i)},e._dragStart=function(t,i){this.isDragging=!0,this.isPreventingClicks=!0,this.dragStart(t,i)},e.dragStart=function(t,i){this.emitEvent("dragStart",[t,i])},e._dragMove=function(t,i,n){this.isDragging&&this.dragMove(t,i,n)},e.dragMove=function(t,i,n){t.preventDefault(),this.emitEvent("dragMove",[t,i,n])},e._dragEnd=function(t,i){this.isDragging=!1,setTimeout(function(){delete this.isPreventingClicks}.bind(this)),this.dragEnd(t,i)},e.dragEnd=function(t,i){this.emitEvent("dragEnd",[t,i])},e.onclick=function(t){this.isPreventingClicks&&t.preventDefault()},e._staticClick=function(t,i){this.isIgnoringMouseUp&&"mouseup"==t.type||(this.staticClick(t,i),"mouseup"!=t.type&&(this.isIgnoringMouseUp=!0,setTimeout(function(){delete this.isIgnoringMouseUp}.bind(this),400)))},e.staticClick=function(t,i){this.emitEvent("staticClick",[t,i])},n.getPointerPoint=i.getPointerPoint,n})}),s=i(function(t){!function(i,e){t.exports?t.exports=e(i,n,r):i.Draggabilly=e(i,i.getSize,i.Unidragger)}(window,function(t,i,n){function e(t,i){for(var n in i)t[n]=i[n];return t}var o=t.jQuery;function r(t,i){this.element="string"==typeof t?document.querySelector(t):t,o&&(this.$element=o(this.element)),this.options=e({},this.constructor.defaults),this.option(i),this._create()}var s=r.prototype=Object.create(n.prototype);r.defaults={},s.option=function(t){e(this.options,t)};var h={relative:!0,absolute:!0,fixed:!0};function a(t,i,n){return n=n||"round",i?Math[n](t/i)*i:t}return s._create=function(){this.position={},this._getPosition(),this.startPoint={x:0,y:0},this.dragPoint={x:0,y:0},this.startPosition=e({},this.position);var t=getComputedStyle(this.element);h[t.position]||(this.element.style.position="relative"),this.on("pointerDown",this.onPointerDown),this.on("pointerMove",this.onPointerMove),this.on("pointerUp",this.onPointerUp),this.enable(),this.setHandles()},s.setHandles=function(){this.handles=this.options.handle?this.element.querySelectorAll(this.options.handle):[this.element],this.bindHandles()},s.dispatchEvent=function(t,i,n){var e=[i].concat(n);this.emitEvent(t,e),this.dispatchJQueryEvent(t,i,n)},s.dispatchJQueryEvent=function(i,n,e){var o=t.jQuery;if(o&&this.$element){var r=o.Event(n);r.type=i,this.$element.trigger(r,e)}},s._getPosition=function(){var t=getComputedStyle(this.element),i=this._getPositionCoord(t.left,"width"),n=this._getPositionCoord(t.top,"height");this.position.x=isNaN(i)?0:i,this.position.y=isNaN(n)?0:n,this._addTransformPosition(t)},s._getPositionCoord=function(t,n){if(-1!=t.indexOf("%")){var e=i(this.element.parentNode);return e?parseFloat(t)/100*e[n]:0}return parseInt(t,10)},s._addTransformPosition=function(t){var i=t.transform;if(0===i.indexOf("matrix")){var n=i.split(","),e=0===i.indexOf("matrix3d")?12:4,o=parseInt(n[e],10),r=parseInt(n[e+1],10);this.position.x+=o,this.position.y+=r}},s.onPointerDown=function(t,i){this.element.classList.add("is-pointer-down"),this.dispatchJQueryEvent("pointerDown",t,[i])},s.dragStart=function(t,i){this.isEnabled&&(this._getPosition(),this.measureContainment(),this.startPosition.x=this.position.x,this.startPosition.y=this.position.y,this.setLeftTop(),this.dragPoint.x=0,this.dragPoint.y=0,this.element.classList.add("is-dragging"),this.dispatchEvent("dragStart",t,[i]),this.animate())},s.measureContainment=function(){var t=this.getContainer();if(t){var n=i(this.element),e=i(t),o=this.element.getBoundingClientRect(),r=t.getBoundingClientRect(),s=e.borderLeftWidth+e.borderRightWidth,h=e.borderTopWidth+e.borderBottomWidth,a=this.relativeStartPosition={x:o.left-(r.left+e.borderLeftWidth),y:o.top-(r.top+e.borderTopWidth)};this.containSize={width:e.width-s-a.x-n.width,height:e.height-h-a.y-n.height}}},s.getContainer=function(){var t=this.options.containment;if(t)return t instanceof HTMLElement?t:"string"==typeof t?document.querySelector(t):this.element.parentNode},s.onPointerMove=function(t,i,n){this.dispatchJQueryEvent("pointerMove",t,[i,n])},s.dragMove=function(t,i,n){if(this.isEnabled){var e=n.x,o=n.y,r=this.options.grid,s=r&&r[0],h=r&&r[1];e=a(e,s),o=a(o,h),e=this.containDrag("x",e,s),o=this.containDrag("y",o,h),o="x"==this.options.axis?0:o,this.position.x=this.startPosition.x+(e="y"==this.options.axis?0:e),this.position.y=this.startPosition.y+o,this.dragPoint.x=e,this.dragPoint.y=o,this.dispatchEvent("dragMove",t,[i,n])}},s.containDrag=function(t,i,n){if(!this.options.containment)return i;var e="x"==t?"width":"height",o=a(-this.relativeStartPosition[t],n,"ceil"),r=this.containSize[e];return r=a(r,n,"floor"),Math.max(o,Math.min(r,i))},s.onPointerUp=function(t,i){this.element.classList.remove("is-pointer-down"),this.dispatchJQueryEvent("pointerUp",t,[i])},s.dragEnd=function(t,i){this.isEnabled&&(this.element.style.transform="",this.setLeftTop(),this.element.classList.remove("is-dragging"),this.dispatchEvent("dragEnd",t,[i]))},s.animate=function(){if(this.isDragging){this.positionDrag();var t=this;requestAnimationFrame(function(){t.animate()})}},s.setLeftTop=function(){this.element.style.left=this.position.x+"px",this.element.style.top=this.position.y+"px"},s.positionDrag=function(){this.element.style.transform="translate3d( "+this.dragPoint.x+"px, "+this.dragPoint.y+"px, 0)"},s.staticClick=function(t,i){this.dispatchEvent("staticClick",t,[i])},s.setPosition=function(t,i){this.position.x=t,this.position.y=i,this.setLeftTop()},s.enable=function(){this.isEnabled=!0},s.disable=function(){this.isEnabled=!1,this.isDragging&&this.dragEnd()},s.destroy=function(){this.disable(),this.element.style.transform="",this.element.style.left="",this.element.style.top="",this.element.style.position="",this.unbindHandles(),this.$element&&this.$element.removeData("draggabilly")},s._init=function(){},o&&o.bridget&&o.bridget("draggabilly",r),r})});function h(){}var a=function(t,i){void 0===i&&(i={});var n=i.container;void 0===n&&(n=document.documentElement);var e=i.grid;void 0===e&&(e=[1,1]);var o=i.onMove;if(void 0===o&&(o=h),!t)throw new TypeError("Item constructor expects HTMLElement, "+typeof t+" given");this.grid=e,this.onMove=o.bind(this),this.element=t,this.element.style.position="absolute",this.container=n,this.dragInstance=new s(t,{grid:e,containment:n}),this.dragInstance.on("dragEnd",this.onMove)},d={box:{configurable:!0},index:{configurable:!0}};a.prototype.destroy=function(){this.dragInstance.destroy()},a.prototype.collide=function(t){return this.collideOnXAxis(t)&&this.collideOnYAxis(t)},a.prototype.collideOnYAxis=function(t){if(t)return t!==this&&this.box.xmax>t.box.xmin&&this.box.xmin<t.box.xmax},a.prototype.collideOnXAxis=function(t){if(t)return t!==this&&this.box.ymax>t.box.ymin&&this.box.ymin<t.box.ymax},a.prototype.move=function(t,i){this.isDragged||this.dragInstance.setPosition(t,i)},d.box.get=function(){var t=this.element.getBoundingClientRect(),i=t.width,n=t.height,e=this.dragInstance.position.x,o=this.dragInstance.position.y;return{x:e,y:o,width:i,height:n,xmin:e,ymin:o,xmax:e+i,ymax:o+n,center:{x:e+i/2,y:o+n/2}}},d.index.get=function(){return this._index},d.index.set=function(t){this._index=t,this.element.innerHTML="#"+t},a.prototype.write=function(t,i){void 0===i&&(i=!1),this._text=i?this._text+" "+t:t,this.element.innerHTML=this._text},Object.defineProperties(a.prototype,d),module.exports=function(t){void 0===t&&(t={});var i=t.grid;void 0===i&&(i=[50,50]);var n=t.container;void 0===n&&(n=".pinp-container");var e,o=t.itemSelector;void 0===o&&(o=".pinp-item"),e=n;for(var r=(n=("object"==typeof window.HTMLElement?e instanceof window.HTMLElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName)?n:document.querySelector(n)).querySelectorAll(o),s=[],h=0;h<r.length;h++)d(r[h]);return{add:d,update:c};function d(t){var e=new a(t,{container:n,onMove:c,grid:i});s.push(e)}function c(){window.requestAnimationFrame(function(){!function(t,i){void 0===i&&(i=!1);for(var n=t.sort(function(t,i){return t.box.xmax-i.box.xmax}),e=0;e<n.length;e++){var o=n[e],r=u(n.slice(0,e).filter(o.collideOnXAxis.bind(o)));n.some(o.collide.bind(o))?(o.index=e,o.move(i?r.xmax:r.xmax||o.box.xmin,o.box.ymin)):o.index=""}}(s),function(t){n.style.width=u(t).width+"px"}(s)})}function u(t){var i=0,n=0,e=0,o=0;return t.forEach(function(t){var r=t.box;i=Math.min(i,r.x),n=Math.min(n,r.y),e=Math.max(e,r.x+r.width),o=Math.max(o,r.y+r.height)}),{x:i,y:n,width:e,height:o,xmin:i,xmax:i+e,ymin:n,ymax:n+o}}};
//# sourceMappingURL=pinp.js.map
