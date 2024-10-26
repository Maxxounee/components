/** !important Логику плагина не перелопачивать. Все должно быть именно так плохо из-за JETBRAINS */
import Vue from 'vue';

import ViewportProgressor from '~ViewportProgressor/components/ViewportProgressor.vue';

console.log('register');
Vue.component('ViewportProgressor', ViewportProgressor);
