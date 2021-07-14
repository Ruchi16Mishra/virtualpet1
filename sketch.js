//Create variables here
var dog, happydog, database, foodS, foodStock;
var saddogImage, happydogImage;
var addFood, foodobj;
var fedTime, lastFed;

function preload()
{
  //load images here
  happydogImage = loadImage("dogImg1.png");
  saddogImage = loadImage("dogImg.png");
}

function setup() {
  //missing
  database = firebase.database();
  createCanvas(1000, 400);

  //missing
  foodobj = new Food();

  dog = createSprite(800,200, 150,150);
  dog.addImage(saddogImage);
  dog.scale = 0.15;

  //foodStock is the refernce created to the database variable that holds the actual value
  //missing
  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  
  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDogs);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
}


function draw() {  
  background(46, 139, 87);

  //missing
  if(foodStock !== undefined){
    foodobj.display();
  }

  fedTime = database.ref('fedtime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  });

  fill("blue");
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: " + lastFed%12 + " PM", 350, 30);
  }
  else if(lastFed === 0){
    text("Last Fed: 12 AM", 350, 30);
  }
  else{
    text("Last Feed: " + lastFed + " AM", 350,30);
  }

    drawSprites();
}
  

function readStock(data){
  //foodS is the container which hold the number of bottles.
  foodS = data.val();
  foodobj.updateFoodStock(foodS);
}

function feedDogs(){
  dog.addImage(happydogImage);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else {
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  }
  
  foodobj.updateFoodStock(foodobj.getFoodStock() - 1);
  database.ref('/').update({
    food : foodobj.getFoodStock(),
    fedtime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food : foodS
  })
}