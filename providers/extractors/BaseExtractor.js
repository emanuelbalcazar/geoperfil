var config = require('./config')
var request = require('request-promise');
var parse = require('node-html-parser')

class BaseExtractor {

    constructor() {}

    async search( eq ) {
        var options = {
            method: 'GET',
            uri: 'https://www.googleapis.com/customsearch/v1',
            qs: eq,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };

        var result = await request( options )
        return result.items
    }

    async extract( items ) {
        var htmls = []
        for (const item of items) {
            let newItem = item;
            newItem.html = await request.get( { uri: item.link } ).catch( error => {
                console.log( error )
            });
            htmls.push(newItem)
        }
        return htmls
    }

    selector( htmls, selectors ) {
        var result = []
        for (const data of htmls) {
            const root = parse.parse( data.html )

            for (const selector of selectors) {
                var elements = root.querySelectorAll( selector )

                if (elements.length > 0) {
                    let newItem = data;
                    var allText = elements.map(elem => { return elem.text})
                    newItem.fullText = allText.join('\n')
                    result.push(newItem)
                }
            }            
        }
        return result
    }
}

module.exports = BaseExtractor