var _ezoop = window.ezoop,
    ezoop = function () {};

ezoop.noConflict = function () {
  window.ezoop = _ezoop;
  return this;
};

window.ezoop = ezoop;

ezoop.BaseClass = function(properties) {
  var newClass = function () {
    if (typeof this.initialize !== 'undefined') {
      this.initialize.apply(this, arguments);
    }
  }
  newClass.prototype = properties;
  return newClass;
}

ezoop.ExtendedClass = function(parentClass, properties) {
  var newClass = function () {
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
  ezoop.inheritPrototype(newClass, parentClass);
  ezoop.augmentPrototype(newClass.prototype, properties);
  return newClass;
}

ezoop.inheritPrototype = function (child, parent) {
  var temp = function () {};
  temp.prototype = parent.prototype;
  child.prototype = new temp();
  child.prototype.constructor = child;
  child.parent = parent.prototype;
}

ezoop.augmentPrototype = function (prototype, properties) {
  prototype = prototype || {};
  for (var property in properties) {
    var value = properties[property];
    if (value !== undefined) {
      prototype[property] = value;
    }
  }
  var sourceIsEvt = typeof window.Event == "function" && parent instanceof window.Event;
  if (!sourceIsEvt && properties.hasOwnProperty && properties.hasOwnProperty("toString")) {
    prototype.toString = properties.toString;
  }
}