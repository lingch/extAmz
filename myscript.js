//  
$(document).ready(function() {
	$(window).on('hashchange', urlChanged);
	urlChanged();
});

function urlChanged(){
	if (document.URL.indexOf("/dp/") < 0) {
		return;
	}

	$("#mysavedinfo").remove();
	$('<a>').attr("id","mysaveinfo").text("Save|")
		.insertBefore($("#productTitle"))
		.click(function() {
			saveInfo(function(status){
				if(status == 200){
					$("#mysaveinfo").remove();
					$('<cpan>').attr("id","mysavedinfo").text("Saved|")
					.insertBefore($("#productTitle"))
				}
			});
		})
}

function saveInfo(callback) {
	var obj = {};
	obj.asin = $("#averageCustomerReviews").attr("data-asin");
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

	$.ajax({
		type: "POST",
		dataType: "json",
		data: JSON.stringify(obj),
		contentType: "application/json; charset=utf-8",
		url: "http://192.168.2.202:3000/AMZItem",
		complete: function(datacheck) {
			callback(datacheck.status);
		}
	});
}

//$(document).ready(saveInfo);
