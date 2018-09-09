/*eslint-disable no-unused-vars*/
/* eslint-env browser */
/* global document */
/*global $*/
/*eslint no-console:  ["error", { allow: ["warn", "error", "log","no-used-vars"] }] */


function Change(x) {
    document.getElementById('myDivids').value = x.id;
}

$('input[type="number"]').on("input change", function() {
    var sliderid="#"+this.id.replace("_", "");
    if($(this).val().length == 0){
        $(sliderid).val(0);
    }else{
        $(sliderid).val($(this).val());
    }
    
    
});

$('input[type="range"] , input[type="color"]').on("input", function() {
    var inputid="#"+this.id+"_";
    var unit=inputid+"Unit";
    $(unit).val("px");
    $(unit).removeClass("select");
    $(inputid).css("display","block");
    $(inputid).val($(this).val());
});

$('.unit').on("change", function() {
    var inputid="#"+this.id.replace("Unit","");
    var unitval=$(this).val();
    if (unitval=="auto"){
        $(inputid).css("display","none");
        $(inputid).val("");
        $(inputid.replace("_","")).val(0);
        $(this).addClass("select");
    }else{
        $(inputid).css("display","block");
        $(this).removeClass("select");
    }
    
    if(inputid=="#Font-Size_"){
        var index = $("#"+this.id).prop('selectedIndex');
        if(index>=15){
            $(inputid).css("display","none");
            $(inputid).val("");
            $(inputid.replace("_","")).val(0);
            $(this).addClass("select");
        }else{
            $(inputid).css("display","block");
            $(this).removeClass("select");
        }
    }
        
});

$('.delete').on("click", function() {
    var sliderid="#"+this.id.replace("Delete-","");
    var inputid=sliderid+"_";
    $(inputid).val("");
    $(sliderid).val(0);
    $(inputid+"Unit").val("px");
    $(inputid).css("display","block");
    $(inputid+"Unit").removeClass("select");
});

function DeleteAll(Short, Top, Right, Bottom, Left) {
    $("#"+Short).val("");
    

    $("#"+Top).val("");
    $("#"+Top+"Unit").val("px");
    $("#"+Top.replace("_", "")).val(0);

    $("#"+Right).val("");
    $("#"+Right+"Unit").val("px");
    $("#"+Right.replace("_", "")).val(0);

    $("#"+Bottom).val("");
    $("#"+Bottom+"Unit").val("px");
    $("#"+Bottom.replace("_", "")).val(0);

    $("#"+Left).val("");
    $("#"+Left+"Unit").val("px");
    $("#"+Left.replace("_", "")).val(0);
}

$('input,select,button').on("change input click", function() {
    
    var myStyle={};
    
    myStyle.width=$("#Width_").val();
    myStyle.height=$("#Height_").val();
    myStyle.min_width=$("#Min-Width_").val();
    myStyle.min_height=$("#Min-Height_").val();
    myStyle.max_width=$("#Max-Width_").val();
    myStyle.max_height=$("#Max-Height_").val();
    myStyle.display=$("#Display").val();
    myStyle.box_sizing=$("#Box-Sizing").val();
    myStyle.overflow_x=$("#Overflow-x").val();
    myStyle.overflow_y=$("#Overflow-y").val();
    myStyle.opacity=$("#Opacity_").val();
    myStyle.z_index=$("#Z-index_").val();
    myStyle.position=$("#Position").val();
    
    myStyle.top=getValue("Position-Top_");
    myStyle.bottom=getValue("Position-Bottom_");
    myStyle.left=getValue("Position-Left_");
    myStyle.right=getValue("Position-Right_");
    
    myStyle.margin_top=getValue("Margin-Top_");
    myStyle.margin_right=getValue("Margin-Right_");
    myStyle.margin_bottom=getValue("Margin-Bottom_");
    myStyle.margin_left=getValue("Margin-Left_");
    myStyle.margin=$("#Margin_").val();
    
    myStyle.padding_top=getValue("Padding-Top_");
    myStyle.padding_right=getValue("Padding-Right_");
    myStyle.padding_bottom=getValue("Padding-Bottom_");
    myStyle.padding_left=getValue("Padding-Left_");
    myStyle.background_color=$("#BgColor_").val();
    myStyle.padding=$("#Padding_").val();
    
    myStyle.border=$("#Border_").val();
    
    setValue(myStyle);
        
});

function getValue(x){
    var val=$("#"+x).val();
    var unit=$("#"+x+"Unit").val();
    if(unit=="auto"){
        return "auto";
    }else if(val.length==0){
        return ""
    }else{
        return val+unit;
    }
}

function setValue(x){
    
    console.log(x);
    var element=$("#myDivids").val();
    var i=0;
    var obj;
    for(obj in x){
        if(x[obj].length>0){
            $("#"+element).css(obj.replace("_","-"), x[obj]);
        i++;
        }else if(obj!="margin" && obj!="padding" && obj!="border"){
            $("#"+element).css(obj.replace("_","-"), "");
        }
   }
}

function showTab(mytab,button){
    
    $(".tabcontent").css("display","none");
    $(".tablinks").removeClass('activeTab')
    
    $(mytab).css("display","block");
    $(button).addClass('activeTab');
}