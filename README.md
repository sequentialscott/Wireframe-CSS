#Wireframe.css

Wireframe.css is a CSS file you can use to make a page look like a hand sketched wireframe.  
It's intended for use with throw-away prototypes and is useful for exploring designs, usability 
testing, and early demos.  You can also use a set of Angular JavaScript directives if your prototype uses Angular.

##Installation
Download and unzip the repository, or install it with Bower: `bower install Wireframe-CSS`


##Using Wireframe.css
After installing, you can open the `starter.html` file and begin working with it - rename it as needed.  It contains 
links to the wireframe.css, directives.js, and starterController.js files.  If you don't want to work with Angular, you
can remove the links to the two JavaScript files.  If you are using Angular, the starter files use the controllerAs 
syntax and the general approach from John Papa: https://github.com/johnpapa/angular-styleguide

The `index.html` file is a style guide that both uses and documents wireframe.css. It is a simple Angular application, 
and you can choose options for most of the styles and see code that you can copy and paste.


##Updating the Style Guide
The HTML for each topic appears below the main part of the index.html page in a series of `<script type="ng/template">` tags.  (These load 
the HTML into the templateCache, which allows the page to work even if not served by a web server.)  To add a new topic:

1. Create a new `<script type="ng/template" id="topicTitle.html">` tag.
2. Copy the topic template from the comments at the end of the file and place it inside the new script tag.
3. Write the necessary HTML for the topic.
4. In the `styleguide.js` file, add an object to the styles array similar to this: `{ title: "Display Name", id: "topicTitle" }`. Be sure the id in this object matches the ID of the script tag.

The new topic should now be visible in the page and in the contents at the top of the page.