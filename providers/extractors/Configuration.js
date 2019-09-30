// google custom search http configuration.
exports.options = {
    method: 'GET',
    uri: 'https://www.googleapis.com/customsearch/v1',
    json: true, // automatically parses the JSON string in the response
    headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)'
    }
};
