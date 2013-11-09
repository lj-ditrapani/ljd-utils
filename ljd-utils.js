/*global window, document, ljd*/
/** --------------------------------------------------------------------
 * Author:  Lyall Jonathan Di Trapani
 * Exports ljd
 */

(function () {
    'use strict';

    window.ljd = {};

    /** Displays message as a <li> item
     * message is the item to be output
     * label is the optional description to come before the message
     * The HTML file must have an <ul> element with the id "output_"
     * to be able to see the output
     * @param {String} message
     * @param {String} label
     */
    ljd.put = function (label, message) {
        if (!message) {
            message = label;
            label = "";
        } else {
            label += ": ";
        }
        ljd.add(ljd.put.getUl(), ljd.create("li", label + message));
    };

    ljd.put.getUl = function () {
        var ul = ljd.$('output_');
        if (!ul) {
            throw new Error("No <ul> with id='output_' ljd-utils " +
                            "function put() will not work");
        }
        return ul;
    };

    /** wraps document.getElementById; adds nodes as children of element
     * @param {String} id
     * @param {Array} nodes
     */
    ljd.$ = function (id, nodes) {
        return ljd.add(document.getElementById(id), nodes);
    };

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
        } else if (nodes && attributes &&
                   (typeof attributes === "object")) {
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

    /** Append a single node to the element
     * @param {HtmlElement} element
     * @param {node} node
     */
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

    ljd.setText = function (node, value) {
        ljd.removeAllChildren(node);
        return ljd.add(node, value.toString());
    };

    // Probably just use coffeescript instead with its built in #{}
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

    ljd.hasClass = function (el, cls) {
        var re = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        return el.className.match(re);
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
