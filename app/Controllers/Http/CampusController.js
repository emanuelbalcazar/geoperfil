'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Campus = use('App/Models/Campus');
const CampusCareer = use('App/Models/CampusCareer');

/**
 * Resourceful controller for interacting with campuses
 */
class CampusController {
    /**
     * Show a list of all campuses.
     * GET campuses
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

        if (params.page = "all")
            return await Campus.all();

        let campuses = await Campus.query().where(params.columnName, 'ILIKE', `%${params.columnValue}%`).paginate(params.page, params.perPage);
        return campuses;
    }

    /**
     * Render a form to be used for creating a new campus.
     * GET campuses/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new campus.
     * POST campuses
     * TODO: revisar
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        let campus = request.post();
        let careers = campus.careers;

        delete campus.careers;

        let count = await Campus.query().where({ name: campus.name, address: campus.address }).getCount();

        if (count > 0)
            return response.conflict({ code: 409, message: 'La sede ya existe' });

        let campusInstance = await Campus.create(campus);
        let careersInstance = await campusInstance.careers().createMany(careers);

        response.json(campusInstance);
    }

    /**
     * Display a single campus.
     * GET campuses/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        let campus = await Campus.query().with('careers').where('id', params.id).fetch();
        return response.json(campus);
    }

    /**
     * Render a form to update an existing campus.
     * GET campuses/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update campus details.
     * PUT or PATCH campuses/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        let updated = await Campus.query().where('id', params.id).update(request.all());
        return response.json(updated);
    }

    /**
     * Delete a campus with id.
     * DELETE campuses/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
        let campusCareer = await CampusCareer.query().where('campus_id', params.id).delete();
        let campus = await Campus.query().where('id', params.id).delete();
        return response.json(campus);
    }
}

module.exports = CampusController
