/*eslint-disable no-unused-vars*/
/* eslint-env browser */
/* global document */
/*global $*/
/*eslint no-console:  ["error", { allow: ["warn", "error", "log","no-used-vars"] }] */

var mytempsrc = new Array();

$('[id*="Elem"]').draggable({
    appendTo: "body",
    containment: "window",
    cursor: "move",
    revert: true,
    helper: "clone",
    scroll: false
});


callDroppable("#DesignView");
function callDroppable(x) {
    $(x).droppable({
        accept: '[id*="Elem"], .MyThumbnail',
        greedy: true,
        drop: function (event, ui) {
            var thisdroppable = true;
            var draggable,myTemp,myurl,myimg;
            
            if (ui.draggable.hasClass('MyThumbnail')) {
                console.log(ui.draggable.find('img').attr('src').toLocaleLowerCase());
                console.log(ui.draggable.find('img').attr('src').toLocaleLowerCase().indexOf('http'));
                if(ui.draggable.find('img').attr('src').toLocaleLowerCase().indexOf('http')>=0){
                    myimg = ui.draggable.find('img').attr('src');
                    var myalttext = ui.draggable.find('p').text();
                    draggable = $('<img src="'+myimg+'" alt="' + myalttext + '">');
                    
                    if($(this).prop('tagName').toLowerCase()=="img"){
                        var mysrc = myimg;
                        $(this).attr('src',mysrc);
                        return;
                    }
                    else
                        $(this).append(draggable);
                }else{
                    myimg = ui.draggable.find('p').text();
                    draggable = $('<img src="images/' + myimg + '" alt="' + myimg + '">');
                    if($(this).prop('tagName').toLowerCase()=="img"){
                        var mysrc = 'images/' + myimg;
                        $(this).attr('src',mysrc);
                        return;
                    }
                    else
                        $(this).append(draggable);
                }
                    
            } 
            else if (ui.draggable.hasClass('MyTemplate')) {
                myTemp = ui.draggable.text().replace(/\s/g,'\%20');
                //$(this).load('templates/'+templateFolder.replace(/\s/g,"\%20")+'/'+ myTemp);
                $('#DesignView').children().remove();
                myurl ='templates/'+templateFolder.replace(/\s/g,"\%20")+'/'+ myTemp;
                $.ajax({
                    type:'GET',
                    url : myurl,
                    async:false,
                    success:function(data){
                        draggable = data;
                    }
                });
                $('#DesignView').append(draggable);
                
                $('#DesignView').children().find('img').each(function(){
                    mytempsrc.push($(this).attr('src'));
//                    console.log($(this).attr('src'));
//                    var myCard = $('<div id="Elem_img_'+$(this).attr('alt')+'"class="MyThumbnail bg-white border-0"> <img src="'+$(this).attr('src')+'" alt="'+$(this).attr('alt')+'" class="img-thumbnail"> <p class="card-title text-center">'+$(this).attr('alt')+'</p> </div>');
//                    $("#Images").append(myCard);
//                    $(myCard).draggable({
//                        appendTo:"body",
//                        containment:"window",
//                        cursor: "move",
//                        revert: true,
//                        helper: "clone",
//                        scroll:false
//                    });
                })
                
            }
            else if (ui.draggable.hasClass('MyBs4Template')) {
                myTemp = ui.draggable.text().replace(/\s/g,'\%20');
                myurl ='Bootstrap4Components/' + myTemp;
                
                $.ajax({
                    type:'GET',
                    url : myurl,
                    async:false,
                    success:function(data){
                        draggable = data;
                    }
                });
                $(this).append(draggable);
            } 
            else {
                draggable = $("#Drag" + ui.draggable.attr('id')).clone();
                draggable.removeAttr('id');
                $(this).append(draggable);
                draggable.trigger('click');
                var elemId = ui.draggable.attr('id');

            }
            
            
            callDroppable('#DesignView *');

            
            for (var i = 0; i < $('form').length; i++) {
                $('form')[i].reset();
            }

        }
    });
}
