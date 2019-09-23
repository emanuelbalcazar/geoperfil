'use strict'

const DataTest = require('../dataTest/eqElChubut')
const Factory = use( 'ExtractorFactory')
const { test } = use('Test/Suite')('Test El Chubut')

test('make sure 2 + 2 is 4', async ({ assert }) => {
    var Extractor = Factory.getExtractor('elchubut')
    var links = await Extractor.search(DataTest.eq)
    var filtered = Extractor.filter(links);
    var htmls = await Extractor.extract( filtered )
    var body = Extractor.selector( htmls, DataTest.selectors);

    console.log(body)
}).timeout(30000)
