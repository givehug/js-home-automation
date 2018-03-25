/**
 * App state only stores some application meta data.
 * Single action is used to initialize application,
 * which means fetch all necessary data and initialize other components.
 */

import * as constants from './../constants';
import {api, endpoints} from '../../api';

const state = {
	deviceTypes: ['espruino', 'raspberry pi 3'],
	dataLoaded: false,
};

const mutations = {
	/**
	 * Set app.dataLoaded to true
	 */
	[constants.mutations.APP_DATA_LOADED](state) {
		state.dataLoaded = true;
	},
};

const actions = {
	/**
	 * If user auth token is in local storage, get user data by it,
	 * fetch all other necessary data and init components available for signe in user.
	 */
	[constants.actions.APP_INIT]: async(context) => {
		const token = localStorage.getItem('token');

		if (!token) return;

		context.commit(constants.mutations.USER_TOKEN_SET, token);

		try {
			// try fetching user data with token from localStorage
			const {data} = await api.request(endpoints.app, 'GET');

			context.commit(constants.mutations.USER_DATA_SET, data.user);
			context.commit(constants.mutations.USERS_MAP_UPDATE, data.users);
			context.commit(constants.mutations.DEVICES_MAP_UPDATE, data.devices);
			context.commit(constants.mutations.SETTINGS_UPDATE, data.settings);
			context.commit(constants.mutations.APP_DATA_LOADED);
			context.commit(constants.mutations.ROBO_INIT);
			context.commit(constants.mutations.WS_CONNECT);
		} catch (error) {
			// token might be expired
			context.dispatch(constants.actions.USER_LOGOUT);
		}
	},
};

export default {
	state,
	actions,
	mutations,
};
