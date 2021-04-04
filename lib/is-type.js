exports.isImageURL = isImageURL;
exports.isURL = isURL;
exports.isFloatStr = isFloatStr;
exports.isIntegerStr = isIntegerStr;
exports.isFloat = isFloat;

/**
 * 来自 https://yuque.antfin-inc.com/docs/share/370c6663-138a-4ab5-bce2-b36013488d1a?#
 * https://img.alicdn.com/tfs/TB1qEwuzrj1gK0jSZFOXXc7GpXa-32-32.ico
 * @param {string} url
 * @returns {boolean}
 */
function isImageURL(src) {
  return src
    && typeof src === 'string'
    && [/png$/, /webp$/, /jpg$/, /jpeg$/, /ico$/, /gif$/, /svg$/, /avif$/]
      .some(regexp => regexp.test(src))
  ;
}

/**
 * @param {string} url
 * @returns {boolean}
 */
function isURL(url) {
  return url
    && typeof url === 'string'
    && ['http://', 'https://'].some(prefix => url.startsWith(prefix))
  ;
}

/**
 * @param {string | number} str
 * @returns {boolean}
 */
function isNumberStr(str) {
  return str && typeof str == 'string' && Number.isFinite(Number(str));
}

/**
 * @param {string | number} str
 * @returns {boolean}
 */
function isFloatStr(str) {
  return isNumberStr(str) && str.includes('.');
}

/**
 * @param {string | number} str
 * @returns {boolean}
 */
function isIntegerStr(str) {
  return isNumberStr(str) && !str.includes('.');
}

/**
 * @param {number} number
 * @returns {boolean}
 */
function isFloat(number) {
  return Number.isFinite(number) && !Number.isInteger(number);
}
