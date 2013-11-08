/** Author:  Lyall Jonathan Di Trapani
 * Displays Out as <li> item
 * Out is the item to be output
 * Message is the optional description to come before the "out"
 * The HTML file must have an <ul> element with the id "output_"
 * to be able to see the output
 * @param {String} out
 * @param {String} message
 */
var addOut = function(out, message)
{
	if(!message)
		message = "";
	else
		message += ": ";
	add(addOut.getOutputUl(), [create("li", {}, [message + out])]);
}

addOut.getOutputUl = function()
{
	if(!addOut.outputUl)
	{
		if($("output_"))
			addOut.outputUl = $("output_");
		else
			throw new Error("No <ul> with id='output_' Utils function addOut() will not work");
	}
	return addOut.outputUl;
}

/** wraps document.getElementById, saves elements in cache
 * @param {String} id
 * @param {Array} nodes
 */
function $(id, nodes)
{
	if (!$.cache[id])
	{
		$.cache[id] = document.getElementById(id);
	}
	return add($.cache[id], nodes);
}

$.cache = {};

/** Creates an element of type "tagName" and assigns it any supplied attributes
 * and appends all nodes in the array nodes
 * @param {String} tagName
 * @param {Object} attributes
 * @param {array} nodes
 */
function create(tagName, attributes, nodes)
{
	var newElement = document.createElement(tagName);
	if(attributes && (typeof(attributes) === "object"))
	{
		for(var i in attributes)
		{
			newElement[i] = attributes[i];
		}
	}
    if(nodes)
        return add(newElement, nodes)
	return newElement;
}

/** Creates a textNode containing text 
 * @param {string} text
 */
function t(text)
{
	return document.createTextNode(text);
}

/** Appends all nodes in array to the element
 * If a node is a string, it creates a textNode 
 * around it before appending
 * @param {HtmlElement} element
 * @param {Array} nodes
 */
function add(element, nodes)
{
	for(var i in nodes)
	{
		var node = nodes[i];
		if(typeof(node) === "string")
			node = t(node);
		element.appendChild(node);
	}
	return element;
}

/** removes all children from the node 
 * @param {HtmlElement} node
 */
function removeAllChildren(node)
{
	if(node.hasChildNodes())
	{
   		while(node.childNodes.length >= 1)
    	{
       		node.removeChild(node.firstChild);       
    	}
	}
	return node;
}

String.prototype.format = function(){
    var pattern = /\{\d+\}/g;
    var args = arguments;
    return this.replace(pattern, function(capture){return args[capture.match(/\d+/)];});
}

function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
    if (!this.hasClass(ele,cls)) ele.className += " "+cls;
}
function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}
