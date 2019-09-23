'use strict'

const { ServiceProvider } = require('@adonisjs/fold')

class ExtractorProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register () {
    //
    this.app.singleton('ExtractorFactory', () => {
        //const Config = this.app.use('Adonis/Src/Config')
        return new (require('./ExtractorFactory'))
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
  boot () {
    //
  }
}

module.exports = ExtractorProvider
