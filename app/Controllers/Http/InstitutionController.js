'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Institution = use('App/Models/Institution');

/**
 * Resourceful controller for interacting with institutions
 */
class InstitutionController {

    /**
     * Show a list of all institutions.
     * GET institutions
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
            return await Institution.all();

        let institutions = await Institution.query().with('campuses').where(params.columnName, 'ILIKE', `%${params.columnValue}%`).paginate(params.page, params.perPage);

        return response.json(institutions);
    }

    /**
     * Render a form to be used for creating a new institution.
     * GET institutions/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new institution.
     * POST institutions
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        let institution = request.all();

        let count = await Institution.query().where({ name: institution.name }).getCount();

        if (count > 0)
            return response.conflict({ code: 409, message: 'La institucion ya existe' });

        let institutionInstance = await Institution.create(institution);

        return response.json(institutionInstance);
    }

    /**
     * Display a single institution.
     * GET institutions/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        let institution = await Institution.query().with('campuses').where('id', params.id).first();
        return response.json(institution);
    }

    /**
     * Render a form to update an existing institution.
     * GET institutions/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update institution details.
     * PUT or PATCH institutions/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        let updated = await Institution.query().where('id', params.id).update(request.all());
        return response.json(updated);
    }

    /**
     * Delete a institution with id.
     * DELETE institutions/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
    }
}

module.exports = InstitutionController
