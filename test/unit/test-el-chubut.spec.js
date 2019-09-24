'use strict'

const ExtractorManager = use( 'ExtractorManager');
const { test } = use('Test/Suite')('Test Extractor: El Chubut');
const DataTestChubut = require('../dataTest/extractorElChubut');

test('probando extraccion del diario chubut usando el extractor manager', async ({ assert }) => {
    let body = await ExtractorManager.test('elchubut', DataTestChubut.eq, DataTestChubut.selectors);
    console.log(JSON.stringify(body, null, 3));
}).timeout(30000) // TODO: refactorizar y corregir!
