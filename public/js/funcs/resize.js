"use strict";
import { _front } from './front.js'
import { _board } from './board.js'
let _resize = {
	cur: new Number(0),
	sizes: ['middle', 'full', 'small'],
	class: 'middle',
	element: undefined,
	resize: function () {
		this.cur++
		if (this.cur >= this.sizes.length) this.cur = 0;
		console.log(this.sizes[this.cur])
	},
	init: function (datas={top:'10px', left:undefined, bottom:undefined, right:'10px'}) {
		let {top,left,bottom,right} = datas
		this.element = _front.createDiv({
			tag: 'div',
			attributes: { className: 'resize-map', textContent: `🖥️` },
			style: { cursor: 'pointer', position: 'absolute', zIndex: '1000' }
		})
		if(top) this.element.style.top = top
		if(left) this.element.style.left = left
		if(right) this.element.style.right = right
		if(bottom) this.element.style.bottom = bottom
		this.element.addEventListener('click', () => {
			this.resize()
		})
		document.body.appendChild(this.element)
	}
}
export { _resize }
