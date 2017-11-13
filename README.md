# js-multipart-parser

This piece of code as the title says is a parser for multipart, inspired by https://scotch.io/bar-talk/handling-file-uploads-with-hapi-js

How to use it :

```js

const UPLOAD_PATH = 'uploaded_file';
const fileOptions = { dest: `${UPLOAD_PATH}/` };
const uploader = require('./multipart-parser');

// save the file,
// the file could be single or multiple this snippet will decide it, so just dump it here
// it will capture detail of uploaded data
const fileDetails = await uploader(files, fileOptions);

console.log(fileDetails);

```
