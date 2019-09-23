var config = require('../config')
var request = require('request-promise');
var parse = require('node-html-parser')

class BaseExtractor {

    constructor() {}

    async search( eq ) {
        let options = {
            method: 'GET',
            uri: 'https://www.googleapis.com/customsearch/v1',
            qs: eq,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true // Automatically parses the JSON string in the response
        };

        let result = await request(options);
        return result.items
    }

    filter(items){
        console.log('Filter del BaseExtractor')
        return items
    }

    async extract(items) {
        let htmls = [];
        for (const item of items) {
            let newItem = item;
            newItem.html = await request.get( { uri: item.link } ).catch( error => {
                console.log( error )
            });
            htmls.push(newItem)
        }
        return htmls
    }

    selector(htmls, selectors) {
        let articles = [];
        for (const data of htmls) {
            const root = parse.parse( data.html );

            for (const selector of selectors) {
                let elements = root.querySelectorAll(selector);

                if (elements.length > 0) {
                    let newItem = data;
                    let allText = elements.map(elem => {
                        return elem.text
                    });
                    newItem.fullText = allText.join('\n');
                    articles.push(newItem)
                }
            }
        }
        return articles
    }

    save(articles){
        return articles
    }

}

module.exports = BaseExtractor
