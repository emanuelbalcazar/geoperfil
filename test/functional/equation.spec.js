'use strict'

const { test, trait, before, after } = use('Test/Suite')('Functional Test - Servicio HTTP Rest de Ecuaciones');
const ace = require('@adonisjs/ace')

trait('Test/ApiClient');

before(async () => {
    await ace.call('migration:run')
    //await ace.call('seed')
});

after(async () => {
    await ace.call('migration:reset')
});


test('', async ({client }) => {
    const response = await client.get('/api/equations').end();
    response.assertStatus(200);
}).timeout(0)
