import Vue from 'vue';
import * as THREE from 'three';

const threePrototype = {
	install(Vue) {
		Vue.prototype.$T = THREE;
	},
};
Vue.use(threePrototype);
// export default PIXI;
