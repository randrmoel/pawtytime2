// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the dogactor has valid login credentials, send them to the members page.
  // Otherwise the dogactor will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a dogactor. The dogactor's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the dogactor is created successfully, proceed to log the dogactor in,
  // otherwise send back an error
  //Create new DogActor
  app.post("/api/signup", function(req, res) {
    db.DogActor.create({
      email: req.body.email,
      password: req.body.password,
      actorType: req.body.actorType,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      st: req.body.st,
      zip5: req.body.zip5,
      phone: req.body.phone,
      phoneType: req.body.phoneType
    })
      .then(function() {
        res.status(200).end();
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

   // Route for getting id, email, and actorType 
   // about our user to be used client side
   app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        id: req.user.id,
        actorType: req.user.actorType,
        email: req.user.email
      });
    }
  });


  // Route for logging dogactor out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  //Update DogActor information
  //fn = firstName, ln = lastName, add1 = address1
  // add2 = address2, cty = city, s =st, 
  // z5 = zip5, ph = phone, pt = phoneType
  app.put("/api/actor", function(req, res){
    db.dogActor.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address1: req.body.address1,
      address2: req.body.address2,
      city: req.body.city,
      st: req.body.st,
      zip5: req.body.zip5,
      phone: req.body.phone
    }, 
    {
      where: {
        id: req.params.id
      }
    }).then(function(dbAppt){
      console.log(res.json(dbAppt));
      res.json(dbAppt);
    }).catch(err => {
      res.status(401).json(err)
    });
  });

  //Get DogActor Name and Address by id
  app.get("/api/actor/:id", (req, res)=>{
    db.DogActor.findOne({
      attributes:["id", "firstName", "lastName", "address1", "address2", "city", "st", "zip5", "phone", "email"],
      where:{
        id:req.params.id
      }
    }).then(function(actor){
      res.json(actor)
    }).catch(err => {
      res.status(401).json(err)
    });
  });


    // Route for getting id, email, and actorType 
   // about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        id: req.user.id,
        actorType: req.user.actorType,
        email: req.user.email
      });
    }
  });

  app.get("/api/get_actor/:email", (req, res) =>{
    db.DogActor.findOne({
      attributes:["id"],
      where:{
        email: req.params.email
      }
    }).then(function(user){
      res.json(user)
    }).catch(err=>{
      res.status(401).json(err)
    });
  });

  // Delete DogActor
  app.delete("/api/actor/:email", function (req,res ){
    db.DogActor.destroy({
      where: {
        email: req.params.email
      }
    }).then(results => res.json(results)
    ).catch(err => {
      res.status(401).json(err)
    });
  });

  //APPOINTMENT ROUTES
  //Route for getting appointments: if booked == true, then dogUser !=0
  // if booked == false, then dogUser == 0

    //Create a new open appointment
    // New Appts have dogUser = 0
  app.post("/api/appt", function(req,res){
    db.Appt.create({
      walkDate: req.body.walkDate,
      timeSlot: req.body.timeSlot,
      DogActorId : req.body.DogActorId
    }).then(function(dbAppt){
      console.log(dbAppt);
      res.json(dbAppt);
    }).catch(err => {
      res.status(401).json(err)
    });
  });

    //Delete a time slot
    app.delete("/api/appt/:id", function(req, res) {
      db.Appt.destroy({
        where: {
          id: req.params.id
        }
      }).then(results => {
        console.log(results);
        res.json(results);
      }).catch(err => {
        res.status(401).json(err)
      });
    });
  

  // Get unbooked appointments for dog walker
  app.get("/api/unbooked_appt/:DogActorId", function(req, res){
      db.Appt.findAll({
        attributes:["id", "walkDate", "timeSlot", "walkMemo"],
        where: {
          DogActorId: req.params.DogActorId,
          dogUser: 0
        }
      }).then(function(dbUnbooked){
        res.json(dbUnbooked)
      }).catch(err => {
        res.status(401).json(err)
      });
  });



// get booked appointments for dog walker
// by dogName and date
   app.get("/api/booked_appt/:DogActorId", function(req, res){  
    db.Dog.findAll({
      attributes: ["dogName"],
      include:[{
        model:db.Appt,
        attributes:["id", "walkDate", "timeSlot", "walkMemo"],
        where: {
          DogActorId: req.params.DogActorId
        }
      }]
    }).then(function(dbBooked){
      res.json(dbBooked);
    }).catch(err => {
      res.status(401).json(err)
    });  
   });

    //Get booked appointments for my dog
    app.get("/api/mydog/:id", function(req, res){  
      db.Appt.findAll({
        attributes: ["id", "walkDate", "timeSlot", "DogActorId", "walkMemo"],
        include:[{
          model:db.Dog,
          attributes: ["dogName", "DogActorId"],
          where:{
            dogActorId:req.params.id}
        }]
      }).then(function(myAppt){
        res.json(myAppt)
      }).catch(err => {
        res.status(401).json(err)
      });
    });

    //Get any open appointment
    app.get("/api/appt", function(req, res){  
      db.Appt.findAll({
        attributes: ["id", "walkDate", "timeSlot", "DogActorId", "walkMemo"],
        where: {
          dogUser: 0
        }
      }).then(function(openAppt){
        res.json(openAppt);
      }).catch(err => {
        res.status(401).json(err)
      });
    });


  // dwid = dogwakerId, wd = walkDate, ts = timeSlot, 
  // du = dogUser, cncl = true to cancel false to change

  //Cancel an appointment
  app.put("/api/cancel-walk/:id", function(req,res){
    // if cncl true, cancel the appointment by setting dogUser = 0
       db.Appt.update({
        dogUser: 0,
        DogId: null
      },
      {
        where:{
          id: req.params.id
        }
      }).then(function(dbDog){
        res.json(dbDog);
      }).catch(err => {
        res.status(401).json(err)
      });
  });

    //Cancel all appointments for dog
    app.put("/api/cancel-all/:id", function(req,res){
      // if cncl true, cancel the appointment by setting dogUser = 0
         db.Appt.update({
          dogUser: 0,
          DogId: null
        },
        {
          where:{
            dogUser: req.params.id
          }
        }).then(function(dbCancelAll){
          res.json(dbCancelAll);
        }).catch(err => {
          res.status(401).json(err)
        });
    });

     

  //Book an appointment
  app.put("/api/change-walk/:id", function(req,res){
      db.Appt.update({
        dogUser: req.body.dogUser,
        DogId: req.body.dogUser,
        walkMemo: req.body.walkMemo
      },
      {
        where: {
          id: req.params.id  
        }
      }).then(function(dbDog){
        res.json(dbDog);
    }).catch(err => {
      res.status(401).json(err)
    });
  });


  //DOG ROUTES
  //Create Dog
  app.post("/api/dog", (req, res)=>{
    db.Dog.create({
      dogName : req.body.dogName,
      DogActorId : req.body.DogActorId,
      breed : req.body.breed,
      breedUrl:  "https://dog.ceo/api/breed/"+ req.body.breed + "/images"
    }).then(results => res.json(results))
      .catch(err => {
      res.status(401).json(err)
    });
  });

   //get dogs by owner id
  app.get("/api/dog/:id", (req, res)=>{
    db.Dog
    .findAll({
        where: {
        DogActorId: req.params.id
        }
      })
    .then(function(openAppt){
      res.json(openAppt);
    }).catch(err => {
      res.status(401).json(err)
    });
   });

   // Delete a dog
   app.delete("/api/dog/:id", (req, res) => {
    const id = req.params.id;
    db.Dog.destroy({
      where: {id: id}
    })
      .then(results => {
      console.log(results);
      res.json(results);
    }).catch(err => {
      res.status(401).json(err)
    });
  });
};
