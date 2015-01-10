# Author:  Lyall Jonathan Di Trapani -----------------------------------


module 'ljd'


test '$ (get and add function)', ->
  pList = [ljd.create('p'), ljd.create('p'), ljd.create('p')]
  ljd.$ 'qunit-fixture', pList
  topDiv = document.getElementById 'qunit-fixture'
  pList = topDiv.getElementsByTagName 'p'
  equal pList.length, 3


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


test 'Remove all children', ->
  pList = [ljd.create('p'), ljd.create('p'), ljd.create('p')]
  topDiv = ljd.$ 'qunit-fixture', pList
  pList = topDiv.getElementsByTagName 'p'
  equal pList.length, 3
  ljd.removeAllChildren topDiv
  ok not topDiv.hasChildNodes()
  equal pList.length, 0


test 'setText', ->
  topDiv = ljd.$ 'qunit-fixture', 'hello'
  equal topDiv.innerHTML, 'hello'
  ljd.setText(topDiv, 'bye')
  equal topDiv.innerHTML, 'bye'
  ljd.setText topDiv, [1, 2, 3]
  equal topDiv.innerHTML, '1,2,3'


test 'Sting.format', ->
  equal '{0}:{1}'.format('key', 'value'), 'key:value'
  equal '{1}-{0}-{2}-{0}-{3}'.format('|', 'a', 'b', 'c'), 'a-|-b-|-c'


module 'ljd CSS class',
  setup: ->
    @p = ljd.create('p', {className: 'p-class'}, [])
    @topDiv = ljd.$('qunit-fixture', @p)


test 'hasClass', ->
  ok not ljd.hasClass(@topDiv, 'p-class')
  ok ljd.hasClass(@p, 'p-class')


test 'addClass', ->
  ok not ljd.hasClass(@topDiv, 'd-class')
  ljd.addClass(@topDiv, 'd-class')
  ok ljd.hasClass(@topDiv, 'd-class')
  ljd.addClass(@topDiv, 'p-class')
  ok ljd.hasClass(@topDiv, 'd-class')
  ok ljd.hasClass(@topDiv, 'p-class')


test 'removeClass 1 class', ->
  ok ljd.hasClass(@p, 'p-class')
  ljd.removeClass(@p, 'p-class')
  ok not ljd.hasClass(@p, 'p-class')
  equal @p.className, ''


test 'removeClass 3 classes', ->
  ljd.addClass(@p, 'q-class')
  ljd.addClass(@p, 'r-class')
  ok ljd.hasClass(@p, 'p-class')
  ok ljd.hasClass(@p, 'q-class')
  ok ljd.hasClass(@p, 'r-class')
  equal @p.className, 'p-class q-class r-class'
  ljd.removeClass(@p, 'p-class')
  ok not ljd.hasClass(@p, 'p-class')
  ok ljd.hasClass(@p, 'q-class')
  ok ljd.hasClass(@p, 'r-class')
  equal @p.className, 'q-class r-class'
  ljd.removeClass(@p, 'q-class')
  ok not ljd.hasClass(@p, 'p-class')
  ok not ljd.hasClass(@p, 'q-class')
  ok ljd.hasClass(@p, 'r-class')
  equal @p.className, 'r-class'

