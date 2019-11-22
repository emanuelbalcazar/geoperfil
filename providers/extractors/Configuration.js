// google cse credentials...
const GeoPerfil = {
    cx: '014630729015948810570:xhbqbuvpi2g',
    key: 'AIzaSyBDpkeAxzpBeFsOsgen9tQkLzpfL_-SWsQ'
};

const Waldo = {
    cx: '014877350526488021429:xgeqnqdzetg',
    key: 'AIzaSyA34VP0DASFc1eqRbNug3_yil1rrsRzCC0'
};

const Emanuel = {
    cx: '016238189032549234631:ggenliamqqu',
    key: 'AIzaSyAIAabEsSUy1PmX4FEK6kWKtgK3z7BZ0Hw'
};

const Martin = {
    cx: '014476054167817262143:lutm5sdcv0y',
    key: 'AIzaSyAZdtNoA5CAjWgbl9_R-Jslo2QACtPYrS0'
};

// module exports...

exports.options = {
    uri: 'https://www.googleapis.com/customsearch/v1?',
    credentials: Martin
};

exports.RESULTS_PER_PAGE = 10;

exports.PAGE_LIMIT = 10;
