'use strict'

const ExtractorManager = use('ExtractorManager');
const { before, test } = use('Test/Suite')('Unit Test - Extractor Generico');
const equation = require('../dataTest/extractorElChubut').equation1;

var extractor;

/* // before test, instanciate extractor.
before(async () => {
    extractor = ExtractorManager.getExtractor('elchubut');
});

// run tests...
test('Test sobreescritura del nombre del extractor.', async ({ assert }) => {
    assert.equal('elchubut', extractor.name);
});

test('Test cantidad de resultados obtenidos de google.', async ({ assert }) => {
    let result = await extractor.search(equation.eq);
    assert.equal(20, result.length);
}).timeout(0);

test('Test HTML obtenido a partir de los links de google. ', async ({ assert }) => {
    let links = await extractor.search(equation.eq);
    let htmls = await extractor.crawl(links);
    assert.isArray(htmls);
    assert.equal(20, htmls.length);
}).timeout(0);

test('Test texto obtenido luego de aplicar los selectores en el html. ', async ({ assert }) => {
    let links = await extractor.search(equation.eq);
    let htmls = await extractor.crawl(links);
    let texts = await extractor.scraping(htmls, equation.selectors);
    assert.isArray(texts);
    assert.equal(20, texts.length);
    assert.isString(texts[0].text);
}).timeout(0); */
