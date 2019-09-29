const request = require('request-promise');
const parse = require('node-html-parser');
const config = require('../Configuration');
const Article = use('App/Models/Article');

/**
 * Base extractor, all extractors must extend from this.
 */
class BaseExtractor {

    constructor() {
        // void
    }

    get name() {
        return 'BaseExtractor';
    }

    /**
     * Run a google search with a search equation.
     * @param equation
     * @link https://developers.google.com/custom-search/v1/cse/list#request
     * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring
     * @returns Retrieve results for a particular search
     */
    async search(equation) {
        let options = config.options;
        options.qs = equation;

        let googleResults = await request(options);

        let cleanItems = googleResults.items.map(({ title, link, displayLink, snippet }) => ({
            title, link, displayLink, snippet
        }));

        return cleanItems;
    }

    /**
     * Filter previously visited links
     * @param items
     * @returns {*}
     * TODO: implement
     */
    filter(items) {
        return items;
    }

    /**
     * Extract the html from each link.
     * @param items
     * @returns array of objects that includes the html.
     */
    async extract(items) {
        let allHtml = [];

        for (const item of items) {
            let newItem = item;
            newItem.html = await request.get({ uri: item.link });
            allHtml.push(newItem);
        }

        return allHtml;
    }

    /**
     * Apply selectors to get the target text.
     * @param allHtml
     * @param selectors
     * @returns {[]}
     */
    applySelectors(allHtml, selectors) {
        let articles = [];

        for (const data of allHtml) {
            const root = parse.parse(data.html);

            for (const selector of selectors) {
                let elements = root.querySelectorAll(String(selector));
                // if there are elements, I get the text.
                if (elements.length > 0) {
                    let newItem = data;

                    let text = elements.map(elem => {
                        return elem.text || elem.innerText;
                    });

                    newItem.text = text.join('\n').trim();
                    delete newItem.html; // I delete the attribute because it is no longer necessary.
                    articles.push(newItem);
                }
            }
        }

        return articles;
    }

    /**
     * Save content obtained from google and processed with selectors.
     * @param array of articles
     * @returns {*}
     * TODO: implement
     */
    async save(articles) {
        let result = [];

        for (const article of articles) {
            let record = await  Article.create(article);
            result.push(record);
        }

        return result;
    }
}

module.exports = BaseExtractor;
