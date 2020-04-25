var map = {};
var deliveryCharge=10;
var disc=1;
cardCount();
function initMap(){
	map[1]="Amul Cow Milk,30,27,10%,Amul Milk";
	map[2]="Amul Full Cream Milk,60,60,,Milk";
	map[3]="Mali Panner,200,160,20%,Panner";
	map[4]="Kesar Shrikhand,60,60,,Shrikhand";
	map[5]="Amul Chees,50,50,,Cheesh";
	map[6]="Amul Butter Milk,12,12,,Butter Milk";
	
}

function cardCount(){
	var count= 0;
	var iteams  = localStorage.getItem("card");
	$.each(iteams.split(','),function(i,j){
		if(j != "null" && j != ""){
			count++;
		}
	});
	$(".cardCount").html("["+count+"]");
}

function addtoCard(id){
	localStorage.setItem("card",localStorage.getItem("card")+","+id);
	alert(map[id].split(",")[0]+ " successfully added to cart.");
	cardCount();
	return false;
}

function calcuateAmt(obj,j,orgValue){
	if($(obj).val() > 0 && $(obj).val() < 9){
		$("#totVal"+j).html($(obj).val() * orgValue + " Rs");
	}
	mainTotal();
	return false;
}

function mainTotal(){
	var sum = 0;
	$.each($(".total"),function(i,j){
		var value = $(j).html().split(" ");
		sum = sum + parseInt(value[0]);
	});
	$("#finalTotal").html(sum + " Rs");
	$("#deliveryCharge").html(deliveryCharge + " Rs");
	$("#disc").html(disc + " Rs")
	$("#mainTotal").html(parseInt(sum) + parseInt(deliveryCharge) - parseInt(disc) + " Rs");
}

function removeProduct(j){
	var iteams  = localStorage.getItem("card");
	iteams = iteams.replace(j,"");
	localStorage.setItem("card",iteams);
	$("#sectiondetails"+j).remove();
	mainTotal();
	cardCount();
	return false;
}
function initCart(){
	initMap();
	var iteams  = localStorage.getItem("card");
	$.each(iteams.split(','),function(i,j){
	if(j != "null" && j != ""){
		var value = map[j].split(',');
		var str = '<tr class="text-center" id="sectiondetails'+j+'"><td class="product-remove"><a href="#" onclick="return removeProduct('+j+')"><span class="ion-ios-close"></span></a></td><td class="image-prod"><div class="img" style="background-image:url(images/product-'+j+'.jpg);"></div></td><td class="product-name"><h3>'+value[0]+'</h3><p>'+value[4]+'</p></td><td class="price">'+value[2]+' Rs</td><td class="quantity"><div class="input-group mb-3"><input type="text" name="quantity'+j+'"  onkeyup="return calcuateAmt(this,'+j+','+value[2]+')" onchange="return calcuateAmt(this,'+j+','+value[2]+')" class="quantity form-control input-number" value="1" maxlength="1"></div></td><td id="totVal'+j+'" class="total">'+value[2]+' Rs</td></tr>';
		$("#cardDetails").append(str);
	}
	});
	mainTotal();
}

function generateProduct(){
	$.map(map, function(value,key){
	var valuesDetails = value.split(",");
	var disc = '';
	if(valuesDetails[3] != ""){
		disc='<span class="status">'+valuesDetails[3] +'</span>'
	}
	var ourProducts = '<div class="col-md-6 col-lg-3 ftco-animate fadeInUp ftco-animated"><div class="product"><a href="#" class="img-prod"><img class="img-fluid" src="images/product-'+key+'.jpg" alt="Colorlib Template">'+disc +'<div class="overlay"></div></a><div class="text py-3 pb-4 px-3 text-center"><h3><a href="#">'+valuesDetails[0]+'</a></h3><div class="d-flex"><div class="pricing123"><p class="price"><span class="mr-2 price-dc">'+valuesDetails[1]+' Rs</span><span class="price-sale">'+valuesDetails[2]+' Rs</span><span class="price-sale">&nbsp;&nbsp;</span><input type="button" onClick="return addtoCard('+key+')" class="btn btn-primary" value="Add to Cart"></p></div></div></div></div></div>';
	$("#productDetails").append(ourProducts);
	});
}