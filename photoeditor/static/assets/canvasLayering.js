// single layer class
class Layer{
    constructor(size,name,whole,position){
        this.size=size;
        this.name=name;
        this.whole=whole;
        this.position=position||[0,0];
        this.whole.idCounter++;
        this.id=this.whole.idCounter;
        this.positionLayer=this.whole.layers.length;
        this.canvas=document.createElement("canvas");
        this.canvas.width=this.size[0];
        this.canvas.height=this.size[1];
        this.context=this.canvas.getContext("2d");
        this.visible=true;
        this.rgb=[];
        this.ycbcr=[];
        this.alpha=[];
        this.jas=0;
        this.alphaProcesingData=100; // alpha procentage
        this.layerImage=this.context.getImageData(0,0,this.size[0],this.size[1]);
        this.layerData=this.layerImage;
    }
    //clear whole layer to basic
    clear(){
        this.context.clearRect(0, 0, this.size[0], this.size[1])
    }
    //import image as img obj or base64 dataset or location data
    importImage(data){
        if(typeof(data)=="object"){
            this.context.drawImage(data,0,0,this.size[0],this.size[1]);
            this.whole.render(); 
            this.ImageDataStarted();
        }
        else{
            var img = new Image();
            var that= this;
            img.src=data;
            img.id="foto";
            var pomer=img.width/img.height;
            setTimeout(function(){ 
            that.context.drawImage(img,0,0,that.size[0],that.size[1]);
            that.whole.render(); 
            that.ImageDataStarted();
            }, 200);

        }
    }
    //layer up in whole canvas
    up(){
        if(this.positionLayer!=this.whole.layers.length){
            var upper_layer=this.whole.layers[this.positionLayer+1];
            this.whole.layers[this.positionLayer+1]=this;
            this.whole.layers[this.positionLayer]=upper_layer;
            this.positionLayer++;
            upper_layer.positionLayer--;
        }
        this.whole.render();
    }
    //layer down in whole canvas
    down(){
        if(this.positionLayer!=0){
            var lower_layer=this.whole.layers[this.positionLayer-1];
            this.whole.layers[this.positionLayer-1]=this;
            this.whole.layers[this.positionLayer]=lower_layer;
            this.positionLayer--;
            lower_layer.positionLayer++;
        }
        this.whole.render();
    }
    //change visibility
    visibility(){
        this.visible=!this.visible;
        this.whole.render();
    }
    //destroy layer
    destroy(){
        console.log(this.position,this.whole);
        this.whole.layers.splice(this.position,1);
        console.log(this.whole);
    }
    //rotate layer
    rotate(angle){
        this.layer.scene.context.rotate(angle * Math.PI / 180);
        this.ImageData();
    }
    //create rectangle in the layer
    createRect(r,g,b,width,height,left,top){
        r=r||255;
        g=g||255;
        b=b||255;
        width=width||this.size[0];
        height=height||this.size[1];
        left=left||0;
        top=top||0;
        this.context.fillStyle = "rgb("+r+","+g+","+b+")";
        this.context.fillRect(left,top,width,height);
        this.whole.render();
        this.ImageDataStarted();
    }
    // convert rgb to ycbcr
    RGBtoYCbCr(){
        var width = this.size[0];
        var height= this.size[1];
        var pocethodnot= width*height*3;
        var data = this.rgb;
        var ycbcr=[];
        for(var i=0; i<pocethodnot;i=i+3){
            var r =data[i]
            var g =data[i+1];
            var b = data[i+2];
            var y = Math.floor(r*0.299+g*0.587+b*0.114);
            var cb= Math.floor(r *(-0.16874)+g*(-0.33126)+ b*0.50000 + 128);
            var cr=Math.floor(r*0.50000+g*(-0.41869)+ b*(-0.08131) + 128);
            ycbcr.push(y,cb,cr);
        }
        this.ycbcr=ycbcr;
        this.ImageData();
    }
    // converr ycbcr to rgb
    YCbCrtoRGB(){   
        var ycbcr=this.ycbcr;
        var rgb = this.rgb;
        for(var i=0;i<ycbcr.length;i=i+3){
            rgb[i]=Math.floor(ycbcr[i]+(ycbcr[i+2]-128)*1.402);
            rgb[i+1]=Math.floor(ycbcr[i]+(ycbcr[i+1]-128)*-0.34414+(ycbcr[i+2]-128)*-0.71414);
            rgb[i+2]=Math.floor(ycbcr[i]+(ycbcr[i+1]-128)*1.772);
        }
        this.ImageData();
    }
    // add or substract brightness of image in EV
    brightness(value){
        var EV = value-this.jas;
        this.jas=value;
        var sirka=this.size[0];
        var vyska=this.size[1];
        var data=this.ycbcr;
        var pocetdata=sirka*vyska*3;
        var coef=Math.pow(2,EV);
        for(var x=0;x<=pocetdata;x+=3){
            var jas = Math.floor(data[x]*coef);
            if(jas<255){
              data[x]=jas;
            }
            else{
              data[x]=255;
            }
        }
        this.YCbCrtoRGB();
    }
    // make layer more or less transparent
    alphaProcesing(procent){
        if(procent<0){
            procent=0;
        }
        else if(procent>100){
            procent=100;
        }
        var length=this.alpha.length;
        for(var i=0;i<length;i++){
            var hodnota=(this.alpha[i]/this.alphaProcesingData)*procent;
            if(hodnota>255){
                this.alpha[i]=255;
            }
            else{
                this.alpha[i]=hodnota;
            }
        }
        this.ImageData();
        this.alphaProcesingData=procent;
    }
    // get imagedata after build layer
    ImageDataStarted(){
        this.layerImage=this.context.getImageData(0,0,this.size[0],this.size[1]);
        this.layerData=this.layerImage.data;
        this.rgb=[];
        this.alpha=[]
        for(var i=0; i<this.size[0]*this.size[1]*4;i=i+4){
            this.rgb.push(this.layerData[i]);
            this.rgb.push(this.layerData[i+1]);
            this.rgb.push(this.layerData[i+2]);
            this.alpha.push(this.layerData[i+3]);
        }
        this.ImageData();
    }
    /* analyze and make Image Data for render */
    ImageData(){
        var width = this.size[0];
        var height= this.size[1];
        var pocethodnot= width*height*3;
        var plus=0;
        for(var i=0;i<pocethodnot;i=i+3){
            this.layerData[i+plus]=this.rgb[i]
            this.layerData[i+1+plus]=this.rgb[i+1]
            this.layerData[i+2+plus]=this.rgb[i+2]
            this.layerData[i+3+plus]=this.alpha[plus];
            plus++;
        }
        this.context.putImageData(this.layerImage,0,0);
        this.whole.render()
    }
}
// whole canvas data layer
class Canvas{
    constructor(size,workspace,style){
        this.size=size;
        this.layers=[];
        this.canvas=document.createElement("canvas");
        this.canvas.width=this.size[0];
        this.canvas.height=this.size[1];
        this.canvas.id="canvas-layers";
        this.canvas.style=style;
        this.idCounter=0;
        this.context=this.canvas.getContext("2d");
        this.histogramDataY=[];
        this.histogramDataR=[];
        this.histogramDataG=[];
        this.histogramDataB=[];
        this.histView=false;
        this.chart="";
        this.options="";
        document.getElementById(workspace).appendChild(this.canvas);
    }
    // create layer in this canvas
    createLayer(name,size){
        size=size||this.size;
        name=name||"Layer "+ this.layers.length.toString(10);
        var layer= new Layer(size, name, this);
        this.layers.push(layer);
        this.render();
        return layer;
    }
    // find layer by name of canvas
    findLayer(name){
        var layerFind=null;
        this.layers.forEach(function(layer){
            console.log(layer.name,name);
            if(layer.name==name){
                layerFind=layer;
            }
        });
        return layerFind;
    }
    // clear every layer via Layer.clear()
    clear(){
        this.layers.forEach(function(layer){
            layer.clear();
        });
        this.render();
    }
    // clear canvas ('scene')
    clearScene(){
        this.context.clearRect(0,0,this.size[0],this.size[1]);
    }
    //render every layer - into one whole canvas that is displayed
    render(){
        this.clearScene();
        var that= this;
        this.layers.forEach(function(layer){
            if(layer.visible){
                that.context.drawImage(layer.canvas,0,0,layer.size[0],layer.size[1]);
            }
        }); 
        if(this.histView){
            this.histogram();
        }
        if(document.getElementById(this.layersShowDiv)!=null){
            this.layershow(this.layersShowDiv);
        }
    }
    //make histogram data for histogram update method
    histogram(){
        var data = this.context.getImageData(0,0,this.size[0],this.size[1]).data;
        var y=[];
        var r=[];
        var g=[];
        var b=[];
        for(var i=0;i<256;i++){
            y.push(0);
            r.push(0);
            b.push(0);
            g.push(0);
        }
        for(var x=0;x<this.size[0]*this.size[1]*4;x=x+4){
            var ynew= Math.floor(0.3*data[x]+0.59*data[x+1]+0.11*data[x+2])
            y[ynew]++;
            r[data[x]]++;
            g[data[x+1]]++;
            b[data[x+2]]++;
        }
        this.histogramData=[];
        this.histogramDataY.push(y);
        this.histogramDataR.push(r);
        this.histogramDataG.push(g);
        this.histogramDataB.push(b);
        this.updateHistogram();
    }
    // show histogram @param div -> id of div where is histogram showed, @param text -> default YRGB, or text=='none' for button with no text 
    showHistogram(div,text){
        if(text=="none"){
            text="    ";
        }
        else{
            text="YRGB";
        }
        this.histView=!this.histView;
        /*zde dodělat zobrazení grafu */
        google.charts.load('current', {'packages':['corechart']});
        let that=this;
        google.charts.setOnLoadCallback(drawChart);

        this.options = {
            legend: 'none',
            backgroundColor: { fill:'transparent' },
            vAxis: {viewWindow: {
                    min: 0,
                    max:20000
                },
                scaleType: 'lin',
                gridlines: { count: 0 }
            },
            colors: ['#dddddd']
        };
        function drawChart() {
            var datas=new Array(['hodnoty', 'Y']);
            for (var i = 0; i < 256; i++) {
                datas.push([i,0]); 
            }
            var data = google.visualization.arrayToDataTable(datas);
            var divHist='<div class="btns-hist"><button onclick="changeHistColor(this)" class="canvasLayeringBtnHist cLBHActive cLBY" data-type="y">'+text.slice(0,1)+'</button><button  onclick="changeHistColor(this)"  class="canvasLayeringBtnHist cLBR" data-type="r">'+text.slice(1,2)+'</button><button onclick="changeHistColor(this)"  class="canvasLayeringBtnHist cLBG" data-type="g">'+text.slice(2,3)+'</button><button onclick="changeHistColor(this)" class="canvasLayeringBtnHist cLBB" data-type="b">'+text.slice(3,4)+'</button></div><div id="CLHistogram"></div>';
            document.getElementById(div).innerHTML+=divHist;
            setTimeout(function(){
            that.chart = new google.visualization.AreaChart(document.getElementById("CLHistogram"));
            that.chart.draw(data, that.options);},50);
        }
    }
    // download image from whole canvas
    download(name,format){
        name=name||"untitled";
        format=format||"jpg";
        var datafrom = this.canvas;
        var link = document.createElement('a');
        var format=$("#savingFormat").val();
        if(format=="jpg"){
            link.download = name+'.jpg';
            link.href = datafrom.toDataURL("image/jpeg");
        }
        else if(format=="png"){
            link.download = name+'.png';
            link.href = datafrom.toDataURL("image/png");
        }
        else{
            link.download = name+'.webp';
            link.href = datafrom.toDataURL("image/webp");
        }
        link.click();
    }
    // update histogram - sizes, data etc, everytime with render method
    updateHistogram(){
        if(this.histView){
            var type= document.getElementsByClassName("cLBHActive")[0].getAttribute("data-type")||"y";
            var data ="";
            var color="";
            if(type=="g"){
                data=this.histogramDataG;
                color=['#00ff00'];
            }
            else if(type=="r"){
                data=this.histogramDataR;
                color=['#ff0000'];
            }
            else if(type=="b"){
                data=this.histogramDataB;
                color=['#0000ff'];
            }
            else if(type=="y"){
                data=this.histogramDataY;
                color=['#dddddd'];
            }
            this.options.colors = color;
            var datos=data;
            var datas=new Array(['hodnoty', color]);
            for (var i = 0; i < 256; i++) {
                datas.push([i,datos[0][i]]); 
            }
            var arr=google.visualization.arrayToDataTable(datas);
            this.chart.draw(arr, this.options);
        }
    }
    // same as histogramShow method -  if you want to show layer and work with them
    layershow(divLayers){
        divLayers=divLayers||this.layersShowDiv;
        this.layersShowDiv=divLayers;
        var layers=document.getElementById(divLayers);
        var activeLayer=document.getElementsByClassName("activeLayer").length;
        if(activeLayer>0){
            var hodnotaActiveLayer=document.getElementsByClassName("activeLayer")[0].getAttribute("layer-id");
        }
        else{
            var hodnotaActiveLayer=0;
        }
        layers.innerHTML="";
        var x=0;
        for(var i=this.layers.length-1;i>=0;i--){
            if(i==this.layers.length-1){
                var data="<input type='text' class='layerName' layer-id='"+i+"' value='"+this.layers[i].name+"'><button class='layerDown'  onclick='layerDown("+i+")' layer-id='"+i+"'>↓</button>";
            }
            else if(i==0){
                var data="<input type='text' class='layerName' layer-id='"+i+"' value='"+this.layers[i].name+"'><button class='layerUp' onclick='layerUp("+i+")' layer-id='"+i+"'>↑</button>";
            }
            else{ 
                var data="<input type='text' class='layerName' layer-id='"+i+"' value='"+this.layers[i].name+"'><button class='layerUp' onclick='layerUp("+i+")' layer-id='"+i+"'>↑</button><button class='layerDown' onclick='layerDown("+i+")' layer-id='"+i+"'>↓</button>";
            }
            var img=imagedata_to_image(this.layers[i].layerImage,i); 
            if(i==this.layers.length-1){
                layers.innerHTML+="<div id='layerShowing"+i+"' class='layerShowing activeLayer' layer-id='"+i+"'>"+data+"<button onclick='deleteLayer("+i+")'>X</button></div>";    
            }
            else{
                if(activeLayer>0&&hodnotaActiveLayer==i){
                    layers.innerHTML+="<div id='layerShowing"+i+"' class='layerShowing activeLayer' layer-id='"+i+"'>"+data+"<button onclick='deleteLayer("+i+")'>X</button></div>";    
                }
                else{
                    layers.innerHTML+="<div id='layerShowing"+i+"' class='layerShowing' layer-id='"+i+"'>"+data+"<button onclick='deleteLayer("+i+")'>X</button></div>";    
                }
            }  
            var div = document.getElementById("layerShowing"+i);
            if(div==null){
                div = document.createElement("div");
                div.id="layerShowing"+i;
            }
            var oldData = div.innerHTML;
            div.innerHTML="";
            if(this.layers[i].visible){
                div.innerHTML+="<button onclick='visibilityOfLayer("+i+")' class='layerVisibility' layer-id='"+i+"'><svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'><path d='M12.01 20c-5.065 0-9.586-4.211-12.01-8.424 2.418-4.103 6.943-7.576 12.01-7.576 5.135 0 9.635 3.453 11.999 7.564-2.241 4.43-6.726 8.436-11.999 8.436zm-10.842-8.416c.843 1.331 5.018 7.416 10.842 7.416 6.305 0 10.112-6.103 10.851-7.405-.772-1.198-4.606-6.595-10.851-6.595-6.116 0-10.025 5.355-10.842 6.584zm10.832-4.584c2.76 0 5 2.24 5 5s-2.24 5-5 5-5-2.24-5-5 2.24-5 5-5zm0 1c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z'/></svg></button>";
            }
            else{
                div.innerHTML+="<button onclick='visibilityOfLayer("+i+")' class='layerVisibility' layer-id='"+i+"'><svg width='24' height='24' xmlns='http://www.w3.org/2000/svg' fill-rule='evenodd' clip-rule='evenodd'><path d='M8.137 15.147c-.71-.857-1.146-1.947-1.146-3.147 0-2.76 2.241-5 5-5 1.201 0 2.291.435 3.148 1.145l1.897-1.897c-1.441-.738-3.122-1.248-5.035-1.248-6.115 0-10.025 5.355-10.842 6.584.529.834 2.379 3.527 5.113 5.428l1.865-1.865zm6.294-6.294c-.673-.53-1.515-.853-2.44-.853-2.207 0-4 1.792-4 4 0 .923.324 1.765.854 2.439l5.586-5.586zm7.56-6.146l-19.292 19.293-.708-.707 3.548-3.548c-2.298-1.612-4.234-3.885-5.548-6.169 2.418-4.103 6.943-7.576 12.01-7.576 2.065 0 4.021.566 5.782 1.501l3.501-3.501.707.707zm-2.465 3.879l-.734.734c2.236 1.619 3.628 3.604 4.061 4.274-.739 1.303-4.546 7.406-10.852 7.406-1.425 0-2.749-.368-3.951-.938l-.748.748c1.475.742 3.057 1.19 4.699 1.19 5.274 0 9.758-4.006 11.999-8.436-1.087-1.891-2.63-3.637-4.474-4.978zm-3.535 5.414c0-.554-.113-1.082-.317-1.562l.734-.734c.361.69.583 1.464.583 2.296 0 2.759-2.24 5-5 5-.832 0-1.604-.223-2.295-.583l.734-.735c.48.204 1.007.318 1.561.318 2.208 0 4-1.792 4-4z'/></svg></button>";
            }
            div.appendChild(img);
            div.innerHTML+=oldData;
            x++;               
        }
        for(var x=0;x<this.layers.length;x++){
            var img=document.getElementById("img"+x);
            var bg = document.getElementById("background-img"+x);
            if(bg==null){
                bg = document.createElement("div");
                bg.id="background-img"+x;
            }
            bg.style.cssText="left:"+0+"; position:'relative';'margin-right':"+0;
        }
    }
}
// change color of histogram Y,R,G,B
function changeHistColor(el){ 
    document.getElementsByClassName("cLBHActive")[0].classList.remove("cLBHActive");
    el.classList.add("cLBHActive");
    canvas.updateHistogram();
}
//delete layer with given id
function deleteLayer(id){
    canvas.layers[id].destroy();
    canvas.render();
}
//change visibility of layer with given id
function visibilityOfLayer(id){
    canvas.layers[id].visibility();
}
//get layer lower with given id
function layerDown(id){
    canvas.layers[id].down();
}
// get layer upper with given id
function layerUp(id){
    canvas.layers[id].up();
}
// make img obj from imageData from canvas
function imagedata_to_image(imagedata,i) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);

    var image = new Image();
    image.src = canvas.toDataURL();
    image.id="img"+i;
    image.className="layerImage";
    return image;
}
function makeColorLayer(hex){
    hex=hex||"#ffffff";
    var values=hexToRgb(hex);
    canvas.createLayer("Layer "+canvas.layers.length);
    canvas.layers[canvas.layers.length-1].BGcolor();
    canvas.render();
}
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }