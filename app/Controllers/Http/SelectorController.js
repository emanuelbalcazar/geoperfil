'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Selector = use('App/Models/Selector');


/**
 * Resourceful controller for interacting with selectors
 */
class SelectorController {
  /**
   * Show a list of all selectors.
   * GET selectors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

      let params = request.all();
      let selectors = await Selector.query().paginate(params.page, params.perPage);
      response.json(selectors);
  }

  /**
   * Render a form to be used for creating a new selector.
   * GET selectors/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {

  }

  /**
   * Create/save a new selector.
   * POST selectors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {

      let selector = request.post();
      let record = await Selector.create(selector);
      response.json(record);

  }

  /**
   * Display a single selector.
   * GET selectors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
      let selector = await Selector.query().where('id', params.id).first();
      response.json(selector);
  }

  /**
   * Render a form to update an existing selector.
   * GET selectors/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
  }

  /**
   * Update selector details.
   * PUT or PATCH selectors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a selector with id.
   * DELETE selectors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SelectorController
