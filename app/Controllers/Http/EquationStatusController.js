'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const EquationStatus = use('App/Models/EquationStatus');


/**
 * Resourceful controller for interacting with equationstatuses
 */
class EquationStatusController {
    /**
     * Show a list of all equationstatuses.
     * GET equationstatuses
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        let params = request.all();
        let equations = await EquationStatus.query().with('query').with('site').paginate(params.page, params.perPage);

        return response.json(equations);
    }

    /**
     * Render a form to be used for creating a new equationstatus.
     * GET equationstatuses/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {

    }

    /**
     * Create/save a new equationstatus.
     * POST equationstatuses
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        let equation = request.post();
        let count = await EquationStatus.query().where({ equation_id: equation.equation_id, site_id: equation.site_id }).getCount();

        if (count > 0) {
            response.conflict({ code: 409, message: 'La ecuación ya existe' });
            return;
        }

        let record = await EquationStatus.create(equation);
        return response.json(record);
    }

    /**
     * Display a single equationstatus.
     * GET equationstatuses/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        let equation = await EquationStatus.query().with('query').with('site').where('id', params.id).first();
        return response.json(equation);
    }

    /**
     * Render a form to update an existing equationstatus.
     * GET equationstatuses/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update equationstatus details.
     * PUT or PATCH equationstatuses/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        let updated = await EquationStatus.query().where('id', params.id).update(request.all());
        return updated;
    }

    /**
     * Delete a equationstatus with id.
     * DELETE equationstatuses/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
    }
}

module.exports = EquationStatusController
