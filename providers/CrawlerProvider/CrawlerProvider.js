'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class CrawlerProvider extends ServiceProvider {
    /**
     * Register namespaces to the IoC container
     *
     * @method register
     *
     * @return {void}
     */
    register() {
        this.app.singleton('CrawlerFactory', () => {
            return new (require('./Factory'));
        })
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

    }
}

module.exports = CrawlerProvider
