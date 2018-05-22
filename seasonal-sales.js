// *Your job is to build a web page that lists all of the products*, *the name of 
// the department it's in*, *and the price.* Additionally, *put a <select> element 
// at the top of the page that contains all possible values of the season_discount 
// key in the categories file.??* As soon as you select one of the seasons, all prices 
// on the page should immediately be discounted by the corresponding percentage.

// For example, when Spring is chosen, all products in the corresponding Household 
// category should have their prices updated with a 15% discount off the base price.

// The two JSON representations above should be in two files: products.json, and 
// categories.json. You should load both file via XHRs and store the contents in 
// two different JavaScript variables in your code.
var categoryContainer = document.getElementById("categories");
var productContainer = document.getElementById("products");
var categories = [];
var products = [];
var dropdownSelect = document.getElementById("dropdown");

function makeProductDom(discountSeason){
	var productString = "";
	var currentProduct;
	for (var j = 0; j < products.length; j++) {
		currentProduct = products[j];
		productString += `<section class="col-sm-3 col-md-2 thumbnail">`;	
		productString += `<div id="${currentProduct.name}">${currentProduct.name}</div>`;
		productString += `<div id="${currentProduct.category_name}">${currentProduct.category_name}</div>`;
		if (discountSeason === currentProduct.category_season_discount) {
			productString += `<div class="price">${currentProduct.season_price}</div>`;
		} else {
			productString += `<div class="price">${currentProduct.price}</div>`;
		}
		productString += `</section>`;
	}	
	productContainer.innerHTML = productString;
}

function categoriesMakerLoaded(){
	var categoryData = JSON.parse(this.responseText);
	department = categoryData.categories
}

function productMakerLoaded(){
	var productData = JSON.parse(this.responseText);
	products = productData.products
	products.forEach (function(product){
		for (var i = 0; i < department.length; i++) {
			if (product.category_id === department[i].id) {
				product["category_name"] = department[i].name;
				product["category_discount"] = department[i].discount;
				product["category_season_discount"] = department[i].season_discount;
				product["season_price"] = (product.price - (product.price * department[i].discount)).toFixed(2);
			}
		}
	});
	makeProductDom("none");
}

function categoriesFail(){
	console.log("booooo");
}

function productFail(){
	console.log("booooo");
}

var categoriesRequest = new XMLHttpRequest();
categoriesRequest.addEventListener("load", categoriesMakerLoaded);
categoriesRequest.addEventListener("error", categoriesFail);
categoriesRequest.open("GET", "categories.json");
categoriesRequest.send();

var productRequest = new XMLHttpRequest();
productRequest.addEventListener("load", productMakerLoaded);
productRequest.addEventListener("error", productFail);
productRequest.open("GET", "products.json");
productRequest.send();

dropdownSelect.addEventListener("change", function(event){
	makeProductDom(event.target.value);
});