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
    return 'Proyecto Geoperfil';
});

// routes with prefix 'api'
Route.group(() => {

    Route.resource('/equations', 'EquationController');

    Route.resource('/selectors', 'SelectorController');

    Route.resource('/institutions', 'InstitutionController');

    Route.resource('/campuses', 'CampusController');

    Route.post('/extractors/run', 'ExtractorController.extract');

    Route.post('/extractors/test', 'ExtractorController.test');

    Route.post('/auth/register', 'AuthController.register');

    Route.post('/auth/login', 'AuthController.login');

}).prefix('api');
