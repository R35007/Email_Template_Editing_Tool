/*eslint-disable no-unused-vars*/
/* eslint-env browser */
/* global document */
/*global $*/
/*eslint no-console:  ["error", { allow: ["warn", "error", "log","no-used-vars"] }] */
$('#DragDiv').draggable({
    cursor: "move",
    revert: true,
    helper: "clone"
});

callDroppable("demoDIV");

function callDroppable(x) {
    $('#' + x).droppable({
        accept: "#DragDiv",
        greedy: true,
        drop: function (event, ui) {

            var draggable = ui.draggable.clone();
            var count = 0;
            var getout;
            var myid;
            do {
                if (count > 0)
                    myid = prompt("The given Id already Exist. Please enter an Uniqui Id", "");
                else
                    myid = prompt("Please enter an Uniqui Id", "");

                if (myid == "" || myid == null || myid.length == 0) {
                    getout = true;
                } else if ($("#" + myid).length == 0) {
                    getout = true;
                    myid = myid.replace(" ", "");
                    draggable.attr('id', myid);

                    draggable.removeClass('DragDiv');
                    draggable.css({
                        "background-color": "#ffff00",
                        "border": "1px solid black",
                        "padding": "15px",
                        "color": "#000000"
                    })

                    $('#padding').val('15px');
                    $('#background-color').val('#ffff00');
                    $('#background-color_').val('#ffff00');
                    $('#color').val('#000000');
                    $('#color_').val('#000000');
                    $('#border').val('1px solid black');



                    //var myid='myPlaydiv' + count;
                    var opt = "<option value='" + myid + "'>" + myid + "</option>"
                    $("#myDivids").append(opt);
                    $("#myDivids").val(myid);
                    draggable.text(myid);


                    $(this).append(draggable);
                    draggable.on("click", function () {
                        $("#myDivids").val(this.id);
                        ShowStyle();
                    });
                    draggable.sortable({});
                    callDroppable(myid);

                    ShowStyle();
                } else if ($("#" + myid).length > 0) {
                    count++;
                    getout = false;
                } else {
                    getout = true;
                }
            }
            while (getout != true)
        }
    });
}

$("#demoDIV").sortable({});
