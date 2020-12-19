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
$(".open").on("click",function(){
  $(".uploadProjectBackground").show();
  var template=$("#zalozkaTemplate").html();
  if(zalozky.children(".itemZalozky").attr("data-name")=="upload_project"){
      $(zalozky.children(".itemZalozky").attr("data-name")).remove();
  }
});
/* hide infotable */ 
$(".uploadProjectHide").on("click",function(){
  $(".uploadProjectBackground").hide()
});
/* fisrt hide */ 
$(".uploadProjectBackground").hide()
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
        alert('Entered ctrl+shift+i')
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