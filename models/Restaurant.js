const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  restaurant_id : {
    type: String,
    required:true,
    trim:true
  },
  name: {
    type: String,
    required:true,
    trim:true
  },
  cuisine: {
    type: String,
    required:true,
    trim:true
  },
  city: {
    type: String,
    required:true,
    trim:true
  },
  address: {
    type: {
        building: {
          type: String
        },
        street: {
          type: String
        },
        zipcode: {
          type: String
        }
    }
  }, 
});

// Query Helper functions
RestaurantSchema.query.sortByRestaurant_id = function(flag){ //flag 1 or -1
  return this.sort({'restaurant_id': flag});
}

RestaurantSchema.query.byRestaurant_id = function(name){
  return this.where({'restaurant_id': name});
}

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;