const fs = require('fs');
var isMultiple = false;
var arrayFileName = [];

//trigger upload process
const uploader = function (file, options) {
    if (!file) throw new Error('no file(s)');

    //delete previous array and status multiple
    arrayFileName.length = 0
    isMultiple = false;
    
    if(Array.isArray(file)) isMultiple = true;
    
    //check if the path is not available make one
    if (!fs.existsSync(options.dest)) fs.mkdirSync(options.dest);
    
    //upload single or array files
    return Array.isArray(file) ? _filesHandler(file, options) : _fileHandler(file, options);
}

//multiple files upload
const _filesHandler = (files, options) => {
    if (!files || !Array.isArray(files)) throw new Error('no files');
    const promises = files.map(x => _fileHandler(x, options));
    return Promise.all(promises);
}

//single file upload
const _fileHandler = function (file , options) {
    
    if (!file ) throw new Error('no file');
    
    const orignalname = file.hapi.filename;
    const filename = new Date().getMilliseconds();
    const path = `${options.dest}${orignalname}`;
    const fileStream = fs.createWriteStream(path);
    
    
    return new Promise((resolve, reject) => {
        file.on('error', function (err) {
            reject(err);
        });
        
        file.pipe(fileStream);
        
        file.on('end', function (err) {
            const fileDetails = {
                fieldname: file.hapi.name,
                originalname: file.hapi.filename, filename,
                mimetype: file.hapi.headers['content-type'],
                destination: `${options.dest}`, path,
                size: fs.statSync(path).size,
            }
            
            if(isMultiple) {
                resolve(fileDetails, filename);
            } else {
                arrayFileName.push(fileDetails);
                resolve(arrayFileName);
            }
        })
    })
}

module.exports = uploader;