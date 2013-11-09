/*global window, document, ljd*/
/** ------------------------------------------------------------------------
 * Author:  Lyall Jonathan Di Trapani
 * Exports ljd
 */

(function () {
    'use strict';

    window.ljd = {};

    /** Displays out as <li> item
     * out is the item to be output
     * Message is the optional description to come before the "out"
     * The HTML file must have an <ul> element with the id "output_"
     * to be able to see the output
     * @param {String} out
     * @param {String} message
     */
    ljd.put = function (message, out) {
        if (!out) {
            out = message;
            message = "";
        } else {
            message += ": ";
        }
        ljd.add(ljd.put.getOutputUl(), ljd.create("li", message + out));
    };

    ljd.put.getOutputUl = function () {
        if (!ljd.put.outputUl) {
            if (ljd.$("output_")) {
                ljd.put.outputUl = ljd.$("output_");
            } else {
                throw new Error("No <ul> with id='output_' Utils function" +
                                " ljd.put() will not work");
            }
        }
        return ljd.put.outputUl;
    };


    /** wraps document.getElementById, saves elements in cache
     * @param {String} id
     * @param {Array} nodes
     */
    ljd.$ = function (id, nodes) {
        if (!ljd.$.cache[id]) {
            ljd.$.cache[id] = document.getElementById(id);
        }
        return ljd.add(ljd.$.cache[id], nodes);
    };

    ljd.$.cache = {};


    /** Creates an element of type "tagName" and assigns it any supplied 
     * attributes and appends all nodes in the array nodes
     * @param {String} tagName
     * @param {Object} attributes (most optional)
     * @param {array} nodes (optional)
     * Alternative calling:
     * ljd.create(tagName)
     * ljd.create(tagName, nodes)
     */
    ljd.create = function (tagName, attributes, nodes) {
        var prop, newElement = document.createElement(tagName);
        if (!nodes && attributes) {
            nodes = attributes;
            attributes = null;
        } else if (nodes && attributes && (typeof attributes === "object")) {
            for (prop in attributes) {
                if (attributes.hasOwnProperty(prop)) {
                    newElement[prop] = attributes[prop];
                }
            }
        }
        if (nodes) {
            return ljd.add(newElement, nodes);
        }
        return newElement;
    };

    /** Creates a textNode containing text 
     * @param {string} text
     */
    ljd.t = function (text) {
        return document.createTextNode(text.toString());
    };

    function addOne(element, node) {
        if (typeof node === "string") {
            node = ljd.t(node);
        }
        element.appendChild(node);
    }

    /** Appends all nodes in array to the element
     * If a node is a string, it creates a textNode 
     * around it before appending
     * @param {HtmlElement} element
     * @param {Array} nodes
     */
    ljd.add = function (element, nodes) {
        var i;
        if (nodes instanceof Array) {
            for (i = 0; i < nodes.length; i += 1) {
                addOne(element, nodes[i]);
            }
        } else if (nodes) {
            addOne(element, nodes);
        }
        return element;
    };

    /** removes all children from the node 
     * @param {HtmlElement} node
     */
    ljd.removeAllChildren = function (node) {
        if (node.hasChildNodes()) {
            while (node.childNodes.length >= 1) {
                node.removeChild(node.firstChild);
            }
        }
        return node;
    };

    ljd.set_text = function (node, value) {
        ljd.removeAllChildren(node);
        ljd.add(node, value.toString());
    };

    // Probably just use coffeescript instead with its built in #{} format
    /*
    String.prototype.format = function(){
        var pattern = /\{\d+\}/g;
        var args = arguments;
        var f = function(capture){ return args[capture.match(/\d+/)]; };
        return this.replace(pattern, f);
    }
    */

    String.prototype.format = function () {
        var args = arguments;
        function f(match, number) {
            if (typeof args[number] !== 'undefined') {
                return args[number];
            }
            return match;
        }
        return this.replace(/{(\d+)}/g, f);
    };

    /*
    String.prototype.format = function() {
      var args = arguments;
      return this.replace(/{(\d+)}/g, function(match, number) { 
        return typeof args[number] != 'undefined'
          ? args[number]
          : match
        ;
      });
    };
    */

    ljd.hasClass = function (el, cls) {
        return el.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    };

    ljd.addClass = function (el, cls) {
        if (!ljd.hasClass(el, cls)) {
            el.className += " " + cls;
        }
    };

    ljd.removeClass = function (el, cls) {
        if (ljd.hasClass(el, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            el.className = el.className.replace(reg, ' ');
        }
    };

}());
