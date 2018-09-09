/*eslint-disable no-unused-vars*/
/* eslint-env browser */
/* global document */
/*global $*/
/*eslint no-console:  ["error", { allow: ["warn", "error", "log","no-used-vars"] }] */


var templateFolder = "General",
    mytempsrc;

$('#Toogle-Templates').on('click', function () {
    var dir = "templates";
    var fileextension = ".";
    $("#Folders").children().remove();
    var active = true,
        setclass;
    $.ajax({
        url: dir,
        success: function (data) {
            $(data).find("a[href*='templates\']:not(a[href*='/'],a:contains(" + fileextension + "),a:contains('templates'))").each(function () {

                if (active)
                    setclass = 'folder activeTab';
                else
                    setclass = 'folder';

                $('#Folders').append('<div class="' + setclass + '">' + $(this).text() + '</div>');
                active = false;
            });
        }
    });
})


$('#Folders').on('click', '.folder', function () {
    templateFolder = $(this).text();
    $('.folder').removeClass('activeTab');
    $(this).addClass('activeTab');
    var dir = "templates/" + $(this).text();
    var fileextension = ".html";
    $("#Htmls").children().remove();
    $.ajax({
        url: dir,
        success: function (data) {
            $(data).find("a:contains(" + fileextension + ")").each(function () {
                var filename = $(this).text();
                var myTemplate = $('<div id="Elem_template_' + filename.replace('.html', '') + '" class="DragElem MyTemplate">' + filename + '</div>');
                $("#Htmls").append(myTemplate);
                $(myTemplate).draggable({
                    appendTo: "body",
                    containment: "window",
                    cursor: "move",
                    revert: true,
                    helper: "clone",
                    scroll: false
                });
            });
        }
    });
})

$('#Toogle-Images').on('click', function () {
    var dir = "templates/" + templateFolder + "/images";
    var fileextension1 = ".jpg";
    var fileextension2 = ".png";
    $("#Images").children().remove();
    $.ajax({
        url: dir,
        success: function (data) {
            $(data).find("a:contains(" + fileextension1 + "),a:contains(" + fileextension2 + ")").each(function () {
                var filename = $(this).text();
                var myCard = $('<div id="Elem_img_' + filename + '"class="MyThumbnail bg-white border-0"> <img src="templates/' + templateFolder + '/images/' + filename + '" alt="' + filename + '" class="img-thumbnail"> <p class="card-title text-center">' + filename + '</p> </div>');
                $("#Images").append(myCard);
                $(myCard).draggable({
                    appendTo: "body",
                    containment: "window",
                    cursor: "move",
                    revert: true,
                    helper: "clone",
                    scroll: false
                });
            });
        }
    });

    if (mytempsrc.length > 0) {
        for (var i in mytempsrc) {
            var myCard = $('<div id="Elem_img_' + i + '"class="MyThumbnail bg-white border-0"> <img src="' + mytempsrc[i] + '" alt="img_' + i + '" class="img-thumbnail"> <p class="card-title text-center">img_' + i + '</p> </div>');
            $("#Images").append(myCard);
            $(myCard).draggable({
                appendTo: "body",
                containment: "window",
                cursor: "move",
                revert: true,
                helper: "clone",
                scroll: false
            });
        }
    }
})

$('#Toogle-Bootstrap-Components').on('click', function () {
    var dir = "Bootstrap4Components";
    var fileextension = ".html";
    $("#Bootstrap-Components>div").children().remove();
    $.ajax({
        //This will retrieve the contents of the folder if the folder is configured as 'browsable'
        url: dir,
        success: function (data) {
            //Lsit all png file names in the page
            $(data).find("a:contains(" + fileextension + ")").each(function () {
                //var filename = this.href.replace(window.location.host, "").replace("http:///","");               
                var filename = $(this).text();
                var myTemplate = $('<div id="Elem_bs4_template_' + filename.replace('.html', '') + '" class="DragElem MyBs4Template">' + filename + '</div>');
                $("#Bootstrap-Components>div").append(myTemplate);
                $(myTemplate).draggable({
                    appendTo: "body",
                    containment: "window",
                    cursor: "move",
                    revert: true,
                    helper: "clone",
                    scroll: false
                });
            });
        }
    });
})

$('#Toogle-Templates').trigger('click');
