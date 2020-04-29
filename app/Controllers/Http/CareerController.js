'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Career = use('App/Models/Career');

/**
 * Resourceful controller for interacting with careers
 */
class CareerController {

    /**
     * Show a list of all careers.
     * GET careers
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async index({ request, response, view }) {
        let params = request.all();
        params.columnName = params.columnName || 'name';
        params.columnValue = params.columnValue || '';

        if (params.page == "all")
            return await Career.all();

        let careers = await Career.query().where(params.columnName, 'ILIKE', `%${params.columnValue}%`).paginate(params.page, params.perPage);
        return response.json(careers);
    }

    /**
     * Render a form to be used for creating a new career.
     * GET careers/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new career.
     * POST careers
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        let career = request.post();

        let count = await Career.query().where({ name: career.name }).getCount();

        if (count > 0)
            return response.conflict({ code: 409, message: 'La carrera ya existe' });

        let instance = await Career.create(career);
        return response.json(instance);
    }

    /**
     * Display a single career.
     * GET careers/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        let career = await Career.query().where('id', params.id).first();
        return response.json(career);
    }

    /**
     * Render a form to update an existing career.
     * GET careers/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update career details.
     * PUT or PATCH careers/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        let updated = await Career.query().where('id', params.id).update(request.all());
        return response.json(updated);
    }

    /**
     * Delete a career with id.
     * DELETE careers/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
    }
}

module.exports = CareerController
