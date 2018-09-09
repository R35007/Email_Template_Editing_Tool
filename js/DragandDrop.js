/*eslint-disable no-unused-vars*/
/* eslint-env browser */
/* global document */
/*global $*/
/*eslint no-console:  ["error", { allow: ["warn", "error", "log","no-used-vars"] }] */
$('[id*="Elem"]').draggable({
    appendTo:"body",
    containment:"window",
    cursor: "move",
    revert: true,
    helper: "clone",
    scroll:false
});

callDroppable("#DesignView");

function callDroppable(x) {
    $(x).droppable({
        accept: '[id*="Elem"]',
        greedy: true,
        drop: function (event, ui) {
            var thisdroppable=true;
            var draggable = $("#Drag" + ui.draggable.attr('id')).clone();
            draggable.attr('id',"");
            var elemId = ui.draggable.attr('id');
            if (elemId.indexOf("Input") >= 0) {
                thisdroppable = false
            }
            $(this).append(draggable);
            for (var i = 0; i < $('form').length; i++) {
                $('form')[i].reset();
            }
            draggable.trigger('click');
            if (thisdroppable == true) {
                callDroppable(draggable);
            }
            
            var thistagname = draggable.children().prop('tagName');
            
            if(typeof thistagname!=="undefined"){
                if(thistagname.toLowerCase()=="li"){
                    callDroppable(draggable.children());
                }    
            }
            
        }
    });
}

