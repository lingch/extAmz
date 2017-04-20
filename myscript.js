//  
$(document).ready(function() {

	if (document.URL.indexOf("/dp/") < 0) {
		return;
	}

	$('<a>').text("Save")
		.insertBefore($("#productTitle"))
		.click(function() {
			alert("hha");
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

	obj.detail = $.base64('encode', $("#aplus").html());

	$.ajax({
		type: "POST",
		dataType: "json",
		url: "http://localhost:8080/restws/json/product/get",
		success: function(data) {
			alert(data);
		}
	});
}

$(document).ready(saveInfo);
