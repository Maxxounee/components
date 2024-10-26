import { resolve } from 'path';

const NAME = 'ViewportProgressor';
const REGISTER = `art3d/${ NAME }.register.js`;
const ALIAS = `~${ NAME }`;

export default function() {
	const { addPlugin, nuxt } = this;

	const runtimeDir = resolve(__dirname, 'runtime');

	nuxt.options.alias['~ViewportProgressor'] = runtimeDir;

	addPlugin({
		fileName: REGISTER,
		src: resolve(runtimeDir, 'registerComponent.js'),
	});
}

