/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

var memory = require("api-utils/memory");

exports.testMemory = function(test) {
  test.pass("Skipping this test until Gecko memory debugging issues " +
            "are resolved (see bug 592774).");
  return;

  var obj = {};
  memory.track(obj, "testMemory.testObj");
  var objs = memory.getObjects("testMemory.testObj");
  test.assertEqual(objs[0].weakref.get(), obj);
  obj = null;
  memory.gc();
  test.assertEqual(objs[0].weakref.get(), null);
};
