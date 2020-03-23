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

    Route.resource('/alerts', 'AlertController');

    Route.resource('/articles', 'ArticleController');

    Route.resource('/campuses', 'CampusController');

    Route.resource('/careers', 'CareerController');

    Route.resource('/equations', 'EquationStatusController');

    Route.resource('/institutions', 'InstitutionController');

    Route.resource('/logs', 'LogController');

    Route.resource('/professionals', 'ProfessionalController');

    Route.resource('/queries', 'QueryController');

    Route.resource('/selectors', 'SelectorController');

    Route.resource('/sites', 'SiteController');

    Route.resource('/provinces', 'ProvinceController');

    Route.resource('/cities', 'CityController');

    Route.post('/extractors/run', 'ExtractorController.extract');

    Route.post('/extractors/test', 'ExtractorController.test');

    Route.post('/auth/register', 'AuthController.register');

    Route.post('/auth/login', 'AuthController.login');

    Route.post('/auth/recover', 'AuthController.recover');

    Route.post('/auth/reset', 'ForgotPasswordController.update');

    Route.get('/alerts/:id/accept', 'AlertController.accept');

    Route.get('/professionalDetails/:id', 'ProfessionalController.show_details');

}).prefix('api');
