class CrawlerFactory {

    /**
     * Creates an instance of CrawlerFactory.
     * @memberof CrawlerFactory
     */
    constructor() { }

    /**
    * Creates an instance of crawler according to the type of source.
    */
    getCrawler(name) {
        if (!name)
            throw new Error("No se especifico la fuente de extraccion");

        try {
            let module = "./Crawlers/" + name + "/" + name;
            let extractor = require(module);
            return extractor;
        } catch (exception) {
            throw new Error(`Crawler no encontrado con la fuente ${name}, excepcion ${exception}`);
        }
    }
}

// exported an instance
module.exports = CrawlerFactory;
