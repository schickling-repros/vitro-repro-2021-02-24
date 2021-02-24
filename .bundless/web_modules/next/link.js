import {
  define_process_env_default
} from "../chunk.F4W7POXN.js";
import {
  __commonJS,
  require_react
} from "../chunk.5WIEEEZY.js";

// node_modules/@babel/runtime/helpers/typeof.js
var require_typeof = __commonJS((exports, module) => {
  function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      module.exports = _typeof = function _typeof2(obj2) {
        return typeof obj2;
      };
    } else {
      module.exports = _typeof = function _typeof2(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  module.exports = _typeof;
});

// node_modules/@babel/runtime/helpers/interopRequireWildcard.js
var require_interopRequireWildcard = __commonJS((exports, module) => {
  var _typeof = require_typeof();
  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function")
      return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function _getRequireWildcardCache2() {
      return cache;
    };
    return cache;
  }
  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
      return {
        default: obj
      };
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj["default"] = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  module.exports = _interopRequireWildcard;
});

// node_modules/next/dist/client/normalize-trailing-slash.js
var require_normalize_trailing_slash = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.removePathTrailingSlash = removePathTrailingSlash;
  exports.normalizePathTrailingSlash = void 0;
  function removePathTrailingSlash(path) {
    return path.endsWith("/") && path !== "/" ? path.slice(0, -1) : path;
  }
  var normalizePathTrailingSlash = define_process_env_default.__NEXT_TRAILING_SLASH ? (path) => {
    if (/\.[^/]+\/?$/.test(path)) {
      return removePathTrailingSlash(path);
    } else if (path.endsWith("/")) {
      return path;
    } else {
      return path + "/";
    }
  } : removePathTrailingSlash;
  exports.normalizePathTrailingSlash = normalizePathTrailingSlash;
});

// node_modules/@babel/runtime/helpers/interopRequireDefault.js
var require_interopRequireDefault = __commonJS((exports, module) => {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  module.exports = _interopRequireDefault;
});

// node_modules/next/dist/next-server/lib/router/utils/get-asset-path-from-route.js
var require_get_asset_path_from_route = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.default = getAssetPathFromRoute;
  function getAssetPathFromRoute(route, ext = "") {
    const path = route === "/" ? "/index" : /^\/index(\/|$)/.test(route) ? `/index${route}` : `${route}`;
    return path + ext;
  }
});

// node_modules/next/dist/client/request-idle-callback.js
var require_request_idle_callback = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.cancelIdleCallback = exports.requestIdleCallback = void 0;
  var requestIdleCallback = typeof self !== "undefined" && self.requestIdleCallback || function(cb) {
    let start = Date.now();
    return setTimeout(function() {
      cb({didTimeout: false, timeRemaining: function() {
        return Math.max(0, 50 - (Date.now() - start));
      }});
    }, 1);
  };
  exports.requestIdleCallback = requestIdleCallback;
  var cancelIdleCallback = typeof self !== "undefined" && self.cancelIdleCallback || function(id) {
    return clearTimeout(id);
  };
  exports.cancelIdleCallback = cancelIdleCallback;
});

// node_modules/next/dist/client/route-loader.js
var require_route_loader = __commonJS((exports) => {
  "use strict";
  var _interopRequireDefault = require_interopRequireDefault();
  exports.__esModule = true;
  exports.markAssetError = markAssetError;
  exports.isAssetError = isAssetError;
  exports.getClientBuildManifest = getClientBuildManifest;
  exports.default = void 0;
  var _getAssetPathFromRoute = _interopRequireDefault(require_get_asset_path_from_route());
  var _requestIdleCallback = require_request_idle_callback();
  var MS_MAX_IDLE_DELAY = 3800;
  function withFuture(key, map, generator) {
    let entry = map.get(key);
    if (entry) {
      if ("future" in entry) {
        return entry.future;
      }
      return Promise.resolve(entry);
    }
    let resolver;
    const prom = new Promise((resolve) => {
      resolver = resolve;
    });
    map.set(key, entry = {resolve: resolver, future: prom});
    return generator ? generator().then((value) => (resolver(value), value)) : prom;
  }
  function hasPrefetch(link) {
    try {
      link = document.createElement("link");
      return !!window.MSInputMethodContext && !!document.documentMode || link.relList.supports("prefetch");
    } catch (_unused) {
      return false;
    }
  }
  var canPrefetch = hasPrefetch();
  function prefetchViaDom(href, as, link) {
    return new Promise((res, rej) => {
      if (document.querySelector(`link[rel="prefetch"][href^="${href}"]`)) {
        return res();
      }
      link = document.createElement("link");
      if (as)
        link.as = as;
      link.rel = `prefetch`;
      link.crossOrigin = define_process_env_default.__NEXT_CROSS_ORIGIN;
      link.onload = res;
      link.onerror = rej;
      link.href = href;
      document.head.appendChild(link);
    });
  }
  var ASSET_LOAD_ERROR = Symbol("ASSET_LOAD_ERROR");
  function markAssetError(err) {
    return Object.defineProperty(err, ASSET_LOAD_ERROR, {});
  }
  function isAssetError(err) {
    return err && ASSET_LOAD_ERROR in err;
  }
  function appendScript(src, script) {
    return new Promise((resolve, reject) => {
      script = document.createElement("script");
      script.onload = resolve;
      script.onerror = () => reject(markAssetError(new Error(`Failed to load script: ${src}`)));
      script.crossOrigin = define_process_env_default.__NEXT_CROSS_ORIGIN;
      script.src = src;
      document.body.appendChild(script);
    });
  }
  function idleTimeout(ms, err) {
    return new Promise((_resolve, reject) => (0, _requestIdleCallback.requestIdleCallback)(() => setTimeout(() => reject(err), ms)));
  }
  function getClientBuildManifest() {
    if (self.__BUILD_MANIFEST) {
      return Promise.resolve(self.__BUILD_MANIFEST);
    }
    const onBuildManifest = new Promise((resolve) => {
      const cb = self.__BUILD_MANIFEST_CB;
      self.__BUILD_MANIFEST_CB = () => {
        resolve(self.__BUILD_MANIFEST);
        cb && cb();
      };
    });
    return Promise.race([onBuildManifest, idleTimeout(MS_MAX_IDLE_DELAY, markAssetError(new Error("Failed to load client build manifest")))]);
  }
  function getFilesForRoute(assetPrefix, route) {
    if (true) {
      return Promise.resolve({
        scripts: [assetPrefix + "/_next/static/chunks/pages" + encodeURI((0, _getAssetPathFromRoute.default)(route, ".js"))],
        css: []
      });
    }
    return getClientBuildManifest().then((manifest) => {
      if (!(route in manifest)) {
        throw markAssetError(new Error(`Failed to lookup route: ${route}`));
      }
      const allFiles = manifest[route].map((entry) => assetPrefix + "/_next/" + encodeURI(entry));
      return {scripts: allFiles.filter((v) => v.endsWith(".js")), css: allFiles.filter((v) => v.endsWith(".css"))};
    });
  }
  function createRouteLoader(assetPrefix) {
    const entrypoints = new Map();
    const loadedScripts = new Map();
    const styleSheets = new Map();
    const routes = new Map();
    function maybeExecuteScript(src) {
      let prom = loadedScripts.get(src);
      if (prom) {
        return prom;
      }
      if (document.querySelector(`script[src^="${src}"]`)) {
        return Promise.resolve();
      }
      loadedScripts.set(src, prom = appendScript(src));
      return prom;
    }
    function fetchStyleSheet(href) {
      let prom = styleSheets.get(href);
      if (prom) {
        return prom;
      }
      styleSheets.set(href, prom = fetch(href).then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load stylesheet: ${href}`);
        }
        return res.text().then((text) => ({href, content: text}));
      }).catch((err) => {
        throw markAssetError(err);
      }));
      return prom;
    }
    return {whenEntrypoint(route) {
      return withFuture(route, entrypoints);
    }, onEntrypoint(route, execute) {
      Promise.resolve(execute).then((fn) => fn()).then((exports2) => ({component: exports2 && exports2.default || exports2, exports: exports2}), (err) => ({error: err})).then((input) => {
        const old = entrypoints.get(route);
        entrypoints.set(route, input);
        if (old && "resolve" in old)
          old.resolve(input);
      });
    }, loadRoute(route) {
      return withFuture(route, routes, async () => {
        try {
          const {scripts, css} = await getFilesForRoute(assetPrefix, route);
          const [, styles] = await Promise.all([entrypoints.has(route) ? [] : Promise.all(scripts.map(maybeExecuteScript)), Promise.all(css.map(fetchStyleSheet))]);
          const entrypoint = await Promise.race([this.whenEntrypoint(route), idleTimeout(MS_MAX_IDLE_DELAY, markAssetError(new Error(`Route did not complete loading: ${route}`)))]);
          const res = Object.assign({styles}, entrypoint);
          return "error" in entrypoint ? entrypoint : res;
        } catch (err) {
          return {error: err};
        }
      });
    }, prefetch(route) {
      let cn;
      if (cn = navigator.connection) {
        if (cn.saveData || /2g/.test(cn.effectiveType))
          return Promise.resolve();
      }
      return getFilesForRoute(assetPrefix, route).then((output) => Promise.all(canPrefetch ? output.scripts.map((script) => prefetchViaDom(script, "script")) : [])).then(() => {
        (0, _requestIdleCallback.requestIdleCallback)(() => this.loadRoute(route));
      }).catch(() => {
      });
    }};
  }
  var _default = createRouteLoader;
  exports.default = _default;
});

// node_modules/next/dist/next-server/server/denormalize-page-path.js
var require_denormalize_page_path = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.normalizePathSep = normalizePathSep;
  exports.denormalizePagePath = denormalizePagePath;
  function normalizePathSep(path) {
    return path.replace(/\\/g, "/");
  }
  function denormalizePagePath(page) {
    page = normalizePathSep(page);
    if (page.startsWith("/index/")) {
      page = page.slice(6);
    } else if (page === "/index") {
      page = "/";
    }
    return page;
  }
});

// node_modules/next/dist/next-server/lib/i18n/normalize-locale-path.js
var require_normalize_locale_path = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.normalizeLocalePath = normalizeLocalePath;
  function normalizeLocalePath(pathname, locales) {
    let detectedLocale;
    const pathnameParts = pathname.split("/");
    (locales || []).some((locale) => {
      if (pathnameParts[1].toLowerCase() === locale.toLowerCase()) {
        detectedLocale = locale;
        pathnameParts.splice(1, 1);
        pathname = pathnameParts.join("/") || "/";
        return true;
      }
      return false;
    });
    return {pathname, detectedLocale};
  }
});

// node_modules/next/dist/next-server/lib/mitt.js
var require_mitt = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.default = mitt;
  function mitt() {
    const all = Object.create(null);
    return {on(type, handler) {
      ;
      (all[type] || (all[type] = [])).push(handler);
    }, off(type, handler) {
      if (all[type]) {
        all[type].splice(all[type].indexOf(handler) >>> 0, 1);
      }
    }, emit(type, ...evts) {
      ;
      (all[type] || []).slice().map((handler) => {
        handler(...evts);
      });
    }};
  }
});

// node_modules/next/dist/next-server/lib/router/utils/querystring.js
var require_querystring = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.searchParamsToUrlQuery = searchParamsToUrlQuery;
  exports.urlQueryToSearchParams = urlQueryToSearchParams;
  exports.assign = assign;
  function searchParamsToUrlQuery(searchParams) {
    const query = {};
    searchParams.forEach((value, key) => {
      if (typeof query[key] === "undefined") {
        query[key] = value;
      } else if (Array.isArray(query[key])) {
        ;
        query[key].push(value);
      } else {
        query[key] = [query[key], value];
      }
    });
    return query;
  }
  function stringifyUrlQueryParam(param) {
    if (typeof param === "string" || typeof param === "number" && !isNaN(param) || typeof param === "boolean") {
      return String(param);
    } else {
      return "";
    }
  }
  function urlQueryToSearchParams(urlQuery) {
    const result = new URLSearchParams();
    Object.entries(urlQuery).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => result.append(key, stringifyUrlQueryParam(item)));
      } else {
        result.set(key, stringifyUrlQueryParam(value));
      }
    });
    return result;
  }
  function assign(target, ...searchParamsList) {
    searchParamsList.forEach((searchParams) => {
      Array.from(searchParams.keys()).forEach((key) => target.delete(key));
      searchParams.forEach((value, key) => target.append(key, value));
    });
    return target;
  }
});

// node_modules/next/dist/next-server/lib/router/utils/format-url.js
var require_format_url = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.formatUrl = formatUrl;
  var querystring = _interopRequireWildcard(require_querystring());
  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function")
      return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function() {
      return cache;
    };
    return cache;
  }
  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  var slashedProtocols = /https?|ftp|gopher|file/;
  function formatUrl(urlObj) {
    let {auth, hostname} = urlObj;
    let protocol = urlObj.protocol || "";
    let pathname = urlObj.pathname || "";
    let hash = urlObj.hash || "";
    let query = urlObj.query || "";
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ":") + "@" : "";
    if (urlObj.host) {
      host = auth + urlObj.host;
    } else if (hostname) {
      host = auth + (~hostname.indexOf(":") ? `[${hostname}]` : hostname);
      if (urlObj.port) {
        host += ":" + urlObj.port;
      }
    }
    if (query && typeof query === "object") {
      query = String(querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || "";
    if (protocol && protocol.substr(-1) !== ":")
      protocol += ":";
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
      host = "//" + (host || "");
      if (pathname && pathname[0] !== "/")
        pathname = "/" + pathname;
    } else if (!host) {
      host = "";
    }
    if (hash && hash[0] !== "#")
      hash = "#" + hash;
    if (search && search[0] !== "?")
      search = "?" + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace("#", "%23");
    return `${protocol}${host}${pathname}${search}${hash}`;
  }
});

// node_modules/next/dist/next-server/lib/utils.js
var require_utils = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.execOnce = execOnce;
  exports.getLocationOrigin = getLocationOrigin;
  exports.getURL = getURL;
  exports.getDisplayName = getDisplayName;
  exports.isResSent = isResSent;
  exports.loadGetInitialProps = loadGetInitialProps;
  exports.formatWithValidation = formatWithValidation;
  exports.ST = exports.SP = exports.urlObjectKeys = void 0;
  var _formatUrl = require_format_url();
  function execOnce(fn) {
    let used = false;
    let result;
    return (...args) => {
      if (!used) {
        used = true;
        result = fn(...args);
      }
      return result;
    };
  }
  function getLocationOrigin() {
    const {protocol, hostname, port} = window.location;
    return `${protocol}//${hostname}${port ? ":" + port : ""}`;
  }
  function getURL() {
    const {href} = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
  }
  function getDisplayName(Component) {
    return typeof Component === "string" ? Component : Component.displayName || Component.name || "Unknown";
  }
  function isResSent(res) {
    return res.finished || res.headersSent;
  }
  async function loadGetInitialProps(App, ctx) {
    if (true) {
      var _App$prototype;
      if ((_App$prototype = App.prototype) != null && _App$prototype.getInitialProps) {
        const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://err.sh/vercel/next.js/get-initial-props-as-an-instance-method for more information.`;
        throw new Error(message);
      }
    }
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
      if (ctx.ctx && ctx.Component) {
        return {pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)};
      }
      return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
      return props;
    }
    if (!props) {
      const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
      throw new Error(message);
    }
    if (true) {
      if (Object.keys(props).length === 0 && !ctx.ctx) {
        console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://err.sh/vercel/next.js/empty-object-getInitialProps`);
      }
    }
    return props;
  }
  var urlObjectKeys = ["auth", "hash", "host", "hostname", "href", "path", "pathname", "port", "protocol", "query", "search", "slashes"];
  exports.urlObjectKeys = urlObjectKeys;
  function formatWithValidation(url) {
    if (true) {
      if (url !== null && typeof url === "object") {
        Object.keys(url).forEach((key) => {
          if (urlObjectKeys.indexOf(key) === -1) {
            console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
          }
        });
      }
    }
    return (0, _formatUrl.formatUrl)(url);
  }
  var SP = typeof performance !== "undefined";
  exports.SP = SP;
  var ST = SP && typeof performance.mark === "function" && typeof performance.measure === "function";
  exports.ST = ST;
});

// node_modules/next/dist/next-server/lib/router/utils/is-dynamic.js
var require_is_dynamic = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.isDynamicRoute = isDynamicRoute;
  var TEST_ROUTE = /\/\[[^/]+?\](?=\/|$)/;
  function isDynamicRoute(route) {
    return TEST_ROUTE.test(route);
  }
});

// node_modules/next/dist/next-server/lib/router/utils/parse-relative-url.js
var require_parse_relative_url = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.parseRelativeUrl = parseRelativeUrl;
  var _utils = require_utils();
  var _querystring = require_querystring();
  function parseRelativeUrl(url, base) {
    const globalBase = new URL(typeof window === "undefined" ? "http://n" : (0, _utils.getLocationOrigin)());
    const resolvedBase = base ? new URL(base, globalBase) : globalBase;
    const {pathname, searchParams, search, hash, href, origin} = new URL(url, resolvedBase);
    if (origin !== globalBase.origin) {
      throw new Error(`invariant: invalid relative URL, router received ${url}`);
    }
    return {pathname, query: (0, _querystring.searchParamsToUrlQuery)(searchParams), search, hash, href: href.slice(globalBase.origin.length)};
  }
});

// node_modules/next/dist/compiled/path-to-regexp/index.js
var require_path_to_regexp = __commonJS((exports) => {
  "use strict";
  Object.defineProperty(exports, "__esModule", {value: true});
  function lexer(str) {
    var tokens = [];
    var i = 0;
    while (i < str.length) {
      var char = str[i];
      if (char === "*" || char === "+" || char === "?") {
        tokens.push({type: "MODIFIER", index: i, value: str[i++]});
        continue;
      }
      if (char === "\\") {
        tokens.push({type: "ESCAPED_CHAR", index: i++, value: str[i++]});
        continue;
      }
      if (char === "{") {
        tokens.push({type: "OPEN", index: i, value: str[i++]});
        continue;
      }
      if (char === "}") {
        tokens.push({type: "CLOSE", index: i, value: str[i++]});
        continue;
      }
      if (char === ":") {
        var name = "";
        var j = i + 1;
        while (j < str.length) {
          var code = str.charCodeAt(j);
          if (code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95) {
            name += str[j++];
            continue;
          }
          break;
        }
        if (!name)
          throw new TypeError("Missing parameter name at " + i);
        tokens.push({type: "NAME", index: i, value: name});
        i = j;
        continue;
      }
      if (char === "(") {
        var count = 1;
        var pattern = "";
        var j = i + 1;
        if (str[j] === "?") {
          throw new TypeError('Pattern cannot start with "?" at ' + j);
        }
        while (j < str.length) {
          if (str[j] === "\\") {
            pattern += str[j++] + str[j++];
            continue;
          }
          if (str[j] === ")") {
            count--;
            if (count === 0) {
              j++;
              break;
            }
          } else if (str[j] === "(") {
            count++;
            if (str[j + 1] !== "?") {
              throw new TypeError("Capturing groups are not allowed at " + j);
            }
          }
          pattern += str[j++];
        }
        if (count)
          throw new TypeError("Unbalanced pattern at " + i);
        if (!pattern)
          throw new TypeError("Missing pattern at " + i);
        tokens.push({type: "PATTERN", index: i, value: pattern});
        i = j;
        continue;
      }
      tokens.push({type: "CHAR", index: i, value: str[i++]});
    }
    tokens.push({type: "END", index: i, value: ""});
    return tokens;
  }
  function parse(str, options) {
    if (options === void 0) {
      options = {};
    }
    var tokens = lexer(str);
    var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a;
    var defaultPattern = "[^" + escapeString(options.delimiter || "/#?") + "]+?";
    var result = [];
    var key = 0;
    var i = 0;
    var path = "";
    var tryConsume = function(type) {
      if (i < tokens.length && tokens[i].type === type)
        return tokens[i++].value;
    };
    var mustConsume = function(type) {
      var value2 = tryConsume(type);
      if (value2 !== void 0)
        return value2;
      var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
      throw new TypeError("Unexpected " + nextType + " at " + index + ", expected " + type);
    };
    var consumeText = function() {
      var result2 = "";
      var value2;
      while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
        result2 += value2;
      }
      return result2;
    };
    while (i < tokens.length) {
      var char = tryConsume("CHAR");
      var name = tryConsume("NAME");
      var pattern = tryConsume("PATTERN");
      if (name || pattern) {
        var prefix = char || "";
        if (prefixes.indexOf(prefix) === -1) {
          path += prefix;
          prefix = "";
        }
        if (path) {
          result.push(path);
          path = "";
        }
        result.push({
          name: name || key++,
          prefix,
          suffix: "",
          pattern: pattern || defaultPattern,
          modifier: tryConsume("MODIFIER") || ""
        });
        continue;
      }
      var value = char || tryConsume("ESCAPED_CHAR");
      if (value) {
        path += value;
        continue;
      }
      if (path) {
        result.push(path);
        path = "";
      }
      var open = tryConsume("OPEN");
      if (open) {
        var prefix = consumeText();
        var name_1 = tryConsume("NAME") || "";
        var pattern_1 = tryConsume("PATTERN") || "";
        var suffix = consumeText();
        mustConsume("CLOSE");
        result.push({
          name: name_1 || (pattern_1 ? key++ : ""),
          pattern: name_1 && !pattern_1 ? defaultPattern : pattern_1,
          prefix,
          suffix,
          modifier: tryConsume("MODIFIER") || ""
        });
        continue;
      }
      mustConsume("END");
    }
    return result;
  }
  exports.parse = parse;
  function compile(str, options) {
    return tokensToFunction(parse(str, options), options);
  }
  exports.compile = compile;
  function tokensToFunction(tokens, options) {
    if (options === void 0) {
      options = {};
    }
    var reFlags = flags(options);
    var _a = options.encode, encode = _a === void 0 ? function(x) {
      return x;
    } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
    var matches = tokens.map(function(token) {
      if (typeof token === "object") {
        return new RegExp("^(?:" + token.pattern + ")$", reFlags);
      }
    });
    return function(data) {
      var path = "";
      for (var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        if (typeof token === "string") {
          path += token;
          continue;
        }
        var value = data ? data[token.name] : void 0;
        var optional = token.modifier === "?" || token.modifier === "*";
        var repeat = token.modifier === "*" || token.modifier === "+";
        if (Array.isArray(value)) {
          if (!repeat) {
            throw new TypeError('Expected "' + token.name + '" to not repeat, but got an array');
          }
          if (value.length === 0) {
            if (optional)
              continue;
            throw new TypeError('Expected "' + token.name + '" to not be empty');
          }
          for (var j = 0; j < value.length; j++) {
            var segment = encode(value[j], token);
            if (validate && !matches[i].test(segment)) {
              throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
            }
            path += token.prefix + segment + token.suffix;
          }
          continue;
        }
        if (typeof value === "string" || typeof value === "number") {
          var segment = encode(String(value), token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but got "' + segment + '"');
          }
          path += token.prefix + segment + token.suffix;
          continue;
        }
        if (optional)
          continue;
        var typeOfMessage = repeat ? "an array" : "a string";
        throw new TypeError('Expected "' + token.name + '" to be ' + typeOfMessage);
      }
      return path;
    };
  }
  exports.tokensToFunction = tokensToFunction;
  function match(str, options) {
    var keys = [];
    var re = pathToRegexp(str, keys, options);
    return regexpToFunction(re, keys, options);
  }
  exports.match = match;
  function regexpToFunction(re, keys, options) {
    if (options === void 0) {
      options = {};
    }
    var _a = options.decode, decode = _a === void 0 ? function(x) {
      return x;
    } : _a;
    return function(pathname) {
      var m = re.exec(pathname);
      if (!m)
        return false;
      var path = m[0], index = m.index;
      var params = Object.create(null);
      var _loop_1 = function(i2) {
        if (m[i2] === void 0)
          return "continue";
        var key = keys[i2 - 1];
        if (key.modifier === "*" || key.modifier === "+") {
          params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
            return decode(value, key);
          });
        } else {
          params[key.name] = decode(m[i2], key);
        }
      };
      for (var i = 1; i < m.length; i++) {
        _loop_1(i);
      }
      return {path, index, params};
    };
  }
  exports.regexpToFunction = regexpToFunction;
  function escapeString(str) {
    return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
  }
  function flags(options) {
    return options && options.sensitive ? "" : "i";
  }
  function regexpToRegexp(path, keys) {
    if (!keys)
      return path;
    var groups = path.source.match(/\((?!\?)/g);
    if (groups) {
      for (var i = 0; i < groups.length; i++) {
        keys.push({
          name: i,
          prefix: "",
          suffix: "",
          modifier: "",
          pattern: ""
        });
      }
    }
    return path;
  }
  function arrayToRegexp(paths, keys, options) {
    var parts = paths.map(function(path) {
      return pathToRegexp(path, keys, options).source;
    });
    return new RegExp("(?:" + parts.join("|") + ")", flags(options));
  }
  function stringToRegexp(path, keys, options) {
    return tokensToRegexp(parse(path, options), keys, options);
  }
  function tokensToRegexp(tokens, keys, options) {
    if (options === void 0) {
      options = {};
    }
    var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
      return x;
    } : _d;
    var endsWith = "[" + escapeString(options.endsWith || "") + "]|$";
    var delimiter = "[" + escapeString(options.delimiter || "/#?") + "]";
    var route = start ? "^" : "";
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
      var token = tokens_1[_i];
      if (typeof token === "string") {
        route += escapeString(encode(token));
      } else {
        var prefix = escapeString(encode(token.prefix));
        var suffix = escapeString(encode(token.suffix));
        if (token.pattern) {
          if (keys)
            keys.push(token);
          if (prefix || suffix) {
            if (token.modifier === "+" || token.modifier === "*") {
              var mod = token.modifier === "*" ? "?" : "";
              route += "(?:" + prefix + "((?:" + token.pattern + ")(?:" + suffix + prefix + "(?:" + token.pattern + "))*)" + suffix + ")" + mod;
            } else {
              route += "(?:" + prefix + "(" + token.pattern + ")" + suffix + ")" + token.modifier;
            }
          } else {
            route += "(" + token.pattern + ")" + token.modifier;
          }
        } else {
          route += "(?:" + prefix + suffix + ")" + token.modifier;
        }
      }
    }
    if (end) {
      if (!strict)
        route += delimiter + "?";
      route += !options.endsWith ? "$" : "(?=" + endsWith + ")";
    } else {
      var endToken = tokens[tokens.length - 1];
      var isEndDelimited = typeof endToken === "string" ? delimiter.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
      if (!strict) {
        route += "(?:" + delimiter + "(?=" + endsWith + "))?";
      }
      if (!isEndDelimited) {
        route += "(?=" + delimiter + "|" + endsWith + ")";
      }
    }
    return new RegExp(route, flags(options));
  }
  exports.tokensToRegexp = tokensToRegexp;
  function pathToRegexp(path, keys, options) {
    if (path instanceof RegExp)
      return regexpToRegexp(path, keys);
    if (Array.isArray(path))
      return arrayToRegexp(path, keys, options);
    return stringToRegexp(path, keys, options);
  }
  exports.pathToRegexp = pathToRegexp;
});

// node_modules/next/dist/next-server/lib/router/utils/path-match.js
var require_path_match = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.pathToRegexp = exports.default = exports.customRouteMatcherOptions = exports.matcherOptions = void 0;
  var pathToRegexp = _interopRequireWildcard(require_path_to_regexp());
  exports.pathToRegexp = pathToRegexp;
  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function")
      return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function() {
      return cache;
    };
    return cache;
  }
  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  var matcherOptions = {sensitive: false, delimiter: "/"};
  exports.matcherOptions = matcherOptions;
  var customRouteMatcherOptions = {...matcherOptions, strict: true};
  exports.customRouteMatcherOptions = customRouteMatcherOptions;
  var _default = (customRoute = false) => {
    return (path) => {
      const keys = [];
      const matcherRegex = pathToRegexp.pathToRegexp(path, keys, customRoute ? customRouteMatcherOptions : matcherOptions);
      const matcher = pathToRegexp.regexpToFunction(matcherRegex, keys);
      return (pathname, params) => {
        const res = pathname == null ? false : matcher(pathname);
        if (!res) {
          return false;
        }
        if (customRoute) {
          for (const key of keys) {
            if (typeof key.name === "number") {
              delete res.params[key.name];
            }
          }
        }
        return {...params, ...res.params};
      };
    };
  };
  exports.default = _default;
});

// node_modules/next/dist/next-server/lib/router/utils/prepare-destination.js
var require_prepare_destination = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.compileNonPath = compileNonPath;
  exports.default = prepareDestination;
  var _querystring = require_querystring();
  var _parseRelativeUrl = require_parse_relative_url();
  var pathToRegexp = _interopRequireWildcard(require_path_to_regexp());
  function _getRequireWildcardCache() {
    if (typeof WeakMap !== "function")
      return null;
    var cache = new WeakMap();
    _getRequireWildcardCache = function() {
      return cache;
    };
    return cache;
  }
  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache = _getRequireWildcardCache();
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  function compileNonPath(value, params) {
    if (!value.includes(":")) {
      return value;
    }
    for (const key of Object.keys(params)) {
      if (value.includes(`:${key}`)) {
        value = value.replace(new RegExp(`:${key}\\*`, "g"), `:${key}--ESCAPED_PARAM_ASTERISKS`).replace(new RegExp(`:${key}\\?`, "g"), `:${key}--ESCAPED_PARAM_QUESTION`).replace(new RegExp(`:${key}\\+`, "g"), `:${key}--ESCAPED_PARAM_PLUS`).replace(new RegExp(`:${key}(?!\\w)`, "g"), `--ESCAPED_PARAM_COLON${key}`);
      }
    }
    value = value.replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, "\\$1").replace(/--ESCAPED_PARAM_PLUS/g, "+").replace(/--ESCAPED_PARAM_COLON/g, ":").replace(/--ESCAPED_PARAM_QUESTION/g, "?").replace(/--ESCAPED_PARAM_ASTERISKS/g, "*");
    return pathToRegexp.compile(`/${value}`, {validate: false})(params).substr(1);
  }
  function prepareDestination(destination, params, query, appendParamsToQuery) {
    let parsedDestination = {};
    query = Object.assign({}, query);
    const hadLocale = query.__nextLocale;
    delete query.__nextLocale;
    delete query.__nextDefaultLocale;
    if (destination.startsWith("/")) {
      parsedDestination = (0, _parseRelativeUrl.parseRelativeUrl)(destination);
    } else {
      const {pathname, searchParams, hash, hostname, port, protocol, search, href} = new URL(destination);
      parsedDestination = {pathname, query: (0, _querystring.searchParamsToUrlQuery)(searchParams), hash, protocol, hostname, port, search, href};
    }
    const destQuery = parsedDestination.query;
    const destPath = `${parsedDestination.pathname}${parsedDestination.hash || ""}`;
    const destPathParamKeys = [];
    pathToRegexp.pathToRegexp(destPath, destPathParamKeys);
    const destPathParams = destPathParamKeys.map((key) => key.name);
    let destinationCompiler = pathToRegexp.compile(destPath, {validate: false});
    let newUrl;
    for (const [key, strOrArray] of Object.entries(destQuery)) {
      let value = Array.isArray(strOrArray) ? strOrArray[0] : strOrArray;
      if (value) {
        value = compileNonPath(value, params);
      }
      destQuery[key] = value;
    }
    let paramKeys = Object.keys(params);
    if (hadLocale) {
      paramKeys = paramKeys.filter((name) => name !== "nextInternalLocale");
    }
    if (appendParamsToQuery && !paramKeys.some((key) => destPathParams.includes(key))) {
      for (const key of paramKeys) {
        if (!(key in destQuery)) {
          destQuery[key] = params[key];
        }
      }
    }
    try {
      newUrl = destinationCompiler(params);
      const [pathname, hash] = newUrl.split("#");
      parsedDestination.pathname = pathname;
      parsedDestination.hash = `${hash ? "#" : ""}${hash || ""}`;
      delete parsedDestination.search;
    } catch (err) {
      if (err.message.match(/Expected .*? to not repeat, but got an array/)) {
        throw new Error(`To use a multi-match in the destination you must add \`*\` at the end of the param name to signify it should repeat. https://err.sh/vercel/next.js/invalid-multi-match`);
      }
      throw err;
    }
    parsedDestination.query = {...query, ...parsedDestination.query};
    return {newUrl, parsedDestination};
  }
});

// node_modules/next/dist/next-server/lib/router/utils/resolve-rewrites.js
var require_resolve_rewrites = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.default = resolveRewrites;
  var _pathMatch = _interopRequireDefault(require_path_match());
  var _prepareDestination = _interopRequireDefault(require_prepare_destination());
  var _normalizeTrailingSlash = require_normalize_trailing_slash();
  var _normalizeLocalePath = require_normalize_locale_path();
  var _parseRelativeUrl = require_parse_relative_url();
  var _router = require_router();
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var customRouteMatcher = (0, _pathMatch.default)(true);
  function resolveRewrites(asPath, pages, rewrites, query, resolveHref, locales) {
    let matchedPage = false;
    let parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(asPath);
    let fsPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _normalizeLocalePath.normalizeLocalePath)((0, _router.delBasePath)(parsedAs.pathname), locales).pathname);
    let resolvedHref;
    if (!pages.includes(fsPathname)) {
      for (const rewrite of rewrites) {
        const matcher = customRouteMatcher(rewrite.source);
        const params = matcher(parsedAs.pathname);
        if (params) {
          if (!rewrite.destination) {
            break;
          }
          const destRes = (0, _prepareDestination.default)(rewrite.destination, params, query, true);
          parsedAs = destRes.parsedDestination;
          asPath = destRes.newUrl;
          Object.assign(query, destRes.parsedDestination.query);
          fsPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _normalizeLocalePath.normalizeLocalePath)((0, _router.delBasePath)(asPath), locales).pathname);
          if (pages.includes(fsPathname)) {
            matchedPage = true;
            resolvedHref = fsPathname;
            break;
          }
          resolvedHref = resolveHref(fsPathname);
          if (resolvedHref !== asPath && pages.includes(resolvedHref)) {
            matchedPage = true;
            break;
          }
        }
      }
    }
    return {asPath, parsedAs, matchedPage, resolvedHref};
  }
});

// node_modules/next/dist/next-server/lib/router/utils/route-matcher.js
var require_route_matcher = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.getRouteMatcher = getRouteMatcher;
  function getRouteMatcher(routeRegex) {
    const {re, groups} = routeRegex;
    return (pathname) => {
      const routeMatch = re.exec(pathname);
      if (!routeMatch) {
        return false;
      }
      const decode = (param) => {
        try {
          return decodeURIComponent(param);
        } catch (_) {
          const err = new Error("failed to decode param");
          err.code = "DECODE_FAILED";
          throw err;
        }
      };
      const params = {};
      Object.keys(groups).forEach((slugName) => {
        const g = groups[slugName];
        const m = routeMatch[g.pos];
        if (m !== void 0) {
          params[slugName] = ~m.indexOf("/") ? m.split("/").map((entry) => decode(entry)) : g.repeat ? [decode(m)] : decode(m);
        }
      });
      return params;
    };
  }
});

// node_modules/next/dist/next-server/lib/router/utils/route-regex.js
var require_route_regex = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.getRouteRegex = getRouteRegex;
  function escapeRegex(str) {
    return str.replace(/[|\\{}()[\]^$+*?.-]/g, "\\$&");
  }
  function parseParameter(param) {
    const optional = param.startsWith("[") && param.endsWith("]");
    if (optional) {
      param = param.slice(1, -1);
    }
    const repeat = param.startsWith("...");
    if (repeat) {
      param = param.slice(3);
    }
    return {key: param, repeat, optional};
  }
  function getRouteRegex(normalizedRoute) {
    const segments = (normalizedRoute.replace(/\/$/, "") || "/").slice(1).split("/");
    const groups = {};
    let groupIndex = 1;
    const parameterizedRoute = segments.map((segment) => {
      if (segment.startsWith("[") && segment.endsWith("]")) {
        const {key, optional, repeat} = parseParameter(segment.slice(1, -1));
        groups[key] = {pos: groupIndex++, repeat, optional};
        return repeat ? optional ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
      } else {
        return `/${escapeRegex(segment)}`;
      }
    }).join("");
    if (typeof window === "undefined") {
      let routeKeyCharCode = 97;
      let routeKeyCharLength = 1;
      const getSafeRouteKey = () => {
        let routeKey = "";
        for (let i = 0; i < routeKeyCharLength; i++) {
          routeKey += String.fromCharCode(routeKeyCharCode);
          routeKeyCharCode++;
          if (routeKeyCharCode > 122) {
            routeKeyCharLength++;
            routeKeyCharCode = 97;
          }
        }
        return routeKey;
      };
      const routeKeys = {};
      let namedParameterizedRoute = segments.map((segment) => {
        if (segment.startsWith("[") && segment.endsWith("]")) {
          const {key, optional, repeat} = parseParameter(segment.slice(1, -1));
          let cleanedKey = key.replace(/\W/g, "");
          let invalidKey = false;
          if (cleanedKey.length === 0 || cleanedKey.length > 30) {
            invalidKey = true;
          }
          if (!isNaN(parseInt(cleanedKey.substr(0, 1)))) {
            invalidKey = true;
          }
          if (invalidKey) {
            cleanedKey = getSafeRouteKey();
          }
          routeKeys[cleanedKey] = key;
          return repeat ? optional ? `(?:/(?<${cleanedKey}>.+?))?` : `/(?<${cleanedKey}>.+?)` : `/(?<${cleanedKey}>[^/]+?)`;
        } else {
          return `/${escapeRegex(segment)}`;
        }
      }).join("");
      return {re: new RegExp(`^${parameterizedRoute}(?:/)?$`), groups, routeKeys, namedRegex: `^${namedParameterizedRoute}(?:/)?$`};
    }
    return {re: new RegExp(`^${parameterizedRoute}(?:/)?$`), groups};
  }
});

// node_modules/next/dist/next-server/lib/i18n/detect-domain-locale.js
var require_detect_domain_locale = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.detectDomainLocale = detectDomainLocale;
  function detectDomainLocale(domainItems, hostname, detectedLocale) {
    let domainItem;
    if (domainItems) {
      if (detectedLocale) {
        detectedLocale = detectedLocale.toLowerCase();
      }
      for (const item of domainItems) {
        var _item$domain, _item$locales;
        const domainHostname = (_item$domain = item.domain) == null ? void 0 : _item$domain.split(":")[0].toLowerCase();
        if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || (_item$locales = item.locales) != null && _item$locales.some((locale) => locale.toLowerCase() === detectedLocale)) {
          domainItem = item;
          break;
        }
      }
    }
    return domainItem;
  }
});

// node_modules/react-is/cjs/react-is.development.js
var require_react_is_development = __commonJS((exports) => {
  /** @license React v16.13.1
   * react-is.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  "use strict";
  if (true) {
    (function() {
      "use strict";
      var hasSymbol = typeof Symbol === "function" && Symbol.for;
      var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103;
      var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106;
      var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107;
      var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108;
      var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114;
      var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109;
      var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110;
      var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for("react.async_mode") : 60111;
      var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for("react.concurrent_mode") : 60111;
      var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112;
      var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113;
      var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for("react.suspense_list") : 60120;
      var REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115;
      var REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116;
      var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for("react.block") : 60121;
      var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for("react.fundamental") : 60117;
      var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for("react.responder") : 60118;
      var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for("react.scope") : 60119;
      function isValidElementType(type) {
        return typeof type === "string" || typeof type === "function" || type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === "object" && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
      }
      function typeOf(object) {
        if (typeof object === "object" && object !== null) {
          var $$typeof = object.$$typeof;
          switch ($$typeof) {
            case REACT_ELEMENT_TYPE:
              var type = object.type;
              switch (type) {
                case REACT_ASYNC_MODE_TYPE:
                case REACT_CONCURRENT_MODE_TYPE:
                case REACT_FRAGMENT_TYPE:
                case REACT_PROFILER_TYPE:
                case REACT_STRICT_MODE_TYPE:
                case REACT_SUSPENSE_TYPE:
                  return type;
                default:
                  var $$typeofType = type && type.$$typeof;
                  switch ($$typeofType) {
                    case REACT_CONTEXT_TYPE:
                    case REACT_FORWARD_REF_TYPE:
                    case REACT_LAZY_TYPE:
                    case REACT_MEMO_TYPE:
                    case REACT_PROVIDER_TYPE:
                      return $$typeofType;
                    default:
                      return $$typeof;
                  }
              }
            case REACT_PORTAL_TYPE:
              return $$typeof;
          }
        }
        return void 0;
      }
      var AsyncMode = REACT_ASYNC_MODE_TYPE;
      var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
      var ContextConsumer = REACT_CONTEXT_TYPE;
      var ContextProvider = REACT_PROVIDER_TYPE;
      var Element = REACT_ELEMENT_TYPE;
      var ForwardRef = REACT_FORWARD_REF_TYPE;
      var Fragment = REACT_FRAGMENT_TYPE;
      var Lazy = REACT_LAZY_TYPE;
      var Memo = REACT_MEMO_TYPE;
      var Portal = REACT_PORTAL_TYPE;
      var Profiler = REACT_PROFILER_TYPE;
      var StrictMode = REACT_STRICT_MODE_TYPE;
      var Suspense = REACT_SUSPENSE_TYPE;
      var hasWarnedAboutDeprecatedIsAsyncMode = false;
      function isAsyncMode(object) {
        {
          if (!hasWarnedAboutDeprecatedIsAsyncMode) {
            hasWarnedAboutDeprecatedIsAsyncMode = true;
            console["warn"]("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.");
          }
        }
        return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
      }
      function isConcurrentMode(object) {
        return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
      }
      function isContextConsumer(object) {
        return typeOf(object) === REACT_CONTEXT_TYPE;
      }
      function isContextProvider(object) {
        return typeOf(object) === REACT_PROVIDER_TYPE;
      }
      function isElement(object) {
        return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
      }
      function isForwardRef(object) {
        return typeOf(object) === REACT_FORWARD_REF_TYPE;
      }
      function isFragment(object) {
        return typeOf(object) === REACT_FRAGMENT_TYPE;
      }
      function isLazy(object) {
        return typeOf(object) === REACT_LAZY_TYPE;
      }
      function isMemo(object) {
        return typeOf(object) === REACT_MEMO_TYPE;
      }
      function isPortal(object) {
        return typeOf(object) === REACT_PORTAL_TYPE;
      }
      function isProfiler(object) {
        return typeOf(object) === REACT_PROFILER_TYPE;
      }
      function isStrictMode(object) {
        return typeOf(object) === REACT_STRICT_MODE_TYPE;
      }
      function isSuspense(object) {
        return typeOf(object) === REACT_SUSPENSE_TYPE;
      }
      exports.AsyncMode = AsyncMode;
      exports.ConcurrentMode = ConcurrentMode;
      exports.ContextConsumer = ContextConsumer;
      exports.ContextProvider = ContextProvider;
      exports.Element = Element;
      exports.ForwardRef = ForwardRef;
      exports.Fragment = Fragment;
      exports.Lazy = Lazy;
      exports.Memo = Memo;
      exports.Portal = Portal;
      exports.Profiler = Profiler;
      exports.StrictMode = StrictMode;
      exports.Suspense = Suspense;
      exports.isAsyncMode = isAsyncMode;
      exports.isConcurrentMode = isConcurrentMode;
      exports.isContextConsumer = isContextConsumer;
      exports.isContextProvider = isContextProvider;
      exports.isElement = isElement;
      exports.isForwardRef = isForwardRef;
      exports.isFragment = isFragment;
      exports.isLazy = isLazy;
      exports.isMemo = isMemo;
      exports.isPortal = isPortal;
      exports.isProfiler = isProfiler;
      exports.isStrictMode = isStrictMode;
      exports.isSuspense = isSuspense;
      exports.isValidElementType = isValidElementType;
      exports.typeOf = typeOf;
    })();
  }
});

// node_modules/react-is/index.js
var require_react_is = __commonJS((exports, module) => {
  "use strict";
  if (false) {
    module.exports = null;
  } else {
    module.exports = require_react_is_development();
  }
});

// node_modules/next/dist/next-server/lib/router/router.js
var require_router = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.getDomainLocale = getDomainLocale;
  exports.addLocale = addLocale;
  exports.delLocale = delLocale;
  exports.hasBasePath = hasBasePath;
  exports.addBasePath = addBasePath;
  exports.delBasePath = delBasePath;
  exports.isLocalURL = isLocalURL;
  exports.interpolateAs = interpolateAs;
  exports.resolveHref = resolveHref;
  exports.default = void 0;
  var _normalizeTrailingSlash = require_normalize_trailing_slash();
  var _routeLoader = require_route_loader();
  var _denormalizePagePath = require_denormalize_page_path();
  var _normalizeLocalePath = require_normalize_locale_path();
  var _mitt = _interopRequireDefault(require_mitt());
  var _utils = require_utils();
  var _isDynamic = require_is_dynamic();
  var _parseRelativeUrl = require_parse_relative_url();
  var _querystring = require_querystring();
  var _resolveRewrites = _interopRequireDefault(require_resolve_rewrites());
  var _routeMatcher = require_route_matcher();
  var _routeRegex = require_route_regex();
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var detectDomainLocale;
  if (define_process_env_default.__NEXT_I18N_SUPPORT) {
    detectDomainLocale = require_detect_domain_locale().detectDomainLocale;
  }
  var basePath = define_process_env_default.__NEXT_ROUTER_BASEPATH || "";
  function buildCancellationError() {
    return Object.assign(new Error("Route Cancelled"), {cancelled: true});
  }
  function addPathPrefix(path, prefix) {
    return prefix && path.startsWith("/") ? path === "/" ? (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(prefix) : `${prefix}${pathNoQueryHash(path) === "/" ? path.substring(1) : path}` : path;
  }
  function getDomainLocale(path, locale, locales, domainLocales) {
    if (define_process_env_default.__NEXT_I18N_SUPPORT) {
      locale = locale || (0, _normalizeLocalePath.normalizeLocalePath)(path, locales).detectedLocale;
      const detectedDomain = detectDomainLocale(domainLocales, void 0, locale);
      if (detectedDomain) {
        return `http${detectedDomain.http ? "" : "s"}://${detectedDomain.domain}${basePath || ""}${locale === detectedDomain.defaultLocale ? "" : `/${locale}`}${path}`;
      }
      return false;
    }
    return false;
  }
  function addLocale(path, locale, defaultLocale) {
    if (define_process_env_default.__NEXT_I18N_SUPPORT) {
      return locale && locale !== defaultLocale && !path.startsWith("/" + locale + "/") && path !== "/" + locale ? addPathPrefix(path, "/" + locale) : path;
    }
    return path;
  }
  function delLocale(path, locale) {
    if (define_process_env_default.__NEXT_I18N_SUPPORT) {
      return locale && (path.startsWith("/" + locale + "/") || path === "/" + locale) ? path.substr(locale.length + 1) || "/" : path;
    }
    return path;
  }
  function pathNoQueryHash(path) {
    const queryIndex = path.indexOf("?");
    const hashIndex = path.indexOf("#");
    if (queryIndex > -1 || hashIndex > -1) {
      path = path.substring(0, queryIndex > -1 ? queryIndex : hashIndex);
    }
    return path;
  }
  function hasBasePath(path) {
    path = pathNoQueryHash(path);
    return path === basePath || path.startsWith(basePath + "/");
  }
  function addBasePath(path) {
    return addPathPrefix(path, basePath);
  }
  function delBasePath(path) {
    path = path.slice(basePath.length);
    if (!path.startsWith("/"))
      path = `/${path}`;
    return path;
  }
  function isLocalURL(url) {
    if (url.startsWith("/") || url.startsWith("#"))
      return true;
    try {
      const locationOrigin = (0, _utils.getLocationOrigin)();
      const resolved = new URL(url, locationOrigin);
      return resolved.origin === locationOrigin && hasBasePath(resolved.pathname);
    } catch (_) {
      return false;
    }
  }
  function interpolateAs(route, asPathname, query) {
    let interpolatedRoute = "";
    const dynamicRegex = (0, _routeRegex.getRouteRegex)(route);
    const dynamicGroups = dynamicRegex.groups;
    const dynamicMatches = (asPathname !== route ? (0, _routeMatcher.getRouteMatcher)(dynamicRegex)(asPathname) : "") || query;
    interpolatedRoute = route;
    const params = Object.keys(dynamicGroups);
    if (!params.every((param) => {
      let value = dynamicMatches[param] || "";
      const {repeat, optional} = dynamicGroups[param];
      let replaced = `[${repeat ? "..." : ""}${param}]`;
      if (optional) {
        replaced = `${!value ? "/" : ""}[${replaced}]`;
      }
      if (repeat && !Array.isArray(value))
        value = [value];
      return (optional || param in dynamicMatches) && (interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map((segment) => encodeURIComponent(segment)).join("/") : encodeURIComponent(value)) || "/");
    })) {
      interpolatedRoute = "";
    }
    return {params, result: interpolatedRoute};
  }
  function omitParmsFromQuery(query, params) {
    const filteredQuery = {};
    Object.keys(query).forEach((key) => {
      if (!params.includes(key)) {
        filteredQuery[key] = query[key];
      }
    });
    return filteredQuery;
  }
  function resolveHref(currentPath, href, resolveAs) {
    const base = new URL(currentPath, "http://n");
    const urlAsString = typeof href === "string" ? href : (0, _utils.formatWithValidation)(href);
    if (!isLocalURL(urlAsString)) {
      return resolveAs ? [urlAsString] : urlAsString;
    }
    try {
      const finalUrl = new URL(urlAsString, base);
      finalUrl.pathname = (0, _normalizeTrailingSlash.normalizePathTrailingSlash)(finalUrl.pathname);
      let interpolatedAs = "";
      if ((0, _isDynamic.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
        const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
        const {result, params} = interpolateAs(finalUrl.pathname, finalUrl.pathname, query);
        if (result) {
          interpolatedAs = (0, _utils.formatWithValidation)({pathname: result, hash: finalUrl.hash, query: omitParmsFromQuery(query, params)});
        }
      }
      const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
      return resolveAs ? [resolvedHref, interpolatedAs || resolvedHref] : resolvedHref;
    } catch (_) {
      return resolveAs ? [urlAsString] : urlAsString;
    }
  }
  function stripOrigin(url) {
    const origin = (0, _utils.getLocationOrigin)();
    return url.startsWith(origin) ? url.substring(origin.length) : url;
  }
  function prepareUrlAs(router, url, as) {
    let [resolvedHref, resolvedAs] = resolveHref(router.pathname, url, true);
    const origin = (0, _utils.getLocationOrigin)();
    const hrefHadOrigin = resolvedHref.startsWith(origin);
    const asHadOrigin = resolvedAs && resolvedAs.startsWith(origin);
    resolvedHref = stripOrigin(resolvedHref);
    resolvedAs = resolvedAs ? stripOrigin(resolvedAs) : resolvedAs;
    const preparedUrl = hrefHadOrigin ? resolvedHref : addBasePath(resolvedHref);
    const preparedAs = as ? stripOrigin(resolveHref(router.pathname, as)) : resolvedAs || resolvedHref;
    return {url: preparedUrl, as: asHadOrigin ? preparedAs : addBasePath(preparedAs)};
  }
  var manualScrollRestoration = define_process_env_default.__NEXT_SCROLL_RESTORATION && typeof window !== "undefined" && "scrollRestoration" in window.history && !!function() {
    try {
      let v = "__next";
      return sessionStorage.setItem(v, v), sessionStorage.removeItem(v), true;
    } catch (n) {
    }
  }();
  var SSG_DATA_NOT_FOUND = Symbol("SSG_DATA_NOT_FOUND");
  function fetchRetry(url, attempts) {
    return fetch(url, {
      credentials: "same-origin"
    }).then((res) => {
      if (!res.ok) {
        if (attempts > 1 && res.status >= 500) {
          return fetchRetry(url, attempts - 1);
        }
        if (res.status === 404) {
          return res.json().then((data) => {
            if (data.notFound) {
              return {notFound: SSG_DATA_NOT_FOUND};
            }
            throw new Error(`Failed to load static props`);
          });
        }
        throw new Error(`Failed to load static props`);
      }
      return res.json();
    });
  }
  function fetchNextData(dataHref, isServerRender) {
    return fetchRetry(dataHref, isServerRender ? 3 : 1).catch((err) => {
      if (!isServerRender) {
        (0, _routeLoader.markAssetError)(err);
      }
      throw err;
    });
  }
  var Router = class {
    constructor(_pathname, _query, _as, {initialProps, pageLoader, App, wrapApp, Component, err, subscription, isFallback, locale, locales, defaultLocale, domainLocales}) {
      this.route = void 0;
      this.pathname = void 0;
      this.query = void 0;
      this.asPath = void 0;
      this.basePath = void 0;
      this.components = void 0;
      this.sdc = {};
      this.sub = void 0;
      this.clc = void 0;
      this.pageLoader = void 0;
      this._bps = void 0;
      this.events = void 0;
      this._wrapApp = void 0;
      this.isSsr = void 0;
      this.isFallback = void 0;
      this._inFlightRoute = void 0;
      this._shallow = void 0;
      this.locale = void 0;
      this.locales = void 0;
      this.defaultLocale = void 0;
      this.domainLocales = void 0;
      this.isReady = void 0;
      this.isLocaleDomain = void 0;
      this._idx = 0;
      this.onPopState = (e) => {
        const state = e.state;
        if (!state) {
          const {pathname: pathname2, query} = this;
          this.changeState("replaceState", (0, _utils.formatWithValidation)({pathname: addBasePath(pathname2), query}), (0, _utils.getURL)());
          return;
        }
        if (!state.__N) {
          return;
        }
        let forcedScroll;
        const {url, as, options, idx} = state;
        if (define_process_env_default.__NEXT_SCROLL_RESTORATION) {
          if (manualScrollRestoration) {
            if (this._idx !== idx) {
              try {
                sessionStorage.setItem("__next_scroll_" + this._idx, JSON.stringify({x: self.pageXOffset, y: self.pageYOffset}));
              } catch (_unused) {
              }
              try {
                const v = sessionStorage.getItem("__next_scroll_" + idx);
                forcedScroll = JSON.parse(v);
              } catch (_unused2) {
                forcedScroll = {x: 0, y: 0};
              }
            }
          }
        }
        this._idx = idx;
        const {pathname} = (0, _parseRelativeUrl.parseRelativeUrl)(url);
        if (this.isSsr && as === this.asPath && pathname === this.pathname) {
          return;
        }
        if (this._bps && !this._bps(state)) {
          return;
        }
        this.change("replaceState", url, as, Object.assign({}, options, {shallow: options.shallow && this._shallow, locale: options.locale || this.defaultLocale}), forcedScroll);
      };
      this.route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(_pathname);
      this.components = {};
      if (_pathname !== "/_error") {
        this.components[this.route] = {Component, initial: true, props: initialProps, err, __N_SSG: initialProps && initialProps.__N_SSG, __N_SSP: initialProps && initialProps.__N_SSP};
      }
      this.components["/_app"] = {Component: App, styleSheets: []};
      this.events = Router.events;
      this.pageLoader = pageLoader;
      this.pathname = _pathname;
      this.query = _query;
      const autoExportDynamic = (0, _isDynamic.isDynamicRoute)(_pathname) && self.__NEXT_DATA__.autoExport;
      this.asPath = autoExportDynamic ? _pathname : _as;
      this.basePath = basePath;
      this.sub = subscription;
      this.clc = null;
      this._wrapApp = wrapApp;
      this.isSsr = true;
      this.isFallback = isFallback;
      this.isReady = !!(self.__NEXT_DATA__.gssp || self.__NEXT_DATA__.gip || !autoExportDynamic && !self.location.search);
      this.isLocaleDomain = false;
      if (define_process_env_default.__NEXT_I18N_SUPPORT) {
        this.locale = locale;
        this.locales = locales;
        this.defaultLocale = defaultLocale;
        this.domainLocales = domainLocales;
        this.isLocaleDomain = !!detectDomainLocale(domainLocales, self.location.hostname);
      }
      if (typeof window !== "undefined") {
        if (_as.substr(0, 2) !== "//") {
          this.changeState("replaceState", (0, _utils.formatWithValidation)({pathname: addBasePath(_pathname), query: _query}), (0, _utils.getURL)(), {locale});
        }
        window.addEventListener("popstate", this.onPopState);
        if (define_process_env_default.__NEXT_SCROLL_RESTORATION) {
          if (manualScrollRestoration) {
            window.history.scrollRestoration = "manual";
          }
        }
      }
    }
    reload() {
      window.location.reload();
    }
    back() {
      window.history.back();
    }
    push(url, as, options = {}) {
      if (define_process_env_default.__NEXT_SCROLL_RESTORATION) {
        if (manualScrollRestoration) {
          try {
            sessionStorage.setItem("__next_scroll_" + this._idx, JSON.stringify({x: self.pageXOffset, y: self.pageYOffset}));
          } catch (_unused3) {
          }
        }
      }
      ;
      ({url, as} = prepareUrlAs(this, url, as));
      return this.change("pushState", url, as, options);
    }
    replace(url, as, options = {}) {
      ;
      ({url, as} = prepareUrlAs(this, url, as));
      return this.change("replaceState", url, as, options);
    }
    async change(method, url, as, options, forcedScroll) {
      var _options$scroll;
      if (!isLocalURL(url)) {
        window.location.href = url;
        return false;
      }
      if (options._h) {
        this.isReady = true;
      }
      options.scroll = !!((_options$scroll = options.scroll) != null ? _options$scroll : true);
      let localeChange = options.locale !== this.locale;
      if (define_process_env_default.__NEXT_I18N_SUPPORT) {
        this.locale = options.locale === false ? this.defaultLocale : options.locale || this.locale;
        if (typeof options.locale === "undefined") {
          options.locale = this.locale;
        }
        const parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(hasBasePath(as) ? delBasePath(as) : as);
        const localePathResult = (0, _normalizeLocalePath.normalizeLocalePath)(parsedAs.pathname, this.locales);
        if (localePathResult.detectedLocale) {
          this.locale = localePathResult.detectedLocale;
          parsedAs.pathname = addBasePath(parsedAs.pathname);
          as = (0, _utils.formatWithValidation)(parsedAs);
          url = addBasePath((0, _normalizeLocalePath.normalizeLocalePath)(hasBasePath(url) ? delBasePath(url) : url, this.locales).pathname);
        }
        let didNavigate = false;
        if (define_process_env_default.__NEXT_I18N_SUPPORT) {
          var _this$locales;
          if (!((_this$locales = this.locales) != null && _this$locales.includes(this.locale))) {
            parsedAs.pathname = addLocale(parsedAs.pathname, this.locale);
            window.location.href = (0, _utils.formatWithValidation)(parsedAs);
            didNavigate = true;
          }
        }
        const detectedDomain = detectDomainLocale(this.domainLocales, void 0, this.locale);
        if (define_process_env_default.__NEXT_I18N_SUPPORT) {
          if (!didNavigate && detectedDomain && this.isLocaleDomain && self.location.hostname !== detectedDomain.domain) {
            const asNoBasePath = delBasePath(as);
            window.location.href = `http${detectedDomain.http ? "" : "s"}://${detectedDomain.domain}${addBasePath(`${this.locale === detectedDomain.defaultLocale ? "" : `/${this.locale}`}${asNoBasePath === "/" ? "" : asNoBasePath}` || "/")}`;
            didNavigate = true;
          }
        }
        if (didNavigate) {
          return new Promise(() => {
          });
        }
      }
      if (!options._h) {
        this.isSsr = false;
      }
      if (_utils.ST) {
        performance.mark("routeChange");
      }
      const {shallow = false} = options;
      const routeProps = {shallow};
      if (this._inFlightRoute) {
        this.abortComponentLoad(this._inFlightRoute, routeProps);
      }
      as = addBasePath(addLocale(hasBasePath(as) ? delBasePath(as) : as, options.locale, this.defaultLocale));
      const cleanedAs = delLocale(hasBasePath(as) ? delBasePath(as) : as, this.locale);
      this._inFlightRoute = as;
      if (!options._h && this.onlyAHashChange(cleanedAs)) {
        this.asPath = cleanedAs;
        Router.events.emit("hashChangeStart", as, routeProps);
        this.changeState(method, url, as, options);
        this.scrollToHash(cleanedAs);
        this.notify(this.components[this.route], null);
        Router.events.emit("hashChangeComplete", as, routeProps);
        return true;
      }
      let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
      let {pathname, query} = parsed;
      let pages, rewrites;
      try {
        pages = await this.pageLoader.getPageList();
        ({__rewrites: rewrites} = await (0, _routeLoader.getClientBuildManifest)());
      } catch (err) {
        window.location.href = as;
        return false;
      }
      parsed = this._resolveHref(parsed, pages);
      if (parsed.pathname !== pathname) {
        pathname = parsed.pathname;
        url = (0, _utils.formatWithValidation)(parsed);
      }
      pathname = pathname ? (0, _normalizeTrailingSlash.removePathTrailingSlash)(delBasePath(pathname)) : pathname;
      if (!this.urlIsNew(cleanedAs) && !localeChange) {
        method = "replaceState";
      }
      let route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname);
      let resolvedAs = as;
      if (define_process_env_default.__NEXT_HAS_REWRITES && as.startsWith("/")) {
        const rewritesResult = (0, _resolveRewrites.default)(addBasePath(addLocale(delBasePath(as), this.locale)), pages, rewrites, query, (p) => this._resolveHref({pathname: p}, pages).pathname, this.locales);
        resolvedAs = rewritesResult.asPath;
        if (rewritesResult.matchedPage && rewritesResult.resolvedHref) {
          route = rewritesResult.resolvedHref;
          pathname = rewritesResult.resolvedHref;
          parsed.pathname = pathname;
          url = (0, _utils.formatWithValidation)(parsed);
        }
      }
      if (!isLocalURL(as)) {
        if (true) {
          throw new Error(`Invalid href: "${url}" and as: "${as}", received relative href and external as
See more info: https://err.sh/next.js/invalid-relative-url-external-as`);
        }
        window.location.href = as;
        return false;
      }
      resolvedAs = delLocale(delBasePath(resolvedAs), this.locale);
      if ((0, _isDynamic.isDynamicRoute)(route)) {
        const parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(resolvedAs);
        const asPathname = parsedAs.pathname;
        const routeRegex = (0, _routeRegex.getRouteRegex)(route);
        const routeMatch = (0, _routeMatcher.getRouteMatcher)(routeRegex)(asPathname);
        const shouldInterpolate = route === asPathname;
        const interpolatedAs = shouldInterpolate ? interpolateAs(route, asPathname, query) : {};
        if (!routeMatch || shouldInterpolate && !interpolatedAs.result) {
          const missingParams = Object.keys(routeRegex.groups).filter((param) => !query[param]);
          if (missingParams.length > 0) {
            if (true) {
              console.warn(`${shouldInterpolate ? `Interpolating href` : `Mismatching \`as\` and \`href\``} failed to manually provide the params: ${missingParams.join(", ")} in the \`href\`'s \`query\``);
            }
            throw new Error((shouldInterpolate ? `The provided \`href\` (${url}) value is missing query values (${missingParams.join(", ")}) to be interpolated properly. ` : `The provided \`as\` value (${asPathname}) is incompatible with the \`href\` value (${route}). `) + `Read more: https://err.sh/vercel/next.js/${shouldInterpolate ? "href-interpolation-failed" : "incompatible-href-as"}`);
          }
        } else if (shouldInterpolate) {
          as = (0, _utils.formatWithValidation)(Object.assign({}, parsedAs, {pathname: interpolatedAs.result, query: omitParmsFromQuery(query, interpolatedAs.params)}));
        } else {
          Object.assign(query, routeMatch);
        }
      }
      Router.events.emit("routeChangeStart", as, routeProps);
      try {
        let routeInfo = await this.getRouteInfo(route, pathname, query, as, resolvedAs, routeProps);
        let {error, props, __N_SSG, __N_SSP} = routeInfo;
        if ((__N_SSG || __N_SSP) && props) {
          if (props.pageProps && props.pageProps.__N_REDIRECT) {
            const destination = props.pageProps.__N_REDIRECT;
            if (destination.startsWith("/")) {
              const parsedHref = (0, _parseRelativeUrl.parseRelativeUrl)(destination);
              this._resolveHref(parsedHref, pages, false);
              if (pages.includes(parsedHref.pathname)) {
                const {url: newUrl, as: newAs} = prepareUrlAs(this, destination, destination);
                return this.change(method, newUrl, newAs, options);
              }
            }
            window.location.href = destination;
            return new Promise(() => {
            });
          }
          if (props.notFound === SSG_DATA_NOT_FOUND) {
            let notFoundRoute;
            try {
              await this.fetchComponent("/404");
              notFoundRoute = "/404";
            } catch (_) {
              notFoundRoute = "/_error";
            }
            routeInfo = await this.getRouteInfo(notFoundRoute, notFoundRoute, query, as, resolvedAs, {shallow: false});
          }
        }
        Router.events.emit("beforeHistoryChange", as, routeProps);
        this.changeState(method, url, as, options);
        if (true) {
          const appComp = this.components["/_app"].Component;
          window.next.isPrerendered = appComp.getInitialProps === appComp.origGetInitialProps && !routeInfo.Component.getInitialProps;
        }
        const isValidShallowRoute = options.shallow && this.route === route;
        await this.set(route, pathname, query, cleanedAs, routeInfo, forcedScroll || (isValidShallowRoute || !options.scroll ? null : {x: 0, y: 0})).catch((e) => {
          if (e.cancelled)
            error = error || e;
          else
            throw e;
        });
        if (error) {
          Router.events.emit("routeChangeError", error, cleanedAs, routeProps);
          throw error;
        }
        if (define_process_env_default.__NEXT_I18N_SUPPORT) {
          if (this.locale) {
            document.documentElement.lang = this.locale;
          }
        }
        Router.events.emit("routeChangeComplete", as, routeProps);
        return true;
      } catch (err) {
        if (err.cancelled) {
          return false;
        }
        throw err;
      }
    }
    changeState(method, url, as, options = {}) {
      if (true) {
        if (typeof window.history === "undefined") {
          console.error(`Warning: window.history is not available.`);
          return;
        }
        if (typeof window.history[method] === "undefined") {
          console.error(`Warning: window.history.${method} is not available`);
          return;
        }
      }
      if (method !== "pushState" || (0, _utils.getURL)() !== as) {
        this._shallow = options.shallow;
        window.history[method]({url, as, options, __N: true, idx: this._idx = method !== "pushState" ? this._idx : this._idx + 1}, "", as);
      }
    }
    async handleRouteInfoError(err, pathname, query, as, routeProps, loadErrorFail) {
      if (err.cancelled) {
        throw err;
      }
      if ((0, _routeLoader.isAssetError)(err) || loadErrorFail) {
        Router.events.emit("routeChangeError", err, as, routeProps);
        window.location.href = as;
        throw buildCancellationError();
      }
      try {
        let Component;
        let styleSheets;
        let props;
        if (typeof Component === "undefined" || typeof styleSheets === "undefined") {
          ;
          ({page: Component, styleSheets} = await this.fetchComponent("/_error"));
        }
        const routeInfo = {props, Component, styleSheets, err, error: err};
        if (!routeInfo.props) {
          try {
            routeInfo.props = await this.getInitialProps(Component, {err, pathname, query});
          } catch (gipErr) {
            console.error("Error in error page `getInitialProps`: ", gipErr);
            routeInfo.props = {};
          }
        }
        return routeInfo;
      } catch (routeInfoErr) {
        return this.handleRouteInfoError(routeInfoErr, pathname, query, as, routeProps, true);
      }
    }
    async getRouteInfo(route, pathname, query, as, resolvedAs, routeProps) {
      try {
        const existingRouteInfo = this.components[route];
        if (routeProps.shallow && existingRouteInfo && this.route === route) {
          return existingRouteInfo;
        }
        const cachedRouteInfo = existingRouteInfo && "initial" in existingRouteInfo ? void 0 : existingRouteInfo;
        const routeInfo = cachedRouteInfo ? cachedRouteInfo : await this.fetchComponent(route).then((res) => ({Component: res.page, styleSheets: res.styleSheets, __N_SSG: res.mod.__N_SSG, __N_SSP: res.mod.__N_SSP}));
        const {Component, __N_SSG, __N_SSP} = routeInfo;
        if (true) {
          const {isValidElementType} = require_react_is();
          if (!isValidElementType(Component)) {
            throw new Error(`The default export is not a React Component in page: "${pathname}"`);
          }
        }
        let dataHref;
        if (__N_SSG || __N_SSP) {
          dataHref = this.pageLoader.getDataHref((0, _utils.formatWithValidation)({pathname, query}), resolvedAs, __N_SSG, this.locale);
        }
        const props = await this._getData(() => __N_SSG ? this._getStaticData(dataHref) : __N_SSP ? this._getServerData(dataHref) : this.getInitialProps(Component, {pathname, query, asPath: as}));
        routeInfo.props = props;
        this.components[route] = routeInfo;
        return routeInfo;
      } catch (err) {
        return this.handleRouteInfoError(err, pathname, query, as, routeProps);
      }
    }
    set(route, pathname, query, as, data, resetScroll) {
      this.isFallback = false;
      this.route = route;
      this.pathname = pathname;
      this.query = query;
      this.asPath = as;
      return this.notify(data, resetScroll);
    }
    beforePopState(cb) {
      this._bps = cb;
    }
    onlyAHashChange(as) {
      if (!this.asPath)
        return false;
      const [oldUrlNoHash, oldHash] = this.asPath.split("#");
      const [newUrlNoHash, newHash] = as.split("#");
      if (newHash && oldUrlNoHash === newUrlNoHash && oldHash === newHash) {
        return true;
      }
      if (oldUrlNoHash !== newUrlNoHash) {
        return false;
      }
      return oldHash !== newHash;
    }
    scrollToHash(as) {
      const [, hash] = as.split("#");
      if (hash === "" || hash === "top") {
        window.scrollTo(0, 0);
        return;
      }
      const idEl = document.getElementById(hash);
      if (idEl) {
        idEl.scrollIntoView();
        return;
      }
      const nameEl = document.getElementsByName(hash)[0];
      if (nameEl) {
        nameEl.scrollIntoView();
      }
    }
    urlIsNew(asPath) {
      return this.asPath !== asPath;
    }
    _resolveHref(parsedHref, pages, applyBasePath = true) {
      const {pathname} = parsedHref;
      const cleanPathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)((0, _denormalizePagePath.denormalizePagePath)(applyBasePath ? delBasePath(pathname) : pathname));
      if (cleanPathname === "/404" || cleanPathname === "/_error") {
        return parsedHref;
      }
      if (!pages.includes(cleanPathname)) {
        pages.some((page) => {
          if ((0, _isDynamic.isDynamicRoute)(page) && (0, _routeRegex.getRouteRegex)(page).re.test(cleanPathname)) {
            parsedHref.pathname = applyBasePath ? addBasePath(page) : page;
            return true;
          }
        });
      }
      parsedHref.pathname = (0, _normalizeTrailingSlash.removePathTrailingSlash)(parsedHref.pathname);
      return parsedHref;
    }
    async prefetch(url, asPath = url, options = {}) {
      let parsed = (0, _parseRelativeUrl.parseRelativeUrl)(url);
      let {pathname} = parsed;
      if (define_process_env_default.__NEXT_I18N_SUPPORT) {
        if (options.locale === false) {
          pathname = (0, _normalizeLocalePath.normalizeLocalePath)(pathname, this.locales).pathname;
          parsed.pathname = pathname;
          url = (0, _utils.formatWithValidation)(parsed);
          let parsedAs = (0, _parseRelativeUrl.parseRelativeUrl)(asPath);
          const localePathResult = (0, _normalizeLocalePath.normalizeLocalePath)(parsedAs.pathname, this.locales);
          parsedAs.pathname = localePathResult.pathname;
          options.locale = localePathResult.detectedLocale || this.defaultLocale;
          asPath = (0, _utils.formatWithValidation)(parsedAs);
        }
      }
      const pages = await this.pageLoader.getPageList();
      parsed = this._resolveHref(parsed, pages, false);
      if (parsed.pathname !== pathname) {
        pathname = parsed.pathname;
        url = (0, _utils.formatWithValidation)(parsed);
      }
      if (true) {
        return;
      }
      const route = (0, _normalizeTrailingSlash.removePathTrailingSlash)(pathname);
      await Promise.all([this.pageLoader._isSsg(url).then((isSsg) => {
        return isSsg ? this._getStaticData(this.pageLoader.getDataHref(url, asPath, true, typeof options.locale !== "undefined" ? options.locale : this.locale)) : false;
      }), this.pageLoader[options.priority ? "loadPage" : "prefetch"](route)]);
    }
    async fetchComponent(route) {
      let cancelled = false;
      const cancel = this.clc = () => {
        cancelled = true;
      };
      const componentResult = await this.pageLoader.loadPage(route);
      if (cancelled) {
        const error = new Error(`Abort fetching component for route: "${route}"`);
        error.cancelled = true;
        throw error;
      }
      if (cancel === this.clc) {
        this.clc = null;
      }
      return componentResult;
    }
    _getData(fn) {
      let cancelled = false;
      const cancel = () => {
        cancelled = true;
      };
      this.clc = cancel;
      return fn().then((data) => {
        if (cancel === this.clc) {
          this.clc = null;
        }
        if (cancelled) {
          const err = new Error("Loading initial props cancelled");
          err.cancelled = true;
          throw err;
        }
        return data;
      });
    }
    _getStaticData(dataHref) {
      const {href: cacheKey} = new URL(dataHref, window.location.href);
      if (false) {
        return Promise.resolve(this.sdc[cacheKey]);
      }
      return fetchNextData(dataHref, this.isSsr).then((data) => {
        this.sdc[cacheKey] = data;
        return data;
      });
    }
    _getServerData(dataHref) {
      return fetchNextData(dataHref, this.isSsr);
    }
    getInitialProps(Component, ctx) {
      const {Component: App} = this.components["/_app"];
      const AppTree = this._wrapApp(App);
      ctx.AppTree = AppTree;
      return (0, _utils.loadGetInitialProps)(App, {AppTree, Component, router: this, ctx});
    }
    abortComponentLoad(as, routeProps) {
      if (this.clc) {
        Router.events.emit("routeChangeError", buildCancellationError(), as, routeProps);
        this.clc();
        this.clc = null;
      }
    }
    notify(data, resetScroll) {
      return this.sub(data, this.components["/_app"].Component, resetScroll);
    }
  };
  exports.default = Router;
  Router.events = (0, _mitt.default)();
});

// node_modules/next/dist/next-server/lib/router-context.js
var require_router_context = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.RouterContext = void 0;
  var _react = _interopRequireDefault(require_react());
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  var RouterContext = /* @__PURE__ */ _react.default.createContext(null);
  exports.RouterContext = RouterContext;
  if (true) {
    RouterContext.displayName = "RouterContext";
  }
});

// node_modules/next/dist/client/with-router.js
var require_with_router = __commonJS((exports) => {
  "use strict";
  var _interopRequireDefault = require_interopRequireDefault();
  exports.__esModule = true;
  exports.default = withRouter;
  var _react = _interopRequireDefault(require_react());
  var _router = require_router2();
  function withRouter(ComposedComponent) {
    function WithRouterWrapper(props) {
      return /* @__PURE__ */ _react.default.createElement(ComposedComponent, Object.assign({router: (0, _router.useRouter)()}, props));
    }
    WithRouterWrapper.getInitialProps = ComposedComponent.getInitialProps;
    WithRouterWrapper.origGetInitialProps = ComposedComponent.origGetInitialProps;
    if (true) {
      const name = ComposedComponent.displayName || ComposedComponent.name || "Unknown";
      WithRouterWrapper.displayName = `withRouter(${name})`;
    }
    return WithRouterWrapper;
  }
});

// node_modules/next/dist/client/router.js
var require_router2 = __commonJS((exports) => {
  "use strict";
  var _interopRequireWildcard = require_interopRequireWildcard();
  var _interopRequireDefault = require_interopRequireDefault();
  exports.__esModule = true;
  exports.useRouter = useRouter;
  exports.makePublicRouterInstance = makePublicRouterInstance;
  exports.createRouter = exports.withRouter = exports.default = void 0;
  var _react = _interopRequireDefault(require_react());
  var _router2 = _interopRequireWildcard(require_router());
  exports.Router = _router2.default;
  exports.NextRouter = _router2.NextRouter;
  var _routerContext = require_router_context();
  var _withRouter = _interopRequireDefault(require_with_router());
  exports.withRouter = _withRouter.default;
  var singletonRouter = {
    router: null,
    readyCallbacks: [],
    ready(cb) {
      if (this.router)
        return cb();
      if (typeof window !== "undefined") {
        this.readyCallbacks.push(cb);
      }
    }
  };
  var urlPropertyFields = ["pathname", "route", "query", "asPath", "components", "isFallback", "basePath", "locale", "locales", "defaultLocale", "isReady", "isLocaleDomain"];
  var routerEvents = ["routeChangeStart", "beforeHistoryChange", "routeChangeComplete", "routeChangeError", "hashChangeStart", "hashChangeComplete"];
  var coreMethodFields = ["push", "replace", "reload", "back", "prefetch", "beforePopState"];
  Object.defineProperty(singletonRouter, "events", {get() {
    return _router2.default.events;
  }});
  urlPropertyFields.forEach((field) => {
    Object.defineProperty(singletonRouter, field, {get() {
      const router = getRouter();
      return router[field];
    }});
  });
  coreMethodFields.forEach((field) => {
    ;
    singletonRouter[field] = (...args) => {
      const router = getRouter();
      return router[field](...args);
    };
  });
  routerEvents.forEach((event) => {
    singletonRouter.ready(() => {
      _router2.default.events.on(event, (...args) => {
        const eventField = `on${event.charAt(0).toUpperCase()}${event.substring(1)}`;
        const _singletonRouter = singletonRouter;
        if (_singletonRouter[eventField]) {
          try {
            _singletonRouter[eventField](...args);
          } catch (err) {
            console.error(`Error when running the Router event: ${eventField}`);
            console.error(`${err.message}
${err.stack}`);
          }
        }
      });
    });
  });
  function getRouter() {
    if (!singletonRouter.router) {
      const message = 'No router instance found.\nYou should only use "next/router" inside the client side of your app.\n';
      throw new Error(message);
    }
    return singletonRouter.router;
  }
  var _default = singletonRouter;
  exports.default = _default;
  function useRouter() {
    return _react.default.useContext(_routerContext.RouterContext);
  }
  var createRouter = (...args) => {
    singletonRouter.router = new _router2.default(...args);
    singletonRouter.readyCallbacks.forEach((cb) => cb());
    singletonRouter.readyCallbacks = [];
    return singletonRouter.router;
  };
  exports.createRouter = createRouter;
  function makePublicRouterInstance(router) {
    const _router = router;
    const instance = {};
    for (const property of urlPropertyFields) {
      if (typeof _router[property] === "object") {
        instance[property] = Object.assign(Array.isArray(_router[property]) ? [] : {}, _router[property]);
        continue;
      }
      instance[property] = _router[property];
    }
    instance.events = _router2.default.events;
    coreMethodFields.forEach((field) => {
      instance[field] = (...args) => {
        return _router[field](...args);
      };
    });
    return instance;
  }
});

// node_modules/next/dist/client/use-intersection.js
var require_use_intersection = __commonJS((exports) => {
  "use strict";
  exports.__esModule = true;
  exports.useIntersection = useIntersection;
  var _react = require_react();
  var _requestIdleCallback = require_request_idle_callback();
  var hasIntersectionObserver = typeof IntersectionObserver !== "undefined";
  function useIntersection({rootMargin, disabled}) {
    const isDisabled = disabled || !hasIntersectionObserver;
    const unobserve = (0, _react.useRef)();
    const [visible, setVisible] = (0, _react.useState)(false);
    const setRef = (0, _react.useCallback)((el) => {
      if (unobserve.current) {
        unobserve.current();
        unobserve.current = void 0;
      }
      if (isDisabled || visible)
        return;
      if (el && el.tagName) {
        unobserve.current = observe(el, (isVisible) => isVisible && setVisible(isVisible), {rootMargin});
      }
    }, [isDisabled, rootMargin, visible]);
    (0, _react.useEffect)(() => {
      if (!hasIntersectionObserver) {
        if (!visible) {
          const idleCallback = (0, _requestIdleCallback.requestIdleCallback)(() => setVisible(true));
          return () => (0, _requestIdleCallback.cancelIdleCallback)(idleCallback);
        }
      }
    }, [visible]);
    return [setRef, visible];
  }
  function observe(element, callback, options) {
    const {id, observer, elements} = createObserver(options);
    elements.set(element, callback);
    observer.observe(element);
    return function unobserve() {
      elements.delete(element);
      observer.unobserve(element);
      if (elements.size === 0) {
        observer.disconnect();
        observers.delete(id);
      }
    };
  }
  var observers = new Map();
  function createObserver(options) {
    const id = options.rootMargin || "";
    let instance = observers.get(id);
    if (instance) {
      return instance;
    }
    const elements = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const callback = elements.get(entry.target);
        const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
        if (callback && isVisible) {
          callback(isVisible);
        }
      });
    }, options);
    observers.set(id, instance = {id, observer, elements});
    return instance;
  }
});

// node_modules/next/dist/client/link.js
var require_link = __commonJS((exports) => {
  "use strict";
  var _interopRequireWildcard = require_interopRequireWildcard();
  exports.__esModule = true;
  exports.default = void 0;
  var _react = _interopRequireWildcard(require_react());
  var _router = require_router();
  var _router2 = require_router2();
  var _useIntersection = require_use_intersection();
  var prefetched = {};
  function prefetch(router, href, as, options) {
    if (typeof window === "undefined" || !router)
      return;
    if (!(0, _router.isLocalURL)(href))
      return;
    router.prefetch(href, as, options).catch((err) => {
      if (true) {
        throw err;
      }
    });
    const curLocale = options && typeof options.locale !== "undefined" ? options.locale : router && router.locale;
    prefetched[href + "%" + as + (curLocale ? "%" + curLocale : "")] = true;
  }
  function isModifiedEvent(event) {
    const {target} = event.currentTarget;
    return target && target !== "_self" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.nativeEvent && event.nativeEvent.which === 2;
  }
  function linkClicked(e, router, href, as, replace, shallow, scroll, locale) {
    const {nodeName} = e.currentTarget;
    if (nodeName === "A" && (isModifiedEvent(e) || !(0, _router.isLocalURL)(href))) {
      return;
    }
    e.preventDefault();
    if (scroll == null) {
      scroll = as.indexOf("#") < 0;
    }
    router[replace ? "replace" : "push"](href, as, {shallow, locale, scroll}).then((success) => {
      if (!success)
        return;
      if (scroll) {
        document.body.focus();
      }
    });
  }
  function Link(props) {
    if (true) {
      let createPropError = function(args) {
        return new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== "undefined" ? "\nOpen your browser's console to view the Component stack trace." : ""));
      };
      const requiredPropsGuard = {href: true};
      const requiredProps = Object.keys(requiredPropsGuard);
      requiredProps.forEach((key) => {
        if (key === "href") {
          if (props[key] == null || typeof props[key] !== "string" && typeof props[key] !== "object") {
            throw createPropError({key, expected: "`string` or `object`", actual: props[key] === null ? "null" : typeof props[key]});
          }
        } else {
          const _ = key;
        }
      });
      const optionalPropsGuard = {as: true, replace: true, scroll: true, shallow: true, passHref: true, prefetch: true, locale: true};
      const optionalProps = Object.keys(optionalPropsGuard);
      optionalProps.forEach((key) => {
        const valType = typeof props[key];
        if (key === "as") {
          if (props[key] && valType !== "string" && valType !== "object") {
            throw createPropError({key, expected: "`string` or `object`", actual: valType});
          }
        } else if (key === "locale") {
          if (props[key] && valType !== "string") {
            throw createPropError({key, expected: "`string`", actual: valType});
          }
        } else if (key === "replace" || key === "scroll" || key === "shallow" || key === "passHref" || key === "prefetch") {
          if (props[key] != null && valType !== "boolean") {
            throw createPropError({key, expected: "`boolean`", actual: valType});
          }
        } else {
          const _ = key;
        }
      });
      const hasWarned = _react.default.useRef(false);
      if (props.prefetch && !hasWarned.current) {
        hasWarned.current = true;
        console.warn("Next.js auto-prefetches automatically based on viewport. The prefetch attribute is no longer needed. More: https://err.sh/vercel/next.js/prefetch-true-deprecated");
      }
    }
    const p = props.prefetch !== false;
    const router = (0, _router2.useRouter)();
    const pathname = router && router.pathname || "/";
    const {href, as} = _react.default.useMemo(() => {
      const [resolvedHref, resolvedAs] = (0, _router.resolveHref)(pathname, props.href, true);
      return {href: resolvedHref, as: props.as ? (0, _router.resolveHref)(pathname, props.as) : resolvedAs || resolvedHref};
    }, [pathname, props.href, props.as]);
    let {children, replace, shallow, scroll, locale} = props;
    if (typeof children === "string") {
      children = /* @__PURE__ */ _react.default.createElement("a", null, children);
    }
    const child = _react.Children.only(children);
    const childRef = child && typeof child === "object" && child.ref;
    const [setIntersectionRef, isVisible] = (0, _useIntersection.useIntersection)({rootMargin: "200px"});
    const setRef = _react.default.useCallback((el) => {
      setIntersectionRef(el);
      if (childRef) {
        if (typeof childRef === "function")
          childRef(el);
        else if (typeof childRef === "object") {
          childRef.current = el;
        }
      }
    }, [childRef, setIntersectionRef]);
    (0, _react.useEffect)(() => {
      const shouldPrefetch = isVisible && p && (0, _router.isLocalURL)(href);
      const curLocale = typeof locale !== "undefined" ? locale : router && router.locale;
      const isPrefetched = prefetched[href + "%" + as + (curLocale ? "%" + curLocale : "")];
      if (shouldPrefetch && !isPrefetched) {
        prefetch(router, href, as, {locale: curLocale});
      }
    }, [as, href, isVisible, locale, p, router]);
    const childProps = {ref: setRef, onClick: (e) => {
      if (child.props && typeof child.props.onClick === "function") {
        child.props.onClick(e);
      }
      if (!e.defaultPrevented) {
        linkClicked(e, router, href, as, replace, shallow, scroll, locale);
      }
    }};
    childProps.onMouseEnter = (e) => {
      if (!(0, _router.isLocalURL)(href))
        return;
      if (child.props && typeof child.props.onMouseEnter === "function") {
        child.props.onMouseEnter(e);
      }
      prefetch(router, href, as, {priority: true});
    };
    if (props.passHref || child.type === "a" && !("href" in child.props)) {
      const curLocale = typeof locale !== "undefined" ? locale : router && router.locale;
      const localeDomain = router && router.isLocaleDomain && (0, _router.getDomainLocale)(as, curLocale, router && router.locales, router && router.domainLocales);
      childProps.href = localeDomain || (0, _router.addBasePath)((0, _router.addLocale)(as, curLocale, router && router.defaultLocale));
    }
    return /* @__PURE__ */ _react.default.cloneElement(child, childProps);
  }
  var _default = Link;
  exports.default = _default;
});

// node_modules/next/link.js
var require_link2 = __commonJS((exports, module) => {
  module.exports = require_link();
});
export default require_link2();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2ludGVyb3BSZXF1aXJlV2lsZGNhcmQuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvY2xpZW50L25vcm1hbGl6ZS10cmFpbGluZy1zbGFzaC50cyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9pbnRlcm9wUmVxdWlyZURlZmF1bHQuanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9nZXQtYXNzZXQtcGF0aC1mcm9tLXJvdXRlLnRzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZXh0L2NsaWVudC9yZXF1ZXN0LWlkbGUtY2FsbGJhY2sudHMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvY2xpZW50L3JvdXRlLWxvYWRlci50cyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9uZXh0LXNlcnZlci9zZXJ2ZXIvZGVub3JtYWxpemUtcGFnZS1wYXRoLnRzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZXh0L25leHQtc2VydmVyL2xpYi9pMThuL25vcm1hbGl6ZS1sb2NhbGUtcGF0aC50cyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9uZXh0LXNlcnZlci9saWIvbWl0dC50cyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL3F1ZXJ5c3RyaW5nLnRzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZXh0L25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvZm9ybWF0LXVybC50cyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9uZXh0LXNlcnZlci9saWIvdXRpbHMudHMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9pcy1keW5hbWljLnRzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZXh0L25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcGFyc2UtcmVsYXRpdmUtdXJsLnRzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZXh0L2Rpc3QvY29tcGlsZWQvcGF0aC10by1yZWdleHAvaW5kZXguanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9wYXRoLW1hdGNoLnRzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZXh0L25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcHJlcGFyZS1kZXN0aW5hdGlvbi50cyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9uZXh0LXNlcnZlci9saWIvcm91dGVyL3V0aWxzL3Jlc29sdmUtcmV3cml0ZXMudHMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci91dGlscy9yb3V0ZS1tYXRjaGVyLnRzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZXh0L25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvcm91dGUtcmVnZXgudHMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvbmV4dC1zZXJ2ZXIvbGliL2kxOG4vZGV0ZWN0LWRvbWFpbi1sb2NhbGUudHMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3JlYWN0LWlzL2Nqcy9yZWFjdC1pcy5kZXZlbG9wbWVudC5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcmVhY3QtaXMvaW5kZXguanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci9yb3V0ZXIudHMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvbmV4dC1zZXJ2ZXIvbGliL3JvdXRlci1jb250ZXh0LnRzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZXh0L2NsaWVudC93aXRoLXJvdXRlci50c3giLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvY2xpZW50L3JvdXRlci50cyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvbmV4dC9jbGllbnQvdXNlLWludGVyc2VjdGlvbi50c3giLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL25leHQvY2xpZW50L2xpbmsudHN4IiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9uZXh0L2xpbmsuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICBpZiAodHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IF90eXBlb2YgPSBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBfdHlwZW9mKG9iaik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX3R5cGVvZjsiLCAidmFyIF90eXBlb2YgPSByZXF1aXJlKFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy90eXBlb2ZcIik7XG5cbmZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpIHtcbiAgaWYgKHR5cGVvZiBXZWFrTWFwICE9PSBcImZ1bmN0aW9uXCIpIHJldHVybiBudWxsO1xuICB2YXIgY2FjaGUgPSBuZXcgV2Vha01hcCgpO1xuXG4gIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSA9IGZ1bmN0aW9uIF9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSgpIHtcbiAgICByZXR1cm4gY2FjaGU7XG4gIH07XG5cbiAgcmV0dXJuIGNhY2hlO1xufVxuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChvYmopIHtcbiAgaWYgKG9iaiAmJiBvYmouX19lc01vZHVsZSkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBpZiAob2JqID09PSBudWxsIHx8IF90eXBlb2Yob2JqKSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2Ygb2JqICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgXCJkZWZhdWx0XCI6IG9ialxuICAgIH07XG4gIH1cblxuICB2YXIgY2FjaGUgPSBfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUoKTtcblxuICBpZiAoY2FjaGUgJiYgY2FjaGUuaGFzKG9iaikpIHtcbiAgICByZXR1cm4gY2FjaGUuZ2V0KG9iaik7XG4gIH1cblxuICB2YXIgbmV3T2JqID0ge307XG4gIHZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkgJiYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHZhciBkZXNjID0gaGFzUHJvcGVydHlEZXNjcmlwdG9yID8gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSkgOiBudWxsO1xuXG4gICAgICBpZiAoZGVzYyAmJiAoZGVzYy5nZXQgfHwgZGVzYy5zZXQpKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuZXdPYmosIGtleSwgZGVzYyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdPYmpba2V5XSA9IG9ialtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG5ld09ialtcImRlZmF1bHRcIl0gPSBvYmo7XG5cbiAgaWYgKGNhY2hlKSB7XG4gICAgY2FjaGUuc2V0KG9iaiwgbmV3T2JqKTtcbiAgfVxuXG4gIHJldHVybiBuZXdPYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQ7IiwgIi8qKlxuICogUmVtb3ZlcyB0aGUgdHJhaWxpbmcgc2xhc2ggb2YgYSBwYXRoIGlmIHRoZXJlIGlzIG9uZS4gUHJlc2VydmVzIHRoZSByb290IHBhdGggYC9gLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHBhdGguZW5kc1dpdGgoJy8nKSAmJiBwYXRoICE9PSAnLycgPyBwYXRoLnNsaWNlKDAsIC0xKSA6IHBhdGhcbn1cblxuLyoqXG4gKiBOb3JtYWxpemVzIHRoZSB0cmFpbGluZyBzbGFzaCBvZiBhIHBhdGggYWNjb3JkaW5nIHRvIHRoZSBgdHJhaWxpbmdTbGFzaGAgb3B0aW9uXG4gKiBpbiBgbmV4dC5jb25maWcuanNgLlxuICovXG5leHBvcnQgY29uc3Qgbm9ybWFsaXplUGF0aFRyYWlsaW5nU2xhc2ggPSBwcm9jZXNzLmVudi5fX05FWFRfVFJBSUxJTkdfU0xBU0hcbiAgPyAocGF0aDogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICAgIGlmICgvXFwuW14vXStcXC8/JC8udGVzdChwYXRoKSkge1xuICAgICAgICByZXR1cm4gcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2gocGF0aClcbiAgICAgIH0gZWxzZSBpZiAocGF0aC5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgIHJldHVybiBwYXRoXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcGF0aCArICcvJ1xuICAgICAgfVxuICAgIH1cbiAgOiByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaFxuIiwgImZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7XG4gIHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7XG4gICAgXCJkZWZhdWx0XCI6IG9ialxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQ7IiwgIi8vIFRyYW5zbGF0ZXMgYSBsb2dpY2FsIHJvdXRlIGludG8gaXRzIHBhZ2VzIGFzc2V0IHBhdGggKHJlbGF0aXZlIGZyb20gYSBjb21tb24gcHJlZml4KVxuLy8gXCJhc3NldCBwYXRoXCIgYmVpbmcgaXRzIGphdmFzY3JpcHQgZmlsZSwgZGF0YSBmaWxlLCBwcmVyZW5kZXJlZCBodG1sLC4uLlxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0QXNzZXRQYXRoRnJvbVJvdXRlKFxuICByb3V0ZTogc3RyaW5nLFxuICBleHQ6IHN0cmluZyA9ICcnXG4pOiBzdHJpbmcge1xuICBjb25zdCBwYXRoID1cbiAgICByb3V0ZSA9PT0gJy8nXG4gICAgICA/ICcvaW5kZXgnXG4gICAgICA6IC9eXFwvaW5kZXgoXFwvfCQpLy50ZXN0KHJvdXRlKVxuICAgICAgPyBgL2luZGV4JHtyb3V0ZX1gXG4gICAgICA6IGAke3JvdXRlfWBcbiAgcmV0dXJuIHBhdGggKyBleHRcbn1cbiIsICJ0eXBlIFJlcXVlc3RJZGxlQ2FsbGJhY2tIYW5kbGUgPSBhbnlcbnR5cGUgUmVxdWVzdElkbGVDYWxsYmFja09wdGlvbnMgPSB7XG4gIHRpbWVvdXQ6IG51bWJlclxufVxudHlwZSBSZXF1ZXN0SWRsZUNhbGxiYWNrRGVhZGxpbmUgPSB7XG4gIHJlYWRvbmx5IGRpZFRpbWVvdXQ6IGJvb2xlYW5cbiAgdGltZVJlbWFpbmluZzogKCkgPT4gbnVtYmVyXG59XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgcmVxdWVzdElkbGVDYWxsYmFjazogKFxuICAgICAgY2FsbGJhY2s6IChkZWFkbGluZTogUmVxdWVzdElkbGVDYWxsYmFja0RlYWRsaW5lKSA9PiB2b2lkLFxuICAgICAgb3B0cz86IFJlcXVlc3RJZGxlQ2FsbGJhY2tPcHRpb25zXG4gICAgKSA9PiBSZXF1ZXN0SWRsZUNhbGxiYWNrSGFuZGxlXG4gICAgY2FuY2VsSWRsZUNhbGxiYWNrOiAoaWQ6IFJlcXVlc3RJZGxlQ2FsbGJhY2tIYW5kbGUpID0+IHZvaWRcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVxdWVzdElkbGVDYWxsYmFjayA9XG4gICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5yZXF1ZXN0SWRsZUNhbGxiYWNrKSB8fFxuICBmdW5jdGlvbiAoXG4gICAgY2I6IChkZWFkbGluZTogUmVxdWVzdElkbGVDYWxsYmFja0RlYWRsaW5lKSA9PiB2b2lkXG4gICk6IE5vZGVKUy5UaW1lb3V0IHtcbiAgICBsZXQgc3RhcnQgPSBEYXRlLm5vdygpXG4gICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgY2Ioe1xuICAgICAgICBkaWRUaW1lb3V0OiBmYWxzZSxcbiAgICAgICAgdGltZVJlbWFpbmluZzogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBNYXRoLm1heCgwLCA1MCAtIChEYXRlLm5vdygpIC0gc3RhcnQpKVxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICB9LCAxKVxuICB9XG5cbmV4cG9ydCBjb25zdCBjYW5jZWxJZGxlQ2FsbGJhY2sgPVxuICAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnICYmIHNlbGYuY2FuY2VsSWRsZUNhbGxiYWNrKSB8fFxuICBmdW5jdGlvbiAoaWQ6IFJlcXVlc3RJZGxlQ2FsbGJhY2tIYW5kbGUpIHtcbiAgICByZXR1cm4gY2xlYXJUaW1lb3V0KGlkKVxuICB9XG4iLCAiaW1wb3J0IHsgQ29tcG9uZW50VHlwZSB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgQ2xpZW50QnVpbGRNYW5pZmVzdCB9IGZyb20gJy4uL2J1aWxkL3dlYnBhY2svcGx1Z2lucy9idWlsZC1tYW5pZmVzdC1wbHVnaW4nXG5pbXBvcnQgZ2V0QXNzZXRQYXRoRnJvbVJvdXRlIGZyb20gJy4uL25leHQtc2VydmVyL2xpYi9yb3V0ZXIvdXRpbHMvZ2V0LWFzc2V0LXBhdGgtZnJvbS1yb3V0ZSdcbmltcG9ydCB7IHJlcXVlc3RJZGxlQ2FsbGJhY2sgfSBmcm9tICcuL3JlcXVlc3QtaWRsZS1jYWxsYmFjaydcblxuLy8gMy44cyB3YXMgYXJiaXRyYXJpbHkgY2hvc2VuIGFzIGl0J3Mgd2hhdCBodHRwczovL3dlYi5kZXYvaW50ZXJhY3RpdmVcbi8vIGNvbnNpZGVycyBhcyBcIkdvb2RcIiB0aW1lLXRvLWludGVyYWN0aXZlLiBXZSBtdXN0IGFzc3VtZSBzb21ldGhpbmcgd2VudFxuLy8gd3JvbmcgYmV5b25kIHRoaXMgcG9pbnQsIGFuZCB0aGVuIGZhbGwtYmFjayB0byBhIGZ1bGwgcGFnZSB0cmFuc2l0aW9uIHRvXG4vLyBzaG93IHRoZSB1c2VyIHNvbWV0aGluZyBvZiB2YWx1ZS5cbmNvbnN0IE1TX01BWF9JRExFX0RFTEFZID0gMzgwMFxuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIF9fQlVJTERfTUFOSUZFU1Q/OiBDbGllbnRCdWlsZE1hbmlmZXN0XG4gICAgX19CVUlMRF9NQU5JRkVTVF9DQj86IEZ1bmN0aW9uXG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRFbnRyeXBvaW50U3VjY2VzcyB7XG4gIGNvbXBvbmVudDogQ29tcG9uZW50VHlwZVxuICBleHBvcnRzOiBhbnlcbn1cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGVkRW50cnlwb2ludEZhaWx1cmUge1xuICBlcnJvcjogdW5rbm93blxufVxuZXhwb3J0IHR5cGUgUm91dGVFbnRyeXBvaW50ID0gTG9hZGVkRW50cnlwb2ludFN1Y2Nlc3MgfCBMb2FkZWRFbnRyeXBvaW50RmFpbHVyZVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlU3R5bGVTaGVldCB7XG4gIGhyZWY6IHN0cmluZ1xuICBjb250ZW50OiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBMb2FkZWRSb3V0ZVN1Y2Nlc3MgZXh0ZW5kcyBMb2FkZWRFbnRyeXBvaW50U3VjY2VzcyB7XG4gIHN0eWxlczogUm91dGVTdHlsZVNoZWV0W11cbn1cbmV4cG9ydCBpbnRlcmZhY2UgTG9hZGVkUm91dGVGYWlsdXJlIHtcbiAgZXJyb3I6IHVua25vd25cbn1cbmV4cG9ydCB0eXBlIFJvdXRlTG9hZGVyRW50cnkgPSBMb2FkZWRSb3V0ZVN1Y2Nlc3MgfCBMb2FkZWRSb3V0ZUZhaWx1cmVcblxuZXhwb3J0IHR5cGUgRnV0dXJlPFY+ID0ge1xuICByZXNvbHZlOiAoZW50cnlwb2ludDogVikgPT4gdm9pZFxuICBmdXR1cmU6IFByb21pc2U8Vj5cbn1cbmZ1bmN0aW9uIHdpdGhGdXR1cmU8VD4oXG4gIGtleTogc3RyaW5nLFxuICBtYXA6IE1hcDxzdHJpbmcsIEZ1dHVyZTxUPiB8IFQ+LFxuICBnZW5lcmF0b3I/OiAoKSA9PiBQcm9taXNlPFQ+XG4pOiBQcm9taXNlPFQ+IHtcbiAgbGV0IGVudHJ5OiBGdXR1cmU8VD4gfCBUIHwgdW5kZWZpbmVkID0gbWFwLmdldChrZXkpXG4gIGlmIChlbnRyeSkge1xuICAgIGlmICgnZnV0dXJlJyBpbiBlbnRyeSkge1xuICAgICAgcmV0dXJuIGVudHJ5LmZ1dHVyZVxuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGVudHJ5KVxuICB9XG4gIGxldCByZXNvbHZlcjogKGVudHJ5cG9pbnQ6IFQpID0+IHZvaWRcbiAgY29uc3QgcHJvbTogUHJvbWlzZTxUPiA9IG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlKSA9PiB7XG4gICAgcmVzb2x2ZXIgPSByZXNvbHZlXG4gIH0pXG4gIG1hcC5zZXQoa2V5LCAoZW50cnkgPSB7IHJlc29sdmU6IHJlc29sdmVyISwgZnV0dXJlOiBwcm9tIH0pKVxuICByZXR1cm4gZ2VuZXJhdG9yXG4gICAgPyAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VxdWVuY2VzXG4gICAgICBnZW5lcmF0b3IoKS50aGVuKCh2YWx1ZSkgPT4gKHJlc29sdmVyKHZhbHVlKSwgdmFsdWUpKVxuICAgIDogcHJvbVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJvdXRlTG9hZGVyIHtcbiAgd2hlbkVudHJ5cG9pbnQocm91dGU6IHN0cmluZyk6IFByb21pc2U8Um91dGVFbnRyeXBvaW50PlxuICBvbkVudHJ5cG9pbnQocm91dGU6IHN0cmluZywgZXhlY3V0ZTogKCkgPT4gdW5rbm93bik6IHZvaWRcbiAgbG9hZFJvdXRlKHJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPFJvdXRlTG9hZGVyRW50cnk+XG4gIHByZWZldGNoKHJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+XG59XG5cbmZ1bmN0aW9uIGhhc1ByZWZldGNoKGxpbms/OiBIVE1MTGlua0VsZW1lbnQpOiBib29sZWFuIHtcbiAgdHJ5IHtcbiAgICBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gICAgcmV0dXJuIChcbiAgICAgIC8vIGRldGVjdCBJRTExIHNpbmNlIGl0IHN1cHBvcnRzIHByZWZldGNoIGJ1dCBpc24ndCBkZXRlY3RlZFxuICAgICAgLy8gd2l0aCByZWxMaXN0LnN1cHBvcnRcbiAgICAgICghIXdpbmRvdy5NU0lucHV0TWV0aG9kQ29udGV4dCAmJiAhIShkb2N1bWVudCBhcyBhbnkpLmRvY3VtZW50TW9kZSkgfHxcbiAgICAgIGxpbmsucmVsTGlzdC5zdXBwb3J0cygncHJlZmV0Y2gnKVxuICAgIClcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuY29uc3QgY2FuUHJlZmV0Y2g6IGJvb2xlYW4gPSBoYXNQcmVmZXRjaCgpXG5cbmZ1bmN0aW9uIHByZWZldGNoVmlhRG9tKFxuICBocmVmOiBzdHJpbmcsXG4gIGFzOiBzdHJpbmcsXG4gIGxpbms/OiBIVE1MTGlua0VsZW1lbnRcbik6IFByb21pc2U8YW55PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGlua1tyZWw9XCJwcmVmZXRjaFwiXVtocmVmXj1cIiR7aHJlZn1cIl1gKSkge1xuICAgICAgcmV0dXJuIHJlcygpXG4gICAgfVxuXG4gICAgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxuXG4gICAgLy8gVGhlIG9yZGVyIG9mIHByb3BlcnR5IGFzc2lnbm1lbnQgaGVyZSBpcyBpbnRlbnRpb25hbDpcbiAgICBpZiAoYXMpIGxpbmshLmFzID0gYXNcbiAgICBsaW5rIS5yZWwgPSBgcHJlZmV0Y2hgXG4gICAgbGluayEuY3Jvc3NPcmlnaW4gPSBwcm9jZXNzLmVudi5fX05FWFRfQ1JPU1NfT1JJR0lOIVxuICAgIGxpbmshLm9ubG9hZCA9IHJlc1xuICAgIGxpbmshLm9uZXJyb3IgPSByZWpcblxuICAgIC8vIGBocmVmYCBzaG91bGQgYWx3YXlzIGJlIGxhc3Q6XG4gICAgbGluayEuaHJlZiA9IGhyZWZcblxuICAgIGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGluaylcbiAgfSlcbn1cblxuY29uc3QgQVNTRVRfTE9BRF9FUlJPUiA9IFN5bWJvbCgnQVNTRVRfTE9BRF9FUlJPUicpXG4vLyBUT0RPOiB1bmV4cG9ydFxuZXhwb3J0IGZ1bmN0aW9uIG1hcmtBc3NldEVycm9yKGVycjogRXJyb3IpOiBFcnJvciB7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoZXJyLCBBU1NFVF9MT0FEX0VSUk9SLCB7fSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXNzZXRFcnJvcihlcnI/OiBFcnJvcik6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuICByZXR1cm4gZXJyICYmIEFTU0VUX0xPQURfRVJST1IgaW4gZXJyXG59XG5cbmZ1bmN0aW9uIGFwcGVuZFNjcmlwdChcbiAgc3JjOiBzdHJpbmcsXG4gIHNjcmlwdD86IEhUTUxTY3JpcHRFbGVtZW50XG4pOiBQcm9taXNlPHVua25vd24+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuXG4gICAgLy8gVGhlIG9yZGVyIG9mIHByb3BlcnR5IGFzc2lnbm1lbnQgaGVyZSBpcyBpbnRlbnRpb25hbC5cbiAgICAvLyAxLiBTZXR1cCBzdWNjZXNzL2ZhaWx1cmUgaG9va3MgaW4gY2FzZSB0aGUgYnJvd3NlciBzeW5jaHJvbm91c2x5XG4gICAgLy8gICAgZXhlY3V0ZXMgd2hlbiBgc3JjYCBpcyBzZXQuXG4gICAgc2NyaXB0Lm9ubG9hZCA9IHJlc29sdmVcbiAgICBzY3JpcHQub25lcnJvciA9ICgpID0+XG4gICAgICByZWplY3QobWFya0Fzc2V0RXJyb3IobmV3IEVycm9yKGBGYWlsZWQgdG8gbG9hZCBzY3JpcHQ6ICR7c3JjfWApKSlcblxuICAgIC8vIDIuIENvbmZpZ3VyZSB0aGUgY3Jvc3Mtb3JpZ2luIGF0dHJpYnV0ZSBiZWZvcmUgc2V0dGluZyBgc3JjYCBpbiBjYXNlIHRoZVxuICAgIC8vICAgIGJyb3dzZXIgYmVnaW5zIHRvIGZldGNoLlxuICAgIHNjcmlwdC5jcm9zc09yaWdpbiA9IHByb2Nlc3MuZW52Ll9fTkVYVF9DUk9TU19PUklHSU4hXG5cbiAgICAvLyAzLiBGaW5hbGx5LCBzZXQgdGhlIHNvdXJjZSBhbmQgaW5qZWN0IGludG8gdGhlIERPTSBpbiBjYXNlIHRoZSBjaGlsZFxuICAgIC8vICAgIG11c3QgYmUgYXBwZW5kZWQgZm9yIGZldGNoaW5nIHRvIHN0YXJ0LlxuICAgIHNjcmlwdC5zcmMgPSBzcmNcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdClcbiAgfSlcbn1cblxuZnVuY3Rpb24gaWRsZVRpbWVvdXQ8VD4obXM6IG51bWJlciwgZXJyOiBFcnJvcik6IFByb21pc2U8VD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKF9yZXNvbHZlLCByZWplY3QpID0+XG4gICAgcmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PiBzZXRUaW1lb3V0KCgpID0+IHJlamVjdChlcnIpLCBtcykpXG4gIClcbn1cblxuLy8gVE9ETzogc3RvcCBleHBvcnRpbmcgb3IgY2FjaGUgdGhlIGZhaWx1cmVcbi8vIEl0J2QgYmUgYmVzdCB0byBzdG9wIGV4cG9ydGluZyB0aGlzLiBJdCdzIGFuIGltcGxlbWVudGF0aW9uIGRldGFpbC4gV2UncmVcbi8vIG9ubHkgZXhwb3J0aW5nIGl0IGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbHR5IHdpdGggdGhlIGBwYWdlLWxvYWRlcmAuXG4vLyBPbmx5IGNhY2hlIHRoaXMgcmVzcG9uc2UgYXMgYSBsYXN0IHJlc29ydCBpZiB3ZSBjYW5ub3QgZWxpbWluYXRlIGFsbCBvdGhlclxuLy8gY29kZSBicmFuY2hlcyB0aGF0IHVzZSB0aGUgQnVpbGQgTWFuaWZlc3QgQ2FsbGJhY2sgYW5kIHB1c2ggdGhlbSB0aHJvdWdoXG4vLyB0aGUgUm91dGUgTG9hZGVyIGludGVyZmFjZS5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDbGllbnRCdWlsZE1hbmlmZXN0KCk6IFByb21pc2U8Q2xpZW50QnVpbGRNYW5pZmVzdD4ge1xuICBpZiAoc2VsZi5fX0JVSUxEX01BTklGRVNUKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzZWxmLl9fQlVJTERfTUFOSUZFU1QpXG4gIH1cblxuICBjb25zdCBvbkJ1aWxkTWFuaWZlc3Q6IFByb21pc2U8Q2xpZW50QnVpbGRNYW5pZmVzdD4gPSBuZXcgUHJvbWlzZTxcbiAgICBDbGllbnRCdWlsZE1hbmlmZXN0XG4gID4oKHJlc29sdmUpID0+IHtcbiAgICAvLyBNYW5kYXRvcnkgYmVjYXVzZSB0aGlzIGlzIG5vdCBjb25jdXJyZW50IHNhZmU6XG4gICAgY29uc3QgY2IgPSBzZWxmLl9fQlVJTERfTUFOSUZFU1RfQ0JcbiAgICBzZWxmLl9fQlVJTERfTUFOSUZFU1RfQ0IgPSAoKSA9PiB7XG4gICAgICByZXNvbHZlKHNlbGYuX19CVUlMRF9NQU5JRkVTVClcbiAgICAgIGNiICYmIGNiKClcbiAgICB9XG4gIH0pXG4gIHJldHVybiBQcm9taXNlLnJhY2UoW1xuICAgIG9uQnVpbGRNYW5pZmVzdCxcbiAgICBpZGxlVGltZW91dDxDbGllbnRCdWlsZE1hbmlmZXN0PihcbiAgICAgIE1TX01BWF9JRExFX0RFTEFZLFxuICAgICAgbWFya0Fzc2V0RXJyb3IobmV3IEVycm9yKCdGYWlsZWQgdG8gbG9hZCBjbGllbnQgYnVpbGQgbWFuaWZlc3QnKSlcbiAgICApLFxuICBdKVxufVxuXG5pbnRlcmZhY2UgUm91dGVGaWxlcyB7XG4gIHNjcmlwdHM6IHN0cmluZ1tdXG4gIGNzczogc3RyaW5nW11cbn1cbmZ1bmN0aW9uIGdldEZpbGVzRm9yUm91dGUoXG4gIGFzc2V0UHJlZml4OiBzdHJpbmcsXG4gIHJvdXRlOiBzdHJpbmdcbik6IFByb21pc2U8Um91dGVGaWxlcz4ge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgIHNjcmlwdHM6IFtcbiAgICAgICAgYXNzZXRQcmVmaXggK1xuICAgICAgICAgICcvX25leHQvc3RhdGljL2NodW5rcy9wYWdlcycgK1xuICAgICAgICAgIGVuY29kZVVSSShnZXRBc3NldFBhdGhGcm9tUm91dGUocm91dGUsICcuanMnKSksXG4gICAgICBdLFxuICAgICAgLy8gU3R5bGVzIGFyZSBoYW5kbGVkIGJ5IGBzdHlsZS1sb2FkZXJgIGluIGRldmVsb3BtZW50OlxuICAgICAgY3NzOiBbXSxcbiAgICB9KVxuICB9XG4gIHJldHVybiBnZXRDbGllbnRCdWlsZE1hbmlmZXN0KCkudGhlbigobWFuaWZlc3QpID0+IHtcbiAgICBpZiAoIShyb3V0ZSBpbiBtYW5pZmVzdCkpIHtcbiAgICAgIHRocm93IG1hcmtBc3NldEVycm9yKG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvb2t1cCByb3V0ZTogJHtyb3V0ZX1gKSlcbiAgICB9XG4gICAgY29uc3QgYWxsRmlsZXMgPSBtYW5pZmVzdFtyb3V0ZV0ubWFwKFxuICAgICAgKGVudHJ5KSA9PiBhc3NldFByZWZpeCArICcvX25leHQvJyArIGVuY29kZVVSSShlbnRyeSlcbiAgICApXG4gICAgcmV0dXJuIHtcbiAgICAgIHNjcmlwdHM6IGFsbEZpbGVzLmZpbHRlcigodikgPT4gdi5lbmRzV2l0aCgnLmpzJykpLFxuICAgICAgY3NzOiBhbGxGaWxlcy5maWx0ZXIoKHYpID0+IHYuZW5kc1dpdGgoJy5jc3MnKSksXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBjcmVhdGVSb3V0ZUxvYWRlcihhc3NldFByZWZpeDogc3RyaW5nKTogUm91dGVMb2FkZXIge1xuICBjb25zdCBlbnRyeXBvaW50czogTWFwPFxuICAgIHN0cmluZyxcbiAgICBGdXR1cmU8Um91dGVFbnRyeXBvaW50PiB8IFJvdXRlRW50cnlwb2ludFxuICA+ID0gbmV3IE1hcCgpXG4gIGNvbnN0IGxvYWRlZFNjcmlwdHM6IE1hcDxzdHJpbmcsIFByb21pc2U8dW5rbm93bj4+ID0gbmV3IE1hcCgpXG4gIGNvbnN0IHN0eWxlU2hlZXRzOiBNYXA8c3RyaW5nLCBQcm9taXNlPFJvdXRlU3R5bGVTaGVldD4+ID0gbmV3IE1hcCgpXG4gIGNvbnN0IHJvdXRlczogTWFwPFxuICAgIHN0cmluZyxcbiAgICBGdXR1cmU8Um91dGVMb2FkZXJFbnRyeT4gfCBSb3V0ZUxvYWRlckVudHJ5XG4gID4gPSBuZXcgTWFwKClcblxuICBmdW5jdGlvbiBtYXliZUV4ZWN1dGVTY3JpcHQoc3JjOiBzdHJpbmcpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICBsZXQgcHJvbTogUHJvbWlzZTx1bmtub3duPiB8IHVuZGVmaW5lZCA9IGxvYWRlZFNjcmlwdHMuZ2V0KHNyYylcbiAgICBpZiAocHJvbSkge1xuICAgICAgcmV0dXJuIHByb21cbiAgICB9XG5cbiAgICAvLyBTa2lwIGV4ZWN1dGluZyBzY3JpcHQgaWYgaXQncyBhbHJlYWR5IGluIHRoZSBET006XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYHNjcmlwdFtzcmNePVwiJHtzcmN9XCJdYCkpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgIH1cblxuICAgIGxvYWRlZFNjcmlwdHMuc2V0KHNyYywgKHByb20gPSBhcHBlbmRTY3JpcHQoc3JjKSkpXG4gICAgcmV0dXJuIHByb21cbiAgfVxuXG4gIGZ1bmN0aW9uIGZldGNoU3R5bGVTaGVldChocmVmOiBzdHJpbmcpOiBQcm9taXNlPFJvdXRlU3R5bGVTaGVldD4ge1xuICAgIGxldCBwcm9tOiBQcm9taXNlPFJvdXRlU3R5bGVTaGVldD4gfCB1bmRlZmluZWQgPSBzdHlsZVNoZWV0cy5nZXQoaHJlZilcbiAgICBpZiAocHJvbSkge1xuICAgICAgcmV0dXJuIHByb21cbiAgICB9XG5cbiAgICBzdHlsZVNoZWV0cy5zZXQoXG4gICAgICBocmVmLFxuICAgICAgKHByb20gPSBmZXRjaChocmVmKVxuICAgICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgaWYgKCFyZXMub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgc3R5bGVzaGVldDogJHtocmVmfWApXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXMudGV4dCgpLnRoZW4oKHRleHQpID0+ICh7IGhyZWY6IGhyZWYsIGNvbnRlbnQ6IHRleHQgfSkpXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgdGhyb3cgbWFya0Fzc2V0RXJyb3IoZXJyKVxuICAgICAgICB9KSlcbiAgICApXG4gICAgcmV0dXJuIHByb21cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgd2hlbkVudHJ5cG9pbnQocm91dGU6IHN0cmluZykge1xuICAgICAgcmV0dXJuIHdpdGhGdXR1cmUocm91dGUsIGVudHJ5cG9pbnRzKVxuICAgIH0sXG4gICAgb25FbnRyeXBvaW50KHJvdXRlOiBzdHJpbmcsIGV4ZWN1dGU6ICgpID0+IHVua25vd24pIHtcbiAgICAgIFByb21pc2UucmVzb2x2ZShleGVjdXRlKVxuICAgICAgICAudGhlbigoZm4pID0+IGZuKCkpXG4gICAgICAgIC50aGVuKFxuICAgICAgICAgIChleHBvcnRzOiBhbnkpID0+ICh7XG4gICAgICAgICAgICBjb21wb25lbnQ6IChleHBvcnRzICYmIGV4cG9ydHMuZGVmYXVsdCkgfHwgZXhwb3J0cyxcbiAgICAgICAgICAgIGV4cG9ydHM6IGV4cG9ydHMsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgKGVycikgPT4gKHsgZXJyb3I6IGVyciB9KVxuICAgICAgICApXG4gICAgICAgIC50aGVuKChpbnB1dDogUm91dGVFbnRyeXBvaW50KSA9PiB7XG4gICAgICAgICAgY29uc3Qgb2xkID0gZW50cnlwb2ludHMuZ2V0KHJvdXRlKVxuICAgICAgICAgIGVudHJ5cG9pbnRzLnNldChyb3V0ZSwgaW5wdXQpXG4gICAgICAgICAgaWYgKG9sZCAmJiAncmVzb2x2ZScgaW4gb2xkKSBvbGQucmVzb2x2ZShpbnB1dClcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGxvYWRSb3V0ZShyb3V0ZTogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gd2l0aEZ1dHVyZTxSb3V0ZUxvYWRlckVudHJ5Pihyb3V0ZSwgcm91dGVzLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgeyBzY3JpcHRzLCBjc3MgfSA9IGF3YWl0IGdldEZpbGVzRm9yUm91dGUoYXNzZXRQcmVmaXgsIHJvdXRlKVxuICAgICAgICAgIGNvbnN0IFssIHN0eWxlc10gPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICBlbnRyeXBvaW50cy5oYXMocm91dGUpXG4gICAgICAgICAgICAgID8gW11cbiAgICAgICAgICAgICAgOiBQcm9taXNlLmFsbChzY3JpcHRzLm1hcChtYXliZUV4ZWN1dGVTY3JpcHQpKSxcbiAgICAgICAgICAgIFByb21pc2UuYWxsKGNzcy5tYXAoZmV0Y2hTdHlsZVNoZWV0KSksXG4gICAgICAgICAgXSBhcyBjb25zdClcblxuICAgICAgICAgIGNvbnN0IGVudHJ5cG9pbnQ6IFJvdXRlRW50cnlwb2ludCA9IGF3YWl0IFByb21pc2UucmFjZShbXG4gICAgICAgICAgICB0aGlzLndoZW5FbnRyeXBvaW50KHJvdXRlKSxcbiAgICAgICAgICAgIGlkbGVUaW1lb3V0PFJvdXRlTG9hZGVyRW50cnk+KFxuICAgICAgICAgICAgICBNU19NQVhfSURMRV9ERUxBWSxcbiAgICAgICAgICAgICAgbWFya0Fzc2V0RXJyb3IoXG4gICAgICAgICAgICAgICAgbmV3IEVycm9yKGBSb3V0ZSBkaWQgbm90IGNvbXBsZXRlIGxvYWRpbmc6ICR7cm91dGV9YClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICBdKVxuICAgICAgICAgIGNvbnN0IHJlczogUm91dGVMb2FkZXJFbnRyeSA9IE9iamVjdC5hc3NpZ248XG4gICAgICAgICAgICB7IHN0eWxlczogUm91dGVTdHlsZVNoZWV0W10gfSxcbiAgICAgICAgICAgIFJvdXRlRW50cnlwb2ludFxuICAgICAgICAgID4oeyBzdHlsZXMgfSwgZW50cnlwb2ludClcbiAgICAgICAgICByZXR1cm4gJ2Vycm9yJyBpbiBlbnRyeXBvaW50ID8gZW50cnlwb2ludCA6IHJlc1xuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4geyBlcnJvcjogZXJyIH1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHByZWZldGNoKHJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9Hb29nbGVDaHJvbWVMYWJzL3F1aWNrbGluay9ibG9iLzQ1M2E2NjFmYTFmYTk0MGUyZDJlMDQ0NDUyMzk4ZTM4YzY3YTk4ZmIvc3JjL2luZGV4Lm1qcyNMMTE1LUwxMThcbiAgICAgIC8vIExpY2Vuc2U6IEFwYWNoZSAyLjBcbiAgICAgIGxldCBjblxuICAgICAgaWYgKChjbiA9IChuYXZpZ2F0b3IgYXMgYW55KS5jb25uZWN0aW9uKSkge1xuICAgICAgICAvLyBEb24ndCBwcmVmZXRjaCBpZiB1c2luZyAyRyBvciBpZiBTYXZlLURhdGEgaXMgZW5hYmxlZC5cbiAgICAgICAgaWYgKGNuLnNhdmVEYXRhIHx8IC8yZy8udGVzdChjbi5lZmZlY3RpdmVUeXBlKSkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0RmlsZXNGb3JSb3V0ZShhc3NldFByZWZpeCwgcm91dGUpXG4gICAgICAgIC50aGVuKChvdXRwdXQpID0+XG4gICAgICAgICAgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICBjYW5QcmVmZXRjaFxuICAgICAgICAgICAgICA/IG91dHB1dC5zY3JpcHRzLm1hcCgoc2NyaXB0KSA9PiBwcmVmZXRjaFZpYURvbShzY3JpcHQsICdzY3JpcHQnKSlcbiAgICAgICAgICAgICAgOiBbXVxuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgcmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PiB0aGlzLmxvYWRSb3V0ZShyb3V0ZSkpXG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChcbiAgICAgICAgICAvLyBzd2FsbG93IHByZWZldGNoIGVycm9yc1xuICAgICAgICAgICgpID0+IHt9XG4gICAgICAgIClcbiAgICB9LFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZVJvdXRlTG9hZGVyXG4iLCAiZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZVBhdGhTZXAocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXFxcXC9nLCAnLycpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZW5vcm1hbGl6ZVBhZ2VQYXRoKHBhZ2U6IHN0cmluZykge1xuICBwYWdlID0gbm9ybWFsaXplUGF0aFNlcChwYWdlKVxuICBpZiAocGFnZS5zdGFydHNXaXRoKCcvaW5kZXgvJykpIHtcbiAgICBwYWdlID0gcGFnZS5zbGljZSg2KVxuICB9IGVsc2UgaWYgKHBhZ2UgPT09ICcvaW5kZXgnKSB7XG4gICAgcGFnZSA9ICcvJ1xuICB9XG4gIHJldHVybiBwYWdlXG59XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUxvY2FsZVBhdGgoXG4gIHBhdGhuYW1lOiBzdHJpbmcsXG4gIGxvY2FsZXM/OiBzdHJpbmdbXVxuKToge1xuICBkZXRlY3RlZExvY2FsZT86IHN0cmluZ1xuICBwYXRobmFtZTogc3RyaW5nXG59IHtcbiAgbGV0IGRldGVjdGVkTG9jYWxlOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgLy8gZmlyc3QgaXRlbSB3aWxsIGJlIGVtcHR5IHN0cmluZyBmcm9tIHNwbGl0dGluZyBhdCBmaXJzdCBjaGFyXG4gIGNvbnN0IHBhdGhuYW1lUGFydHMgPSBwYXRobmFtZS5zcGxpdCgnLycpXG5cbiAgOyhsb2NhbGVzIHx8IFtdKS5zb21lKChsb2NhbGUpID0+IHtcbiAgICBpZiAocGF0aG5hbWVQYXJ0c1sxXS50b0xvd2VyQ2FzZSgpID09PSBsb2NhbGUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgZGV0ZWN0ZWRMb2NhbGUgPSBsb2NhbGVcbiAgICAgIHBhdGhuYW1lUGFydHMuc3BsaWNlKDEsIDEpXG4gICAgICBwYXRobmFtZSA9IHBhdGhuYW1lUGFydHMuam9pbignLycpIHx8ICcvJ1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG5cbiAgcmV0dXJuIHtcbiAgICBwYXRobmFtZSxcbiAgICBkZXRlY3RlZExvY2FsZSxcbiAgfVxufVxuIiwgIi8qXG5NSVQgTGljZW5zZVxuXG5Db3B5cmlnaHQgKGMpIEphc29uIE1pbGxlciAoaHR0cHM6Ly9qYXNvbmZvcm1hdC5jb20vKVxuXG5QZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5UaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG4qL1xuXG4vLyBUaGlzIGZpbGUgaXMgYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL2RldmVsb3BpdC9taXR0L2Jsb2IvdjEuMS4zL3NyYy9pbmRleC5qc1xuLy8gSXQncyBiZWVuIGVkaXRlZCBmb3IgdGhlIG5lZWRzIG9mIHRoaXMgc2NyaXB0XG4vLyBTZWUgdGhlIExJQ0VOU0UgYXQgdGhlIHRvcCBvZiB0aGUgZmlsZVxuXG50eXBlIEhhbmRsZXIgPSAoLi4uZXZ0czogYW55W10pID0+IHZvaWRcblxuZXhwb3J0IHR5cGUgTWl0dEVtaXR0ZXIgPSB7XG4gIG9uKHR5cGU6IHN0cmluZywgaGFuZGxlcjogSGFuZGxlcik6IHZvaWRcbiAgb2ZmKHR5cGU6IHN0cmluZywgaGFuZGxlcjogSGFuZGxlcik6IHZvaWRcbiAgZW1pdCh0eXBlOiBzdHJpbmcsIC4uLmV2dHM6IGFueVtdKTogdm9pZFxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBtaXR0KCk6IE1pdHRFbWl0dGVyIHtcbiAgY29uc3QgYWxsOiB7IFtzOiBzdHJpbmddOiBIYW5kbGVyW10gfSA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICByZXR1cm4ge1xuICAgIG9uKHR5cGU6IHN0cmluZywgaGFuZGxlcjogSGFuZGxlcikge1xuICAgICAgOyhhbGxbdHlwZV0gfHwgKGFsbFt0eXBlXSA9IFtdKSkucHVzaChoYW5kbGVyKVxuICAgIH0sXG5cbiAgICBvZmYodHlwZTogc3RyaW5nLCBoYW5kbGVyOiBIYW5kbGVyKSB7XG4gICAgICBpZiAoYWxsW3R5cGVdKSB7XG4gICAgICAgIGFsbFt0eXBlXS5zcGxpY2UoYWxsW3R5cGVdLmluZGV4T2YoaGFuZGxlcikgPj4+IDAsIDEpXG4gICAgICB9XG4gICAgfSxcblxuICAgIGVtaXQodHlwZTogc3RyaW5nLCAuLi5ldnRzOiBhbnlbXSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGFycmF5LWNhbGxiYWNrLXJldHVyblxuICAgICAgOyhhbGxbdHlwZV0gfHwgW10pLnNsaWNlKCkubWFwKChoYW5kbGVyOiBIYW5kbGVyKSA9PiB7XG4gICAgICAgIGhhbmRsZXIoLi4uZXZ0cylcbiAgICAgIH0pXG4gICAgfSxcbiAgfVxufVxuIiwgImltcG9ydCB7IFBhcnNlZFVybFF1ZXJ5IH0gZnJvbSAncXVlcnlzdHJpbmcnXG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hQYXJhbXNUb1VybFF1ZXJ5KFxuICBzZWFyY2hQYXJhbXM6IFVSTFNlYXJjaFBhcmFtc1xuKTogUGFyc2VkVXJsUXVlcnkge1xuICBjb25zdCBxdWVyeTogUGFyc2VkVXJsUXVlcnkgPSB7fVxuICBzZWFyY2hQYXJhbXMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgIGlmICh0eXBlb2YgcXVlcnlba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHF1ZXJ5W2tleV0gPSB2YWx1ZVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShxdWVyeVtrZXldKSkge1xuICAgICAgOyhxdWVyeVtrZXldIGFzIHN0cmluZ1tdKS5wdXNoKHZhbHVlKVxuICAgIH0gZWxzZSB7XG4gICAgICBxdWVyeVtrZXldID0gW3F1ZXJ5W2tleV0gYXMgc3RyaW5nLCB2YWx1ZV1cbiAgICB9XG4gIH0pXG4gIHJldHVybiBxdWVyeVxufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlVcmxRdWVyeVBhcmFtKHBhcmFtOiBzdHJpbmcpOiBzdHJpbmcge1xuICBpZiAoXG4gICAgdHlwZW9mIHBhcmFtID09PSAnc3RyaW5nJyB8fFxuICAgICh0eXBlb2YgcGFyYW0gPT09ICdudW1iZXInICYmICFpc05hTihwYXJhbSkpIHx8XG4gICAgdHlwZW9mIHBhcmFtID09PSAnYm9vbGVhbidcbiAgKSB7XG4gICAgcmV0dXJuIFN0cmluZyhwYXJhbSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gJydcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXJsUXVlcnlUb1NlYXJjaFBhcmFtcyhcbiAgdXJsUXVlcnk6IFBhcnNlZFVybFF1ZXJ5XG4pOiBVUkxTZWFyY2hQYXJhbXMge1xuICBjb25zdCByZXN1bHQgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKClcbiAgT2JqZWN0LmVudHJpZXModXJsUXVlcnkpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgdmFsdWUuZm9yRWFjaCgoaXRlbSkgPT4gcmVzdWx0LmFwcGVuZChrZXksIHN0cmluZ2lmeVVybFF1ZXJ5UGFyYW0oaXRlbSkpKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQuc2V0KGtleSwgc3RyaW5naWZ5VXJsUXVlcnlQYXJhbSh2YWx1ZSkpXG4gICAgfVxuICB9KVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NpZ24oXG4gIHRhcmdldDogVVJMU2VhcmNoUGFyYW1zLFxuICAuLi5zZWFyY2hQYXJhbXNMaXN0OiBVUkxTZWFyY2hQYXJhbXNbXVxuKTogVVJMU2VhcmNoUGFyYW1zIHtcbiAgc2VhcmNoUGFyYW1zTGlzdC5mb3JFYWNoKChzZWFyY2hQYXJhbXMpID0+IHtcbiAgICBBcnJheS5mcm9tKHNlYXJjaFBhcmFtcy5rZXlzKCkpLmZvckVhY2goKGtleSkgPT4gdGFyZ2V0LmRlbGV0ZShrZXkpKVxuICAgIHNlYXJjaFBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB0YXJnZXQuYXBwZW5kKGtleSwgdmFsdWUpKVxuICB9KVxuICByZXR1cm4gdGFyZ2V0XG59XG4iLCAiLy8gRm9ybWF0IGZ1bmN0aW9uIG1vZGlmaWVkIGZyb20gbm9kZWpzXG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuaW1wb3J0IHsgVXJsT2JqZWN0IH0gZnJvbSAndXJsJ1xuaW1wb3J0IHsgUGFyc2VkVXJsUXVlcnkgfSBmcm9tICdxdWVyeXN0cmluZydcbmltcG9ydCAqIGFzIHF1ZXJ5c3RyaW5nIGZyb20gJy4vcXVlcnlzdHJpbmcnXG5cbmNvbnN0IHNsYXNoZWRQcm90b2NvbHMgPSAvaHR0cHM/fGZ0cHxnb3BoZXJ8ZmlsZS9cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFVybCh1cmxPYmo6IFVybE9iamVjdCkge1xuICBsZXQgeyBhdXRoLCBob3N0bmFtZSB9ID0gdXJsT2JqXG4gIGxldCBwcm90b2NvbCA9IHVybE9iai5wcm90b2NvbCB8fCAnJ1xuICBsZXQgcGF0aG5hbWUgPSB1cmxPYmoucGF0aG5hbWUgfHwgJydcbiAgbGV0IGhhc2ggPSB1cmxPYmouaGFzaCB8fCAnJ1xuICBsZXQgcXVlcnkgPSB1cmxPYmoucXVlcnkgfHwgJydcbiAgbGV0IGhvc3Q6IHN0cmluZyB8IGZhbHNlID0gZmFsc2VcblxuICBhdXRoID0gYXV0aCA/IGVuY29kZVVSSUNvbXBvbmVudChhdXRoKS5yZXBsYWNlKC8lM0EvaSwgJzonKSArICdAJyA6ICcnXG5cbiAgaWYgKHVybE9iai5ob3N0KSB7XG4gICAgaG9zdCA9IGF1dGggKyB1cmxPYmouaG9zdFxuICB9IGVsc2UgaWYgKGhvc3RuYW1lKSB7XG4gICAgaG9zdCA9IGF1dGggKyAofmhvc3RuYW1lLmluZGV4T2YoJzonKSA/IGBbJHtob3N0bmFtZX1dYCA6IGhvc3RuYW1lKVxuICAgIGlmICh1cmxPYmoucG9ydCkge1xuICAgICAgaG9zdCArPSAnOicgKyB1cmxPYmoucG9ydFxuICAgIH1cbiAgfVxuXG4gIGlmIChxdWVyeSAmJiB0eXBlb2YgcXVlcnkgPT09ICdvYmplY3QnKSB7XG4gICAgcXVlcnkgPSBTdHJpbmcocXVlcnlzdHJpbmcudXJsUXVlcnlUb1NlYXJjaFBhcmFtcyhxdWVyeSBhcyBQYXJzZWRVcmxRdWVyeSkpXG4gIH1cblxuICBsZXQgc2VhcmNoID0gdXJsT2JqLnNlYXJjaCB8fCAocXVlcnkgJiYgYD8ke3F1ZXJ5fWApIHx8ICcnXG5cbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLnN1YnN0cigtMSkgIT09ICc6JykgcHJvdG9jb2wgKz0gJzonXG5cbiAgaWYgKFxuICAgIHVybE9iai5zbGFzaGVzIHx8XG4gICAgKCghcHJvdG9jb2wgfHwgc2xhc2hlZFByb3RvY29scy50ZXN0KHByb3RvY29sKSkgJiYgaG9zdCAhPT0gZmFsc2UpXG4gICkge1xuICAgIGhvc3QgPSAnLy8nICsgKGhvc3QgfHwgJycpXG4gICAgaWYgKHBhdGhuYW1lICYmIHBhdGhuYW1lWzBdICE9PSAnLycpIHBhdGhuYW1lID0gJy8nICsgcGF0aG5hbWVcbiAgfSBlbHNlIGlmICghaG9zdCkge1xuICAgIGhvc3QgPSAnJ1xuICB9XG5cbiAgaWYgKGhhc2ggJiYgaGFzaFswXSAhPT0gJyMnKSBoYXNoID0gJyMnICsgaGFzaFxuICBpZiAoc2VhcmNoICYmIHNlYXJjaFswXSAhPT0gJz8nKSBzZWFyY2ggPSAnPycgKyBzZWFyY2hcblxuICBwYXRobmFtZSA9IHBhdGhuYW1lLnJlcGxhY2UoL1s/I10vZywgZW5jb2RlVVJJQ29tcG9uZW50KVxuICBzZWFyY2ggPSBzZWFyY2gucmVwbGFjZSgnIycsICclMjMnKVxuXG4gIHJldHVybiBgJHtwcm90b2NvbH0ke2hvc3R9JHtwYXRobmFtZX0ke3NlYXJjaH0ke2hhc2h9YFxufVxuIiwgImltcG9ydCB7IEluY29taW5nTWVzc2FnZSwgU2VydmVyUmVzcG9uc2UgfSBmcm9tICdodHRwJ1xuaW1wb3J0IHsgUGFyc2VkVXJsUXVlcnkgfSBmcm9tICdxdWVyeXN0cmluZydcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFVybE9iamVjdCB9IGZyb20gJ3VybCdcbmltcG9ydCB7IGZvcm1hdFVybCB9IGZyb20gJy4vcm91dGVyL3V0aWxzL2Zvcm1hdC11cmwnXG5pbXBvcnQgeyBNYW5pZmVzdEl0ZW0gfSBmcm9tICcuLi9zZXJ2ZXIvbG9hZC1jb21wb25lbnRzJ1xuaW1wb3J0IHsgTmV4dFJvdXRlciB9IGZyb20gJy4vcm91dGVyL3JvdXRlcidcbmltcG9ydCB7IEVudiB9IGZyb20gJ0BuZXh0L2VudidcbmltcG9ydCB7IEJ1aWxkTWFuaWZlc3QgfSBmcm9tICcuLi9zZXJ2ZXIvZ2V0LXBhZ2UtZmlsZXMnXG5pbXBvcnQgeyBEb21haW5Mb2NhbGVzIH0gZnJvbSAnLi4vc2VydmVyL2NvbmZpZydcblxuLyoqXG4gKiBUeXBlcyB1c2VkIGJ5IGJvdGggbmV4dCBhbmQgbmV4dC1zZXJ2ZXJcbiAqL1xuXG5leHBvcnQgdHlwZSBOZXh0Q29tcG9uZW50VHlwZTxcbiAgQyBleHRlbmRzIEJhc2VDb250ZXh0ID0gTmV4dFBhZ2VDb250ZXh0LFxuICBJUCA9IHt9LFxuICBQID0ge31cbj4gPSBDb21wb25lbnRUeXBlPFA+ICYge1xuICAvKipcbiAgICogVXNlZCBmb3IgaW5pdGlhbCBwYWdlIGxvYWQgZGF0YSBwb3B1bGF0aW9uLiBEYXRhIHJldHVybmVkIGZyb20gYGdldEluaXRpYWxQcm9wc2AgaXMgc2VyaWFsaXplZCB3aGVuIHNlcnZlciByZW5kZXJlZC5cbiAgICogTWFrZSBzdXJlIHRvIHJldHVybiBwbGFpbiBgT2JqZWN0YCB3aXRob3V0IHVzaW5nIGBEYXRlYCwgYE1hcGAsIGBTZXRgLlxuICAgKiBAcGFyYW0gY3R4IENvbnRleHQgb2YgYHBhZ2VgXG4gICAqL1xuICBnZXRJbml0aWFsUHJvcHM/KGNvbnRleHQ6IEMpOiBJUCB8IFByb21pc2U8SVA+XG59XG5cbmV4cG9ydCB0eXBlIERvY3VtZW50VHlwZSA9IE5leHRDb21wb25lbnRUeXBlPFxuICBEb2N1bWVudENvbnRleHQsXG4gIERvY3VtZW50SW5pdGlhbFByb3BzLFxuICBEb2N1bWVudFByb3BzXG4+ICYge1xuICByZW5kZXJEb2N1bWVudChcbiAgICBEb2N1bWVudDogRG9jdW1lbnRUeXBlLFxuICAgIHByb3BzOiBEb2N1bWVudFByb3BzXG4gICk6IFJlYWN0LlJlYWN0RWxlbWVudFxufVxuXG5leHBvcnQgdHlwZSBBcHBUeXBlID0gTmV4dENvbXBvbmVudFR5cGU8XG4gIEFwcENvbnRleHRUeXBlLFxuICBBcHBJbml0aWFsUHJvcHMsXG4gIEFwcFByb3BzVHlwZVxuPlxuXG5leHBvcnQgdHlwZSBBcHBUcmVlVHlwZSA9IENvbXBvbmVudFR5cGU8XG4gIEFwcEluaXRpYWxQcm9wcyAmIHsgW25hbWU6IHN0cmluZ106IGFueSB9XG4+XG5cbi8qKlxuICogV2ViIHZpdGFscyBwcm92aWRlZCB0byBfYXBwLnJlcG9ydFdlYlZpdGFscyBieSBDb3JlIFdlYiBWaXRhbHMgcGx1Z2luIGRldmVsb3BlZCBieSBHb29nbGUgQ2hyb21lIHRlYW0uXG4gKiBodHRwczovL25leHRqcy5vcmcvYmxvZy9uZXh0LTktNCNpbnRlZ3JhdGVkLXdlYi12aXRhbHMtcmVwb3J0aW5nXG4gKi9cbmV4cG9ydCB0eXBlIE5leHRXZWJWaXRhbHNNZXRyaWMgPSB7XG4gIGlkOiBzdHJpbmdcbiAgbGFiZWw6IHN0cmluZ1xuICBuYW1lOiBzdHJpbmdcbiAgc3RhcnRUaW1lOiBudW1iZXJcbiAgdmFsdWU6IG51bWJlclxufVxuXG5leHBvcnQgdHlwZSBFbmhhbmNlcjxDPiA9IChDb21wb25lbnQ6IEMpID0+IENcblxuZXhwb3J0IHR5cGUgQ29tcG9uZW50c0VuaGFuY2VyID1cbiAgfCB7XG4gICAgICBlbmhhbmNlQXBwPzogRW5oYW5jZXI8QXBwVHlwZT5cbiAgICAgIGVuaGFuY2VDb21wb25lbnQ/OiBFbmhhbmNlcjxOZXh0Q29tcG9uZW50VHlwZT5cbiAgICB9XG4gIHwgRW5oYW5jZXI8TmV4dENvbXBvbmVudFR5cGU+XG5cbmV4cG9ydCB0eXBlIFJlbmRlclBhZ2VSZXN1bHQgPSB7XG4gIGh0bWw6IHN0cmluZ1xuICBoZWFkPzogQXJyYXk8SlNYLkVsZW1lbnQgfCBudWxsPlxufVxuXG5leHBvcnQgdHlwZSBSZW5kZXJQYWdlID0gKFxuICBvcHRpb25zPzogQ29tcG9uZW50c0VuaGFuY2VyXG4pID0+IFJlbmRlclBhZ2VSZXN1bHQgfCBQcm9taXNlPFJlbmRlclBhZ2VSZXN1bHQ+XG5cbmV4cG9ydCB0eXBlIEJhc2VDb250ZXh0ID0ge1xuICByZXM/OiBTZXJ2ZXJSZXNwb25zZVxuICBbazogc3RyaW5nXTogYW55XG59XG5cbmV4cG9ydCB0eXBlIE5FWFRfREFUQSA9IHtcbiAgcHJvcHM6IFJlY29yZDxzdHJpbmcsIGFueT5cbiAgcGFnZTogc3RyaW5nXG4gIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeVxuICBidWlsZElkOiBzdHJpbmdcbiAgYXNzZXRQcmVmaXg/OiBzdHJpbmdcbiAgcnVudGltZUNvbmZpZz86IHsgW2tleTogc3RyaW5nXTogYW55IH1cbiAgbmV4dEV4cG9ydD86IGJvb2xlYW5cbiAgYXV0b0V4cG9ydD86IGJvb2xlYW5cbiAgaXNGYWxsYmFjaz86IGJvb2xlYW5cbiAgZHluYW1pY0lkcz86IHN0cmluZ1tdXG4gIGVycj86IEVycm9yICYgeyBzdGF0dXNDb2RlPzogbnVtYmVyIH1cbiAgZ3NwPzogYm9vbGVhblxuICBnc3NwPzogYm9vbGVhblxuICBjdXN0b21TZXJ2ZXI/OiBib29sZWFuXG4gIGdpcD86IGJvb2xlYW5cbiAgYXBwR2lwPzogYm9vbGVhblxuICBsb2NhbGU/OiBzdHJpbmdcbiAgbG9jYWxlcz86IHN0cmluZ1tdXG4gIGRlZmF1bHRMb2NhbGU/OiBzdHJpbmdcbiAgZG9tYWluTG9jYWxlcz86IERvbWFpbkxvY2FsZXNcbn1cblxuLyoqXG4gKiBgTmV4dGAgY29udGV4dFxuICovXG5leHBvcnQgaW50ZXJmYWNlIE5leHRQYWdlQ29udGV4dCB7XG4gIC8qKlxuICAgKiBFcnJvciBvYmplY3QgaWYgZW5jb3VudGVyZWQgZHVyaW5nIHJlbmRlcmluZ1xuICAgKi9cbiAgZXJyPzogKEVycm9yICYgeyBzdGF0dXNDb2RlPzogbnVtYmVyIH0pIHwgbnVsbFxuICAvKipcbiAgICogYEhUVFBgIHJlcXVlc3Qgb2JqZWN0LlxuICAgKi9cbiAgcmVxPzogSW5jb21pbmdNZXNzYWdlXG4gIC8qKlxuICAgKiBgSFRUUGAgcmVzcG9uc2Ugb2JqZWN0LlxuICAgKi9cbiAgcmVzPzogU2VydmVyUmVzcG9uc2VcbiAgLyoqXG4gICAqIFBhdGggc2VjdGlvbiBvZiBgVVJMYC5cbiAgICovXG4gIHBhdGhuYW1lOiBzdHJpbmdcbiAgLyoqXG4gICAqIFF1ZXJ5IHN0cmluZyBzZWN0aW9uIG9mIGBVUkxgIHBhcnNlZCBhcyBhbiBvYmplY3QuXG4gICAqL1xuICBxdWVyeTogUGFyc2VkVXJsUXVlcnlcbiAgLyoqXG4gICAqIGBTdHJpbmdgIG9mIHRoZSBhY3R1YWwgcGF0aCBpbmNsdWRpbmcgcXVlcnkuXG4gICAqL1xuICBhc1BhdGg/OiBzdHJpbmdcbiAgLyoqXG4gICAqIGBDb21wb25lbnRgIHRoZSB0cmVlIG9mIHRoZSBBcHAgdG8gdXNlIGlmIG5lZWRpbmcgdG8gcmVuZGVyIHNlcGFyYXRlbHlcbiAgICovXG4gIEFwcFRyZWU6IEFwcFRyZWVUeXBlXG59XG5cbmV4cG9ydCB0eXBlIEFwcENvbnRleHRUeXBlPFIgZXh0ZW5kcyBOZXh0Um91dGVyID0gTmV4dFJvdXRlcj4gPSB7XG4gIENvbXBvbmVudDogTmV4dENvbXBvbmVudFR5cGU8TmV4dFBhZ2VDb250ZXh0PlxuICBBcHBUcmVlOiBBcHBUcmVlVHlwZVxuICBjdHg6IE5leHRQYWdlQ29udGV4dFxuICByb3V0ZXI6IFJcbn1cblxuZXhwb3J0IHR5cGUgQXBwSW5pdGlhbFByb3BzID0ge1xuICBwYWdlUHJvcHM6IGFueVxufVxuXG5leHBvcnQgdHlwZSBBcHBQcm9wc1R5cGU8XG4gIFIgZXh0ZW5kcyBOZXh0Um91dGVyID0gTmV4dFJvdXRlcixcbiAgUCA9IHt9XG4+ID0gQXBwSW5pdGlhbFByb3BzICYge1xuICBDb21wb25lbnQ6IE5leHRDb21wb25lbnRUeXBlPE5leHRQYWdlQ29udGV4dCwgYW55LCBQPlxuICByb3V0ZXI6IFJcbiAgX19OX1NTRz86IGJvb2xlYW5cbiAgX19OX1NTUD86IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgRG9jdW1lbnRDb250ZXh0ID0gTmV4dFBhZ2VDb250ZXh0ICYge1xuICByZW5kZXJQYWdlOiBSZW5kZXJQYWdlXG59XG5cbmV4cG9ydCB0eXBlIERvY3VtZW50SW5pdGlhbFByb3BzID0gUmVuZGVyUGFnZVJlc3VsdCAmIHtcbiAgc3R5bGVzPzogUmVhY3QuUmVhY3RFbGVtZW50W10gfCBSZWFjdC5SZWFjdEZyYWdtZW50XG59XG5cbmV4cG9ydCB0eXBlIERvY3VtZW50UHJvcHMgPSBEb2N1bWVudEluaXRpYWxQcm9wcyAmIHtcbiAgX19ORVhUX0RBVEFfXzogTkVYVF9EQVRBXG4gIGRhbmdlcm91c0FzUGF0aDogc3RyaW5nXG4gIGRvY0NvbXBvbmVudHNSZW5kZXJlZDoge1xuICAgIEh0bWw/OiBib29sZWFuXG4gICAgTWFpbj86IGJvb2xlYW5cbiAgICBIZWFkPzogYm9vbGVhblxuICAgIE5leHRTY3JpcHQ/OiBib29sZWFuXG4gIH1cbiAgYnVpbGRNYW5pZmVzdDogQnVpbGRNYW5pZmVzdFxuICBhbXBQYXRoOiBzdHJpbmdcbiAgaW5BbXBNb2RlOiBib29sZWFuXG4gIGh5YnJpZEFtcDogYm9vbGVhblxuICBpc0RldmVsb3BtZW50OiBib29sZWFuXG4gIGR5bmFtaWNJbXBvcnRzOiBNYW5pZmVzdEl0ZW1bXVxuICBhc3NldFByZWZpeD86IHN0cmluZ1xuICBjYW5vbmljYWxCYXNlOiBzdHJpbmdcbiAgaGVhZFRhZ3M6IGFueVtdXG4gIHVuc3RhYmxlX3J1bnRpbWVKUz86IGZhbHNlXG4gIHVuc3RhYmxlX0pzUHJlbG9hZD86IGZhbHNlXG4gIGRldk9ubHlDYWNoZUJ1c3RlclF1ZXJ5U3RyaW5nOiBzdHJpbmdcbiAgc2NyaXB0TG9hZGVyOiB7IGRlZmVyPzogc3RyaW5nW107IGVhZ2VyPzogYW55W10gfVxuICBsb2NhbGU/OiBzdHJpbmdcbn1cblxuLyoqXG4gKiBOZXh0IGBBUElgIHJvdXRlIHJlcXVlc3RcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBOZXh0QXBpUmVxdWVzdCBleHRlbmRzIEluY29taW5nTWVzc2FnZSB7XG4gIC8qKlxuICAgKiBPYmplY3Qgb2YgYHF1ZXJ5YCB2YWx1ZXMgZnJvbSB1cmxcbiAgICovXG4gIHF1ZXJ5OiB7XG4gICAgW2tleTogc3RyaW5nXTogc3RyaW5nIHwgc3RyaW5nW11cbiAgfVxuICAvKipcbiAgICogT2JqZWN0IG9mIGBjb29raWVzYCBmcm9tIGhlYWRlclxuICAgKi9cbiAgY29va2llczoge1xuICAgIFtrZXk6IHN0cmluZ106IHN0cmluZ1xuICB9XG5cbiAgYm9keTogYW55XG5cbiAgZW52OiBFbnZcblxuICBwcmV2aWV3PzogYm9vbGVhblxuICAvKipcbiAgICogUHJldmlldyBkYXRhIHNldCBvbiB0aGUgcmVxdWVzdCwgaWYgYW55XG4gICAqICovXG4gIHByZXZpZXdEYXRhPzogYW55XG59XG5cbi8qKlxuICogU2VuZCBib2R5IG9mIHJlc3BvbnNlXG4gKi9cbnR5cGUgU2VuZDxUPiA9IChib2R5OiBUKSA9PiB2b2lkXG5cbi8qKlxuICogTmV4dCBgQVBJYCByb3V0ZSByZXNwb25zZVxuICovXG5leHBvcnQgdHlwZSBOZXh0QXBpUmVzcG9uc2U8VCA9IGFueT4gPSBTZXJ2ZXJSZXNwb25zZSAmIHtcbiAgLyoqXG4gICAqIFNlbmQgZGF0YSBgYW55YCBkYXRhIGluIHJlc3BvbnNlXG4gICAqL1xuICBzZW5kOiBTZW5kPFQ+XG4gIC8qKlxuICAgKiBTZW5kIGRhdGEgYGpzb25gIGRhdGEgaW4gcmVzcG9uc2VcbiAgICovXG4gIGpzb246IFNlbmQ8VD5cbiAgc3RhdHVzOiAoc3RhdHVzQ29kZTogbnVtYmVyKSA9PiBOZXh0QXBpUmVzcG9uc2U8VD5cbiAgcmVkaXJlY3QodXJsOiBzdHJpbmcpOiBOZXh0QXBpUmVzcG9uc2U8VD5cbiAgcmVkaXJlY3Qoc3RhdHVzOiBudW1iZXIsIHVybDogc3RyaW5nKTogTmV4dEFwaVJlc3BvbnNlPFQ+XG5cbiAgLyoqXG4gICAqIFNldCBwcmV2aWV3IGRhdGEgZm9yIE5leHQuanMnIHByZXJlbmRlciBtb2RlXG4gICAqL1xuICBzZXRQcmV2aWV3RGF0YTogKFxuICAgIGRhdGE6IG9iamVjdCB8IHN0cmluZyxcbiAgICBvcHRpb25zPzoge1xuICAgICAgLyoqXG4gICAgICAgKiBTcGVjaWZpZXMgdGhlIG51bWJlciAoaW4gc2Vjb25kcykgZm9yIHRoZSBwcmV2aWV3IHNlc3Npb24gdG8gbGFzdCBmb3IuXG4gICAgICAgKiBUaGUgZ2l2ZW4gbnVtYmVyIHdpbGwgYmUgY29udmVydGVkIHRvIGFuIGludGVnZXIgYnkgcm91bmRpbmcgZG93bi5cbiAgICAgICAqIEJ5IGRlZmF1bHQsIG5vIG1heGltdW0gYWdlIGlzIHNldCBhbmQgdGhlIHByZXZpZXcgc2Vzc2lvbiBmaW5pc2hlc1xuICAgICAgICogd2hlbiB0aGUgY2xpZW50IHNodXRzIGRvd24gKGJyb3dzZXIgaXMgY2xvc2VkKS5cbiAgICAgICAqL1xuICAgICAgbWF4QWdlPzogbnVtYmVyXG4gICAgfVxuICApID0+IE5leHRBcGlSZXNwb25zZTxUPlxuICBjbGVhclByZXZpZXdEYXRhOiAoKSA9PiBOZXh0QXBpUmVzcG9uc2U8VD5cbn1cblxuLyoqXG4gKiBOZXh0IGBBUElgIHJvdXRlIGhhbmRsZXJcbiAqL1xuZXhwb3J0IHR5cGUgTmV4dEFwaUhhbmRsZXI8VCA9IGFueT4gPSAoXG4gIHJlcTogTmV4dEFwaVJlcXVlc3QsXG4gIHJlczogTmV4dEFwaVJlc3BvbnNlPFQ+XG4pID0+IHZvaWQgfCBQcm9taXNlPHZvaWQ+XG5cbi8qKlxuICogVXRpbHNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4ZWNPbmNlPFQgZXh0ZW5kcyAoLi4uYXJnczogYW55W10pID0+IFJldHVyblR5cGU8VD4+KFxuICBmbjogVFxuKTogVCB7XG4gIGxldCB1c2VkID0gZmFsc2VcbiAgbGV0IHJlc3VsdDogUmV0dXJuVHlwZTxUPlxuXG4gIHJldHVybiAoKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgaWYgKCF1c2VkKSB7XG4gICAgICB1c2VkID0gdHJ1ZVxuICAgICAgcmVzdWx0ID0gZm4oLi4uYXJncylcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9KSBhcyBUXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMb2NhdGlvbk9yaWdpbigpIHtcbiAgY29uc3QgeyBwcm90b2NvbCwgaG9zdG5hbWUsIHBvcnQgfSA9IHdpbmRvdy5sb2NhdGlvblxuICByZXR1cm4gYCR7cHJvdG9jb2x9Ly8ke2hvc3RuYW1lfSR7cG9ydCA/ICc6JyArIHBvcnQgOiAnJ31gXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVUkwoKSB7XG4gIGNvbnN0IHsgaHJlZiB9ID0gd2luZG93LmxvY2F0aW9uXG4gIGNvbnN0IG9yaWdpbiA9IGdldExvY2F0aW9uT3JpZ2luKClcbiAgcmV0dXJuIGhyZWYuc3Vic3RyaW5nKG9yaWdpbi5sZW5ndGgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXREaXNwbGF5TmFtZTxQPihDb21wb25lbnQ6IENvbXBvbmVudFR5cGU8UD4pIHtcbiAgcmV0dXJuIHR5cGVvZiBDb21wb25lbnQgPT09ICdzdHJpbmcnXG4gICAgPyBDb21wb25lbnRcbiAgICA6IENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb25lbnQubmFtZSB8fCAnVW5rbm93bidcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzUmVzU2VudChyZXM6IFNlcnZlclJlc3BvbnNlKSB7XG4gIHJldHVybiByZXMuZmluaXNoZWQgfHwgcmVzLmhlYWRlcnNTZW50XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkR2V0SW5pdGlhbFByb3BzPFxuICBDIGV4dGVuZHMgQmFzZUNvbnRleHQsXG4gIElQID0ge30sXG4gIFAgPSB7fVxuPihBcHA6IE5leHRDb21wb25lbnRUeXBlPEMsIElQLCBQPiwgY3R4OiBDKTogUHJvbWlzZTxJUD4ge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChBcHAucHJvdG90eXBlPy5nZXRJbml0aWFsUHJvcHMpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBgXCIke2dldERpc3BsYXlOYW1lKFxuICAgICAgICBBcHBcbiAgICAgICl9LmdldEluaXRpYWxQcm9wcygpXCIgaXMgZGVmaW5lZCBhcyBhbiBpbnN0YW5jZSBtZXRob2QgLSB2aXNpdCBodHRwczovL2Vyci5zaC92ZXJjZWwvbmV4dC5qcy9nZXQtaW5pdGlhbC1wcm9wcy1hcy1hbi1pbnN0YW5jZS1tZXRob2QgZm9yIG1vcmUgaW5mb3JtYXRpb24uYFxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpXG4gICAgfVxuICB9XG4gIC8vIHdoZW4gY2FsbGVkIGZyb20gX2FwcCBgY3R4YCBpcyBuZXN0ZWQgaW4gYGN0eGBcbiAgY29uc3QgcmVzID0gY3R4LnJlcyB8fCAoY3R4LmN0eCAmJiBjdHguY3R4LnJlcylcblxuICBpZiAoIUFwcC5nZXRJbml0aWFsUHJvcHMpIHtcbiAgICBpZiAoY3R4LmN0eCAmJiBjdHguQ29tcG9uZW50KSB7XG4gICAgICAvLyBAdHMtaWdub3JlIHBhZ2VQcm9wcyBkZWZhdWx0XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYWdlUHJvcHM6IGF3YWl0IGxvYWRHZXRJbml0aWFsUHJvcHMoY3R4LkNvbXBvbmVudCwgY3R4LmN0eCksXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7fSBhcyBJUFxuICB9XG5cbiAgY29uc3QgcHJvcHMgPSBhd2FpdCBBcHAuZ2V0SW5pdGlhbFByb3BzKGN0eClcblxuICBpZiAocmVzICYmIGlzUmVzU2VudChyZXMpKSB7XG4gICAgcmV0dXJuIHByb3BzXG4gIH1cblxuICBpZiAoIXByb3BzKSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGBcIiR7Z2V0RGlzcGxheU5hbWUoXG4gICAgICBBcHBcbiAgICApfS5nZXRJbml0aWFsUHJvcHMoKVwiIHNob3VsZCByZXNvbHZlIHRvIGFuIG9iamVjdC4gQnV0IGZvdW5kIFwiJHtwcm9wc31cIiBpbnN0ZWFkLmBcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSlcbiAgfVxuXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHByb3BzKS5sZW5ndGggPT09IDAgJiYgIWN0eC5jdHgpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYCR7Z2V0RGlzcGxheU5hbWUoXG4gICAgICAgICAgQXBwXG4gICAgICAgICl9IHJldHVybmVkIGFuIGVtcHR5IG9iamVjdCBmcm9tIFxcYGdldEluaXRpYWxQcm9wc1xcYC4gVGhpcyBkZS1vcHRpbWl6ZXMgYW5kIHByZXZlbnRzIGF1dG9tYXRpYyBzdGF0aWMgb3B0aW1pemF0aW9uLiBodHRwczovL2Vyci5zaC92ZXJjZWwvbmV4dC5qcy9lbXB0eS1vYmplY3QtZ2V0SW5pdGlhbFByb3BzYFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwcm9wc1xufVxuXG5leHBvcnQgY29uc3QgdXJsT2JqZWN0S2V5cyA9IFtcbiAgJ2F1dGgnLFxuICAnaGFzaCcsXG4gICdob3N0JyxcbiAgJ2hvc3RuYW1lJyxcbiAgJ2hyZWYnLFxuICAncGF0aCcsXG4gICdwYXRobmFtZScsXG4gICdwb3J0JyxcbiAgJ3Byb3RvY29sJyxcbiAgJ3F1ZXJ5JyxcbiAgJ3NlYXJjaCcsXG4gICdzbGFzaGVzJyxcbl1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcm1hdFdpdGhWYWxpZGF0aW9uKHVybDogVXJsT2JqZWN0KTogc3RyaW5nIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgaWYgKHVybCAhPT0gbnVsbCAmJiB0eXBlb2YgdXJsID09PSAnb2JqZWN0Jykge1xuICAgICAgT2JqZWN0LmtleXModXJsKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgaWYgKHVybE9iamVjdEtleXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgIGBVbmtub3duIGtleSBwYXNzZWQgdmlhIHVybE9iamVjdCBpbnRvIHVybC5mb3JtYXQ6ICR7a2V5fWBcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZvcm1hdFVybCh1cmwpXG59XG5cbmV4cG9ydCBjb25zdCBTUCA9IHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gJ3VuZGVmaW5lZCdcbmV4cG9ydCBjb25zdCBTVCA9XG4gIFNQICYmXG4gIHR5cGVvZiBwZXJmb3JtYW5jZS5tYXJrID09PSAnZnVuY3Rpb24nICYmXG4gIHR5cGVvZiBwZXJmb3JtYW5jZS5tZWFzdXJlID09PSAnZnVuY3Rpb24nXG4iLCAiLy8gSWRlbnRpZnkgL1twYXJhbV0vIGluIHJvdXRlIHN0cmluZ1xuY29uc3QgVEVTVF9ST1VURSA9IC9cXC9cXFtbXi9dKz9cXF0oPz1cXC98JCkvXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0R5bmFtaWNSb3V0ZShyb3V0ZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIHJldHVybiBURVNUX1JPVVRFLnRlc3Qocm91dGUpXG59XG4iLCAiaW1wb3J0IHsgZ2V0TG9jYXRpb25PcmlnaW4gfSBmcm9tICcuLi8uLi91dGlscydcbmltcG9ydCB7IHNlYXJjaFBhcmFtc1RvVXJsUXVlcnkgfSBmcm9tICcuL3F1ZXJ5c3RyaW5nJ1xuXG4vKipcbiAqIFBhcnNlcyBwYXRoLXJlbGF0aXZlIHVybHMgKGUuZy4gYC9oZWxsby93b3JsZD9mb289YmFyYCkuIElmIHVybCBpc24ndCBwYXRoLXJlbGF0aXZlXG4gKiAoZS5nLiBgLi9oZWxsb2ApIHRoZW4gYXQgbGVhc3QgYmFzZSBtdXN0IGJlLlxuICogQWJzb2x1dGUgdXJscyBhcmUgcmVqZWN0ZWQgd2l0aCBvbmUgZXhjZXB0aW9uLCBpbiB0aGUgYnJvd3NlciwgYWJzb2x1dGUgdXJscyB0aGF0IGFyZSBvblxuICogdGhlIGN1cnJlbnQgb3JpZ2luIHdpbGwgYmUgcGFyc2VkIGFzIHJlbGF0aXZlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVJlbGF0aXZlVXJsKHVybDogc3RyaW5nLCBiYXNlPzogc3RyaW5nKSB7XG4gIGNvbnN0IGdsb2JhbEJhc2UgPSBuZXcgVVJMKFxuICAgIHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnID8gJ2h0dHA6Ly9uJyA6IGdldExvY2F0aW9uT3JpZ2luKClcbiAgKVxuICBjb25zdCByZXNvbHZlZEJhc2UgPSBiYXNlID8gbmV3IFVSTChiYXNlLCBnbG9iYWxCYXNlKSA6IGdsb2JhbEJhc2VcbiAgY29uc3QgeyBwYXRobmFtZSwgc2VhcmNoUGFyYW1zLCBzZWFyY2gsIGhhc2gsIGhyZWYsIG9yaWdpbiB9ID0gbmV3IFVSTChcbiAgICB1cmwsXG4gICAgcmVzb2x2ZWRCYXNlXG4gIClcbiAgaWYgKG9yaWdpbiAhPT0gZ2xvYmFsQmFzZS5vcmlnaW4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGludmFyaWFudDogaW52YWxpZCByZWxhdGl2ZSBVUkwsIHJvdXRlciByZWNlaXZlZCAke3VybH1gKVxuICB9XG4gIHJldHVybiB7XG4gICAgcGF0aG5hbWUsXG4gICAgcXVlcnk6IHNlYXJjaFBhcmFtc1RvVXJsUXVlcnkoc2VhcmNoUGFyYW1zKSxcbiAgICBzZWFyY2gsXG4gICAgaGFzaCxcbiAgICBocmVmOiBocmVmLnNsaWNlKGdsb2JhbEJhc2Uub3JpZ2luLmxlbmd0aCksXG4gIH1cbn1cbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbi8qKlxuICogVG9rZW5pemUgaW5wdXQgc3RyaW5nLlxuICovXG5mdW5jdGlvbiBsZXhlcihzdHIpIHtcbiAgICB2YXIgdG9rZW5zID0gW107XG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlIChpIDwgc3RyLmxlbmd0aCkge1xuICAgICAgICB2YXIgY2hhciA9IHN0cltpXTtcbiAgICAgICAgaWYgKGNoYXIgPT09IFwiKlwiIHx8IGNoYXIgPT09IFwiK1wiIHx8IGNoYXIgPT09IFwiP1wiKSB7XG4gICAgICAgICAgICB0b2tlbnMucHVzaCh7IHR5cGU6IFwiTU9ESUZJRVJcIiwgaW5kZXg6IGksIHZhbHVlOiBzdHJbaSsrXSB9KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFyID09PSBcIlxcXFxcIikge1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goeyB0eXBlOiBcIkVTQ0FQRURfQ0hBUlwiLCBpbmRleDogaSsrLCB2YWx1ZTogc3RyW2krK10gfSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhciA9PT0gXCJ7XCIpIHtcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgdHlwZTogXCJPUEVOXCIsIGluZGV4OiBpLCB2YWx1ZTogc3RyW2krK10gfSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhciA9PT0gXCJ9XCIpIHtcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgdHlwZTogXCJDTE9TRVwiLCBpbmRleDogaSwgdmFsdWU6IHN0cltpKytdIH0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYXIgPT09IFwiOlwiKSB7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IFwiXCI7XG4gICAgICAgICAgICB2YXIgaiA9IGkgKyAxO1xuICAgICAgICAgICAgd2hpbGUgKGogPCBzdHIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvZGUgPSBzdHIuY2hhckNvZGVBdChqKTtcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgLy8gYDAtOWBcbiAgICAgICAgICAgICAgICAoY29kZSA+PSA0OCAmJiBjb2RlIDw9IDU3KSB8fFxuICAgICAgICAgICAgICAgICAgICAvLyBgQS1aYFxuICAgICAgICAgICAgICAgICAgICAoY29kZSA+PSA2NSAmJiBjb2RlIDw9IDkwKSB8fFxuICAgICAgICAgICAgICAgICAgICAvLyBgYS16YFxuICAgICAgICAgICAgICAgICAgICAoY29kZSA+PSA5NyAmJiBjb2RlIDw9IDEyMikgfHxcbiAgICAgICAgICAgICAgICAgICAgLy8gYF9gXG4gICAgICAgICAgICAgICAgICAgIGNvZGUgPT09IDk1KSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUgKz0gc3RyW2orK107XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbmFtZSlcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTWlzc2luZyBwYXJhbWV0ZXIgbmFtZSBhdCBcIiArIGkpO1xuICAgICAgICAgICAgdG9rZW5zLnB1c2goeyB0eXBlOiBcIk5BTUVcIiwgaW5kZXg6IGksIHZhbHVlOiBuYW1lIH0pO1xuICAgICAgICAgICAgaSA9IGo7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2hhciA9PT0gXCIoXCIpIHtcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDE7XG4gICAgICAgICAgICB2YXIgcGF0dGVybiA9IFwiXCI7XG4gICAgICAgICAgICB2YXIgaiA9IGkgKyAxO1xuICAgICAgICAgICAgaWYgKHN0cltqXSA9PT0gXCI/XCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUGF0dGVybiBjYW5ub3Qgc3RhcnQgd2l0aCBcXFwiP1xcXCIgYXQgXCIgKyBqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChqIDwgc3RyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmIChzdHJbal0gPT09IFwiXFxcXFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm4gKz0gc3RyW2orK10gKyBzdHJbaisrXTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdHJbal0gPT09IFwiKVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50LS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RyW2pdID09PSBcIihcIikge1xuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyW2ogKyAxXSAhPT0gXCI/XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYXB0dXJpbmcgZ3JvdXBzIGFyZSBub3QgYWxsb3dlZCBhdCBcIiArIGopO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhdHRlcm4gKz0gc3RyW2orK107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY291bnQpXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlVuYmFsYW5jZWQgcGF0dGVybiBhdCBcIiArIGkpO1xuICAgICAgICAgICAgaWYgKCFwYXR0ZXJuKVxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJNaXNzaW5nIHBhdHRlcm4gYXQgXCIgKyBpKTtcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHsgdHlwZTogXCJQQVRURVJOXCIsIGluZGV4OiBpLCB2YWx1ZTogcGF0dGVybiB9KTtcbiAgICAgICAgICAgIGkgPSBqO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5zLnB1c2goeyB0eXBlOiBcIkNIQVJcIiwgaW5kZXg6IGksIHZhbHVlOiBzdHJbaSsrXSB9KTtcbiAgICB9XG4gICAgdG9rZW5zLnB1c2goeyB0eXBlOiBcIkVORFwiLCBpbmRleDogaSwgdmFsdWU6IFwiXCIgfSk7XG4gICAgcmV0dXJuIHRva2Vucztcbn1cbi8qKlxuICogUGFyc2UgYSBzdHJpbmcgZm9yIHRoZSByYXcgdG9rZW5zLlxuICovXG5mdW5jdGlvbiBwYXJzZShzdHIsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciB0b2tlbnMgPSBsZXhlcihzdHIpO1xuICAgIHZhciBfYSA9IG9wdGlvbnMucHJlZml4ZXMsIHByZWZpeGVzID0gX2EgPT09IHZvaWQgMCA/IFwiLi9cIiA6IF9hO1xuICAgIHZhciBkZWZhdWx0UGF0dGVybiA9IFwiW15cIiArIGVzY2FwZVN0cmluZyhvcHRpb25zLmRlbGltaXRlciB8fCBcIi8jP1wiKSArIFwiXSs/XCI7XG4gICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgIHZhciBrZXkgPSAwO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcGF0aCA9IFwiXCI7XG4gICAgdmFyIHRyeUNvbnN1bWUgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICBpZiAoaSA8IHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW2ldLnR5cGUgPT09IHR5cGUpXG4gICAgICAgICAgICByZXR1cm4gdG9rZW5zW2krK10udmFsdWU7XG4gICAgfTtcbiAgICB2YXIgbXVzdENvbnN1bWUgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICB2YXIgdmFsdWUgPSB0cnlDb25zdW1lKHR5cGUpO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgdmFyIF9hID0gdG9rZW5zW2ldLCBuZXh0VHlwZSA9IF9hLnR5cGUsIGluZGV4ID0gX2EuaW5kZXg7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJVbmV4cGVjdGVkIFwiICsgbmV4dFR5cGUgKyBcIiBhdCBcIiArIGluZGV4ICsgXCIsIGV4cGVjdGVkIFwiICsgdHlwZSk7XG4gICAgfTtcbiAgICB2YXIgY29uc3VtZVRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBcIlwiO1xuICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZVxuICAgICAgICB3aGlsZSAoKHZhbHVlID0gdHJ5Q29uc3VtZShcIkNIQVJcIikgfHwgdHJ5Q29uc3VtZShcIkVTQ0FQRURfQ0hBUlwiKSkpIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgd2hpbGUgKGkgPCB0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBjaGFyID0gdHJ5Q29uc3VtZShcIkNIQVJcIik7XG4gICAgICAgIHZhciBuYW1lID0gdHJ5Q29uc3VtZShcIk5BTUVcIik7XG4gICAgICAgIHZhciBwYXR0ZXJuID0gdHJ5Q29uc3VtZShcIlBBVFRFUk5cIik7XG4gICAgICAgIGlmIChuYW1lIHx8IHBhdHRlcm4pIHtcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSBjaGFyIHx8IFwiXCI7XG4gICAgICAgICAgICBpZiAocHJlZml4ZXMuaW5kZXhPZihwcmVmaXgpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHBhdGggKz0gcHJlZml4O1xuICAgICAgICAgICAgICAgIHByZWZpeCA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBhdGgpO1xuICAgICAgICAgICAgICAgIHBhdGggPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUgfHwga2V5KyssXG4gICAgICAgICAgICAgICAgcHJlZml4OiBwcmVmaXgsXG4gICAgICAgICAgICAgICAgc3VmZml4OiBcIlwiLFxuICAgICAgICAgICAgICAgIHBhdHRlcm46IHBhdHRlcm4gfHwgZGVmYXVsdFBhdHRlcm4sXG4gICAgICAgICAgICAgICAgbW9kaWZpZXI6IHRyeUNvbnN1bWUoXCJNT0RJRklFUlwiKSB8fCBcIlwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciB2YWx1ZSA9IGNoYXIgfHwgdHJ5Q29uc3VtZShcIkVTQ0FQRURfQ0hBUlwiKTtcbiAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICBwYXRoICs9IHZhbHVlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHBhdGgpO1xuICAgICAgICAgICAgcGF0aCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9wZW4gPSB0cnlDb25zdW1lKFwiT1BFTlwiKTtcbiAgICAgICAgaWYgKG9wZW4pIHtcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSBjb25zdW1lVGV4dCgpO1xuICAgICAgICAgICAgdmFyIG5hbWVfMSA9IHRyeUNvbnN1bWUoXCJOQU1FXCIpIHx8IFwiXCI7XG4gICAgICAgICAgICB2YXIgcGF0dGVybl8xID0gdHJ5Q29uc3VtZShcIlBBVFRFUk5cIikgfHwgXCJcIjtcbiAgICAgICAgICAgIHZhciBzdWZmaXggPSBjb25zdW1lVGV4dCgpO1xuICAgICAgICAgICAgbXVzdENvbnN1bWUoXCJDTE9TRVwiKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lXzEgfHwgKHBhdHRlcm5fMSA/IGtleSsrIDogXCJcIiksXG4gICAgICAgICAgICAgICAgcGF0dGVybjogbmFtZV8xICYmICFwYXR0ZXJuXzEgPyBkZWZhdWx0UGF0dGVybiA6IHBhdHRlcm5fMSxcbiAgICAgICAgICAgICAgICBwcmVmaXg6IHByZWZpeCxcbiAgICAgICAgICAgICAgICBzdWZmaXg6IHN1ZmZpeCxcbiAgICAgICAgICAgICAgICBtb2RpZmllcjogdHJ5Q29uc3VtZShcIk1PRElGSUVSXCIpIHx8IFwiXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgbXVzdENvbnN1bWUoXCJFTkRcIik7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG4vKipcbiAqIENvbXBpbGUgYSBzdHJpbmcgdG8gYSB0ZW1wbGF0ZSBmdW5jdGlvbiBmb3IgdGhlIHBhdGguXG4gKi9cbmZ1bmN0aW9uIGNvbXBpbGUoc3RyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIHRva2Vuc1RvRnVuY3Rpb24ocGFyc2Uoc3RyLCBvcHRpb25zKSwgb3B0aW9ucyk7XG59XG5leHBvcnRzLmNvbXBpbGUgPSBjb21waWxlO1xuLyoqXG4gKiBFeHBvc2UgYSBtZXRob2QgZm9yIHRyYW5zZm9ybWluZyB0b2tlbnMgaW50byB0aGUgcGF0aCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gdG9rZW5zVG9GdW5jdGlvbih0b2tlbnMsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7IG9wdGlvbnMgPSB7fTsgfVxuICAgIHZhciByZUZsYWdzID0gZmxhZ3Mob3B0aW9ucyk7XG4gICAgdmFyIF9hID0gb3B0aW9ucy5lbmNvZGUsIGVuY29kZSA9IF9hID09PSB2b2lkIDAgPyBmdW5jdGlvbiAoeCkgeyByZXR1cm4geDsgfSA6IF9hLCBfYiA9IG9wdGlvbnMudmFsaWRhdGUsIHZhbGlkYXRlID0gX2IgPT09IHZvaWQgMCA/IHRydWUgOiBfYjtcbiAgICAvLyBDb21waWxlIGFsbCB0aGUgdG9rZW5zIGludG8gcmVnZXhwcy5cbiAgICB2YXIgbWF0Y2hlcyA9IHRva2Vucy5tYXAoZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVnRXhwKFwiXig/OlwiICsgdG9rZW4ucGF0dGVybiArIFwiKSRcIiwgcmVGbGFncyk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIHBhdGggPSBcIlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIHBhdGggKz0gdG9rZW47XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBkYXRhID8gZGF0YVt0b2tlbi5uYW1lXSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHZhciBvcHRpb25hbCA9IHRva2VuLm1vZGlmaWVyID09PSBcIj9cIiB8fCB0b2tlbi5tb2RpZmllciA9PT0gXCIqXCI7XG4gICAgICAgICAgICB2YXIgcmVwZWF0ID0gdG9rZW4ubW9kaWZpZXIgPT09IFwiKlwiIHx8IHRva2VuLm1vZGlmaWVyID09PSBcIitcIjtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgICAgIGlmICghcmVwZWF0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBcXFwiXCIgKyB0b2tlbi5uYW1lICsgXCJcXFwiIHRvIG5vdCByZXBlYXQsIGJ1dCBnb3QgYW4gYXJyYXlcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbmFsKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBcXFwiXCIgKyB0b2tlbi5uYW1lICsgXCJcXFwiIHRvIG5vdCBiZSBlbXB0eVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWx1ZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2VnbWVudCA9IGVuY29kZSh2YWx1ZVtqXSwgdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGUgJiYgIW1hdGNoZXNbaV0udGVzdChzZWdtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIGFsbCBcXFwiXCIgKyB0b2tlbi5uYW1lICsgXCJcXFwiIHRvIG1hdGNoIFxcXCJcIiArIHRva2VuLnBhdHRlcm4gKyBcIlxcXCIsIGJ1dCBnb3QgXFxcIlwiICsgc2VnbWVudCArIFwiXFxcIlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYXRoICs9IHRva2VuLnByZWZpeCArIHNlZ21lbnQgKyB0b2tlbi5zdWZmaXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnbWVudCA9IGVuY29kZShTdHJpbmcodmFsdWUpLCB0b2tlbik7XG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRlICYmICFtYXRjaGVzW2ldLnRlc3Qoc2VnbWVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkV4cGVjdGVkIFxcXCJcIiArIHRva2VuLm5hbWUgKyBcIlxcXCIgdG8gbWF0Y2ggXFxcIlwiICsgdG9rZW4ucGF0dGVybiArIFwiXFxcIiwgYnV0IGdvdCBcXFwiXCIgKyBzZWdtZW50ICsgXCJcXFwiXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXRoICs9IHRva2VuLnByZWZpeCArIHNlZ21lbnQgKyB0b2tlbi5zdWZmaXg7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9uYWwpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB2YXIgdHlwZU9mTWVzc2FnZSA9IHJlcGVhdCA/IFwiYW4gYXJyYXlcIiA6IFwiYSBzdHJpbmdcIjtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJFeHBlY3RlZCBcXFwiXCIgKyB0b2tlbi5uYW1lICsgXCJcXFwiIHRvIGJlIFwiICsgdHlwZU9mTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgfTtcbn1cbmV4cG9ydHMudG9rZW5zVG9GdW5jdGlvbiA9IHRva2Vuc1RvRnVuY3Rpb247XG4vKipcbiAqIENyZWF0ZSBwYXRoIG1hdGNoIGZ1bmN0aW9uIGZyb20gYHBhdGgtdG8tcmVnZXhwYCBzcGVjLlxuICovXG5mdW5jdGlvbiBtYXRjaChzdHIsIG9wdGlvbnMpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIHZhciByZSA9IHBhdGhUb1JlZ2V4cChzdHIsIGtleXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiByZWdleHBUb0Z1bmN0aW9uKHJlLCBrZXlzLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMubWF0Y2ggPSBtYXRjaDtcbi8qKlxuICogQ3JlYXRlIGEgcGF0aCBtYXRjaCBmdW5jdGlvbiBmcm9tIGBwYXRoLXRvLXJlZ2V4cGAgb3V0cHV0LlxuICovXG5mdW5jdGlvbiByZWdleHBUb0Z1bmN0aW9uKHJlLCBrZXlzLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkgeyBvcHRpb25zID0ge307IH1cbiAgICB2YXIgX2EgPSBvcHRpb25zLmRlY29kZSwgZGVjb2RlID0gX2EgPT09IHZvaWQgMCA/IGZ1bmN0aW9uICh4KSB7IHJldHVybiB4OyB9IDogX2E7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChwYXRobmFtZSkge1xuICAgICAgICB2YXIgbSA9IHJlLmV4ZWMocGF0aG5hbWUpO1xuICAgICAgICBpZiAoIW0pXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBwYXRoID0gbVswXSwgaW5kZXggPSBtLmluZGV4O1xuICAgICAgICB2YXIgcGFyYW1zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICBpZiAobVtpXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbnRpbnVlXCI7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c1tpIC0gMV07XG4gICAgICAgICAgICBpZiAoa2V5Lm1vZGlmaWVyID09PSBcIipcIiB8fCBrZXkubW9kaWZpZXIgPT09IFwiK1wiKSB7XG4gICAgICAgICAgICAgICAgcGFyYW1zW2tleS5uYW1lXSA9IG1baV0uc3BsaXQoa2V5LnByZWZpeCArIGtleS5zdWZmaXgpLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRlY29kZSh2YWx1ZSwga2V5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHBhcmFtc1trZXkubmFtZV0gPSBkZWNvZGUobVtpXSwga2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBtLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBfbG9vcF8xKGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHBhdGg6IHBhdGgsIGluZGV4OiBpbmRleCwgcGFyYW1zOiBwYXJhbXMgfTtcbiAgICB9O1xufVxuZXhwb3J0cy5yZWdleHBUb0Z1bmN0aW9uID0gcmVnZXhwVG9GdW5jdGlvbjtcbi8qKlxuICogRXNjYXBlIGEgcmVndWxhciBleHByZXNzaW9uIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gZXNjYXBlU3RyaW5nKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvKFsuKyo/PV4hOiR7fSgpW1xcXXwvXFxcXF0pL2csIFwiXFxcXCQxXCIpO1xufVxuLyoqXG4gKiBHZXQgdGhlIGZsYWdzIGZvciBhIHJlZ2V4cCBmcm9tIHRoZSBvcHRpb25zLlxuICovXG5mdW5jdGlvbiBmbGFncyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMgJiYgb3B0aW9ucy5zZW5zaXRpdmUgPyBcIlwiIDogXCJpXCI7XG59XG4vKipcbiAqIFB1bGwgb3V0IGtleXMgZnJvbSBhIHJlZ2V4cC5cbiAqL1xuZnVuY3Rpb24gcmVnZXhwVG9SZWdleHAocGF0aCwga2V5cykge1xuICAgIGlmICgha2V5cylcbiAgICAgICAgcmV0dXJuIHBhdGg7XG4gICAgLy8gVXNlIGEgbmVnYXRpdmUgbG9va2FoZWFkIHRvIG1hdGNoIG9ubHkgY2FwdHVyaW5nIGdyb3Vwcy5cbiAgICB2YXIgZ3JvdXBzID0gcGF0aC5zb3VyY2UubWF0Y2goL1xcKCg/IVxcPykvZyk7XG4gICAgaWYgKGdyb3Vwcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAga2V5cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBpLFxuICAgICAgICAgICAgICAgIHByZWZpeDogXCJcIixcbiAgICAgICAgICAgICAgICBzdWZmaXg6IFwiXCIsXG4gICAgICAgICAgICAgICAgbW9kaWZpZXI6IFwiXCIsXG4gICAgICAgICAgICAgICAgcGF0dGVybjogXCJcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBhdGg7XG59XG4vKipcbiAqIFRyYW5zZm9ybSBhbiBhcnJheSBpbnRvIGEgcmVnZXhwLlxuICovXG5mdW5jdGlvbiBhcnJheVRvUmVnZXhwKHBhdGhzLCBrZXlzLCBvcHRpb25zKSB7XG4gICAgdmFyIHBhcnRzID0gcGF0aHMubWFwKGZ1bmN0aW9uIChwYXRoKSB7IHJldHVybiBwYXRoVG9SZWdleHAocGF0aCwga2V5cywgb3B0aW9ucykuc291cmNlOyB9KTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChcIig/OlwiICsgcGFydHMuam9pbihcInxcIikgKyBcIilcIiwgZmxhZ3Mob3B0aW9ucykpO1xufVxuLyoqXG4gKiBDcmVhdGUgYSBwYXRoIHJlZ2V4cCBmcm9tIHN0cmluZyBpbnB1dC5cbiAqL1xuZnVuY3Rpb24gc3RyaW5nVG9SZWdleHAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICAgIHJldHVybiB0b2tlbnNUb1JlZ2V4cChwYXJzZShwYXRoLCBvcHRpb25zKSwga2V5cywgb3B0aW9ucyk7XG59XG4vKipcbiAqIEV4cG9zZSBhIGZ1bmN0aW9uIGZvciB0YWtpbmcgdG9rZW5zIGFuZCByZXR1cm5pbmcgYSBSZWdFeHAuXG4gKi9cbmZ1bmN0aW9uIHRva2Vuc1RvUmVnZXhwKHRva2Vucywga2V5cywgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHsgb3B0aW9ucyA9IHt9OyB9XG4gICAgdmFyIF9hID0gb3B0aW9ucy5zdHJpY3QsIHN0cmljdCA9IF9hID09PSB2b2lkIDAgPyBmYWxzZSA6IF9hLCBfYiA9IG9wdGlvbnMuc3RhcnQsIHN0YXJ0ID0gX2IgPT09IHZvaWQgMCA/IHRydWUgOiBfYiwgX2MgPSBvcHRpb25zLmVuZCwgZW5kID0gX2MgPT09IHZvaWQgMCA/IHRydWUgOiBfYywgX2QgPSBvcHRpb25zLmVuY29kZSwgZW5jb2RlID0gX2QgPT09IHZvaWQgMCA/IGZ1bmN0aW9uICh4KSB7IHJldHVybiB4OyB9IDogX2Q7XG4gICAgdmFyIGVuZHNXaXRoID0gXCJbXCIgKyBlc2NhcGVTdHJpbmcob3B0aW9ucy5lbmRzV2l0aCB8fCBcIlwiKSArIFwiXXwkXCI7XG4gICAgdmFyIGRlbGltaXRlciA9IFwiW1wiICsgZXNjYXBlU3RyaW5nKG9wdGlvbnMuZGVsaW1pdGVyIHx8IFwiLyM/XCIpICsgXCJdXCI7XG4gICAgdmFyIHJvdXRlID0gc3RhcnQgPyBcIl5cIiA6IFwiXCI7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSB0b2tlbnMgYW5kIGNyZWF0ZSBvdXIgcmVnZXhwIHN0cmluZy5cbiAgICBmb3IgKHZhciBfaSA9IDAsIHRva2Vuc18xID0gdG9rZW5zOyBfaSA8IHRva2Vuc18xLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgdG9rZW4gPSB0b2tlbnNfMVtfaV07XG4gICAgICAgIGlmICh0eXBlb2YgdG9rZW4gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHJvdXRlICs9IGVzY2FwZVN0cmluZyhlbmNvZGUodG9rZW4pKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSBlc2NhcGVTdHJpbmcoZW5jb2RlKHRva2VuLnByZWZpeCkpO1xuICAgICAgICAgICAgdmFyIHN1ZmZpeCA9IGVzY2FwZVN0cmluZyhlbmNvZGUodG9rZW4uc3VmZml4KSk7XG4gICAgICAgICAgICBpZiAodG9rZW4ucGF0dGVybikge1xuICAgICAgICAgICAgICAgIGlmIChrZXlzKVxuICAgICAgICAgICAgICAgICAgICBrZXlzLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgICAgIGlmIChwcmVmaXggfHwgc3VmZml4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b2tlbi5tb2RpZmllciA9PT0gXCIrXCIgfHwgdG9rZW4ubW9kaWZpZXIgPT09IFwiKlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbW9kID0gdG9rZW4ubW9kaWZpZXIgPT09IFwiKlwiID8gXCI/XCIgOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUgKz0gXCIoPzpcIiArIHByZWZpeCArIFwiKCg/OlwiICsgdG9rZW4ucGF0dGVybiArIFwiKSg/OlwiICsgc3VmZml4ICsgcHJlZml4ICsgXCIoPzpcIiArIHRva2VuLnBhdHRlcm4gKyBcIikpKilcIiArIHN1ZmZpeCArIFwiKVwiICsgbW9kO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm91dGUgKz0gXCIoPzpcIiArIHByZWZpeCArIFwiKFwiICsgdG9rZW4ucGF0dGVybiArIFwiKVwiICsgc3VmZml4ICsgXCIpXCIgKyB0b2tlbi5tb2RpZmllcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcm91dGUgKz0gXCIoXCIgKyB0b2tlbi5wYXR0ZXJuICsgXCIpXCIgKyB0b2tlbi5tb2RpZmllcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3V0ZSArPSBcIig/OlwiICsgcHJlZml4ICsgc3VmZml4ICsgXCIpXCIgKyB0b2tlbi5tb2RpZmllcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5kKSB7XG4gICAgICAgIGlmICghc3RyaWN0KVxuICAgICAgICAgICAgcm91dGUgKz0gZGVsaW1pdGVyICsgXCI/XCI7XG4gICAgICAgIHJvdXRlICs9ICFvcHRpb25zLmVuZHNXaXRoID8gXCIkXCIgOiBcIig/PVwiICsgZW5kc1dpdGggKyBcIilcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBlbmRUb2tlbiA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV07XG4gICAgICAgIHZhciBpc0VuZERlbGltaXRlZCA9IHR5cGVvZiBlbmRUb2tlbiA9PT0gXCJzdHJpbmdcIlxuICAgICAgICAgICAgPyBkZWxpbWl0ZXIuaW5kZXhPZihlbmRUb2tlbltlbmRUb2tlbi5sZW5ndGggLSAxXSkgPiAtMVxuICAgICAgICAgICAgOiAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgICAgICAgICBlbmRUb2tlbiA9PT0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAoIXN0cmljdCkge1xuICAgICAgICAgICAgcm91dGUgKz0gXCIoPzpcIiArIGRlbGltaXRlciArIFwiKD89XCIgKyBlbmRzV2l0aCArIFwiKSk/XCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc0VuZERlbGltaXRlZCkge1xuICAgICAgICAgICAgcm91dGUgKz0gXCIoPz1cIiArIGRlbGltaXRlciArIFwifFwiICsgZW5kc1dpdGggKyBcIilcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFJlZ0V4cChyb3V0ZSwgZmxhZ3Mob3B0aW9ucykpO1xufVxuZXhwb3J0cy50b2tlbnNUb1JlZ2V4cCA9IHRva2Vuc1RvUmVnZXhwO1xuLyoqXG4gKiBOb3JtYWxpemUgdGhlIGdpdmVuIHBhdGggc3RyaW5nLCByZXR1cm5pbmcgYSByZWd1bGFyIGV4cHJlc3Npb24uXG4gKlxuICogQW4gZW1wdHkgYXJyYXkgY2FuIGJlIHBhc3NlZCBpbiBmb3IgdGhlIGtleXMsIHdoaWNoIHdpbGwgaG9sZCB0aGVcbiAqIHBsYWNlaG9sZGVyIGtleSBkZXNjcmlwdGlvbnMuIEZvciBleGFtcGxlLCB1c2luZyBgL3VzZXIvOmlkYCwgYGtleXNgIHdpbGxcbiAqIGNvbnRhaW4gYFt7IG5hbWU6ICdpZCcsIGRlbGltaXRlcjogJy8nLCBvcHRpb25hbDogZmFsc2UsIHJlcGVhdDogZmFsc2UgfV1gLlxuICovXG5mdW5jdGlvbiBwYXRoVG9SZWdleHAocGF0aCwga2V5cywgb3B0aW9ucykge1xuICAgIGlmIChwYXRoIGluc3RhbmNlb2YgUmVnRXhwKVxuICAgICAgICByZXR1cm4gcmVnZXhwVG9SZWdleHAocGF0aCwga2V5cyk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkocGF0aCkpXG4gICAgICAgIHJldHVybiBhcnJheVRvUmVnZXhwKHBhdGgsIGtleXMsIG9wdGlvbnMpO1xuICAgIHJldHVybiBzdHJpbmdUb1JlZ2V4cChwYXRoLCBrZXlzLCBvcHRpb25zKTtcbn1cbmV4cG9ydHMucGF0aFRvUmVnZXhwID0gcGF0aFRvUmVnZXhwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwIiwgImltcG9ydCAqIGFzIHBhdGhUb1JlZ2V4cCBmcm9tICduZXh0L2Rpc3QvY29tcGlsZWQvcGF0aC10by1yZWdleHAnXG5cbmV4cG9ydCB7IHBhdGhUb1JlZ2V4cCB9XG5cbmV4cG9ydCBjb25zdCBtYXRjaGVyT3B0aW9uczogcGF0aFRvUmVnZXhwLlRva2Vuc1RvUmVnZXhwT3B0aW9ucyAmXG4gIHBhdGhUb1JlZ2V4cC5QYXJzZU9wdGlvbnMgPSB7XG4gIHNlbnNpdGl2ZTogZmFsc2UsXG4gIGRlbGltaXRlcjogJy8nLFxufVxuXG5leHBvcnQgY29uc3QgY3VzdG9tUm91dGVNYXRjaGVyT3B0aW9uczogcGF0aFRvUmVnZXhwLlRva2Vuc1RvUmVnZXhwT3B0aW9ucyAmXG4gIHBhdGhUb1JlZ2V4cC5QYXJzZU9wdGlvbnMgPSB7XG4gIC4uLm1hdGNoZXJPcHRpb25zLFxuICBzdHJpY3Q6IHRydWUsXG59XG5cbmV4cG9ydCBkZWZhdWx0IChjdXN0b21Sb3V0ZSA9IGZhbHNlKSA9PiB7XG4gIHJldHVybiAocGF0aDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qga2V5czogcGF0aFRvUmVnZXhwLktleVtdID0gW11cbiAgICBjb25zdCBtYXRjaGVyUmVnZXggPSBwYXRoVG9SZWdleHAucGF0aFRvUmVnZXhwKFxuICAgICAgcGF0aCxcbiAgICAgIGtleXMsXG4gICAgICBjdXN0b21Sb3V0ZSA/IGN1c3RvbVJvdXRlTWF0Y2hlck9wdGlvbnMgOiBtYXRjaGVyT3B0aW9uc1xuICAgIClcbiAgICBjb25zdCBtYXRjaGVyID0gcGF0aFRvUmVnZXhwLnJlZ2V4cFRvRnVuY3Rpb24obWF0Y2hlclJlZ2V4LCBrZXlzKVxuXG4gICAgcmV0dXJuIChwYXRobmFtZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCwgcGFyYW1zPzogYW55KSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBwYXRobmFtZSA9PSBudWxsID8gZmFsc2UgOiBtYXRjaGVyKHBhdGhuYW1lKVxuICAgICAgaWYgKCFyZXMpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG5cbiAgICAgIGlmIChjdXN0b21Sb3V0ZSkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBrZXlzKSB7XG4gICAgICAgICAgLy8gdW5uYW1lZCBwYXJhbXMgc2hvdWxkIGJlIHJlbW92ZWQgYXMgdGhleVxuICAgICAgICAgIC8vIGFyZSBub3QgYWxsb3dlZCB0byBiZSB1c2VkIGluIHRoZSBkZXN0aW5hdGlvblxuICAgICAgICAgIGlmICh0eXBlb2Yga2V5Lm5hbWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBkZWxldGUgKHJlcy5wYXJhbXMgYXMgYW55KVtrZXkubmFtZV1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgLi4ucGFyYW1zLCAuLi5yZXMucGFyYW1zIH1cbiAgICB9XG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRVcmxRdWVyeSB9IGZyb20gJ3F1ZXJ5c3RyaW5nJ1xuaW1wb3J0IHsgc2VhcmNoUGFyYW1zVG9VcmxRdWVyeSB9IGZyb20gJy4vcXVlcnlzdHJpbmcnXG5pbXBvcnQgeyBwYXJzZVJlbGF0aXZlVXJsIH0gZnJvbSAnLi9wYXJzZS1yZWxhdGl2ZS11cmwnXG5pbXBvcnQgKiBhcyBwYXRoVG9SZWdleHAgZnJvbSAnbmV4dC9kaXN0L2NvbXBpbGVkL3BhdGgtdG8tcmVnZXhwJ1xuXG50eXBlIFBhcmFtcyA9IHsgW3BhcmFtOiBzdHJpbmddOiBhbnkgfVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZU5vblBhdGgodmFsdWU6IHN0cmluZywgcGFyYW1zOiBQYXJhbXMpOiBzdHJpbmcge1xuICBpZiAoIXZhbHVlLmluY2x1ZGVzKCc6JykpIHtcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHBhcmFtcykpIHtcbiAgICBpZiAodmFsdWUuaW5jbHVkZXMoYDoke2tleX1gKSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZVxuICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICBuZXcgUmVnRXhwKGA6JHtrZXl9XFxcXCpgLCAnZycpLFxuICAgICAgICAgIGA6JHtrZXl9LS1FU0NBUEVEX1BBUkFNX0FTVEVSSVNLU2BcbiAgICAgICAgKVxuICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICBuZXcgUmVnRXhwKGA6JHtrZXl9XFxcXD9gLCAnZycpLFxuICAgICAgICAgIGA6JHtrZXl9LS1FU0NBUEVEX1BBUkFNX1FVRVNUSU9OYFxuICAgICAgICApXG4gICAgICAgIC5yZXBsYWNlKG5ldyBSZWdFeHAoYDoke2tleX1cXFxcK2AsICdnJyksIGA6JHtrZXl9LS1FU0NBUEVEX1BBUkFNX1BMVVNgKVxuICAgICAgICAucmVwbGFjZShcbiAgICAgICAgICBuZXcgUmVnRXhwKGA6JHtrZXl9KD8hXFxcXHcpYCwgJ2cnKSxcbiAgICAgICAgICBgLS1FU0NBUEVEX1BBUkFNX0NPTE9OJHtrZXl9YFxuICAgICAgICApXG4gICAgfVxuICB9XG4gIHZhbHVlID0gdmFsdWVcbiAgICAucmVwbGFjZSgvKDp8XFwqfFxcP3xcXCt8XFwofFxcKXxcXHt8XFx9KS9nLCAnXFxcXCQxJylcbiAgICAucmVwbGFjZSgvLS1FU0NBUEVEX1BBUkFNX1BMVVMvZywgJysnKVxuICAgIC5yZXBsYWNlKC8tLUVTQ0FQRURfUEFSQU1fQ09MT04vZywgJzonKVxuICAgIC5yZXBsYWNlKC8tLUVTQ0FQRURfUEFSQU1fUVVFU1RJT04vZywgJz8nKVxuICAgIC5yZXBsYWNlKC8tLUVTQ0FQRURfUEFSQU1fQVNURVJJU0tTL2csICcqJylcblxuICAvLyB0aGUgdmFsdWUgbmVlZHMgdG8gc3RhcnQgd2l0aCBhIGZvcndhcmQtc2xhc2ggdG8gYmUgY29tcGlsZWRcbiAgLy8gY29ycmVjdGx5XG4gIHJldHVybiBwYXRoVG9SZWdleHBcbiAgICAuY29tcGlsZShgLyR7dmFsdWV9YCwgeyB2YWxpZGF0ZTogZmFsc2UgfSkocGFyYW1zKVxuICAgIC5zdWJzdHIoMSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcHJlcGFyZURlc3RpbmF0aW9uKFxuICBkZXN0aW5hdGlvbjogc3RyaW5nLFxuICBwYXJhbXM6IFBhcmFtcyxcbiAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5LFxuICBhcHBlbmRQYXJhbXNUb1F1ZXJ5OiBib29sZWFuXG4pIHtcbiAgbGV0IHBhcnNlZERlc3RpbmF0aW9uOiB7XG4gICAgcXVlcnk/OiBQYXJzZWRVcmxRdWVyeVxuICAgIHByb3RvY29sPzogc3RyaW5nXG4gICAgaG9zdG5hbWU/OiBzdHJpbmdcbiAgICBwb3J0Pzogc3RyaW5nXG4gIH0gJiBSZXR1cm5UeXBlPHR5cGVvZiBwYXJzZVJlbGF0aXZlVXJsPiA9IHt9IGFzIGFueVxuXG4gIC8vIGNsb25lIHF1ZXJ5IHNvIHdlIGRvbid0IG1vZGlmeSB0aGUgb3JpZ2luYWxcbiAgcXVlcnkgPSBPYmplY3QuYXNzaWduKHt9LCBxdWVyeSlcbiAgY29uc3QgaGFkTG9jYWxlID0gcXVlcnkuX19uZXh0TG9jYWxlXG4gIGRlbGV0ZSBxdWVyeS5fX25leHRMb2NhbGVcbiAgZGVsZXRlIHF1ZXJ5Ll9fbmV4dERlZmF1bHRMb2NhbGVcblxuICBpZiAoZGVzdGluYXRpb24uc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgcGFyc2VkRGVzdGluYXRpb24gPSBwYXJzZVJlbGF0aXZlVXJsKGRlc3RpbmF0aW9uKVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IHtcbiAgICAgIHBhdGhuYW1lLFxuICAgICAgc2VhcmNoUGFyYW1zLFxuICAgICAgaGFzaCxcbiAgICAgIGhvc3RuYW1lLFxuICAgICAgcG9ydCxcbiAgICAgIHByb3RvY29sLFxuICAgICAgc2VhcmNoLFxuICAgICAgaHJlZixcbiAgICB9ID0gbmV3IFVSTChkZXN0aW5hdGlvbilcblxuICAgIHBhcnNlZERlc3RpbmF0aW9uID0ge1xuICAgICAgcGF0aG5hbWUsXG4gICAgICBxdWVyeTogc2VhcmNoUGFyYW1zVG9VcmxRdWVyeShzZWFyY2hQYXJhbXMpLFxuICAgICAgaGFzaCxcbiAgICAgIHByb3RvY29sLFxuICAgICAgaG9zdG5hbWUsXG4gICAgICBwb3J0LFxuICAgICAgc2VhcmNoLFxuICAgICAgaHJlZixcbiAgICB9XG4gIH1cblxuICBjb25zdCBkZXN0UXVlcnkgPSBwYXJzZWREZXN0aW5hdGlvbi5xdWVyeVxuICBjb25zdCBkZXN0UGF0aCA9IGAke3BhcnNlZERlc3RpbmF0aW9uLnBhdGhuYW1lIX0ke1xuICAgIHBhcnNlZERlc3RpbmF0aW9uLmhhc2ggfHwgJydcbiAgfWBcbiAgY29uc3QgZGVzdFBhdGhQYXJhbUtleXM6IHBhdGhUb1JlZ2V4cC5LZXlbXSA9IFtdXG4gIHBhdGhUb1JlZ2V4cC5wYXRoVG9SZWdleHAoZGVzdFBhdGgsIGRlc3RQYXRoUGFyYW1LZXlzKVxuXG4gIGNvbnN0IGRlc3RQYXRoUGFyYW1zID0gZGVzdFBhdGhQYXJhbUtleXMubWFwKChrZXkpID0+IGtleS5uYW1lKVxuXG4gIGxldCBkZXN0aW5hdGlvbkNvbXBpbGVyID0gcGF0aFRvUmVnZXhwLmNvbXBpbGUoXG4gICAgZGVzdFBhdGgsXG4gICAgLy8gd2UgZG9uJ3QgdmFsaWRhdGUgd2hpbGUgY29tcGlsaW5nIHRoZSBkZXN0aW5hdGlvbiBzaW5jZSB3ZSBzaG91bGRcbiAgICAvLyBoYXZlIGFscmVhZHkgdmFsaWRhdGVkIGJlZm9yZSB3ZSBnb3QgdG8gdGhpcyBwb2ludCBhbmQgdmFsaWRhdGluZ1xuICAgIC8vIGJyZWFrcyBjb21waWxpbmcgZGVzdGluYXRpb25zIHdpdGggbmFtZWQgcGF0dGVybiBwYXJhbXMgZnJvbSB0aGUgc291cmNlXG4gICAgLy8gZS5nLiAvc29tZXRoaW5nOmhlbGxvKC4qKSAtPiAvYW5vdGhlci86aGVsbG8gaXMgYnJva2VuIHdpdGggdmFsaWRhdGlvblxuICAgIC8vIHNpbmNlIGNvbXBpbGUgdmFsaWRhdGlvbiBpcyBtZWFudCBmb3IgcmV2ZXJzaW5nIGFuZCBub3QgZm9yIGluc2VydGluZ1xuICAgIC8vIHBhcmFtcyBmcm9tIGEgc2VwYXJhdGUgcGF0aC1yZWdleCBpbnRvIGFub3RoZXJcbiAgICB7IHZhbGlkYXRlOiBmYWxzZSB9XG4gIClcbiAgbGV0IG5ld1VybFxuXG4gIC8vIHVwZGF0ZSBhbnkgcGFyYW1zIGluIHF1ZXJ5IHZhbHVlc1xuICBmb3IgKGNvbnN0IFtrZXksIHN0ck9yQXJyYXldIG9mIE9iamVjdC5lbnRyaWVzKGRlc3RRdWVyeSkpIHtcbiAgICBsZXQgdmFsdWUgPSBBcnJheS5pc0FycmF5KHN0ck9yQXJyYXkpID8gc3RyT3JBcnJheVswXSA6IHN0ck9yQXJyYXlcbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIC8vIHRoZSB2YWx1ZSBuZWVkcyB0byBzdGFydCB3aXRoIGEgZm9yd2FyZC1zbGFzaCB0byBiZSBjb21waWxlZFxuICAgICAgLy8gY29ycmVjdGx5XG4gICAgICB2YWx1ZSA9IGNvbXBpbGVOb25QYXRoKHZhbHVlLCBwYXJhbXMpXG4gICAgfVxuICAgIGRlc3RRdWVyeVtrZXldID0gdmFsdWVcbiAgfVxuXG4gIC8vIGFkZCBwYXRoIHBhcmFtcyB0byBxdWVyeSBpZiBpdCdzIG5vdCBhIHJlZGlyZWN0IGFuZCBub3RcbiAgLy8gYWxyZWFkeSBkZWZpbmVkIGluIGRlc3RpbmF0aW9uIHF1ZXJ5IG9yIHBhdGhcbiAgbGV0IHBhcmFtS2V5cyA9IE9iamVjdC5rZXlzKHBhcmFtcylcblxuICAvLyByZW1vdmUgaW50ZXJuYWwgcGFyYW0gZm9yIGkxOG5cbiAgaWYgKGhhZExvY2FsZSkge1xuICAgIHBhcmFtS2V5cyA9IHBhcmFtS2V5cy5maWx0ZXIoKG5hbWUpID0+IG5hbWUgIT09ICduZXh0SW50ZXJuYWxMb2NhbGUnKVxuICB9XG5cbiAgaWYgKFxuICAgIGFwcGVuZFBhcmFtc1RvUXVlcnkgJiZcbiAgICAhcGFyYW1LZXlzLnNvbWUoKGtleSkgPT4gZGVzdFBhdGhQYXJhbXMuaW5jbHVkZXMoa2V5KSlcbiAgKSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2YgcGFyYW1LZXlzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gZGVzdFF1ZXJ5KSkge1xuICAgICAgICBkZXN0UXVlcnlba2V5XSA9IHBhcmFtc1trZXldXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBuZXdVcmwgPSBkZXN0aW5hdGlvbkNvbXBpbGVyKHBhcmFtcylcblxuICAgIGNvbnN0IFtwYXRobmFtZSwgaGFzaF0gPSBuZXdVcmwuc3BsaXQoJyMnKVxuICAgIHBhcnNlZERlc3RpbmF0aW9uLnBhdGhuYW1lID0gcGF0aG5hbWVcbiAgICBwYXJzZWREZXN0aW5hdGlvbi5oYXNoID0gYCR7aGFzaCA/ICcjJyA6ICcnfSR7aGFzaCB8fCAnJ31gXG4gICAgZGVsZXRlIChwYXJzZWREZXN0aW5hdGlvbiBhcyBhbnkpLnNlYXJjaFxuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyLm1lc3NhZ2UubWF0Y2goL0V4cGVjdGVkIC4qPyB0byBub3QgcmVwZWF0LCBidXQgZ290IGFuIGFycmF5LykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFRvIHVzZSBhIG11bHRpLW1hdGNoIGluIHRoZSBkZXN0aW5hdGlvbiB5b3UgbXVzdCBhZGQgXFxgKlxcYCBhdCB0aGUgZW5kIG9mIHRoZSBwYXJhbSBuYW1lIHRvIHNpZ25pZnkgaXQgc2hvdWxkIHJlcGVhdC4gaHR0cHM6Ly9lcnIuc2gvdmVyY2VsL25leHQuanMvaW52YWxpZC1tdWx0aS1tYXRjaGBcbiAgICAgIClcbiAgICB9XG4gICAgdGhyb3cgZXJyXG4gIH1cblxuICAvLyBRdWVyeSBtZXJnZSBvcmRlciBsb3dlc3QgcHJpb3JpdHkgdG8gaGlnaGVzdFxuICAvLyAxLiBpbml0aWFsIFVSTCBxdWVyeSB2YWx1ZXNcbiAgLy8gMi4gcGF0aCBzZWdtZW50IHZhbHVlc1xuICAvLyAzLiBkZXN0aW5hdGlvbiBzcGVjaWZpZWQgcXVlcnkgdmFsdWVzXG4gIHBhcnNlZERlc3RpbmF0aW9uLnF1ZXJ5ID0ge1xuICAgIC4uLnF1ZXJ5LFxuICAgIC4uLnBhcnNlZERlc3RpbmF0aW9uLnF1ZXJ5LFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuZXdVcmwsXG4gICAgcGFyc2VkRGVzdGluYXRpb24sXG4gIH1cbn1cbiIsICJpbXBvcnQgeyBQYXJzZWRVcmxRdWVyeSB9IGZyb20gJ3F1ZXJ5c3RyaW5nJ1xuaW1wb3J0IHBhdGhNYXRjaCBmcm9tICcuL3BhdGgtbWF0Y2gnXG5pbXBvcnQgcHJlcGFyZURlc3RpbmF0aW9uIGZyb20gJy4vcHJlcGFyZS1kZXN0aW5hdGlvbidcbmltcG9ydCB7IFJld3JpdGUgfSBmcm9tICcuLi8uLi8uLi8uLi9saWIvbG9hZC1jdXN0b20tcm91dGVzJ1xuaW1wb3J0IHsgcmVtb3ZlUGF0aFRyYWlsaW5nU2xhc2ggfSBmcm9tICcuLi8uLi8uLi8uLi9jbGllbnQvbm9ybWFsaXplLXRyYWlsaW5nLXNsYXNoJ1xuaW1wb3J0IHsgbm9ybWFsaXplTG9jYWxlUGF0aCB9IGZyb20gJy4uLy4uL2kxOG4vbm9ybWFsaXplLWxvY2FsZS1wYXRoJ1xuaW1wb3J0IHsgcGFyc2VSZWxhdGl2ZVVybCB9IGZyb20gJy4vcGFyc2UtcmVsYXRpdmUtdXJsJ1xuaW1wb3J0IHsgZGVsQmFzZVBhdGggfSBmcm9tICcuLi9yb3V0ZXInXG5cbmNvbnN0IGN1c3RvbVJvdXRlTWF0Y2hlciA9IHBhdGhNYXRjaCh0cnVlKVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXNvbHZlUmV3cml0ZXMoXG4gIGFzUGF0aDogc3RyaW5nLFxuICBwYWdlczogc3RyaW5nW10sXG4gIHJld3JpdGVzOiBSZXdyaXRlW10sXG4gIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeSxcbiAgcmVzb2x2ZUhyZWY6IChwYXRoOiBzdHJpbmcpID0+IHN0cmluZyxcbiAgbG9jYWxlcz86IHN0cmluZ1tdXG4pOiB7XG4gIG1hdGNoZWRQYWdlOiBib29sZWFuXG4gIHBhcnNlZEFzOiBSZXR1cm5UeXBlPHR5cGVvZiBwYXJzZVJlbGF0aXZlVXJsPlxuICBhc1BhdGg6IHN0cmluZ1xuICByZXNvbHZlZEhyZWY/OiBzdHJpbmdcbn0ge1xuICBsZXQgbWF0Y2hlZFBhZ2UgPSBmYWxzZVxuICBsZXQgcGFyc2VkQXMgPSBwYXJzZVJlbGF0aXZlVXJsKGFzUGF0aClcbiAgbGV0IGZzUGF0aG5hbWUgPSByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChcbiAgICBub3JtYWxpemVMb2NhbGVQYXRoKGRlbEJhc2VQYXRoKHBhcnNlZEFzLnBhdGhuYW1lKSwgbG9jYWxlcykucGF0aG5hbWVcbiAgKVxuICBsZXQgcmVzb2x2ZWRIcmVmXG5cbiAgaWYgKCFwYWdlcy5pbmNsdWRlcyhmc1BhdGhuYW1lKSkge1xuICAgIGZvciAoY29uc3QgcmV3cml0ZSBvZiByZXdyaXRlcykge1xuICAgICAgY29uc3QgbWF0Y2hlciA9IGN1c3RvbVJvdXRlTWF0Y2hlcihyZXdyaXRlLnNvdXJjZSlcbiAgICAgIGNvbnN0IHBhcmFtcyA9IG1hdGNoZXIocGFyc2VkQXMucGF0aG5hbWUpXG5cbiAgICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgaWYgKCFyZXdyaXRlLmRlc3RpbmF0aW9uKSB7XG4gICAgICAgICAgLy8gdGhpcyBpcyBhIHByb3hpZWQgcmV3cml0ZSB3aGljaCBpc24ndCBoYW5kbGVkIG9uIHRoZSBjbGllbnRcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRlc3RSZXMgPSBwcmVwYXJlRGVzdGluYXRpb24oXG4gICAgICAgICAgcmV3cml0ZS5kZXN0aW5hdGlvbixcbiAgICAgICAgICBwYXJhbXMsXG4gICAgICAgICAgcXVlcnksXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApXG4gICAgICAgIHBhcnNlZEFzID0gZGVzdFJlcy5wYXJzZWREZXN0aW5hdGlvblxuICAgICAgICBhc1BhdGggPSBkZXN0UmVzLm5ld1VybFxuICAgICAgICBPYmplY3QuYXNzaWduKHF1ZXJ5LCBkZXN0UmVzLnBhcnNlZERlc3RpbmF0aW9uLnF1ZXJ5KVxuXG4gICAgICAgIGZzUGF0aG5hbWUgPSByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChcbiAgICAgICAgICBub3JtYWxpemVMb2NhbGVQYXRoKGRlbEJhc2VQYXRoKGFzUGF0aCksIGxvY2FsZXMpLnBhdGhuYW1lXG4gICAgICAgIClcblxuICAgICAgICBpZiAocGFnZXMuaW5jbHVkZXMoZnNQYXRobmFtZSkpIHtcbiAgICAgICAgICAvLyBjaGVjayBpZiB3ZSBub3cgbWF0Y2ggYSBwYWdlIGFzIHRoaXMgbWVhbnMgd2UgYXJlIGRvbmVcbiAgICAgICAgICAvLyByZXNvbHZpbmcgdGhlIHJld3JpdGVzXG4gICAgICAgICAgbWF0Y2hlZFBhZ2UgPSB0cnVlXG4gICAgICAgICAgcmVzb2x2ZWRIcmVmID0gZnNQYXRobmFtZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB3ZSBtYXRjaCBhIGR5bmFtaWMtcm91dGUsIGlmIHNvIHdlIGJyZWFrIHRoZSByZXdyaXRlcyBjaGFpblxuICAgICAgICByZXNvbHZlZEhyZWYgPSByZXNvbHZlSHJlZihmc1BhdGhuYW1lKVxuXG4gICAgICAgIGlmIChyZXNvbHZlZEhyZWYgIT09IGFzUGF0aCAmJiBwYWdlcy5pbmNsdWRlcyhyZXNvbHZlZEhyZWYpKSB7XG4gICAgICAgICAgbWF0Y2hlZFBhZ2UgPSB0cnVlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIGFzUGF0aCxcbiAgICBwYXJzZWRBcyxcbiAgICBtYXRjaGVkUGFnZSxcbiAgICByZXNvbHZlZEhyZWYsXG4gIH1cbn1cbiIsICJpbXBvcnQgeyBnZXRSb3V0ZVJlZ2V4IH0gZnJvbSAnLi9yb3V0ZS1yZWdleCdcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFJvdXRlTWF0Y2hlcihyb3V0ZVJlZ2V4OiBSZXR1cm5UeXBlPHR5cGVvZiBnZXRSb3V0ZVJlZ2V4Pikge1xuICBjb25zdCB7IHJlLCBncm91cHMgfSA9IHJvdXRlUmVnZXhcbiAgcmV0dXJuIChwYXRobmFtZTogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCkgPT4ge1xuICAgIGNvbnN0IHJvdXRlTWF0Y2ggPSByZS5leGVjKHBhdGhuYW1lISlcbiAgICBpZiAoIXJvdXRlTWF0Y2gpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGNvbnN0IGRlY29kZSA9IChwYXJhbTogc3RyaW5nKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHBhcmFtKVxuICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICBjb25zdCBlcnI6IEVycm9yICYgeyBjb2RlPzogc3RyaW5nIH0gPSBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2ZhaWxlZCB0byBkZWNvZGUgcGFyYW0nXG4gICAgICAgIClcbiAgICAgICAgZXJyLmNvZGUgPSAnREVDT0RFX0ZBSUxFRCdcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHBhcmFtczogeyBbcGFyYW1OYW1lOiBzdHJpbmddOiBzdHJpbmcgfCBzdHJpbmdbXSB9ID0ge31cblxuICAgIE9iamVjdC5rZXlzKGdyb3VwcykuZm9yRWFjaCgoc2x1Z05hbWU6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgZyA9IGdyb3Vwc1tzbHVnTmFtZV1cbiAgICAgIGNvbnN0IG0gPSByb3V0ZU1hdGNoW2cucG9zXVxuICAgICAgaWYgKG0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwYXJhbXNbc2x1Z05hbWVdID0gfm0uaW5kZXhPZignLycpXG4gICAgICAgICAgPyBtLnNwbGl0KCcvJykubWFwKChlbnRyeSkgPT4gZGVjb2RlKGVudHJ5KSlcbiAgICAgICAgICA6IGcucmVwZWF0XG4gICAgICAgICAgPyBbZGVjb2RlKG0pXVxuICAgICAgICAgIDogZGVjb2RlKG0pXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcGFyYW1zXG4gIH1cbn1cbiIsICJleHBvcnQgaW50ZXJmYWNlIEdyb3VwIHtcbiAgcG9zOiBudW1iZXJcbiAgcmVwZWF0OiBib29sZWFuXG4gIG9wdGlvbmFsOiBib29sZWFuXG59XG5cbi8vIHRoaXMgaXNuJ3QgaW1wb3J0aW5nIHRoZSBlc2NhcGUtc3RyaW5nLXJlZ2V4IG1vZHVsZVxuLy8gdG8gcmVkdWNlIGJ5dGVzXG5mdW5jdGlvbiBlc2NhcGVSZWdleChzdHI6IHN0cmluZykge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1t8XFxcXHt9KClbXFxdXiQrKj8uLV0vZywgJ1xcXFwkJicpXG59XG5cbmZ1bmN0aW9uIHBhcnNlUGFyYW1ldGVyKHBhcmFtOiBzdHJpbmcpIHtcbiAgY29uc3Qgb3B0aW9uYWwgPSBwYXJhbS5zdGFydHNXaXRoKCdbJykgJiYgcGFyYW0uZW5kc1dpdGgoJ10nKVxuICBpZiAob3B0aW9uYWwpIHtcbiAgICBwYXJhbSA9IHBhcmFtLnNsaWNlKDEsIC0xKVxuICB9XG4gIGNvbnN0IHJlcGVhdCA9IHBhcmFtLnN0YXJ0c1dpdGgoJy4uLicpXG4gIGlmIChyZXBlYXQpIHtcbiAgICBwYXJhbSA9IHBhcmFtLnNsaWNlKDMpXG4gIH1cbiAgcmV0dXJuIHsga2V5OiBwYXJhbSwgcmVwZWF0LCBvcHRpb25hbCB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSb3V0ZVJlZ2V4KFxuICBub3JtYWxpemVkUm91dGU6IHN0cmluZ1xuKToge1xuICByZTogUmVnRXhwXG4gIG5hbWVkUmVnZXg/OiBzdHJpbmdcbiAgcm91dGVLZXlzPzogeyBbbmFtZWQ6IHN0cmluZ106IHN0cmluZyB9XG4gIGdyb3VwczogeyBbZ3JvdXBOYW1lOiBzdHJpbmddOiBHcm91cCB9XG59IHtcbiAgY29uc3Qgc2VnbWVudHMgPSAobm9ybWFsaXplZFJvdXRlLnJlcGxhY2UoL1xcLyQvLCAnJykgfHwgJy8nKVxuICAgIC5zbGljZSgxKVxuICAgIC5zcGxpdCgnLycpXG5cbiAgY29uc3QgZ3JvdXBzOiB7IFtncm91cE5hbWU6IHN0cmluZ106IEdyb3VwIH0gPSB7fVxuICBsZXQgZ3JvdXBJbmRleCA9IDFcbiAgY29uc3QgcGFyYW1ldGVyaXplZFJvdXRlID0gc2VnbWVudHNcbiAgICAubWFwKChzZWdtZW50KSA9PiB7XG4gICAgICBpZiAoc2VnbWVudC5zdGFydHNXaXRoKCdbJykgJiYgc2VnbWVudC5lbmRzV2l0aCgnXScpKSB7XG4gICAgICAgIGNvbnN0IHsga2V5LCBvcHRpb25hbCwgcmVwZWF0IH0gPSBwYXJzZVBhcmFtZXRlcihzZWdtZW50LnNsaWNlKDEsIC0xKSlcbiAgICAgICAgZ3JvdXBzW2tleV0gPSB7IHBvczogZ3JvdXBJbmRleCsrLCByZXBlYXQsIG9wdGlvbmFsIH1cbiAgICAgICAgcmV0dXJuIHJlcGVhdCA/IChvcHRpb25hbCA/ICcoPzovKC4rPykpPycgOiAnLyguKz8pJykgOiAnLyhbXi9dKz8pJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGAvJHtlc2NhcGVSZWdleChzZWdtZW50KX1gXG4gICAgICB9XG4gICAgfSlcbiAgICAuam9pbignJylcblxuICAvLyBkZWFkIGNvZGUgZWxpbWluYXRlIGZvciBicm93c2VyIHNpbmNlIGl0J3Mgb25seSBuZWVkZWRcbiAgLy8gd2hpbGUgZ2VuZXJhdGluZyByb3V0ZXMtbWFuaWZlc3RcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgbGV0IHJvdXRlS2V5Q2hhckNvZGUgPSA5N1xuICAgIGxldCByb3V0ZUtleUNoYXJMZW5ndGggPSAxXG5cbiAgICAvLyBidWlsZHMgYSBtaW5pbWFsIHJvdXRlS2V5IHVzaW5nIG9ubHkgYS16IGFuZCBtaW5pbWFsIG51bWJlciBvZiBjaGFyYWN0ZXJzXG4gICAgY29uc3QgZ2V0U2FmZVJvdXRlS2V5ID0gKCkgPT4ge1xuICAgICAgbGV0IHJvdXRlS2V5ID0gJydcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3V0ZUtleUNoYXJMZW5ndGg7IGkrKykge1xuICAgICAgICByb3V0ZUtleSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHJvdXRlS2V5Q2hhckNvZGUpXG4gICAgICAgIHJvdXRlS2V5Q2hhckNvZGUrK1xuXG4gICAgICAgIGlmIChyb3V0ZUtleUNoYXJDb2RlID4gMTIyKSB7XG4gICAgICAgICAgcm91dGVLZXlDaGFyTGVuZ3RoKytcbiAgICAgICAgICByb3V0ZUtleUNoYXJDb2RlID0gOTdcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJvdXRlS2V5XG4gICAgfVxuXG4gICAgY29uc3Qgcm91dGVLZXlzOiB7IFtuYW1lZDogc3RyaW5nXTogc3RyaW5nIH0gPSB7fVxuXG4gICAgbGV0IG5hbWVkUGFyYW1ldGVyaXplZFJvdXRlID0gc2VnbWVudHNcbiAgICAgIC5tYXAoKHNlZ21lbnQpID0+IHtcbiAgICAgICAgaWYgKHNlZ21lbnQuc3RhcnRzV2l0aCgnWycpICYmIHNlZ21lbnQuZW5kc1dpdGgoJ10nKSkge1xuICAgICAgICAgIGNvbnN0IHsga2V5LCBvcHRpb25hbCwgcmVwZWF0IH0gPSBwYXJzZVBhcmFtZXRlcihzZWdtZW50LnNsaWNlKDEsIC0xKSlcbiAgICAgICAgICAvLyByZXBsYWNlIGFueSBub24td29yZCBjaGFyYWN0ZXJzIHNpbmNlIHRoZXkgY2FuIGJyZWFrXG4gICAgICAgICAgLy8gdGhlIG5hbWVkIHJlZ2V4XG4gICAgICAgICAgbGV0IGNsZWFuZWRLZXkgPSBrZXkucmVwbGFjZSgvXFxXL2csICcnKVxuICAgICAgICAgIGxldCBpbnZhbGlkS2V5ID0gZmFsc2VcblxuICAgICAgICAgIC8vIGNoZWNrIGlmIHRoZSBrZXkgaXMgc3RpbGwgaW52YWxpZCBhbmQgZmFsbGJhY2sgdG8gdXNpbmcgYSBrbm93blxuICAgICAgICAgIC8vIHNhZmUga2V5XG4gICAgICAgICAgaWYgKGNsZWFuZWRLZXkubGVuZ3RoID09PSAwIHx8IGNsZWFuZWRLZXkubGVuZ3RoID4gMzApIHtcbiAgICAgICAgICAgIGludmFsaWRLZXkgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghaXNOYU4ocGFyc2VJbnQoY2xlYW5lZEtleS5zdWJzdHIoMCwgMSkpKSkge1xuICAgICAgICAgICAgaW52YWxpZEtleSA9IHRydWVcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaW52YWxpZEtleSkge1xuICAgICAgICAgICAgY2xlYW5lZEtleSA9IGdldFNhZmVSb3V0ZUtleSgpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcm91dGVLZXlzW2NsZWFuZWRLZXldID0ga2V5XG4gICAgICAgICAgcmV0dXJuIHJlcGVhdFxuICAgICAgICAgICAgPyBvcHRpb25hbFxuICAgICAgICAgICAgICA/IGAoPzovKD88JHtjbGVhbmVkS2V5fT4uKz8pKT9gXG4gICAgICAgICAgICAgIDogYC8oPzwke2NsZWFuZWRLZXl9Pi4rPylgXG4gICAgICAgICAgICA6IGAvKD88JHtjbGVhbmVkS2V5fT5bXi9dKz8pYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBgLyR7ZXNjYXBlUmVnZXgoc2VnbWVudCl9YFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmpvaW4oJycpXG5cbiAgICByZXR1cm4ge1xuICAgICAgcmU6IG5ldyBSZWdFeHAoYF4ke3BhcmFtZXRlcml6ZWRSb3V0ZX0oPzovKT8kYCksXG4gICAgICBncm91cHMsXG4gICAgICByb3V0ZUtleXMsXG4gICAgICBuYW1lZFJlZ2V4OiBgXiR7bmFtZWRQYXJhbWV0ZXJpemVkUm91dGV9KD86Lyk/JGAsXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByZTogbmV3IFJlZ0V4cChgXiR7cGFyYW1ldGVyaXplZFJvdXRlfSg/Oi8pPyRgKSxcbiAgICBncm91cHMsXG4gIH1cbn1cbiIsICJleHBvcnQgZnVuY3Rpb24gZGV0ZWN0RG9tYWluTG9jYWxlKFxuICBkb21haW5JdGVtczpcbiAgICB8IEFycmF5PHtcbiAgICAgICAgaHR0cD86IGJvb2xlYW5cbiAgICAgICAgZG9tYWluOiBzdHJpbmdcbiAgICAgICAgbG9jYWxlcz86IHN0cmluZ1tdXG4gICAgICAgIGRlZmF1bHRMb2NhbGU6IHN0cmluZ1xuICAgICAgfT5cbiAgICB8IHVuZGVmaW5lZCxcbiAgaG9zdG5hbWU/OiBzdHJpbmcsXG4gIGRldGVjdGVkTG9jYWxlPzogc3RyaW5nXG4pIHtcbiAgbGV0IGRvbWFpbkl0ZW06XG4gICAgfCB7XG4gICAgICAgIGh0dHA/OiBib29sZWFuXG4gICAgICAgIGRvbWFpbjogc3RyaW5nXG4gICAgICAgIGxvY2FsZXM/OiBzdHJpbmdbXVxuICAgICAgICBkZWZhdWx0TG9jYWxlOiBzdHJpbmdcbiAgICAgIH1cbiAgICB8IHVuZGVmaW5lZFxuXG4gIGlmIChkb21haW5JdGVtcykge1xuICAgIGlmIChkZXRlY3RlZExvY2FsZSkge1xuICAgICAgZGV0ZWN0ZWRMb2NhbGUgPSBkZXRlY3RlZExvY2FsZS50b0xvd2VyQ2FzZSgpXG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGRvbWFpbkl0ZW1zKSB7XG4gICAgICAvLyByZW1vdmUgcG9ydCBpZiBwcmVzZW50XG4gICAgICBjb25zdCBkb21haW5Ib3N0bmFtZSA9IGl0ZW0uZG9tYWluPy5zcGxpdCgnOicpWzBdLnRvTG93ZXJDYXNlKClcbiAgICAgIGlmIChcbiAgICAgICAgaG9zdG5hbWUgPT09IGRvbWFpbkhvc3RuYW1lIHx8XG4gICAgICAgIGRldGVjdGVkTG9jYWxlID09PSBpdGVtLmRlZmF1bHRMb2NhbGUudG9Mb3dlckNhc2UoKSB8fFxuICAgICAgICBpdGVtLmxvY2FsZXM/LnNvbWUoKGxvY2FsZSkgPT4gbG9jYWxlLnRvTG93ZXJDYXNlKCkgPT09IGRldGVjdGVkTG9jYWxlKVxuICAgICAgKSB7XG4gICAgICAgIGRvbWFpbkl0ZW0gPSBpdGVtXG4gICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRvbWFpbkl0ZW1cbn1cbiIsICIvKiogQGxpY2Vuc2UgUmVhY3QgdjE2LjEzLjFcbiAqIHJlYWN0LWlzLmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudC1saWtlIHR5cGVzLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG52YXIgaGFzU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuZm9yO1xudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTsgLy8gVE9ETzogV2UgZG9uJ3QgdXNlIEFzeW5jTW9kZSBvciBDb25jdXJyZW50TW9kZSBhbnltb3JlLiBUaGV5IHdlcmUgdGVtcG9yYXJ5XG4vLyAodW5zdGFibGUpIEFQSXMgdGhhdCBoYXZlIGJlZW4gcmVtb3ZlZC4gQ2FuIHdlIHJlbW92ZSB0aGUgc3ltYm9scz9cblxudmFyIFJFQUNUX0FTWU5DX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmFzeW5jX21vZGUnKSA6IDB4ZWFjZjtcbnZhciBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbmN1cnJlbnRfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpIDogMHhlYWQwO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpIDogMHhlYWQxO1xudmFyIFJFQUNUX1NVU1BFTlNFX0xJU1RfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnN1c3BlbnNlX2xpc3QnKSA6IDB4ZWFkODtcbnZhciBSRUFDVF9NRU1PX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5tZW1vJykgOiAweGVhZDM7XG52YXIgUkVBQ1RfTEFaWV9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QubGF6eScpIDogMHhlYWQ0O1xudmFyIFJFQUNUX0JMT0NLX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5ibG9jaycpIDogMHhlYWQ5O1xudmFyIFJFQUNUX0ZVTkRBTUVOVEFMX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mdW5kYW1lbnRhbCcpIDogMHhlYWQ1O1xudmFyIFJFQUNUX1JFU1BPTkRFUl9UWVBFID0gaGFzU3ltYm9sID8gU3ltYm9sLmZvcigncmVhY3QucmVzcG9uZGVyJykgOiAweGVhZDY7XG52YXIgUkVBQ1RfU0NPUEVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnNjb3BlJykgOiAweGVhZDc7XG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgLy8gTm90ZTogaXRzIHR5cGVvZiBtaWdodCBiZSBvdGhlciB0aGFuICdzeW1ib2wnIG9yICdudW1iZXInIGlmIGl0J3MgYSBwb2x5ZmlsbC5cbiAgdHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9TVVNQRU5TRV9MSVNUX1RZUEUgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgKHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0xBWllfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9NRU1PX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfUFJPVklERVJfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9DT05URVhUX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GVU5EQU1FTlRBTF9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1JFU1BPTkRFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX1NDT1BFX1RZUEUgfHwgdHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfQkxPQ0tfVFlQRSk7XG59XG5cbmZ1bmN0aW9uIHR5cGVPZihvYmplY3QpIHtcbiAgaWYgKHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmIG9iamVjdCAhPT0gbnVsbCkge1xuICAgIHZhciAkJHR5cGVvZiA9IG9iamVjdC4kJHR5cGVvZjtcblxuICAgIHN3aXRjaCAoJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfRUxFTUVOVF9UWVBFOlxuICAgICAgICB2YXIgdHlwZSA9IG9iamVjdC50eXBlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgIGNhc2UgUkVBQ1RfQVNZTkNfTU9ERV9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfQ09OQ1VSUkVOVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgICAgIGNhc2UgUkVBQ1RfUFJPRklMRVJfVFlQRTpcbiAgICAgICAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9TVVNQRU5TRV9UWVBFOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmFyICQkdHlwZW9mVHlwZSA9IHR5cGUgJiYgdHlwZS4kJHR5cGVvZjtcblxuICAgICAgICAgICAgc3dpdGNoICgkJHR5cGVvZlR5cGUpIHtcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9DT05URVhUX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTpcbiAgICAgICAgICAgICAgY2FzZSBSRUFDVF9MQVpZX1RZUEU6XG4gICAgICAgICAgICAgIGNhc2UgUkVBQ1RfTUVNT19UWVBFOlxuICAgICAgICAgICAgICBjYXNlIFJFQUNUX1BST1ZJREVSX1RZUEU6XG4gICAgICAgICAgICAgICAgcmV0dXJuICQkdHlwZW9mVHlwZTtcblxuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgIGNhc2UgUkVBQ1RfUE9SVEFMX1RZUEU6XG4gICAgICAgIHJldHVybiAkJHR5cGVvZjtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufSAvLyBBc3luY01vZGUgaXMgZGVwcmVjYXRlZCBhbG9uZyB3aXRoIGlzQXN5bmNNb2RlXG5cbnZhciBBc3luY01vZGUgPSBSRUFDVF9BU1lOQ19NT0RFX1RZUEU7XG52YXIgQ29uY3VycmVudE1vZGUgPSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbnZhciBDb250ZXh0Q29uc3VtZXIgPSBSRUFDVF9DT05URVhUX1RZUEU7XG52YXIgQ29udGV4dFByb3ZpZGVyID0gUkVBQ1RfUFJPVklERVJfVFlQRTtcbnZhciBFbGVtZW50ID0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xudmFyIEZvcndhcmRSZWYgPSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFO1xudmFyIEZyYWdtZW50ID0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbnZhciBMYXp5ID0gUkVBQ1RfTEFaWV9UWVBFO1xudmFyIE1lbW8gPSBSRUFDVF9NRU1PX1RZUEU7XG52YXIgUG9ydGFsID0gUkVBQ1RfUE9SVEFMX1RZUEU7XG52YXIgUHJvZmlsZXIgPSBSRUFDVF9QUk9GSUxFUl9UWVBFO1xudmFyIFN0cmljdE1vZGUgPSBSRUFDVF9TVFJJQ1RfTU9ERV9UWVBFO1xudmFyIFN1c3BlbnNlID0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbnZhciBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IGZhbHNlOyAvLyBBc3luY01vZGUgc2hvdWxkIGJlIGRlcHJlY2F0ZWRcblxuZnVuY3Rpb24gaXNBc3luY01vZGUob2JqZWN0KSB7XG4gIHtcbiAgICBpZiAoIWhhc1dhcm5lZEFib3V0RGVwcmVjYXRlZElzQXN5bmNNb2RlKSB7XG4gICAgICBoYXNXYXJuZWRBYm91dERlcHJlY2F0ZWRJc0FzeW5jTW9kZSA9IHRydWU7IC8vIFVzaW5nIGNvbnNvbGVbJ3dhcm4nXSB0byBldmFkZSBCYWJlbCBhbmQgRVNMaW50XG5cbiAgICAgIGNvbnNvbGVbJ3dhcm4nXSgnVGhlIFJlYWN0SXMuaXNBc3luY01vZGUoKSBhbGlhcyBoYXMgYmVlbiBkZXByZWNhdGVkLCAnICsgJ2FuZCB3aWxsIGJlIHJlbW92ZWQgaW4gUmVhY3QgMTcrLiBVcGRhdGUgeW91ciBjb2RlIHRvIHVzZSAnICsgJ1JlYWN0SXMuaXNDb25jdXJyZW50TW9kZSgpIGluc3RlYWQuIEl0IGhhcyB0aGUgZXhhY3Qgc2FtZSBBUEkuJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlzQ29uY3VycmVudE1vZGUob2JqZWN0KSB8fCB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfQVNZTkNfTU9ERV9UWVBFO1xufVxuZnVuY3Rpb24gaXNDb25jdXJyZW50TW9kZShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dENvbnN1bWVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX0NPTlRFWFRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzQ29udGV4dFByb3ZpZGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST1ZJREVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc0VsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG5mdW5jdGlvbiBpc0ZvcndhcmRSZWYob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRk9SV0FSRF9SRUZfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzRnJhZ21lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzTGF6eShvYmplY3QpIHtcbiAgcmV0dXJuIHR5cGVPZihvYmplY3QpID09PSBSRUFDVF9MQVpZX1RZUEU7XG59XG5mdW5jdGlvbiBpc01lbW8ob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfTUVNT19UWVBFO1xufVxuZnVuY3Rpb24gaXNQb3J0YWwob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfUE9SVEFMX1RZUEU7XG59XG5mdW5jdGlvbiBpc1Byb2ZpbGVyKG9iamVjdCkge1xuICByZXR1cm4gdHlwZU9mKG9iamVjdCkgPT09IFJFQUNUX1BST0ZJTEVSX1RZUEU7XG59XG5mdW5jdGlvbiBpc1N0cmljdE1vZGUob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1RSSUNUX01PREVfVFlQRTtcbn1cbmZ1bmN0aW9uIGlzU3VzcGVuc2Uob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlT2Yob2JqZWN0KSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRTtcbn1cblxuZXhwb3J0cy5Bc3luY01vZGUgPSBBc3luY01vZGU7XG5leHBvcnRzLkNvbmN1cnJlbnRNb2RlID0gQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLkNvbnRleHRDb25zdW1lciA9IENvbnRleHRDb25zdW1lcjtcbmV4cG9ydHMuQ29udGV4dFByb3ZpZGVyID0gQ29udGV4dFByb3ZpZGVyO1xuZXhwb3J0cy5FbGVtZW50ID0gRWxlbWVudDtcbmV4cG9ydHMuRm9yd2FyZFJlZiA9IEZvcndhcmRSZWY7XG5leHBvcnRzLkZyYWdtZW50ID0gRnJhZ21lbnQ7XG5leHBvcnRzLkxhenkgPSBMYXp5O1xuZXhwb3J0cy5NZW1vID0gTWVtbztcbmV4cG9ydHMuUG9ydGFsID0gUG9ydGFsO1xuZXhwb3J0cy5Qcm9maWxlciA9IFByb2ZpbGVyO1xuZXhwb3J0cy5TdHJpY3RNb2RlID0gU3RyaWN0TW9kZTtcbmV4cG9ydHMuU3VzcGVuc2UgPSBTdXNwZW5zZTtcbmV4cG9ydHMuaXNBc3luY01vZGUgPSBpc0FzeW5jTW9kZTtcbmV4cG9ydHMuaXNDb25jdXJyZW50TW9kZSA9IGlzQ29uY3VycmVudE1vZGU7XG5leHBvcnRzLmlzQ29udGV4dENvbnN1bWVyID0gaXNDb250ZXh0Q29uc3VtZXI7XG5leHBvcnRzLmlzQ29udGV4dFByb3ZpZGVyID0gaXNDb250ZXh0UHJvdmlkZXI7XG5leHBvcnRzLmlzRWxlbWVudCA9IGlzRWxlbWVudDtcbmV4cG9ydHMuaXNGb3J3YXJkUmVmID0gaXNGb3J3YXJkUmVmO1xuZXhwb3J0cy5pc0ZyYWdtZW50ID0gaXNGcmFnbWVudDtcbmV4cG9ydHMuaXNMYXp5ID0gaXNMYXp5O1xuZXhwb3J0cy5pc01lbW8gPSBpc01lbW87XG5leHBvcnRzLmlzUG9ydGFsID0gaXNQb3J0YWw7XG5leHBvcnRzLmlzUHJvZmlsZXIgPSBpc1Byb2ZpbGVyO1xuZXhwb3J0cy5pc1N0cmljdE1vZGUgPSBpc1N0cmljdE1vZGU7XG5leHBvcnRzLmlzU3VzcGVuc2UgPSBpc1N1c3BlbnNlO1xuZXhwb3J0cy5pc1ZhbGlkRWxlbWVudFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGU7XG5leHBvcnRzLnR5cGVPZiA9IHR5cGVPZjtcbiAgfSkoKTtcbn1cbiIsICIndXNlIHN0cmljdCc7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMucHJvZHVjdGlvbi5taW4uanMnKTtcbn0gZWxzZSB7XG4gIG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9janMvcmVhY3QtaXMuZGV2ZWxvcG1lbnQuanMnKTtcbn1cbiIsICIvKiBnbG9iYWwgX19ORVhUX0RBVEFfXyAqL1xuLy8gdHNsaW50OmRpc2FibGU6bm8tY29uc29sZVxuaW1wb3J0IHsgUGFyc2VkVXJsUXVlcnkgfSBmcm9tICdxdWVyeXN0cmluZydcbmltcG9ydCB7IENvbXBvbmVudFR5cGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFVybE9iamVjdCB9IGZyb20gJ3VybCdcbmltcG9ydCB7XG4gIG5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoLFxuICByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaCxcbn0gZnJvbSAnLi4vLi4vLi4vY2xpZW50L25vcm1hbGl6ZS10cmFpbGluZy1zbGFzaCdcbmltcG9ydCB7IEdvb2RQYWdlQ2FjaGUsIFN0eWxlU2hlZXRUdXBsZSB9IGZyb20gJy4uLy4uLy4uL2NsaWVudC9wYWdlLWxvYWRlcidcbmltcG9ydCB7XG4gIGdldENsaWVudEJ1aWxkTWFuaWZlc3QsXG4gIGlzQXNzZXRFcnJvcixcbiAgbWFya0Fzc2V0RXJyb3IsXG59IGZyb20gJy4uLy4uLy4uL2NsaWVudC9yb3V0ZS1sb2FkZXInXG5pbXBvcnQgeyBEb21haW5Mb2NhbGVzIH0gZnJvbSAnLi4vLi4vc2VydmVyL2NvbmZpZydcbmltcG9ydCB7IGRlbm9ybWFsaXplUGFnZVBhdGggfSBmcm9tICcuLi8uLi9zZXJ2ZXIvZGVub3JtYWxpemUtcGFnZS1wYXRoJ1xuaW1wb3J0IHsgbm9ybWFsaXplTG9jYWxlUGF0aCB9IGZyb20gJy4uL2kxOG4vbm9ybWFsaXplLWxvY2FsZS1wYXRoJ1xuaW1wb3J0IG1pdHQsIHsgTWl0dEVtaXR0ZXIgfSBmcm9tICcuLi9taXR0J1xuaW1wb3J0IHtcbiAgQXBwQ29udGV4dFR5cGUsXG4gIGZvcm1hdFdpdGhWYWxpZGF0aW9uLFxuICBnZXRMb2NhdGlvbk9yaWdpbixcbiAgZ2V0VVJMLFxuICBsb2FkR2V0SW5pdGlhbFByb3BzLFxuICBOZXh0UGFnZUNvbnRleHQsXG4gIFNULFxuICBORVhUX0RBVEEsXG59IGZyb20gJy4uL3V0aWxzJ1xuaW1wb3J0IHsgaXNEeW5hbWljUm91dGUgfSBmcm9tICcuL3V0aWxzL2lzLWR5bmFtaWMnXG5pbXBvcnQgeyBwYXJzZVJlbGF0aXZlVXJsIH0gZnJvbSAnLi91dGlscy9wYXJzZS1yZWxhdGl2ZS11cmwnXG5pbXBvcnQgeyBzZWFyY2hQYXJhbXNUb1VybFF1ZXJ5IH0gZnJvbSAnLi91dGlscy9xdWVyeXN0cmluZydcbmltcG9ydCByZXNvbHZlUmV3cml0ZXMgZnJvbSAnLi91dGlscy9yZXNvbHZlLXJld3JpdGVzJ1xuaW1wb3J0IHsgZ2V0Um91dGVNYXRjaGVyIH0gZnJvbSAnLi91dGlscy9yb3V0ZS1tYXRjaGVyJ1xuaW1wb3J0IHsgZ2V0Um91dGVSZWdleCB9IGZyb20gJy4vdXRpbHMvcm91dGUtcmVnZXgnXG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgaW50ZXJmYWNlIFdpbmRvdyB7XG4gICAgLyogcHJvZCAqL1xuICAgIF9fTkVYVF9EQVRBX186IE5FWFRfREFUQVxuICB9XG59XG5cbmludGVyZmFjZSBSb3V0ZVByb3BlcnRpZXMge1xuICBzaGFsbG93OiBib29sZWFuXG59XG5cbmludGVyZmFjZSBUcmFuc2l0aW9uT3B0aW9ucyB7XG4gIHNoYWxsb3c/OiBib29sZWFuXG4gIGxvY2FsZT86IHN0cmluZyB8IGZhbHNlXG4gIHNjcm9sbD86IGJvb2xlYW5cbn1cblxuaW50ZXJmYWNlIE5leHRIaXN0b3J5U3RhdGUge1xuICB1cmw6IHN0cmluZ1xuICBhczogc3RyaW5nXG4gIG9wdGlvbnM6IFRyYW5zaXRpb25PcHRpb25zXG59XG5cbnR5cGUgSGlzdG9yeVN0YXRlID1cbiAgfCBudWxsXG4gIHwgeyBfX046IGZhbHNlIH1cbiAgfCAoeyBfX046IHRydWU7IGlkeDogbnVtYmVyIH0gJiBOZXh0SGlzdG9yeVN0YXRlKVxuXG5sZXQgZGV0ZWN0RG9tYWluTG9jYWxlOiB0eXBlb2YgaW1wb3J0KCcuLi9pMThuL2RldGVjdC1kb21haW4tbG9jYWxlJykuZGV0ZWN0RG9tYWluTG9jYWxlXG5cbmlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gIGRldGVjdERvbWFpbkxvY2FsZSA9IHJlcXVpcmUoJy4uL2kxOG4vZGV0ZWN0LWRvbWFpbi1sb2NhbGUnKVxuICAgIC5kZXRlY3REb21haW5Mb2NhbGVcbn1cblxuY29uc3QgYmFzZVBhdGggPSAocHJvY2Vzcy5lbnYuX19ORVhUX1JPVVRFUl9CQVNFUEFUSCBhcyBzdHJpbmcpIHx8ICcnXG5cbmZ1bmN0aW9uIGJ1aWxkQ2FuY2VsbGF0aW9uRXJyb3IoKSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyBFcnJvcignUm91dGUgQ2FuY2VsbGVkJyksIHtcbiAgICBjYW5jZWxsZWQ6IHRydWUsXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGFkZFBhdGhQcmVmaXgocGF0aDogc3RyaW5nLCBwcmVmaXg/OiBzdHJpbmcpIHtcbiAgcmV0dXJuIHByZWZpeCAmJiBwYXRoLnN0YXJ0c1dpdGgoJy8nKVxuICAgID8gcGF0aCA9PT0gJy8nXG4gICAgICA/IG5vcm1hbGl6ZVBhdGhUcmFpbGluZ1NsYXNoKHByZWZpeClcbiAgICAgIDogYCR7cHJlZml4fSR7cGF0aE5vUXVlcnlIYXNoKHBhdGgpID09PSAnLycgPyBwYXRoLnN1YnN0cmluZygxKSA6IHBhdGh9YFxuICAgIDogcGF0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RG9tYWluTG9jYWxlKFxuICBwYXRoOiBzdHJpbmcsXG4gIGxvY2FsZT86IHN0cmluZyB8IGZhbHNlLFxuICBsb2NhbGVzPzogc3RyaW5nW10sXG4gIGRvbWFpbkxvY2FsZXM/OiBEb21haW5Mb2NhbGVzXG4pIHtcbiAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICBsb2NhbGUgPSBsb2NhbGUgfHwgbm9ybWFsaXplTG9jYWxlUGF0aChwYXRoLCBsb2NhbGVzKS5kZXRlY3RlZExvY2FsZVxuXG4gICAgY29uc3QgZGV0ZWN0ZWREb21haW4gPSBkZXRlY3REb21haW5Mb2NhbGUoZG9tYWluTG9jYWxlcywgdW5kZWZpbmVkLCBsb2NhbGUpXG5cbiAgICBpZiAoZGV0ZWN0ZWREb21haW4pIHtcbiAgICAgIHJldHVybiBgaHR0cCR7ZGV0ZWN0ZWREb21haW4uaHR0cCA/ICcnIDogJ3MnfTovLyR7ZGV0ZWN0ZWREb21haW4uZG9tYWlufSR7XG4gICAgICAgIGJhc2VQYXRoIHx8ICcnXG4gICAgICB9JHtsb2NhbGUgPT09IGRldGVjdGVkRG9tYWluLmRlZmF1bHRMb2NhbGUgPyAnJyA6IGAvJHtsb2NhbGV9YH0ke3BhdGh9YFxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkTG9jYWxlKFxuICBwYXRoOiBzdHJpbmcsXG4gIGxvY2FsZT86IHN0cmluZyB8IGZhbHNlLFxuICBkZWZhdWx0TG9jYWxlPzogc3RyaW5nXG4pIHtcbiAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICByZXR1cm4gbG9jYWxlICYmXG4gICAgICBsb2NhbGUgIT09IGRlZmF1bHRMb2NhbGUgJiZcbiAgICAgICFwYXRoLnN0YXJ0c1dpdGgoJy8nICsgbG9jYWxlICsgJy8nKSAmJlxuICAgICAgcGF0aCAhPT0gJy8nICsgbG9jYWxlXG4gICAgICA/IGFkZFBhdGhQcmVmaXgocGF0aCwgJy8nICsgbG9jYWxlKVxuICAgICAgOiBwYXRoXG4gIH1cbiAgcmV0dXJuIHBhdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbExvY2FsZShwYXRoOiBzdHJpbmcsIGxvY2FsZT86IHN0cmluZykge1xuICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgIHJldHVybiBsb2NhbGUgJiZcbiAgICAgIChwYXRoLnN0YXJ0c1dpdGgoJy8nICsgbG9jYWxlICsgJy8nKSB8fCBwYXRoID09PSAnLycgKyBsb2NhbGUpXG4gICAgICA/IHBhdGguc3Vic3RyKGxvY2FsZS5sZW5ndGggKyAxKSB8fCAnLydcbiAgICAgIDogcGF0aFxuICB9XG4gIHJldHVybiBwYXRoXG59XG5cbmZ1bmN0aW9uIHBhdGhOb1F1ZXJ5SGFzaChwYXRoOiBzdHJpbmcpIHtcbiAgY29uc3QgcXVlcnlJbmRleCA9IHBhdGguaW5kZXhPZignPycpXG4gIGNvbnN0IGhhc2hJbmRleCA9IHBhdGguaW5kZXhPZignIycpXG5cbiAgaWYgKHF1ZXJ5SW5kZXggPiAtMSB8fCBoYXNoSW5kZXggPiAtMSkge1xuICAgIHBhdGggPSBwYXRoLnN1YnN0cmluZygwLCBxdWVyeUluZGV4ID4gLTEgPyBxdWVyeUluZGV4IDogaGFzaEluZGV4KVxuICB9XG4gIHJldHVybiBwYXRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNCYXNlUGF0aChwYXRoOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcGF0aCA9IHBhdGhOb1F1ZXJ5SGFzaChwYXRoKVxuICByZXR1cm4gcGF0aCA9PT0gYmFzZVBhdGggfHwgcGF0aC5zdGFydHNXaXRoKGJhc2VQYXRoICsgJy8nKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gYWRkQmFzZVBhdGgocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gd2Ugb25seSBhZGQgdGhlIGJhc2VwYXRoIG9uIHJlbGF0aXZlIHVybHNcbiAgcmV0dXJuIGFkZFBhdGhQcmVmaXgocGF0aCwgYmFzZVBhdGgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxCYXNlUGF0aChwYXRoOiBzdHJpbmcpOiBzdHJpbmcge1xuICBwYXRoID0gcGF0aC5zbGljZShiYXNlUGF0aC5sZW5ndGgpXG4gIGlmICghcGF0aC5zdGFydHNXaXRoKCcvJykpIHBhdGggPSBgLyR7cGF0aH1gXG4gIHJldHVybiBwYXRoXG59XG5cbi8qKlxuICogRGV0ZWN0cyB3aGV0aGVyIGEgZ2l2ZW4gdXJsIGlzIHJvdXRhYmxlIGJ5IHRoZSBOZXh0LmpzIHJvdXRlciAoYnJvd3NlciBvbmx5KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzTG9jYWxVUkwodXJsOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgLy8gcHJldmVudCBhIGh5ZHJhdGlvbiBtaXNtYXRjaCBvbiBocmVmIGZvciB1cmwgd2l0aCBhbmNob3IgcmVmc1xuICBpZiAodXJsLnN0YXJ0c1dpdGgoJy8nKSB8fCB1cmwuc3RhcnRzV2l0aCgnIycpKSByZXR1cm4gdHJ1ZVxuICB0cnkge1xuICAgIC8vIGFic29sdXRlIHVybHMgY2FuIGJlIGxvY2FsIGlmIHRoZXkgYXJlIG9uIHRoZSBzYW1lIG9yaWdpblxuICAgIGNvbnN0IGxvY2F0aW9uT3JpZ2luID0gZ2V0TG9jYXRpb25PcmlnaW4oKVxuICAgIGNvbnN0IHJlc29sdmVkID0gbmV3IFVSTCh1cmwsIGxvY2F0aW9uT3JpZ2luKVxuICAgIHJldHVybiByZXNvbHZlZC5vcmlnaW4gPT09IGxvY2F0aW9uT3JpZ2luICYmIGhhc0Jhc2VQYXRoKHJlc29sdmVkLnBhdGhuYW1lKVxuICB9IGNhdGNoIChfKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxudHlwZSBVcmwgPSBVcmxPYmplY3QgfCBzdHJpbmdcblxuZXhwb3J0IGZ1bmN0aW9uIGludGVycG9sYXRlQXMoXG4gIHJvdXRlOiBzdHJpbmcsXG4gIGFzUGF0aG5hbWU6IHN0cmluZyxcbiAgcXVlcnk6IFBhcnNlZFVybFF1ZXJ5XG4pIHtcbiAgbGV0IGludGVycG9sYXRlZFJvdXRlID0gJydcblxuICBjb25zdCBkeW5hbWljUmVnZXggPSBnZXRSb3V0ZVJlZ2V4KHJvdXRlKVxuICBjb25zdCBkeW5hbWljR3JvdXBzID0gZHluYW1pY1JlZ2V4Lmdyb3Vwc1xuICBjb25zdCBkeW5hbWljTWF0Y2hlcyA9XG4gICAgLy8gVHJ5IHRvIG1hdGNoIHRoZSBkeW5hbWljIHJvdXRlIGFnYWluc3QgdGhlIGFzUGF0aFxuICAgIChhc1BhdGhuYW1lICE9PSByb3V0ZSA/IGdldFJvdXRlTWF0Y2hlcihkeW5hbWljUmVnZXgpKGFzUGF0aG5hbWUpIDogJycpIHx8XG4gICAgLy8gRmFsbCBiYWNrIHRvIHJlYWRpbmcgdGhlIHZhbHVlcyBmcm9tIHRoZSBocmVmXG4gICAgLy8gVE9ETzogc2hvdWxkIHRoaXMgdGFrZSBwcmlvcml0eTsgYWxzbyBuZWVkIHRvIGNoYW5nZSBpbiB0aGUgcm91dGVyLlxuICAgIHF1ZXJ5XG5cbiAgaW50ZXJwb2xhdGVkUm91dGUgPSByb3V0ZVxuICBjb25zdCBwYXJhbXMgPSBPYmplY3Qua2V5cyhkeW5hbWljR3JvdXBzKVxuXG4gIGlmIChcbiAgICAhcGFyYW1zLmV2ZXJ5KChwYXJhbSkgPT4ge1xuICAgICAgbGV0IHZhbHVlID0gZHluYW1pY01hdGNoZXNbcGFyYW1dIHx8ICcnXG4gICAgICBjb25zdCB7IHJlcGVhdCwgb3B0aW9uYWwgfSA9IGR5bmFtaWNHcm91cHNbcGFyYW1dXG5cbiAgICAgIC8vIHN1cHBvcnQgc2luZ2xlLWxldmVsIGNhdGNoLWFsbFxuICAgICAgLy8gVE9ETzogbW9yZSByb2J1c3QgaGFuZGxpbmcgZm9yIHVzZXItZXJyb3IgKHBhc3NpbmcgYC9gKVxuICAgICAgbGV0IHJlcGxhY2VkID0gYFske3JlcGVhdCA/ICcuLi4nIDogJyd9JHtwYXJhbX1dYFxuICAgICAgaWYgKG9wdGlvbmFsKSB7XG4gICAgICAgIHJlcGxhY2VkID0gYCR7IXZhbHVlID8gJy8nIDogJyd9WyR7cmVwbGFjZWR9XWBcbiAgICAgIH1cbiAgICAgIGlmIChyZXBlYXQgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpKSB2YWx1ZSA9IFt2YWx1ZV1cblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgKG9wdGlvbmFsIHx8IHBhcmFtIGluIGR5bmFtaWNNYXRjaGVzKSAmJlxuICAgICAgICAvLyBJbnRlcnBvbGF0ZSBncm91cCBpbnRvIGRhdGEgVVJMIGlmIHByZXNlbnRcbiAgICAgICAgKGludGVycG9sYXRlZFJvdXRlID1cbiAgICAgICAgICBpbnRlcnBvbGF0ZWRSb3V0ZSEucmVwbGFjZShcbiAgICAgICAgICAgIHJlcGxhY2VkLFxuICAgICAgICAgICAgcmVwZWF0XG4gICAgICAgICAgICAgID8gKHZhbHVlIGFzIHN0cmluZ1tdKVxuICAgICAgICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlc2UgdmFsdWVzIHNob3VsZCBiZSBmdWxseSBlbmNvZGVkIGluc3RlYWQgb2YganVzdFxuICAgICAgICAgICAgICAgICAgICAvLyBwYXRoIGRlbGltaXRlciBlc2NhcGVkIHNpbmNlIHRoZXkgYXJlIGJlaW5nIGluc2VydGVkXG4gICAgICAgICAgICAgICAgICAgIC8vIGludG8gdGhlIFVSTCBhbmQgd2UgZXhwZWN0IFVSTCBlbmNvZGVkIHNlZ21lbnRzXG4gICAgICAgICAgICAgICAgICAgIC8vIHdoZW4gcGFyc2luZyBkeW5hbWljIHJvdXRlIHBhcmFtc1xuICAgICAgICAgICAgICAgICAgICAoc2VnbWVudCkgPT4gZW5jb2RlVVJJQ29tcG9uZW50KHNlZ21lbnQpXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAuam9pbignLycpXG4gICAgICAgICAgICAgIDogZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlIGFzIHN0cmluZylcbiAgICAgICAgICApIHx8ICcvJylcbiAgICAgIClcbiAgICB9KVxuICApIHtcbiAgICBpbnRlcnBvbGF0ZWRSb3V0ZSA9ICcnIC8vIGRpZCBub3Qgc2F0aXNmeSBhbGwgcmVxdWlyZW1lbnRzXG5cbiAgICAvLyBuLmIuIFdlIGlnbm9yZSB0aGlzIGVycm9yIGJlY2F1c2Ugd2UgaGFuZGxlIHdhcm5pbmcgZm9yIHRoaXMgY2FzZSBpblxuICAgIC8vIGRldmVsb3BtZW50IGluIHRoZSBgPExpbms+YCBjb21wb25lbnQgZGlyZWN0bHkuXG4gIH1cbiAgcmV0dXJuIHtcbiAgICBwYXJhbXMsXG4gICAgcmVzdWx0OiBpbnRlcnBvbGF0ZWRSb3V0ZSxcbiAgfVxufVxuXG5mdW5jdGlvbiBvbWl0UGFybXNGcm9tUXVlcnkocXVlcnk6IFBhcnNlZFVybFF1ZXJ5LCBwYXJhbXM6IHN0cmluZ1tdKSB7XG4gIGNvbnN0IGZpbHRlcmVkUXVlcnk6IFBhcnNlZFVybFF1ZXJ5ID0ge31cblxuICBPYmplY3Qua2V5cyhxdWVyeSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgaWYgKCFwYXJhbXMuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgZmlsdGVyZWRRdWVyeVtrZXldID0gcXVlcnlba2V5XVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIGZpbHRlcmVkUXVlcnlcbn1cblxuLyoqXG4gKiBSZXNvbHZlcyBhIGdpdmVuIGh5cGVybGluayB3aXRoIGEgY2VydGFpbiByb3V0ZXIgc3RhdGUgKGJhc2VQYXRoIG5vdCBpbmNsdWRlZCkuXG4gKiBQcmVzZXJ2ZXMgYWJzb2x1dGUgdXJscy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVIcmVmKFxuICBjdXJyZW50UGF0aDogc3RyaW5nLFxuICBocmVmOiBVcmwsXG4gIHJlc29sdmVBcz86IGJvb2xlYW5cbik6IHN0cmluZyB7XG4gIC8vIHdlIHVzZSBhIGR1bW15IGJhc2UgdXJsIGZvciByZWxhdGl2ZSB1cmxzXG4gIGNvbnN0IGJhc2UgPSBuZXcgVVJMKGN1cnJlbnRQYXRoLCAnaHR0cDovL24nKVxuICBjb25zdCB1cmxBc1N0cmluZyA9XG4gICAgdHlwZW9mIGhyZWYgPT09ICdzdHJpbmcnID8gaHJlZiA6IGZvcm1hdFdpdGhWYWxpZGF0aW9uKGhyZWYpXG4gIC8vIFJldHVybiBiZWNhdXNlIGl0IGNhbm5vdCBiZSByb3V0ZWQgYnkgdGhlIE5leHQuanMgcm91dGVyXG4gIGlmICghaXNMb2NhbFVSTCh1cmxBc1N0cmluZykpIHtcbiAgICByZXR1cm4gKHJlc29sdmVBcyA/IFt1cmxBc1N0cmluZ10gOiB1cmxBc1N0cmluZykgYXMgc3RyaW5nXG4gIH1cbiAgdHJ5IHtcbiAgICBjb25zdCBmaW5hbFVybCA9IG5ldyBVUkwodXJsQXNTdHJpbmcsIGJhc2UpXG4gICAgZmluYWxVcmwucGF0aG5hbWUgPSBub3JtYWxpemVQYXRoVHJhaWxpbmdTbGFzaChmaW5hbFVybC5wYXRobmFtZSlcbiAgICBsZXQgaW50ZXJwb2xhdGVkQXMgPSAnJ1xuXG4gICAgaWYgKFxuICAgICAgaXNEeW5hbWljUm91dGUoZmluYWxVcmwucGF0aG5hbWUpICYmXG4gICAgICBmaW5hbFVybC5zZWFyY2hQYXJhbXMgJiZcbiAgICAgIHJlc29sdmVBc1xuICAgICkge1xuICAgICAgY29uc3QgcXVlcnkgPSBzZWFyY2hQYXJhbXNUb1VybFF1ZXJ5KGZpbmFsVXJsLnNlYXJjaFBhcmFtcylcblxuICAgICAgY29uc3QgeyByZXN1bHQsIHBhcmFtcyB9ID0gaW50ZXJwb2xhdGVBcyhcbiAgICAgICAgZmluYWxVcmwucGF0aG5hbWUsXG4gICAgICAgIGZpbmFsVXJsLnBhdGhuYW1lLFxuICAgICAgICBxdWVyeVxuICAgICAgKVxuXG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIGludGVycG9sYXRlZEFzID0gZm9ybWF0V2l0aFZhbGlkYXRpb24oe1xuICAgICAgICAgIHBhdGhuYW1lOiByZXN1bHQsXG4gICAgICAgICAgaGFzaDogZmluYWxVcmwuaGFzaCxcbiAgICAgICAgICBxdWVyeTogb21pdFBhcm1zRnJvbVF1ZXJ5KHF1ZXJ5LCBwYXJhbXMpLFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHRoZSBvcmlnaW4gZGlkbid0IGNoYW5nZSwgaXQgbWVhbnMgd2UgcmVjZWl2ZWQgYSByZWxhdGl2ZSBocmVmXG4gICAgY29uc3QgcmVzb2x2ZWRIcmVmID1cbiAgICAgIGZpbmFsVXJsLm9yaWdpbiA9PT0gYmFzZS5vcmlnaW5cbiAgICAgICAgPyBmaW5hbFVybC5ocmVmLnNsaWNlKGZpbmFsVXJsLm9yaWdpbi5sZW5ndGgpXG4gICAgICAgIDogZmluYWxVcmwuaHJlZlxuXG4gICAgcmV0dXJuIChyZXNvbHZlQXNcbiAgICAgID8gW3Jlc29sdmVkSHJlZiwgaW50ZXJwb2xhdGVkQXMgfHwgcmVzb2x2ZWRIcmVmXVxuICAgICAgOiByZXNvbHZlZEhyZWYpIGFzIHN0cmluZ1xuICB9IGNhdGNoIChfKSB7XG4gICAgcmV0dXJuIChyZXNvbHZlQXMgPyBbdXJsQXNTdHJpbmddIDogdXJsQXNTdHJpbmcpIGFzIHN0cmluZ1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0cmlwT3JpZ2luKHVybDogc3RyaW5nKSB7XG4gIGNvbnN0IG9yaWdpbiA9IGdldExvY2F0aW9uT3JpZ2luKClcblxuICByZXR1cm4gdXJsLnN0YXJ0c1dpdGgob3JpZ2luKSA/IHVybC5zdWJzdHJpbmcob3JpZ2luLmxlbmd0aCkgOiB1cmxcbn1cblxuZnVuY3Rpb24gcHJlcGFyZVVybEFzKHJvdXRlcjogTmV4dFJvdXRlciwgdXJsOiBVcmwsIGFzPzogVXJsKSB7XG4gIC8vIElmIHVybCBhbmQgYXMgcHJvdmlkZWQgYXMgYW4gb2JqZWN0IHJlcHJlc2VudGF0aW9uLFxuICAvLyB3ZSdsbCBmb3JtYXQgdGhlbSBpbnRvIHRoZSBzdHJpbmcgdmVyc2lvbiBoZXJlLlxuICBsZXQgW3Jlc29sdmVkSHJlZiwgcmVzb2x2ZWRBc10gPSByZXNvbHZlSHJlZihyb3V0ZXIucGF0aG5hbWUsIHVybCwgdHJ1ZSlcbiAgY29uc3Qgb3JpZ2luID0gZ2V0TG9jYXRpb25PcmlnaW4oKVxuICBjb25zdCBocmVmSGFkT3JpZ2luID0gcmVzb2x2ZWRIcmVmLnN0YXJ0c1dpdGgob3JpZ2luKVxuICBjb25zdCBhc0hhZE9yaWdpbiA9IHJlc29sdmVkQXMgJiYgcmVzb2x2ZWRBcy5zdGFydHNXaXRoKG9yaWdpbilcblxuICByZXNvbHZlZEhyZWYgPSBzdHJpcE9yaWdpbihyZXNvbHZlZEhyZWYpXG4gIHJlc29sdmVkQXMgPSByZXNvbHZlZEFzID8gc3RyaXBPcmlnaW4ocmVzb2x2ZWRBcykgOiByZXNvbHZlZEFzXG5cbiAgY29uc3QgcHJlcGFyZWRVcmwgPSBocmVmSGFkT3JpZ2luID8gcmVzb2x2ZWRIcmVmIDogYWRkQmFzZVBhdGgocmVzb2x2ZWRIcmVmKVxuICBjb25zdCBwcmVwYXJlZEFzID0gYXNcbiAgICA/IHN0cmlwT3JpZ2luKHJlc29sdmVIcmVmKHJvdXRlci5wYXRobmFtZSwgYXMpKVxuICAgIDogcmVzb2x2ZWRBcyB8fCByZXNvbHZlZEhyZWZcblxuICByZXR1cm4ge1xuICAgIHVybDogcHJlcGFyZWRVcmwsXG4gICAgYXM6IGFzSGFkT3JpZ2luID8gcHJlcGFyZWRBcyA6IGFkZEJhc2VQYXRoKHByZXBhcmVkQXMpLFxuICB9XG59XG5cbmV4cG9ydCB0eXBlIEJhc2VSb3V0ZXIgPSB7XG4gIHJvdXRlOiBzdHJpbmdcbiAgcGF0aG5hbWU6IHN0cmluZ1xuICBxdWVyeTogUGFyc2VkVXJsUXVlcnlcbiAgYXNQYXRoOiBzdHJpbmdcbiAgYmFzZVBhdGg6IHN0cmluZ1xuICBsb2NhbGU/OiBzdHJpbmdcbiAgbG9jYWxlcz86IHN0cmluZ1tdXG4gIGRlZmF1bHRMb2NhbGU/OiBzdHJpbmdcbiAgZG9tYWluTG9jYWxlcz86IERvbWFpbkxvY2FsZXNcbiAgaXNMb2NhbGVEb21haW46IGJvb2xlYW5cbn1cblxuZXhwb3J0IHR5cGUgTmV4dFJvdXRlciA9IEJhc2VSb3V0ZXIgJlxuICBQaWNrPFxuICAgIFJvdXRlcixcbiAgICB8ICdwdXNoJ1xuICAgIHwgJ3JlcGxhY2UnXG4gICAgfCAncmVsb2FkJ1xuICAgIHwgJ2JhY2snXG4gICAgfCAncHJlZmV0Y2gnXG4gICAgfCAnYmVmb3JlUG9wU3RhdGUnXG4gICAgfCAnZXZlbnRzJ1xuICAgIHwgJ2lzRmFsbGJhY2snXG4gICAgfCAnaXNSZWFkeSdcbiAgPlxuXG5leHBvcnQgdHlwZSBQcmVmZXRjaE9wdGlvbnMgPSB7XG4gIHByaW9yaXR5PzogYm9vbGVhblxuICBsb2NhbGU/OiBzdHJpbmcgfCBmYWxzZVxufVxuXG5leHBvcnQgdHlwZSBQcml2YXRlUm91dGVJbmZvID1cbiAgfCAoT21pdDxDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8sICdzdHlsZVNoZWV0cyc+ICYgeyBpbml0aWFsOiB0cnVlIH0pXG4gIHwgQ29tcGxldGVQcml2YXRlUm91dGVJbmZvXG5cbmV4cG9ydCB0eXBlIENvbXBsZXRlUHJpdmF0ZVJvdXRlSW5mbyA9IHtcbiAgQ29tcG9uZW50OiBDb21wb25lbnRUeXBlXG4gIHN0eWxlU2hlZXRzOiBTdHlsZVNoZWV0VHVwbGVbXVxuICBfX05fU1NHPzogYm9vbGVhblxuICBfX05fU1NQPzogYm9vbGVhblxuICBwcm9wcz86IFJlY29yZDxzdHJpbmcsIGFueT5cbiAgZXJyPzogRXJyb3JcbiAgZXJyb3I/OiBhbnlcbn1cblxuZXhwb3J0IHR5cGUgQXBwUHJvcHMgPSBQaWNrPENvbXBsZXRlUHJpdmF0ZVJvdXRlSW5mbywgJ0NvbXBvbmVudCcgfCAnZXJyJz4gJiB7XG4gIHJvdXRlcjogUm91dGVyXG59ICYgUmVjb3JkPHN0cmluZywgYW55PlxuZXhwb3J0IHR5cGUgQXBwQ29tcG9uZW50ID0gQ29tcG9uZW50VHlwZTxBcHBQcm9wcz5cblxudHlwZSBTdWJzY3JpcHRpb24gPSAoXG4gIGRhdGE6IFByaXZhdGVSb3V0ZUluZm8sXG4gIEFwcDogQXBwQ29tcG9uZW50LFxuICByZXNldFNjcm9sbDogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHwgbnVsbFxuKSA9PiBQcm9taXNlPHZvaWQ+XG5cbnR5cGUgQmVmb3JlUG9wU3RhdGVDYWxsYmFjayA9IChzdGF0ZTogTmV4dEhpc3RvcnlTdGF0ZSkgPT4gYm9vbGVhblxuXG50eXBlIENvbXBvbmVudExvYWRDYW5jZWwgPSAoKCkgPT4gdm9pZCkgfCBudWxsXG5cbnR5cGUgSGlzdG9yeU1ldGhvZCA9ICdyZXBsYWNlU3RhdGUnIHwgJ3B1c2hTdGF0ZSdcblxuY29uc3QgbWFudWFsU2Nyb2xsUmVzdG9yYXRpb24gPVxuICBwcm9jZXNzLmVudi5fX05FWFRfU0NST0xMX1JFU1RPUkFUSU9OICYmXG4gIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICdzY3JvbGxSZXN0b3JhdGlvbicgaW4gd2luZG93Lmhpc3RvcnkgJiZcbiAgISEoZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICBsZXQgdiA9ICdfX25leHQnXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VxdWVuY2VzXG4gICAgICByZXR1cm4gc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSh2LCB2KSwgc2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSh2KSwgdHJ1ZVxuICAgIH0gY2F0Y2ggKG4pIHt9XG4gIH0pKClcblxuY29uc3QgU1NHX0RBVEFfTk9UX0ZPVU5EID0gU3ltYm9sKCdTU0dfREFUQV9OT1RfRk9VTkQnKVxuXG5mdW5jdGlvbiBmZXRjaFJldHJ5KHVybDogc3RyaW5nLCBhdHRlbXB0czogbnVtYmVyKTogUHJvbWlzZTxhbnk+IHtcbiAgcmV0dXJuIGZldGNoKHVybCwge1xuICAgIC8vIENvb2tpZXMgYXJlIHJlcXVpcmVkIHRvIGJlIHByZXNlbnQgZm9yIE5leHQuanMnIFNTRyBcIlByZXZpZXcgTW9kZVwiLlxuICAgIC8vIENvb2tpZXMgbWF5IGFsc28gYmUgcmVxdWlyZWQgZm9yIGBnZXRTZXJ2ZXJTaWRlUHJvcHNgLlxuICAgIC8vXG4gICAgLy8gPiBgZmV0Y2hgIHdvblx1MjAxOXQgc2VuZCBjb29raWVzLCB1bmxlc3MgeW91IHNldCB0aGUgY3JlZGVudGlhbHMgaW5pdFxuICAgIC8vID4gb3B0aW9uLlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9GZXRjaF9BUEkvVXNpbmdfRmV0Y2hcbiAgICAvL1xuICAgIC8vID4gRm9yIG1heGltdW0gYnJvd3NlciBjb21wYXRpYmlsaXR5IHdoZW4gaXQgY29tZXMgdG8gc2VuZGluZyAmXG4gICAgLy8gPiByZWNlaXZpbmcgY29va2llcywgYWx3YXlzIHN1cHBseSB0aGUgYGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nYFxuICAgIC8vID4gb3B0aW9uIGluc3RlYWQgb2YgcmVseWluZyBvbiB0aGUgZGVmYXVsdC5cbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZ2l0aHViL2ZldGNoI2NhdmVhdHNcbiAgICBjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJyxcbiAgfSkudGhlbigocmVzKSA9PiB7XG4gICAgaWYgKCFyZXMub2spIHtcbiAgICAgIGlmIChhdHRlbXB0cyA+IDEgJiYgcmVzLnN0YXR1cyA+PSA1MDApIHtcbiAgICAgICAgcmV0dXJuIGZldGNoUmV0cnkodXJsLCBhdHRlbXB0cyAtIDEpXG4gICAgICB9XG4gICAgICBpZiAocmVzLnN0YXR1cyA9PT0gNDA0KSB7XG4gICAgICAgIHJldHVybiByZXMuanNvbigpLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICBpZiAoZGF0YS5ub3RGb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuIHsgbm90Rm91bmQ6IFNTR19EQVRBX05PVF9GT1VORCB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgc3RhdGljIHByb3BzYClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgc3RhdGljIHByb3BzYClcbiAgICB9XG4gICAgcmV0dXJuIHJlcy5qc29uKClcbiAgfSlcbn1cblxuZnVuY3Rpb24gZmV0Y2hOZXh0RGF0YShkYXRhSHJlZjogc3RyaW5nLCBpc1NlcnZlclJlbmRlcjogYm9vbGVhbikge1xuICByZXR1cm4gZmV0Y2hSZXRyeShkYXRhSHJlZiwgaXNTZXJ2ZXJSZW5kZXIgPyAzIDogMSkuY2F0Y2goKGVycjogRXJyb3IpID0+IHtcbiAgICAvLyBXZSBzaG91bGQgb25seSB0cmlnZ2VyIGEgc2VydmVyLXNpZGUgdHJhbnNpdGlvbiBpZiB0aGlzIHdhcyBjYXVzZWRcbiAgICAvLyBvbiBhIGNsaWVudC1zaWRlIHRyYW5zaXRpb24uIE90aGVyd2lzZSwgd2UnZCBnZXQgaW50byBhbiBpbmZpbml0ZVxuICAgIC8vIGxvb3AuXG5cbiAgICBpZiAoIWlzU2VydmVyUmVuZGVyKSB7XG4gICAgICBtYXJrQXNzZXRFcnJvcihlcnIpXG4gICAgfVxuICAgIHRocm93IGVyclxuICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb3V0ZXIgaW1wbGVtZW50cyBCYXNlUm91dGVyIHtcbiAgcm91dGU6IHN0cmluZ1xuICBwYXRobmFtZTogc3RyaW5nXG4gIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeVxuICBhc1BhdGg6IHN0cmluZ1xuICBiYXNlUGF0aDogc3RyaW5nXG5cbiAgLyoqXG4gICAqIE1hcCBvZiBhbGwgY29tcG9uZW50cyBsb2FkZWQgaW4gYFJvdXRlcmBcbiAgICovXG4gIGNvbXBvbmVudHM6IHsgW3BhdGhuYW1lOiBzdHJpbmddOiBQcml2YXRlUm91dGVJbmZvIH1cbiAgLy8gU3RhdGljIERhdGEgQ2FjaGVcbiAgc2RjOiB7IFthc1BhdGg6IHN0cmluZ106IG9iamVjdCB9ID0ge31cbiAgc3ViOiBTdWJzY3JpcHRpb25cbiAgY2xjOiBDb21wb25lbnRMb2FkQ2FuY2VsXG4gIHBhZ2VMb2FkZXI6IGFueVxuICBfYnBzOiBCZWZvcmVQb3BTdGF0ZUNhbGxiYWNrIHwgdW5kZWZpbmVkXG4gIGV2ZW50czogTWl0dEVtaXR0ZXJcbiAgX3dyYXBBcHA6IChBcHA6IEFwcENvbXBvbmVudCkgPT4gYW55XG4gIGlzU3NyOiBib29sZWFuXG4gIGlzRmFsbGJhY2s6IGJvb2xlYW5cbiAgX2luRmxpZ2h0Um91dGU/OiBzdHJpbmdcbiAgX3NoYWxsb3c/OiBib29sZWFuXG4gIGxvY2FsZT86IHN0cmluZ1xuICBsb2NhbGVzPzogc3RyaW5nW11cbiAgZGVmYXVsdExvY2FsZT86IHN0cmluZ1xuICBkb21haW5Mb2NhbGVzPzogRG9tYWluTG9jYWxlc1xuICBpc1JlYWR5OiBib29sZWFuXG4gIGlzTG9jYWxlRG9tYWluOiBib29sZWFuXG5cbiAgcHJpdmF0ZSBfaWR4OiBudW1iZXIgPSAwXG5cbiAgc3RhdGljIGV2ZW50czogTWl0dEVtaXR0ZXIgPSBtaXR0KClcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwYXRobmFtZTogc3RyaW5nLFxuICAgIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeSxcbiAgICBhczogc3RyaW5nLFxuICAgIHtcbiAgICAgIGluaXRpYWxQcm9wcyxcbiAgICAgIHBhZ2VMb2FkZXIsXG4gICAgICBBcHAsXG4gICAgICB3cmFwQXBwLFxuICAgICAgQ29tcG9uZW50LFxuICAgICAgZXJyLFxuICAgICAgc3Vic2NyaXB0aW9uLFxuICAgICAgaXNGYWxsYmFjayxcbiAgICAgIGxvY2FsZSxcbiAgICAgIGxvY2FsZXMsXG4gICAgICBkZWZhdWx0TG9jYWxlLFxuICAgICAgZG9tYWluTG9jYWxlcyxcbiAgICB9OiB7XG4gICAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvblxuICAgICAgaW5pdGlhbFByb3BzOiBhbnlcbiAgICAgIHBhZ2VMb2FkZXI6IGFueVxuICAgICAgQ29tcG9uZW50OiBDb21wb25lbnRUeXBlXG4gICAgICBBcHA6IEFwcENvbXBvbmVudFxuICAgICAgd3JhcEFwcDogKEFwcDogQXBwQ29tcG9uZW50KSA9PiBhbnlcbiAgICAgIGVycj86IEVycm9yXG4gICAgICBpc0ZhbGxiYWNrOiBib29sZWFuXG4gICAgICBsb2NhbGU/OiBzdHJpbmdcbiAgICAgIGxvY2FsZXM/OiBzdHJpbmdbXVxuICAgICAgZGVmYXVsdExvY2FsZT86IHN0cmluZ1xuICAgICAgZG9tYWluTG9jYWxlcz86IERvbWFpbkxvY2FsZXNcbiAgICB9XG4gICkge1xuICAgIC8vIHJlcHJlc2VudHMgdGhlIGN1cnJlbnQgY29tcG9uZW50IGtleVxuICAgIHRoaXMucm91dGUgPSByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXRobmFtZSlcblxuICAgIC8vIHNldCB1cCB0aGUgY29tcG9uZW50IGNhY2hlIChieSByb3V0ZSBrZXlzKVxuICAgIHRoaXMuY29tcG9uZW50cyA9IHt9XG4gICAgLy8gV2Ugc2hvdWxkIG5vdCBrZWVwIHRoZSBjYWNoZSwgaWYgdGhlcmUncyBhbiBlcnJvclxuICAgIC8vIE90aGVyd2lzZSwgdGhpcyBjYXVzZSBpc3N1ZXMgd2hlbiB3aGVuIGdvaW5nIGJhY2sgYW5kXG4gICAgLy8gY29tZSBhZ2FpbiB0byB0aGUgZXJyb3JlZCBwYWdlLlxuICAgIGlmIChwYXRobmFtZSAhPT0gJy9fZXJyb3InKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudHNbdGhpcy5yb3V0ZV0gPSB7XG4gICAgICAgIENvbXBvbmVudCxcbiAgICAgICAgaW5pdGlhbDogdHJ1ZSxcbiAgICAgICAgcHJvcHM6IGluaXRpYWxQcm9wcyxcbiAgICAgICAgZXJyLFxuICAgICAgICBfX05fU1NHOiBpbml0aWFsUHJvcHMgJiYgaW5pdGlhbFByb3BzLl9fTl9TU0csXG4gICAgICAgIF9fTl9TU1A6IGluaXRpYWxQcm9wcyAmJiBpbml0aWFsUHJvcHMuX19OX1NTUCxcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNvbXBvbmVudHNbJy9fYXBwJ10gPSB7XG4gICAgICBDb21wb25lbnQ6IEFwcCBhcyBDb21wb25lbnRUeXBlLFxuICAgICAgc3R5bGVTaGVldHM6IFtcbiAgICAgICAgLyogL19hcHAgZG9lcyBub3QgbmVlZCBpdHMgc3R5bGVzaGVldHMgbWFuYWdlZCAqL1xuICAgICAgXSxcbiAgICB9XG5cbiAgICAvLyBCYWNrd2FyZHMgY29tcGF0IGZvciBSb3V0ZXIucm91dGVyLmV2ZW50c1xuICAgIC8vIFRPRE86IFNob3VsZCBiZSByZW1vdmUgdGhlIGZvbGxvd2luZyBtYWpvciB2ZXJzaW9uIGFzIGl0IHdhcyBuZXZlciBkb2N1bWVudGVkXG4gICAgdGhpcy5ldmVudHMgPSBSb3V0ZXIuZXZlbnRzXG5cbiAgICB0aGlzLnBhZ2VMb2FkZXIgPSBwYWdlTG9hZGVyXG4gICAgdGhpcy5wYXRobmFtZSA9IHBhdGhuYW1lXG4gICAgdGhpcy5xdWVyeSA9IHF1ZXJ5XG4gICAgLy8gaWYgYXV0byBwcmVyZW5kZXJlZCBhbmQgZHluYW1pYyByb3V0ZSB3YWl0IHRvIHVwZGF0ZSBhc1BhdGhcbiAgICAvLyB1bnRpbCBhZnRlciBtb3VudCB0byBwcmV2ZW50IGh5ZHJhdGlvbiBtaXNtYXRjaFxuICAgIGNvbnN0IGF1dG9FeHBvcnREeW5hbWljID1cbiAgICAgIGlzRHluYW1pY1JvdXRlKHBhdGhuYW1lKSAmJiBzZWxmLl9fTkVYVF9EQVRBX18uYXV0b0V4cG9ydFxuXG4gICAgdGhpcy5hc1BhdGggPSBhdXRvRXhwb3J0RHluYW1pYyA/IHBhdGhuYW1lIDogYXNcbiAgICB0aGlzLmJhc2VQYXRoID0gYmFzZVBhdGhcbiAgICB0aGlzLnN1YiA9IHN1YnNjcmlwdGlvblxuICAgIHRoaXMuY2xjID0gbnVsbFxuICAgIHRoaXMuX3dyYXBBcHAgPSB3cmFwQXBwXG4gICAgLy8gbWFrZSBzdXJlIHRvIGlnbm9yZSBleHRyYSBwb3BTdGF0ZSBpbiBzYWZhcmkgb24gbmF2aWdhdGluZ1xuICAgIC8vIGJhY2sgZnJvbSBleHRlcm5hbCBzaXRlXG4gICAgdGhpcy5pc1NzciA9IHRydWVcblxuICAgIHRoaXMuaXNGYWxsYmFjayA9IGlzRmFsbGJhY2tcblxuICAgIHRoaXMuaXNSZWFkeSA9ICEhKFxuICAgICAgc2VsZi5fX05FWFRfREFUQV9fLmdzc3AgfHxcbiAgICAgIHNlbGYuX19ORVhUX0RBVEFfXy5naXAgfHxcbiAgICAgICghYXV0b0V4cG9ydER5bmFtaWMgJiYgIXNlbGYubG9jYXRpb24uc2VhcmNoKVxuICAgIClcbiAgICB0aGlzLmlzTG9jYWxlRG9tYWluID0gZmFsc2VcblxuICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfSTE4Tl9TVVBQT1JUKSB7XG4gICAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZVxuICAgICAgdGhpcy5sb2NhbGVzID0gbG9jYWxlc1xuICAgICAgdGhpcy5kZWZhdWx0TG9jYWxlID0gZGVmYXVsdExvY2FsZVxuICAgICAgdGhpcy5kb21haW5Mb2NhbGVzID0gZG9tYWluTG9jYWxlc1xuICAgICAgdGhpcy5pc0xvY2FsZURvbWFpbiA9ICEhZGV0ZWN0RG9tYWluTG9jYWxlKFxuICAgICAgICBkb21haW5Mb2NhbGVzLFxuICAgICAgICBzZWxmLmxvY2F0aW9uLmhvc3RuYW1lXG4gICAgICApXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBtYWtlIHN1cmUgXCJhc1wiIGRvZXNuJ3Qgc3RhcnQgd2l0aCBkb3VibGUgc2xhc2hlcyBvciBlbHNlIGl0IGNhblxuICAgICAgLy8gdGhyb3cgYW4gZXJyb3IgYXMgaXQncyBjb25zaWRlcmVkIGludmFsaWRcbiAgICAgIGlmIChhcy5zdWJzdHIoMCwgMikgIT09ICcvLycpIHtcbiAgICAgICAgLy8gaW4gb3JkZXIgZm9yIGBlLnN0YXRlYCB0byB3b3JrIG9uIHRoZSBgb25wb3BzdGF0ZWAgZXZlbnRcbiAgICAgICAgLy8gd2UgaGF2ZSB0byByZWdpc3RlciB0aGUgaW5pdGlhbCByb3V0ZSB1cG9uIGluaXRpYWxpemF0aW9uXG4gICAgICAgIHRoaXMuY2hhbmdlU3RhdGUoXG4gICAgICAgICAgJ3JlcGxhY2VTdGF0ZScsXG4gICAgICAgICAgZm9ybWF0V2l0aFZhbGlkYXRpb24oeyBwYXRobmFtZTogYWRkQmFzZVBhdGgocGF0aG5hbWUpLCBxdWVyeSB9KSxcbiAgICAgICAgICBnZXRVUkwoKSxcbiAgICAgICAgICB7IGxvY2FsZSB9XG4gICAgICAgIClcbiAgICAgIH1cblxuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5vblBvcFN0YXRlKVxuXG4gICAgICAvLyBlbmFibGUgY3VzdG9tIHNjcm9sbCByZXN0b3JhdGlvbiBoYW5kbGluZyB3aGVuIGF2YWlsYWJsZVxuICAgICAgLy8gb3RoZXJ3aXNlIGZhbGxiYWNrIHRvIGJyb3dzZXIncyBkZWZhdWx0IGhhbmRsaW5nXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX1NDUk9MTF9SRVNUT1JBVElPTikge1xuICAgICAgICBpZiAobWFudWFsU2Nyb2xsUmVzdG9yYXRpb24pIHtcbiAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5zY3JvbGxSZXN0b3JhdGlvbiA9ICdtYW51YWwnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblBvcFN0YXRlID0gKGU6IFBvcFN0YXRlRXZlbnQpOiB2b2lkID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IGUuc3RhdGUgYXMgSGlzdG9yeVN0YXRlXG5cbiAgICBpZiAoIXN0YXRlKSB7XG4gICAgICAvLyBXZSBnZXQgc3RhdGUgYXMgdW5kZWZpbmVkIGZvciB0d28gcmVhc29ucy5cbiAgICAgIC8vICAxLiBXaXRoIG9sZGVyIHNhZmFyaSAoPCA4KSBhbmQgb2xkZXIgY2hyb21lICg8IDM0KVxuICAgICAgLy8gIDIuIFdoZW4gdGhlIFVSTCBjaGFuZ2VkIHdpdGggI1xuICAgICAgLy9cbiAgICAgIC8vIEluIHRoZSBib3RoIGNhc2VzLCB3ZSBkb24ndCBuZWVkIHRvIHByb2NlZWQgYW5kIGNoYW5nZSB0aGUgcm91dGUuXG4gICAgICAvLyAoYXMgaXQncyBhbHJlYWR5IGNoYW5nZWQpXG4gICAgICAvLyBCdXQgd2UgY2FuIHNpbXBseSByZXBsYWNlIHRoZSBzdGF0ZSB3aXRoIHRoZSBuZXcgY2hhbmdlcy5cbiAgICAgIC8vIEFjdHVhbGx5LCBmb3IgKDEpIHdlIGRvbid0IG5lZWQgdG8gbm90aGluZy4gQnV0IGl0J3MgaGFyZCB0byBkZXRlY3QgdGhhdCBldmVudC5cbiAgICAgIC8vIFNvLCBkb2luZyB0aGUgZm9sbG93aW5nIGZvciAoMSkgZG9lcyBubyBoYXJtLlxuICAgICAgY29uc3QgeyBwYXRobmFtZSwgcXVlcnkgfSA9IHRoaXNcbiAgICAgIHRoaXMuY2hhbmdlU3RhdGUoXG4gICAgICAgICdyZXBsYWNlU3RhdGUnLFxuICAgICAgICBmb3JtYXRXaXRoVmFsaWRhdGlvbih7IHBhdGhuYW1lOiBhZGRCYXNlUGF0aChwYXRobmFtZSksIHF1ZXJ5IH0pLFxuICAgICAgICBnZXRVUkwoKVxuICAgICAgKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKCFzdGF0ZS5fX04pIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCBmb3JjZWRTY3JvbGw6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB8IHVuZGVmaW5lZFxuICAgIGNvbnN0IHsgdXJsLCBhcywgb3B0aW9ucywgaWR4IH0gPSBzdGF0ZVxuICAgIGlmIChwcm9jZXNzLmVudi5fX05FWFRfU0NST0xMX1JFU1RPUkFUSU9OKSB7XG4gICAgICBpZiAobWFudWFsU2Nyb2xsUmVzdG9yYXRpb24pIHtcbiAgICAgICAgaWYgKHRoaXMuX2lkeCAhPT0gaWR4KSB7XG4gICAgICAgICAgLy8gU25hcHNob3QgY3VycmVudCBzY3JvbGwgcG9zaXRpb246XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNlc3Npb25TdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICAgICdfX25leHRfc2Nyb2xsXycgKyB0aGlzLl9pZHgsXG4gICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHsgeDogc2VsZi5wYWdlWE9mZnNldCwgeTogc2VsZi5wYWdlWU9mZnNldCB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0gY2F0Y2gge31cblxuICAgICAgICAgIC8vIFJlc3RvcmUgb2xkIHNjcm9sbCBwb3NpdGlvbjpcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgdiA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oJ19fbmV4dF9zY3JvbGxfJyArIGlkeClcbiAgICAgICAgICAgIGZvcmNlZFNjcm9sbCA9IEpTT04ucGFyc2UodiEpXG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICBmb3JjZWRTY3JvbGwgPSB7IHg6IDAsIHk6IDAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9pZHggPSBpZHhcblxuICAgIGNvbnN0IHsgcGF0aG5hbWUgfSA9IHBhcnNlUmVsYXRpdmVVcmwodXJsKVxuXG4gICAgLy8gTWFrZSBzdXJlIHdlIGRvbid0IHJlLXJlbmRlciBvbiBpbml0aWFsIGxvYWQsXG4gICAgLy8gY2FuIGJlIGNhdXNlZCBieSBuYXZpZ2F0aW5nIGJhY2sgZnJvbSBhbiBleHRlcm5hbCBzaXRlXG4gICAgaWYgKHRoaXMuaXNTc3IgJiYgYXMgPT09IHRoaXMuYXNQYXRoICYmIHBhdGhuYW1lID09PSB0aGlzLnBhdGhuYW1lKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgZG93bnN0cmVhbSBhcHBsaWNhdGlvbiByZXR1cm5zIGZhbHN5LCByZXR1cm4uXG4gICAgLy8gVGhleSB3aWxsIHRoZW4gYmUgcmVzcG9uc2libGUgZm9yIGhhbmRsaW5nIHRoZSBldmVudC5cbiAgICBpZiAodGhpcy5fYnBzICYmICF0aGlzLl9icHMoc3RhdGUpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLmNoYW5nZShcbiAgICAgICdyZXBsYWNlU3RhdGUnLFxuICAgICAgdXJsLFxuICAgICAgYXMsXG4gICAgICBPYmplY3QuYXNzaWduPHt9LCBUcmFuc2l0aW9uT3B0aW9ucywgVHJhbnNpdGlvbk9wdGlvbnM+KHt9LCBvcHRpb25zLCB7XG4gICAgICAgIHNoYWxsb3c6IG9wdGlvbnMuc2hhbGxvdyAmJiB0aGlzLl9zaGFsbG93LFxuICAgICAgICBsb2NhbGU6IG9wdGlvbnMubG9jYWxlIHx8IHRoaXMuZGVmYXVsdExvY2FsZSxcbiAgICAgIH0pLFxuICAgICAgZm9yY2VkU2Nyb2xsXG4gICAgKVxuICB9XG5cbiAgcmVsb2FkKCk6IHZvaWQge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKVxuICB9XG5cbiAgLyoqXG4gICAqIEdvIGJhY2sgaW4gaGlzdG9yeVxuICAgKi9cbiAgYmFjaygpIHtcbiAgICB3aW5kb3cuaGlzdG9yeS5iYWNrKClcbiAgfVxuXG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIGBwdXNoU3RhdGVgIHdpdGggYXJndW1lbnRzXG4gICAqIEBwYXJhbSB1cmwgb2YgdGhlIHJvdXRlXG4gICAqIEBwYXJhbSBhcyBtYXNrcyBgdXJsYCBmb3IgdGhlIGJyb3dzZXJcbiAgICogQHBhcmFtIG9wdGlvbnMgb2JqZWN0IHlvdSBjYW4gZGVmaW5lIGBzaGFsbG93YCBhbmQgb3RoZXIgb3B0aW9uc1xuICAgKi9cbiAgcHVzaCh1cmw6IFVybCwgYXM/OiBVcmwsIG9wdGlvbnM6IFRyYW5zaXRpb25PcHRpb25zID0ge30pIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX1NDUk9MTF9SRVNUT1JBVElPTikge1xuICAgICAgLy8gVE9ETzogcmVtb3ZlIGluIHRoZSBmdXR1cmUgd2hlbiB3ZSB1cGRhdGUgaGlzdG9yeSBiZWZvcmUgcm91dGUgY2hhbmdlXG4gICAgICAvLyBpcyBjb21wbGV0ZSwgYXMgdGhlIHBvcHN0YXRlIGV2ZW50IHNob3VsZCBoYW5kbGUgdGhpcyBjYXB0dXJlLlxuICAgICAgaWYgKG1hbnVhbFNjcm9sbFJlc3RvcmF0aW9uKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gU25hcHNob3Qgc2Nyb2xsIHBvc2l0aW9uIHJpZ2h0IGJlZm9yZSBuYXZpZ2F0aW5nIHRvIGEgbmV3IHBhZ2U6XG4gICAgICAgICAgc2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShcbiAgICAgICAgICAgICdfX25leHRfc2Nyb2xsXycgKyB0aGlzLl9pZHgsXG4gICAgICAgICAgICBKU09OLnN0cmluZ2lmeSh7IHg6IHNlbGYucGFnZVhPZmZzZXQsIHk6IHNlbGYucGFnZVlPZmZzZXQgfSlcbiAgICAgICAgICApXG4gICAgICAgIH0gY2F0Y2gge31cbiAgICAgIH1cbiAgICB9XG4gICAgOyh7IHVybCwgYXMgfSA9IHByZXBhcmVVcmxBcyh0aGlzLCB1cmwsIGFzKSlcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ3B1c2hTdGF0ZScsIHVybCwgYXMsIG9wdGlvbnMpXG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybXMgYSBgcmVwbGFjZVN0YXRlYCB3aXRoIGFyZ3VtZW50c1xuICAgKiBAcGFyYW0gdXJsIG9mIHRoZSByb3V0ZVxuICAgKiBAcGFyYW0gYXMgbWFza3MgYHVybGAgZm9yIHRoZSBicm93c2VyXG4gICAqIEBwYXJhbSBvcHRpb25zIG9iamVjdCB5b3UgY2FuIGRlZmluZSBgc2hhbGxvd2AgYW5kIG90aGVyIG9wdGlvbnNcbiAgICovXG4gIHJlcGxhY2UodXJsOiBVcmwsIGFzPzogVXJsLCBvcHRpb25zOiBUcmFuc2l0aW9uT3B0aW9ucyA9IHt9KSB7XG4gICAgOyh7IHVybCwgYXMgfSA9IHByZXBhcmVVcmxBcyh0aGlzLCB1cmwsIGFzKSlcbiAgICByZXR1cm4gdGhpcy5jaGFuZ2UoJ3JlcGxhY2VTdGF0ZScsIHVybCwgYXMsIG9wdGlvbnMpXG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGNoYW5nZShcbiAgICBtZXRob2Q6IEhpc3RvcnlNZXRob2QsXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgYXM6IHN0cmluZyxcbiAgICBvcHRpb25zOiBUcmFuc2l0aW9uT3B0aW9ucyxcbiAgICBmb3JjZWRTY3JvbGw/OiB7IHg6IG51bWJlcjsgeTogbnVtYmVyIH1cbiAgKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKCFpc0xvY2FsVVJMKHVybCkpIHtcbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBmb3Igc3RhdGljIHBhZ2VzIHdpdGggcXVlcnkgcGFyYW1zIGluIHRoZSBVUkwgd2UgZGVsYXlcbiAgICAvLyBtYXJraW5nIHRoZSByb3V0ZXIgcmVhZHkgdW50aWwgYWZ0ZXIgdGhlIHF1ZXJ5IGlzIHVwZGF0ZWRcbiAgICBpZiAoKG9wdGlvbnMgYXMgYW55KS5faCkge1xuICAgICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZVxuICAgIH1cblxuICAgIC8vIERlZmF1bHQgdG8gc2Nyb2xsIHJlc2V0IGJlaGF2aW9yIHVubGVzcyBleHBsaWNpdGx5IHNwZWNpZmllZCB0byBiZVxuICAgIC8vIGBmYWxzZWAhIFRoaXMgbWFrZXMgdGhlIGJlaGF2aW9yIGJldHdlZW4gdXNpbmcgYFJvdXRlciNwdXNoYCBhbmQgYVxuICAgIC8vIGA8TGluayAvPmAgY29uc2lzdGVudC5cbiAgICBvcHRpb25zLnNjcm9sbCA9ICEhKG9wdGlvbnMuc2Nyb2xsID8/IHRydWUpXG5cbiAgICBsZXQgbG9jYWxlQ2hhbmdlID0gb3B0aW9ucy5sb2NhbGUgIT09IHRoaXMubG9jYWxlXG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgdGhpcy5sb2NhbGUgPVxuICAgICAgICBvcHRpb25zLmxvY2FsZSA9PT0gZmFsc2VcbiAgICAgICAgICA/IHRoaXMuZGVmYXVsdExvY2FsZVxuICAgICAgICAgIDogb3B0aW9ucy5sb2NhbGUgfHwgdGhpcy5sb2NhbGVcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmxvY2FsZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSB0aGlzLmxvY2FsZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJzZWRBcyA9IHBhcnNlUmVsYXRpdmVVcmwoaGFzQmFzZVBhdGgoYXMpID8gZGVsQmFzZVBhdGgoYXMpIDogYXMpXG4gICAgICBjb25zdCBsb2NhbGVQYXRoUmVzdWx0ID0gbm9ybWFsaXplTG9jYWxlUGF0aChcbiAgICAgICAgcGFyc2VkQXMucGF0aG5hbWUsXG4gICAgICAgIHRoaXMubG9jYWxlc1xuICAgICAgKVxuXG4gICAgICBpZiAobG9jYWxlUGF0aFJlc3VsdC5kZXRlY3RlZExvY2FsZSkge1xuICAgICAgICB0aGlzLmxvY2FsZSA9IGxvY2FsZVBhdGhSZXN1bHQuZGV0ZWN0ZWRMb2NhbGVcbiAgICAgICAgcGFyc2VkQXMucGF0aG5hbWUgPSBhZGRCYXNlUGF0aChwYXJzZWRBcy5wYXRobmFtZSlcbiAgICAgICAgYXMgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWRBcylcbiAgICAgICAgdXJsID0gYWRkQmFzZVBhdGgoXG4gICAgICAgICAgbm9ybWFsaXplTG9jYWxlUGF0aChcbiAgICAgICAgICAgIGhhc0Jhc2VQYXRoKHVybCkgPyBkZWxCYXNlUGF0aCh1cmwpIDogdXJsLFxuICAgICAgICAgICAgdGhpcy5sb2NhbGVzXG4gICAgICAgICAgKS5wYXRobmFtZVxuICAgICAgICApXG4gICAgICB9XG4gICAgICBsZXQgZGlkTmF2aWdhdGUgPSBmYWxzZVxuXG4gICAgICAvLyB3ZSBuZWVkIHRvIHdyYXAgdGhpcyBpbiB0aGUgZW52IGNoZWNrIGFnYWluIHNpbmNlIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgIC8vIG1vdmVzIHRoaXMgb24gaXRzIG93biBkdWUgdG8gdGhlIHJldHVyblxuICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgLy8gaWYgdGhlIGxvY2FsZSBpc24ndCBjb25maWd1cmVkIGhhcmQgbmF2aWdhdGUgdG8gc2hvdyA0MDQgcGFnZVxuICAgICAgICBpZiAoIXRoaXMubG9jYWxlcz8uaW5jbHVkZXModGhpcy5sb2NhbGUhKSkge1xuICAgICAgICAgIHBhcnNlZEFzLnBhdGhuYW1lID0gYWRkTG9jYWxlKHBhcnNlZEFzLnBhdGhuYW1lLCB0aGlzLmxvY2FsZSlcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZEFzKVxuICAgICAgICAgIC8vIHRoaXMgd2FzIHByZXZpb3VzbHkgYSByZXR1cm4gYnV0IHdhcyByZW1vdmVkIGluIGZhdm9yXG4gICAgICAgICAgLy8gb2YgYmV0dGVyIGRlYWQgY29kZSBlbGltaW5hdGlvbiB3aXRoIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgICAgICBkaWROYXZpZ2F0ZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBkZXRlY3RlZERvbWFpbiA9IGRldGVjdERvbWFpbkxvY2FsZShcbiAgICAgICAgdGhpcy5kb21haW5Mb2NhbGVzLFxuICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgIHRoaXMubG9jYWxlXG4gICAgICApXG5cbiAgICAgIC8vIHdlIG5lZWQgdG8gd3JhcCB0aGlzIGluIHRoZSBlbnYgY2hlY2sgYWdhaW4gc2luY2UgcmVnZW5lcmF0b3IgcnVudGltZVxuICAgICAgLy8gbW92ZXMgdGhpcyBvbiBpdHMgb3duIGR1ZSB0byB0aGUgcmV0dXJuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuX19ORVhUX0kxOE5fU1VQUE9SVCkge1xuICAgICAgICAvLyBpZiB3ZSBhcmUgbmF2aWdhdGluZyB0byBhIGRvbWFpbiBsb2NhbGUgZW5zdXJlIHdlIHJlZGlyZWN0IHRvIHRoZVxuICAgICAgICAvLyBjb3JyZWN0IGRvbWFpblxuICAgICAgICBpZiAoXG4gICAgICAgICAgIWRpZE5hdmlnYXRlICYmXG4gICAgICAgICAgZGV0ZWN0ZWREb21haW4gJiZcbiAgICAgICAgICB0aGlzLmlzTG9jYWxlRG9tYWluICYmXG4gICAgICAgICAgc2VsZi5sb2NhdGlvbi5ob3N0bmFtZSAhPT0gZGV0ZWN0ZWREb21haW4uZG9tYWluXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGFzTm9CYXNlUGF0aCA9IGRlbEJhc2VQYXRoKGFzKVxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYGh0dHAke2RldGVjdGVkRG9tYWluLmh0dHAgPyAnJyA6ICdzJ306Ly8ke1xuICAgICAgICAgICAgZGV0ZWN0ZWREb21haW4uZG9tYWluXG4gICAgICAgICAgfSR7YWRkQmFzZVBhdGgoXG4gICAgICAgICAgICBgJHtcbiAgICAgICAgICAgICAgdGhpcy5sb2NhbGUgPT09IGRldGVjdGVkRG9tYWluLmRlZmF1bHRMb2NhbGVcbiAgICAgICAgICAgICAgICA/ICcnXG4gICAgICAgICAgICAgICAgOiBgLyR7dGhpcy5sb2NhbGV9YFxuICAgICAgICAgICAgfSR7YXNOb0Jhc2VQYXRoID09PSAnLycgPyAnJyA6IGFzTm9CYXNlUGF0aH1gIHx8ICcvJ1xuICAgICAgICAgICl9YFxuICAgICAgICAgIC8vIHRoaXMgd2FzIHByZXZpb3VzbHkgYSByZXR1cm4gYnV0IHdhcyByZW1vdmVkIGluIGZhdm9yXG4gICAgICAgICAgLy8gb2YgYmV0dGVyIGRlYWQgY29kZSBlbGltaW5hdGlvbiB3aXRoIHJlZ2VuZXJhdG9yIHJ1bnRpbWVcbiAgICAgICAgICBkaWROYXZpZ2F0ZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZGlkTmF2aWdhdGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgpID0+IHt9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghKG9wdGlvbnMgYXMgYW55KS5faCkge1xuICAgICAgdGhpcy5pc1NzciA9IGZhbHNlXG4gICAgfVxuICAgIC8vIG1hcmtpbmcgcm91dGUgY2hhbmdlcyBhcyBhIG5hdmlnYXRpb24gc3RhcnQgZW50cnlcbiAgICBpZiAoU1QpIHtcbiAgICAgIHBlcmZvcm1hbmNlLm1hcmsoJ3JvdXRlQ2hhbmdlJylcbiAgICB9XG5cbiAgICBjb25zdCB7IHNoYWxsb3cgPSBmYWxzZSB9ID0gb3B0aW9uc1xuICAgIGNvbnN0IHJvdXRlUHJvcHMgPSB7IHNoYWxsb3cgfVxuXG4gICAgaWYgKHRoaXMuX2luRmxpZ2h0Um91dGUpIHtcbiAgICAgIHRoaXMuYWJvcnRDb21wb25lbnRMb2FkKHRoaXMuX2luRmxpZ2h0Um91dGUsIHJvdXRlUHJvcHMpXG4gICAgfVxuXG4gICAgYXMgPSBhZGRCYXNlUGF0aChcbiAgICAgIGFkZExvY2FsZShcbiAgICAgICAgaGFzQmFzZVBhdGgoYXMpID8gZGVsQmFzZVBhdGgoYXMpIDogYXMsXG4gICAgICAgIG9wdGlvbnMubG9jYWxlLFxuICAgICAgICB0aGlzLmRlZmF1bHRMb2NhbGVcbiAgICAgIClcbiAgICApXG4gICAgY29uc3QgY2xlYW5lZEFzID0gZGVsTG9jYWxlKFxuICAgICAgaGFzQmFzZVBhdGgoYXMpID8gZGVsQmFzZVBhdGgoYXMpIDogYXMsXG4gICAgICB0aGlzLmxvY2FsZVxuICAgIClcbiAgICB0aGlzLl9pbkZsaWdodFJvdXRlID0gYXNcblxuICAgIC8vIElmIHRoZSB1cmwgY2hhbmdlIGlzIG9ubHkgcmVsYXRlZCB0byBhIGhhc2ggY2hhbmdlXG4gICAgLy8gV2Ugc2hvdWxkIG5vdCBwcm9jZWVkLiBXZSBzaG91bGQgb25seSBjaGFuZ2UgdGhlIHN0YXRlLlxuXG4gICAgLy8gV0FSTklORzogYF9oYCBpcyBhbiBpbnRlcm5hbCBvcHRpb24gZm9yIGhhbmRpbmcgTmV4dC5qcyBjbGllbnQtc2lkZVxuICAgIC8vIGh5ZHJhdGlvbi4gWW91ciBhcHAgc2hvdWxkIF9uZXZlcl8gdXNlIHRoaXMgcHJvcGVydHkuIEl0IG1heSBjaGFuZ2UgYXRcbiAgICAvLyBhbnkgdGltZSB3aXRob3V0IG5vdGljZS5cbiAgICBpZiAoIShvcHRpb25zIGFzIGFueSkuX2ggJiYgdGhpcy5vbmx5QUhhc2hDaGFuZ2UoY2xlYW5lZEFzKSkge1xuICAgICAgdGhpcy5hc1BhdGggPSBjbGVhbmVkQXNcbiAgICAgIFJvdXRlci5ldmVudHMuZW1pdCgnaGFzaENoYW5nZVN0YXJ0JywgYXMsIHJvdXRlUHJvcHMpXG4gICAgICAvLyBUT0RPOiBkbyB3ZSBuZWVkIHRoZSByZXNvbHZlZCBocmVmIHdoZW4gb25seSBhIGhhc2ggY2hhbmdlP1xuICAgICAgdGhpcy5jaGFuZ2VTdGF0ZShtZXRob2QsIHVybCwgYXMsIG9wdGlvbnMpXG4gICAgICB0aGlzLnNjcm9sbFRvSGFzaChjbGVhbmVkQXMpXG4gICAgICB0aGlzLm5vdGlmeSh0aGlzLmNvbXBvbmVudHNbdGhpcy5yb3V0ZV0sIG51bGwpXG4gICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ2hhc2hDaGFuZ2VDb21wbGV0ZScsIGFzLCByb3V0ZVByb3BzKVxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBsZXQgcGFyc2VkID0gcGFyc2VSZWxhdGl2ZVVybCh1cmwpXG4gICAgbGV0IHsgcGF0aG5hbWUsIHF1ZXJ5IH0gPSBwYXJzZWRcblxuICAgIC8vIFRoZSBidWlsZCBtYW5pZmVzdCBuZWVkcyB0byBiZSBsb2FkZWQgYmVmb3JlIGF1dG8tc3RhdGljIGR5bmFtaWMgcGFnZXNcbiAgICAvLyBnZXQgdGhlaXIgcXVlcnkgcGFyYW1ldGVycyB0byBhbGxvdyBlbnN1cmluZyB0aGV5IGNhbiBiZSBwYXJzZWQgcHJvcGVybHlcbiAgICAvLyB3aGVuIHJld3JpdHRlbiB0b1xuICAgIGxldCBwYWdlczogYW55LCByZXdyaXRlczogYW55XG4gICAgdHJ5IHtcbiAgICAgIHBhZ2VzID0gYXdhaXQgdGhpcy5wYWdlTG9hZGVyLmdldFBhZ2VMaXN0KClcbiAgICAgIDsoeyBfX3Jld3JpdGVzOiByZXdyaXRlcyB9ID0gYXdhaXQgZ2V0Q2xpZW50QnVpbGRNYW5pZmVzdCgpKVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gSWYgd2UgZmFpbCB0byByZXNvbHZlIHRoZSBwYWdlIGxpc3Qgb3IgY2xpZW50LWJ1aWxkIG1hbmlmZXN0LCB3ZSBtdXN0XG4gICAgICAvLyBkbyBhIHNlcnZlci1zaWRlIHRyYW5zaXRpb246XG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFzXG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBwYXJzZWQgPSB0aGlzLl9yZXNvbHZlSHJlZihwYXJzZWQsIHBhZ2VzKSBhcyB0eXBlb2YgcGFyc2VkXG5cbiAgICBpZiAocGFyc2VkLnBhdGhuYW1lICE9PSBwYXRobmFtZSkge1xuICAgICAgcGF0aG5hbWUgPSBwYXJzZWQucGF0aG5hbWVcbiAgICAgIHVybCA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZClcbiAgICB9XG5cbiAgICAvLyB1cmwgYW5kIGFzIHNob3VsZCBhbHdheXMgYmUgcHJlZml4ZWQgd2l0aCBiYXNlUGF0aCBieSB0aGlzXG4gICAgLy8gcG9pbnQgYnkgZWl0aGVyIG5leHQvbGluayBvciByb3V0ZXIucHVzaC9yZXBsYWNlIHNvIHN0cmlwIHRoZVxuICAgIC8vIGJhc2VQYXRoIGZyb20gdGhlIHBhdGhuYW1lIHRvIG1hdGNoIHRoZSBwYWdlcyBkaXIgMS10by0xXG4gICAgcGF0aG5hbWUgPSBwYXRobmFtZVxuICAgICAgPyByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChkZWxCYXNlUGF0aChwYXRobmFtZSkpXG4gICAgICA6IHBhdGhuYW1lXG5cbiAgICAvLyBJZiBhc2tlZCB0byBjaGFuZ2UgdGhlIGN1cnJlbnQgVVJMIHdlIHNob3VsZCByZWxvYWQgdGhlIGN1cnJlbnQgcGFnZVxuICAgIC8vIChub3QgbG9jYXRpb24ucmVsb2FkKCkgYnV0IHJlbG9hZCBnZXRJbml0aWFsUHJvcHMgYW5kIG90aGVyIE5leHQuanMgc3R1ZmZzKVxuICAgIC8vIFdlIGFsc28gbmVlZCB0byBzZXQgdGhlIG1ldGhvZCA9IHJlcGxhY2VTdGF0ZSBhbHdheXNcbiAgICAvLyBhcyB0aGlzIHNob3VsZCBub3QgZ28gaW50byB0aGUgaGlzdG9yeSAoVGhhdCdzIGhvdyBicm93c2VycyB3b3JrKVxuICAgIC8vIFdlIHNob3VsZCBjb21wYXJlIHRoZSBuZXcgYXNQYXRoIHRvIHRoZSBjdXJyZW50IGFzUGF0aCwgbm90IHRoZSB1cmxcbiAgICBpZiAoIXRoaXMudXJsSXNOZXcoY2xlYW5lZEFzKSAmJiAhbG9jYWxlQ2hhbmdlKSB7XG4gICAgICBtZXRob2QgPSAncmVwbGFjZVN0YXRlJ1xuICAgIH1cblxuICAgIGxldCByb3V0ZSA9IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lKVxuXG4gICAgLy8gd2UgbmVlZCB0byByZXNvbHZlIHRoZSBhcyB2YWx1ZSB1c2luZyByZXdyaXRlcyBmb3IgZHluYW1pYyBTU0dcbiAgICAvLyBwYWdlcyB0byBhbGxvdyBidWlsZGluZyB0aGUgZGF0YSBVUkwgY29ycmVjdGx5XG4gICAgbGV0IHJlc29sdmVkQXMgPSBhc1xuXG4gICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9IQVNfUkVXUklURVMgJiYgYXMuc3RhcnRzV2l0aCgnLycpKSB7XG4gICAgICBjb25zdCByZXdyaXRlc1Jlc3VsdCA9IHJlc29sdmVSZXdyaXRlcyhcbiAgICAgICAgYWRkQmFzZVBhdGgoYWRkTG9jYWxlKGRlbEJhc2VQYXRoKGFzKSwgdGhpcy5sb2NhbGUpKSxcbiAgICAgICAgcGFnZXMsXG4gICAgICAgIHJld3JpdGVzLFxuICAgICAgICBxdWVyeSxcbiAgICAgICAgKHA6IHN0cmluZykgPT4gdGhpcy5fcmVzb2x2ZUhyZWYoeyBwYXRobmFtZTogcCB9LCBwYWdlcykucGF0aG5hbWUhLFxuICAgICAgICB0aGlzLmxvY2FsZXNcbiAgICAgIClcbiAgICAgIHJlc29sdmVkQXMgPSByZXdyaXRlc1Jlc3VsdC5hc1BhdGhcblxuICAgICAgaWYgKHJld3JpdGVzUmVzdWx0Lm1hdGNoZWRQYWdlICYmIHJld3JpdGVzUmVzdWx0LnJlc29sdmVkSHJlZikge1xuICAgICAgICAvLyBpZiB0aGlzIGRpcmVjdGx5IG1hdGNoZXMgYSBwYWdlIHdlIG5lZWQgdG8gdXBkYXRlIHRoZSBocmVmIHRvXG4gICAgICAgIC8vIGFsbG93IHRoZSBjb3JyZWN0IHBhZ2UgY2h1bmsgdG8gYmUgbG9hZGVkXG4gICAgICAgIHJvdXRlID0gcmV3cml0ZXNSZXN1bHQucmVzb2x2ZWRIcmVmXG4gICAgICAgIHBhdGhuYW1lID0gcmV3cml0ZXNSZXN1bHQucmVzb2x2ZWRIcmVmXG4gICAgICAgIHBhcnNlZC5wYXRobmFtZSA9IHBhdGhuYW1lXG4gICAgICAgIHVybCA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKHBhcnNlZClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWlzTG9jYWxVUkwoYXMpKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYEludmFsaWQgaHJlZjogXCIke3VybH1cIiBhbmQgYXM6IFwiJHthc31cIiwgcmVjZWl2ZWQgcmVsYXRpdmUgaHJlZiBhbmQgZXh0ZXJuYWwgYXNgICtcbiAgICAgICAgICAgIGBcXG5TZWUgbW9yZSBpbmZvOiBodHRwczovL2Vyci5zaC9uZXh0LmpzL2ludmFsaWQtcmVsYXRpdmUtdXJsLWV4dGVybmFsLWFzYFxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gYXNcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIHJlc29sdmVkQXMgPSBkZWxMb2NhbGUoZGVsQmFzZVBhdGgocmVzb2x2ZWRBcyksIHRoaXMubG9jYWxlKVxuXG4gICAgaWYgKGlzRHluYW1pY1JvdXRlKHJvdXRlKSkge1xuICAgICAgY29uc3QgcGFyc2VkQXMgPSBwYXJzZVJlbGF0aXZlVXJsKHJlc29sdmVkQXMpXG4gICAgICBjb25zdCBhc1BhdGhuYW1lID0gcGFyc2VkQXMucGF0aG5hbWVcblxuICAgICAgY29uc3Qgcm91dGVSZWdleCA9IGdldFJvdXRlUmVnZXgocm91dGUpXG4gICAgICBjb25zdCByb3V0ZU1hdGNoID0gZ2V0Um91dGVNYXRjaGVyKHJvdXRlUmVnZXgpKGFzUGF0aG5hbWUpXG4gICAgICBjb25zdCBzaG91bGRJbnRlcnBvbGF0ZSA9IHJvdXRlID09PSBhc1BhdGhuYW1lXG4gICAgICBjb25zdCBpbnRlcnBvbGF0ZWRBcyA9IHNob3VsZEludGVycG9sYXRlXG4gICAgICAgID8gaW50ZXJwb2xhdGVBcyhyb3V0ZSwgYXNQYXRobmFtZSwgcXVlcnkpXG4gICAgICAgIDogKHt9IGFzIHsgcmVzdWx0OiB1bmRlZmluZWQ7IHBhcmFtczogdW5kZWZpbmVkIH0pXG5cbiAgICAgIGlmICghcm91dGVNYXRjaCB8fCAoc2hvdWxkSW50ZXJwb2xhdGUgJiYgIWludGVycG9sYXRlZEFzLnJlc3VsdCkpIHtcbiAgICAgICAgY29uc3QgbWlzc2luZ1BhcmFtcyA9IE9iamVjdC5rZXlzKHJvdXRlUmVnZXguZ3JvdXBzKS5maWx0ZXIoXG4gICAgICAgICAgKHBhcmFtKSA9PiAhcXVlcnlbcGFyYW1dXG4gICAgICAgIClcblxuICAgICAgICBpZiAobWlzc2luZ1BhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgYCR7XG4gICAgICAgICAgICAgICAgc2hvdWxkSW50ZXJwb2xhdGVcbiAgICAgICAgICAgICAgICAgID8gYEludGVycG9sYXRpbmcgaHJlZmBcbiAgICAgICAgICAgICAgICAgIDogYE1pc21hdGNoaW5nIFxcYGFzXFxgIGFuZCBcXGBocmVmXFxgYFxuICAgICAgICAgICAgICB9IGZhaWxlZCB0byBtYW51YWxseSBwcm92aWRlIGAgK1xuICAgICAgICAgICAgICAgIGB0aGUgcGFyYW1zOiAke21pc3NpbmdQYXJhbXMuam9pbihcbiAgICAgICAgICAgICAgICAgICcsICdcbiAgICAgICAgICAgICAgICApfSBpbiB0aGUgXFxgaHJlZlxcYCdzIFxcYHF1ZXJ5XFxgYFxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIChzaG91bGRJbnRlcnBvbGF0ZVxuICAgICAgICAgICAgICA/IGBUaGUgcHJvdmlkZWQgXFxgaHJlZlxcYCAoJHt1cmx9KSB2YWx1ZSBpcyBtaXNzaW5nIHF1ZXJ5IHZhbHVlcyAoJHttaXNzaW5nUGFyYW1zLmpvaW4oXG4gICAgICAgICAgICAgICAgICAnLCAnXG4gICAgICAgICAgICAgICAgKX0pIHRvIGJlIGludGVycG9sYXRlZCBwcm9wZXJseS4gYFxuICAgICAgICAgICAgICA6IGBUaGUgcHJvdmlkZWQgXFxgYXNcXGAgdmFsdWUgKCR7YXNQYXRobmFtZX0pIGlzIGluY29tcGF0aWJsZSB3aXRoIHRoZSBcXGBocmVmXFxgIHZhbHVlICgke3JvdXRlfSkuIGApICtcbiAgICAgICAgICAgICAgYFJlYWQgbW9yZTogaHR0cHM6Ly9lcnIuc2gvdmVyY2VsL25leHQuanMvJHtcbiAgICAgICAgICAgICAgICBzaG91bGRJbnRlcnBvbGF0ZVxuICAgICAgICAgICAgICAgICAgPyAnaHJlZi1pbnRlcnBvbGF0aW9uLWZhaWxlZCdcbiAgICAgICAgICAgICAgICAgIDogJ2luY29tcGF0aWJsZS1ocmVmLWFzJ1xuICAgICAgICAgICAgICB9YFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzaG91bGRJbnRlcnBvbGF0ZSkge1xuICAgICAgICBhcyA9IGZvcm1hdFdpdGhWYWxpZGF0aW9uKFxuICAgICAgICAgIE9iamVjdC5hc3NpZ24oe30sIHBhcnNlZEFzLCB7XG4gICAgICAgICAgICBwYXRobmFtZTogaW50ZXJwb2xhdGVkQXMucmVzdWx0LFxuICAgICAgICAgICAgcXVlcnk6IG9taXRQYXJtc0Zyb21RdWVyeShxdWVyeSwgaW50ZXJwb2xhdGVkQXMucGFyYW1zISksXG4gICAgICAgICAgfSlcbiAgICAgICAgKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTWVyZ2UgcGFyYW1zIGludG8gYHF1ZXJ5YCwgb3ZlcndyaXRpbmcgYW55IHNwZWNpZmllZCBpbiBzZWFyY2hcbiAgICAgICAgT2JqZWN0LmFzc2lnbihxdWVyeSwgcm91dGVNYXRjaClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlU3RhcnQnLCBhcywgcm91dGVQcm9wcylcblxuICAgIHRyeSB7XG4gICAgICBsZXQgcm91dGVJbmZvID0gYXdhaXQgdGhpcy5nZXRSb3V0ZUluZm8oXG4gICAgICAgIHJvdXRlLFxuICAgICAgICBwYXRobmFtZSxcbiAgICAgICAgcXVlcnksXG4gICAgICAgIGFzLFxuICAgICAgICByZXNvbHZlZEFzLFxuICAgICAgICByb3V0ZVByb3BzXG4gICAgICApXG4gICAgICBsZXQgeyBlcnJvciwgcHJvcHMsIF9fTl9TU0csIF9fTl9TU1AgfSA9IHJvdXRlSW5mb1xuXG4gICAgICAvLyBoYW5kbGUgcmVkaXJlY3Qgb24gY2xpZW50LXRyYW5zaXRpb25cbiAgICAgIGlmICgoX19OX1NTRyB8fCBfX05fU1NQKSAmJiBwcm9wcykge1xuICAgICAgICBpZiAoKHByb3BzIGFzIGFueSkucGFnZVByb3BzICYmIChwcm9wcyBhcyBhbnkpLnBhZ2VQcm9wcy5fX05fUkVESVJFQ1QpIHtcbiAgICAgICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IChwcm9wcyBhcyBhbnkpLnBhZ2VQcm9wcy5fX05fUkVESVJFQ1RcblxuICAgICAgICAgIC8vIGNoZWNrIGlmIGRlc3RpbmF0aW9uIGlzIGludGVybmFsIChyZXNvbHZlcyB0byBhIHBhZ2UpIGFuZCBhdHRlbXB0XG4gICAgICAgICAgLy8gY2xpZW50LW5hdmlnYXRpb24gaWYgaXQgaXMgZmFsbGluZyBiYWNrIHRvIGhhcmQgbmF2aWdhdGlvbiBpZlxuICAgICAgICAgIC8vIGl0J3Mgbm90XG4gICAgICAgICAgaWYgKGRlc3RpbmF0aW9uLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkSHJlZiA9IHBhcnNlUmVsYXRpdmVVcmwoZGVzdGluYXRpb24pXG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlSHJlZihwYXJzZWRIcmVmLCBwYWdlcywgZmFsc2UpXG5cbiAgICAgICAgICAgIGlmIChwYWdlcy5pbmNsdWRlcyhwYXJzZWRIcmVmLnBhdGhuYW1lKSkge1xuICAgICAgICAgICAgICBjb25zdCB7IHVybDogbmV3VXJsLCBhczogbmV3QXMgfSA9IHByZXBhcmVVcmxBcyhcbiAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uLFxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlKG1ldGhvZCwgbmV3VXJsLCBuZXdBcywgb3B0aW9ucylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGRlc3RpbmF0aW9uXG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgpID0+IHt9KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaGFuZGxlIFNTRyBkYXRhIDQwNFxuICAgICAgICBpZiAocHJvcHMubm90Rm91bmQgPT09IFNTR19EQVRBX05PVF9GT1VORCkge1xuICAgICAgICAgIGxldCBub3RGb3VuZFJvdXRlXG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5mZXRjaENvbXBvbmVudCgnLzQwNCcpXG4gICAgICAgICAgICBub3RGb3VuZFJvdXRlID0gJy80MDQnXG4gICAgICAgICAgfSBjYXRjaCAoXykge1xuICAgICAgICAgICAgbm90Rm91bmRSb3V0ZSA9ICcvX2Vycm9yJ1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJvdXRlSW5mbyA9IGF3YWl0IHRoaXMuZ2V0Um91dGVJbmZvKFxuICAgICAgICAgICAgbm90Rm91bmRSb3V0ZSxcbiAgICAgICAgICAgIG5vdEZvdW5kUm91dGUsXG4gICAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICAgIGFzLFxuICAgICAgICAgICAgcmVzb2x2ZWRBcyxcbiAgICAgICAgICAgIHsgc2hhbGxvdzogZmFsc2UgfVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ2JlZm9yZUhpc3RvcnlDaGFuZ2UnLCBhcywgcm91dGVQcm9wcylcbiAgICAgIHRoaXMuY2hhbmdlU3RhdGUobWV0aG9kLCB1cmwsIGFzLCBvcHRpb25zKVxuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBjb25zdCBhcHBDb21wOiBhbnkgPSB0aGlzLmNvbXBvbmVudHNbJy9fYXBwJ10uQ29tcG9uZW50XG4gICAgICAgIDsod2luZG93IGFzIGFueSkubmV4dC5pc1ByZXJlbmRlcmVkID1cbiAgICAgICAgICBhcHBDb21wLmdldEluaXRpYWxQcm9wcyA9PT0gYXBwQ29tcC5vcmlnR2V0SW5pdGlhbFByb3BzICYmXG4gICAgICAgICAgIShyb3V0ZUluZm8uQ29tcG9uZW50IGFzIGFueSkuZ2V0SW5pdGlhbFByb3BzXG4gICAgICB9XG5cbiAgICAgIC8vIHNoYWxsb3cgcm91dGluZyBpcyBvbmx5IGFsbG93ZWQgZm9yIHNhbWUgcGFnZSBVUkwgY2hhbmdlcy5cbiAgICAgIGNvbnN0IGlzVmFsaWRTaGFsbG93Um91dGUgPSBvcHRpb25zLnNoYWxsb3cgJiYgdGhpcy5yb3V0ZSA9PT0gcm91dGVcbiAgICAgIGF3YWl0IHRoaXMuc2V0KFxuICAgICAgICByb3V0ZSxcbiAgICAgICAgcGF0aG5hbWUhLFxuICAgICAgICBxdWVyeSxcbiAgICAgICAgY2xlYW5lZEFzLFxuICAgICAgICByb3V0ZUluZm8sXG4gICAgICAgIGZvcmNlZFNjcm9sbCB8fFxuICAgICAgICAgIChpc1ZhbGlkU2hhbGxvd1JvdXRlIHx8ICFvcHRpb25zLnNjcm9sbCA/IG51bGwgOiB7IHg6IDAsIHk6IDAgfSlcbiAgICAgICkuY2F0Y2goKGUpID0+IHtcbiAgICAgICAgaWYgKGUuY2FuY2VsbGVkKSBlcnJvciA9IGVycm9yIHx8IGVcbiAgICAgICAgZWxzZSB0aHJvdyBlXG4gICAgICB9KVxuXG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgUm91dGVyLmV2ZW50cy5lbWl0KCdyb3V0ZUNoYW5nZUVycm9yJywgZXJyb3IsIGNsZWFuZWRBcywgcm91dGVQcm9wcylcbiAgICAgICAgdGhyb3cgZXJyb3JcbiAgICAgIH1cblxuICAgICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgICAgaWYgKHRoaXMubG9jYWxlKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmxhbmcgPSB0aGlzLmxvY2FsZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlQ29tcGxldGUnLCBhcywgcm91dGVQcm9wcylcblxuICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIuY2FuY2VsbGVkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgICAgdGhyb3cgZXJyXG4gICAgfVxuICB9XG5cbiAgY2hhbmdlU3RhdGUoXG4gICAgbWV0aG9kOiBIaXN0b3J5TWV0aG9kLFxuICAgIHVybDogc3RyaW5nLFxuICAgIGFzOiBzdHJpbmcsXG4gICAgb3B0aW9uczogVHJhbnNpdGlvbk9wdGlvbnMgPSB7fVxuICApOiB2b2lkIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuaGlzdG9yeSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgV2FybmluZzogd2luZG93Lmhpc3RvcnkgaXMgbm90IGF2YWlsYWJsZS5gKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB3aW5kb3cuaGlzdG9yeVttZXRob2RdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBXYXJuaW5nOiB3aW5kb3cuaGlzdG9yeS4ke21ldGhvZH0gaXMgbm90IGF2YWlsYWJsZWApXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtZXRob2QgIT09ICdwdXNoU3RhdGUnIHx8IGdldFVSTCgpICE9PSBhcykge1xuICAgICAgdGhpcy5fc2hhbGxvdyA9IG9wdGlvbnMuc2hhbGxvd1xuICAgICAgd2luZG93Lmhpc3RvcnlbbWV0aG9kXShcbiAgICAgICAge1xuICAgICAgICAgIHVybCxcbiAgICAgICAgICBhcyxcbiAgICAgICAgICBvcHRpb25zLFxuICAgICAgICAgIF9fTjogdHJ1ZSxcbiAgICAgICAgICBpZHg6IHRoaXMuX2lkeCA9IG1ldGhvZCAhPT0gJ3B1c2hTdGF0ZScgPyB0aGlzLl9pZHggOiB0aGlzLl9pZHggKyAxLFxuICAgICAgICB9IGFzIEhpc3RvcnlTdGF0ZSxcbiAgICAgICAgLy8gTW9zdCBicm93c2VycyBjdXJyZW50bHkgaWdub3JlcyB0aGlzIHBhcmFtZXRlciwgYWx0aG91Z2ggdGhleSBtYXkgdXNlIGl0IGluIHRoZSBmdXR1cmUuXG4gICAgICAgIC8vIFBhc3NpbmcgdGhlIGVtcHR5IHN0cmluZyBoZXJlIHNob3VsZCBiZSBzYWZlIGFnYWluc3QgZnV0dXJlIGNoYW5nZXMgdG8gdGhlIG1ldGhvZC5cbiAgICAgICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hpc3RvcnkvcmVwbGFjZVN0YXRlXG4gICAgICAgICcnLFxuICAgICAgICBhc1xuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGhhbmRsZVJvdXRlSW5mb0Vycm9yKFxuICAgIGVycjogRXJyb3IgJiB7IGNvZGU6IGFueTsgY2FuY2VsbGVkOiBib29sZWFuIH0sXG4gICAgcGF0aG5hbWU6IHN0cmluZyxcbiAgICBxdWVyeTogUGFyc2VkVXJsUXVlcnksXG4gICAgYXM6IHN0cmluZyxcbiAgICByb3V0ZVByb3BzOiBSb3V0ZVByb3BlcnRpZXMsXG4gICAgbG9hZEVycm9yRmFpbD86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTxDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8+IHtcbiAgICBpZiAoZXJyLmNhbmNlbGxlZCkge1xuICAgICAgLy8gYnViYmxlIHVwIGNhbmNlbGxhdGlvbiBlcnJvcnNcbiAgICAgIHRocm93IGVyclxuICAgIH1cblxuICAgIGlmIChpc0Fzc2V0RXJyb3IoZXJyKSB8fCBsb2FkRXJyb3JGYWlsKSB7XG4gICAgICBSb3V0ZXIuZXZlbnRzLmVtaXQoJ3JvdXRlQ2hhbmdlRXJyb3InLCBlcnIsIGFzLCByb3V0ZVByb3BzKVxuXG4gICAgICAvLyBJZiB3ZSBjYW4ndCBsb2FkIHRoZSBwYWdlIGl0IGNvdWxkIGJlIG9uZSBvZiBmb2xsb3dpbmcgcmVhc29uc1xuICAgICAgLy8gIDEuIFBhZ2UgZG9lc24ndCBleGlzdHNcbiAgICAgIC8vICAyLiBQYWdlIGRvZXMgZXhpc3QgaW4gYSBkaWZmZXJlbnQgem9uZVxuICAgICAgLy8gIDMuIEludGVybmFsIGVycm9yIHdoaWxlIGxvYWRpbmcgdGhlIHBhZ2VcblxuICAgICAgLy8gU28sIGRvaW5nIGEgaGFyZCByZWxvYWQgaXMgdGhlIHByb3BlciB3YXkgdG8gZGVhbCB3aXRoIHRoaXMuXG4gICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGFzXG5cbiAgICAgIC8vIENoYW5naW5nIHRoZSBVUkwgZG9lc24ndCBibG9jayBleGVjdXRpbmcgdGhlIGN1cnJlbnQgY29kZSBwYXRoLlxuICAgICAgLy8gU28gbGV0J3MgdGhyb3cgYSBjYW5jZWxsYXRpb24gZXJyb3Igc3RvcCB0aGUgcm91dGluZyBsb2dpYy5cbiAgICAgIHRocm93IGJ1aWxkQ2FuY2VsbGF0aW9uRXJyb3IoKVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBsZXQgQ29tcG9uZW50OiBDb21wb25lbnRUeXBlXG4gICAgICBsZXQgc3R5bGVTaGVldHM6IFN0eWxlU2hlZXRUdXBsZVtdXG4gICAgICBsZXQgcHJvcHM6IFJlY29yZDxzdHJpbmcsIGFueT4gfCB1bmRlZmluZWRcblxuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgQ29tcG9uZW50ISA9PT0gJ3VuZGVmaW5lZCcgfHxcbiAgICAgICAgdHlwZW9mIHN0eWxlU2hlZXRzISA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICkge1xuICAgICAgICA7KHsgcGFnZTogQ29tcG9uZW50LCBzdHlsZVNoZWV0cyB9ID0gYXdhaXQgdGhpcy5mZXRjaENvbXBvbmVudChcbiAgICAgICAgICAnL19lcnJvcidcbiAgICAgICAgKSlcbiAgICAgIH1cblxuICAgICAgY29uc3Qgcm91dGVJbmZvOiBDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8gPSB7XG4gICAgICAgIHByb3BzLFxuICAgICAgICBDb21wb25lbnQsXG4gICAgICAgIHN0eWxlU2hlZXRzLFxuICAgICAgICBlcnIsXG4gICAgICAgIGVycm9yOiBlcnIsXG4gICAgICB9XG5cbiAgICAgIGlmICghcm91dGVJbmZvLnByb3BzKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcm91dGVJbmZvLnByb3BzID0gYXdhaXQgdGhpcy5nZXRJbml0aWFsUHJvcHMoQ29tcG9uZW50LCB7XG4gICAgICAgICAgICBlcnIsXG4gICAgICAgICAgICBwYXRobmFtZSxcbiAgICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgIH0gYXMgYW55KVxuICAgICAgICB9IGNhdGNoIChnaXBFcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbiBlcnJvciBwYWdlIGBnZXRJbml0aWFsUHJvcHNgOiAnLCBnaXBFcnIpXG4gICAgICAgICAgcm91dGVJbmZvLnByb3BzID0ge31cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcm91dGVJbmZvXG4gICAgfSBjYXRjaCAocm91dGVJbmZvRXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVSb3V0ZUluZm9FcnJvcihcbiAgICAgICAgcm91dGVJbmZvRXJyLFxuICAgICAgICBwYXRobmFtZSxcbiAgICAgICAgcXVlcnksXG4gICAgICAgIGFzLFxuICAgICAgICByb3V0ZVByb3BzLFxuICAgICAgICB0cnVlXG4gICAgICApXG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0Um91dGVJbmZvKFxuICAgIHJvdXRlOiBzdHJpbmcsXG4gICAgcGF0aG5hbWU6IHN0cmluZyxcbiAgICBxdWVyeTogYW55LFxuICAgIGFzOiBzdHJpbmcsXG4gICAgcmVzb2x2ZWRBczogc3RyaW5nLFxuICAgIHJvdXRlUHJvcHM6IFJvdXRlUHJvcGVydGllc1xuICApOiBQcm9taXNlPFByaXZhdGVSb3V0ZUluZm8+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZXhpc3RpbmdSb3V0ZUluZm86IFByaXZhdGVSb3V0ZUluZm8gfCB1bmRlZmluZWQgPSB0aGlzLmNvbXBvbmVudHNbXG4gICAgICAgIHJvdXRlXG4gICAgICBdXG4gICAgICBpZiAocm91dGVQcm9wcy5zaGFsbG93ICYmIGV4aXN0aW5nUm91dGVJbmZvICYmIHRoaXMucm91dGUgPT09IHJvdXRlKSB7XG4gICAgICAgIHJldHVybiBleGlzdGluZ1JvdXRlSW5mb1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjYWNoZWRSb3V0ZUluZm86IENvbXBsZXRlUHJpdmF0ZVJvdXRlSW5mbyB8IHVuZGVmaW5lZCA9XG4gICAgICAgIGV4aXN0aW5nUm91dGVJbmZvICYmICdpbml0aWFsJyBpbiBleGlzdGluZ1JvdXRlSW5mb1xuICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgOiBleGlzdGluZ1JvdXRlSW5mb1xuICAgICAgY29uc3Qgcm91dGVJbmZvOiBDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8gPSBjYWNoZWRSb3V0ZUluZm9cbiAgICAgICAgPyBjYWNoZWRSb3V0ZUluZm9cbiAgICAgICAgOiBhd2FpdCB0aGlzLmZldGNoQ29tcG9uZW50KHJvdXRlKS50aGVuKChyZXMpID0+ICh7XG4gICAgICAgICAgICBDb21wb25lbnQ6IHJlcy5wYWdlLFxuICAgICAgICAgICAgc3R5bGVTaGVldHM6IHJlcy5zdHlsZVNoZWV0cyxcbiAgICAgICAgICAgIF9fTl9TU0c6IHJlcy5tb2QuX19OX1NTRyxcbiAgICAgICAgICAgIF9fTl9TU1A6IHJlcy5tb2QuX19OX1NTUCxcbiAgICAgICAgICB9KSlcblxuICAgICAgY29uc3QgeyBDb21wb25lbnQsIF9fTl9TU0csIF9fTl9TU1AgfSA9IHJvdXRlSW5mb1xuXG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBjb25zdCB7IGlzVmFsaWRFbGVtZW50VHlwZSB9ID0gcmVxdWlyZSgncmVhY3QtaXMnKVxuICAgICAgICBpZiAoIWlzVmFsaWRFbGVtZW50VHlwZShDb21wb25lbnQpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYFRoZSBkZWZhdWx0IGV4cG9ydCBpcyBub3QgYSBSZWFjdCBDb21wb25lbnQgaW4gcGFnZTogXCIke3BhdGhuYW1lfVwiYFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgZGF0YUhyZWY6IHN0cmluZyB8IHVuZGVmaW5lZFxuXG4gICAgICBpZiAoX19OX1NTRyB8fCBfX05fU1NQKSB7XG4gICAgICAgIGRhdGFIcmVmID0gdGhpcy5wYWdlTG9hZGVyLmdldERhdGFIcmVmKFxuICAgICAgICAgIGZvcm1hdFdpdGhWYWxpZGF0aW9uKHsgcGF0aG5hbWUsIHF1ZXJ5IH0pLFxuICAgICAgICAgIHJlc29sdmVkQXMsXG4gICAgICAgICAgX19OX1NTRyxcbiAgICAgICAgICB0aGlzLmxvY2FsZVxuICAgICAgICApXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3BzID0gYXdhaXQgdGhpcy5fZ2V0RGF0YTxDb21wbGV0ZVByaXZhdGVSb3V0ZUluZm8+KCgpID0+XG4gICAgICAgIF9fTl9TU0dcbiAgICAgICAgICA/IHRoaXMuX2dldFN0YXRpY0RhdGEoZGF0YUhyZWYhKVxuICAgICAgICAgIDogX19OX1NTUFxuICAgICAgICAgID8gdGhpcy5fZ2V0U2VydmVyRGF0YShkYXRhSHJlZiEpXG4gICAgICAgICAgOiB0aGlzLmdldEluaXRpYWxQcm9wcyhcbiAgICAgICAgICAgICAgQ29tcG9uZW50LFxuICAgICAgICAgICAgICAvLyB3ZSBwcm92aWRlIEFwcFRyZWUgbGF0ZXIgc28gdGhpcyBuZWVkcyB0byBiZSBgYW55YFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcGF0aG5hbWUsXG4gICAgICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICAgICAgYXNQYXRoOiBhcyxcbiAgICAgICAgICAgICAgfSBhcyBhbnlcbiAgICAgICAgICAgIClcbiAgICAgIClcblxuICAgICAgcm91dGVJbmZvLnByb3BzID0gcHJvcHNcbiAgICAgIHRoaXMuY29tcG9uZW50c1tyb3V0ZV0gPSByb3V0ZUluZm9cbiAgICAgIHJldHVybiByb3V0ZUluZm9cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJvdXRlSW5mb0Vycm9yKGVyciwgcGF0aG5hbWUsIHF1ZXJ5LCBhcywgcm91dGVQcm9wcylcbiAgICB9XG4gIH1cblxuICBzZXQoXG4gICAgcm91dGU6IHN0cmluZyxcbiAgICBwYXRobmFtZTogc3RyaW5nLFxuICAgIHF1ZXJ5OiBQYXJzZWRVcmxRdWVyeSxcbiAgICBhczogc3RyaW5nLFxuICAgIGRhdGE6IFByaXZhdGVSb3V0ZUluZm8sXG4gICAgcmVzZXRTY3JvbGw6IHsgeDogbnVtYmVyOyB5OiBudW1iZXIgfSB8IG51bGxcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5pc0ZhbGxiYWNrID0gZmFsc2VcblxuICAgIHRoaXMucm91dGUgPSByb3V0ZVxuICAgIHRoaXMucGF0aG5hbWUgPSBwYXRobmFtZVxuICAgIHRoaXMucXVlcnkgPSBxdWVyeVxuICAgIHRoaXMuYXNQYXRoID0gYXNcbiAgICByZXR1cm4gdGhpcy5ub3RpZnkoZGF0YSwgcmVzZXRTY3JvbGwpXG4gIH1cblxuICAvKipcbiAgICogQ2FsbGJhY2sgdG8gZXhlY3V0ZSBiZWZvcmUgcmVwbGFjaW5nIHJvdXRlciBzdGF0ZVxuICAgKiBAcGFyYW0gY2IgY2FsbGJhY2sgdG8gYmUgZXhlY3V0ZWRcbiAgICovXG4gIGJlZm9yZVBvcFN0YXRlKGNiOiBCZWZvcmVQb3BTdGF0ZUNhbGxiYWNrKSB7XG4gICAgdGhpcy5fYnBzID0gY2JcbiAgfVxuXG4gIG9ubHlBSGFzaENoYW5nZShhczogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKCF0aGlzLmFzUGF0aCkgcmV0dXJuIGZhbHNlXG4gICAgY29uc3QgW29sZFVybE5vSGFzaCwgb2xkSGFzaF0gPSB0aGlzLmFzUGF0aC5zcGxpdCgnIycpXG4gICAgY29uc3QgW25ld1VybE5vSGFzaCwgbmV3SGFzaF0gPSBhcy5zcGxpdCgnIycpXG5cbiAgICAvLyBNYWtlcyBzdXJlIHdlIHNjcm9sbCB0byB0aGUgcHJvdmlkZWQgaGFzaCBpZiB0aGUgdXJsL2hhc2ggYXJlIHRoZSBzYW1lXG4gICAgaWYgKG5ld0hhc2ggJiYgb2xkVXJsTm9IYXNoID09PSBuZXdVcmxOb0hhc2ggJiYgb2xkSGFzaCA9PT0gbmV3SGFzaCkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgdXJscyBhcmUgY2hhbmdlLCB0aGVyZSdzIG1vcmUgdGhhbiBhIGhhc2ggY2hhbmdlXG4gICAgaWYgKG9sZFVybE5vSGFzaCAhPT0gbmV3VXJsTm9IYXNoKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgaGFzaCBoYXMgY2hhbmdlZCwgdGhlbiBpdCdzIGEgaGFzaCBvbmx5IGNoYW5nZS5cbiAgICAvLyBUaGlzIGNoZWNrIGlzIG5lY2Vzc2FyeSB0byBoYW5kbGUgYm90aCB0aGUgZW50ZXIgYW5kXG4gICAgLy8gbGVhdmUgaGFzaCA9PT0gJycgY2FzZXMuIFRoZSBpZGVudGl0eSBjYXNlIGZhbGxzIHRocm91Z2hcbiAgICAvLyBhbmQgaXMgdHJlYXRlZCBhcyBhIG5leHQgcmVsb2FkLlxuICAgIHJldHVybiBvbGRIYXNoICE9PSBuZXdIYXNoXG4gIH1cblxuICBzY3JvbGxUb0hhc2goYXM6IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IFssIGhhc2hdID0gYXMuc3BsaXQoJyMnKVxuICAgIC8vIFNjcm9sbCB0byB0b3AgaWYgdGhlIGhhc2ggaXMganVzdCBgI2Agd2l0aCBubyB2YWx1ZSBvciBgI3RvcGBcbiAgICAvLyBUbyBtaXJyb3IgYnJvd3NlcnNcbiAgICBpZiAoaGFzaCA9PT0gJycgfHwgaGFzaCA9PT0gJ3RvcCcpIHtcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gRmlyc3Qgd2UgY2hlY2sgaWYgdGhlIGVsZW1lbnQgYnkgaWQgaXMgZm91bmRcbiAgICBjb25zdCBpZEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaClcbiAgICBpZiAoaWRFbCkge1xuICAgICAgaWRFbC5zY3JvbGxJbnRvVmlldygpXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgLy8gSWYgdGhlcmUncyBubyBlbGVtZW50IHdpdGggdGhlIGlkLCB3ZSBjaGVjayB0aGUgYG5hbWVgIHByb3BlcnR5XG4gICAgLy8gVG8gbWlycm9yIGJyb3dzZXJzXG4gICAgY29uc3QgbmFtZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeU5hbWUoaGFzaClbMF1cbiAgICBpZiAobmFtZUVsKSB7XG4gICAgICBuYW1lRWwuc2Nyb2xsSW50b1ZpZXcoKVxuICAgIH1cbiAgfVxuXG4gIHVybElzTmV3KGFzUGF0aDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYXNQYXRoICE9PSBhc1BhdGhcbiAgfVxuXG4gIF9yZXNvbHZlSHJlZihwYXJzZWRIcmVmOiBVcmxPYmplY3QsIHBhZ2VzOiBzdHJpbmdbXSwgYXBwbHlCYXNlUGF0aCA9IHRydWUpIHtcbiAgICBjb25zdCB7IHBhdGhuYW1lIH0gPSBwYXJzZWRIcmVmXG4gICAgY29uc3QgY2xlYW5QYXRobmFtZSA9IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKFxuICAgICAgZGVub3JtYWxpemVQYWdlUGF0aChhcHBseUJhc2VQYXRoID8gZGVsQmFzZVBhdGgocGF0aG5hbWUhKSA6IHBhdGhuYW1lISlcbiAgICApXG5cbiAgICBpZiAoY2xlYW5QYXRobmFtZSA9PT0gJy80MDQnIHx8IGNsZWFuUGF0aG5hbWUgPT09ICcvX2Vycm9yJykge1xuICAgICAgcmV0dXJuIHBhcnNlZEhyZWZcbiAgICB9XG5cbiAgICAvLyBoYW5kbGUgcmVzb2x2aW5nIGhyZWYgZm9yIGR5bmFtaWMgcm91dGVzXG4gICAgaWYgKCFwYWdlcy5pbmNsdWRlcyhjbGVhblBhdGhuYW1lISkpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBhcnJheS1jYWxsYmFjay1yZXR1cm5cbiAgICAgIHBhZ2VzLnNvbWUoKHBhZ2UpID0+IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGlzRHluYW1pY1JvdXRlKHBhZ2UpICYmXG4gICAgICAgICAgZ2V0Um91dGVSZWdleChwYWdlKS5yZS50ZXN0KGNsZWFuUGF0aG5hbWUhKVxuICAgICAgICApIHtcbiAgICAgICAgICBwYXJzZWRIcmVmLnBhdGhuYW1lID0gYXBwbHlCYXNlUGF0aCA/IGFkZEJhc2VQYXRoKHBhZ2UpIDogcGFnZVxuICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHBhcnNlZEhyZWYucGF0aG5hbWUgPSByZW1vdmVQYXRoVHJhaWxpbmdTbGFzaChwYXJzZWRIcmVmLnBhdGhuYW1lISlcbiAgICByZXR1cm4gcGFyc2VkSHJlZlxuICB9XG5cbiAgLyoqXG4gICAqIFByZWZldGNoIHBhZ2UgY29kZSwgeW91IG1heSB3YWl0IGZvciB0aGUgZGF0YSBkdXJpbmcgcGFnZSByZW5kZXJpbmcuXG4gICAqIFRoaXMgZmVhdHVyZSBvbmx5IHdvcmtzIGluIHByb2R1Y3Rpb24hXG4gICAqIEBwYXJhbSB1cmwgdGhlIGhyZWYgb2YgcHJlZmV0Y2hlZCBwYWdlXG4gICAqIEBwYXJhbSBhc1BhdGggdGhlIGFzIHBhdGggb2YgdGhlIHByZWZldGNoZWQgcGFnZVxuICAgKi9cbiAgYXN5bmMgcHJlZmV0Y2goXG4gICAgdXJsOiBzdHJpbmcsXG4gICAgYXNQYXRoOiBzdHJpbmcgPSB1cmwsXG4gICAgb3B0aW9uczogUHJlZmV0Y2hPcHRpb25zID0ge31cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHBhcnNlZCA9IHBhcnNlUmVsYXRpdmVVcmwodXJsKVxuXG4gICAgbGV0IHsgcGF0aG5hbWUgfSA9IHBhcnNlZFxuXG4gICAgaWYgKHByb2Nlc3MuZW52Ll9fTkVYVF9JMThOX1NVUFBPUlQpIHtcbiAgICAgIGlmIChvcHRpb25zLmxvY2FsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcGF0aG5hbWUgPSBub3JtYWxpemVMb2NhbGVQYXRoIShwYXRobmFtZSwgdGhpcy5sb2NhbGVzKS5wYXRobmFtZVxuICAgICAgICBwYXJzZWQucGF0aG5hbWUgPSBwYXRobmFtZVxuICAgICAgICB1cmwgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpXG5cbiAgICAgICAgbGV0IHBhcnNlZEFzID0gcGFyc2VSZWxhdGl2ZVVybChhc1BhdGgpXG4gICAgICAgIGNvbnN0IGxvY2FsZVBhdGhSZXN1bHQgPSBub3JtYWxpemVMb2NhbGVQYXRoIShcbiAgICAgICAgICBwYXJzZWRBcy5wYXRobmFtZSxcbiAgICAgICAgICB0aGlzLmxvY2FsZXNcbiAgICAgICAgKVxuICAgICAgICBwYXJzZWRBcy5wYXRobmFtZSA9IGxvY2FsZVBhdGhSZXN1bHQucGF0aG5hbWVcbiAgICAgICAgb3B0aW9ucy5sb2NhbGUgPSBsb2NhbGVQYXRoUmVzdWx0LmRldGVjdGVkTG9jYWxlIHx8IHRoaXMuZGVmYXVsdExvY2FsZVxuICAgICAgICBhc1BhdGggPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWRBcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBwYWdlcyA9IGF3YWl0IHRoaXMucGFnZUxvYWRlci5nZXRQYWdlTGlzdCgpXG5cbiAgICBwYXJzZWQgPSB0aGlzLl9yZXNvbHZlSHJlZihwYXJzZWQsIHBhZ2VzLCBmYWxzZSkgYXMgdHlwZW9mIHBhcnNlZFxuXG4gICAgaWYgKHBhcnNlZC5wYXRobmFtZSAhPT0gcGF0aG5hbWUpIHtcbiAgICAgIHBhdGhuYW1lID0gcGFyc2VkLnBhdGhuYW1lXG4gICAgICB1cmwgPSBmb3JtYXRXaXRoVmFsaWRhdGlvbihwYXJzZWQpXG4gICAgfVxuXG4gICAgLy8gUHJlZmV0Y2ggaXMgbm90IHN1cHBvcnRlZCBpbiBkZXZlbG9wbWVudCBtb2RlIGJlY2F1c2UgaXQgd291bGQgdHJpZ2dlciBvbi1kZW1hbmQtZW50cmllc1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCByb3V0ZSA9IHJlbW92ZVBhdGhUcmFpbGluZ1NsYXNoKHBhdGhuYW1lKVxuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHRoaXMucGFnZUxvYWRlci5faXNTc2codXJsKS50aGVuKChpc1NzZzogYm9vbGVhbikgPT4ge1xuICAgICAgICByZXR1cm4gaXNTc2dcbiAgICAgICAgICA/IHRoaXMuX2dldFN0YXRpY0RhdGEoXG4gICAgICAgICAgICAgIHRoaXMucGFnZUxvYWRlci5nZXREYXRhSHJlZihcbiAgICAgICAgICAgICAgICB1cmwsXG4gICAgICAgICAgICAgICAgYXNQYXRoLFxuICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZW9mIG9wdGlvbnMubG9jYWxlICE9PSAndW5kZWZpbmVkJ1xuICAgICAgICAgICAgICAgICAgPyBvcHRpb25zLmxvY2FsZVxuICAgICAgICAgICAgICAgICAgOiB0aGlzLmxvY2FsZVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiBmYWxzZVxuICAgICAgfSksXG4gICAgICB0aGlzLnBhZ2VMb2FkZXJbb3B0aW9ucy5wcmlvcml0eSA/ICdsb2FkUGFnZScgOiAncHJlZmV0Y2gnXShyb3V0ZSksXG4gICAgXSlcbiAgfVxuXG4gIGFzeW5jIGZldGNoQ29tcG9uZW50KHJvdXRlOiBzdHJpbmcpOiBQcm9taXNlPEdvb2RQYWdlQ2FjaGU+IHtcbiAgICBsZXQgY2FuY2VsbGVkID0gZmFsc2VcbiAgICBjb25zdCBjYW5jZWwgPSAodGhpcy5jbGMgPSAoKSA9PiB7XG4gICAgICBjYW5jZWxsZWQgPSB0cnVlXG4gICAgfSlcblxuICAgIGNvbnN0IGNvbXBvbmVudFJlc3VsdCA9IGF3YWl0IHRoaXMucGFnZUxvYWRlci5sb2FkUGFnZShyb3V0ZSlcblxuICAgIGlmIChjYW5jZWxsZWQpIHtcbiAgICAgIGNvbnN0IGVycm9yOiBhbnkgPSBuZXcgRXJyb3IoXG4gICAgICAgIGBBYm9ydCBmZXRjaGluZyBjb21wb25lbnQgZm9yIHJvdXRlOiBcIiR7cm91dGV9XCJgXG4gICAgICApXG4gICAgICBlcnJvci5jYW5jZWxsZWQgPSB0cnVlXG4gICAgICB0aHJvdyBlcnJvclxuICAgIH1cblxuICAgIGlmIChjYW5jZWwgPT09IHRoaXMuY2xjKSB7XG4gICAgICB0aGlzLmNsYyA9IG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gY29tcG9uZW50UmVzdWx0XG4gIH1cblxuICBfZ2V0RGF0YTxUPihmbjogKCkgPT4gUHJvbWlzZTxUPik6IFByb21pc2U8VD4ge1xuICAgIGxldCBjYW5jZWxsZWQgPSBmYWxzZVxuICAgIGNvbnN0IGNhbmNlbCA9ICgpID0+IHtcbiAgICAgIGNhbmNlbGxlZCA9IHRydWVcbiAgICB9XG4gICAgdGhpcy5jbGMgPSBjYW5jZWxcbiAgICByZXR1cm4gZm4oKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICBpZiAoY2FuY2VsID09PSB0aGlzLmNsYykge1xuICAgICAgICB0aGlzLmNsYyA9IG51bGxcbiAgICAgIH1cblxuICAgICAgaWYgKGNhbmNlbGxlZCkge1xuICAgICAgICBjb25zdCBlcnI6IGFueSA9IG5ldyBFcnJvcignTG9hZGluZyBpbml0aWFsIHByb3BzIGNhbmNlbGxlZCcpXG4gICAgICAgIGVyci5jYW5jZWxsZWQgPSB0cnVlXG4gICAgICAgIHRocm93IGVyclxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGF0YVxuICAgIH0pXG4gIH1cblxuICBfZ2V0U3RhdGljRGF0YShkYXRhSHJlZjogc3RyaW5nKTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgICBjb25zdCB7IGhyZWY6IGNhY2hlS2V5IH0gPSBuZXcgVVJMKGRhdGFIcmVmLCB3aW5kb3cubG9jYXRpb24uaHJlZilcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJyAmJiB0aGlzLnNkY1tjYWNoZUtleV0pIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5zZGNbY2FjaGVLZXldKVxuICAgIH1cbiAgICByZXR1cm4gZmV0Y2hOZXh0RGF0YShkYXRhSHJlZiwgdGhpcy5pc1NzcikudGhlbigoZGF0YSkgPT4ge1xuICAgICAgdGhpcy5zZGNbY2FjaGVLZXldID0gZGF0YVxuICAgICAgcmV0dXJuIGRhdGFcbiAgICB9KVxuICB9XG5cbiAgX2dldFNlcnZlckRhdGEoZGF0YUhyZWY6IHN0cmluZyk6IFByb21pc2U8b2JqZWN0PiB7XG4gICAgcmV0dXJuIGZldGNoTmV4dERhdGEoZGF0YUhyZWYsIHRoaXMuaXNTc3IpXG4gIH1cblxuICBnZXRJbml0aWFsUHJvcHMoXG4gICAgQ29tcG9uZW50OiBDb21wb25lbnRUeXBlLFxuICAgIGN0eDogTmV4dFBhZ2VDb250ZXh0XG4gICk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgeyBDb21wb25lbnQ6IEFwcCB9ID0gdGhpcy5jb21wb25lbnRzWycvX2FwcCddXG4gICAgY29uc3QgQXBwVHJlZSA9IHRoaXMuX3dyYXBBcHAoQXBwIGFzIEFwcENvbXBvbmVudClcbiAgICBjdHguQXBwVHJlZSA9IEFwcFRyZWVcbiAgICByZXR1cm4gbG9hZEdldEluaXRpYWxQcm9wczxBcHBDb250ZXh0VHlwZTxSb3V0ZXI+PihBcHAsIHtcbiAgICAgIEFwcFRyZWUsXG4gICAgICBDb21wb25lbnQsXG4gICAgICByb3V0ZXI6IHRoaXMsXG4gICAgICBjdHgsXG4gICAgfSlcbiAgfVxuXG4gIGFib3J0Q29tcG9uZW50TG9hZChhczogc3RyaW5nLCByb3V0ZVByb3BzOiBSb3V0ZVByb3BlcnRpZXMpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jbGMpIHtcbiAgICAgIFJvdXRlci5ldmVudHMuZW1pdChcbiAgICAgICAgJ3JvdXRlQ2hhbmdlRXJyb3InLFxuICAgICAgICBidWlsZENhbmNlbGxhdGlvbkVycm9yKCksXG4gICAgICAgIGFzLFxuICAgICAgICByb3V0ZVByb3BzXG4gICAgICApXG4gICAgICB0aGlzLmNsYygpXG4gICAgICB0aGlzLmNsYyA9IG51bGxcbiAgICB9XG4gIH1cblxuICBub3RpZnkoXG4gICAgZGF0YTogUHJpdmF0ZVJvdXRlSW5mbyxcbiAgICByZXNldFNjcm9sbDogeyB4OiBudW1iZXI7IHk6IG51bWJlciB9IHwgbnVsbFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5zdWIoXG4gICAgICBkYXRhLFxuICAgICAgdGhpcy5jb21wb25lbnRzWycvX2FwcCddLkNvbXBvbmVudCBhcyBBcHBDb21wb25lbnQsXG4gICAgICByZXNldFNjcm9sbFxuICAgIClcbiAgfVxufVxuIiwgImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IE5leHRSb3V0ZXIgfSBmcm9tICcuL3JvdXRlci9yb3V0ZXInXG5cbmV4cG9ydCBjb25zdCBSb3V0ZXJDb250ZXh0ID0gUmVhY3QuY3JlYXRlQ29udGV4dDxOZXh0Um91dGVyPihudWxsIGFzIGFueSlcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgUm91dGVyQ29udGV4dC5kaXNwbGF5TmFtZSA9ICdSb3V0ZXJDb250ZXh0J1xufVxuIiwgImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IE5leHRDb21wb25lbnRUeXBlLCBOZXh0UGFnZUNvbnRleHQgfSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvdXRpbHMnXG5pbXBvcnQgeyBOZXh0Um91dGVyLCB1c2VSb3V0ZXIgfSBmcm9tICcuL3JvdXRlcidcblxuZXhwb3J0IHR5cGUgV2l0aFJvdXRlclByb3BzID0ge1xuICByb3V0ZXI6IE5leHRSb3V0ZXJcbn1cblxuZXhwb3J0IHR5cGUgRXhjbHVkZVJvdXRlclByb3BzPFA+ID0gUGljazxcbiAgUCxcbiAgRXhjbHVkZTxrZXlvZiBQLCBrZXlvZiBXaXRoUm91dGVyUHJvcHM+XG4+XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHdpdGhSb3V0ZXI8XG4gIFAgZXh0ZW5kcyBXaXRoUm91dGVyUHJvcHMsXG4gIEMgPSBOZXh0UGFnZUNvbnRleHRcbj4oXG4gIENvbXBvc2VkQ29tcG9uZW50OiBOZXh0Q29tcG9uZW50VHlwZTxDLCBhbnksIFA+XG4pOiBSZWFjdC5Db21wb25lbnRUeXBlPEV4Y2x1ZGVSb3V0ZXJQcm9wczxQPj4ge1xuICBmdW5jdGlvbiBXaXRoUm91dGVyV3JhcHBlcihwcm9wczogYW55KTogSlNYLkVsZW1lbnQge1xuICAgIHJldHVybiA8Q29tcG9zZWRDb21wb25lbnQgcm91dGVyPXt1c2VSb3V0ZXIoKX0gey4uLnByb3BzfSAvPlxuICB9XG5cbiAgV2l0aFJvdXRlcldyYXBwZXIuZ2V0SW5pdGlhbFByb3BzID0gQ29tcG9zZWRDb21wb25lbnQuZ2V0SW5pdGlhbFByb3BzXG4gIC8vIFRoaXMgaXMgbmVlZGVkIHRvIGFsbG93IGNoZWNraW5nIGZvciBjdXN0b20gZ2V0SW5pdGlhbFByb3BzIGluIF9hcHBcbiAgOyhXaXRoUm91dGVyV3JhcHBlciBhcyBhbnkpLm9yaWdHZXRJbml0aWFsUHJvcHMgPSAoQ29tcG9zZWRDb21wb25lbnQgYXMgYW55KS5vcmlnR2V0SW5pdGlhbFByb3BzXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY29uc3QgbmFtZSA9XG4gICAgICBDb21wb3NlZENvbXBvbmVudC5kaXNwbGF5TmFtZSB8fCBDb21wb3NlZENvbXBvbmVudC5uYW1lIHx8ICdVbmtub3duJ1xuICAgIFdpdGhSb3V0ZXJXcmFwcGVyLmRpc3BsYXlOYW1lID0gYHdpdGhSb3V0ZXIoJHtuYW1lfSlgXG4gIH1cblxuICByZXR1cm4gV2l0aFJvdXRlcldyYXBwZXJcbn1cbiIsICIvKiBnbG9iYWwgd2luZG93ICovXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgUm91dGVyLCB7IE5leHRSb3V0ZXIgfSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3JvdXRlcidcbmltcG9ydCB7IFJvdXRlckNvbnRleHQgfSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyLWNvbnRleHQnXG5cbnR5cGUgQ2xhc3NBcmd1bWVudHM8VD4gPSBUIGV4dGVuZHMgbmV3ICguLi5hcmdzOiBpbmZlciBVKSA9PiBhbnkgPyBVIDogYW55XG5cbnR5cGUgUm91dGVyQXJncyA9IENsYXNzQXJndW1lbnRzPHR5cGVvZiBSb3V0ZXI+XG5cbnR5cGUgU2luZ2xldG9uUm91dGVyQmFzZSA9IHtcbiAgcm91dGVyOiBSb3V0ZXIgfCBudWxsXG4gIHJlYWR5Q2FsbGJhY2tzOiBBcnJheTwoKSA9PiBhbnk+XG4gIHJlYWR5KGNiOiAoKSA9PiBhbnkpOiB2b2lkXG59XG5cbmV4cG9ydCB7IFJvdXRlciwgTmV4dFJvdXRlciB9XG5cbmV4cG9ydCB0eXBlIFNpbmdsZXRvblJvdXRlciA9IFNpbmdsZXRvblJvdXRlckJhc2UgJiBOZXh0Um91dGVyXG5cbmNvbnN0IHNpbmdsZXRvblJvdXRlcjogU2luZ2xldG9uUm91dGVyQmFzZSA9IHtcbiAgcm91dGVyOiBudWxsLCAvLyBob2xkcyB0aGUgYWN0dWFsIHJvdXRlciBpbnN0YW5jZVxuICByZWFkeUNhbGxiYWNrczogW10sXG4gIHJlYWR5KGNiOiAoKSA9PiB2b2lkKSB7XG4gICAgaWYgKHRoaXMucm91dGVyKSByZXR1cm4gY2IoKVxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpcy5yZWFkeUNhbGxiYWNrcy5wdXNoKGNiKVxuICAgIH1cbiAgfSxcbn1cblxuLy8gQ3JlYXRlIHB1YmxpYyBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIG9mIHRoZSByb3V0ZXIgaW4gdGhlIHNpbmdsZXRvblJvdXRlclxuY29uc3QgdXJsUHJvcGVydHlGaWVsZHMgPSBbXG4gICdwYXRobmFtZScsXG4gICdyb3V0ZScsXG4gICdxdWVyeScsXG4gICdhc1BhdGgnLFxuICAnY29tcG9uZW50cycsXG4gICdpc0ZhbGxiYWNrJyxcbiAgJ2Jhc2VQYXRoJyxcbiAgJ2xvY2FsZScsXG4gICdsb2NhbGVzJyxcbiAgJ2RlZmF1bHRMb2NhbGUnLFxuICAnaXNSZWFkeScsXG4gICdpc0xvY2FsZURvbWFpbicsXG5dXG5jb25zdCByb3V0ZXJFdmVudHMgPSBbXG4gICdyb3V0ZUNoYW5nZVN0YXJ0JyxcbiAgJ2JlZm9yZUhpc3RvcnlDaGFuZ2UnLFxuICAncm91dGVDaGFuZ2VDb21wbGV0ZScsXG4gICdyb3V0ZUNoYW5nZUVycm9yJyxcbiAgJ2hhc2hDaGFuZ2VTdGFydCcsXG4gICdoYXNoQ2hhbmdlQ29tcGxldGUnLFxuXVxuY29uc3QgY29yZU1ldGhvZEZpZWxkcyA9IFtcbiAgJ3B1c2gnLFxuICAncmVwbGFjZScsXG4gICdyZWxvYWQnLFxuICAnYmFjaycsXG4gICdwcmVmZXRjaCcsXG4gICdiZWZvcmVQb3BTdGF0ZScsXG5dXG5cbi8vIEV2ZW50cyBpcyBhIHN0YXRpYyBwcm9wZXJ0eSBvbiB0aGUgcm91dGVyLCB0aGUgcm91dGVyIGRvZXNuJ3QgaGF2ZSB0byBiZSBpbml0aWFsaXplZCB0byB1c2UgaXRcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShzaW5nbGV0b25Sb3V0ZXIsICdldmVudHMnLCB7XG4gIGdldCgpIHtcbiAgICByZXR1cm4gUm91dGVyLmV2ZW50c1xuICB9LFxufSlcblxudXJsUHJvcGVydHlGaWVsZHMuZm9yRWFjaCgoZmllbGQ6IHN0cmluZykgPT4ge1xuICAvLyBIZXJlIHdlIG5lZWQgdG8gdXNlIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSBiZWNhdXNlLCB3ZSBuZWVkIHRvIHJldHVyblxuICAvLyB0aGUgcHJvcGVydHkgYXNzaWduZWQgdG8gdGhlIGFjdHVhbCByb3V0ZXJcbiAgLy8gVGhlIHZhbHVlIG1pZ2h0IGdldCBjaGFuZ2VkIGFzIHdlIGNoYW5nZSByb3V0ZXMgYW5kIHRoaXMgaXMgdGhlXG4gIC8vIHByb3BlciB3YXkgdG8gYWNjZXNzIGl0XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzaW5nbGV0b25Sb3V0ZXIsIGZpZWxkLCB7XG4gICAgZ2V0KCkge1xuICAgICAgY29uc3Qgcm91dGVyID0gZ2V0Um91dGVyKCkgYXMgYW55XG4gICAgICByZXR1cm4gcm91dGVyW2ZpZWxkXSBhcyBzdHJpbmdcbiAgICB9LFxuICB9KVxufSlcblxuY29yZU1ldGhvZEZpZWxkcy5mb3JFYWNoKChmaWVsZDogc3RyaW5nKSA9PiB7XG4gIC8vIFdlIGRvbid0IHJlYWxseSBrbm93IHRoZSB0eXBlcyBoZXJlLCBzbyB3ZSBhZGQgdGhlbSBsYXRlciBpbnN0ZWFkXG4gIDsoc2luZ2xldG9uUm91dGVyIGFzIGFueSlbZmllbGRdID0gKC4uLmFyZ3M6IGFueVtdKSA9PiB7XG4gICAgY29uc3Qgcm91dGVyID0gZ2V0Um91dGVyKCkgYXMgYW55XG4gICAgcmV0dXJuIHJvdXRlcltmaWVsZF0oLi4uYXJncylcbiAgfVxufSlcblxucm91dGVyRXZlbnRzLmZvckVhY2goKGV2ZW50OiBzdHJpbmcpID0+IHtcbiAgc2luZ2xldG9uUm91dGVyLnJlYWR5KCgpID0+IHtcbiAgICBSb3V0ZXIuZXZlbnRzLm9uKGV2ZW50LCAoLi4uYXJncykgPT4ge1xuICAgICAgY29uc3QgZXZlbnRGaWVsZCA9IGBvbiR7ZXZlbnQuY2hhckF0KDApLnRvVXBwZXJDYXNlKCl9JHtldmVudC5zdWJzdHJpbmcoXG4gICAgICAgIDFcbiAgICAgICl9YFxuICAgICAgY29uc3QgX3NpbmdsZXRvblJvdXRlciA9IHNpbmdsZXRvblJvdXRlciBhcyBhbnlcbiAgICAgIGlmIChfc2luZ2xldG9uUm91dGVyW2V2ZW50RmllbGRdKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgX3NpbmdsZXRvblJvdXRlcltldmVudEZpZWxkXSguLi5hcmdzKVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKGBFcnJvciB3aGVuIHJ1bm5pbmcgdGhlIFJvdXRlciBldmVudDogJHtldmVudEZpZWxkfWApXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgJHtlcnIubWVzc2FnZX1cXG4ke2Vyci5zdGFja31gKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgfSlcbn0pXG5cbmZ1bmN0aW9uIGdldFJvdXRlcigpOiBSb3V0ZXIge1xuICBpZiAoIXNpbmdsZXRvblJvdXRlci5yb3V0ZXIpIHtcbiAgICBjb25zdCBtZXNzYWdlID1cbiAgICAgICdObyByb3V0ZXIgaW5zdGFuY2UgZm91bmQuXFxuJyArXG4gICAgICAnWW91IHNob3VsZCBvbmx5IHVzZSBcIm5leHQvcm91dGVyXCIgaW5zaWRlIHRoZSBjbGllbnQgc2lkZSBvZiB5b3VyIGFwcC5cXG4nXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpXG4gIH1cbiAgcmV0dXJuIHNpbmdsZXRvblJvdXRlci5yb3V0ZXJcbn1cblxuLy8gRXhwb3J0IHRoZSBzaW5nbGV0b25Sb3V0ZXIgYW5kIHRoaXMgaXMgdGhlIHB1YmxpYyBBUEkuXG5leHBvcnQgZGVmYXVsdCBzaW5nbGV0b25Sb3V0ZXIgYXMgU2luZ2xldG9uUm91dGVyXG5cbi8vIFJlZXhwb3J0IHRoZSB3aXRoUm91dGUgSE9DXG5leHBvcnQgeyBkZWZhdWx0IGFzIHdpdGhSb3V0ZXIgfSBmcm9tICcuL3dpdGgtcm91dGVyJ1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlUm91dGVyKCk6IE5leHRSb3V0ZXIge1xuICByZXR1cm4gUmVhY3QudXNlQ29udGV4dChSb3V0ZXJDb250ZXh0KVxufVxuXG4vLyBJTlRFUk5BTCBBUElTXG4vLyAtLS0tLS0tLS0tLS0tXG4vLyAoZG8gbm90IHVzZSBmb2xsb3dpbmcgZXhwb3J0cyBpbnNpZGUgdGhlIGFwcClcblxuLy8gQ3JlYXRlIGEgcm91dGVyIGFuZCBhc3NpZ24gaXQgYXMgdGhlIHNpbmdsZXRvbiBpbnN0YW5jZS5cbi8vIFRoaXMgaXMgdXNlZCBpbiBjbGllbnQgc2lkZSB3aGVuIHdlIGFyZSBpbml0aWxpemluZyB0aGUgYXBwLlxuLy8gVGhpcyBzaG91bGQgKipub3QqKiB1c2UgaW5zaWRlIHRoZSBzZXJ2ZXIuXG5leHBvcnQgY29uc3QgY3JlYXRlUm91dGVyID0gKC4uLmFyZ3M6IFJvdXRlckFyZ3MpOiBSb3V0ZXIgPT4ge1xuICBzaW5nbGV0b25Sb3V0ZXIucm91dGVyID0gbmV3IFJvdXRlciguLi5hcmdzKVxuICBzaW5nbGV0b25Sb3V0ZXIucmVhZHlDYWxsYmFja3MuZm9yRWFjaCgoY2IpID0+IGNiKCkpXG4gIHNpbmdsZXRvblJvdXRlci5yZWFkeUNhbGxiYWNrcyA9IFtdXG5cbiAgcmV0dXJuIHNpbmdsZXRvblJvdXRlci5yb3V0ZXJcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGNyZWF0ZSB0aGUgYHdpdGhSb3V0ZXJgIHJvdXRlciBpbnN0YW5jZVxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQdWJsaWNSb3V0ZXJJbnN0YW5jZShyb3V0ZXI6IFJvdXRlcik6IE5leHRSb3V0ZXIge1xuICBjb25zdCBfcm91dGVyID0gcm91dGVyIGFzIGFueVxuICBjb25zdCBpbnN0YW5jZSA9IHt9IGFzIGFueVxuXG4gIGZvciAoY29uc3QgcHJvcGVydHkgb2YgdXJsUHJvcGVydHlGaWVsZHMpIHtcbiAgICBpZiAodHlwZW9mIF9yb3V0ZXJbcHJvcGVydHldID09PSAnb2JqZWN0Jykge1xuICAgICAgaW5zdGFuY2VbcHJvcGVydHldID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgQXJyYXkuaXNBcnJheShfcm91dGVyW3Byb3BlcnR5XSkgPyBbXSA6IHt9LFxuICAgICAgICBfcm91dGVyW3Byb3BlcnR5XVxuICAgICAgKSAvLyBtYWtlcyBzdXJlIHF1ZXJ5IGlzIG5vdCBzdGF0ZWZ1bFxuICAgICAgY29udGludWVcbiAgICB9XG5cbiAgICBpbnN0YW5jZVtwcm9wZXJ0eV0gPSBfcm91dGVyW3Byb3BlcnR5XVxuICB9XG5cbiAgLy8gRXZlbnRzIGlzIGEgc3RhdGljIHByb3BlcnR5IG9uIHRoZSByb3V0ZXIsIHRoZSByb3V0ZXIgZG9lc24ndCBoYXZlIHRvIGJlIGluaXRpYWxpemVkIHRvIHVzZSBpdFxuICBpbnN0YW5jZS5ldmVudHMgPSBSb3V0ZXIuZXZlbnRzXG5cbiAgY29yZU1ldGhvZEZpZWxkcy5mb3JFYWNoKChmaWVsZCkgPT4ge1xuICAgIGluc3RhbmNlW2ZpZWxkXSA9ICguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgcmV0dXJuIF9yb3V0ZXJbZmllbGRdKC4uLmFyZ3MpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBpbnN0YW5jZVxufVxuIiwgImltcG9ydCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7XG4gIHJlcXVlc3RJZGxlQ2FsbGJhY2ssXG4gIGNhbmNlbElkbGVDYWxsYmFjayxcbn0gZnJvbSAnLi9yZXF1ZXN0LWlkbGUtY2FsbGJhY2snXG5cbnR5cGUgVXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0ID0gUGljazxJbnRlcnNlY3Rpb25PYnNlcnZlckluaXQsICdyb290TWFyZ2luJz5cbnR5cGUgVXNlSW50ZXJzZWN0aW9uID0geyBkaXNhYmxlZD86IGJvb2xlYW4gfSAmIFVzZUludGVyc2VjdGlvbk9ic2VydmVySW5pdFxudHlwZSBPYnNlcnZlQ2FsbGJhY2sgPSAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkXG50eXBlIE9ic2VydmVyID0ge1xuICBpZDogc3RyaW5nXG4gIG9ic2VydmVyOiBJbnRlcnNlY3Rpb25PYnNlcnZlclxuICBlbGVtZW50czogTWFwPEVsZW1lbnQsIE9ic2VydmVDYWxsYmFjaz5cbn1cblxuY29uc3QgaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgPSB0eXBlb2YgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnXG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VJbnRlcnNlY3Rpb248VCBleHRlbmRzIEVsZW1lbnQ+KHtcbiAgcm9vdE1hcmdpbixcbiAgZGlzYWJsZWQsXG59OiBVc2VJbnRlcnNlY3Rpb24pOiBbKGVsZW1lbnQ6IFQgfCBudWxsKSA9PiB2b2lkLCBib29sZWFuXSB7XG4gIGNvbnN0IGlzRGlzYWJsZWQ6IGJvb2xlYW4gPSBkaXNhYmxlZCB8fCAhaGFzSW50ZXJzZWN0aW9uT2JzZXJ2ZXJcblxuICBjb25zdCB1bm9ic2VydmUgPSB1c2VSZWY8RnVuY3Rpb24+KClcbiAgY29uc3QgW3Zpc2libGUsIHNldFZpc2libGVdID0gdXNlU3RhdGUoZmFsc2UpXG5cbiAgY29uc3Qgc2V0UmVmID0gdXNlQ2FsbGJhY2soXG4gICAgKGVsOiBUIHwgbnVsbCkgPT4ge1xuICAgICAgaWYgKHVub2JzZXJ2ZS5jdXJyZW50KSB7XG4gICAgICAgIHVub2JzZXJ2ZS5jdXJyZW50KClcbiAgICAgICAgdW5vYnNlcnZlLmN1cnJlbnQgPSB1bmRlZmluZWRcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRGlzYWJsZWQgfHwgdmlzaWJsZSkgcmV0dXJuXG5cbiAgICAgIGlmIChlbCAmJiBlbC50YWdOYW1lKSB7XG4gICAgICAgIHVub2JzZXJ2ZS5jdXJyZW50ID0gb2JzZXJ2ZShcbiAgICAgICAgICBlbCxcbiAgICAgICAgICAoaXNWaXNpYmxlKSA9PiBpc1Zpc2libGUgJiYgc2V0VmlzaWJsZShpc1Zpc2libGUpLFxuICAgICAgICAgIHsgcm9vdE1hcmdpbiB9XG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9LFxuICAgIFtpc0Rpc2FibGVkLCByb290TWFyZ2luLCB2aXNpYmxlXVxuICApXG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWhhc0ludGVyc2VjdGlvbk9ic2VydmVyKSB7XG4gICAgICBpZiAoIXZpc2libGUpIHtcbiAgICAgICAgY29uc3QgaWRsZUNhbGxiYWNrID0gcmVxdWVzdElkbGVDYWxsYmFjaygoKSA9PiBzZXRWaXNpYmxlKHRydWUpKVxuICAgICAgICByZXR1cm4gKCkgPT4gY2FuY2VsSWRsZUNhbGxiYWNrKGlkbGVDYWxsYmFjaylcbiAgICAgIH1cbiAgICB9XG4gIH0sIFt2aXNpYmxlXSlcblxuICByZXR1cm4gW3NldFJlZiwgdmlzaWJsZV1cbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZShcbiAgZWxlbWVudDogRWxlbWVudCxcbiAgY2FsbGJhY2s6IE9ic2VydmVDYWxsYmFjayxcbiAgb3B0aW9uczogVXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0XG4pOiAoKSA9PiB2b2lkIHtcbiAgY29uc3QgeyBpZCwgb2JzZXJ2ZXIsIGVsZW1lbnRzIH0gPSBjcmVhdGVPYnNlcnZlcihvcHRpb25zKVxuICBlbGVtZW50cy5zZXQoZWxlbWVudCwgY2FsbGJhY2spXG5cbiAgb2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KVxuICByZXR1cm4gZnVuY3Rpb24gdW5vYnNlcnZlKCk6IHZvaWQge1xuICAgIGVsZW1lbnRzLmRlbGV0ZShlbGVtZW50KVxuICAgIG9ic2VydmVyLnVub2JzZXJ2ZShlbGVtZW50KVxuXG4gICAgLy8gRGVzdHJveSBvYnNlcnZlciB3aGVuIHRoZXJlJ3Mgbm90aGluZyBsZWZ0IHRvIHdhdGNoOlxuICAgIGlmIChlbGVtZW50cy5zaXplID09PSAwKSB7XG4gICAgICBvYnNlcnZlci5kaXNjb25uZWN0KClcbiAgICAgIG9ic2VydmVycy5kZWxldGUoaWQpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IG9ic2VydmVycyA9IG5ldyBNYXA8c3RyaW5nLCBPYnNlcnZlcj4oKVxuZnVuY3Rpb24gY3JlYXRlT2JzZXJ2ZXIob3B0aW9uczogVXNlSW50ZXJzZWN0aW9uT2JzZXJ2ZXJJbml0KTogT2JzZXJ2ZXIge1xuICBjb25zdCBpZCA9IG9wdGlvbnMucm9vdE1hcmdpbiB8fCAnJ1xuICBsZXQgaW5zdGFuY2UgPSBvYnNlcnZlcnMuZ2V0KGlkKVxuICBpZiAoaW5zdGFuY2UpIHtcbiAgICByZXR1cm4gaW5zdGFuY2VcbiAgfVxuXG4gIGNvbnN0IGVsZW1lbnRzID0gbmV3IE1hcDxFbGVtZW50LCBPYnNlcnZlQ2FsbGJhY2s+KClcbiAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IGVsZW1lbnRzLmdldChlbnRyeS50YXJnZXQpXG4gICAgICBjb25zdCBpc1Zpc2libGUgPSBlbnRyeS5pc0ludGVyc2VjdGluZyB8fCBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA+IDBcbiAgICAgIGlmIChjYWxsYmFjayAmJiBpc1Zpc2libGUpIHtcbiAgICAgICAgY2FsbGJhY2soaXNWaXNpYmxlKVxuICAgICAgfVxuICAgIH0pXG4gIH0sIG9wdGlvbnMpXG5cbiAgb2JzZXJ2ZXJzLnNldChcbiAgICBpZCxcbiAgICAoaW5zdGFuY2UgPSB7XG4gICAgICBpZCxcbiAgICAgIG9ic2VydmVyLFxuICAgICAgZWxlbWVudHMsXG4gICAgfSlcbiAgKVxuICByZXR1cm4gaW5zdGFuY2Vcbn1cbiIsICJpbXBvcnQgUmVhY3QsIHsgQ2hpbGRyZW4sIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgVXJsT2JqZWN0IH0gZnJvbSAndXJsJ1xuaW1wb3J0IHtcbiAgYWRkQmFzZVBhdGgsXG4gIGFkZExvY2FsZSxcbiAgZ2V0RG9tYWluTG9jYWxlLFxuICBpc0xvY2FsVVJMLFxuICBOZXh0Um91dGVyLFxuICBQcmVmZXRjaE9wdGlvbnMsXG4gIHJlc29sdmVIcmVmLFxufSBmcm9tICcuLi9uZXh0LXNlcnZlci9saWIvcm91dGVyL3JvdXRlcidcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJy4vcm91dGVyJ1xuaW1wb3J0IHsgdXNlSW50ZXJzZWN0aW9uIH0gZnJvbSAnLi91c2UtaW50ZXJzZWN0aW9uJ1xuXG50eXBlIFVybCA9IHN0cmluZyB8IFVybE9iamVjdFxudHlwZSBSZXF1aXJlZEtleXM8VD4gPSB7XG4gIFtLIGluIGtleW9mIFRdLT86IHt9IGV4dGVuZHMgUGljazxULCBLPiA/IG5ldmVyIDogS1xufVtrZXlvZiBUXVxudHlwZSBPcHRpb25hbEtleXM8VD4gPSB7XG4gIFtLIGluIGtleW9mIFRdLT86IHt9IGV4dGVuZHMgUGljazxULCBLPiA/IEsgOiBuZXZlclxufVtrZXlvZiBUXVxuXG5leHBvcnQgdHlwZSBMaW5rUHJvcHMgPSB7XG4gIGhyZWY6IFVybFxuICBhcz86IFVybFxuICByZXBsYWNlPzogYm9vbGVhblxuICBzY3JvbGw/OiBib29sZWFuXG4gIHNoYWxsb3c/OiBib29sZWFuXG4gIHBhc3NIcmVmPzogYm9vbGVhblxuICBwcmVmZXRjaD86IGJvb2xlYW5cbiAgbG9jYWxlPzogc3RyaW5nIHwgZmFsc2Vcbn1cbnR5cGUgTGlua1Byb3BzUmVxdWlyZWQgPSBSZXF1aXJlZEtleXM8TGlua1Byb3BzPlxudHlwZSBMaW5rUHJvcHNPcHRpb25hbCA9IE9wdGlvbmFsS2V5czxMaW5rUHJvcHM+XG5cbmNvbnN0IHByZWZldGNoZWQ6IHsgW2NhY2hlS2V5OiBzdHJpbmddOiBib29sZWFuIH0gPSB7fVxuXG5mdW5jdGlvbiBwcmVmZXRjaChcbiAgcm91dGVyOiBOZXh0Um91dGVyLFxuICBocmVmOiBzdHJpbmcsXG4gIGFzOiBzdHJpbmcsXG4gIG9wdGlvbnM/OiBQcmVmZXRjaE9wdGlvbnNcbik6IHZvaWQge1xuICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgIXJvdXRlcikgcmV0dXJuXG4gIGlmICghaXNMb2NhbFVSTChocmVmKSkgcmV0dXJuXG4gIC8vIFByZWZldGNoIHRoZSBKU09OIHBhZ2UgaWYgYXNrZWQgKG9ubHkgaW4gdGhlIGNsaWVudClcbiAgLy8gV2UgbmVlZCB0byBoYW5kbGUgYSBwcmVmZXRjaCBlcnJvciBoZXJlIHNpbmNlIHdlIG1heSBiZVxuICAvLyBsb2FkaW5nIHdpdGggcHJpb3JpdHkgd2hpY2ggY2FuIHJlamVjdCBidXQgd2UgZG9uJ3RcbiAgLy8gd2FudCB0byBmb3JjZSBuYXZpZ2F0aW9uIHNpbmNlIHRoaXMgaXMgb25seSBhIHByZWZldGNoXG4gIHJvdXRlci5wcmVmZXRjaChocmVmLCBhcywgb3B0aW9ucykuY2F0Y2goKGVycikgPT4ge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAvLyByZXRocm93IHRvIHNob3cgaW52YWxpZCBVUkwgZXJyb3JzXG4gICAgICB0aHJvdyBlcnJcbiAgICB9XG4gIH0pXG4gIGNvbnN0IGN1ckxvY2FsZSA9XG4gICAgb3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5sb2NhbGUgIT09ICd1bmRlZmluZWQnXG4gICAgICA/IG9wdGlvbnMubG9jYWxlXG4gICAgICA6IHJvdXRlciAmJiByb3V0ZXIubG9jYWxlXG5cbiAgLy8gSm9pbiBvbiBhbiBpbnZhbGlkIFVSSSBjaGFyYWN0ZXJcbiAgcHJlZmV0Y2hlZFtocmVmICsgJyUnICsgYXMgKyAoY3VyTG9jYWxlID8gJyUnICsgY3VyTG9jYWxlIDogJycpXSA9IHRydWVcbn1cblxuZnVuY3Rpb24gaXNNb2RpZmllZEV2ZW50KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KTogYm9vbGVhbiB7XG4gIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudC5jdXJyZW50VGFyZ2V0IGFzIEhUTUxBbmNob3JFbGVtZW50XG4gIHJldHVybiAoXG4gICAgKHRhcmdldCAmJiB0YXJnZXQgIT09ICdfc2VsZicpIHx8XG4gICAgZXZlbnQubWV0YUtleSB8fFxuICAgIGV2ZW50LmN0cmxLZXkgfHxcbiAgICBldmVudC5zaGlmdEtleSB8fFxuICAgIGV2ZW50LmFsdEtleSB8fCAvLyB0cmlnZ2VycyByZXNvdXJjZSBkb3dubG9hZFxuICAgIChldmVudC5uYXRpdmVFdmVudCAmJiBldmVudC5uYXRpdmVFdmVudC53aGljaCA9PT0gMilcbiAgKVxufVxuXG5mdW5jdGlvbiBsaW5rQ2xpY2tlZChcbiAgZTogUmVhY3QuTW91c2VFdmVudCxcbiAgcm91dGVyOiBOZXh0Um91dGVyLFxuICBocmVmOiBzdHJpbmcsXG4gIGFzOiBzdHJpbmcsXG4gIHJlcGxhY2U/OiBib29sZWFuLFxuICBzaGFsbG93PzogYm9vbGVhbixcbiAgc2Nyb2xsPzogYm9vbGVhbixcbiAgbG9jYWxlPzogc3RyaW5nIHwgZmFsc2Vcbik6IHZvaWQge1xuICBjb25zdCB7IG5vZGVOYW1lIH0gPSBlLmN1cnJlbnRUYXJnZXRcblxuICBpZiAobm9kZU5hbWUgPT09ICdBJyAmJiAoaXNNb2RpZmllZEV2ZW50KGUpIHx8ICFpc0xvY2FsVVJMKGhyZWYpKSkge1xuICAgIC8vIGlnbm9yZSBjbGljayBmb3IgYnJvd3Nlclx1MjAxOXMgZGVmYXVsdCBiZWhhdmlvclxuICAgIHJldHVyblxuICB9XG5cbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgLy8gIGF2b2lkIHNjcm9sbCBmb3IgdXJscyB3aXRoIGFuY2hvciByZWZzXG4gIGlmIChzY3JvbGwgPT0gbnVsbCkge1xuICAgIHNjcm9sbCA9IGFzLmluZGV4T2YoJyMnKSA8IDBcbiAgfVxuXG4gIC8vIHJlcGxhY2Ugc3RhdGUgaW5zdGVhZCBvZiBwdXNoIGlmIHByb3AgaXMgcHJlc2VudFxuICByb3V0ZXJbcmVwbGFjZSA/ICdyZXBsYWNlJyA6ICdwdXNoJ10oaHJlZiwgYXMsIHtcbiAgICBzaGFsbG93LFxuICAgIGxvY2FsZSxcbiAgICBzY3JvbGwsXG4gIH0pLnRoZW4oKHN1Y2Nlc3M6IGJvb2xlYW4pID0+IHtcbiAgICBpZiAoIXN1Y2Nlc3MpIHJldHVyblxuICAgIGlmIChzY3JvbGwpIHtcbiAgICAgIC8vIEZJWE1FOiBwcm9wZXIgcm91dGUgYW5ub3VuY2luZyBhdCBSb3V0ZXIgbGV2ZWwsIG5vdCBMaW5rOlxuICAgICAgZG9jdW1lbnQuYm9keS5mb2N1cygpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBMaW5rKHByb3BzOiBSZWFjdC5Qcm9wc1dpdGhDaGlsZHJlbjxMaW5rUHJvcHM+KSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlUHJvcEVycm9yKGFyZ3M6IHtcbiAgICAgIGtleTogc3RyaW5nXG4gICAgICBleHBlY3RlZDogc3RyaW5nXG4gICAgICBhY3R1YWw6IHN0cmluZ1xuICAgIH0pIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICAgIGBGYWlsZWQgcHJvcCB0eXBlOiBUaGUgcHJvcCBcXGAke2FyZ3Mua2V5fVxcYCBleHBlY3RzIGEgJHthcmdzLmV4cGVjdGVkfSBpbiBcXGA8TGluaz5cXGAsIGJ1dCBnb3QgXFxgJHthcmdzLmFjdHVhbH1cXGAgaW5zdGVhZC5gICtcbiAgICAgICAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgICAgID8gXCJcXG5PcGVuIHlvdXIgYnJvd3NlcidzIGNvbnNvbGUgdG8gdmlldyB0aGUgQ29tcG9uZW50IHN0YWNrIHRyYWNlLlwiXG4gICAgICAgICAgICA6ICcnKVxuICAgICAgKVxuICAgIH1cblxuICAgIC8vIFR5cGVTY3JpcHQgdHJpY2sgZm9yIHR5cGUtZ3VhcmRpbmc6XG4gICAgY29uc3QgcmVxdWlyZWRQcm9wc0d1YXJkOiBSZWNvcmQ8TGlua1Byb3BzUmVxdWlyZWQsIHRydWU+ID0ge1xuICAgICAgaHJlZjogdHJ1ZSxcbiAgICB9IGFzIGNvbnN0XG4gICAgY29uc3QgcmVxdWlyZWRQcm9wczogTGlua1Byb3BzUmVxdWlyZWRbXSA9IE9iamVjdC5rZXlzKFxuICAgICAgcmVxdWlyZWRQcm9wc0d1YXJkXG4gICAgKSBhcyBMaW5rUHJvcHNSZXF1aXJlZFtdXG4gICAgcmVxdWlyZWRQcm9wcy5mb3JFYWNoKChrZXk6IExpbmtQcm9wc1JlcXVpcmVkKSA9PiB7XG4gICAgICBpZiAoa2V5ID09PSAnaHJlZicpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByb3BzW2tleV0gPT0gbnVsbCB8fFxuICAgICAgICAgICh0eXBlb2YgcHJvcHNba2V5XSAhPT0gJ3N0cmluZycgJiYgdHlwZW9mIHByb3BzW2tleV0gIT09ICdvYmplY3QnKVxuICAgICAgICApIHtcbiAgICAgICAgICB0aHJvdyBjcmVhdGVQcm9wRXJyb3Ioe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZXhwZWN0ZWQ6ICdgc3RyaW5nYCBvciBgb2JqZWN0YCcsXG4gICAgICAgICAgICBhY3R1YWw6IHByb3BzW2tleV0gPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgcHJvcHNba2V5XSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUeXBlU2NyaXB0IHRyaWNrIGZvciB0eXBlLWd1YXJkaW5nOlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIGNvbnN0IF86IG5ldmVyID0ga2V5XG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIFR5cGVTY3JpcHQgdHJpY2sgZm9yIHR5cGUtZ3VhcmRpbmc6XG4gICAgY29uc3Qgb3B0aW9uYWxQcm9wc0d1YXJkOiBSZWNvcmQ8TGlua1Byb3BzT3B0aW9uYWwsIHRydWU+ID0ge1xuICAgICAgYXM6IHRydWUsXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgc2Nyb2xsOiB0cnVlLFxuICAgICAgc2hhbGxvdzogdHJ1ZSxcbiAgICAgIHBhc3NIcmVmOiB0cnVlLFxuICAgICAgcHJlZmV0Y2g6IHRydWUsXG4gICAgICBsb2NhbGU6IHRydWUsXG4gICAgfSBhcyBjb25zdFxuICAgIGNvbnN0IG9wdGlvbmFsUHJvcHM6IExpbmtQcm9wc09wdGlvbmFsW10gPSBPYmplY3Qua2V5cyhcbiAgICAgIG9wdGlvbmFsUHJvcHNHdWFyZFxuICAgICkgYXMgTGlua1Byb3BzT3B0aW9uYWxbXVxuICAgIG9wdGlvbmFsUHJvcHMuZm9yRWFjaCgoa2V5OiBMaW5rUHJvcHNPcHRpb25hbCkgPT4ge1xuICAgICAgY29uc3QgdmFsVHlwZSA9IHR5cGVvZiBwcm9wc1trZXldXG5cbiAgICAgIGlmIChrZXkgPT09ICdhcycpIHtcbiAgICAgICAgaWYgKHByb3BzW2tleV0gJiYgdmFsVHlwZSAhPT0gJ3N0cmluZycgJiYgdmFsVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0aHJvdyBjcmVhdGVQcm9wRXJyb3Ioe1xuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZXhwZWN0ZWQ6ICdgc3RyaW5nYCBvciBgb2JqZWN0YCcsXG4gICAgICAgICAgICBhY3R1YWw6IHZhbFR5cGUsXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChrZXkgPT09ICdsb2NhbGUnKSB7XG4gICAgICAgIGlmIChwcm9wc1trZXldICYmIHZhbFR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhyb3cgY3JlYXRlUHJvcEVycm9yKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGV4cGVjdGVkOiAnYHN0cmluZ2AnLFxuICAgICAgICAgICAgYWN0dWFsOiB2YWxUeXBlLFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGtleSA9PT0gJ3JlcGxhY2UnIHx8XG4gICAgICAgIGtleSA9PT0gJ3Njcm9sbCcgfHxcbiAgICAgICAga2V5ID09PSAnc2hhbGxvdycgfHxcbiAgICAgICAga2V5ID09PSAncGFzc0hyZWYnIHx8XG4gICAgICAgIGtleSA9PT0gJ3ByZWZldGNoJ1xuICAgICAgKSB7XG4gICAgICAgIGlmIChwcm9wc1trZXldICE9IG51bGwgJiYgdmFsVHlwZSAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgdGhyb3cgY3JlYXRlUHJvcEVycm9yKHtcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGV4cGVjdGVkOiAnYGJvb2xlYW5gJyxcbiAgICAgICAgICAgIGFjdHVhbDogdmFsVHlwZSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBUeXBlU2NyaXB0IHRyaWNrIGZvciB0eXBlLWd1YXJkaW5nOlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC12YXJzXG4gICAgICAgIGNvbnN0IF86IG5ldmVyID0ga2V5XG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIFRoaXMgaG9vayBpcyBpbiBhIGNvbmRpdGlvbmFsIGJ1dCB0aGF0IGlzIG9rIGJlY2F1c2UgYHByb2Nlc3MuZW52Lk5PREVfRU5WYCBuZXZlciBjaGFuZ2VzXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0LWhvb2tzL3J1bGVzLW9mLWhvb2tzXG4gICAgY29uc3QgaGFzV2FybmVkID0gUmVhY3QudXNlUmVmKGZhbHNlKVxuICAgIGlmIChwcm9wcy5wcmVmZXRjaCAmJiAhaGFzV2FybmVkLmN1cnJlbnQpIHtcbiAgICAgIGhhc1dhcm5lZC5jdXJyZW50ID0gdHJ1ZVxuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAnTmV4dC5qcyBhdXRvLXByZWZldGNoZXMgYXV0b21hdGljYWxseSBiYXNlZCBvbiB2aWV3cG9ydC4gVGhlIHByZWZldGNoIGF0dHJpYnV0ZSBpcyBubyBsb25nZXIgbmVlZGVkLiBNb3JlOiBodHRwczovL2Vyci5zaC92ZXJjZWwvbmV4dC5qcy9wcmVmZXRjaC10cnVlLWRlcHJlY2F0ZWQnXG4gICAgICApXG4gICAgfVxuICB9XG4gIGNvbnN0IHAgPSBwcm9wcy5wcmVmZXRjaCAhPT0gZmFsc2VcblxuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxuICBjb25zdCBwYXRobmFtZSA9IChyb3V0ZXIgJiYgcm91dGVyLnBhdGhuYW1lKSB8fCAnLydcblxuICBjb25zdCB7IGhyZWYsIGFzIH0gPSBSZWFjdC51c2VNZW1vKCgpID0+IHtcbiAgICBjb25zdCBbcmVzb2x2ZWRIcmVmLCByZXNvbHZlZEFzXSA9IHJlc29sdmVIcmVmKHBhdGhuYW1lLCBwcm9wcy5ocmVmLCB0cnVlKVxuICAgIHJldHVybiB7XG4gICAgICBocmVmOiByZXNvbHZlZEhyZWYsXG4gICAgICBhczogcHJvcHMuYXNcbiAgICAgICAgPyByZXNvbHZlSHJlZihwYXRobmFtZSwgcHJvcHMuYXMpXG4gICAgICAgIDogcmVzb2x2ZWRBcyB8fCByZXNvbHZlZEhyZWYsXG4gICAgfVxuICB9LCBbcGF0aG5hbWUsIHByb3BzLmhyZWYsIHByb3BzLmFzXSlcblxuICBsZXQgeyBjaGlsZHJlbiwgcmVwbGFjZSwgc2hhbGxvdywgc2Nyb2xsLCBsb2NhbGUgfSA9IHByb3BzXG5cbiAgLy8gRGVwcmVjYXRlZC4gV2FybmluZyBzaG93biBieSBwcm9wVHlwZSBjaGVjay4gSWYgdGhlIGNoaWxkcmVuIHByb3ZpZGVkIGlzIGEgc3RyaW5nICg8TGluaz5leGFtcGxlPC9MaW5rPikgd2Ugd3JhcCBpdCBpbiBhbiA8YT4gdGFnXG4gIGlmICh0eXBlb2YgY2hpbGRyZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgY2hpbGRyZW4gPSA8YT57Y2hpbGRyZW59PC9hPlxuICB9XG5cbiAgLy8gVGhpcyB3aWxsIHJldHVybiB0aGUgZmlyc3QgY2hpbGQsIGlmIG11bHRpcGxlIGFyZSBwcm92aWRlZCBpdCB3aWxsIHRocm93IGFuIGVycm9yXG4gIGNvbnN0IGNoaWxkOiBhbnkgPSBDaGlsZHJlbi5vbmx5KGNoaWxkcmVuKVxuICBjb25zdCBjaGlsZFJlZjogYW55ID0gY2hpbGQgJiYgdHlwZW9mIGNoaWxkID09PSAnb2JqZWN0JyAmJiBjaGlsZC5yZWZcblxuICBjb25zdCBbc2V0SW50ZXJzZWN0aW9uUmVmLCBpc1Zpc2libGVdID0gdXNlSW50ZXJzZWN0aW9uKHtcbiAgICByb290TWFyZ2luOiAnMjAwcHgnLFxuICB9KVxuICBjb25zdCBzZXRSZWYgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAoZWw6IEVsZW1lbnQpID0+IHtcbiAgICAgIHNldEludGVyc2VjdGlvblJlZihlbClcbiAgICAgIGlmIChjaGlsZFJlZikge1xuICAgICAgICBpZiAodHlwZW9mIGNoaWxkUmVmID09PSAnZnVuY3Rpb24nKSBjaGlsZFJlZihlbClcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGNoaWxkUmVmID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNoaWxkUmVmLmN1cnJlbnQgPSBlbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBbY2hpbGRSZWYsIHNldEludGVyc2VjdGlvblJlZl1cbiAgKVxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHNob3VsZFByZWZldGNoID0gaXNWaXNpYmxlICYmIHAgJiYgaXNMb2NhbFVSTChocmVmKVxuICAgIGNvbnN0IGN1ckxvY2FsZSA9XG4gICAgICB0eXBlb2YgbG9jYWxlICE9PSAndW5kZWZpbmVkJyA/IGxvY2FsZSA6IHJvdXRlciAmJiByb3V0ZXIubG9jYWxlXG4gICAgY29uc3QgaXNQcmVmZXRjaGVkID1cbiAgICAgIHByZWZldGNoZWRbaHJlZiArICclJyArIGFzICsgKGN1ckxvY2FsZSA/ICclJyArIGN1ckxvY2FsZSA6ICcnKV1cbiAgICBpZiAoc2hvdWxkUHJlZmV0Y2ggJiYgIWlzUHJlZmV0Y2hlZCkge1xuICAgICAgcHJlZmV0Y2gocm91dGVyLCBocmVmLCBhcywge1xuICAgICAgICBsb2NhbGU6IGN1ckxvY2FsZSxcbiAgICAgIH0pXG4gICAgfVxuICB9LCBbYXMsIGhyZWYsIGlzVmlzaWJsZSwgbG9jYWxlLCBwLCByb3V0ZXJdKVxuXG4gIGNvbnN0IGNoaWxkUHJvcHM6IHtcbiAgICBvbk1vdXNlRW50ZXI/OiBSZWFjdC5Nb3VzZUV2ZW50SGFuZGxlclxuICAgIG9uQ2xpY2s6IFJlYWN0Lk1vdXNlRXZlbnRIYW5kbGVyXG4gICAgaHJlZj86IHN0cmluZ1xuICAgIHJlZj86IGFueVxuICB9ID0ge1xuICAgIHJlZjogc2V0UmVmLFxuICAgIG9uQ2xpY2s6IChlOiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICBpZiAoY2hpbGQucHJvcHMgJiYgdHlwZW9mIGNoaWxkLnByb3BzLm9uQ2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY2hpbGQucHJvcHMub25DbGljayhlKVxuICAgICAgfVxuICAgICAgaWYgKCFlLmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgICAgbGlua0NsaWNrZWQoZSwgcm91dGVyLCBocmVmLCBhcywgcmVwbGFjZSwgc2hhbGxvdywgc2Nyb2xsLCBsb2NhbGUpXG4gICAgICB9XG4gICAgfSxcbiAgfVxuXG4gIGNoaWxkUHJvcHMub25Nb3VzZUVudGVyID0gKGU6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICBpZiAoIWlzTG9jYWxVUkwoaHJlZikpIHJldHVyblxuICAgIGlmIChjaGlsZC5wcm9wcyAmJiB0eXBlb2YgY2hpbGQucHJvcHMub25Nb3VzZUVudGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjaGlsZC5wcm9wcy5vbk1vdXNlRW50ZXIoZSlcbiAgICB9XG4gICAgcHJlZmV0Y2gocm91dGVyLCBocmVmLCBhcywgeyBwcmlvcml0eTogdHJ1ZSB9KVxuICB9XG5cbiAgLy8gSWYgY2hpbGQgaXMgYW4gPGE+IHRhZyBhbmQgZG9lc24ndCBoYXZlIGEgaHJlZiBhdHRyaWJ1dGUsIG9yIGlmIHRoZSAncGFzc0hyZWYnIHByb3BlcnR5IGlzXG4gIC8vIGRlZmluZWQsIHdlIHNwZWNpZnkgdGhlIGN1cnJlbnQgJ2hyZWYnLCBzbyB0aGF0IHJlcGV0aXRpb24gaXMgbm90IG5lZWRlZCBieSB0aGUgdXNlclxuICBpZiAocHJvcHMucGFzc0hyZWYgfHwgKGNoaWxkLnR5cGUgPT09ICdhJyAmJiAhKCdocmVmJyBpbiBjaGlsZC5wcm9wcykpKSB7XG4gICAgY29uc3QgY3VyTG9jYWxlID1cbiAgICAgIHR5cGVvZiBsb2NhbGUgIT09ICd1bmRlZmluZWQnID8gbG9jYWxlIDogcm91dGVyICYmIHJvdXRlci5sb2NhbGVcblxuICAgIC8vIHdlIG9ubHkgcmVuZGVyIGRvbWFpbiBsb2NhbGVzIGlmIHdlIGFyZSBjdXJyZW50bHkgb24gYSBkb21haW4gbG9jYWxlXG4gICAgLy8gc28gdGhhdCBsb2NhbGUgbGlua3MgYXJlIHN0aWxsIHZpc2l0YWJsZSBpbiBkZXZlbG9wbWVudC9wcmV2aWV3IGVudnNcbiAgICBjb25zdCBsb2NhbGVEb21haW4gPVxuICAgICAgcm91dGVyICYmXG4gICAgICByb3V0ZXIuaXNMb2NhbGVEb21haW4gJiZcbiAgICAgIGdldERvbWFpbkxvY2FsZShcbiAgICAgICAgYXMsXG4gICAgICAgIGN1ckxvY2FsZSxcbiAgICAgICAgcm91dGVyICYmIHJvdXRlci5sb2NhbGVzLFxuICAgICAgICByb3V0ZXIgJiYgcm91dGVyLmRvbWFpbkxvY2FsZXNcbiAgICAgIClcblxuICAgIGNoaWxkUHJvcHMuaHJlZiA9XG4gICAgICBsb2NhbGVEb21haW4gfHxcbiAgICAgIGFkZEJhc2VQYXRoKGFkZExvY2FsZShhcywgY3VyTG9jYWxlLCByb3V0ZXIgJiYgcm91dGVyLmRlZmF1bHRMb2NhbGUpKVxuICB9XG5cbiAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwgY2hpbGRQcm9wcylcbn1cblxuZXhwb3J0IGRlZmF1bHQgTGlua1xuIiwgIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9kaXN0L2NsaWVudC9saW5rJylcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7OztBQUFBO0FBQUEsbUJBQWlCLEtBQUs7QUFDcEI7QUFFQSxRQUFJLE9BQU8sV0FBVyxjQUFjLE9BQU8sT0FBTyxhQUFhLFVBQVU7QUFDdkUsYUFBTyxVQUFVLFVBQVUsa0JBQWlCLE1BQUs7QUFDL0MsZUFBTyxPQUFPO0FBQUE7QUFBQSxXQUVYO0FBQ0wsYUFBTyxVQUFVLFVBQVUsa0JBQWlCLE1BQUs7QUFDL0MsZUFBTyxRQUFPLE9BQU8sV0FBVyxjQUFjLEtBQUksZ0JBQWdCLFVBQVUsU0FBUSxPQUFPLFlBQVksV0FBVyxPQUFPO0FBQUE7QUFBQTtBQUk3SCxXQUFPLFFBQVE7QUFBQTtBQUdqQixTQUFPLFVBQVU7QUFBQTs7O0FDaEJqQjtBQUFBLE1BQUksVUFBa0I7QUFFdEIsc0NBQW9DO0FBQ2xDLFFBQUksT0FBTyxZQUFZO0FBQVksYUFBTztBQUMxQyxRQUFJLFFBQVEsSUFBSTtBQUVoQiwrQkFBMkIscUNBQW9DO0FBQzdELGFBQU87QUFBQTtBQUdULFdBQU87QUFBQTtBQUdULG1DQUFpQyxLQUFLO0FBQ3BDLFFBQUksT0FBTyxJQUFJLFlBQVk7QUFDekIsYUFBTztBQUFBO0FBR1QsUUFBSSxRQUFRLFFBQVEsUUFBUSxTQUFTLFlBQVksT0FBTyxR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
