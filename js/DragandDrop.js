/*eslint-disable no-unused-vars*/
/* eslint-env browser */
/* global document */
/*global $*/
/*eslint no-console:  ["error", { allow: ["warn", "error", "log","no-used-vars"] }] */
$('.DragElem').draggable({
    cursor: "move",
    revert: true,
    helper: "clone"
});

callDroppable("demoDIV");

function callDroppable(x) {
    $('#' + x).droppable({
        accept: '[id*="Elem"]',
        greedy: true,
        drop: function (event, ui) {

            var draggable = $("#Drag"+ui.draggable.attr('id')).clone();
            var count = 0;
            var getout;
            var myid;
            var thisdroppable=true;
            do {
                
                if (count > 0)
                    myid = prompt("The given Id already Exist. Please enter an Uniqui Id", "");
                else
                    myid = prompt("Please enter an Uniqui Id", "");
                
                if (myid == "" || myid == null || myid.length == 0) 
                    getout = true;
                else if ($("#" + myid).length > 0) {
                    count++;
                    getout = false;
                } 
                else if ($("#" + myid).length == 0) {
                    
                    var elemId=ui.draggable.attr('id');
                    if(elemId.indexOf("Input") >= 0){
                        thisdroppable=false
                    }
                    myid = myid.replace(" ", "");
                    draggable.attr('id', myid);
                    draggable.addClass("removeIt");
                    
                    $(this).append(draggable);
                    

                    var opt = "<option value='" + myid + "'>" + myid + "</option>"
                    $("#myDivids").append(opt);
                    $("#myDivids").val(myid);
                    $("#selector").val(myid);


                    for (var i = 0; i < $('form').length; i++) {
                        $('form')[i].reset();
                    }
                    
                    draggable.on("click", function () {
                        $("#myDivids").val(this.id);
                        $("#selector").val(this.id);
                        ShowStyle();
                        for (var j = 0; j < $('form').length; j++) {
                            $('form')[j].reset();
                        }
                    });
                    
                    draggable.sortable({});
                    
                    if (thisdroppable==true){
                        callDroppable(myid);
                    }
                   
                    ShowStyle();
                    
                    getout = true;
                
                }else {
                    getout = true;
                }
            }
            while (getout != true)
        }
    });
}

$("#removeElement").droppable({
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
            $("#inlinestyles").html("");
            for (var j = 0; j < $('form').length; j++) {
                $('form')[j].reset();
            }
            ui.draggable.remove();
        }
});
                         
$("#demoDIV").sortable({});
$("ul").sortable({});

