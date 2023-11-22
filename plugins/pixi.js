import Vue from 'vue';
import * as PIXI from 'pixi.js';

const pixiPrototype = {
	install(Vue) {
		Vue.prototype.PIXI = PIXI;
	},
};
Vue.use(pixiPrototype);
// export default PIXI;
