import App from './App'
import HttpRequest from './common/httpRequest'
import HttpCache from './common/cache'
import queue from './common/queue'


Vue.config.productionTip = false
Vue.prototype.$Request = HttpRequest;
Vue.prototype.$queue = queue;
import share from './common/share.js'
Vue.prototype.$Sysconf = HttpRequest.config;
Vue.prototype.$SysCache = HttpCache;

// main.js，注意要在use方法之后执行
import uView from 'uview-ui'
Vue.use(uView)

Vue.mixin(share)

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif



// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif