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
     * @returns BaseExtractor extractor or error
     */
    getExtractor(extractorName) {
        try {
            let extractor = require('./' + extractorName);
            return extractor;
        } catch (e) {
            let defaultExtractor = require('./baseExtractor/BaseExtractor');
            return new defaultExtractor();
        }
    }

    /**
     * Run an extractor and save the extracted content.
     * @param extractorName name of extractor
     * @param equation search equation
     * @param selectors
     * @returns {Promise<*>}
     */
    async execute(extractorName, equation, selectors) {
        const extractor = this.getExtractor(extractorName);

        const links = await extractor.search(equation);
        const filtered = await extractor.filter(links);
        const allHtml = await extractor.extract(filtered);
        const body = await extractor.applySelectors(allHtml, selectors);
        const saved = await extractor.save(body);

        return saved;
    }

    /**
     * Test an extractor without saving the content obtained.
     * @param extractorName
     * @param equation
     * @param selectors
     * @returns {Promise<*[]>}
     */
    async test(extractorName, equation, selectors) {
        const extractor = this.getExtractor(extractorName);
        const links = await extractor.search(equation);
        const filtered = await extractor.filter(links);
        const allHtml = await extractor.extract(filtered);
        const body = await extractor.applySelectors(allHtml, selectors);

        return body;
    }
}

module.exports = ExtractorManager;
