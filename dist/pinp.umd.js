!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("draggabilly")):"function"==typeof define&&define.amd?define(["draggabilly"],e):t.pinp=e(t.draggabilly)}(this,function(t){t=t&&t.hasOwnProperty("default")?t.default:t;var e=function(t,e){null==e&&(e=Object.getPrototypeOf(t));for(var n=0,o=Object.getOwnPropertyNames(e);n<o.length;n+=1){var i=o[n];"function"==typeof e[i]&&(t[i]=e[i].bind(t))}},n=function(t,n){void 0===n&&(n={});var o=n.noOOB;void 0===o&&(o=!0);var i=n.debug;void 0===i&&(i=!1);var r=n.maxSolverIterations;void 0===r&&(r=999);var a=n.pushBehavior;void 0===a&&(a="both"),this.boxes=t,this.noOOB=o,this.debug=i,this.maxSolverIterations=r,this.pushBehavior=a,this.update(),e(this)};n.prototype.freeze=function(){this.frozen||(this.frozen=!0,this.boxes.forEach(function(t){return t.freeze()}))},n.prototype.unfreeze=function(){this.frozen&&(this.frozen=!1,this.boxes.forEach(function(t){return t.unfreeze()}))},n.prototype.update=function(){this.frozen||(this._updateBoundingBox(),this.noOOB&&this.ensureInBounds())},n.prototype._updateBoundingBox=function(){var t=this,e=n.computeBoundingBox(this.boxes);Object.entries(e).forEach(function(e){t[e[0]]=e[1]})},n.computeBoundingBox=function(t){var e=0,n=0,o=0,i=0;return t.forEach(function(t){t.boundingBox||t.update(),e=Math.min(e,t.xmin),n=Math.min(n,t.ymin),o=Math.max(o,t.xmax),i=Math.max(i,t.ymax)}),{x:e,y:n,width:o,height:i,xmin:e,xmax:e+o,ymin:n,ymax:n+i}},n.prototype.ensureInBounds=function(){var t=-Math.min(0,this.xmin),e=-Math.min(0,this.ymin);(t||e)&&(this.boxes.forEach(function(n){return n.move(n.x+t,n.y+e)}),this._updateBoundingBox())},n.prototype.pack=function(t){var e=this;void 0===t&&(t={});var n=t.maxSolverIterations;void 0===n&&(n=this.maxSolverIterations);var o=t.debug;void 0===o&&(o=this.debug);var i=t.pushBehavior;void 0===i&&(i=this.pushBehavior),this.boxes=this.boxes.sort(function(t,e){return e.lastMove-t.lastMove}),this.boxes.forEach(function(t,e){t.frozen?t.move(t.frozenBoundingBox.x,t.frozenBoundingBox.y):t.update(),o&&(t.packingOrder=e,t.element.setAttribute("data-packing-order",e))});for(var r=0,a=this.boxes.filter(function(t){return e.boxes.some(t.collide)}),s=function(){var t=a.shift(),n=e.boxes.filter(t.collide);n&&n.length&&n.forEach(function(e){var n=t.delta(e),r="horizontal"===i||"vertical"!==i&&Math.abs(n[0])>=Math.abs(n[1]);o&&console.log({current:t.packingOrder,collide:e.packingOrder,delta:n,direction:r?"horizontal":"vertical"}),r&&n[0]<=0&&e.move(t.xmax,e.y),r&&n[0]>0&&e.move(t.xmin-e.width,e.y),!r&&n[1]<=0&&e.move(e.x,t.ymax),!r&&n[1]>0&&e.move(e.x,t.ymin-e.height),a.push(e)})};a.length&&++r<n;)s();this.update()};var o=function(n,o){var i=this;void 0===o&&(o={});var r=o.container;void 0===r&&(r=document.documentElement);var a=o.grid;void 0===a&&(a=[1,1]);var s=o.debug;if(void 0===s&&(s=!1),!n)throw new TypeError("Box constructor expects HTMLElement, "+typeof n+" given");this.grid=a,this.debug=s,this.element=n,this.element.style.position="absolute",this.container=r,this.lastMove=Date.now(),this.dragInstance=new t(n,{grid:a,containment:r}),this.dragInstance.on("dragStart",function(){i.isDragging=!0}),this.dragInstance.on("dragMove",function(){i.lastMove=Date.now()}),this.dragInstance.on("dragEnd",function(){i.isDragging=!1}),e(this)};function i(){}return o.prototype.destroy=function(){this.dragInstance.destroy()},o.prototype.collide=function(t){return this.collideOnXAxis(t)&&this.collideOnYAxis(t)},o.prototype.delta=function(t){return[this.center.x-t.center.x,this.center.y-t.center.y]},o.prototype.freeze=function(){this.frozen||(this.frozen=!0,this.frozenBoundingBox=this._computeBoundingBox(),this.debug&&this.element.classList.add("frozen"))},o.prototype.unfreeze=function(){this.frozen=!1,this.debug&&this.element.classList.remove("frozen")},o.prototype.collideOnYAxis=function(t){if(t)return t!==this&&this.xmax>t.xmin&&this.xmin<t.xmax},o.prototype.collideOnXAxis=function(t){if(t)return t!==this&&this.ymax>t.ymin&&this.ymin<t.ymax},o.prototype.move=function(t,e){this.isDragging||(this.dragInstance.setPosition(t,e),this.lastMove=Date.now(),this.update())},o.prototype.update=function(){var t=this;this.boundingBox=this._computeBoundingBox(),Object.keys(this.boundingBox).forEach(function(e){t[e]=t.boundingBox[e]})},o.prototype._computeBoundingBox=function(){var t=this.element.getBoundingClientRect(),e=t.width,n=t.height,o=this.dragInstance.position.x,i=this.dragInstance.position.y;return Object.freeze({x:o,y:i,width:e,height:n,xmin:o,ymin:i,xmax:o+e,ymax:i+n,center:{x:o+e/2,y:i+n/2}})},function(t){void 0===t&&(t={});var e=t.container;void 0===e&&(e=".pinp-container");var r=t.debug;void 0===r&&(r=!1);var a=t.grid;void 0===a&&(a=[50,50]);var s=t.maxSolverIterations;void 0===s&&(s=999);var d=t.noOOB;void 0===d&&(d=!0);var u=t.pushBehavior;void 0===u&&(u="both");var h=t.updateContainerHeight;void 0===h&&(h=!0);var c=t.updateContainerWidth;void 0===c&&(c=!0);var f=t.willUpdate;void 0===f&&(f=i);var p,v=t.didUpdate;void 0===v&&(v=i),p=e,e=("object"==typeof window.HTMLElement?p instanceof window.HTMLElement:p&&"object"==typeof p&&null!==p&&1===p.nodeType&&"string"==typeof p.nodeName)?e:document.querySelector(e);var g=new n([],{debug:r,maxSolverIterations:s,noOOB:d,pushBehavior:u});return{add:function(t){var n=new o(t,{container:e,debug:r,grid:a});return n.dragInstance.on("dragStart",g.freeze),n.dragInstance.on("dragMove",function(){window.requestAnimationFrame(function(){f(),n.unfreeze(),g.pack({debug:!1}),v()})}),n.dragInstance.on("dragEnd",function(){g.unfreeze(),x()}),g.boxes.push(n),n},update:x,get boxes(){return g.boxes},get width(){return g.xmax},get height(){return g.ymax}};function x(){window.requestAnimationFrame(function(){f(),g.pack(),c&&(e.style.width=g.xmax+"px"),h&&(e.style.height=g.ymax+"px"),v()})}}});
//# sourceMappingURL=pinp.umd.js.map
