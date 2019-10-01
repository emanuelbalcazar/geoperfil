const BaseExtractor = require('../baseExtractor/BaseExtractor');

class ExtractorUDC extends BaseExtractor{

    constructor(){
        super();
    }

    get name(){
        return 'udc'
    }

}

module.exports = new ExtractorUDC();
