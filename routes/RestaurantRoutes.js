const express = require('express');
const restaurantModel = require('../models/Restaurant');
const app = express();

//Read ALL
//http://localhost:3000/restaurants
app.get('/restaurants', async (req, res) => {
  const restaurants = await restaurantModel.find({});
  
  try {
    console.log(restaurants[0].name)
    res.status(200).send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});


// http://localhost:3000/restaurants/cuisine/Bakery
// http://localhost:3000/restaurants/cuisine/Italian
//http://localhost:3000/restaurants/cuisine/Japanese
app.get('/restaurants/cuisine/:c', async (req, res) => {
  const cuisine = req.params.c
  const restaurants = await restaurantModel.find({cuisine : cuisine});
  
  try {
    if(restaurants.length != 0){
      res.send(restaurants);
    }else{
      res.send(JSON.stringify({status:false, message: "No data found"}))
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


// -The selected columns must include id, cuisines, name, city, resturant_id
// -The sorting by the restaurant_id in Ascending or Descending Order based on parameter passed.
// http://localhost:3000/restaurants?sortBy=ASC
app.get('/restaurants', async (req, res) => {
    const restaurants = await restaurantModel.find({}).select("id restaurant_id cuisine name city").sortByRestaurant_id(1)
    
    try {
      if(restaurants.length != 0){
        res.send(restaurants);
      }else{
        res.send(JSON.stringify({status:false, message: "No data found"}))
      }
    } catch (err) {
      res.status(500).send(err);
    }

});

// http://localhost:3000/restaurants?sortBy=DESC
app.get('/restaurants', async (req, res) => {
    const restaurants = await restaurantModel.find({}).select("id restaurant_id cuisine name city").sortByRestaurant_id(-1);   
    try {
      if(restaurants.length != 0){
        res.send(restaurants);
      }else{
        res.send(JSON.stringify({status:false, message: "No data found"}))
      }
    } catch (err) {
      res.status(500).send(err);
    }

});

// 7.Create REST API to return restaurants details where all cuisines are equal to Delicatessen and the city is not equal to Brooklyn
// -The selected columns must include cuisines, name and city, but exclude id
// -The sorting order must be Ascending Order on the name
// http://localhost:3000/restaurants/Delicatessen
app.get('/restaurants/Delicatessen', async (req, res) => {
    const restaurants = await restaurantModel.find({})
    .where("city").gt("Brooklyn").lt("Brooklyn")
    .where("cuisine").equal("Delicatessen")
    .sort({'name' : '1'})
    .select("cuisine name city");
    
    try {
      if(restaurants.length != 0){
        res.send(restaurants);
      }else{
        res.send(JSON.stringify({status:false, message: "No data found"}))
      }
    } catch (err) {
      res.status(500).send(err);
    }

});


//http://localhost:3000/restaurant
app.post('/restaurant', async (req, res) => { 
    console.log(req.body)
    const restaurant = new restaurantModel(req.body);   
    try {
      await restaurant.save((err) => {
        if(err){
   
          res.send(err)
        }else{
          res.send(restaurant);
        }
      });
    } catch (err) {
      res.status(500).send(err);
    }
});
  
module.exports = app

