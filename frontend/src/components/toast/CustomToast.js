import Toasted from 'vue-toasted'
import Vue from 'vue'

const toastOptions = {
    theme: 'bubble',
    position: 'bottom-right',
    iconPack: 'fontawesome',
    duration: 4000,
    keepOnHover: false
}

Vue.use(Toasted, toastOptions);

export default {
    methods: {
        showLog(msg, action = []) {
            toastOptions.action = action;
            Vue.toasted.show(msg, toastOptions);
        },
        logError(msg, action = []) {
            toastOptions.action = action;
            Vue.toasted.error(msg, toastOptions);
        },
        logSuccess(msg, action = []) {
            toastOptions.action = action;
            Vue.toasted.success(msg, toastOptions);
        },
        logInfo(msg, action = []) {
            toastOptions.action = action;
            Vue.toasted.info(msg, toastOptions);
        }
    },
}
