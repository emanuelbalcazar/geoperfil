'use strict'

const Province = use('App/Models/Province');


class ProvinceController {
    /**
     * Show a list of all Provinces.
     * GET provinces
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

        let provinces = await Province.query().where( params.columnName,'ILIKE', `%${params.columnValue}%`).paginate(params.page, params.perPage);
        return response.json( provinces );
    }

    /**
     * Render a form to be used for creating a new province.
     * GET provinces/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new province.
     * POST province
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        let province = request.post();

        let provinceInstance = await Province.create( province );
        response.json(provinceInstance);
    }

    /**
     * Display a single province.
     * GET provinces/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        let province = await Province.query().where('id', params.id).first();
        response.json(province);
    }

    /**
     * Render a form to update an existing province.
     * GET provinces/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update province details.
     * PUT or PATCH provinces/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
        let provinceUpdated = await Province.query().where('id', params.id).update(request.all());
        return response.json( provinceUpdated );
    }

    /**
     * Delete a province with id.
     * DELETE provinces/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
        let province = await Province.query().where('id', params.id).delete();
        return response.json( province );
    }
}

module.exports = ProvinceController
