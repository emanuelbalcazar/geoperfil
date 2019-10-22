const axios = require("axios");
const parse = require('node-html-parser');
const config = require('../Configuration');
const Article = use('App/Models/Article');
const querystring = require('querystring');

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
        let googleResults = [];
        let startIndex = 1;
        let hasNextPage = true;
        let currentPage = 1;
        const DEFAULT_LIMIT = 1;

        equation.start = startIndex;
        equation.limit = equation.limit || DEFAULT_LIMIT;

        while (currentPage <= equation.limit && hasNextPage) {
            let URL = config.options.uri + querystring.stringify(equation);
            let result = await getData(URL);
            googleResults = googleResults.concat(result.items)
            hasNextPage = !!(result.queries && result.queries.nextPage);

            if (hasNextPage) {
                startIndex = result.queries.nextPage[0].startIndex;
            }

            currentPage++;
        }

        return googleResults.map(({ title, link, displayLink, snippet }) => ({
            title, link, displayLink, snippet
        }));
    }

    /**
     * Filter previously visited links
     * @param items
     * @returns {*}
     * TODO: implement
     */
    async filter(items) {
        return items;
    }

    /**
     * Extract the html from each link.
     * @param items
     * @returns array of objects that includes the html.
     */
    async crawl(items) {
        let allHtml = [];

        for (const item of items) {
            let newItem = item;
            newItem.html = await getData(item.link);
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
    async scraping(allHtml, selectors) {
        let articles = [];

        for (const data of allHtml) {
            const root = parse.parse(data.html);
            let newItem = data;
            delete newItem.html; // I delete the attribute because it is no longer necessary.
            newItem.text = '';

            for (const selector of selectors) {
                let elements = root.querySelectorAll(selector);
                // if there are elements, I get the text.
                if (elements.length > 0) {
                    let text = elements.map(elem => {
                        return elem.text || elem.innerText;
                    });

                    newItem.text += text.join('\n').trim();
                }
            }

            if (newItem.text.length > 0)
                articles.push(newItem);
        }

        return articles;
    }

    /**
     * Save content obtained from google and processed with selectors.
     * @returns {*}
     * @param articles
     */
    async save(articles) {
        let result = [];

        for (const article of articles) {
            let record = await Article.create(article);
            result.push(record);
        }

        return result;
    }
}

const getData = async url => {
    const response = await axios.get(url);
    const data = response.data;
    return data;
};

module.exports = BaseExtractor;
