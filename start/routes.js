'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');
const ExtractorManager = use('ExtractorManager');

Route.get('/', async ({ response }) => {
    const Model = use('App/Models/Equation')
    return await Model.query().with('selectors').fetch()
});

// routes with prefix 'api'
Route.group(() => {

    Route.post('/extractors/run', 'ExtractorController.extract');

    Route.post('/extractors/test', 'ExtractorController.test');

}).prefix('api');
