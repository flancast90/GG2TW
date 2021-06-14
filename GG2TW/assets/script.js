var thisPageLinks = [];
var thisPageContent = [];
$("button").click(function(){
var loadInit = 0;
document.getElementById('msg').innerHTML = `0/90 GG Conversations Converted.`;
setInterval(() => {
    document.getElementById('msg').innerHTML = loadInit+`/90 GG Conversations Converted.`;
}, 1000);
$.getJSON('https://api.allorigins.win/get?url=' + encodeURIComponent('https://groups.google.com/g/tiddlywiki'), function (data) {
                      document.getElementById('container').innerHTML = data.contents;
                      var i = 0;
                      var link = document.getElementsByClassName('GCatzc')[0];
                      var linkCount = link.getElementsByTagName('a').length;

                      while (i < linkCount){
                      	thisPageLinks.push("https://groups.google.com/g/"+link.getElementsByTagName('a')[i].href.split('/g/')[1]);
                      	i++;
                        
                        if (thisPageLinks.length == linkCount){
                        	var GGlinksLength = thisPageLinks.length;
                            var counter = 0;
                            while (counter < GGlinksLength){
                                
                            	$.getJSON('https://api.allorigins.win/get?url=' + encodeURIComponent(thisPageLinks[counter]), function (data) {
                                document.getElementById('container').innerHTML = data.contents;
                                if (thisPageContent.includes(document.getElementsByClassName('KPwZRb')[0].innerHTML)){
                                //need code here
                                }else{
                                  
                                  var body = document.querySelector('[aria-label="'+document.getElementsByClassName('KPwZRb')[0].innerHTML.replaceAll(`"`,`\\"`)+'"]'); 
                                  var res =JSON.parse(`{"title":"`+document.getElementsByClassName('KPwZRb')[0].innerHTML.replaceAll('"','\\"')+`", "text":"`+body.innerText.replaceAll('"','\\"').replaceAll('[','\\[').replaceAll(']', '\\]')+`"}`);
                                  thisPageContent.push(JSON.stringify(res));
                                  document.getElementById('output').value = (thisPageContent);
                                  
                                }
                                loadInit++;
                                });
                                counter++;
                           };
                        }
                      document.getElementById('output').style.display = 'block';
                      document.getElementById('download').style.display = 'block';
                      
                      };
                      
                  });
});
function downloadAsJson(){
    var dataURI = 'data:text/json;charset=UTF-8,';
    var toURL = encodeURIComponent('['+document.getElementById('output').value+']');
    document.getElementById('output').value = '['+document.getElementById('output').value+']';
    document.getElementById('downloadJson').href = (dataURI+toURL);
    document.getElementById('downloadJson').click();
}
