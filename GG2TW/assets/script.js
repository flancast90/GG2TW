var urls = [];
var tiddlers = [];

function getData() {
if (document.getElementById('crawl_adder').value.includes(",")) {
    var list = document.getElementById("crawl_adder").value.split(",");
    urls = list;

}else if ((document.getElementById('crawl_adder').value.includes("https://"))||(document.getElementById('crawl_adder').value.includes("http://"))) {
    urls.push(document.getElementById("crawl_adder").value);
}else {
    document.getElementById('error-container').innerHTML = `Please make sure the input box is filled, and if so, that it contains a valid link.`;
}

for (var i = 0; i < urls.length; i++) {
    
    document.getElementById('current_task').innerHTML = `Working on: `+urls[i];
	$.getJSON('https://api.allorigins.win/get?url=' + encodeURIComponent(urls[i]), function (data) {
    
    				  document.getElementById('output').innerHTML = data.contents;
                      var thread_title = document.getElementsByClassName('KPwZRb gKR4Fb')[0].innerHTML;
                      var page_views = document.getElementsByClassName('Nadu4b')[0].innerText;
                      
                      var thread_count = document.getElementsByClassName('ptW7te').length;
                      
                      for (var counter = 0; counter < thread_count; counter++) {
                        var username = document.getElementsByClassName('s1f8Zd')[counter].innerText;
                      	var body_content = document.getElementsByClassName('ptW7te')[counter].innerText;
                        var author_post_time = document.getElementsByClassName('zX2W9c')[counter].innerText;
                        document.getElementById('render').innerHTML += ("<br><b>"+username+"</b> said at "+author_post_time+":<br>"+body_content+"<br>");
                        
                      }
                        
                      var json = `{"title":"`+thread_title.replaceAll('\\','\\\\').replaceAll('"','\\"').replaceAll('\n','\\n')+`","tags":"`+page_views.replaceAll(" ", "_").replaceAll('\\','\\\\').replaceAll('"','\\"').replaceAll('\n','\\n')+`","text":"`+(document.getElementById('render').innerHTML).replaceAll('\\','\\\\').replaceAll('"','\\"').replaceAll('\n','\\n')+`"}`
                      tiddlers.push(JSON.parse(json));

                      if (tiddlers.length == urls.length) {
                        document.getElementById('current_task').innerHTML = `Done with all tasks.`;
                        downloadAsJson();
                      }
                  });
}

}

function downloadAsJson(){
    var dataURI = 'data:text/json;charset=UTF-8,';
    var toURL = encodeURIComponent(JSON.stringify(tiddlers));
    document.getElementById('downloadJson').href = (dataURI+toURL);
    document.getElementById('downloadJson').click();
}
