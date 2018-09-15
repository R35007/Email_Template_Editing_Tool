/*eslint-disable no-unused-vars*/
/* eslint-env browser */
/* global document */
/*global $*/
/*eslint no-console:  ["error", { allow: ["warn", "error", "log","no-used-vars"] }] */

$(".toogleIcon").click(function () {
    var toogleTab = this.id.replace("Toogle-", "")
    $("#" + toogleTab).slideToggle("fast");
});

$('input[type="number"]').on("input change", function () {

    var sliderid, unitid, inputid, inputval, unitval, index;

    var thisid = this.id.split("-")[0];

    var pos = ["top", "right", "left", "bottom"];
    var br = ["border-radius", "border-top-left-radius", "border-top-right-radius",
           "border-bottom-left-radius", "border-bottom-right-radius"];
    var layout = ["width", "height"];
    var bspcing = ["border-spacing-h", "border-spacing-v"];
    var bgposition = ["background-position-x", "background-position-y"];
    var bgsize = ["background-size-width", "background-size-height"];

    inputid = "#" + this.id;
    sliderid = "#" + this.id + "_";
    unitid = inputid + "_unit";

    inputval = $(this).val();
    unitval = $(unitid).val();

    if (layout.indexOf(this.id) >= 0 && $("#LayoutClip").is(':checked'))
        ClipTwoValue("#width", "#height", inputval, unitval);
    else if (bspcing.indexOf(this.id) >= 0 && $("#SpacingClip").is(':checked'))
        ClipTwoValue("#border-spacing-h", "#border-spacing-v", inputval, unitval);
    else if (bgposition.indexOf(this.id) >= 0 && $("#BgPositionClip").is(':checked'))
        ClipTwoValue("#background-position-x", "#background-position-y", inputval, unitval);
    else if (bgsize.indexOf(this.id) >= 0 && $("#BgSizeClip").is(':checked'))
        ClipTwoValue("#background-size-width", "#background-size-height", inputval, unitval);
    else if (thisid == "padding" && $("#PaddingClip").is(':checked'))
        ClipIt("#padding-", inputval, unitval);
    else if (thisid == "margin" && $("#MarginClip").is(':checked'))
        ClipIt("#margin-", inputval, unitval);
    else if (pos.indexOf(thisid) >= 0 && $("#PositionClip").is(':checked'))
        ClipIt("#", inputval, unitval);
    else if (br.indexOf(this.id) >= 0 && $("#RadiusClip").is(':checked'))
        RadiusClipIt(inputval, unitval);
    else {
        sliderid = "#" + this.id + "_";
        if ($(this).val().length == 0)
            $(sliderid).val(0);
        else
            $(sliderid).val($(this).val());
    }
});

$('input[type="range"]').on("input", function () {


    var sliderid, unitid, inputid, sliderval, unitval, index;

    var thisid = this.id.split("-")[0];

    var pos = ["top_", "right_", "left_", "bottom_"];
    var br = ["border-top-left-radius_", "border-top-right-radius_",
              "border-bottom-left-radius_", "border-bottom-right-radius_"]
    var layout = ["width_", "height_"];
    var bspcing = ["border-spacing-h_", "border-spacing-v_"];
    var bgposition = ["background-position-x_", "background-position-y_"];
    var bgsize = ["background-size-width_", "background-size-height_"];


    sliderid = "#" + this.id;
    inputid = "#" + this.id.replace("_", "");
    unitid = inputid + "_unit";

    sliderval = $(this).val();
    unitval = $(unitid).val();

    if (layout.indexOf(this.id) >= 0 && $("#LayoutClip").is(':checked')) {
        ClipTwoValue("#width", "#height", sliderval, unitval)
    } else if (bspcing.indexOf(this.id) >= 0 && $("#SpacingClip").is(':checked')) {
        ClipTwoValue("#border-spacing-h", "#border-spacing-v", sliderval, unitval)
    } else if (bgposition.indexOf(this.id) >= 0 && $("#BgPositionClip").is(':checked')) {
        ClipTwoValue("#background-position-x", "#background-position-y", sliderval, unitval)
    } else if (bgsize.indexOf(this.id) >= 0 && $("#BgSizeClip").is(':checked')) {
        ClipTwoValue("#background-size-width", "#background-size-height", sliderval, unitval)
    } else if (thisid == "padding" && $("#PaddingClip").is(':checked')) {
        ClipIt("#padding-", sliderval, unitval)
    } else if (thisid == "margin" && $("#MarginClip").is(':checked')) {
        ClipIt("#margin-", sliderval, unitval)
    } else if (pos.indexOf(this.id) >= 0 && $("#PositionClip").is(':checked')) {
        ClipIt("#", sliderval, unitval)
    } else if (br.indexOf(this.id) >= 0 && $("#RadiusClip").is(':checked')) {
        RadiusClipIt(sliderval, unitval)
    } else {
        $(inputid).val($(this).val());
    }

    index = $(unitid).prop('selectedIndex');
    if (index >= 15)
        $(unitid).val("px");
    $(unitid).removeClass("select");
    $(inputid).css("display", "block");
});

$('input[type="color"]').on("input", function () {
    var inputid = "#" + this.id.replace("_", "");
    $(inputid).val($(this).val());
});

$('.unit').on("change", function () {

    var unitid, index, inputid;
    unitid = "#" + this.id;
    inputid = "#" + this.id.replace("_unit", "");
    index = $(unitid).prop('selectedIndex');
    if (index >= 15) {
        $(inputid).css("display", "none");
        $(inputid).val("");
        $(inputid + "_").val(0);
        $(this).addClass("select");
    } else {
        $(inputid).css("display", "block");
        $(this).removeClass("select");
    }

});

$('.browse').on("click", function () {
    var fileid = this.id.replace("-trigger", "");
    $("#" + fileid).trigger("click");
});

$('input[type="file"]').on("change input", function () {

    var styleid = this.id.replace("-file", "");
    var showid = styleid + "-show";

    var url = 'url("' + this.files[0].name + '")';
    $("#" + styleid).val(url);
    $("#" + showid).val(this.files[0].name);

    $("#" + styleid).trigger("change");
});

$('.file').on("change input", function () {

    var styleid = this.id.replace("-show", "");
    var url = 'url("' + $(this).val() + '")';
    $("#" + styleid).val(url);
    $("#" + styleid).trigger("change");
});

$('#myDivids').on("change", function () {
    $("#selector").val($(this).val());
});


function ClipTwoValue(x, y, val, unit) {

    if (val.length == 0) {
        $(x + "_").val(0);
        $(y + "_").val(0);
    } else {
        $(x + "_").val(val);
        $(y + "_").val(val);
    }

    $(x).val(val);
    $(y).val(val);

    $(x + "_unit").val(unit);
    $(y + "_unit").val(unit);

    $(x + "_unit").removeClass("select");
    $(y + "_unit").removeClass("select");
    $(x).css("display", "block");
    $(y).css("display", "block");
}

function ClipIt(x, val, unit) {

    if (val.length == 0) {
        $(x + "top_").val(0);
        $(x + "right_").val(0);
        $(x + "bottom_").val(0);
        $(x + "left_").val(0);
    } else {
        $(x + "top_").val(val);
        $(x + "right_").val(val);
        $(x + "bottom_").val(val);
        $(x + "left_").val(val);
    }

    $(x + "top").val(val);
    $(x + "right").val(val);
    $(x + "bottom").val(val);
    $(x + "left").val(val);

    $(x + "top_unit").val(unit);
    $(x + "right_unit").val(unit);
    $(x + "bottom_unit").val(unit);
    $(x + "left_unit").val(unit);

    if (x != "#")
        $(x.replace("-", "")).val(val + unit);


    $(x + "top_unit").removeClass("select");
    $(x + "right_unit").removeClass("select");
    $(x + "bottom_unit").removeClass("select");
    $(x + "left_unit").removeClass("select");

    $(x + "top").css("display", "block");
    $(x + "right").css("display", "block");
    $(x + "bottom").css("display", "block");
    $(x + "left").css("display", "block");


}

function RadiusClipIt(val, unit) {

    if (val.length == 0) {
        $("#border-top-left-radius_").val(0);
        $("#border-top-right-radius_").val(0);
        $("#border-bottom-left-radius_").val(0);
        $("#border-bottom-right-radius_").val(0);
    } else {
        $("#border-top-left-radius_").val(val);
        $("#border-top-right-radius_").val(val);
        $("#border-bottom-left-radius_").val(val);
        $("#border-bottom-right-radius_").val(val);
    }

    $("#border-top-left-radius").val(val);
    $("#border-top-right-radius").val(val);
    $("#border-bottom-left-radius").val(val);
    $("#border-bottom-right-radius").val(val);

    $("#border-top-left-radius_unit").val(unit);
    $("#border-top-right-radius_unit").val(unit);
    $("#border-bottom-left-radius_unit").val(unit);
    $("#border-bottom-right-radius_unit").val(unit);

    $("#border-radius").val(val + unit);


    $("#border-top-left-radius_unit").removeClass("select");
    $("#border-top-right-radius_unit").removeClass("select");
    $("#border-bottom-left-radius_unit").removeClass("select");
    $("#border-bottom-right-radius_unit").removeClass("select");

    $("#border-top-left-radius").css("display", "block");
    $("#border-top-right-radius").css("display", "block");
    $("#border-bottom-left-radius").css("display", "block");
    $("#border-bottom-right-radius").css("display", "block");
}


$('.delete').on("click", function () {
    var inputid = "#" + this.id.replace("delete-", "");
    var sliderid = inputid + "_";
    $(inputid).val("");
    $(sliderid).val(0);
    $(inputid + "_unit").val("px");
    $(inputid).css("display", "block");
    $(inputid + "_unit").removeClass("select");
});

$('.delete-img').on("click", function () {

    var styleid = "#" + this.id.replace("delete-", "");
    var showid = styleid + "-show";
    $(styleid).val("");
    $(showid).val("");

});

$('#delete-myDivids').on("click", function () {
    var thisdivid = $("#myDivids").val();
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
});

$('#delete-text-shadow').on("click", function () {

    $('#text-shadow').val("");

    $('#tsh-width').val("");
    $('#tsh-width_unit').val("px");
    $('#tsh-width_').val(0);

    $('#tsv-width').val("");
    $('#tsv-width_unit').val("px");
    $('#tsv-width_').val(0);

    $('#tsb-width').val("");
    $('#tsb-width_unit').val("px");
    $('#tsb-width_').val(0);

    $('#ts-color').val("");
    $('#ts-color_').val(0);


});

$('#delete-background-position').on("click", function () {

    $('#background-position').val("");

    $('#background-position-x').val("");
    $('#background-position-x_unit').val("px");
    $('#background-position-x_').val(0);

    $('#background-position-y').val("");
    $('#background-position-y_unit').val("px");
    $('#background-position-y_').val(0);

});

$('#delete-background-size').on("click", function () {

    $('#background-size').val("");

    $('#background-size-width').val("");
    $('#background-size-width_unit').val("px");
    $('#background-size-width_').val(0);

    $('#background-size-height').val("");
    $('#background-size-height_unit').val("px");
    $('#background-size-height_').val(0);

});

$('#delete-border-spacing').on("click", function () {

    $('#border-spacing').val("");

    $('#border-spacing-h').val("");
    $('#border-spacing-h_unit').val("px");
    $('#border-spacing-h_').val(0);

    $('#border-spacing-v').val("");
    $('#border-spacing-v_unit').val("px");
    $('#border-spacing-v_').val(0);

});

$('.deleteall').on("click", function () {

    var formid = this.id.replace("delete-", "");
    var obj, i;
    $("#" + formid)[0].reset();

    if (formid == "Layout-Form") {
        obj = ["width", "height", "min-width", "min-height", "max-width", "max-height",
             "display", "box-sizing", "float", "clear", "overflow-x", "overflow-y",
             "visibility", "z-index", "opacity"];
        for (i in obj)
            setstyle(obj[i], "null");
    } else if (formid == "Position-Form") {
        obj = ["position", "top", "right", "bottom", "left"];
        for (i in obj)
            setstyle(obj[i], "null");
    } else if (formid == "Margin-Form") {
        obj = ["margin", "margin-top", "margin-right", "margin-bottom", "margin-left"];
        for (i in obj)
            setstyle(obj[i], "null");
    } else if (formid == "Padding-Form") {
        obj = ["padding", "padding-top", "padding-right", "padding-bottom", "padding-left"];
        for (i in obj)
            setstyle(obj[i], "null");
    } else if (formid == "Text-Form") {
        obj = ["color", "font-family", "font-style", "font-variant", "font-weight",
             "font-size", "line-height", "text-indent", "text-align", "text-decoration",
             "text-shadow", "text-transform", "letter-spacing", "word-spacing", "white-space",
             "vertical-align"];
        for (i in obj)
            setstyle(obj[i], "null");
    } else if (formid == "List-Form") {
        obj = ["list-style", "list-style-type", "list-style-position", "list-style-image"];
        for (i in obj)
            setstyle(obj[i], "null");
    } else if (formid == "Border-Form") {
        obj = ["border", "border-width", "border-style", "border-color",
             "border-top", "border-right", "border-bottom", "border-left",
             "border-top-width", "border-right-width", "border-bottom-width", "border-left-width",
             "border-top-style", "border-right-style", "border-bottom-style", "border-left-style",
             "border-top-color", "border-right-color", "border-bottom-color", "border-left-color",
             "border-radius", "border-top-left-radius", "border-top-right-radius",
             "border-bottom-left-radius", "border-bottom-right-radius",
             "border-collapse", "border-spacing"];
        for (i in obj)
            setstyle(obj[i], "null");
    } else if (formid == "Background-Form") {
        obj = ["background", "background-size", "background-position", "background-color", "background-image",
            "background-clip", "background-orgin", "background-attachment", "background-repeat", "box-shadow"];
        for (i in obj)
            setstyle(obj[i], "null");
    }

});


function showTab(mytab, button) {

    $(".Bordertabcontent").hide();
    $(".tablinks").removeClass('activeTab')

    $(mytab).show();
    $(button).addClass('activeTab');
}

$('input,select,button').on("change input click", function () {

    var hasUnit = ["width", "height", "min-width", "min-height", "max-width", "max-height",
                    "font-size", "line-height", "text-indent",
                    "border-width", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width",
                    "letter-spacing", "word-spacing", "vertical-align"];

    var mpb = ["margin", "margin-top", "margin-right", "margin-bottom", "margin-left",
                "padding", "padding-top", "padding-right", "padding-bottom", "padding-left",
                "border-radius", "border-top-left-radius", "border-top-right-radius",
                "border-bottom-left-radius", "border-bottom-right-radius"];

    var bckps = ["background-position-x", "background-position-y",
                 "background-size-width", "background-size-height"];

    var ts = ["tsh-width", "tsv-width", "tsb-width", "ts-color"];

    var boxsdw = ["bsh-width", "bsv-width", "bss-width", "bsb-width", "bs-color", "bs-inset"];

    var file = ["list-style-image", "list-style-image-show", "list-style-image-file", "list-style-image-file-trigger",
             "background-image", "background-image-show", "background-image-file", "background-image-file-trigger"]

    var pos = ["top", "right", "bottom", "left"];

    var thisid = this.id.replace("unit", "");
    thisid = thisid.replace("_", "");
    thisid = thisid.replace("delete-", "");


    var mystylevalue;

    //console.clear();
    //console.log(thisid);
    //return;


    if (thisid == "visibility") {
        if ($("#visibility").is(':checked'))
            setstyle("visibility", "visible");
        else
            setstyle("visibility", "hidden");
    } else if (thisid == "border-collapse") {
        if ($("#border-collapse").is(':checked'))
            setstyle("border-collapse", "collapse");
        else
            setstyle("border-collapse", "separate");
    } else if (ts.indexOf(thisid) >= 0) {

        var tsh = getvalue("tsh-width");
        var tsv = getvalue("tsv-width");
        var tsb = getvalue("tsb-width");
        var tsc = $("#ts-color").val();

        if (tsb == "null") tsb = "";

        if (tsh != "null" && tsv != "null") {
            var val = tsh + " " + tsv + " " + tsb + " " + tsc;
            $("#text-shadow").val(val);
        }
        var tsval = $("#text-shadow").val();
        setstyle("text-shadow", tsval);
    } else if (boxsdw.indexOf(thisid) >= 0) {
        var bshorizontal = getvalue("bsh-width");
        var bsvertical = getvalue("bsv-width");
        var bsblur = getvalue("bsb-width");
        var bsspread = getvalue("bss-width");
        var bscolor = getvalue("bs-color");
        var bsinset;

        if ($("#bs-inset").is(':checked'))
            bsinset = "inset";
        else
            bsinset = "";

        if (bsblur == "null") bsblur = "";
        if (bsspread == "null") bsspread = "";
        if (bscolor == "null") bscolor = "";


        if (bshorizontal != "null" && bsvertical != "null") {
            var bshadowval = bshorizontal + " " + bsvertical + " " + bsblur + " " + bsspread + " " + bscolor + " " + bsinset;
            $("#box-shadow").val(bshadowval);
        }

        var boxShadowval = $("#box-shadow").val();
        setstyle("box-shadow", boxShadowval);
    } else if (bckps.indexOf(thisid) >= 0) {
        var bkgrnd = thisid.split("-")[1];

        if (bkgrnd == "position") {
            var px = getvalue("background-position-x");
            var py = getvalue("background-position-y");

            if (px != "null" && py != "null") {
                var bpositionval = px + " " + py;
                $("#background-position").val(bpositionval);
            }
            var bposition = $("#background-position").val();
            setstyle("background-position", bposition);
        } else if (bkgrnd == "size") {
            var sw = getvalue("background-size-width");
            var sh = getvalue("background-size-height");

            if (sw != "null" && sh != "null") {
                var bsizeval = sw + " " + sh;
                $("#background-size").val(bsizeval);
            }

            var bsize = $("#background-size").val();
            setstyle("background-size", bsize);
        }
    } else if (thisid == "border-spacing-h" || thisid == "border-spacing-v") {
        var bspacingh = getvalue("border-spacing-h");
        var bspacingv = getvalue("border-spacing-v");

        if (bspacingh != "null" && bspacingv != "null") {
            var borderspacing = bspacingh + " " + bspacingv;
            $("#border-spacing").val(borderspacing);
        }

        var borderspacingval = $("#border-spacing").val();
        setstyle("border-spacing", borderspacingval);
    } else if (thisid == "width" || thisid == "height") {

        var width = getvalue("width");
        var height = getvalue("height");

        setstyle("width", width);
        setstyle("height", height);
    } else if (pos.indexOf(thisid) >= 0) {

        var postop = getvalue("top");
        var posright = getvalue("right");
        var posbottom = getvalue("bottom");
        var posleft = getvalue("left");

        setstyle("top", postop);
        setstyle("right", posright);
        setstyle("bottom", posbottom);
        setstyle("left", posleft);
    } else if (mpb.indexOf(thisid) >= 0) {

        var a = thisid.split("-")[0];

        if (a == "margin" || a == "padding") {

            var t = getvalue(a + "-top");
            var r = getvalue(a + "-right");
            var b = getvalue(a + "-bottom");
            var l = getvalue(a + "-left");
            var m_p = $("#" + a).val();

            if (t == "null" && r == "null" && b == "null" && l == "null")
                setstyle(a, m_p);
            else {
                setstyle(a, m_p);
                if (t != "null")
                    setstyle(a + "-top", t);
                if (r != "null")
                    setstyle(a + "-right", r);
                if (b != "null")
                    setstyle(a + "-bottom", b);
                if (l != "null")
                    setstyle(a + "-left", l);
            }
        } else if (a == "border") {
            var tl = getvalue("border-top-left-radius");
            var tr = getvalue("border-top-right-radius");
            var bl = getvalue("border-bottom-left-radius");
            var br = getvalue("border-bottom-right-radius");
            var b_r = $("#border-radius").val();

            if (tl == "null" && tr == "null" && br == "null" && bl == "null")
                setstyle("border-radius", b_r);
            else {
                setstyle("border-radius", b_r);
                if (tl != "null")
                    setstyle("border-top-left-radius", tl);
                if (tr != "null")
                    setstyle("border-top-right-radius", tr);
                if (bl != "null")
                    setstyle("border-bottom-left-radius", bl);
                if (br != "null")
                    setstyle("border-bottom-right-radius", br);
            }
        }
    } else if (file.indexOf(thisid) >= 0) {

        var styleid = thisid.replace("-show", "");
        styleid = styleid.replace("-file", "");
        styleid = styleid.replace("-trigger", "");
        var imgurl = $("#" + styleid).val();

        setstyle(styleid, imgurl);
    } else if (hasUnit.indexOf(thisid) >= 0)
        mystylevalue = getvalue(thisid);
    else
        mystylevalue = $(this).val();

    setstyle(thisid, mystylevalue);

    ShowStyle();

});

$("#demoDIV div").on("click", function () {
    $("#myDivids").val(this.id);
    ShowStyle();
});

function getvalue(x) {
    var val = $("#" + x).val();
    var unitval = $("#" + x + "_unit").val();
    var unitindex = $("#" + x + "_unit").prop('selectedIndex');

    if (unitindex >= 15)
        return unitval;
    else if (val === "undefined" || val.length == 0)
        return "null"
    else
    if (typeof unitval === "undefined")
        return val;
    else
        return val + unitval;
}

function setstyle(prop, val) {

    var myelement = $("#myDivids").val();
    var myselector = $("#selector").val();
    if (myselector == "" || myselector === "undefined") {
        if (myelement !== null && typeof myelement !== "undefined" && myelement != "") {
            if (val != "null")
                $("#" + myelement).css(prop, val);
            else
                $("#" + myelement).css(prop, "");
        }
    } else {
        if (val != "null")
            $("#" + myselector).css(prop, val);
        else
            $("#" + myselector).css(prop, "");
    }
}

function ShowStyle() {

    var style, allstyle, elemId, myselector;
    try {
        elemId = $("#myDivids").val();
        myselector = $("#selector").val();

        if (myselector == "" || myselector === "undefined") {
            if (elemId !== null && typeof elemId !== "undefined" && elemId != "") {
                style = $("#" + elemId).attr("style");
                $("#inlinestyles").html("");
                allstyle = style.replace(/;/g, "; <br/>");
                $("#inlinestyles").html(allstyle);
            }
        } else {
            style = $("#" + myselector).attr("style");
            $("#inlinestyles").html("");
            allstyle = style.replace(/;/g, "; <br/>");
            $("#inlinestyles").html(allstyle);
        }

        } catch (err) {
            console.log("Err");
        }
    }
