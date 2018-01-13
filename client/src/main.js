import Vue from 'vue';

// external modules
import Buefy from 'buefy';

Vue.use(Buefy);

// filters
import './filters';

// app modules
import App from './components/App.vue';
import router from './router';
import store from './store';

// styles
import './assets/styles/main.scss';

// config
Vue.config.productionTip = false;

// create app
new Vue({
	el: '#app',
	store,
	router,
	template: '<App/>',
	components: {App},
});
