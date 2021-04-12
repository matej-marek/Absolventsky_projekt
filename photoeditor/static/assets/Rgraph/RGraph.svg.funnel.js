
RGraph=window.RGraph||{isrgraph:true,isRGraph:true,rgraph:true};RGraph.SVG=RGraph.SVG||{};(function(win,doc,undefined)
{RGraph.SVG.Funnel=function(conf)
{this.set=function(name,value)
{if(arguments.length===1&&typeof name==='object'){for(i in arguments[0]){if(typeof i==='string'){name=ret.name;value=ret.value;this.set(name,value);}}}else{var ret=RGraph.SVG.commonSetter({object:this,name:name,value:value});name=ret.name;value=ret.value;this.properties[name]=value;if(name==='colors'){this.originalColors=RGraph.SVG.arrayClone(value);this.colorsParsed=false;}}
return this;};this.get=function(name)
{return this.properties[name];};conf.data=RGraph.SVG.stringsToNumbers(conf.data);this.id=conf.id;this.uid=RGraph.SVG.createUID();this.container=document.getElementById(this.id);this.layers={};this.svg=RGraph.SVG.createSVG({object:this,container:this.container});this.isRGraph=true;this.isrgraph=true;this.rgraph=true;this.width=Number(this.svg.getAttribute('width'));this.height=Number(this.svg.getAttribute('height'));this.data=RGraph.SVG.arrayClone(conf.data);this.originalData=RGraph.SVG.arrayClone(conf.data);this.type='funnel';this.coords=[];this.colorsParsed=false;this.originalColors={};this.gradientCounter=1;this.nodes=[];this.shadowNodes=[];this.max=0;this.redraw=false;this.highlight_node=null;RGraph.SVG.OR.add(this);this.container.style.display='inline-block';var obj=this;this.data.forEach(function(val,key,arr)
{obj.max=Math.max(obj.max,val);});this.properties={marginLeft:35,marginRight:35,marginTop:35,marginBottom:35,backgroundBars:false,backgroundBarsOpacity:0.25,backgroundBarsColors:null,colorsStroke:'white',colors:['red','black','orange','green','#6ff','#ccc','pink','orange','cyan','maroon','olive','teal'],textColor:'black',textFont:'Arial, Verdana, sans-serif',textSize:12,textBold:false,textItalic:false,labels:[],labelsFont:null,labelsSize:null,labelsColor:null,labelsBold:null,labelsItalic:null,labelsBackground:null,labelsHalign:'center',labelsPosition:'section',linewidth:1,tooltips:null,tooltipsOverride:null,tooltipsEffect:'fade',tooltipsCssClass:'RGraph_tooltip',tooltipsCss:null,tooltipsEvent:'click',tooltipsFormattedThousand:',',tooltipsFormattedPoint:'.',tooltipsFormattedDecimals:0,tooltipsFormattedUnitsPre:'',tooltipsFormattedUnitsPost:'',tooltipsFormattedKeyColors:null,tooltipsFormattedKeyColorsShape:'square',tooltipsFormattedKeyLabels:[],tooltipsFormattedTableHeaders:null,tooltipsFormattedTableData:null,tooltipsPointer:true,tooltipsPositionStatic:true,highlightStroke:'rgba(0,0,0,0)',highlightStroke:'rgba(0,0,0,0)',highlightFill:'rgba(255,255,255,0.7)',highlightLinewidth:1,title:'',titleX:null,titleY:null,titleHalign:'center',titleValign:null,titleSize:null,titleColor:null,titleFont:null,titleBold:null,titleItalic:null,titleSubtitle:null,titleSubtitleSize:null,titleSubtitleColor:'#aaa',titleSubtitleFont:null,titleSubtitleBold:null,titleSubtitleItalic:null,key:null,keyColors:null,keyOffsetx:0,keyOffsety:0,keyLabelsOffsetx:0,keyLabelsOffsety:-1,keyLabelsFont:null,keyLabelsSize:null,keyLabelsColor:null,keyLabelsBold:null,keyLabelsItalic:null};RGraph.SVG.getGlobals(this);if(RGraph.SVG.FX&&typeof RGraph.SVG.FX.decorate==='function'){RGraph.SVG.FX.decorate(this);}
this.responsive=RGraph.SVG.responsive;var properties=this.properties;this.draw=function()
{RGraph.SVG.fireCustomEvent(this,'onbeforedraw');this.width=Number(this.svg.getAttribute('width'));this.height=Number(this.svg.getAttribute('height'));this.data=RGraph.SVG.arrayClone(this.originalData);this.coords=[];RGraph.SVG.createDefs(this);this.graphWidth=this.width-properties.marginLeft-properties.marginRight;this.graphHeight=this.height-properties.marginTop-properties.marginBottom;for(var i=0,len=this.data.length;i<len;++i){if(typeof this.data[i]==='string'){this.data[i]=RGraph.SVG.stringsToNumbers(this.data[i]);}}
RGraph.SVG.resetColorsToOriginalValues({object:this});this.parseColors();this.drawFunnel();this.drawBackgroundBars();this.drawLabels();RGraph.SVG.drawTitle(this);if(typeof properties.key!==null&&RGraph.SVG.drawKey){RGraph.SVG.drawKey(this);}else if(!RGraph.SVG.isNull(properties.key)){alert('The drawKey() function does not exist - have you forgotten to include the key library?');}
var obj=this;document.body.addEventListener('mousedown',function(e)
{obj.hideHighlight(obj);},false);RGraph.SVG.fireCustomEvent(this,'ondraw');return this;};this.drawFunnel=function(opt)
{var centerx=properties.marginLeft+(this.graphWidth/2);for(var i=0;i<(this.data.length-1);++i){var value=this.data[i],nextValue=this.data[i+1],maxWidth=this.graphWidth,width=(value/this.max)*this.graphWidth,height=this.graphHeight/(this.data.length-1),nextWidth=(nextValue/this.max)*this.graphWidth,nextHeight=height;var x1=centerx-(width/2),y1=properties.marginTop+(height*i),x2=centerx+(width/2),y2=properties.marginTop+(height*i);x3=centerx+(nextWidth/2),y3=properties.marginTop+(height*(i+1)),x4=centerx-(nextWidth/2),y4=properties.marginTop+(height*(i+1));this.coords.push({x1:x1,y1:y1,x2:x2,y2:y2,x3:x3,y3:y3,x4:x4,y4:y4,widthTop:x2-x1,widthBottom:x3-x4,height:y3-y2,object:this});}
for(var i=0,len=this.coords.length,sequentialIndex=0;i<len;++i,++sequentialIndex){if(i<len){var coords=this.coords[i];var path=RGraph.SVG.create({svg:this.svg,type:'path',parent:this.svg.all,attr:{d:'M {1} {2} L {3} {4} L {5} {6} L {7} {8} z'.format(coords.x1,coords.y1,coords.x2,coords.y2,coords.x3,coords.y3,coords.x4,coords.y4),stroke:properties.colorsStroke,fill:properties.colors[i],'stroke-width':properties.linewidth,'data-value':this.data[i],'data-index':i}});coords.element=path;if(!RGraph.SVG.isNull(properties.tooltips)&&(properties.tooltips[i]||typeof properties.tooltips==='string')){var obj=this;(function(idx,seq)
{path.addEventListener(properties.tooltipsEvent.replace(/^on/,''),function(e)
{obj.removeHighlight();RGraph.SVG.tooltip({object:obj,index:idx,group:null,sequentialIndex:seq,text:typeof properties.tooltips==='string'?properties.tooltips:properties.tooltips[seq],event:e});obj.highlight(e.target);},false);path.addEventListener('mousemove',function(e)
{e.target.style.cursor='pointer'},false);})(i,sequentialIndex);}}}};this.redrawFunnel=function()
{};this.drawBackgroundBars=function()
{if(properties.backgroundBars){for(var i=0;i<this.coords.length;++i){var coords=this.coords[i];RGraph.SVG.create({svg:this.svg,type:'rect',parent:this.layers.background1,attr:{x:0,y:coords.y1,width:this.width,height:coords.y3-coords.y2,fill:properties.backgroundBarsColors&&typeof properties.backgroundBarsColors==='object'&&typeof properties.backgroundBarsColors[i]==='string'?properties.backgroundBarsColors[i]:properties.colors[i],'fill-opacity':properties.backgroundBarsOpacity}});}}};this.drawLabels=function()
{var labelsGroup=RGraph.SVG.create({svg:this.svg,parent:this.svg.all,type:'g'});var textConf=RGraph.SVG.getTextConf({object:this,prefix:'labels'});if(properties.labelsHalign==='left'){var x=15;var halign='left';}else if(properties.labelsHalign==='right'){var x=this.width-15;var halign='right';}else{var x=this.width/2;var halign='center';}
if(properties.labels&&properties.labels.length){if(properties.labelsPosition==='section'){var sectionHeight=this.graphHeight/properties.labels.length;for(var i=0;i<properties.labels.length;++i){RGraph.SVG.text({object:this,svg:this.svg,parent:labelsGroup,tag:'labels',text:typeof properties.labels[i]==='string'||properties.labels[i]==='number'?properties.labels[i].toString():'',x:x,y:properties.marginTop+(sectionHeight/2)+(i*sectionHeight),halign:halign,valign:'center',background:properties.labelsBackground||'rgba(255,255,255,0.5)',padding:2,color:textConf.color,size:textConf.size,bold:textConf.bold,italic:textConf.italic,font:textConf.font});}}else{for(var i=0;i<properties.labels.length;++i){RGraph.SVG.text({object:this,svg:this.svg,parent:labelsGroup,tag:'labels',text:typeof properties.labels[i]==='string'||properties.labels[i]==='number'?properties.labels[i].toString():'',x:x,y:properties.marginTop+((this.graphHeight/(properties.labels.length-1))*i),halign:halign,valign:'center',background:properties.labelsBackground||'rgba(255,255,255,0.5)',padding:2,size:textConf.size,bold:textConf.bold,italic:textConf.italic,color:textConf.color,font:textConf.font});}}}};this.highlight=function(path)
{var path=path.getAttribute('d');var highlight=RGraph.SVG.create({svg:this.svg,parent:this.svg.all,type:'path',attr:{d:path,fill:properties.highlightFill,stroke:properties.highlightStroke,'stroke-width':properties.highlightLinewidth},style:{pointerEvents:'none'}});if(properties.tooltipsEvent==='mousemove'){highlight.addEventListener('mouseout',function(e)
{highlight.parentNode.removeChild(highlight);RGraph.SVG.hideTooltip();RGraph.SVG.REG.set('highlight',null);},false);}
RGraph.SVG.REG.set('highlight',highlight);};this.parseColors=function()
{if(!Object.keys(this.originalColors).length){this.originalColors={colors:RGraph.SVG.arrayClone(properties.colors),highlightFill:RGraph.SVG.arrayClone(properties.highlightFill),backgroundBarsColors:RGraph.SVG.arrayClone(properties.backgroundBarsColors)}}
var colors=properties.colors;if(colors){for(var i=0;i<colors.length;++i){colors[i]=RGraph.SVG.parseColorLinear({object:this,color:colors[i],direction:'horizontal'});}}
if(properties.backgroundBarsColors&&properties.backgroundBarsColors.length){for(var i=0;i<properties.backgroundBarsColors.length;++i){properties.backgroundBarsColors[i]=RGraph.SVG.parseColorLinear({object:this,color:properties.backgroundBarsColors[i],direction:'horizontal'});}}
properties.highlightFill=RGraph.SVG.parseColorLinear({object:this,color:properties.highlightFill});};this.on=function(type,func)
{if(type.substr(0,2)!=='on'){type='on'+type;}
RGraph.SVG.addCustomEventListener(this,type,func);return this;};this.exec=function(func)
{func(this);return this;};this.removeHighlight=this.hideHighlight=function()
{var highlight=RGraph.SVG.REG.get('highlight');if(highlight){highlight.setAttribute('fill','transparent');highlight.setAttribute('stroke','transparent');RGraph.SVG.REG.set('highlight',null);}};this.tooltipSubstitutions=function(opt)
{return{index:opt.index,dataset:0,sequentialIndex:opt.index,value:this.data[opt.index],values:[this.data[opt.index]]};};this.tooltipsFormattedCustom=function(specific,index,colors)
{var color=colors[specific.index];var label=((typeof properties.tooltipsFormattedKeyLabels==='object'&&typeof properties.tooltipsFormattedKeyLabels[specific.index]==='string')?properties.tooltipsFormattedKeyLabels[specific.index]:'');return{label:label,color:color};};this.positionTooltipStatic=function(args)
{var obj=args.object,e=args.event,tooltip=args.tooltip,index=args.index,svgXY=RGraph.SVG.getSVGXY(obj.svg),coords=this.coords[args.index];args.tooltip.style.left=(svgXY[0]
+coords.x1
-(tooltip.offsetWidth/2)
+((coords.x2-coords.x1)/2))+'px';args.tooltip.style.top=(svgXY[1]
+coords.y1
-tooltip.offsetHeight
-10)+'px';};for(i in conf.options){if(typeof i==='string'){this.set(i,conf.options[i]);}}};return this;})(window,document);