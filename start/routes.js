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
const Route = use('Route')
const ExtractorManager = use( 'ExtractorManager')

Route.get('/', async({response}) => {
    var Extractor = ExtractorManager.getExtractor('elchubut')
    var links = await Extractor.search( {
        q: 'graduados AND colacion',
        siteSearch: 'https://www.diariojornada.com.ar',
        cx: '014476054167817262143:wqkzor3tqfp',
        key:'AIzaSyAZdtNoA5CAjWgbl9_R-Jslo2QACtPYrS0',
        siteSearchFilter: 'i'
    })
    var filtered = Extractor.filter(links);
    var htmls = await Extractor.extract( filtered )
    var body = Extractor.applySelectors( htmls, ['.td-post-content p']  )

    return response.json(body)
});
