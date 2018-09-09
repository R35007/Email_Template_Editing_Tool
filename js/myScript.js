/*eslint-disable no-unused-vars*/
/* eslint-env browser */
/* global document */
/*global $, ace*/
/*eslint no-console:  ["error", { allow: ["warn", "error", "log","no-used-vars"] }] */
//
var keys = {};
var replaceWith = $('<div id="edit" contentEditable="true" class="editinplace"></div>');
var $myElement, myparents, myElementCopy, replaceElement, propnew, $ElementToreplace;
var isDesignViewClicked = false,
    mycolors = new Array();

$(document).ready(function () {

    $('.container-fluid').css('height', $(window).height());
    //    $('.container-fluid').css('width', $(window).width());

    $('#DesignView').on('load', DesignViewEvents)


    function DesignViewEvents() {

        var $DesignIframe = $('#DesignView').contents();

        $DesignIframe.find('head').append($('<link id="highlightcss" rel="stylesheet" href="../../css/highlight.css">'))

        //  Add highlidht2 Class on mouseover of an element
        $DesignIframe.find('body').on('mouseover', '*', function (e) {
            $(this).addClass('highlight2');
            e.stopPropagation();
        })

        //  Remove highlidht2 Class on mouseout of an element
        $DesignIframe.find('body').on('mouseout', '*', function (e) {
            $(this).removeClass('highlight2');
            e.stopPropagation();
        })

        //  Prevent from redirecting
        $DesignIframe.find('body').on('click', 'a , span, input[type=submit], button, img', function (e) {
            e.preventDefault();
            //do whatever
        })

        //  Select an Element, Prepopulate tag attributes and Generate Breadcrumb
        $DesignIframe.find('body').on('click', '*', function (e) {


            $myElement = $(this);
            propnew = '';
            isDesignViewClicked = false;
            $('#selector').val('');
            $DesignIframe.find('*').removeClass('highlight');
            $DesignIframe.find('*').removeClass('highlight3');
            $myElement.addClass('highlight');

            var thisid = $(this).attr('id');
            var thisclass = $(this).attr('class');
            var thistype = $(this).attr('type');
            var thismin = $(this).attr('min');
            var thismax = $(this).attr('max');
            var thissrc = $(this).attr('src');
            var thishref = $(this).attr('href');
            var thisalt = $(this).attr('alt');
            var thisalign = $(this).attr('align');
            var thisvalign = $(this).attr('valign');
            var thisheight = $(this).attr('height');
            var thiswidth = $(this).attr('width');
            var thisbgcolor = $(this).attr('bgcolor');


            $('#elementid').val(thisid);
            $('#myTags').children().remove();
            $('#elementClass').val('');
            thisclass = thisclass.replace(/ui-draggable-handle/g, '');
            thisclass = thisclass.replace(/ui-draggable/g, '');
            thisclass = thisclass.replace(/ui-droppable-hover/g, '');
            thisclass = thisclass.replace(/ui-droppable-active/g, '');
            thisclass = thisclass.replace(/ui-droppable/g, '');
            thisclass = thisclass.replace(/highlight2/g, '');
            thisclass = thisclass.replace(/highlight3/g, '');
            thisclass = thisclass.replace(/highlight/g, '');

            if (thisclass.trim().length > 0) {
                var classArray = thisclass.trim().split(' ');
                for (var j in classArray) {
                    if (classArray[j].trim().length > 0 && classArray[j].trim() != '') {
                        var myClassBadge = '<span class="badge badge-success"><span class="classTagName">' + classArray[j] + '</span><span class="ml-2 removeTag">x</span></span>';
                        $('#myTags').append(myClassBadge);
                    }
                }
            }



            $('#elementtype').val(thistype);
            $('#elementimin').val(thismin);
            $('#elementmax').val(thismax);
            $('#elementsrc').val(thissrc);
            $('#elementhref').val(thishref);
            $('#elementalt').val(thisalt);
            $('#elementalign').val(thisalign);
            $('#elementvalign').val(thisvalign);
            $('#elementheight').val(thisheight);
            $('#elementwidth').val(thiswidth);
            $('#elementbgcolor').val(thisbgcolor);
            $('#elementbgcolor_').val(thisbgcolor);


            $('#Breadcrumb').children().remove();

            myparents = $myElement.parentsUntil('#DesignView');

            var hashid, dotclass;

            if (typeof thisid !== 'undefined') {
                if (thisid != '' && thisid.length > 0)
                    hashid = "#" + thisid;
                else
                    hashid = '';
            } else
                hashid = '';


            if (typeof thisclass !== 'undefined') {
                if (thisclass.trim() != '' && thisclass.trim().length > 0)
                    dotclass = '.' + thisclass.trim().replace(/\ /g, '.');
                else
                    dotclass = '';
            } else
                dotclass = '';


            var mybreadlinklistthis = '<li><span>' + $myElement.prop('tagName').toLowerCase() + ' ' + hashid + ' ' + dotclass + '</span></li>'
            $('#Breadcrumb').prepend(mybreadlinklistthis);

            for (var i in myparents) {

                var parentelement = myparents[i].tagName;

                if (typeof parentelement !== "undefined") {
                    parentelement = parentelement.toLowerCase();

                    var parentid = myparents[i].id;
                    var parentclass = myparents[i].className;

                    parentclass = parentclass.replace('ui-draggable', '');
                    parentclass = parentclass.replace('ui-draggable-handle', '');
                    parentclass = parentclass.replace('ui-droppable', '');
                    parentclass = parentclass.replace('highlight2', '');
                    parentclass = parentclass.replace('highlight', '');
                    parentclass = parentclass.trim().replace(/\ /g, '.');

                    if (typeof parentid !== 'undefined') {
                        if (parentid != '' && parentid.length > 0)
                            hashid = "#" + parentid;
                        else
                            hashid = '';
                    } else
                        hashid = '';

                    if (typeof parentclass !== 'undefined') {
                        if (parentclass != '' && parentclass.length > 0)
                            dotclass = '.' + parentclass;
                        else
                            dotclass = '';
                    } else
                        dotclass = '';

                    var mybreadlinklist = '<li><span>' + parentelement + ' ' + hashid + ' ' + dotclass + '</span></li>'
                    $('#Breadcrumb').prepend(mybreadlinklist);
                }
            }

            for (i = 0; i < $('form').length; i++) {
                $('form')[i].reset();
            }

            ShowStyle();

            e.stopPropagation();


        })

        //  Edit in place within DesignView viv
        $DesignIframe.find('body').on('dblclick', '*', function (e) {

            var elem = $(this);

            $ElementToreplace = $(this);
            replaceElement = $(this).clone();

            elem.attr('contenteditable', 'true');
            elem.addClass('shadow');
            elem.focus();
            elem.keyup(function (e) {
                if (e.keyCode == 13) {
                    elem.trigger("blur");
                }
            })

            elem.blur(function () {
                elem.removeAttr('contenteditable');
                elem.removeClass('shadow');
            });
            e.stopPropagation();
        })

        //  Remove Edit in place
        $DesignIframe.find('body').on('blur', '[contenteditable=true]', function () {
            $myElement.removeAttr('contenteditable');
            $myElement.removeClass('shadow');
        })

        //  Make sure that no element is selected
        $DesignIframe.find('body').on('click', function () {
            $DesignIframe.find('body').find('*').removeClass('highlight');
            $myElement = '';

            $('#myTags').children().remove();
            $('#Breadcrumb').children().remove();
            $('#selector').val('');
            for (var i = 0; i < $('form').length; i++) {
                $('form')[i].reset();
            }
            isDesignViewClicked = true;
        })

        //  Generate Element Id and push into dropdown 
        $DesignIframe.find('body').bind('DOMNodeInserted DOMNodeRemoved', function () {
            var array = new Array();
            $DesignIframe.find("*").each(function () {
                var thisid = $(this).attr('id');
                if (typeof thisid !== "undefined")
                    if (thisid.trim().length > 0)
                        array.push('#' + thisid);
            });

            $('#selector').autocomplete({
                source: array
            });

        });

    }

    //  Navigate to the element by breadcrumb
    $('#Breadcrumb').on('click', 'span', function () {

        var breadlength = $('#Breadcrumb').children().length;
        var clickedelem = $(this).parent().index() + 1;
        var myparentlength = myparents.length;

        if (breadlength != clickedelem) {

            var getelemindex = myparentlength - clickedelem;


            var slectedelem = myparents[getelemindex];


            $(slectedelem).trigger('click');
        }

    })

    //  Create Shourtcut Keys
    $(document).on('keydown', function (e) {

        if (keys[e.keyCode]) {
            return;
        }

        var mycombination = new Array();
        if (!($('input').is(":focus")) && !($('#edit').is(":focus"))) {
            keys[e.which] = true;

            for (var i in keys) {
                if (!keys.hasOwnProperty(i)) continue;
                mycombination.push(i);
            }
            try {
                if (mycombination.join() == '17,88')
                    $('#Cut').trigger('click');
                else if (mycombination.join() == '17,67')
                    $('#Copy').trigger('click');
                else if (mycombination.join() == '17,86')
                    $('#Paste').trigger('click');
                else if (mycombination.join() == '17,38,86')
                    $('#PasteBefore').trigger('click');
                else if (mycombination.join() == '17,40,86')
                    $('#PasteAfter').trigger('click');
                else if (mycombination.join() == '16,17,86')
                    $('#PasteStyle').trigger('click');
                else if (mycombination.join() == '16,17,38' || mycombination.join() == '16,17,37')
                    $('#MoveUp').trigger('click');
                else if (mycombination.join() == '16,17,40' || mycombination.join() == '16,17,39')
                    $('#MoveDown').trigger('click');
                else if (mycombination.join() == '46')
                    $('#Delete').trigger('click');
                else if (mycombination.join() == '17,90')
                    $('#Undo').trigger('click');
                else if (mycombination.join() == '16,17,69')
                    $('#Edit').trigger('click');
                else if (mycombination.join() == '16,17,68')
                    $('#Clone').trigger('click');
            } catch (err) {

            }
        }

    });

    //  Delete Shortcut Keys
    $(document).on('keyup', function (e) {
        delete keys[e.which];
    });

    //  Create Editor
    var editor = ace.edit("SourceView");
    editor.setOptions({
        hScrollBarAlwaysVisible: false,
        vScrollBarAlwaysVisible: false,
        autoScrollEditorIntoView: true,
        fontSize: 16
    });
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/html");

    //  Create autocomplete to class
    $("#elementClass").autocomplete({
        source: [
    "alert-primary", "alert-secondary", "alert-success", "alert-info", "alert-warning", "alert-danger", "alert-light", "alert-dark", "alert-link", "alert-dismissible",
    "alert-heading", "badge", "badge-pill", "badge-primary", "badge-secondary", "badge-success", "badge-info", "badge-warning", "badge-danger", "badge-light",
    "badge-dark", "breadcrumb", "btn-primary", "btn-secondary", "btn-success", "btn-info", "btn-warning", "btn-danger", "btn-light", "btn-dark",
    "btn-link", "btn-outline-primary", "btn-outline-secondary", "btn-outline-success", "btn-outline-info", "btn-outline-warning", "btn-outline-danger", "btn-outline-light", "btn-outline-dark", "btn-group",
    "btn-group-lg", "btn-group-sm", "btn-group-vertical", "btn-group (nested)", "btn-toolbar", "btn-lg", "btn-sm", "btn-block", "active", "disabled",
    "card", "card-body", "card-title", "card-subtitle", "card-text", "card-link", "card-img-top", "card-img-bottom", "card-img-overlay", "list-group",
    "card-header", "card-header", "card-footer", "card-group", "card-deck", "card-columns", "carousel", "slide", "carousel-fade", "carousel-indicators",
    "carousel-caption", "collapse", "accordion", "dropdown", "dropup", "dropright", "dropleft", "dropdown-header", "dropdown-item-text", "dropdown-divider",
    "dropdown-item disabled", "dropdown-menu-right", "form-group", "form-inline", "form-control", "form-control-lg", "form-control-sm", "form-control-file", "form-control-plaintext", "form-control-range",
    "form-check", "form-check-inline", "disabled items", "readonly", "input-group", "input-group-prepend", "input-group-append", "input-group-sm", "input-group-lg", "checkbox",
    "radio", "dropdown", "custom-checkbox", "custom-radio", "custom-select", "custom-file", "custom-range", "container", "container-fluid", "row",
    "col-sm-", "col-md-", "col-lg-", "col-xl-", "col", "no-gutters", "offset-", "order-", "img-fluid", "img-thumbnail",
    "Jumbotron", "jumbotron", "jumbotron-fluid", "list-group", "list-group-item", "list-group-item-action", "list-group-item-primary", "list-group-item-secondary", "list-group-item-success", "list-group-item-info",
    "list-group-item-warning", "list-group-item-danger", "list-group-item-light", "list-group-item-dark", "list-group with badges", "list-group with d-flex", "media", "d-flex", "align-self-start", "align-self-center",
    "align-self-end", "modal", "modal-dialog-centered", "modal fade", "modal-lg", "modal-sm", "ul.nav", "nav.nav", "justify-content-start", "justify-content-center",
    "justify-content-end", "flex-column", "nav-tabs", "nav-pills", "nav-fill", "nav-justified", "nav with flex utils", "nav-tabs with dropdown", "nav-pills with dropdown", "navbar",
    "navbar-brand", "navbar with form", "navbar-text", "navbar-dark bg-dark", "navbar-light", "fixed-top", "sticky-top", "collapse", "navbar-collapse", "navbar-toggler",
    "navbar-expand-", "pagination", "page-item", "pagination-lg", "pagination-sm", "popovers", "dismissible", "progress", "progress-bar", "multiple",
    "progress-bar", "progress-bar-striped", "progress-bar-striped", "progress-bar-animated", "data-spy", "table", "thead-light", "thead-dark", "table-striped", "table-bordered",
    "table-borderless", "table-hover", "table-sm", "table-", "table-reflow", "table-active", "table-primary", "table-secondary", "table-success", "table-info",
    "table-warning", "table-danger", "table-light", "table-dark", "tooltip", "display-1", "display-2", "display-3", "display-4", "lead",
    "blockquote", "blockquote-footer", "blockquote-reverse", "list-unstyled", "list-inline", "dl-horizontal", "border", "border-", "border-primary", "border-secondary",
    "border-success", "border-danger", "border-warning", "border-info", "border-light", "border-dark", "border-white", "rounded", "rounded-circle", "rounded-",
    "bg-primary", "bg-secondary", "bg-success", "bg-info", "bg-warning", "bg-danger", "bg-light", "bg-dark", "bg-white", "text-primary",
    "text-secondary", "text-success", "text-info", "text-warning", "text-danger", "text-light", "text-dark", "text-white", "d-block", "d-sm-block",
    "d-md-block", "d-lg-block", "d-xl-block", "sm", "md", "lg", "xl", "xs", "d-flex", "d-*-flex",
    "d-nline", "d-*-inline", "d-inline-block", "d-*-inline-block", "d-inline-flex", "d-*-inline-flex", "d-none", "d-*-none", "d-table", "d-*-table",
    "d-table-cell", "d-*-table-cell", "d-print-", "flex-*-column", "flex-*-column-reverse", "flex-*-row", "flex-*-row-reverse", "flex-*-nowrap", "flex-*-wrap", "flex-*-wrap-reverse",
    "flex-fill", "flex-*-grow-1", "flex-*-grow-0", "flex-*-shrink-1", "flex-*-shrink-0", "justify-content-*-start", "justify-content-*-end", "justify-content-*-center", "justify-content-*-between", "justify-content-*-around",
    "align-content-*-start", "align-content-*-end", "align-content-*-center", "align-content-*-around", "align-content-*-stretch", "align-items-*-start", "align-items-*-end", "align-items-*-center", "align-items-*-baseline", "align-items-*-stretch",
    "align-self-*-start", "align-self-*-end", "align-self-*-center", "align-self-*-baseline", "align-self-*-stretch", "order-*-#", "close", "embed-responsive", "shadow-none", "shadow-sm",
    "shadow", "shadow-lg", "invisible", "visible", "sr-only", "sr-only-focusable", "align-*", "clearfix", "fixed-top", "fixed-bottom",
    "sticky-top", "float-*-left", "float-*-right", "float-*-none", "w-100", "h-100", "mw-100", "mh-100", "m-1", "mt-1",
    "mr-1", "mb-1", "ml-1", "mx-1", "my-1", "p-1", "pt-1", "pr-1", "pb-1", "pl-1",
    "px-1", "py-1", "font-weight-bold", "font-weight-light", "font-weight-normal", "font-italic", "text-monospace", "text-justify", "text-nowrap", "text-left",
    "text-*-left", "text-right", "text-*-right", "text-center", "text-*-center", "text-lowercase", "text-uppercase", "text-capitalize", "text-truncate", "text-body",
    "text-black-50", "text-white-50", "text-muted", "text-hide"
]
    });

    //  Set Design from editor source
    editor.session.on('change', function (delta) {
        // delta.start, delta.end, delta.lines, delta.action
        var a = editor.getValue();
        //$('#DesignView').contents().find('html').html(a);
    });

    //  Create Class Tags by space or Enter
    $('#elementClass').on('keyup keydown', function (e) {
        var thisval = $(this).val().replace(' ', '');
        if (e.keyCode == 32 || e.keyCode == 13) {
            if (thisval.length > 0 && thisval !== '') {
                var classArray = $(this).val().trim().split(' ');
                var existClass = [];

                $('#myTags .badge').each(function () {
                    var myclass = $(this).children().first().text();
                    existClass.push(myclass);
                });

                for (var i in classArray) {
                    if (classArray[i].trim().length > 0 && classArray[i].trim() != '') {
                        if (existClass.indexOf(classArray[i]) < 0) {
                            var myClassBadge = '<span class="badge badge-success"><span class="classTagName">' + classArray[i] + '</span><span class="ml-2 removeTag">x</span></span>';
                            $('#myTags').append(myClassBadge);
                            $myElement.addClass(thisval);
                        } else {
                            $('#myTags .badge').each(function () {
                                var myclass = $(this).children().first().text();
                                if (myclass == classArray[i]) {
                                    $(this).fadeOut('fast');
                                    $(this).fadeIn('fast');
                                }
                            });
                        }

                    }

                }
            }
            $(this).val('');
        }
    })

    //  Delete Class Tags by backspace button
    $('#elementClass').on('keydown', function (e) {
        var thisval = $(this).val().replace(' ', '');
        if (e.keyCode == 8 && (thisval.length == 0 || thisval == '')) {
            var removeClass = $('#myTags').children().last('span.badge').children().first().text();
            $myElement.removeClass(removeClass);
            $('#myTags').children().last().remove();
        }
    })

    //  Delete individual Class Tag by clicking x mark
    $('#myTags').on('click', '.removeTag', function () {
        var removeClass = $(this).prev().text();
        $myElement.removeClass(removeClass);
        $(this).parent().remove();
    })

    //  Toogle Properties Panel
    $('#SidePanel').on('click', '.title', function (e) {
        console.log('came in');
        if (e.target !== this)
            return;

        $(this).next('form').slideToggle('fast');
    })

    //  Edit the created Class Tag by clicking the class name
    $('#myTags').on('click', '.classTagName', function () {
        var editClass = $(this).text();
        $(this).parent().remove();
        $myElement.removeClass(editClass);
        $('#elementClass').val(editClass);
        $('#elementClass').focus();
    })

    //  Edit in place within Inline-Styles div
    $('#Inline-Styles').on('dblclick', '.value', function (e) {

        var elem = $(this);
        var prop, val;

        elem.hide();
        elem.after(replaceWith);
        replaceWith.focus();
        replaceWith.text(elem.text());

        prop = elem.prev().text().replace(' ', '');

        replaceWith.keyup(function (e) {
            if (e.keyCode == 13) {
                replaceWith.trigger("blur");
            }
        })

        replaceWith.blur(function () {

            if ($(this).text() == '') {
                setstyle(prop, '');

            } else {
                elem.text($(this).text());

                val = $(this).text();
                if (propnew != prop) {
                    propnew = prop;
                    replaceElement = $myElement.clone();
                }
                setstyle(prop, val);

                $(this).remove();
                elem.show();
            }

        });
        e.stopPropagation();
    })

    //  Delete the inline Style
    $('#Inline-Styles').on('click', '.delete', function () {
        var prop = $(this).prev().prev().text().trim();
        setstyle(prop, '');

    })

    $('#selector').on('input change', function () {
        var thistext = $(this).val();

        $('#DesignView').contents().find('*').removeClass('highlight3');
        if (thistext.trim().length > 0) {
            if ($('#selector').val().toLowerCase().indexOf('this') >= 0) {
                $(thistext.toLowerCase().replace('this', ''), $myElement).addClass('highlight3');
            } else
                $('#DesignView').contents().find(thistext).addClass('highlight3');
        }
    })

    //  Trigger toogle sidepanle click
    $('#ToolSet').on('click', function (e) {
        if (e.target == this)
            $('#Toogle-SidePanel').trigger('click');
    })

    /*  Menu Logic  -   Preview, Select Parent, Select Child, Select Previous,Select Next,
                        Move Up, Move Down, Cut, Copy, Paste, Paste Before, Paste After, Paste Style,
                        Clone, Delete, Undo*/
    $('.topIcon').on('click', function () {
        var thisid = this.id;
        var pastethis;

        if ($('[contenteditable="true"]').length > 0)
            return;

        try {
            var prev = $myElement.prev();
            var next = $myElement.next();
            var parent = $myElement.parent();
        } catch (e) {
            //Catch Statement
        }

        try {
            if (thisid == 'PreView') {
                $('.close').show();
                $('#main').hide();
                $('#PreviewPan').html($('#DesignView').contents().find('html').html());
                $('#PreviewPan').show();

            } else if (thisid == 'Parent')
                $myElement.parent().trigger('click');
            else if (thisid == 'Child')
                $myElement.children().first().trigger('click');
            else if (thisid == 'Previous')
                $myElement.prev().trigger('click');
            else if (thisid == 'Next')
                $myElement.next().trigger('click');
            else if (thisid == 'MoveUp') {
                if ($(prev).length > 0) {
                    $('#Cut').trigger('click');
                    $(prev).trigger('click');
                    $('#PasteBefore').trigger('click');
                }
            } else if (thisid == 'MoveDown') {
                if ($(next).length > 0) {
                    $('#Cut').trigger('click');
                    $(next).trigger('click');
                    $('#PasteAfter').trigger('click');
                }
            } else if (thisid == 'Cut') {
                myElementCopy = $myElement.clone();
                $myElement.remove();
            } else if (thisid == 'Copy')
                myElementCopy = $myElement.clone();
            else if (thisid == 'Paste') {
                pastethis = myElementCopy.clone();
                pastethis.removeClass('highlight');
                pastethis.removeClass('highlight2');
                if (isDesignViewClicked) {
                    $('#DesignView').append(pastethis);
                    isDesignViewClicked = false;
                    $(pastethis).trigger('click');
                } else {
                    $myElement.append(pastethis);
                    $(pastethis).trigger('click');
                }

            } else if (thisid == 'PasteBefore') {
                pastethis = myElementCopy.clone();
                $myElement.before(pastethis);
                $(pastethis).trigger('click');
            } else if (thisid == 'PasteAfter') {
                pastethis = myElementCopy.clone();
                $myElement.after(pastethis);
                $(pastethis).trigger('click');
            } else if (thisid == 'PasteStyle') {
                replaceElement = $myElement.clone();
                $ElementToreplace = $myElement;
                var myelemtstyle = myElementCopy.attr('Style');
                $myElement.attr('style', myelemtstyle);
            } else if (thisid == 'Clone') {
                $myElement.after($myElement.clone());
                $myElement.trigger('click');
            } else if (thisid == 'Edit') {
                $myElement.attr('contenteditable', 'true');
                $myElement.css('box-shadow', '0px 0px 10px 0px blue');
                $myElement.focus();
            } else if (thisid == 'Delete') {
                $myElement.remove();
                $('#Inline-Styles').html('');

                if ($(next).length > 0)
                    $(next).trigger('click');
                else if ($(prev).length > 0)
                    $(prev).trigger('click');
                else if ($(parent).length > 0)
                    $(parent).trigger('click');


                if ($('#DesignView').children().length == 0)
                    $('#Breadcrumb').children().remove();
            } else if (thisid == 'Undo') {
                if ($(replaceElement).length > 0) {
                    $ElementToreplace.replaceWith($(replaceElement));
                    $(replaceElement).trigger('click');
                    for (var i = 0; i < $('form').length; i++) {
                        $('form')[i].reset();
                    }
                }

            }

        } catch (err) {

        }
    })

    //  Toogle between Design View, Split View, Source View
    $('.navlist').on('click', function () {
        //    console.log('clicked');
        //    console.log($('#DesignView').contents().find('body').html());
        var tabs = $(this).text() + "View";
        var myDesign, i, j, searchrgb, replacehexa, $DesignView;

        console.log(mycolors);

        $('#Design>div').addClass('d-none');
        $('.navlist').removeClass('activeTab');

        if (tabs == "DesignView") {
            $('#DesignView').removeClass('d-none');
            $('#SourceView').removeClass('col-6');
            $('#DesignView').addClass('col-12');
            $(this).addClass('activeTab')
            if ($('#Footer-Form').css('display').toLowerCase() == 'none')
                $("#Toogle-Footer-Form").trigger('click');
            $('#Design').css('height', 'calc(100% - 230px)');
            DesignViewEvents();
        } else if (tabs == "SourceView") {
            $DesignView = removeEmpty();
            myDesign = $DesignView.html();
            myDesign = myreplace(myDesign);

            editor.session.setValue('<html>' + myDesign + '</html>');
            $('#Footer-Form').hide();
            $('#SourceView').removeClass('d-none');
            $('#SourceView').removeClass('col-6');
            $('#SourceView').addClass('col-12');
            $(this).addClass('activeTab');
            $('#Design').css('height', 'calc(100% - 60px)');
        } else if (tabs == "SplitView") {
            //            $DesignView = removeEmpty();
            //            myDesign = $DesignView.html();
            //            myDesign = myreplace(myDesign);
            myDesign = $('#DesignView').contents().find('html').html();

            editor.session.setValue('<html>' + myDesign + '</html>');
            $('#Footer-Form').hide();
            $('#SourceView').removeClass('d-none');
            $('#SourceView').removeClass('col-12');
            $('#SourceView').addClass('col-6');
            $('#DesignView').removeClass('d-none');
            $('#DesignView').removeClass('col-12');
            $('#DesignView').addClass('col-6');
            $(this).addClass('activeTab');
            $('#Design').css('height', 'calc(100% - 60px)');
            DesignViewEvents();
            $('DesignView').trigger('load');
        }
    })

    //  Toogle Wrap
    $('#Toogle-Wrap, #Wrap').on('mouseover', function () {
        $('#Wrap').slideDown('fast');
    })

    $('#Wrap').on('mouseleave', function () {
        $('#Wrap').slideUp('fast');
    })

    $('.wrapIcon').on('click', function () {
        var wraptag = this.id.replace('Wrap-', '');
        var mytag, temptag;


        var highlight = window.getSelection();
        var highlighthtml = getSelectionHtml();

        console.log(highlighthtml);

        if (wraptag == 'Unwrap') {
            $myElement.replaceWith($myElement.html())
        } else
            mytag = document.createElement(wraptag);

        if (wraptag == 'a') {
            $(mytag).attr('href', highlight);
        }

        console.log(highlighthtml.search(/^\<.*?\>.*?\<\/.*?\>$/));

        if (highlighthtml.search(/^\<.*?\>.*?\<\/.*?\>$/) >= 0) {
            temptag = $(highlighthtml);
            highlighthtml = $(highlighthtml).html();
        } else
            temptag = $('<mytag>' + highlighthtml + '</mytag>');

        $(temptag).wrapInner(mytag);
        var spn = temptag.html();
        console.log(spn);
        $myElement.html($myElement.html().replace(highlighthtml, spn));
    })

    function getSelectionHtml() {
        var html = "";
        if (typeof window.getSelection != "undefined") {
            var sel = window.getSelection();
            if (sel.rangeCount) {
                var container = document.createElement("div");
                for (var i = 0, len = sel.rangeCount, range; i < len; ++i) {
                    range = sel.getRangeAt(i);
                    if (range.startContainer === range.endContainer &&
                        range.startContainer.nodeType === Node.TEXT_NODE &&
                        range.startOffset === 0 &&
                        range.endOffset === range.startContainer.length) {
                        range.selectNode(range.startContainer.parentElement);
                    }
                    container.appendChild(range.cloneContents());
                }
                html = container.innerHTML;
            }
        } else if (typeof document.selection != "undefined") {
            if (document.selection.type == "Text") {
                html = document.selection.createRange().htmlText;
            }
        }
        return html;
    }

    function removeEmpty() {
        var $DesignView = $('#DesignView').contents().find('html').clone();
        $($DesignView).find('*').removeClass('ui-draggable-handle');
        $($DesignView).find('*').removeClass('ui-draggable');
        $($DesignView).find('*').removeClass('ui-droppable-hover');
        $($DesignView).find('*').removeClass('ui-droppable-active');
        $($DesignView).find('*').removeClass('ui-droppable');
        $($DesignView).find('*').removeClass('highlight2');
        $($DesignView).find('*').removeClass('highlight');
        $($DesignView).find('*').removeAttr('data-brackets-id');
        $($DesignView).find('[class=""]').removeAttr('class');
        $($DesignView).find('[id=""]').removeAttr('id');
        $($DesignView).find('[style=""]').removeAttr('style');

        return $DesignView;
    }

    function myreplace(x) {
        x = x.replace(/•/g, '\&bull;');
        x = x.replace(/►/g, '\&#x25BA;');
        x = x.replace(/©/g, '\&copy;');
        x = rgbtohexa(x);
        return x;
    }

    function rgbtohexa(y) {
        if (mycolors.length > 0) {
            for (var i in mycolors) {
                var rgb = mycolors[i].rgb;
                rgb = rgb.replace(/\(/g, '\\(');
                rgb = rgb.replace(/\)/g, '\\)');
                var replacehexa = mycolors[i].hexa;
                var test = new RegExp(rgb, "g");
                y = y.replace(test, replacehexa);
                console.log(y);

            }
        }
        return y;
    }

    //  Toogle The Side Panel
    $('#Toogle-SidePanel').on('click', function () {

        $(this).toggleClass('RotateY');

        if ($('#SidePanel').css('margin-left') == '0px') {
            $('#SidePanel').animate({
                'margin-left': '-250px'
            });
        } else {
            $('#SidePanel').animate({
                'margin-left': '0px'
            });
        }
    });

    //  Toogle Form and Tabs
    $(".toogleIcon").click(function () {

        var toogleTab = this.id.replace("Toogle-", "")
        $("#" + toogleTab).slideToggle("fast");
        $(this).toggleClass('RotateX');

    });

    //  Toogle Footer Form by Adjusting DesignView and Footer form height
    $("#Toogle-Footer-Form").click(function (e) {

        if (e.target !== this)
            return;

        var toogleTab;

        var design = $('.navlist:eq(0)').hasClass('activeTab');

        if (design) {
            if (this.id == "Toogle-Footer-Form") {
                var display = $('#Footer-Form').css('display');
                toogleTab = this.id.replace("Toogle-", "")

                if (display == "block") {
                    $("#" + toogleTab).hide();
                    $('#Design').css('height', 'calc(100% - 60px)');
                } else {
                    $("#" + toogleTab).fadeIn();
                    $('#Design').css('height', 'calc(100% - 230px)');
                }
            } else {
                toogleTab = this.id.replace("Toogle-", "")
                $("#" + toogleTab).slideToggle("fast");
            }

        }
    });

    $('#Toogle-Footer-Form').on('click', '.FooterTabs', function () {

        var design = $('.navlist:eq(0)').hasClass('activeTab');

        if (design) {
            $("#Footer-Form").fadeIn();
            $('#Design').css('height', 'calc(100% - 230px)');
        }
    })

    //  Toogle Range Show and Hide
    $('#SidePanel .tooglerange').click(function () {
        $('.Range').not('#' + this.id + "-range").hide('fast');
        var rangeid = this.id + "-range";
        $("#" + rangeid).toggle('fast');
    });

    //  Hide Search Icon Search
    $('.search').on('input focus', function () {
        $(this).prev().hide();
    })

    //  Show Search Icon on unSearch
    $('.search').on('blur', function () {
        if ($(this).val().length == 0)
            $(this).prev().show();
    })

    // Search Logic
    $('#searchProperty').on('input', function () {
        var searchKey = $(this).val().replace(" ", "").replace("-", "").toLowerCase();


        if (searchKey.length > 0) {
            $('#SidePanel form').hide();
            $('#SidePanel .title').hide();


            $("#SidePanel .row").filter(function () {
                var found = false;
                $(this).find('.lable').filter(function () {
                    if ($(this).text().replace(" ", "").replace("-", "").toLowerCase().indexOf(searchKey) > -1) {
                        found = true;
                    }
                })
                if (found == true) {
                    $(this).show();
                    $(this).parents('form').show();
                    $(this).parents('form').prev().show();
                    $(this).parents('.tabcontent').show();
                    $("#SidePanel .tablinks").removeClass('activeTab')
                } else {
                    $(this).hide();
                }
            });
        } else {
            $("#SidePanel .row").filter(function () {
                $(this).show();
            })
            $('#SidePanel form').hide();
            $('#SidePanel form:eq(1)').show();
            $('#SidePanel .title').show();
            $('#SidePanel .tabcontent').not('#Border-Tab .tabcontent:eq(0)').hide();
            $("#SidePanel .tablinks:eq(0)").addClass('activeTab')
        }

    });

    //  Set Input value to range
    $('input[type="number"]').on("input change", function () {

        var sliderid;


        sliderid = "#" + this.id + "_";
        if ($(this).val().length == 0)
            $(sliderid).val(0);
        else
            $(sliderid).val($(this).val());
    });

    //  Set Range value to input
    $('input[type="range"]').on("input", function () {
        var unitid, inputid, index;

        inputid = "#" + this.id.replace("_", "");
        unitid = inputid + "_unit";

        $(inputid).val($(this).val());

        index = $(unitid).prop('selectedIndex');
        if (index >= 15)
            $(unitid).val("px");
        $(unitid).removeClass("select");
        $(inputid).css("display", "block");
    });

    //  Clip value together logic
    $('input[type="number"], input[type="range"]').on('input', function () {

        var inputid, unitid, thisval, unitval;
        var thisid = this.id.split("-")[0];

        var pos = ["top", "right", "left", "bottom"];
        var br = ["border-radius", "border-top-left-radius", "border-top-right-radius",
           "border-bottom-left-radius", "border-bottom-right-radius"];
        var layout = ["width", "height"];
        var bspcing = ["border-spacing-h", "border-spacing-v"];
        var bgposition = ["background-position-x", "background-position-y"];
        var bgsize = ["background-size-width", "background-size-height"];


        inputid = this.id.replace("_", "");
        unitid = "#" + inputid + "_unit";

        thisval = $(this).val();
        unitval = $(unitid).val();

        if (layout.indexOf(inputid) >= 0 && $("#LayoutClip").is(':checked')) {
            ClipTwoValue("#width", "#height", thisval, unitval)
        } else if (bspcing.indexOf(inputid) >= 0 && $("#SpacingClip").is(':checked')) {
            ClipTwoValue("#border-spacing-h", "#border-spacing-v", thisval, unitval)
        } else if (bgposition.indexOf(inputid) >= 0 && $("#BgPositionClip").is(':checked')) {
            ClipTwoValue("#background-position-x", "#background-position-y", thisval, unitval)
        } else if (bgsize.indexOf(inputid) >= 0 && $("#BgSizeClip").is(':checked')) {
            ClipTwoValue("#background-size-width", "#background-size-height", thisval, unitval)
        } else if (thisid == "padding" && $("#PaddingClip").is(':checked')) {
            ClipIt("#padding-", thisval, unitval)
        } else if (thisid == "margin" && $("#MarginClip").is(':checked')) {
            ClipIt("#margin-", thisval, unitval)
        } else if (pos.indexOf(inputid) >= 0 && $("#PositionClip").is(':checked')) {
            ClipIt("#", thisval, unitval)
        } else if (br.indexOf(inputid) >= 0 && $("#RadiusClip").is(':checked')) {
            RadiusClipIt(thisval, unitval)
        }
    })

    //  Set input type color value to textbox
    $('input[type="color"]').on("input", function () {
        var inputid = "#" + this.id.replace("_", "");
        $(inputid).val($(this).val());
    });

    //  Set textbox color value o input  type color
    $($('input[type="color"]').prev()).on("input", function () {
        var inputid = "#" + this.id + "_";
        $(inputid).val($(this).val());
    });

    //  Units logic
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

    //  Toogle Footer Tabs
    $('.FooterTabs').on('click', function () {
        $('.FooterTabs').removeClass('activeTab');
        var tabid = this.id.replace('Toogle-', '');
        $('#Footer-Form>div').css('display', 'none');
        $('#Footer-Form>div').css('height', '0');
        $(this).addClass('activeTab');
        $('#' + tabid).css('display', 'block');
        $('#' + tabid).css('height', '100%');
    })

    //  Closes the Preview mode
    $('.close').click(function () {
        $('#main').show();
        $('#PreviewPan').hide();
        $('.close').hide();
    });

    //  Trigger the input file on click
    $('.browse').on("click", function () {
        var fileid = this.id.replace("-trigger", "");
        $("#" + fileid).trigger("click");
    });

    //  Set file name as url('File name') from file input
    $('input[type="file"]').on("change input", function () {

        var styleid = this.id.replace("-file", "");
        var showid = styleid + "-show";

        var url = 'url("' + this.files[0].name + '")';
        $("#" + styleid).val(url);
        $("#" + showid).val(this.files[0].name);

        $("#" + styleid).trigger("change");
    });

    //  Set file name as url('File name') from text input
    $('.file').on("change input", function () {

        var styleid = this.id.replace("-show", "");
        var url = 'url("' + $(this).val() + '")';
        $("#" + styleid).val(url);
        $("#" + styleid).trigger("change");
    });

    //  Toogle BorderTabs
    $('.tablinks').on('click', function () {
        var tabid = "#" + this.id.replace('Toogle-', '');
        $('.tablinks').removeClass('activeTab');
        $(this).addClass('activeTab');
        $('.borderTab').hide();
        $(tabid).show();
        $(tabid + ' .tabcontent').show();
    })

    //  Set Extra Style
    $('#More-Form').on('input click', 'input', function () {

        var isThisProp = $(this).hasClass('prop')
        var thisval = $(this).val().trim();
        var prop, val;

        if (isThisProp) {
            prop = thisval;
            val = $(this).parent().next().next().children().first().val();
        } else {
            val = thisval;
            prop = $(this).parent().prev().prev().children().first().val();
        }

        if (typeof prop !== 'undefined' && typeof val !== 'undefined')
            if (prop.length > 0 && val.length > 0)
                setstyle(prop, val);


    })

    //  Genereate Extra Style Row
    $('.addRow').on('click', function () {
        $(this).before('<div class="row"> <div class="col-12 p-0"> <div class="list"> <div class="inputgroup w-100"> <input type="text" class="prop w-100" placeholder="Property"> </div> <span>:</span> <div class="inputgroup w-100"> <input type="text" class="val w-100" placeholder="Value"> <button class="deleteMore" type="button"><i class="fas fa-minus"></i></button> </div> </div> </div> </div>')
    })

    // Delete The dynamic created row od exra style
    $('#More-Form').on('click', '.deleteMore', function () {
        $(this).closest('.row').remove();
    })


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
            $(x.replace("-", "")).val(val + unit + " " + val + unit + " " + val + unit + " " + val + unit);


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

        $("#border-radius").val(val + unit + " " + val + unit + " " + val + unit + " " + val + unit + " ");


        $("#border-top-left-radius_unit").removeClass("select");
        $("#border-top-right-radius_unit").removeClass("select");
        $("#border-bottom-left-radius_unit").removeClass("select");
        $("#border-bottom-right-radius_unit").removeClass("select");

        $("#border-top-left-radius").css("display", "block");
        $("#border-top-right-radius").css("display", "block");
        $("#border-bottom-left-radius").css("display", "block");
        $("#border-bottom-right-radius").css("display", "block");
    }

    //  Clear text and number input
    $('.delete').on("click", function () {
        var inputid = "#" + this.id.replace("delete-", "");
        var sliderid = inputid + "_";
        $(inputid).val("");
        $(sliderid).val(0);
        $(inputid + "_unit").val("px");
        $(inputid).css("display", "block");
        $(inputid + "_unit").removeClass("select");
    });

    // Clear url input
    $('.delete-img').on("click", function () {

        var styleid = "#" + this.id.replace("delete-", "");
        var showid = styleid + "-show";
        $(styleid).val("");
        $(showid).val("");

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

    $('#delete-box-shadow').on("click", function () {

        $('#box-shadow').val("");

        $('#bsh-width').val("");
        $('#bsh-width_unit').val("px");
        $('#bsh-width_').val(0);

        $('#bsv-width').val("");
        $('#bsv-width_unit').val("px");
        $('#bsv-width_').val(0);

        $('#bsb-width').val("");
        $('#bsb-width_unit').val("px");
        $('#bsb-width_').val(0);

        $('#bss-width').val("");
        $('#bss-width_unit').val("px");
        $('#bss-width_').val(0);

        $('#bs-color').val("");
        $('#bs-inset').prop('checked', false);


    });

    //  Reset all input of a form
    $('.deleteall').on("click", function () {

        var formid = this.id.replace("delete-", "");
        var obj, i;


        try {
            if (formid == "Layout-Form") {
                $('#Layout-Form .Range').hide("fast");
                obj = ["width", "height", "min-width", "min-height", "max-width", "max-height",
                   "display", "box-sizing", "float", "clear", "overflow-x", "overflow-y",
                   "visibility", "z-index", "opacity"];
                for (i in obj)
                    setstyle(obj[i], "null");
            } else if (formid == "Position-Form") {
                $('#Position-Form .Range').hide("fast");
                obj = ["position", "top", "right", "bottom", "left"];
                for (i in obj)
                    setstyle(obj[i], "null");
            } else if (formid == "Margin-Form") {
                $('#Margin-Form .Range').hide("fast");
                obj = ["margin", "margin-top", "margin-right", "margin-bottom", "margin-left"];
                for (i in obj)
                    setstyle(obj[i], "null");
            } else if (formid == "Padding-Form") {
                $('#Padding-Form .Range').hide("fast");
                obj = ["padding", "padding-top", "padding-right", "padding-bottom", "padding-left"];
                for (i in obj)
                    setstyle(obj[i], "null");
            } else if (formid == "Text-Form") {
                $('#Text-Form .Range').hide("fast");
                obj = ["color", "font-family", "font-style", "font-variant", "font-weight",
                   "font-size", "line-height", "text-indent", "text-align", "text-decoration",
                   "text-shadow", "text-transform", "letter-spacing", "word-spacing", "white-space",
                   "vertical-align"];
                for (i in obj)
                    setstyle(obj[i], "null");
            } else if (formid == "List-Form") {
                $('#List-Form .Range').hide("fast");
                obj = ["list-style", "list-style-type", "list-style-position", "list-style-image"];
                for (i in obj)
                    setstyle(obj[i], "null");
            } else if (formid == "Border-Form") {
                $('#Border-Form .Range').hide("fast");
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
                $('#Background-Form .Range').hide("fast");
                obj = ["background", "background-size", "background-position", "background-color", "background-image",
                   "background-clip", "background-orgin", "background-attachment", "background-repeat", "box-shadow"];
                for (i in obj)
                    setstyle(obj[i], "null");
            }
        } catch (e) {
            //Catch Statement
        }

        $("#" + formid)[0].reset();



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

        if ($('#selector').val().length > 0) {
            if (val != "null") {
                if ($('#selector').val().toLowerCase().indexOf('this') >= 0) {
                    $($('#selector').val().toLowerCase().replace('this', ''), $myElement).css(prop, val);
                } else
                    $("#DesignView").contents().find($('#selector').val()).css(prop, val);
            } else
                $("#DesignView").contents().find($('#selector').val()).css(prop, "");

            if (val.indexOf('#') >= 0)
                addMyColors($("#DesignView " + $('#selector').val()).css(prop), val)
        } else {
            if (typeof val !== 'undefined') {
                if (val != "null")
                    $myElement.css(prop, val);
                else
                    $myElement.css(prop, "");
            }
            if (val.indexOf('#') >= 0)
                addMyColors($myElement.css(prop), val)
        }
        ShowStyle();
    }

    function addMyColors(rgbval, hexaval) {
        var isExist = false;

        if (mycolors.length > 0) {
            for (var i in mycolors) {
                if (hexaval == mycolors[i].hexa)
                    isExist = true;
            }
        }
        if (!isExist) {
            mycolors.push({
                rgb: rgbval,
                hexa: hexaval
            })
        }
    }

    function ShowStyle() {

        var hasUnit = ["width", "height", "min-width", "min-height", "max-width", "max-height",
                        "top", "right", "bottom", "left",
                        "margin-top", "margin-right", "margin-bottom", "margin-left",
                        "padding-top", "padding-right", "padding-bottom", "padding-left",
                        "font-size", "line-height", "text-indent",
                        "letter-spacing", "word-spacing", "vertical-align",
                        "border-width", "border-top-width", "border-right-width", "border-bottom-width", "border-left-width",
                        "border-top-left-radius", "border-top-right-radius", "border-bottom-left-radius", "border-bottom-right-radius"];

        var style, allstyle, elemId, myselector;
        try {
            $("#Inline-Styles").html("");

            style = $myElement.attr("style");

            var eachstyle = style.split(';');
            var propname, propvalue;
            for (var i in eachstyle) {
                if (typeof eachstyle[i] !== 'undefined' && eachstyle[i] != null && eachstyle[i] != '') {

                    propname = eachstyle[i].split(':')[0].trim();
                    propvalue = eachstyle[i].split(':')[1].trim();

                    var mylist = '<div class="list"><div class="prop">' + propname + '</div>&nbsp;:&nbsp;<span class="value">' + propvalue + '</span><div class="delete ml-auto"><i class="fas fa-minus"></i></div>'
                    $("#Inline-Styles").append(mylist);

                    if (hasUnit.indexOf(propname) >= 0) {
                        console.log('came in2');
                        console.log(propname);
                        console.log(propvalue.split(/(\d+)/g));

                        $("#" + propname).val(propvalue.split(/(\d+)/g)[1]);
                        $("#" + propname + "_unit").val(propvalue.split(/(\d+)/g)[2]);

                    } else {
                        $("#" + propname).val(propvalue);
                    }

                }

            }

        } catch (err) {
            console.log(err);
        }
    }

    //  Set tag Attributes
    $('#Attributes input, #Attributes select').on('input change', function () {

        var value = $(this).val();

        if (this.id == "elementid" || this.id == "elementClass")
            return;

        var attrib = this.id.replace("element", "");
        attrib = attrib.replace("_", "");

        $myElement.attr(attrib, value);

        if ($('#selector').val().length > 0) {
            $("#Design " + $('#selector').val()).attr(attrib, value);
        }

    })

    //  Set Tag Id
    $('#setId').on('click', function () {

        var array = new Array();
        var err = false;
        var myid = $('#elementid').val().toLowerCase();
        var thisid;
        $('html').find("*").each(function () {
            thisid = $(this).attr('id');
            if (typeof thisid !== "undefined")
                array.push(thisid.toLowerCase());
        });


        for (var i in array) {
            if (array[i] == myid) {
                $('#elementid').parent().addClass('err');
                err = true;
                break;
            }
        }
        if (err == false) {
            $('#elementid').parent().removeClass('err');
            $myElement.attr('id', myid);
            myElement = "#" + myid;
        }

        var title = $myElement.prop("tagName").toLowerCase() + " #" + $myElement.attr('id') + " ." + $myElement.attr('class');
        $myElement.attr('title', title);

    })

    //  Get Inline Styles
    $('#Properties input,#Properties select,#Properties button').not('#Attributes-Form input,#Attributes-Form select,#Attributes-Form button').on("change input click", function (e) {
        console.log('came in css');

        if ($(this).hasClass('prop') || $(this).hasClass('val'))
            return;

        var hasUnit = ["min-width", "min-height", "max-width", "max-height",
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
        var test;

        $ElementToreplace = $myElement;
        if (propnew != thisid) {
            propnew = thisid;
            replaceElement = $myElement.clone();
        }

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

        e.stopPropagation();
    });

})
