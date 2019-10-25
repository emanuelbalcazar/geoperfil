const fs = require('fs');

exports.isDirectory = source => fs.lstatSync(source).isDirectory();

exports.getDirectories = source => fs.readdirSync(source);
