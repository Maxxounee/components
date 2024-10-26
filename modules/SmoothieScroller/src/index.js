import { resolve } from 'path';

const NAME = 'SmoothieScroller';
const REGISTER = `art3d/${ NAME }.register.js`;
const ALIAS = `~${ NAME }`;
const transpileName = `@art3d/${ NAME }`;

export default function() {
	const { addPlugin, nuxt } = this;

	const runtimeDir = resolve(__dirname, 'runtime');

	nuxt.options.alias[ALIAS] = runtimeDir;

	nuxt.options.build.transpile.push(transpileName);
	nuxt.options.build.transpile.push('lenis');

	addPlugin({
		fileName: REGISTER,
		src: resolve(runtimeDir, 'registerComponent.js'),
	});
}

