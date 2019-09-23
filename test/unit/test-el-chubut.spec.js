'use strict'

const ExtractorManager = use( 'ExtractorManager');
const { test } = use('Test/Suite')('Test El Chubut');
const DataTestChubut = require('../dataTest/extractorElChubut');

test('probando extraccion del diario chubut usando el extractor manager', async ({ assert }) => {
    let body = await ExtractorManager.execute('elchubut', DataTestChubut.eq, DataTestChubut.selectors);
    console.log(body);
}).timeout(30000) // refactorizar
