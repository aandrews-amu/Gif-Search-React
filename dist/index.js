// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"style.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"boxes.js":[function(require,module,exports) {
// No longer needed colCount after refactoring
// const colCount = 4;
let rowCount = 0; // Moved these vars to getGifs, since the rest of the script does
// not need to use these vars, prob best to keep them scoped
// to the function that does.
// const q = "harry+potter";
// const api_key = "7Erj1LUTR77H1QvQeKYB8aAXambSNMyp";
// See below, we can eliminate offset by
// calculating it based on rowCount in getGifs
// let offset = 0;
// GET GIFS
// function getGifPromise(gifType) {
//   var apiURL = `http://api.giphy.com/v1/gifs/search?q=${gifType}&api_key=${api_key}&limit=${colCount}&offset=${offset}`;
//   return fetch(apiURL).then(response => {
//     return response.json();
//   }).then(json => {
//     return json.data;
//   })
// }
// Refactored this slightly to accept 'query' and 'limit'
// as a parameters to make it a little more flexible. 

function getGifs(limit, query) {
  const apiKey = '7Erj1LUTR77H1QvQeKYB8aAXambSNMyp';
  const apiUrl = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${apiKey}&limit=${limit}&offset=${rowCount * limit}`;
  const gifs = fetch(apiUrl).then(response => response.json());
  return gifs;
} // BUILD ROW
// function buildRow(childCount, gifType) {
// rowCount++; 
// const newDiv = document.createElement("div");
// newDiv.classList.add("boxes");
// newDiv.dataset.remove = rowCount;
// remove button and row div
// const remButton = document.createElement("button");
// const remRow = document.createElement("div");
// remRow.classList.add("boxes__remove", "text-right");
// remButton.classList.add("btn-outline-secondary", "btn");
// remButton.id = "js-remove-row";
// remButton.innerText = "x"; 
// remButton.type = "button";
// remButton.dataset.remove = rowCount;
// newDiv.insertAdjacentElement("afterbegin", remRow);
// remRow.appendChild(remButton);
// EVENT LISTENER FOR REMOVE BUTTON
// remButton.onclick = function () {
//   const toRemove = this.dataset.remove;
//   const removeList = document.querySelectorAll(`[data-remove="${toRemove}"]`);
//   removeList.forEach(function(elt) {
//     elt.remove();
//   })
// };
//   for (let i=0; i < childCount; i++) {
//     const newCol = document.createElement("div"); 
//     newCol.classList.add("boxes__box"); 
//     const newSq = document.createElement("div");
//     newSq.classList.add("square");
//     newCol.appendChild(newSq);
//     newDiv.appendChild(newCol);
//     getGifPromise(q).then(data => {
//       const myGif = data[i].images.fixed_height.url;
//       const newGif = document.createElement("img");
//       newGif.classList.add("img-fluid");
//       newGif.src = myGif; 
//       newSq.appendChild(newGif);
//     })
//     offset += colCount;
//   }
//   return newDiv; 
// }


function buildRemoveButton() {
  const remButton = document.createElement("button");
  remButton.classList.add("btn-outline-secondary", "btn");
  remButton.id = "js-remove-row";
  remButton.innerText = "x";
  remButton.type = "button";
  remButton.dataset.remove = rowCount;

  remButton.onclick = function () {
    // Cleaned this up a little to make it a one-liner
    // const toRemove = this.dataset.remove;
    // const removeList = document.querySelector(`[data-remove="${toRemove}"]`);
    // removeList.remove();
    // removeList.forEach(function(elt) {
    //   elt.remove();
    // })
    document.querySelector(`[data-remove="${this.dataset.remove}"]`).remove();
  };

  return remButton;
}

function buildCol(gifUrl) {
  const newCol = document.createElement("div");
  newCol.classList.add("boxes__box"); // Refactored this to show you another way
  // of building elements like this. Sometimes
  // when I'm building a complex element with a lot
  // of children, I like to go this route to save
  // all of the foo.bar()
  // const newSq = document.createElement("div");
  // newSq.classList.add("square");
  // const newGif = document.createElement("img");
  // newGif.classList.add("img-fluid");
  // newGif.src = gifUrl;
  // newSq.appendChild(newGif);
  // newCol.appendChild(newSq);

  newCol.innerHTML = `
    <div class="square"><img class="img-fluid" src="${gifUrl}" /></div>
  `;
  return newCol;
}

async function buildRow(childCount, gifType) {
  rowCount++;
  const newDiv = document.createElement("div");
  newDiv.classList.add("boxes");
  newDiv.dataset.remove = rowCount;
  const remRow = document.createElement("div");
  remRow.classList.add("boxes__remove", "text-right");
  const remButton = buildRemoveButton();
  remRow.appendChild(remButton);
  newDiv.appendChild(remRow); // Using await here b/c we want to make sure
  // the api call has completed before continuing

  const gifs = await getGifs(childCount, gifType);
  gifs.data.forEach(function (gif) {
    const col = buildCol(gif.images.fixed_height.url);
    newDiv.appendChild(col);
  });
  return newDiv;
} // ADD ROW
// function addRow() {
//   const myParent = document.querySelector("#content");
//   const myRow = buildRow(colCount, "harry+potter"); 
//   myParent.insertAdjacentElement("afterbegin", myRow);
// }
// Refactored this to work with new buildRow().
// Please have another look at async functions,
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
// but in a nut shell, buildRow() returns a promise
// once the promise is resolved, we can access the
// function's return value in res.
// Also, please notice the use of prepend(),
// this is just the opposite of appendChild(),
// so we can keep our rows above the add button.


function addRow() {
  const myParent = document.querySelector("#content");
  buildRow(4, 'harry+potter').then(function (res) {
    myParent.prepend(res);
  });
} // EVENT LISTENER FOR ADD ROW


const myAddButton = document.querySelector("#js-add-row");

myAddButton.onclick = function () {
  addRow();
};
},{}],"index.js":[function(require,module,exports) {
"use strict";

require("./style.scss");

require('./boxes.js');
},{"./style.scss":"style.scss","./boxes.js":"boxes.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52014" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/index.js.map