var app = function(){
  var url = "https://api.punkapi.com/v2/beers";

  var brewDogArray = JSON.parse(localStorage.getItem('brew-dog')) || [];
  if(brewDogArray.length === 0){
    makeRequest(url, requestComplete);
  }else{
    populateSelection();
  }

  var beerSelection = document.getElementById('beer-selection');
  beerSelection.addEventListener('change', function(){findBeer(beerSelection.value) })
}


var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
};

var requestComplete = function(){
  if(this.status !== 200)return;
  localStorage.setItem('brew-dog', this.responseText)
  populateSelection();
};

var populateSelection = function(){
  var beerSelection = document.getElementById('beer-selection');
  var brewDogArray = JSON.parse(localStorage.getItem('brew-dog'));

  var defaultOption = document.createElement('option');
  defaultOption.innerText = "Select a BrewDog Beer";
  defaultOption.value = "none";
  beerSelection.appendChild(defaultOption);

  brewDogArray.forEach(function(beer){
    var option = document.createElement('option');
    option.innerText = beer.name;
    option.value = beer.id;
    beerSelection.appendChild(option);
  })
}

var findBeer = function(beerID){
  if(beerID !== "none"){
  var brewDogArray = JSON.parse(localStorage.getItem('brew-dog'));
  brewDogArray.forEach(function(beer){
    if(beer.id.toString() === beerID){
      populateBeer(beer);
    }
  })
}
}

var populateBeer = function(beer){
  var heading = document.getElementById('heading');
  heading.innerText = beer.name;

  var ul = document.getElementById('beer-list');
  while(ul.firstChild){
    ul.removeChild(ul.lastChild);
  }
  ul.style.listStyleType = 'none';

  var tagline = document.createElement('li');
  tagline.innerText = beer.tagline;
  tagline.style.fontStyle = "oblique";

  var abv = document.createElement('li');
  abv.innerText = ("ABV: " + beer.abv);

  var image = document.createElement('img');
  image.src = beer.image_url;
  image.style.height = '300px';

  var ingredients = document.createElement('li');
  ingredients.innerText = "Ingredients: ";
  ingredients.style.fontStyle = "oblique";

  var description = document.createElement('li');
  description.innerText = beer.description;
  description.style.width= '500px'

  var space = document.createElement('li');
  space.innerText = "";

  ul.appendChild(tagline);
  ul.appendChild(abv);
  ul.appendChild(image);
  ul.appendChild(description);
  ul.appendChild(space);
  ul.appendChild(ingredients);
  parseMalt(beer);
  parseHops(beer);
  parseYeast(beer);
}

var parseMalt = function(beer){
  var malt = beer.ingredients.malt;
  var maltList = document.createElement('ul');
  var limalt = document.createElement('li');
  var ul = document.getElementById('beer-list');
  limalt.innerText = ("Malt");
  limalt.style.fontWeight = "900";
  limalt.style.listStyleType = 'none';
  maltList.appendChild(limalt);
  for(var i = 0; i<malt.length; i++){
   var li = document.createElement('li');
   li.innerText = (malt[i].name + ": " +  malt[i].amount.value + malt[i].amount.unit);
   maltList.appendChild(li);
  }
  ul.appendChild(maltList);
}

var parseHops = function(beer){
  var hops = beer.ingredients.hops;
  var hopsList = document.createElement('ul');
  var lihops = document.createElement('li');
  var ul = document.getElementById('beer-list');
  lihops.innerText = ("Hops");
  lihops.style.fontWeight = "900";
  lihops.style.listStyleType = 'none';
  hopsList.appendChild(lihops);
  for(var i = 0; i<hops.length; i++){
   var li = document.createElement('li');
   li.innerText = (hops[i].name + ": " +  hops[i].amount.value + hops[i].amount.unit);
   var li2 = document.createElement('li');
    li2.innerText =( "Add: " + hops[i].add + " Attribute: " + hops[i].attribute)
    li2.style.listStyleType = 'none';
   hopsList.appendChild(li);
   hopsList.appendChild(li2);
  }
  ul.appendChild(hopsList);
}

var parseYeast = function(beer){
  var yeast = beer.ingredients.yeast;
  var yeastList = document.createElement('ul');
  var liyeast = document.createElement('li');
  var ul = document.getElementById('beer-list');
  liyeast.innerText = ("Yeast");
  liyeast.style.fontWeight = "900";
  liyeast.style.listStyleType = 'none';
  yeastList.appendChild(liyeast);

  var li = document.createElement('li');
  li.innerText = yeast;
  yeastList.appendChild(li);

  ul.appendChild(yeastList);
}







var populateAllBeer = function(beerArray){
  var ul = document.getElementById('beer-list');

  beerArray.forEach(function(beer){
  // var heading = document.getElementById('heading');
  // heading.innerText = beer.name;

  var name = document.createElement('li');
  name.innerText = beer.name;

  var tagline = document.createElement('li');
  tagline.innerText = beer.tagline;

  var abv = document.createElement('li');
  abv.innerText = ("ABV: " + beer.abv);

  var image = document.createElement('img');
  image.src = beer.image_url;

  var description = document.createElement('li');
  description.innerText = beer.description;

  ul.appendChild(name);
  ul.appendChild(tagline);
  ul.appendChild(abv);
  ul.appendChild(image);
  ul.appendChild(description);
});
}





window.addEventListener('load', app);