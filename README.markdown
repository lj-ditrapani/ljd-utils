ljd-utils.js
========================================================================

Author:  Lyall Jonathan Di Trapani

A small collection of simple, basic JavaScript utility functions.

Exports a single global name, `ljd`.  All functions are hidden in the 
`ljd` name-space.  Also, adds format function to String type.


Functions
------------------------------------------------------------------------
- **$(id, nodes)**  wraps document.getElementById; adds nodes as 
  children of element
    * @param {String} id
    * @param {Array} nodes
- **create(tagName, attributes, nodes)** Creates an element 
  of type "tagName" and assigns it any supplied attributes and appends 
  all nodes in the array nodes
    * @param {String} tagName
    * @param {Object} attributes (most optional)
    * @param {array} nodes (optional)
    * Alternative calling:
        + ljd.create(tagName)
        + ljd.create(tagName, nodes)
- **removeAllChildren(node)** removes all children from the node 
    * @param {HtmlElement} node
- **setText** Removes all children from node and adds the string 
  representation of value as a textNode child of node
- **String.format(arguments...)**  Add python style format function to
  JavaScript string class
- **hasClass(el, cls)** true if HTML element el has class cls, else 
  false
- **addClass(el, cls)** Adds class cls to HTML element el
- **removeClass(el, cls)** Removes class cls from HTML element el


Tests
------------------------------------------------------------------------
Tests (specs) are written in [qUnit](http://qunitjs.com/).  You will
need the qunit.js and qunit.css files to run the tests.  Just place them
in the same directory as the spec.html file and open the spec.html file
in a web browser.


TO DO
------------------------------------------------------------------------

- Rewrite in CoffeeScript?
- Use literate CoffeeScript?  Or docco?  Or Codo?  Or CoffeeDoc
- Add minify to process
- Auto generate documentation from source
- package-dev-support.sh to create ljd-utils-dev-support.zip; put on 
  ditrapani.info/dev-resources
- create ljd-utils.js (from coffee once translated) and put on 
  ditrapani.info/resources
