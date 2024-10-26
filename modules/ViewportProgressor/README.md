# SmoothieScroller

Отслеживание прогресса появления элемента во вьюпорте. Основан
на [Gsap.ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/),
вдохновлен [Scroll driven animation API](https://scroll-driven-animations.style/);
___

## Install

```
npm i @art3d/ViewportProgressor
```

`nuxt.config.js:`

```js
modules: [
	'@art3d/ViewportProgressor',
]
```

___

## Description

`!important` В угоду оптимизации, компонент не считает ни один из вариантов прогресса, пока его об этом хорошенько не
попросить.
___

## Props

`calcIn` `calcOut` `calcFull` `calcInset` имеют дефолтные значения (defaults). В редких случаях можно переопределить из
значения, но для кастомных настроек лучше использовать `calcCustom

| name         | type              | default     | defaults                                                | description                                                                                                                           |
|--------------|-------------------|-------------|---------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|
| `calcIn`     | [Boolean, Object] | `false`     | `start: () => 'top bottom', end: () => 'top top'`       | Отслеживать прогресс появления во вьюпорте                                                                                            |
| `calcOut`    | [Boolean, Object] | `false`     | `start: () => 'bottom bottom', end: () => 'bottom top'` | Отслеживать прогресс выхода из вьюпорта                                                                                               |
| `calcFull`   | [Boolean, Object] | `false`     | `start: () => 'top bottom', end: () => 'bottom top'`    | Отслеживать полный прогресс существования во вьюпорте                                                                                 |
| `calcInset`  | [Boolean, Object] | `false`     | `start: () => 'top top', end: () => 'bottom bottom'`    | Отслеживать полный прогресс существования во вьюпорте, начиная с полного появления во вьюпорте, заканчивая началом выхода из вьюпорта |
| `calcCustom` | Object            | `undefined` | `-`                                                     | Создание собственного scrollTrigger. Использовать синтаксис `start` и `end` Gsap ScrollTrigger                                        |

___

## Emits

| name              | args                               | description                                |
|-------------------|------------------------------------|--------------------------------------------|
| `progress`        | `{ in, out, full, inset, custom }` | Событие при изменении любого из прогрессов |
| `progress:in`     | `0 <= progress <= 1`               | Событие при изменении progress.in          |
| `progress:out`    | `0 <= progress <= 1`               | Событие при изменении progress.out         |
| `progress:full`   | `0 <= progress <= 1`               | Событие при изменении progress.full        |
| `progress:inset`  | `0 <= progress <= 1`               | Событие при изменении progress.inset       |
| `progress:custom` | `0 <= progress <= 1`               | Событие при изменении progress.custom      |

___

## Slots

| name      | binds                                                                             | description                    |
|-----------|-----------------------------------------------------------------------------------|--------------------------------| 
| `default` | { progressIn, progressOut, progressFull, progressCustom, ProgressInset, progress} | Все данные о текущем прогрессе |

___

## Usage

```vue

<template>
	<div class="index">
		<ViewportProgressor
			class="progress"
			calc-in
			calc-out
			calc-full
			:calc-custom="{ start: () => 'top bottom', end: () => 'bottom top' }"
			v-slot="{ progress, progressFull }"
			@progress:in="dataValue = $event"
		>
			<div
				class="progress__inner"
				:style="{
					'--progress-in': progress.in,
					'--progress-out': progress.out,
					'--progress-full': progressFull,
					'--progress-custom': progress.custom,
					'--progress-from-data': dataValue,
				}"
			>
				<div class="block"></div>
				<div class="block"></div>
				<div class="block"></div>
				<div class="block"></div>
			</div>
		</ViewportProgressor>
	</div>
</template>
<script>
export default {
	data() {
		return {
			dataValue: 0,
		}
	}
}
</script>
```

## Version.log()
