'use strict';

const {test, trait} = use('Test/Suite')('Functional Test - Extractor Universidad');
const equation = require('../dataTest/extractorUdc').equationUdc;

trait('Test/ApiClient');

test('test extractor "udc" http api', async ({assert, client}) => {
    const response = await client.post('/api/extractors/test').send(equation).end();
    response.assertStatus(200);
}).timeout(0);
