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
     * @param equation to execute
     * @returns extractor instance or error
     */
    getExtractor(extractorName) {
        try {
            let Extractor = require('./' + extractorName);
            return new Extractor();
        } catch (e) {
            let BaseExtractor = require('./baseExtractor/BaseExtractor');
            return new BaseExtractor();
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
        const filtered = await extractor.filter(links, equation);
        const allHtml = await extractor.crawl(filtered);
        const body = await extractor.scraping(allHtml, selectors);
        const saved = await extractor.save(body, equation);

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
        const filtered = await extractor.filter(links, equation);
        const allHtml = await extractor.crawl(filtered);
        const body = await extractor.scraping(allHtml, selectors);

        return body;
    }
}

module.exports = ExtractorManager;
