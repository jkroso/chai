/*!
 * chai
 * Copyright(c) 2011-2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

/*!
 * Main export
 */

module.exports = AssertionError;

/**
 * # AssertionError (constructor)
 *
 * Create a new assertion error based on the Javascript
 * `Error` prototype.
 *
 * **Options**
 * - message
 * - actual
 * - expected
 * - operator
 * - startStackFunction
 *
 * @param {Object} options
 * @api public
 */

function AssertionError (options) {
  options = options || {};
  this.message = options.message;
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  this.showDiff = options.showDiff;

  if (options.stackStartFunction && Error.captureStackTrace) {
    var stackStartFunction = options.stackStartFunction;
    Error.captureStackTrace(this, stackStartFunction);
  }

  if (options.includeLine) {
    var line = getLine()
    if (line != null) {
      this.message = '(line:' + line + ') ' + this.message
    }
  }
}

function getLine(){
  var frames = new Error().stack
  if (typeof frames != 'string') return ''
  // get the first non-chai frame
  var top = frames.split('\n')
    .slice(1)
    .filter(function(frame){
      return !(/\([^)]*\/chai\/(?:chai\.js|lib\/[^)]*)\)$/).test(frame)
    })[0]
  return top && top.match(/\.js:(\d+):(\d+)\)$/)[1]
}

/*!
 * Inherit from Error
 */

AssertionError.prototype = Object.create(Error.prototype);
AssertionError.prototype.name = 'AssertionError';
AssertionError.prototype.constructor = AssertionError;

/**
 * # toString()
 *
 * Override default to string method
 */

AssertionError.prototype.toString = function() {
  return this.message;
};
