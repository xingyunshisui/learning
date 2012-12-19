# commonjs-init-test

Test commonjs init task.

## Getting Started
### On the server
Install the module with: `npm install commonjs-init-test`

```javascript
var commonjs_init_test = require('commonjs-init-test');
commonjs_init_test.awesome(); // "awesome"
```

### In the browser
Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/damao.wj/commonjs-init-test/master/dist/commonjs-init-test.min.js
[max]: https://raw.github.com/damao.wj/commonjs-init-test/master/dist/commonjs-init-test.js

In your web page:

```html
<script src="dist/commonjs-init-test.min.js"></script>
<script>
awesome(); // "awesome"
</script>
```

In your code, you can attach commonjs-init-test's methods to any object.

```html
<script>
this.exports = Bocoup.utils;
</script>
<script src="dist/commonjs-init-test.min.js"></script>
<script>
Bocoup.utils.awesome(); // "awesome"
</script>
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](http://gruntjs.com/).

_Also, please don't edit files in the "dist" subdirectory as they are generated via grunt. You'll find source code in the "lib" subdirectory!_

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 fornever  
Licensed under the MIT license.
