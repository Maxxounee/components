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

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
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
		// https://go.nuxtjs.dev/axios
		// '@nuxtjs/axios',
		// '@nuxtjs/stylelint-module',
	],
	// stylelint: {
	// 	files: [
	// 		'assets/**/*.{s?(a|c)ss}',
	// 		'm/assets/**/*.{s?(a|c)ss}',
	// 		'{assets, components, layouts, m, mixins, pages}/**/*.vue',
	// 	],
	// },

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {
		// Workaround to avoid enforcing hard-coded localhost:3000:
		// https://github.com/nuxt-community/axios-module/issues/308
		baseURL: '/',
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		// plugins: [
		// 	new webpack.ProvidePlugin({
		// 		// P: 'PIXI',
		// 	}),
		// ],
		// extend(config) {
		// 	config.module.rules.push({
		// 		test: /\.cjs$/,
		// 		include: /node_modules/,
		// 		type: 'javascript/auto',
		// 	});
		// },
		// ignore: ['node_modules', 'src/spline.runtime.min.js'],
	},
};
