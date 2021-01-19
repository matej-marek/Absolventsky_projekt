 /* first hide*/
 $(".infoBackground").hide()
 /*show infotable */ 
$(".info").on("click",function(){
    $(".infoBackground").show();
    var template=$("#zalozkaTemplate").html();
    if(zalozky.children(".itemZalozky").attr("data-name")=="info"){
        $(zalozky.children(".itemZalozky").attr("data-name")).remove();
    }
});
/* hide infotable */ 
$(".infoHide").on("click",function(){
    $(".infoBackground").hide()
});

/* first hide*/
$(".settingBackground").hide()
/*show infotable */ 
$(".setting").on("click",function(){
   $(".settingBackground").show();
   var template=$("#zalozkaTemplate").html();
   if(zalozky.children(".itemZalozky").attr("data-name")=="setting"){
       $(zalozky.children(".itemZalozky").attr("data-name")).remove();
   }
});
/* hide infotable */ 
$(".settingHide").on("click",function(){
   $(".settingBackground").hide()
});
/*show infotable */ 
$(".uploadProjectBackground").hide()
$(".open").on("click",function(){
  $(".uploadProjectBackground").show();
  var template=$("#zalozkaTemplate").html();
  if(zalozky.children(".itemZalozky").attr("data-name")=="upload_project"){
      $(zalozky.children(".itemZalozky").attr("data-name")).remove();
  }
});
/* hide infotable */ 
$(".uploadProjectHide").on("click",function(){
  $(".uploadProjectBackground").hide();
});
/* fisrt hide */ 
$(".windowsBackground").hide()
$(".windows").on("click",function(){
  $(".windowsBackground").show();
  var template=$("#zalozkaTemplate").html();
  if(zalozky.children(".itemZalozky").attr("data-name")=="windows"){
      $(zalozky.children(".itemZalozky").attr("data-name")).remove();
  }
});
/* hide infotable */ 
$(".windowsHide").on("click",function(){
  $(".windowsBackground").hide();
});
/* fisrt hide */ 
$(".windowsBackground").hide();



/* fisrt hide */ 
$(".toolsBackground").hide();
$(".tool").on("click",function(){
  $(".toolsBackground").show();
  var template=$("#zalozkaTemplate").html();
  if(zalozky.children(".itemZalozky").attr("data-name")=="tools"){
      $(zalozky.children(".itemZalozky").attr("data-name")).remove();
  }
});
/* hide infotable */ 
$(".toolsHide").on("click",function(){
  $(".toolsBackground").hide()  
});
/* fisrt hide */ 
/* skrytí pravého kliknutín a shift ctrl i a F12 */
$(window).on('keydown',function(event){
    if(location.hostname == "photoeditor.matejmarek.cz"){
      if(event.keyCode==123){
        alert('Nepovolená klávesa');
        return false;
      }
      else if(event.ctrlKey && event.shiftKey && event.keyCode==73){
        alert('Entered ctrl+shift+i')
        return false;  //Prevent from ctrl+shift+i
      }
      else if(event.ctrlKey && event.keyCode==73){
        alert('Entered ctrl+i')
        return false;  //Prevent from ctrl+shift+i
      }
    }
  });
  $(document).on("contextmenu",function(e){
    if(location.hostname == "photoeditor.matejmarek.cz"){
        alert('Right Click Not Allowed')
        e.preventDefault();
    }
  });
$("#histogramShow").on("change",function(){
    $(".histograms").toggle();
});
$("#layersShow").on("change",function(){
    $(".layers").toggle();
});

if(getCookie("sides")=='true'){
  console.log("true");
  show('tools','left');
  show('rightPanel','right');

  $("#closeSides").attr('checked',true)
}
if(getCookie("color")){
  show('tools','left');
  show('rightPanel','right');
  var values=hexToRgb(getCookie("color"));
  $("#dfbgcolor").val(getCookie("color"));
  canvas.layers[0].createRect(values.r,values.g,values.b);
}
else{
  canvas.layers[0].createRect(255,255,255);
  $("#dfbgcolor").val("#ffffff");
}
$("#closeSides").on("change",function(){
  var value=$("#closeSides").is(':checked');
  setCookie("sides", value, 30);
});
$("#dfbgcolor").on("change",function(){
  var value= $(this).val();
  console.log(value);
  setCookie("color", value, 30);
});

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
$(".agree").on("click",function(){
    $(this).parent().parent().parent().parent().remove();
});
/* záložky */
$(".minimalize").on("click", function(){
    var co = $(this).attr("data-name");
    var zalozky = $(".zalozky");
    var template=$("#zalozkaTemplate").html();
    if(zalozky.children(".itemZalozky").attr("data-name")!=co){
        zalozky.append(template);
        zalozky.children(".itemZalozky").attr("data-name",co);
        zalozky.children(".itemZalozky").children("p").html(co);
        zalozky.children(".itemZalozky").children("button").attr("data-name",co);
        $(this).parent().parent().parent().hide();
    }
});
/* zavření záložky*/
function closeItem(elmt){
    $(elmt).parent().remove();
}
/* otevření záložky */
function openItem(elmt){
    var attr= $(elmt).attr("data-name");
    if(attr=="info"){
        $(".infoBackground").show();
        $(elmt).parent().remove();
    }
    if(attr=="setting"){
        $(".settingBackground").show();
        $(elmt).parent().remove();
    }
}
$(".openItem").click(function(){
    console.log("ahoj");
});
function show(div,dir){
  var obj = $("."+div);
  obj.toggle(500,"swing");
  }
  