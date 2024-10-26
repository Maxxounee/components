# **Обработка ивентов**

## Props

___
`cycle` `type: Boolean` `default: false`
Возможность циклично проходить от min до max

___
`forcedCurrent` `type: Number` `default: null`
Проп для управления текущим состоянием снаружи

___
`start` `type: Number` `default: null`
Проп для установки состояния при маунте

___
`throttle` `type: Number` `default: 1000`
Throttle ивентов в милисекундах

___
`throttleConfig` `type: Object` `default: () => ({})`
Настройка throttle для отдельных ивентов

```vue

<EventOperator
    :throttle-config="{
        wheel: 400,
        keypress: 1000,
    }"
/>
```

___
`enabled` `type: Boolean` `default: true`
Блокировка работы контроллера

___
`min` `type: Number` `default: 0`
Минимальное значение состояния контроллера

___
`max` `type: Number` `default: null`
Максимальное значение состояния контроллера

___
`wheelDelta` `type: Number` `default: 1`
Минимальное значение дельты для срабатывания ивентов прокрутки колеса

___
`mousemoveDelta` `type: Number` `default: 10`
Минимальное значение дельты для срабатывания ивентов свайпа мыши

___
`swipeDelta` `type: Number` `default: 60`
Минимальное значение дельты для срабатывания ивентов свайпа

___
`mousemoveEnabled` `type: Boolean` `default: true`
Блокировка работы кнопок мыши

___
`wheelEnabled` `type: Boolean` `default: true`
Блокировка работы колеса мыши

___
`touchEnabled` `type: Boolean` `default: true`
Блокировка работы тача

___
`keydownEnabled` `type: Boolean` `default: true`
Блокировка работы клавиш переключения страниц

## Emits

___
`throttle`
Эмит при срабатывании throttle.

___
`arrowPress`
Эмит при срабатывании ивента нажатия стрелки клавиатуры или кликера.

```js
return { direction: 1 }
```

___
`change`
Эмит при изменении состояния

```js
return { direction: 1, current: 12 }
```

___
`corner`
Эмит при достижении границ min или max

```js
return corner[Number]
```

___
`wheel`
Эмит при срабатывании ивента колеса мыши

```js
return { direction: 1 }
```

___
`mouseDown`
Эмит при нажатии курсора

```js
return { x: 1000, y: 200 }
```

___
`mouseMoving`
Эмит при движении зажатого курсора

```js
return { deltaX: 1000, deltaY: 200 }
```

___
`mouseSwipe`
Эмит при окончании движения зажатого курсора. HorizontalDirection и VerticalDirection имеют состояние отличное от нуля,
если "свайп" бы горизонтальным или вертикальным соответственно.

```js
return { deltaX: 1000, deltaY: 200, horizontalDirection: 1, verticalDirection: 0 }
```

___
`touchStart`
Эмит при таче

```js
return { x: 1000, y: 200 }
```

___
`touchMoving`
Эмит при движении пальца

```js
return undefined;
```

___
`swipe`
Эмит при окончании движения тача. HorizontalDirection и VerticalDirection имеют состояние отличное от нуля, если свайп
бы горизонтальным или вертикальным соответственно.

```js
return { deltaX: 1000, deltaY: 200, horizontalDirection: 1, verticalDirection: 0 }
```

___
`horizontalSwipe`
Эмит при окончании движения тача. Срабатывает при горизонтальном свайпе.

```js
return 1;
```

___
`verticalSwipe`
Эмит при окончании движения тача. Срабатывает при вертикальном свайпе.

```js
return -1;
```

## Version log

| Version | Type  | Description                                       |
|---------|-------|---------------------------------------------------|
| 1.1.4   | fix   | Изменены дефолтные значения throttle и wheelDelta |
| 1.1.2   | fix   | Добавлены пропы, блокирующие различные ивенты     |
| 1.1.1   | fix   | bugfix                                            |
| 1.1.0   | minor | Добавлена обработка событий touch                 |
