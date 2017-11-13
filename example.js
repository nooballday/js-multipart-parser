const UPLOAD_PATH = 'uploaded_file';
const fileOptions = { dest: `${UPLOAD_PATH}/` };
const uploader = require('./multipart-parser');

// save the file,
// the file could be single or multiple the library will decide it, so just dump it here
// it will capture detail of uploaded data
const fileDetails = await uploader(files, fileOptions);

console.log(fileDetails);