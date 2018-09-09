$("#rotateall").roundSlider({
    radius: 35,
    width: 10,
    handleSize: "+8",
    handleShape: "dot",
    sliderType: "min-range",
    value: 0,
    startAngle: "270",
    min:"-360",
    max: "360",
    drag: function(args){
        $('#rotateall .rs-container .rs-tooltip-text').addClass('d-block');
        transform(args,"rotate");
    },
    change: function(args){
        $('#rotateall .rs-container .rs-tooltip-text').addClass('d-block');
        transform(args,"rotate");
    }
});

$("#rotatex").roundSlider({
    radius: 35,
    width: 10,
    handleSize: "+8",
    handleShape: "dot",
    sliderType: "min-range",
    value: 0,
    startAngle: "270",
    min:"-360",
    max: "360",
    drag: function(args){
        transform(args,"rotatex");
    },
    change: function(args){
        transform(args,"rotatex");
    }
});

$("#rotatey").roundSlider({
    radius: 35,
    width: 10,
    handleSize: "+8",
    handleShape: "dot",
    sliderType: "min-range",
    value: 0,
    startAngle: "270",
    min:"-360",
    max: "360",
    drag: function(args){
        transform(args,"rotatey");
    },
    change: function(args){
        transform(args,"rotatey");
    }
});

$("#rotatez").roundSlider({
    radius: 35,
    width: 10,
    handleSize: "+8",
    handleShape: "dot",
    sliderType: "min-range",
    value: 0,
    startAngle: "270",
    min:"-360",
    max: "360",
    drag: function(args){
        
        transform(args,"rotatez");
    },
    change: function(args){
        transform(args,"rotatez");
    }
});


$("#skewx").roundSlider({
    radius: 35,
    circleShape: "half-top",
    width: 10,
    handleSize: "+8",
    handleShape: "dot",
    sliderType: "min-range",
    value: 0,
    startAngle: "270",
    min:"-90",
    max: "90",
    drag: function(args){
        transform(args,"skewx");
    },
    change: function(args){
        transform(args,"skewx");
    }
});


$("#skewy").roundSlider({
    radius: 35,
    circleShape: "half-top",
    width: 10,
    handleSize: "+8",
    handleShape: "dot",
    sliderType: "min-range",
    value: 0,
    startAngle: "270",
    min:"-90",
    max: "90",
    drag: function(args){
        transform(args,"skewy");
    },
    change: function(args){
        transform(args,"skewy");
    }
});

function transform(args,prop){
    
    $('#'+prop+' .rs-container .rs-tooltip-text').addClass('d-block');
    var value = prop+"("+args.value+"deg)";
    $(myElement).css('transform',value);
    ShowStyle();
}