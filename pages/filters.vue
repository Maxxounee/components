<template>
	<div class="filters">
		<svg
			class="svg__background"
			width="100%"
			height="100%"
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
		>
			<filter
				id="noiseFilter"
				x="-75%"
				y="-100%"
				width="250%"
				height="300%"
			>
				<feTurbulence
					type="fractalNoise"
					baseFrequency="17"
					numOctaves="10"
					seed="10"
					stitchTiles="stitch"
				/>
			</filter>

			<rect
				width="100%"
				height="100%"
				filter="url(#noiseFilter)"
			/>
		</svg>
		<div class="svg__wrapper">
			<svg
				id="svg-mask"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g>
					<filter id="displacement-gradient">
						<feTurbulence
							type="turbulence"
							baseFrequency="10"
							stitchTiles="stitch"
							seed="8"
							numOctaves="1"
							result="turbulence"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="displacementMap"
							scale="1070"
						/>
						<feComposite
							in="blend"
							in2="SourceGraphic"
							operator="in"
							result="composite1"
						/>
					</filter>
					<radialGradient id="gradient--noise">
						<stop
							offset="10%"
							stop-color="rgb(229, 100, 246)"
							stop-opacity="0.9"
						/>
						<stop
							offset="85%"
							stop-color="rgb(238, 248, 255)"
							stop-opacity="1"
						/>
					</radialGradient>
					<g filter="url(#displacement-gradient)">
						<circle
							class="circle--gradient"
							cx="38%"
							cy="75%"
							r="25%"
							fill="url('#gradient--noise')"
						/>
					</g>

					<!--Клякса слева внизу -->
					<g>
						<filter id="displacement--flower">
							<feTurbulence
								type="turbulence"
								baseFrequency=".01"
								numOctaves="2"
							/>
							<feDisplacementMap
								in="SourceGraphic"
								in2="displacementMap"
								scale="130"
							/>
						</filter>
						<radialGradient id="myGradient2">
							<stop
								offset="10%"
								stop-color="rgb(229, 180, 216)"
							/>
							<stop
								offset="85%"
								stop-color="rgb(238, 248, 255)"
							/>
						</radialGradient>
						<g filter="url(#displacement--flower)">
							<circle
								class="circle--gradient"
								cx="25%"
								cy="65%"
								r="25%"
								fill="url('#myGradient2')"
							/>
						</g>
					</g>
					<!-- Мрамор -->
					<g>
						<filter id="filter--1">
							<feTurbulence
								type="fractalNoise"
								baseFrequency=".11"
								numOctaves="10000"
							/>
							<feComponentTransfer>
								<feFuncA
									type="discrete"
									tableValues="0 1 1 0 0 1 1 0 0 .01 0 0 1 1 0 0 1 1 0"
								/>
							</feComponentTransfer>
							<feColorMatrix
								values="
								-10 0 0 -80 1
								0 0 0 -99 .88
								0 0 0 -83 .77
								0 0 0 0 1"
							/>
							<feDisplacementMap
								xChannelSelector="G"
								yChannelSelector="G"
								scale="40"
								in="turbulence"
							/>
							<feComposite
								in="blend"
								in2="SourceAlpha"
								operator="in"
								result="composite1"
							/>
						</filter>
						<filter
							id="inset-shadow"
							width="140%"
							height="140%"
							filterUnits="objectBoundingBox"
							primitiveUnits="userSpaceOnUse"
						>
							<feComponentTransfer in="SourceAlpha">
								<feFuncA
									type="table"
									tableValues="1 0"
								/>
							</feComponentTransfer>
							<feGaussianBlur stdDeviation="5" />
							<feOffset
								dx="7"
								dy="2"
								result="offsetblur"
							/>
							<feFlood
								flood-color="rgb(0, 0, 0)"
								result="color"
							/>
							<feComposite
								in2="offsetblur"
								operator="in"
							/>
							<feComposite
								in2="SourceAlpha"
								operator="in"
							/>
							<feMerge>
								<feMergeNode in="SourceGraphic" />
								<feMergeNode />
							</feMerge>
						</filter>

						<circle
							class="circle--gradient--3"
							cx="65%"
							cy="40%"
							r="20%"
							filter="url(#filter--1) url(#inset-shadow)"
						/>
					</g>

					<!-- Желтая окантовка -->
					<g>
						<radialGradient
							id="myGradient3"
							r="100%"
						>
							<stop
								offset="10%"
								stop-color="hsl(357, 10%, 21%)"
							/>
							<stop
								offset="20%"
								stop-color="hsl(357, 10%, 31%)"
							/>
							<stop
								offset="42%"
								stop-color="hsl(11, 15%, 47%)"
							/>
							<stop
								offset="43%"
								stop-color="hsl(22, 58%, 54%)"
							/>
							<stop
								offset="45%"
								stop-color="hsl(22, 67%, 69%)"
							/>
							<stop
								offset="48%"
								stop-color="hsl(32, 84%, 72%)"
							/>
							<stop
								offset="50%"
								stop-color="hsl(32, 84%, 72%)"
							/>
							<stop
								offset="51%"
								stop-color="hsl(43, 11%, 50%) 71%)"
							/>
						</radialGradient>
						<circle
							class="circle--gradient"
							cx="85%"
							cy="25%"
							r="20%"
							fill="url('#myGradient3')"
						/>
					</g>

					<!-- Золотой крутой -->
					<g>
						<filter
							id="filter--sun"
							width="140%"
							height="140%"
							filterUnits="objectBoundingBox"
							primitiveUnits="userSpaceOnUse"
						>
							<feTurbulence
								type="fractalNoise"
								baseFrequency="0.001 0.001"
								numOctaves="4"
								seed="1"
								stitchTiles="stitch"
								result="turbulence"
							/>
							<feDiffuseLighting
								surfaceScale="4"
								diffuseConstant="90"
								lighting-color="rgb(206, 80, 2)"
								in="turbulence"
								in2="SourceGraphic"
								result="diffuseLighting"
							>
								<feDistantLight
									azimuth="170"
									elevation="2.5"
								/>
							</feDiffuseLighting>
							<feComposite
								in="blend"
								in2="SourceAlpha"
								operator="in"
								result="composite1"
							/>
						</filter>
						<image
							src="/assets/images/00.jpeg"
							alt=""
						/>
						<!--<circle-->
						<!--	cx="15%"-->
						<!--	cy="15%"-->
						<!--	r="25%"-->
						<!--	filter="url(#filter&#45;&#45;sun)"-->
						<!--/>-->
					</g>

					<!-- Фиолетовый справа внизу -->
					<g>
						<filter id="displacement--circle">
							<feDisplacementMap
								in="SourceGraphic"
								in2="displacementMap"
								scale="15"
								result="displacement--result"
							/>
							<feTurbulence
								type="fractalNoise"
								baseFrequency="17"
								numOctaves="10"
								seed="10"
								stitchTiles="stitch"
							/>
							<feComposite
								in="displacement--result"
								operator="in"
								result="composite10"
							/>
							<feComponentTransfer>
								<feFuncA
									type="discrete"
									tableValues="0 0 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0"
								/>
							</feComponentTransfer>
						</filter>

						<radialGradient
							id="gradient--displacement"
							r="48%"
						>
							<stop
								offset="15%"
								stop-color="#dbbdff"
							/>
							<stop
								offset="16%"
								stop-color="#b9a5fe"
							/>
							<stop
								offset="18%"
								stop-color="#9276c6"
							/>
							<stop
								offset="75%"
								stop-color="#dbbdff"
							/>
						</radialGradient>

						<circle
							class="circle--gradient"
							cx="75%"
							cy="75%"
							r="15%"
							filter="url(#displacement--circle)"
							fill="url(#gradient--displacement)"
						/>
					</g>
				</g>
				<!--<g>-->
				<!--	<radialGradient-->
				<!--		id="myGradient"-->
				<!--		r="100%"-->
				<!--	>-->
				<!--		<stop-->
				<!--			offset="35%"-->
				<!--			stop-color="black"-->
				<!--		/>-->
				<!--		<stop-->
				<!--			offset="75%"-->
				<!--			stop-color="red"-->
				<!--		/>-->
				<!--	</radialGradient>-->
				<!--	<circle-->
				<!--		class="circle&#45;&#45;gradient"-->
				<!--		cx="50%"-->
				<!--		cy="50%"-->
				<!--		r="75%"-->
				<!--		fill="url('#myGradient')"-->
				<!--	/>-->
				<!--</g>-->
			</svg>
		</div>

		<div class="controls">
			<button @click="value++">+</button>
			<button @click="value--">-</button>
			<p v-html="value"></p>
			<input
				v-model="value"
				type="range"
			/>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			value: 40,
		};
	},
};
</script>

<style
	lang="scss"
	scoped
>
/* stylelint-disable */
.filters {
	#svg-mask,
	.svg__background {
		position: absolute;
		inset: 0;
	}

	body {
		overflow: hidden;
		background-color: black;
	}

	svg {
		width: 100%;
		height: 100%;
	}

	.svg__background {
		z-index: 6;
		opacity: 0.5;
	}

	#svg__sun {
		filter: url("#filter--sun");
	}

	circle {
		stroke-dasharray: 2000;
		stroke-dashoffset: 0;
		stroke-width: 0.4em;
	}

	.controls {
		position: absolute;
		z-index: 10;
		top: 30px;
		left: 50%;
	}
}
</style>
