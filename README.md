# FormInput

Компонент выступает в роли дочернего для
компонента [FormWrapper]((https://gitlab.art3d.ru/test-dev/npm-modules/-/tree/main/FormWrapper))
и работает
только в связке с ним.

Позволяет декларативно описывать большие формы с любым дизайном, без
необходимости
лезть в код компонента. Содержит в себе только обнуляющие стили. Мимикрирует под
любые необходимые поля:

* input,
* textarea,
* кнопка отправки,
* согласие на обработку персональных данных.

## Props

___
`name` `type: String, default: ''`

Имя поля при отправке данных через /api/feedback. Должно
быть уникальным для каждого поля. Бесполезно при **elementType = send/agree**.
___
`elementType` `type: String, default: 'input'`

Тип элемента:

* `input` `type`- классический input для номера телефона, почты и тп.

* `textarea` - textarea для сообщений
* `agree` - поле согласия с обработкой персональных данных. Такой тип
  FromInput'а имеет
  в себе **\<slot>** для текста и **\<slot name="before">** для чекбокса.
* `send` - поле для кнопки. Такой тип FormInput'а имеет в себе **\<slot>** для
  кнопки. Стилизовать
  активное и неактивное состояния, можно ссылаясь на класс **.active**
  родительского
  компонента [FormWrapper]((https://gitlab.art3d.ru/test-dev/npm-modules/-/tree/main/FormWrapper))

___
`inputType` `type: String, default: 'text'`  
Стандартный для html тип поля type="...". Бесполезно при **elementType =
send/agree**.
___
`line` `type: Boolean, default: false`  
Нижний бордер для полей input
___
`activateAgree` `type: Boolean, default: false`  
Значение поля agree при инициализации. Работает только с **elementType = agree
**.
___
`mask` `type: String, default: ''`  
Маска для input'а. Принимает значения вида +7 (###) ###-##-##.
Можно использовать разные токены:

* #: /\d/
* X: /[0-9a-zA-Z]/
* S: /[a-zA-Z]/
* A: /[a-zA-Z]/
* a: /[a-zA-Z]/

Так же в **mask** можно передать строковые значения, которые соответствуют
готовым шаблонам:

* phone: +7 (###) ###-##-##
* phone8: 8 (###) ###-##-##

___
`placeholder` `type: String, default: ''`  
Placeholder для input'а. Бесполезно при **elementType = send/agree**.
___
`initialValue` `type: String, default: ''`  
Значение, которое автоматически подставляется в input при фокусе. Бесполезно при
**elementType = send/agree**.
___
`required` `type: Boolean, default: false`
Атрибут required. Запрещает отправку форму, если FormInput не заполнен.
Бесполезно при **elementType = send/agree**.
___
`debounce` `type: [String, Number], default: 300`  
Значение задержки debounce функции в миллисекундах. Позволяет не вызывать
внутренние методы раньше, чем через *300мс* после окончания ввода.
Существует
только для оптимизации.

