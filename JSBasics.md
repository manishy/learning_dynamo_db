## Understanding Constructors and behaviours wired to new object in JS 

 * A constructor is simply a mechanism that creates a desired object. You may define what you want to initialise that object with as a part of the constructor.
 
 ```javascript
const Square = function (length) {
    this.length = length;
};


Square.prototype.getArea = function () {
    return this.length*this.length;
};


Square.prototype.getArea = function () {
    return this.length*this.length;
};

```
* If the prototype property is set on a function, then Javascript knows to use it as a template or a blueprint of behaviour when creating objects.

* In other words, when you use the keyword new, then Javascript looks up the constructor you have provided. If the constructor has the property prototype, then it creates the object with the behaviour detailed in that property.

```javascript
let square = new Square(10);
console.log(square.getArea());
```


`What exactly is happening here? Let us break it down.`

 * new first creates an empty object.
 * new then binds the function Square to the empty object created in step 1.
 * It calls the newly bound function.

 ``follow the below code to if you want more clarity on it -``
 
```javascript
const myNew = function(constroctorFn,argument){
    let emptyObj = {};
    constroctorFn.call(emptyObj,argument);
    return emptyObj;
}

console.log(myNew(Square, 3));

```



## Understanding Bind

```javascript

const areaOfSquare=function() {
    return this.length * this.length;
}

let tile={length:10};
this.length=5;
let areaOfTile=areaOfSquare.bind(tile);

let tileArea=areaOfTile();
let squareArea=areaOfSquare();

console.log(tileArea);
console.log(squareArea);

```



* So, bind simply binds a function to a given object and when the function is called, all references to this in that function, will now point to the object.
* It is important to remember that bind returns a reference to a new function and doesn't change the original function at all.


## Creating custom objects with properties and behaviour

```javascript

circleMethods = {
    getArea: function(){
        return this.PI*this.radius*this.radius;
    },
    getPerimeter: function(){
        return 2*this.PI*this.radius;
    }
}
circle = function(radius){
    let PI = 22/7;
    this.PI = PI;
    this.radius = radius;
}
let createCircle = function(radius){
    let c = Object.create(circleMethods);
    circle.call(c,radius);
    return c;
};
let assembleCircle = function(radius){
    let c = {};
    circle.call(c,radius);
    Object.setPrototypeOf(c,circleMethods);
    return c;
}


let c = new circle(4);
console.log(c.radius);
console.log(c.getArea());
console.log(c.getPerimeter());

let customCircle = circle.create(3);
console.log(customCircle.radius);
console.log(c.getArea());
console.log(c.getPerimeter());


let assembledCircle = circle.assemble(7);
console.log(customCircle.radius);
console.log(assembledCircle.getArea());
console.log(c.getPerimeter());



```


## Classes in js

```javascript
class Circle {

    constructor(radius){
        let PI = 22/7;
        this.PI = PI;
        this.radius = radius;
    }

    getArea(){
        return this.PI*this.radius*this.radius;
    }

    getPerimeter(){
        return 2*this.PI*this.radius;
    }
}

let circle = new Circle(5);
console.log(circle.getArea());
console.log(circle.getPerimeter());

```
