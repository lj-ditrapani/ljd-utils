# Author:  Lyall Jonathan Di Trapani -----------------------------------


module 'ljd'


test 'put', ->
    ul = ljd.create 'ul', {id: 'output_'}, []
    ljd.$ 'qunit-fixture', ul
    message = 'Hello world!'
    ljd.put message
    list = ljd.$ 'output_'
    listItems = list.getElementsByTagName 'li'
    equal listItems.length, 1
    equal listItems[0].innerHTML, message
    message = 'Goodbye world!'
    ljd.put message
    listItems = list.getElementsByTagName 'li'
    equal listItems.length, 2
    equal listItems[1].innerHTML, message
    ul.parentElement.removeChild ul
    ul = null
    ljd.removeAllChildren ljd.$('qunit-fixture')
    ul = null


test 'put with missing <ul id="output_"></ul>', ->
    throws ( -> ljd.put('x')), /No <ul> with id='output_'/


test '$ (get and add function)', ->
    pList = [ljd.create('p'), ljd.create('p'), ljd.create('p')]
    ljd.$ 'qunit-fixture', pList
    topDiv = document.getElementById 'qunit-fixture'
    pList = topDiv.getElementsByTagName 'p'
    equal pList.length, 3


test 'Remove all children', ->
    pList = [ljd.create('p'), ljd.create('p'), ljd.create('p')]
    topDiv = ljd.$ 'qunit-fixture', pList
    pList = topDiv.getElementsByTagName 'p'
    equal pList.length, 3
    ljd.removeAllChildren topDiv
    ok not topDiv.hasChildNodes()
    equal pList.length, 0


test 'create', ->
    span1 = ljd.create 'span1'
    equal span1.attributes.length, 0, 'span1 no attributes'
    equal span1.innerHTML, '', 'span1 no innerHTML'
    span2 = ljd.create 'span', 'hello'
    equal span2.attributes.length, 0, 'span2 no attributes'
    equal span2.innerHTML, 'hello', 'span2 innerHTML "hello"'
    p2 = ljd.create 'p', span2
    equal p2.attributes.length, 0, 'p2 no attributes'
    equal p2.innerHTML, '<span>hello</span>', 'p2 innerHTML'
    p3 = ljd.create 'p', 'hello', [span2, ' there']
    equal p3.attributes.length, 0, 'p3 no attributes'
    equal p3.innerHTML, '<span>hello</span> there', 'p3 innerHTML'
    attrs = {id: 'cat', className: 'dog'}
    p4 = ljd.create 'p', attrs, [span2, ' there']
    equal p4.attributes.length, 2, 'p4 2 attributes'
    deepEqual [p4.id, p4.className], ['cat', 'dog'], 'p4 attributes'
    equal p4.innerHTML, '<span>hello</span> there', 'p4 innerHTML'


test 'setText', ->
    topDiv = ljd.$ 'qunit-fixture', 'hello'
    equal topDiv.innerHTML, 'hello'
    ljd.setText(topDiv, 'bye')
    equal topDiv.innerHTML, 'bye'
    ljd.setText topDiv, [1, 2, 3]
    equal topDiv.innerHTML, '1,2,3'
