const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');


const stops=new mongoose.Schema({
  name:{
    type:String,
    // required:true
  },
  Route:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Route'
  },
  latitude:{
    type:Number,
    // required:true
  },
  longitude:{
    type:Number,
    // required:true
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
  Stops:[{type: mongoose.Schema.Types.ObjectId, ref:'Stops'}],
 Routetype:{
    type:String,
    required:true
  }
});
// var Stops =mongoose.model("Stops",stops);
// var Route = mongoose.model("Route",routeschema);
// module.exports = Route;
// module.exports = Stops;

module.exports = {
  Stops: mongoose.model('Stops',stops),
  Route: mongoose.model('Route',routeschema)
};
