const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');


const stops=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  latitude:{
    type:Number,
    required:true
  },
  longitude:{
    type:Number,
    required:true
  }
});

const routeschema=new mongoose.Schema({
  RouteName:{
    type:String,
    required:true
  },
 Status:{
    type:String,
    required:true
  },
  Stops:[{type: mongoose.Schema.Types.ObjectId, ref:stops}],
 Routetype:{
    type:String,
    required:true
  }
});
module.exports =mongoose.model("stops",stops);
var routes = mongoose.model("Route",routeschema);
module.exports = routes;
