(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.wrap = factory();
  }
}(this, function () {
  var slice = Array.prototype.slice;

  var wrap = {
    before: function() {
      var fns = slice.call(arguments);
      var wrapped = fns.shift();
      return function() {
        var args = slice.call(arguments);
        fns.forEach(function(fn){
          fn.apply(this, args);
        }, this);
        return wrapped.apply(this, args);
      }
    },
    after: function() {
      var fns = slice.call(arguments);
      var wrapped = fns.shift();
      return function() {
        var args = slice.call(arguments);
        var aftered = wrapped.apply(this, args);
        fns.forEach(function(fn){
          fn.apply(this, args);
        }, this);
        return aftered;
      }
    },
    around: function(wrapped, fn) {
      return function() {
        var args = slice.call(arguments).unshift(wrapped.bind(this));
        return fn.apply(this, args);
      }
    }
  };

  return wrap;
}));
