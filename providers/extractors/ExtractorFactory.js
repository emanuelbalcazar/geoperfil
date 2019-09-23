
class ExtractorFactory {
    constructor(){}

    getExtractor(name){
        var extractor = require('./'+name)

        return extractor
    }

}

module.exports = ExtractorFactory
