#Wireframe.css

Wireframe.css is a CSS file you can use to make a page look like a hand sketched wireframe.  
It's intended for use with throw-away prototypes and is useful for exploring designs, usability 
testing, and early demos.  You can also use a set of Angular JavaScript directives if your prototype uses Angular.

See the style guide for it, which also uses the CSS and JS at http://sequentialscott.github.io/Wireframe-CSS/

##Installation
Download and unzip the repository, or install it with Bower: `bower install Wireframe-CSS`


##Using Wireframe.css
After installing, you can open the `starter.html` file and begin working with it - rename it as needed.  It contains 
links to the wireframe.css, directives.js, and starterController.js files.  If you don't want to work with Angular, you
can remove the links to the two JavaScript files.  If you are using Angular, the starter files use the controllerAs 
syntax and the general approach from John Papa: https://github.com/johnpapa/angular-styleguide

The `index.html` file is a style guide that both uses and documents wireframe.css. It is a simple Angular application, 
and you can choose options for most of the styles and see code that you can copy and paste.

###What if I don't know Angular JS?
If you rename the `starter.html` file and leave all of the &lt;script&gt; tags in place at the top,  you can use
any of the Angular widgets that appear in the style guide, even if you don't do any additional JavaScript.  Angular lets 
you create new tags for HTML, as well as new attributes.  You'll see throughout the styleguide some extra attributes,
usually starting with 'wf-' on some of the HTML elements.  (Take a look at the Loading Indicator, for example.)  You
can use the Angular widgets by following the code snippets.

###OK, but what if I do know Angular JS?
Then you're in a position to make your mockup more interactive.  The `starterController.js` file defines the module and 
the controller.  Normally, best practice is to separate your modules, directives, and controllers into different files;
however, this is a tool for quick, throw-away prototypes.  It may work best to keep everything in one file - it really
depends on how much you're planning to do.


##Updating the Style Guide
The HTML for each topic appears below the main part of the index.html page in a series of `<script type="ng/template">` tags.  (These load 
the HTML into the templateCache, which allows the page to work even if not served by a web server.)  To add a new topic:

1. Create a new `<script type="ng/template" id="topicTitle.html">` tag.
2. Copy the topic template from the comments at the end of the file and place it inside the new script tag.
3. Write the necessary HTML for the topic.
4. In the `styleguide.js` file, add an object to the styles array similar to this: `{ title: "Display Name", id: "topicTitle" }`. Be sure the id in this object matches the ID of the script tag.

The new topic should now be visible in the page and in the contents at the top of the page.