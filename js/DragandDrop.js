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
            var title=draggable.prop("tagName").toLowerCase()+" #"+draggable.attr('id')+" ."+draggable.attr('class');
            draggable.attr('title',title);
            var elemId = ui.draggable.attr('id');
            if (elemId.indexOf("Input") >= 0) {
                thisdroppable = false
            }
            $(this).append(draggable);
            for (var i = 0; i < $('form').length; i++) {
                $('form')[i].reset();
            }
            draggable.sortable({});
            draggable.trigger('click');
            if (thisdroppable == true) {
                callDroppable(draggable);
            }
        }
    });
}

$("#Footer-Form").droppable({
    accept: '.removeIt',
    greedy: true,
    drop: function (event, ui) {
        var thisdivid = ui.draggable.attr("id");
        var array = new Array();
        $("#" + thisdivid).find("*").each(function () {
            array.push($(this).attr('id'));
        });
        console.log(array);
        for (var i in array) {
            $('#myDivids option[value=' + array[i] + ']').remove();
        }
        $('#myDivids option[value=' + thisdivid + ']').remove();
        $("#" + thisdivid).remove();

        $("#selector").val($("#myDivids").val());
        $("#Inline-Styles").html("");
        for (var j = 0; j < $('form').length; j++) {
            $('form')[j].reset();
        }
        ui.draggable.remove();
    }
});

$("#DesignView").sortable({});
$("ul").sortable({});
