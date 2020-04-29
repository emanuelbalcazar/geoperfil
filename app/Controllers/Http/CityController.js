'use strict'

const City = use('App/Models/City');

class CityController {
    /**
     * Show a list of all Cities.
     * GET cities
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

        let cities = await City.query().where(params.columnName, 'ILIKE', `%${params.columnValue}%`).paginate(params.page, params.perPage);
        return response.json(cities);
    }

    /**
     * Render a form to be used for creating a new City.
     * GET cities/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new sitie.
     * POST city
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        let city = request.post();

        let cityInstance = await City.create(city);
        response.json(cityInstance);
    }

    /**
     * Display a single city.
     * GET cities/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        let city = await City.query().where('id', params.id).first();
        response.json(city);
    }

    /**
     * Render a form to update an existing city.
     * GET cities/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update city details.
     * PUT or PATCH cities/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        let cityUpdated = await City.query().where('id', params.id).update(request.all());
        return response.json(cityUpdated);
    }

    /**
     * Delete a city with id.
     * DELETE cities/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
        let city = await City.query().where('id', params.id).delete();
        return response.json(city);
    }
}

module.exports = CityController
