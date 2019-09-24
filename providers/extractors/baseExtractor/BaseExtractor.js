const request = require('request-promise');
const parse = require('node-html-parser');
const config = require('../Configuration');

/**
 * Base extractor, all extractors must extend from this.
 */
class BaseExtractor {

    constructor() {
        // void
    }

    async search(eq) {
        let options = config.options;
        options.qs = eq;
        let googleResults = await request(options);
        console.log(googleResults)
        return googleResults.items;
    }

    filter(items) {
        return items;
    }

    async extract(items) {
        let allHtml = [];

        for (const item of items) {
            let newItem = item;
            newItem.html = await request.get({uri: item.link}).catch(error => {
                throw new Error(error);
            });
            allHtml.push(newItem)
        }

        return allHtml;
    }

    applySelectors(allHtml, selectors) {
        let articles = [];

        for (const data of allHtml) {
            const root = parse.parse(data.html);

            for (const selector of selectors) {
                let elements = root.querySelectorAll(selector);

                if (elements.length > 0) {
                    let newItem = data;
                    let allText = elements.map(elem => {
                        return elem.innerText;
                    });

                    newItem.fullText = allText.join('\n');
                    articles.push(newItem);
                }
            }
        }
        return articles;
    }

    save(articles) {
        return articles;
    }

}

module.exports = BaseExtractor;
