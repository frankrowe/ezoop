var _ezoop = window.ezoop,
    ezoop = function () {};

ezoop.noConflict = function () {
  window.ezoop = _ezoop;
  return this;
};

window.ezoop = ezoop;

ezoop.ExtendedClass = function(parentClass, properties) {
  return ezoop.Class(parentClass, properties);
}

ezoop.BaseClass = function(properties) {
  return ezoop.Class(null, properties);
}

ezoop.Class = function (parentClass, childClass) {
  var newClass = null;
  var self = ezoop.Class;
  if (parentClass == null || typeof parentClass == 'undefined') {
    newClass = function () {
      if (typeof this.initialize !== 'undefined') {
        this.initialize.apply(this, arguments);
      }
    }
    newClass.prototype = childClass;
  }
  else {
    newClass = function () {
      if (typeof parentClass.prototype !== 'undefined') {
        var parentInit = parentClass.prototype.initialize;
        if (typeof parentInit === 'function') {
          parentInit.apply(this, arguments);
        }
      }
      var init = typeof this.initialize == "function" ? this.initialize : 'undefined';
        if (typeof init == 'function') {
          init.apply(this, arguments);
        }
    }
    self.inheritPrototype(newClass, parentClass);
    self.augmentPrototype(newClass.prototype, childClass);
  }
  return newClass;
}

ezoop.Class.inheritPrototype = function (child, parent) {
  var temp = function () {};
  temp.prototype = parent.prototype;
  child.prototype = new temp();
  child.prototype.constructor = child;
  child.parent = parent.prototype;
}

ezoop.Class.augmentPrototype = function (child, parent) {
  child = child || {};
  if (parent) {
    for (var property in parent) {
      var value = parent[property];
      if (value !== undefined) {
        child[property] = value;
      }
    }
    var sourceIsEvt = typeof window.Event == "function" && parent instanceof window.Event;
    if (!sourceIsEvt && parent.hasOwnProperty && parent.hasOwnProperty("toString")) {
      child.toString = parent.toString;
    }
  }
}