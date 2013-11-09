# Author:  Lyall Jonathan Di Trapani -----------------------------------


module 'ljd'


test 'put', ->
    ul = ljd.create 'ul', {id: 'output_'}, []
    ljd.$('qunit-fixture', ul)
    message = 'Hello world!'
    ljd.put message
    list = ljd.$('output_')
    list_items = list.getElementsByTagName 'li'
    equal list_items.length, 1
    equal list_items[0].innerHTML, message
    message = 'Goodbye world!'
    ljd.put message
    list_items = list.getElementsByTagName 'li'
    equal list_items.length, 2
    equal list_items[1].innerHTML, message
    ul.parentElement.removeChild(ul)
    ul = null
    ljd.removeAllChildren(ljd.$('qunit-fixture'))
    ul = null


test 'put with missing <ul id="output_"></ul>', ->
    console.log ljd.$('output_')
    f = () -> 
        ljd.put('Hello world!')
    throws f, /No <ul> with id='output_'/, 'Ensure exception thrown'


test 'Remove all children', ->
    p_list = [ljd.create('p'), ljd.create('p'), ljd.create('p')]
    top_div = ljd.$('qunit-fixture', p_list)
    p_list = top_div.getElementsByTagName 'p'
    equal p_list.length, 3
    ljd.removeAllChildren top_div
    ok(not top_div.hasChildNodes())
    equal p_list.length, 0

