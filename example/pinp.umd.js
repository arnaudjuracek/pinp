!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):t.pinp=n()}(this,function(){var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function n(t,n){return t(n={exports:{}},n.exports),n.exports}var i=n(function(t){!function(n,i){t.exports?t.exports=i():n.getSize=i()}(window,function(){function t(t){var n=parseFloat(t);return-1==t.indexOf("%")&&!isNaN(n)&&n}var n="undefined"==typeof console?function(){}:function(t){console.error(t)},i=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"],e=i.length;function o(t){var i=getComputedStyle(t);return i||n("Style returned "+i+". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"),i}var r,s=!1;return function n(a){if(function(){if(!s){s=!0;var i=document.createElement("div");i.style.width="200px",i.style.padding="1px 2px 3px 4px",i.style.borderStyle="solid",i.style.borderWidth="1px 2px 3px 4px",i.style.boxSizing="border-box";var e=document.body||document.documentElement;e.appendChild(i);var a=o(i);r=200==Math.round(t(a.width)),n.isBoxSizeOuter=r,e.removeChild(i)}}(),"string"==typeof a&&(a=document.querySelector(a)),a&&"object"==typeof a&&a.nodeType){var h=o(a);if("none"==h.display)return function(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},n=0;n<e;n++)t[i[n]]=0;return t}();var d={};d.width=a.offsetWidth,d.height=a.offsetHeight;for(var u=d.isBorderBox="border-box"==h.boxSizing,c=0;c<e;c++){var p=i[c],f=parseFloat(h[p]);d[p]=isNaN(f)?0:f}var g=d.paddingLeft+d.paddingRight,l=d.paddingTop+d.paddingBottom,v=d.marginLeft+d.marginRight,m=d.marginTop+d.marginBottom,x=d.borderLeftWidth+d.borderRightWidth,b=d.borderTopWidth+d.borderBottomWidth,y=u&&r,E=t(h.width);!1!==E&&(d.width=E+(y?0:g+x));var w=t(h.height);return!1!==w&&(d.height=w+(y?0:l+b)),d.innerWidth=d.width-(g+x),d.innerHeight=d.height-(l+b),d.outerWidth=d.width+v,d.outerHeight=d.height+m,d}}})}),e=n(function(n){var i,e;i="undefined"!=typeof window?window:t,e=function(){function t(){}var n=t.prototype;return n.on=function(t,n){if(t&&n){var i=this._events=this._events||{},e=i[t]=i[t]||[];return-1==e.indexOf(n)&&e.push(n),this}},n.once=function(t,n){if(t&&n){this.on(t,n);var i=this._onceEvents=this._onceEvents||{};return(i[t]=i[t]||{})[n]=!0,this}},n.off=function(t,n){var i=this._events&&this._events[t];if(i&&i.length){var e=i.indexOf(n);return-1!=e&&i.splice(e,1),this}},n.emitEvent=function(t,n){var i=this._events&&this._events[t];if(i&&i.length){i=i.slice(0),n=n||[];for(var e=this._onceEvents&&this._onceEvents[t],o=0;o<i.length;o++){var r=i[o];e&&e[r]&&(this.off(t,r),delete e[r]),r.apply(this,n)}return this}},n.allOff=function(){delete this._events,delete this._onceEvents},t},n.exports?n.exports=e():i.EvEmitter=e()}),o=n(function(t){!function(n,i){t.exports?t.exports=i(n,e):n.Unipointer=i(n,n.EvEmitter)}(window,function(t,n){function i(){}var e=i.prototype=Object.create(n.prototype);e.bindStartEvent=function(t){this._bindStartEvent(t,!0)},e.unbindStartEvent=function(t){this._bindStartEvent(t,!1)},e._bindStartEvent=function(n,i){var e="mousedown";t.PointerEvent?e="pointerdown":"ontouchstart"in t&&(e="touchstart"),n[(i=void 0===i||i)?"addEventListener":"removeEventListener"](e,this)},e.handleEvent=function(t){var n="on"+t.type;this[n]&&this[n](t)},e.getTouch=function(t){for(var n=0;n<t.length;n++){var i=t[n];if(i.identifier==this.pointerIdentifier)return i}},e.onmousedown=function(t){var n=t.button;n&&0!==n&&1!==n||this._pointerDown(t,t)},e.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])},e.onpointerdown=function(t){this._pointerDown(t,t)},e._pointerDown=function(t,n){t.button||this.isPointerDown||(this.isPointerDown=!0,this.pointerIdentifier=void 0!==n.pointerId?n.pointerId:n.identifier,this.pointerDown(t,n))},e.pointerDown=function(t,n){this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,n])};var o={mousedown:["mousemove","mouseup"],touchstart:["touchmove","touchend","touchcancel"],pointerdown:["pointermove","pointerup","pointercancel"]};return e._bindPostStartEvents=function(n){if(n){var i=o[n.type];i.forEach(function(n){t.addEventListener(n,this)},this),this._boundPointerEvents=i}},e._unbindPostStartEvents=function(){this._boundPointerEvents&&(this._boundPointerEvents.forEach(function(n){t.removeEventListener(n,this)},this),delete this._boundPointerEvents)},e.onmousemove=function(t){this._pointerMove(t,t)},e.onpointermove=function(t){t.pointerId==this.pointerIdentifier&&this._pointerMove(t,t)},e.ontouchmove=function(t){var n=this.getTouch(t.changedTouches);n&&this._pointerMove(t,n)},e._pointerMove=function(t,n){this.pointerMove(t,n)},e.pointerMove=function(t,n){this.emitEvent("pointerMove",[t,n])},e.onmouseup=function(t){this._pointerUp(t,t)},e.onpointerup=function(t){t.pointerId==this.pointerIdentifier&&this._pointerUp(t,t)},e.ontouchend=function(t){var n=this.getTouch(t.changedTouches);n&&this._pointerUp(t,n)},e._pointerUp=function(t,n){this._pointerDone(),this.pointerUp(t,n)},e.pointerUp=function(t,n){this.emitEvent("pointerUp",[t,n])},e._pointerDone=function(){this._pointerReset(),this._unbindPostStartEvents(),this.pointerDone()},e._pointerReset=function(){this.isPointerDown=!1,delete this.pointerIdentifier},e.pointerDone=function(){},e.onpointercancel=function(t){t.pointerId==this.pointerIdentifier&&this._pointerCancel(t,t)},e.ontouchcancel=function(t){var n=this.getTouch(t.changedTouches);n&&this._pointerCancel(t,n)},e._pointerCancel=function(t,n){this._pointerDone(),this.pointerCancel(t,n)},e.pointerCancel=function(t,n){this.emitEvent("pointerCancel",[t,n])},i.getPointerPoint=function(t){return{x:t.pageX,y:t.pageY}},i})}),r=n(function(t){!function(n,i){t.exports?t.exports=i(n,o):n.Unidragger=i(n,n.Unipointer)}(window,function(t,n){function i(){}var e=i.prototype=Object.create(n.prototype);e.bindHandles=function(){this._bindHandles(!0)},e.unbindHandles=function(){this._bindHandles(!1)},e._bindHandles=function(n){for(var i=(n=void 0===n||n)?"addEventListener":"removeEventListener",e=n?this._touchActionValue:"",o=0;o<this.handles.length;o++){var r=this.handles[o];this._bindStartEvent(r,n),r[i]("click",this),t.PointerEvent&&(r.style.touchAction=e)}},e._touchActionValue="none",e.pointerDown=function(t,n){this.okayPointerDown(t)&&(this.pointerDownPointer=n,t.preventDefault(),this.pointerDownBlur(),this._bindPostStartEvents(t),this.emitEvent("pointerDown",[t,n]))};var o={TEXTAREA:!0,INPUT:!0,SELECT:!0,OPTION:!0},r={radio:!0,checkbox:!0,button:!0,submit:!0,image:!0,file:!0};return e.okayPointerDown=function(t){var n=!o[t.target.nodeName]||r[t.target.type];return n||this._pointerReset(),n},e.pointerDownBlur=function(){var t=document.activeElement;t&&t.blur&&t!=document.body&&t.blur()},e.pointerMove=function(t,n){var i=this._dragPointerMove(t,n);this.emitEvent("pointerMove",[t,n,i]),this._dragMove(t,n,i)},e._dragPointerMove=function(t,n){var i={x:n.pageX-this.pointerDownPointer.pageX,y:n.pageY-this.pointerDownPointer.pageY};return!this.isDragging&&this.hasDragStarted(i)&&this._dragStart(t,n),i},e.hasDragStarted=function(t){return Math.abs(t.x)>3||Math.abs(t.y)>3},e.pointerUp=function(t,n){this.emitEvent("pointerUp",[t,n]),this._dragPointerUp(t,n)},e._dragPointerUp=function(t,n){this.isDragging?this._dragEnd(t,n):this._staticClick(t,n)},e._dragStart=function(t,n){this.isDragging=!0,this.isPreventingClicks=!0,this.dragStart(t,n)},e.dragStart=function(t,n){this.emitEvent("dragStart",[t,n])},e._dragMove=function(t,n,i){this.isDragging&&this.dragMove(t,n,i)},e.dragMove=function(t,n,i){t.preventDefault(),this.emitEvent("dragMove",[t,n,i])},e._dragEnd=function(t,n){this.isDragging=!1,setTimeout(function(){delete this.isPreventingClicks}.bind(this)),this.dragEnd(t,n)},e.dragEnd=function(t,n){this.emitEvent("dragEnd",[t,n])},e.onclick=function(t){this.isPreventingClicks&&t.preventDefault()},e._staticClick=function(t,n){this.isIgnoringMouseUp&&"mouseup"==t.type||(this.staticClick(t,n),"mouseup"!=t.type&&(this.isIgnoringMouseUp=!0,setTimeout(function(){delete this.isIgnoringMouseUp}.bind(this),400)))},e.staticClick=function(t,n){this.emitEvent("staticClick",[t,n])},i.getPointerPoint=n.getPointerPoint,i})}),s=n(function(t){!function(n,e){t.exports?t.exports=e(n,i,r):n.Draggabilly=e(n,n.getSize,n.Unidragger)}(window,function(t,n,i){function e(t,n){for(var i in n)t[i]=n[i];return t}var o=t.jQuery;function r(t,n){this.element="string"==typeof t?document.querySelector(t):t,o&&(this.$element=o(this.element)),this.options=e({},this.constructor.defaults),this.option(n),this._create()}var s=r.prototype=Object.create(i.prototype);r.defaults={},s.option=function(t){e(this.options,t)};var a={relative:!0,absolute:!0,fixed:!0};function h(t,n,i){return i=i||"round",n?Math[i](t/n)*n:t}return s._create=function(){this.position={},this._getPosition(),this.startPoint={x:0,y:0},this.dragPoint={x:0,y:0},this.startPosition=e({},this.position);var t=getComputedStyle(this.element);a[t.position]||(this.element.style.position="relative"),this.on("pointerDown",this.onPointerDown),this.on("pointerMove",this.onPointerMove),this.on("pointerUp",this.onPointerUp),this.enable(),this.setHandles()},s.setHandles=function(){this.handles=this.options.handle?this.element.querySelectorAll(this.options.handle):[this.element],this.bindHandles()},s.dispatchEvent=function(t,n,i){var e=[n].concat(i);this.emitEvent(t,e),this.dispatchJQueryEvent(t,n,i)},s.dispatchJQueryEvent=function(n,i,e){var o=t.jQuery;if(o&&this.$element){var r=o.Event(i);r.type=n,this.$element.trigger(r,e)}},s._getPosition=function(){var t=getComputedStyle(this.element),n=this._getPositionCoord(t.left,"width"),i=this._getPositionCoord(t.top,"height");this.position.x=isNaN(n)?0:n,this.position.y=isNaN(i)?0:i,this._addTransformPosition(t)},s._getPositionCoord=function(t,i){if(-1!=t.indexOf("%")){var e=n(this.element.parentNode);return e?parseFloat(t)/100*e[i]:0}return parseInt(t,10)},s._addTransformPosition=function(t){var n=t.transform;if(0===n.indexOf("matrix")){var i=n.split(","),e=0===n.indexOf("matrix3d")?12:4,o=parseInt(i[e],10),r=parseInt(i[e+1],10);this.position.x+=o,this.position.y+=r}},s.onPointerDown=function(t,n){this.element.classList.add("is-pointer-down"),this.dispatchJQueryEvent("pointerDown",t,[n])},s.dragStart=function(t,n){this.isEnabled&&(this._getPosition(),this.measureContainment(),this.startPosition.x=this.position.x,this.startPosition.y=this.position.y,this.setLeftTop(),this.dragPoint.x=0,this.dragPoint.y=0,this.element.classList.add("is-dragging"),this.dispatchEvent("dragStart",t,[n]),this.animate())},s.measureContainment=function(){var t=this.getContainer();if(t){var i=n(this.element),e=n(t),o=this.element.getBoundingClientRect(),r=t.getBoundingClientRect(),s=e.borderLeftWidth+e.borderRightWidth,a=e.borderTopWidth+e.borderBottomWidth,h=this.relativeStartPosition={x:o.left-(r.left+e.borderLeftWidth),y:o.top-(r.top+e.borderTopWidth)};this.containSize={width:e.width-s-h.x-i.width,height:e.height-a-h.y-i.height}}},s.getContainer=function(){var t=this.options.containment;if(t)return t instanceof HTMLElement?t:"string"==typeof t?document.querySelector(t):this.element.parentNode},s.onPointerMove=function(t,n,i){this.dispatchJQueryEvent("pointerMove",t,[n,i])},s.dragMove=function(t,n,i){if(this.isEnabled){var e=i.x,o=i.y,r=this.options.grid,s=r&&r[0],a=r&&r[1];e=h(e,s),o=h(o,a),e=this.containDrag("x",e,s),o=this.containDrag("y",o,a),o="x"==this.options.axis?0:o,this.position.x=this.startPosition.x+(e="y"==this.options.axis?0:e),this.position.y=this.startPosition.y+o,this.dragPoint.x=e,this.dragPoint.y=o,this.dispatchEvent("dragMove",t,[n,i])}},s.containDrag=function(t,n,i){if(!this.options.containment)return n;var e="x"==t?"width":"height",o=h(-this.relativeStartPosition[t],i,"ceil"),r=this.containSize[e];return r=h(r,i,"floor"),Math.max(o,Math.min(r,n))},s.onPointerUp=function(t,n){this.element.classList.remove("is-pointer-down"),this.dispatchJQueryEvent("pointerUp",t,[n])},s.dragEnd=function(t,n){this.isEnabled&&(this.element.style.transform="",this.setLeftTop(),this.element.classList.remove("is-dragging"),this.dispatchEvent("dragEnd",t,[n]))},s.animate=function(){if(this.isDragging){this.positionDrag();var t=this;requestAnimationFrame(function(){t.animate()})}},s.setLeftTop=function(){this.element.style.left=this.position.x+"px",this.element.style.top=this.position.y+"px"},s.positionDrag=function(){this.element.style.transform="translate3d( "+this.dragPoint.x+"px, "+this.dragPoint.y+"px, 0)"},s.staticClick=function(t,n){this.dispatchEvent("staticClick",t,[n])},s.setPosition=function(t,n){this.position.x=t,this.position.y=n,this.setLeftTop()},s.enable=function(){this.isEnabled=!0},s.disable=function(){this.isEnabled=!1,this.isDragging&&this.dragEnd()},s.destroy=function(){this.disable(),this.element.style.transform="",this.element.style.left="",this.element.style.top="",this.element.style.position="",this.unbindHandles(),this.$element&&this.$element.removeData("draggabilly")},s._init=function(){},o&&o.bridget&&o.bridget("draggabilly",r),r})}),a=function(t,n){null==n&&(n=Object.getPrototypeOf(t));for(var i=0,e=Object.getOwnPropertyNames(n);i<e.length;i+=1){var o=e[i];"function"==typeof n[o]&&(t[o]=n[o].bind(t))}},h=function(t,n){var i=this;void 0===n&&(n={});var e=n.container;void 0===e&&(e=document.documentElement);var o=n.grid;void 0===o&&(o=[1,1]);var r=n.debug;void 0===r&&(r=!1);var h=n.draggabillyAdditionalOptions;if(void 0===h&&(h={}),!t)throw new TypeError("pinp.Box constructor expects HTMLElement, "+typeof t+" given");this.grid=o,this.debug=r,this.element=t,this.element.style.position="absolute",this.container=e,this.lastMove=Date.now();var d=Object.assign({},h,{grid:o,containment:e});this.dragInstance=new s(t,d),this.dragInstance.on("dragStart",function(){i.isDragging=!0}),this.dragInstance.on("dragMove",function(){i.lastMove=Date.now()}),this.dragInstance.on("dragEnd",function(){i.isDragging=!1}),a(this)};h.isBox=function(t){return t instanceof h},h.TypeError=function(t){return new TypeError("Expecting a pinp.Box instance but got "+t)},h.prototype.destroy=function(){this.dragInstance.destroy()},h.prototype.collide=function(t){return this.collideOnXAxis(t)&&this.collideOnYAxis(t)},h.prototype.delta=function(t){return[this.center.x-t.center.x,this.center.y-t.center.y]},h.prototype.freeze=function(){this.frozen||(this.frozen=!0,this.frozenBoundingBox=this._computeBoundingBox(),this.debug&&this.element.classList.add("frozen"))},h.prototype.unfreeze=function(){this.frozen=!1,this.debug&&this.element.classList.remove("frozen")},h.prototype.collideOnYAxis=function(t){if(t)return t!==this&&this.xmax>t.xmin&&this.xmin<t.xmax},h.prototype.collideOnXAxis=function(t){if(t)return t!==this&&this.ymax>t.ymin&&this.ymin<t.ymax},h.prototype.move=function(t,n){this.isDragging||(this.dragInstance.setPosition(t,n),this.lastMove=Date.now(),this.update())},h.prototype.update=function(){var t=this;this.boundingBox=this._computeBoundingBox(),Object.keys(this.boundingBox).forEach(function(n){t[n]=t.boundingBox[n]})},h.prototype._computeBoundingBox=function(){var t=this.element.getBoundingClientRect(),n=t.width,i=t.height,e=this.dragInstance.position.x,o=this.dragInstance.position.y;return Object.freeze({x:e,y:o,width:n,height:i,xmin:e,ymin:o,xmax:e+n,ymax:o+i,center:{x:e+n/2,y:o+i/2}})};var d=function(t){void 0===t&&(t={});var n=t.container;void 0===n&&(n=document.documentElement);var i=t.boundaries;void 0===i&&(i={top:"none",left:"none",right:"none",bottom:"none"});var e=t.debug;void 0===e&&(e=!1);var o=t.maxSolverIterations;void 0===o&&(o=999);var r=t.pushDirection;void 0===r&&(r="both"),this.boxes=[],this.debug=e,this.container=n,this.maxSolverIterations=o,this.pushDirection=r,this.boundaries=Object.assign({top:"none",left:"none",right:"none",bottom:"none"},i),Object.values(this.boundaries).filter(function(t){return"hard"===t}).length>2&&console.warn(["A pinp.Cluster has been initialized with more than two 'hard' boundaries","As this may cause some packing issues when running out of space, we recommand setting at least two boundaries as either 'soft' or 'none'."].join("\n")),a(this)};d.prototype.add=function(t){if(!h.isBox(t))throw h.TypeError(t);this.boxes.push(t)},d.prototype.remove=function(t){if(!h.isBox(t))throw h.TypeError(t);var n=this.boxes.indexOf(t);n>-1&&(t.destroy(),this.boxes.splice(n,1))},d.prototype.freeze=function(){this.frozen||(this.frozen=!0,this.boxes.forEach(function(t){return t.freeze()}))},d.prototype.unfreeze=function(){this.frozen&&(this.frozen=!1,this.boxes.forEach(function(t){return t.unfreeze()}))},d.computeBoundingBox=function(t){var n=Number.POSITIVE_INFINITY,i=Number.POSITIVE_INFINITY,e=Number.NEGATIVE_INFINITY,o=Number.NEGATIVE_INFINITY;return t.forEach(function(t){t.boundingBox||t.update(),n=Math.min(n,t.xmin),i=Math.min(i,t.ymin),e=Math.max(e,t.xmax),o=Math.max(o,t.ymax)}),{x:n,y:i,width:e,height:o,xmin:n,xmax:n+e,ymin:i,ymax:i+o}},d.prototype.pack=function(t){var n=this;void 0===t&&(t={});var i=t.maxSolverIterations;void 0===i&&(i=this.maxSolverIterations);var e=t.debug;void 0===e&&(e=this.debug);var o=t.pushDirection;void 0===o&&(o=this.pushDirection),this._prepareBoxes({debug:e}),this._getContainerSize();for(var r=0,s=this.boxes.filter(function(t){return n.boxes.some(t.collide)});s.length&&++r<i;){var a=s.shift(),h=this._solveFor(a,{debug:e,pushDirection:o});h&&h.length&&(s=s.concat(h))}this.frozen||this._updateBoundingBox()},d.prototype._prepareBoxes=function(t){void 0===t&&(t={});var n=t.debug;void 0===n&&(n=this.direction),this.boxes.length&&(this.boxes=this.boxes.sort(function(t,n){return n.lastMove-t.lastMove}),this.boxes.forEach(function(t,i){t.frozen?t.move(t.frozenBoundingBox.x,t.frozenBoundingBox.y):t.update(),t.packingOrder=i,n&&t.element.setAttribute("data-packing-order",i)}))},d.prototype._getContainerSize=function(){var t=this.container.getBoundingClientRect(),n=t.height;this.containerWidth=t.width,this.containerHeight=n},d.prototype._solveFor=function(t,n){var i=this;void 0===n&&(n={});var e=n.debug;void 0===e&&(e=this.debug);var o=n.pushDirection;void 0===o&&(o=this.pushDirection);var r=[];return this.boxes.filter(t.collide).forEach(function(n){var s=t.delta(n),a=s[0]<=0,h=s[1]<=0,d="both"===o?Math.abs(s[0])>=Math.abs(s[1])?"horizontal":"vertical":o,u=n.x,c=n.y,p={LEFT:function(){u=t.xmin-n.width,c=n.y},RIGHT:function(){u=t.xmax,c=n.y},UP:function(){u=n.x,c=t.ymin-n.height},DOWN:function(){u=n.x,c=t.ymax},HORIZONTAL:function(){return a?p.RIGHT():p.LEFT()},VERTICAL:function(){return h?p.DOWN():p.UP()}};e&&console.log({current:t.packingOrder,collide:n.packingOrder,delta:s,preferedDirection:d}),"horizontal"===d&&p.HORIZONTAL(),"vertical"===d&&p.VERTICAL(),"hard"===i.boundaries.top&&c<0&&p.HORIZONTAL(),"hard"===i.boundaries.left&&u<0&&p.VERTICAL(),"hard"===i.boundaries.bottom&&c+n.height>i.containerHeight&&p.HORIZONTAL(),"hard"===i.boundaries.right&&u+n.width>i.containerWidth&&p.VERTICAL(),u===n.x&&c===n.y||(n.move(u,c),r.push(n))}),r},d.prototype._updateBoundingBox=function(){var t=this,n=d.computeBoundingBox(this.boxes);Object.entries(n).forEach(function(n){t[n[0]]=n[1]})},d.prototype.move=function(t,n){(t||n)&&(this.boxes.forEach(function(i){return i.move(i.x+t,i.y+n)}),this._updateBoundingBox())};var u=function(t){return"object"==typeof window.HTMLElement?t instanceof window.HTMLElement:t&&"object"==typeof t&&null!==t&&1===t.nodeType&&"string"==typeof t.nodeName};function c(){}return function(t){void 0===t&&(t={});var n=t.container;void 0===n&&(n=".pinp-container");var i=t.debug;void 0===i&&(i=!1);var e=t.grid;void 0===e&&(e=[0,0]);var o=t.maxSolverIterations;void 0===o&&(o=999);var r=t.boundaries;void 0===r&&(r={top:"none",left:"none",right:"none",bottom:"none"});var s=t.pushDirection;void 0===s&&(s="both");var a=t.lastDraggedClassname;void 0===a&&(a="last-dragged");var p=t.willUpdate;void 0===p&&(p=c);var f=t.didUpdate;if(void 0===f&&(f=c),!(n=u(n)?n:document.querySelector(n)))throw new Error("Cannot find container");var g=new d({container:n,debug:i,maxSolverIterations:o,boundaries:r,pushDirection:s});return{add:function(t,o){void 0===o&&(o={});var r=new h(t,{container:n,debug:i,grid:e,draggabillyAdditionalOptions:o});return r.dragInstance.on("dragStart",function(){!function(t){if(t){for(var i=n.querySelectorAll("."+a),e=0;e<i.length;e++)i[e].classList.remove(a);t.element.classList.add(a)}}(r),g.freeze()}),r.dragInstance.on("dragMove",function(){window.requestAnimationFrame(function(){p(),r.unfreeze(),g.pack({debug:!1}),f()})}),r.dragInstance.on("dragEnd",function(){g.unfreeze(),l()}),g.add(r),r},remove:function(t){u(t)&&(t=g.boxes.find(function(n){return n.element===t})),g.remove(t)},update:l,get boxes(){return g.boxes},get width(){return g.xmax},get height(){return g.ymax}};function l(){window.requestAnimationFrame(function(){p(),g.pack(),g.move("soft"===r.left?-g.x:0,"soft"===r.top?-g.y:0),"soft"!==r.left&&"soft"!==r.right||(n.style.width=g.width+"px"),"soft"!==r.top&&"soft"!==r.bottom||(n.style.height=g.height+"px"),f()})}}});
//# sourceMappingURL=pinp.umd.js.map
