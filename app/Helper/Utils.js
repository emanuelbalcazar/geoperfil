const fs = require('fs');

exports.isDirectory = source => fs.lstatSync(source).isDirectory();

exports.getDirectories = source => fs.readdirSync(source);

exports.convertToEquations = (equations) => {
    let records = equations.map(equation => {
        return {
            id: equation.id,
            q: equation.equation.q,
            siteSearch: equation.site.site,
            siteSearchFilter: equation.equation.siteSearchFilter,
            start: equation.start,
            selectors: equation.site.selectors.map(selector => { return selector.selector })
        }
    });

    return records;
};
