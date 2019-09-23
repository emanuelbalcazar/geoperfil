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
const Factory = use( 'ExtractorFactory')

Route.get('/', async() => {
    var Extractor = Factory.getExtractor('elchubut')
    var links = await Extractor.search( {
        q: 'graduados + colacion',
        siteSearch: 'www.elchubut.com.ar',
        cx: '014877350526488021429:xgeqnqdzetg',
        key:'AIzaSyA34VP0DASFc1eqRbNug3_yil1rrsRzCC0',
        siteSearchFilter: 'i'
    })
    var filtered = Extractor.filter(links);
    var htmls = await Extractor.extract( filtered )
    var body = Extractor.selector( htmls, ['.notapage_cuerpo p', '.news-amp-body']  )

    return body
});
