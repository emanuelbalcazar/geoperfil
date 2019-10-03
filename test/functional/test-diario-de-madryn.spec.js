'use strict';

const {test, trait} = use('Test/Suite')('Functional Test - Extractor Diario de Madryn');
const equation = require('../dataTest/extractorDiarioDeMadryn').equationDiarioDeMadryn;

trait('Test/ApiClient');

test('test extractor "Diario de Madryn" http api', async ({assert, client}) => {
    const response = await client.post('/api/extractors/test').send(equation).end();
    response.assertStatus(200);
}).timeout(0);
