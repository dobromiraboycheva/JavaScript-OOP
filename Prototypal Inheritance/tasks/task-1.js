/* Task Description */
/*
* Create an object domElement, that has the following properties and methods:
  * use prototypal inheritance, without function constructors
  * method init() that gets the domElement type
    * i.e. `Object.create(domElement).init('div')`
  * property type that is the type of the domElement
    * a valid type is any non-empty string that contains only Latin letters and digits
  * property innerHTML of type string
    * gets the domElement, parsed as valid HTML
	  * <type attr1="value1" attr2="value2" ...> .. content / children's.innerHTML .. </type>
  * property content of type string
    * sets the content of the element
    * works only if there are no children
  * property attributes
    * each attribute has name and value
    * a valid attribute has a non-empty string for a name that contains only Latin letters and digits or dashes (-)
  * property children
    * each child is a domElement or a string
  * property parent
    * parent is a domElement
  * method appendChild(domElement / string)
    * appends to the end of children list
  * method addAttribute(name, value)
    * throw Error if type is not valid
 * Method `removeAttribute(attribute)`
    * `throw Error` if attribute does not exist in the 


/* Example

var meta = Object.create(domElement)
	.init('meta')
	.addAttribute('charset', 'utf-8');

var head = Object.create(domElement)
	.init('head')
	.appendChild(meta)

var div = Object.create(domElement)
	.init('div')
	.addAttribute('style', 'font-size: 42px');

div.content = 'Hello, world!';

var body = Object.create(domElement)
	.init('body')
	.appendChild(div)
	.addAttribute('id', 'cuki')
	.addAttribute('bgcolor', '#012345');

var root = Object.create(domElement)
	.init('html')
	.appendChild(head)
	.appendChild(body);

console.log(root.innerHTML);
Outputs:
<html><head><meta charset="utf-8"></meta></head><body bgcolor="#012345" id="cuki"><div style="font-size: 42px">Hello, world!</div></body></html>
*/

function solve() {
    var domElement = (function () {

        var domElement = {
            init: function (type) {
                this.type = type;
                this.content = '';
                this.parent;
                this.children = [];
                this.attributes = [];

                return this;

            },
            appendChild: function (child) {
                this.children.push(child);

                if (typeof child === 'object') {
                    child.parent = this;
                }

                return this;
            },
            addAttribute: function (name, value) {
                nameValidator(name);
                this.attributes[name] = value;

                return this;

            },
            removeAttribute: function (attribute) {
                if (this.attributes[attribute] !== undefined) {
                    delete this.attributes[attribute];
                } else {
                    throw new Error('NO such attribute');
                }
                return this;
            },
            get innerHTML() {
                var currentInnerHtml = '<' + this.type;
                var attringbutesToSting = sortedAttributes(this.attributes);
                currentInnerHtml += attringbutesToSting + '>';

                var child;
                for (var i = 0; i < this.children.length; i++) {
                    child = this.children[i];

                    if (typeof child === 'string') {
                        currentInnerHtml += child;
                    } else {
                        currentInnerHtml += child.innerHTML;
                    }
                }

                currentInnerHtml += this.content;
                currentInnerHtml += '</' + this.type + '>';

                return currentInnerHtml;
            },
            get type() {
                return this._type;
            },
            set type(value) {
                isValidType(value);

                this._type = value;
            },
            get content() {
                if (this.children.length) {
                    return '';
                }

                return this._content;
            },
            set content(value) {
                this._content = value;
            },
            get parent() {
                return this._parent;
            },
            set parent(value) {
                this._parent = value;
            },
            get children() {
                return this._children;
            },
            set children(value) {
                this._children = value;
            },
            get attributes() {
                return this._attributes;
            },
            set attributes(value) {
                this._attributes = value;
            }

        };

        return domElement;

        function isValidType(type) {
            if (typeof type !== 'string') {
                throw new Error('Type of argument must be sting');
            }

            if (!(/^[A-Z0-9]+$/i.test(type))) {
                throw new Error('Invalid type');
            }
        }

        function nameValidator(name) {
            if (typeof name !== 'string') {
                throw new Error('Invalid type of name');
            }

            if (!(/^[A-Z0-9\-]+$/i.test(name))) {
                throw new Error('Invalid name');
            }
        }

        function sortedAttributes(attributes) {
            var attringbutesToSting = '',
                keys = [];

            for (var key in attributes) {
                keys.push(key);
            }

            keys.sort();
            var currentKey;

            for (var i = 0; i < keys.length; i++) {
                currentKey = keys[i];
                attringbutesToSting += ' ' + currentKey + '="' + attributes[currentKey] + '"';
            }

            return attringbutesToSting;
        }
    }());
    return domElement;
}

module.exports = solve;
