'use strict'

const { test, trait } = use('Test/Suite')('Functional Example');

trait('Test/ApiClient');

test('test / url ', async ({ assert, client }) => {
    const response = await client.get('/').end();
    response.assertJSONSubset({ name: 'chubut' });
});
