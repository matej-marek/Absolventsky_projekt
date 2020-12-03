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