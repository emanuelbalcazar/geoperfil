const BaseExtractor = require('../baseExtractor/BaseExtractor');

class ExtractorElChubut extends BaseExtractor {

    constructor() {
        super();
    }

    get name() {
        return 'elchubut';
    }
}

module.exports = new ExtractorElChubut();
