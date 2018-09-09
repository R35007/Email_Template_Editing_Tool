var i = 1;

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var nodeCopy = document.getElementById('my' + data).cloneNode(true);
    if (document.getElementById('demoDIV').childNodes.length == 1) {
        i = 1;
    }
    nodeCopy.innerHTML = "My Play Element " + i;
    nodeCopy.id = "my" + data + i;

    ev.target.appendChild(nodeCopy);
    var myids = document.getElementById('myDivids');

    var opt = document.createElement('option');
    opt.value = "my" + data + i;
    opt.innerHTML = "my" + data + i;
    myids.appendChild(opt);

    myids.value = "my" + data + i;
    i++;

}

function drop2(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if (data != 'DragDiv') {
        document.getElementById(data).remove();
        //data.remove();
    }
    console.log(data);
    document.getElementById('myDivids').value = data;
    var index = document.getElementById('myDivids').selectedIndex;
    console.log(index);
    document.getElementById('myDivids').remove(index);
}