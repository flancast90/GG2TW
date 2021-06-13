var thisPageLinks = [];
$("button").click(function(){
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
                                if (thisPageLinks.includes(escape(document.getElementsByTagName('h1')[0].innerHTML))){
                                //need code here
                                }else{
                                  document.getElementById('output').replaceAll('"}]\n','"},\n');
                                  var body = document.querySelector('[aria-label="'+document.getElementsByClassName('KPwZRb')[0].innerHTML.replaceAll(`"`,`\\`)+'"]'); 
                                  var res =JSON.parse(`{"title":"`+document.getElementsByClassName('KPwZRb')[0].innerHTML+`", "text":"`+body.innerText+`"}`);
                                  document.getElementById('output').innerHTML += res;
                      }
                  });
                            	counter++;
                            };
                        }
                      document.getElementById('output').style.display = 'block';
                      document.getElementById('download').style.display = 'block';
                      var dataURI = 'data:text/json;charset=UTF-8,';
                      var toURL = encodeURIComponent(document.getElementById('output').value);
                      document.getElementById('download').href = (dataURI+toURL);
                      };
                      
                  });
});
