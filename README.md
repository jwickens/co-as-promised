
Tiny utility to convert wrapped co generators with co less than 4.0 into promises

Example:

```js
const coAsPromised = require('co-as-promised');
var co = require('co');
var fs = require('fs');

function read(file) {
  return function(fn){
    fs.readFile(file, 'utf8', fn);
  }
}

async function run () {
  const [a, b] = await coAsPromised(co(function *(){
    var a = yield read('.gitignore');
    var b = yield read('package.json');
    return [a, b];
  }))
  console.log(a);
  console.log(b);
}

run();
```
