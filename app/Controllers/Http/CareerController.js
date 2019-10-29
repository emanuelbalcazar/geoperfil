'use strict'

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

        let careers = await Career.query().where(params.columnName, 'ILIKE', `%${params.columnValue}%`).paginate(params.page, params.perPage);
        return careers;
    }

    
}

module.exports = CareerController
