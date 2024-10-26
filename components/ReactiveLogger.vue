<template>
	<div
		class="ReactiveLogger"
		@mousedown="onMouseDown"
		@mouseover="onMouseOver"
		@mouseleave="onMouseLeave"
		@click="onClick"
	>
		<pre v-html="logData"></pre>
		<div class="ReactiveLogger__items">
			<button
				v-for="(item, index) in items"
				:key="index"
				@click="$emit('click:item', index)"
				v-html="index"
			></button>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		current: {
			type: Number,
			default: 0,
		},
		items: {
			type: Array,
			default: () => ([]),
		},
	},
	emits: [
		'click:item',
	],
	data() {
		return {
			isDragging: false,
			offsetX: 0,
			offsetY: 0,

			devDiv: null,
		};
	},
	computed: {
		currentNode() {
			return this.items[this.current];
		},
		logData() {
			return {
				current: this.current,
				classes: this.currentNode?.classList,
			};
		},
	},
	methods: {
		onClick(event) {
			console.log(`[current = ${this.current}]:\n`, this.node);
		},
		createDiv() {
			const div = document.createElement('div');
			Object.assign(div.style, {
				position: 'absolute',
				top: '0',
				left: '0',
				width: '100%',
				height: '100%',
				background: 'rgb(0,255,42)',
				opacity: 0.1,
			});
			return div;
		},
		onMouseOver() {
			if (!this.currentNode.style.position) {
				Object.assign(this.currentNode.style, {
					position: 'relative',
				});
			}
			if (!this.devDiv) {
				this.devDiv = this.createDiv();
			}
			this.currentNode.appendChild(this.devDiv);
		},
		onMouseLeave() {
			this.devDiv?.remove();
		},
		onMouseDown(event) {
			this.isDragging = true;
			this.offsetX = event.clientX - this.$el.offsetLeft;
			this.offsetY = event.clientY - this.$el.offsetTop;
			document.addEventListener('mousemove', this.onMouseMove);
			document.addEventListener('mouseup', this.onMouseUp);
		},
		onMouseMove(event) {
			if (!this.isDragging) { return; }
			this.$el.style.left = `${event.clientX - this.offsetX}px`;
			this.$el.style.top = `${event.clientY - this.offsetY}px`;
		},
		onMouseUp() {
			this.isDragging = false;
			document.removeEventListener('mousemove', this.onMouseMove);
			document.removeEventListener('mouseup', this.onMouseUp);
		},

	},
};
</script>

<style lang="scss">
.ReactiveLogger {
	position: absolute;
	z-index: 89132;
	top: 40px;
	left: 40px;
	background: rgb(255 255 255 / 30%);
	padding: 20px;
	border-radius: 10px;

	backdrop-filter: blur(10px);
	pre {
		pointer-events: none;
	}
	&:hover {
		background: rgb(255 255 255 / 10%);
	}
	&__items {
		display: flex;
		gap: 4px;
		button {
			cursor: pointer;
			width: 20px;
			height: 20px;
			display: flex;
			place-content: center;
		}
	}
}
</style>
