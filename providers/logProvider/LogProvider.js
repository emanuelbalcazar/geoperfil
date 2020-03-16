'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class LogProvider extends ServiceProvider {

    /**
     * Register namespaces to the IoC container
     *
     * @method register
     *
     * @return {void}
     */
    register() {
        this.app.singleton('Logger', () => {
            return new (require('./LogService'));
        });
    }

    /**
     * Attach context getter when all providers have
     * been registered
     *
     * @method boot
     *
     * @return {void}
     */
    boot() {
        //
    }
}

module.exports = LogProvider
