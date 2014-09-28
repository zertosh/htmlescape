# htmlescape

Proper escaping of JSON for usage as an object literal inside of a `<script>` tag. Use `htmlescape` in place of `JSON.stringify`. For more info see [JSON: The JavaScript subset that isn't](http://timelessrepo.com/json-isnt-a-javascript-subset).

## Usage

```js
var htmlescape = require('htmlescape');
htmlescape({prop:'value'});
//=> '{"prop":"value"}'
```
