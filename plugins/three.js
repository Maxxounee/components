import Vue from 'vue';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const threePrototype = {
	install(Vue) {
		Vue.prototype.$t = THREE;
		Vue.prototype.$GLTFLoader = GLTFLoader;
		Vue.prototype.$OrbitControls = OrbitControls;
	},
};
Vue.use(threePrototype);
// export default PIXI;
