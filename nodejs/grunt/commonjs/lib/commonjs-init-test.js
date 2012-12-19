/*
 * commonjs-init-test
 * https://github.com/damao.wj/commonjs-init-test
 *
 * Copyright (c) 2012 fornever
 * Licensed under the MIT license.
 */

(function(exports) {

  exports.awesome = function() {
    return 'awesome';
  };

}(typeof exports === 'object' && exports || this));
