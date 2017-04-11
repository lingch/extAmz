//  
$("table.row td.f_title a:first-of-type").click(function(event){
	

	if(document.URL.indexOf("fid=59") >= 0){
		event.preventDefault();
		href = $(this);
		url = $(this).attr("href");
		$.get(url,function(data){
			imgdiv = $("<div></div>").addClass("previewDiv");
			$(data).find("div.t_msgfont img").each(function (index,element){
				$(element).addClass("previewImg");
				imgdiv.append(element);
			});
			imgdiv.css({left: event.pageX, top: event.pageY});
			imgdiv.insertAfter(href);
			imgdiv.show();
			imgdiv.click(function(){
				$(this).remove();
			});
		})
	}
});

$(document).ready(function(event){
	if(document.URL.indexOf("fid=41") < 0){
		return true;
	}

	$("table.row td.f_title a").each(function (index,element){
		href = $(this);
		url = $(this).attr("href");

		$.get(url,function(data){
			
			description = $(data).find("div.t_msgfont").html();
			if(description.indexOf("无码") >=0){
				hint = $("<br>无码</br>");
				hint.insertAfter(href);
				hint.show();

			}
		})
		
	})
});