var canvas = new fabric.Canvas('canvas',{
    width:700,
    height:400
})
var activate = document.getElementById('activate');
let line;
activate.addEventListener('click',drawLine);
let flag=false;


function drawLine(){ 
    canvas.on('mouse:down',switchOn);
    canvas.on('mouse:move',switchDraw);
    canvas.on('mouse:up',switchOff);
    canvas.selection=false;
    canvas.hoverCursor= 'auto';    
}
function switchOn(){
    let pointer = canvas.getPointer(this.e);
    line = new fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y],{
        id:'canvas-lines',
        stroke:'yellow',
        strokeWidth:2,
        selectable:false
    });
    canvas.add(line);
    canvas.requestRenderAll();
    flag=true;
}
function switchDraw(){
    if(flag===true){
        let pointer = canvas.getPointer(this.e);
    line.set({
        x2: pointer.x,
        y2: pointer.y
    });
    canvas.add(line);
    canvas.requestRenderAll();
    }
}
function switchOff(){
    flag = false;
    line.setCoords();
}

var deactivate = document.getElementById('deactivate');
deactivate.addEventListener('click',stopDrawLine);
// const stopDrawLine=()=>{
//     canvas.off('mouse:down',switchOn);
//     canvas.off('mouse:move',switchDraw);
//     canvas.off('mouse:up',switchOff);
// }

function stopDrawLine(){
    canvas.off('mouse:down',switchOn);
    canvas.off('mouse:move',switchDraw);
    canvas.off('mouse:up',switchOff);

    canvas.getObjects().forEach( o=> {
        if(o.id==='canvas-lines'){
            o.set({
                selectable:true
            })
        }
    })
}




   var color= document.getElementById('color');
   color.addEventListener('change',(event)=>{
       changeColor(this);
   });


// canvas.on('change', ()=>{
//     line.setStroke($('input#color').val())
//     canvas.renderAll();
//   })



  function changeColor(element) 
{
    var activeObject = canvas.getActiveObject(),
    color = "#"+element.value;

    console.log(color)    
    console.log(activeObject)
    activeObject.set({stroke : color, strokeWidth: 5});
    canvas.renderAll();
}