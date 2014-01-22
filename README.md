# app-test

> prototype of the seat finder

## Getting Started
Before anything taking its part, you should install [node](http://nodejs.org) and "cortex".

#### Install Node

Visit [http://nodejs.org](http://nodejs.org), download and install the proper version of nodejs.

#### Install Cortex

    # maybe you should use `sudo`
    npm install -g cortex

## Using app-test In Your Project

First, install 'app-test' directly with `cortex install` (recommended)
	
	cortex install app-test --save
	
or, you could update your package.json manually
    
    dependencies: {
        'app-test': '<version-you-want>'
    }
    
and install dependencies
	
	cortex install
    
Then, use `require` method in your module
    
    var app-test = require('app-test');
    
Finally, start cortex server
    
    cortex server
    
Then cortex will care all the rest.


## API Documentation

### app-test: constructor
': constructor' means the `module.exports` of module 'app-test' is a constructor that we should use it with the `new` keyword

	new app-test(options)
	
#### options
- options.name {String}



### app-test.\<method-name\>(arguments)
Means this is a static method of `module.exports`

#### arguments
// arguments description here

### .\<method-name\>(arguments)
Mean this is a method of the instance

#### arguments
// arguments description here