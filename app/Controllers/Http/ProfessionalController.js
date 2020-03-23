'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Professional = use('App/Models/Professional');
const Career = use('App/Models/Career');
const Campus = use('App/Models/Campus');
const Institution = use('App/Models/Institution');

/**
 * Resourceful controller for interacting with professionals
 */
class ProfessionalController {
    /**
     * Show a list of all professionals.
     * GET professionals
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

        let professionals = await Professional.query().where(params.columnName, 'ILIKE', `%${params.columnValue}%`).paginate(params.page, params.perPage);

        return response.json(professionals);
    }

    /**
     * Render a form to be used for creating a new professional.
     * GET professionals/create
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async create({ request, response, view }) {
    }

    /**
     * Create/save a new professional.
     * POST professionals
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async store({ request, response }) {
        let professional = request.post();
        let record = await Professional.create(professional);

        return response.json(record);
    }

    /**
     * Display a single professional.
     * GET professionals/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show({ params, request, response, view }) {
        let professional = await Professional.query().where('id', params.id).first();
        response.json( professional );
    }

    /**
     * Display a single professional with the career and campus.
     * GET professionalDetails/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async show_details({ params, request, response, view }) {
        let prof = await Professional.query().where('id', params.id).first();
        let career = await Career.query().where('id', prof.career_id ).first();
        let campus = await Campus.query().where('id', prof.campus_id ).first();
        let institution = await Institution.query().where('id', campus.institution_id ).first();

        response.json( {id: prof.id, name: prof.name, surname: prof.surname, 
                        career: career.name, 
                        campus_name: campus.name, campus_address: campus.address, campus_lat: campus.latitude, campus_lon: campus.longitude,
                        institution: institution.name } );
    }

    /**
     * Render a form to update an existing professional.
     * GET professionals/:id/edit
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     * @param {View} ctx.view
     */
    async edit({ params, request, response, view }) {
    }

    /**
     * Update professional details.
     * PUT or PATCH professionals/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async update({ params, request, response }) {
    }

    /**
     * Delete a professional with id.
     * DELETE professionals/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async destroy({ params, request, response }) {
    }
}

module.exports = ProfessionalController
