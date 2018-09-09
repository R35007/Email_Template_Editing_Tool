var editor = ace.edit("SourceView");


editor.setOptions({
    hScrollBarAlwaysVisible: false,
    vScrollBarAlwaysVisible: false,
    autoScrollEditorIntoView: true,
    fontSize: 16
})

editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/html");


editor.session.setValue("the new text here");
editor.insert("Something cool");


editor.session.on('change', function(delta) {
    // delta.start, delta.end, delta.lines, delta.action
    var a= editor.getValue();
    $('#DesignView').html(a);
});
