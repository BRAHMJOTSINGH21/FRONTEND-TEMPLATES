var editor=document.getElementById("editor");
var code_container=document.getElementById("code-container");
var language=document.getElementById("language");
var submit=document.getElementById("submit");
var resultdiv=document.getElementById("result");


editor.addEventListener("click",function()
{
 code_container.focus();
});
submit.addEventListener("click",function(){
  var code=code_container.innerText;
  var id=language.value;
 var request=new XMLHttpRequest();

  request.open("POST","https://codequotient.com/api/executeCode");
 request.setRequestHeader("Content-Type","application/json");
  request.send(JSON.stringify({ "code" : code , langId : id}));


request.addEventListener("readystatechange",function(){
  if(request.readyState==4)
  {
  const codeid=JSON.parse(request.responseText).codeId;
  const ans=setInterval(function(){
    var xhttp=new XMLHttpRequest();


    xhttp.open("GET",`https://codequotient.com/api/codeResult/${codeid}`);
    xhttp.send();
    xhttp.addEventListener("readystatechange",function(e)

    {
        if(xhttp.readyState == 4) {
      var data=JSON.parse(JSON.parse(e.target.responseText).data);
      console.log(data);
      if ('output' in data)
      {
      const result=data.output.replace("\n",'');
      if(result!='')
      {
        resultdiv.innerText=result;

      }
      else
      {
         const errors = data.errors.replace(/\n/g,' ');
         resultdiv.innerText=errors;


      }
clearInterval(ans);
        }
        }
     
        

    })
   
  },1000)
  }


})

  

})