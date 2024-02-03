import webpack from 'webpack';

export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'components',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
		],
	},
	css: [],
	plugins: [
		'@/plugins/directives',
		'@/plugins/log',
		{ src: '@/plugins/pixi', ssr: false },
		{ src: '@/plugins/three', ssr: false },
		{ src: '@/plugins/distort', ssr: false },
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/stylelint
		'@nuxtjs/stylelint-module',
	],
	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// 'webpack-glsl-loader',
		// {
		// 	test: /\.(glsl|vs|fs|vert|frag)$/,
		// 	use: ['raw-loader', 'glslify-loader'],
		// },
		// 'webpack-glsl-loader',
	],
	build: {
		extend(config) {
			config.module.rules.push({
				test: /\.(glsl|vs|fs|vert|frag)$/,
				loader: 'webpack-glsl-loader',
			});
		},
	},
	module: {
		// rules: [
		// 	{
		// 		test: /\.(glsl|vs|fs|vert|frag)$/,
		// 		loader: 'webpack-glsl-loader',
		// 	},
		// ],
	},
};
