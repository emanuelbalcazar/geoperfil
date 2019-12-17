const axios = require("axios");
const parse = require('node-html-parser');
const config = require('../Configuration');
const querystring = require('querystring');
const Article = use('App/Models/Article');
const EquationArticle = use('App/Models/EquationArticle');

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
        let googleResults = { items: [], totalResults: 0, nextIndex: 1, lastPage: 0 };
        let URL = config.options.uri + querystring.stringify(config.options.credentials) + '&' + querystring.stringify(equation);
        let result = await getData(URL);

        googleResults.items = googleResults.items.concat(result.items);
        googleResults.totalResults = Number(result.searchInformation.totalResults);
        googleResults.lastPage = Math.ceil(googleResults.totalResults / config.RESULTS_PER_PAGE);
        googleResults.lastPage = (googleResults.lastPage > config.PAGE_LIMIT) ? config.PAGE_LIMIT : googleResults.lastPage;

        let hasNextPage = !!(result.queries && result.queries.nextPage);

        if (hasNextPage)
            googleResults.nextIndex = result.queries.nextPage[0].startIndex;

        // get specific attributes from google results.
        googleResults.items = googleResults.items.map(item => {
            return {
                title: item.title || 'no title',
                link: item.link,
                displayLink: item.displayLink,
                snippet: item.snippet
                //datepublished: (item.pagemap && item.pagemap.article) ? new Date(item.pagemap.article[0].datepublished) : new Date(),
                //datemodified: (item.pagemap && item.pagemap.article) ? new Date(item.pagemap.article[0].datemodified) : new Date()
            }
        });

        return googleResults;
    }

    /**
     * Filter previously visited links
     * @param googleResults
     * @returns {*}
     * TODO: implement
     */
    async filter(googleResults, equation) {
        let records = [];

        for (const article of googleResults.items) {
            let previousArticle = await Article.query().where({ link: article.link }).first();

            if (previousArticle) {
                let count = await EquationArticle.query().where({ equation_id: equation.id, article_id: previousArticle.id }).getCount();
                if (count == 0) {
                    await EquationArticle.create({ equation_id: equation.id, article_id: previousArticle.id });
                }
            } else {
                records.push(article);
            }
        }

        // remove links with /tag/*
        records = records.filter(article => {
            return (!article.link.includes('tag') || !article.link.includes('tags'));
        });

        googleResults.items = records;

        return googleResults;
    }

    /**
     * Extract the html from each link.
     * @param items
     * @returns array of objects that includes the html.
     */
    async crawl(googleResults) {
        let allHtml = [];

        for (const item of googleResults.items) {
            let newItem = item;
            newItem.html = await getData(item.link);
            allHtml.push(newItem);
        }

        googleResults.items = allHtml;

        return googleResults;
    }

    /**
     * Apply selectors to get the target text.
     * @param googleResults
     * @param selectors
     * @returns {[]}
     */
    async scraping(googleResults, selectors) {
        let articles = [];

        for (const data of googleResults.items) {
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

        googleResults.items = articles;

        return googleResults;
    }

    /**
     * Save content obtained from google and processed with selectors.
     * @returns {*}
     * @param articles
     */
    async save(googleResults, equation) {
        let result = [];

        for (const article of googleResults.items) {
            let record = await Article.create(article);
            let relation = await EquationArticle.create({ equation_id: equation.id, article_id: record.id }).catch(er => console.log(er));
            result.push(record);
        }

        googleResults.items = result;

        return googleResults;
    }
}

const getData = async url => {
    const response = await axios.get(url).catch(e => console.log(e.message));
    const data = response.data;
    return data;
};

module.exports = BaseExtractor;
