ezoop
=====

ezoop gives js proper oop

### Example Base Class
```javascript
MyBaseClass = ezoop.BaseClass({
  name: 'a base class',
  initialize: function(arguments) {
    this.arguments = arguments;
  },
  hello: function(){
    console.log("i'm " + this.name + "!");
  },
  opinion: function() {
    console.log('base classes are awesome.');
  }
});
```

### Example Extended Class
```javascript
MyExtendedClass = ezoop.ExtendedClass(MyBaseClass, {
  name: 'an extended class',
  initialize: function(arguments) {
    this.arguments = arguments;
  },
  opinion: function() {
    console.log('extended classes are extended awesome.');
  }
});
```

### Example Output
```javascript
  var myBaseClass = new MyBaseClass();
  var myExtendedClass = new MyExtendedClass();
  
  myBaseClass.hello();       // i'm a base class!
  myExtendedClass.hello();   // i'm an extended class!
  myBaseClass.opinion();     // base classes are awesome.
  myExtendedClass.opinion();  // extended classes are extended awesome.
```
