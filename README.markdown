ljd-utils.js
=============

Author:  Lyall Jonathan Di Trapani

A small collection of simple, basic JavaScript utility functions.

Exports a single global name, `ljd`.  All functions are hidden in the `ljd` name-space.  Also, adds format function to String type.


Functions
---------
- **put(label, message)**  Displays message as a `<li>` item
    * message is the item to be output
    * label is the optional description to come before the message
    * The HTML file must have an `<ul>` element with the id "`output_`"
      to be able to see the output
    * @param {String} message
    * @param {String} label
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


TO DO
------

- Rewrite in CoffeeScript?
- Use literate CoffeeScript?
