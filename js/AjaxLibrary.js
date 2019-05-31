/*eslint-disable no-unused-vars*/
/* eslint-env browser */
/* global document, mytempsrc */
/*global $*/
/*eslint no-console:  ["error", { allow: ["warn", "error", "log","no-used-vars"] }] */

var templateFolder = "";

getFolders();

function getFolders() {
  var dir = "templates";
  var fileextension = ".";
  $("#Templates #Folders")
    .children()
    .remove();
  $("#Images #Folders")
    .children()
    .remove();
  $("#Brief #Folders")
    .children()
    .remove();
  $.ajax({
    url: dir,
    success: function(data) {
      $(data)
        .find("#files a:not(a[title='..'])")
        .each(function() {
          var folder =
            '<div class="folder"><span class="foldericon mr-2"><i class="fas fa-folder"></i></span><span>' +
            $(this).attr("title") +
            "</span></div>";

          $("#Templates #Folders").append(folder);
          $("#Images #Folders").append(folder);
          $("#Brief #Folders").append(folder);
        });
      if (templateFolder !== "") {
        $("#Templates #Folders .folder:contains(" + templateFolder + ")").addClass("activeTab");
        $("#Folders .folder:contains(" + templateFolder + ")").trigger("click");
      }
    }
  });
}

$(".reload").on("click", function() {
  getFolders();
});

$("#Toogle-Templates, #Toogle-Images, #Toogle-Brief").on("click", function() {
  try {
    if (templateFolder.length > 0)
      $("#Folders .folder:contains(" + templateFolder + ")").trigger("click");
  } catch (e) {
    //Catch Statement
  }
});

$("#Templates #Folders").on("click", ".folder", function() {
  try {
    templateFolder = $(this)
      .children()
      .last()
      .text();

    $("#Templates .folder").removeClass("activeTab");
    $(this).addClass("activeTab");

    $("#Templates .folder")
      .children()
      .children()
      .removeClass("fa-folder-open");
    $(this)
      .children()
      .first()
      .children()
      .addClass("fa-folder-open");

    $("#Images .folder").removeClass("activeTab");
    $("#Brief .folder").removeClass("activeTab");

    //    $('#Images #Folders').find('.folder:contains("'+$(this).text()+'")').addClass('activeTab');
    $("#Images #Folders")
      .find('.folder:contains("' + $(this).text() + '")')
      .trigger("click");

    //    $('#Brief #Folders').find('.folder:contains("'+$(this).text()+'")').addClass('activeTab');
    $("#Brief #Folders")
      .find('.folder:contains("' + $(this).text() + '")')
      .trigger("click");

    var dir = "templates/" + $(this).text();
    var fileextension = ".html";
    $("#Htmls")
      .children()
      .remove();
    $.ajax({
      url: dir,
      success: function(data) {
        $(data)
          .find("a:contains(" + fileextension + ")")
          .each(function() {
            var filename = $(this).attr("title");
            var myTemplate = $(
              '<div id="Elem_template_' +
                filename.replace(".html", "") +
                '" class="DragElem MyTemplate"> <div class="emailicon"><i class="fas fa-envelope"></i></div>  <p>' +
                filename +
                "</p> </div>"
            );
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
  } catch (e) {
    //Catch Statement
  }
});

$("#Images #Folders").on("click", ".folder", function() {
  try {
    templateFolder = $(this)
      .children()
      .last()
      .text();

    $("#Images .folder").removeClass("activeTab");
    $(this).addClass("activeTab");

    $("#Images .folder")
      .children()
      .children()
      .removeClass("fa-folder-open");
    $(this)
      .children()
      .first()
      .children()
      .addClass("fa-folder-open");

    var dir = "templates/" + $(this).text() + "/images";
    var fileextension1 = ".jpg";
    var fileextension2 = ".jpeg";
    var fileextension3 = ".png";
    var fileextension4 = ".gif";
    $("#imgs")
      .children()
      .remove();
    $.ajax({
      url: dir,
      success: function(data) {
        $(data)
          .find(
            "a:contains(" +
              fileextension1 +
              "),a:contains(" +
              fileextension2 +
              "),a:contains(" +
              fileextension3 +
              "),a:contains(" +
              fileextension4 +
              ")"
          )
          .each(function() {
            var filename = $(this).text();
            var myCard = $(
              '<div id="Elem_img_' +
                filename +
                '"class="MyThumbnail bg-white border-0"> <img src="templates/' +
                templateFolder +
                "/images/" +
                filename +
                '" alt="' +
                filename +
                '" class="img-thumbnail"> <p class="card-title text-center">' +
                filename +
                "</p> </div>"
            );
            $("#imgs").append(myCard);
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
        var myCard = $(
          '<div id="Elem_img_' +
            i +
            '"class="MyThumbnail bg-white border-0"> <img src="' +
            mytempsrc[i] +
            '" alt="img_' +
            i +
            '" class="img-thumbnail"> <p class="card-title text-center">img_' +
            i +
            "</p> </div>"
        );
        $("#imgs").append(myCard);
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
  } catch (e) {
    //Catch Statement
  }
});

$("#Brief #Folders").on("click", ".folder", function() {
  try {
    templateFolder = $(this)
      .children()
      .last()
      .text();

    $("#Brief .folder").removeClass("activeTab");
    $(this).addClass("activeTab");

    $("#Brief .folder")
      .children()
      .children()
      .removeClass("fa-folder-open");
    $(this)
      .children()
      .first()
      .children()
      .addClass("fa-folder-open");

    var dir = "templates/" + $(this).text() + "/brief";
    var fileextension = ".txt";
    $("#textfiles")
      .children()
      .remove();
    $.ajax({
      url: dir,
      success: function(data) {
        $(data)
          .find("a:contains(" + fileextension + ")")
          .each(function() {
            var filename = $(this).text();
            var myTemplate = $(
              '<div id="Elem_template_' +
                filename.replace(".txt", "") +
                '" class="DragElem MyBrief"> <div class="emailicon"><i class="fas fa-file-alt"></i></div>  <p>' +
                filename +
                "</p> </div>"
            );
            $("#textfiles").append(myTemplate);
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
  } catch (e) {
    //Catch Statement
  }
});

$("#Toogle-Email-Components").on("click", function() {
  var dir = "EmailComponents";
  var fileextension = ".html";
  $("#Email-Components>div")
    .children()
    .remove();
  $.ajax({
    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
    url: dir,
    success: function(data) {
      //Lsit all png file names in the page
      $(data)
        .find("a:contains(" + fileextension + ")")
        .each(function() {
          //var filename = this.href.replace(window.location.host, "").replace("http:///","");
          var filename = $(this).text();
          var myTemplate = $(
            '<div id="Elem_email_template_' +
              filename.replace(".html", "") +
              '" class="DragElem MyEmailTemplate">' +
              filename +
              "</div>"
          );
          $("#Email-Components>div").append(myTemplate);
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
});

$("#Toogle-Bootstrap-Components").on("click", function() {
  var dir = "Bootstrap4Components";
  var fileextension = ".html";
  $("#Bootstrap-Components>div")
    .children()
    .remove();
  $.ajax({
    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
    url: dir,
    success: function(data) {
      //Lsit all png file names in the page
      $(data)
        .find("a:contains(" + fileextension + ")")
        .each(function() {
          //var filename = this.href.replace(window.location.host, "").replace("http:///","");
          var filename = $(this).text();
          var myTemplate = $(
            '<div id="Elem_bs4_template_' +
              filename.replace(".html", "") +
              '" class="DragElem MyBs4Template">' +
              filename +
              "</div>"
          );
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
});

$("#Toogle-Templates").trigger("click");

//$('#Templates #Folders').find('.folder').first().trigger('click');
