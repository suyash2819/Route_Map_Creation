const express = require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const app=express();
// const Route=require('./Route_Schema.js');
// const Stops=require('./Route_Schema.js');
const {Route, Stops}=require('./Route_Schema.js');
const url='mongodb://suyash:SUYASH2819@ds033067.mlab.com:33067/heroku_tn5pzpqq';
// const url='mongodb://localhost:27017/Chalo';

const connect = mongoose.connect(url);
connect.then(() => {
  console.log("connected correctly to server");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.set("view engine", "ejs");
app.use(express.static('./public'));


app.get('/',(req,res) => {
  res.render('MapForm');
});

app.post('/',(req,res) => {
var routes=new Route(req.body);
var stops=new Stops(req.body);
routes.Stops.push(stops);
routes.save()
.then(route => {
    stops.save().then(stop => {res.send("stop and route saved")}).catch(err => {console.log(err)});
})
.catch(err => {
    console.log(err);
  });
});

app.get('/AllRoutes',(req,res) => {
  Route.find({})
  .populate('Stops')
  .exec()
  .then(route => {
      res.render('AllRoutes',{routes:route})
  }).catch((err)=>next(err));
});

app.get('/delete/:id', (req,res)=>{
  Route.remove({_id:req.params.id}, (err,data) => {
    res.redirect("/AllRoutes");
  });
});

app.get('/update/:id', (req,res) => {
  Route.find({_id:req.params.id})
  .then(data => {
    res.render('updates',{updates:data});
  });
});

app.post('/update/:id', (req,res) => {
  Route.findOne({_id:req.params.id}, (err, found) => {
    if(err) throw err;
    else {
      if(req.body.RouteName){
        found.RouteName=req.body.RouteName;
      }
      if(req.body.Status){
        found.Status=req.body.Status;
      }
      if(req.body.RouteName){
        found.Routetype=req.body.Routetype;
      }
      found.save((err, updated) => {
        if(err) throw err;
        else {
          res.send(updated);
        }
      });
    }
  });
});


var theport = process.env.PORT || 5000;
 app.listen(theport);
