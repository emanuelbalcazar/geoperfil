const Env = use('Env');

// credentials for google access
const Credentials = {
    cx: Env.get('GOOGLE_CX'),
    key: Env.get('GOOGLE_KEY')
}

exports.options = {
    uri: 'https://www.googleapis.com/customsearch/v1?',
    credentials: Credentials
};

// exclude words in urls
exports.excludedWords = ['tag', 'tags', 'seccion']

exports.RESULTS_PER_PAGE = 10;

exports.PAGE_LIMIT = 10;
