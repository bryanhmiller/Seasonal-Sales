// Your job is to build a web page that lists all of the products, the name of 
// the department it's in, and the price. Additionally, put a <select> element 
// at the top of the page that contains all possible values of the season_discount 
// key in the categories file. As soon as you select one of the seasons, all prices 
// on the page should immediately be discounted by the corresponding percentage.

// For example, when Spring is chosen, all products in the corresponding Household 
// category should have their prices updated with a 15% discount off the base price.

// The two JSON representations above should be in two files: products.json, and 
// categories.json. You should load both file via XHRs and store the contents in 
// two different JavaScript variables in your code.
var categoryContainer = document.getElementById("categories");
var catFoodBowl = document.getElementById("catFoodContainer");

function makeCategoryDom(xhrData){
	var categoryString = "";
	var currentCategory;
	for (var i = 0; i < xhrData.categories.length; i++) {
		currentCategory = xhrData.categories[i];
	
		categoryString += `<div id="${currentCategory.id}">This div has an id</div>`;
		categoryString += `<div>${currentCategory.name}</div>`;
		categoryString += `<div>${currentCategory.season_discount}</div>`;
		categoryString += `<div>${currentCategory.discount}</div>`;

		// for (var j = 0; j < currentCategory.types.length; j++) {
		// 	categoryString += `<p>${currentCategory.types[j].type}</p>`;
		// 	console.log(currentCategory.types[j].type);
		// 	console.log(currentCategory.types[j].volumes);
		// 	for (var k = 0; k < currentCategory.types[j].volumes.length; k++) {
		// 		categoryString += `<p>Size: ${currentCategory.types[j].volumes[k].name}`;
		// 		categoryString += `<p>$${currentCategory.types[j].volumes[k].price}`;
		// 	}
		// }
	}	
	categoryContainer.innerHTML = categoryString;
}

function categoriesMakerLoaded(){
	var categoryData = JSON.parse(this.responseText);
	makeCategoryDom(categoryData);
}

function categoriesFail(){
	console.log("booooo");
}


var categoriesRequest = new XMLHttpRequest();
categoriesRequest.addEventListener("load", categoriesMakerLoaded);
categoriesRequest.addEventListener("error", categoriesFail);
categoriesRequest.open("GET", "categories.json");
categoriesRequest.send();

// Extranious Info
// You work as a developer for a big box store. Here is a JSON representation of a 
// small sample of the products you sell.
// Here is a JSON representation of some of the departments in your stores.