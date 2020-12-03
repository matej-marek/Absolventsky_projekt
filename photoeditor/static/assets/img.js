/* photo editor */
class img{
    constructor(){
        this.r=[];
        this.g=[];
        this.b=[];
        this.y=[];
    }
    data(data){
        var img = "<img id='photo' src='"+data+"'>";
        var workspace =document.getElementById("workspace");
        workspace.innerHTML=img;
        var img = document.getElementById('photo');
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
        this.canvas=canvas;
    }
    async histogram(){
        var histy=[];
        var histr=[];
        var histg=[];
        var histb=[];
        for( var i=0;i<256;i++){
            histy.push(0);
            histr.push(0);
            histg.push(0);
            histb.push(0);
        }
        for (var x = 1; x <=this.canvas.width; x++) {
            for (var y = 0; y <= this.canvas.height; y++) {
                var pixel = this.canvas.getContext('2d').getImageData(x, y, 1, 1).data;
                var j=Math.floor(pixel[0]*0.29+pixel[1]*0.6+pixel[2]*0.11);
                histy[j]++;
                histr[pixel[0]]++;
                histg[pixel[1]]++;
                histb[pixel[2]]++;
            }

        }
        this.g=histg;
        this.b=histb;
        this.r=histr;
        this.y=histy;
        this.zobrazeniHistogram();
    }
    zobrazeniHistogram(){
        var type= $(".activeBtn").attr("data-type");
        var data ="";
        var color="";
            if(type=="g"){
                data=this.g;
                color=['#00ff00'];
            }
            if(type=="r"){
                data=this.r;
                color=['#ff0000'];
            }
            if(type=="b"){
                data=this.b;
                color=['#0000ff'];
            }
            if(type=="y"){
                data=this.y;
                color=['#dddddd'];
            }
        var datas=new Array(['hodnoty', 'Y']);
        options.colors = color;
        var datos=data;
            var datas=new Array(['hodnoty', color]);
            for (i = 0; i < 256; i++) {
                datas.push([i,datos[i]]); 
            }
            var arr=google.visualization.arrayToDataTable(datas
            );
        var chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
        chart.draw(arr, options);
    }
}