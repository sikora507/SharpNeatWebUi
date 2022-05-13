const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname);
//passsing directoryPath and callback function
let merged = {};
fs.readdir(directoryPath, function (err, files) {
    const targetFiles = files.filter(file => {
        return path.extname(file).toLowerCase() === ".json";
    });

    targetFiles.forEach(function (file) {
        let rawdata = fs.readFileSync(file);
        let config = JSON.parse(rawdata);
        merged={...merged, ...config}
    });
    console.log(JSON.stringify(merged));
});