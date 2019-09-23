var BaseExtractor = require('../baseExtractor/BaseExtractor');

class ExtractorElChubut extends BaseExtractor{
     constructor(){
         super();
     }

     filter(items) {
         console.log('Filter ExtractorElChubut');
         return items;
     }

}

module.exports = new ExtractorElChubut();
