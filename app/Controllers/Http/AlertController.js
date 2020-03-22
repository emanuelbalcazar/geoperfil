'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const AlertService = use('AlertService');
const Alert = use('App/Models/Alert');

/**
 * Resourceful controller for interacting with alerts
 */
class AlertController {

    /**
     * Show a list of all alerts.
     * GET alerts
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

        let alerts = await Alert.query().where(params.columnName, 'ILIKE', `%${params.columnValue}%`).orderBy('timestamp', 'DESC').paginate(params.page, params.perPage);

        return response.json(alerts);
    }

    /**
     * Accept a alert
     * GET alert for resolve
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async accept({ params, request, response, view }) {
        let alert = await Alert.query().where('id', params.id).first();
        await AlertService.accept(alert);
        return response.json(alert);
    }

    /**
     * Reject a alert
     * GET alert for reject
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async reject({ params, request, response, view }) {
        let alert = await Alert.query().where('id', params.id).first();
        await AlertService.reject(alert);
        return response.json(alert);
    }

    /**
     * Render a form to be used for creating a new alert.
     * GET alerts/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new alert.
     * POST alerts
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        let alert = request.post();
        let record = await Alert.create(professional);

        return response.json(record);
    }

    /**
     * Display a single alert.
     * GET alerts/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
    }

    /**
     * Render a form to update an existing alert.
     * GET alerts/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update alert details.
     * PUT or PATCH alerts/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
    }

    /**
     * Delete a alert with id.
     * DELETE alerts/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
    }
}

module.exports = AlertController
