'use strict'

const ExtractorManager = use('ExtractorManager');
const { before, test, trait } = use('Test/Suite')('Test Extractor: El Chubut');
const dataTest = require('../dataTest/extractorElChubut');

var extractor;

trait('Test/ApiClient');

// before test, instanciate extractor.
before(async () => {
    extractor = ExtractorManager.getExtractor('elchubut');
});

// run tests...
test('Test sobreescritura del nombre del extractor.', async ({ assert }) => {
    assert.equal('elchubut', extractor.name);
});

test('Test cantidad de resultados obtenidos de google.', async ({ assert }) => {
    let result = await extractor.search(dataTest.eq);
    assert.isArray(result);
    assert.equal(10, result.length);
}).timeout(0);

test('Test HTML obtenido a partir de los links de google. ', async ({ assert }) => {
    let links = await extractor.search(dataTest.eq);
    let htmls = await extractor.extract(links);
    assert.isArray(htmls);
    assert.equal(10, htmls.length);
}).timeout(0);

test('Test texto obtenido luego de aplicar los selectores en el html. ', async ({ assert }) => {
    let links = await extractor.search(dataTest.eq);
    let htmls = await extractor.extract(links);
    let texts = await extractor.applySelectors(htmls, dataTest.selectors);
    assert.isArray(texts);
    assert.equal(10, texts.length);
    assert.isString(texts[0].fullText);
}).timeout(0);
