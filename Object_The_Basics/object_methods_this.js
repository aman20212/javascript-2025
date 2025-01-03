let user = {
    name: "John",
    age: 30
};

user.sayHi = function () {
    alert("Hello!");
};

user.sayHi(); // Hello!

/* 
Here we’ve just used a Function Expression to create a function and assign it to the property user.sayHi of the object.
Then we can call it as user.sayHi(). The user can now speak!
A function that is a property of an object is called its method.
*/

// -----------------> Method shorthand
// There exists a shorter syntax for methods in an object literal:

user = {
    sayHi: function () {
        alert("Hello");
    }
};

// method shorthand looks better, right?
user = {
    sayHi() { // same as "sayHi: function(){...}"
        alert("Hello");
    }
};


// -----------------> “this” in methods

/*
It’s common that an object method needs to access the information stored in the object to do its job.
For instance, the code inside user.sayHi() may need the name of the user.
To access the object, a method can use the this keyword.
The value of this is the object “before dot”, the one used to call the method.*/
let user = {
    name: "John",
    age: 30,

    sayHi() {
        // "this" is the "current object"
        alert(this.name);
    }

};

user.sayHi(); // John

//Here during the execution of user.sayHi(), the value of this will be user.
//Technically, it’s also possible to access the object without this, by referencing it via the outer variable:
let user = {
    name: "John",
    age: 30,

    sayHi() {
        alert(user.name); // "user" instead of "this"
    }

};
//…But such code is unreliable. If we decide to copy user to another variable, e.g. admin = user and overwrite user with something else, then it will access the wrong object.
let user = {
    name: "John",
    age: 30,

    sayHi() {
        alert(user.name); // leads to an error
    }

};


let admin = user;
user = null; // overwrite to make things obvious

admin.sayHi(); // TypeError: Cannot read property 'name' of null
// ------------------------------------------------->

/* 
Calling without an object: this == undefined
We can even call the function without an object at all:
In this case this is undefined in strict mode. If we try to access this.name, there will be an error.
In non-strict mode the value of this in such case will be the global object (window in a browser, we’ll get to it later in the chapter Global object). This is a historical behavior that "use strict" fixes.
*/

// ----------------------------->

// Arrow functions have no “this”

/* 
Arrow functions are special: they don’t have their “own” this. If we reference this from such a function, it’s taken from the outer “normal” function.
For instance, here arrow() uses this from the outer user.sayHi() method:

*/

let user = {
    firstName: "Ilya",
    sayHi() {
        let arrow = () => alert(this.firstName);
        arrow();
    }
};

user.sayHi(); // Ilya



/*
Here the function makeUser returns an object.
What is the result of accessing its ref? Why

function makeUser() {
  return {
    name: "John",
    ref: this
  };
}

let user = makeUser();

alert( user.ref.name ); // What's the result?

Function Execution Context: When makeUser  is called, it executes in the global context (assuming it's not in strict mode). In non-strict mode, this refers to the global object (e.g., window in browsers).

Object Creation: The function returns an object with two properties:

name: set to "John".
ref: set to this, which, in this case, refers to the global object.
Accessing user.ref.name: When you do user.ref.name, you're trying to access the name property of the global object. In a typical browser environment, the global object does not have a name property defined, so user.ref.name evaluates to undefined.

Conclusion:
The alert will show undefined because user.ref is pointing to the global object (or undefined in strict mode), and the global object does not have a name property.

If you want ref to point to the user object itself, you can modify the function like this:
function makeUser () {
  return {
    name: "John",
    ref: null // Placeholder for now
  };
}

let user = makeUser ();
user.ref = user; // Now we set ref to point to the user object

alert(user.ref.name); // This will alert "John"

In this corrected version, ref is explicitly set to point to the user object after it has been created, allowing user.ref.name to correctly return "John".

*/

// --------------------------------->

/* 
Chaining
There’s a ladder object that allows you to go up and down:

let ladder = {
  step: 0,
  up() {
    this.step++;
  },
  down() {
    this.step--;
  },
  showStep: function() { // shows the current step
    alert( this.step );
  }
};

Now, if we need to make several calls in sequence, we can do it like this:
ladder.up();
ladder.up();
ladder.down();
ladder.showStep(); // 1
ladder.down();
ladder.showStep(); // 0

Modify the code of up, down, and showStep to make the calls chainable, like this:
ladder.up().up().down().showStep().down().showStep(); // shows 1 then 0

To make the methods up, down, and showStep chainable, you need to ensure that each method returns the ladder object itself (this). This allows you to call another method on the same object in a single expression.

let ladder = {
  step: 0,
  up() {
    this.step++;
    return this; // Return the object itself for chaining
  },
  down() {
    this.step--;
    return this; // Return the object itself for chaining
  },
  showStep: function() { // shows the current step
    alert(this.step);
    return this; // Return the object itself for chaining
  }
};

// Example usage:
ladder.up().up().down().showStep().down().showStep();

Returning this: In each of the methods (up, down, and showStep), we return this. This is crucial because this refers to the current object (ladder in this case). By returning this, we allow the next method in the chain to be called on the same object.

In JavaScript, the keyword this refers to the context in which a function is executed. When you call a method on an object, this inside that method refers to the object that the method was called on. Let's break this down further to clarify why this refers to the object itself in the context of your ladder object.
*/