export default {
	server: {
		port: '6969',
		host: '0.0.0.0',
	},

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
	gsap: {
		extraPlugins: {
			scrollTrigger: true,
		},
	},
	plugins: [
		'@/plugins/directives',
		'@/plugins/log',
		{ src: '@/plugins/pixi', ssr: false },
		{ src: '@/plugins/three', ssr: false },
		{ src: '@/plugins/distort', ssr: false },
	],
	components: true,
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		// '@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/stylelint
		// '@nuxtjs/stylelint-module',
		'nuxt-gsap-module',
	],
	build: {
		extend(config) {
			config.module.rules.push({
				test: /\.(glsl|vs|fs|vert|frag)$/,
				loader: 'webpack-glsl-loader',
			});
		},
	},
	modules: [
		'@/modules/SmoothieScroller',
		'@/modules/ViewportProgressor',
	],
};
