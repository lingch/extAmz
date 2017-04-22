//  
$(document).ready(function() {

	if (document.URL.indexOf("/dp/") < 0) {
		return;
	}

	$('<a>').text("Save")
		.insertBefore($("#productTitle"))
		.click(function() {
			saveInfo();
		})
});

function saveInfo() {
	var obj = {};
	obj.title = $("#productTitle").text().trim();
	obj.listPrice = $("#price > table > tbody > tr:nth-child(1) > td.a-span12.a-color-secondary.a-size-base > span").text().trim();
	obj.price = $("#priceblock_ourprice").text().trim();
	obj.size = $("#native_dropdown_selected_size_name > option:selected").text().trim();
	obj.color = $("#variation_color_name > div > span").text().trim();
	obj.features = [];
	$("#feature-bullets > ul > li > span").each(function(idx, span) {
		obj.features.push($(span).text().trim());
	});
	obj.pictures = [];
	$("#main-image-container > ul > li.image").each(function(idx, li) {
		var img_src = $(li).find("img").attr("src");
		if(img_src != undefined){
			obj.pictures.push(img_src);
		}
	});
	
	obj.detail = $.base64('encode', $("#aplus").html());

var v = JSON.stringify(obj);

	$.ajax({
		type: "POST",
		dataType: "json",
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		url: "http://192.168.2.202:3000/AMZItem",
		success: function(data) {
			alert(data);
		}
	});
}

//$(document).ready(saveInfo);
