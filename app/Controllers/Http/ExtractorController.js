'use strict'
const ExtractorManager = use('ExtractorManager');

class ExtractorController {

    async extract({ request, response }) {
        const body = request.post()
        let result = await ExtractorManager.execute(body.extractor, body.eq, body.selectors);
        return response.json(result)
    }

    async test({ request, response }) {
        const body = request.post()
        let result = await ExtractorManager.test(body.extractor, body.eq, body.selectors);
        return response.json(result)
    }
}

module.exports = ExtractorController
