'use strict'

/**
 * Is responsible for instantiating and executing the extractors.
 */
class ExtractorManager {

    constructor() {
    }

    /**
     * Instance a new extractor
     * @param extractorName
     * @returns a new extractor or error
     */
    getExtractor(extractorName) {
        try {
            let extractor = require('./' + extractorName);
            return extractor;
        } catch (e) {
            throw new Error("No se encontro un extractor con el nombre: " + extractorName);
        }
    }

    /**
     * Run a extractor
     * @param extractorName name of extractor
     * @param equation search equation
     * @param selectors
     * @returns {Promise<*>}
     */
    async execute(extractorName, equation, selectors) {
        const extractor = this.getExtractor(extractorName);

        const links = await extractor.search(equation);
        const filtered = extractor.filter(links);
        const allHtml = await extractor.extract(filtered);
        const body = extractor.applySelectors(allHtml, selectors);
        const saved = extractor.save(body);

        return saved;
    }
}

module.exports = ExtractorManager;
