'use strict'

const { test, trait } = use('Test/Suite')('Functional Test - Extractor Generico');
const equation = require('../dataTest/extractorElChubut').equation1;

trait('Test/ApiClient');

/* test('test extractor generico con "elchubut" http api', async ({ assert, client }) => {
    const response = await client.post('/api/extractors/test').send(equation).end();
    response.assertStatus(200);
}); */
