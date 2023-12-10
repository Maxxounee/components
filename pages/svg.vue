<template>
	<div class="svg">
		<svg>
			<path
				d="M1 35.4991 C1 35.4991 103.5 94.0003 206.5 92.5001 C309.5 91 298.5 -28.4027 431 8.29835 C563.5 44.9994 578 35.4991 578 35.4991"
				stroke="black"
			/>

			<path
				d="M0.5 1.20607 C0.5 1.20607 101.5 1.20598 207.5 1.20606 C313.5 1.20613 295 1.20629 432.5 1.20618 C570 1.20606 577.5 1.20616 577.5 1.20616"
				stroke="black"
			/>
		</svg>
		<svg>
			<path
				:d="res"
			/>
		</svg>
	</div>
</template>

<script>
/* eslint-disable */
export default {
	data() {
		return {
			key: 1,
			d1: [],
			d2: [],
			res: '',
		};
	},
	mounted() {
		const items = this.$el.querySelectorAll('path');
		this.d1 = this.parse(items[0].getAttribute('d'));
		this.res = this.parse(items[0].getAttribute('d'));
		this.d2 = this.parse(items[1].getAttribute('d'));
		console.log(this.animate());
	},
	methods: {
		animate() {
			// const array = [...this.d1];
			// setInterval(() => {
			// 	array.forEach((el) => {
			// 		console.log(el);
			// 	});
			// }, 300);
		},
		parse(d) {
			const reg = /CMcm/;
			const proxy = {};
			const res = [];
			let flag = false;
			for (let i = 0; i < d.length; i++) {
				if (d[i].test(reg)) {
				}
				console.log(d[i]);
			}
			return d.split(' ');
		},
	},
};
</script>

<style
	lang="scss"
	scoped
>
.svg {
	/* stylelint-disable */
	path {
		//width: ;
	}
}
</style>
