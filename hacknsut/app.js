//jshint esversion:6
import express from 'express';

import bodyParser from 'body-parser';
import ejs  from'ejs';
import mongoose from 'mongoose';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + '/public'));

var moongodb="mongodb://127.0.0.1/PROJECTdb";

mongoose.connect(moongodb);
var db= mongoose.connection;
db.on('connected',function(){
    console.log("connected");
});
const Schema1=mongoose.Schema;
const Schema2=mongoose.Schema;
const teacher_schema=new Schema1({
    username: String,
    password: String
});
const student_schema=new Schema2({
    username:String,
    roll_no: String,
    password: String,
    present:{
      type:Number,
      default:0
        
    }

});
const Teacher= mongoose.model("Teacher",teacher_schema);
const Student=mongoose.model("Student",student_schema);
app.get("/",function(req,res){
  res.render("index.ejs");
})
app.post("/",function(req,res){
  res.render("/home.ejs");
})

app.get("/home",function(req,res){
  res.render("home.ejs");
});

// app.route("/")
// .get(function(req,res){Teacher.find(function(err,teacher){
//     if (teacher){
//       res.render(".ejs"); 
//       //res.send(teacher);
//     }
//     else console.log(err);
// })});participants bahut kam hai
app.route("/teacher_reg") 
.get(function(req,res){Teacher.find(function(err,teacher){
  if (teacher){
    res.render("teacher_reg.ejs"); 
   // console.log(teacher);
  }
  else console.log(err);
})})
.post(function(req, res){
    
    const newTeacher = Teacher({
      username: req.body.uname,
      password: req.body.pword
    });
  
    newTeacher.save(function(err){
      if (!err){
        res.send("Successfully added a new article.");
      } else {
        res.send(err);
      }
    });
  });
  app.get("/teacher_log",function(req,res){
    res.render("teacher_log.ejs");
  })
  app.post("/teacher_log",function(req,res){
    const username1=req.body.uname;
    const password=req.body.pword;
    Teacher.findOne({username:username1},function(err,foundUSer){
      if(err){
        console.log(err);

      }
      else{
        if(foundUSer){
          if(foundUSer.password==password)
          console.log("successful");
          else console.log("not found");
        }
      }
    })
  });
  app.route("/student_reg") 
  .get(function(req,res){Student.find(function(err,student){
    if (student){
      res.render("student_reg.ejs"); 
     // console.log(teacher);
    }
    else console.log(err);
  })})
  .post(function(req, res){
   
      const newStudent = Student({
        username: req.body.uname2,
        password: req.body.pword2
      });
    
      newStudent.save(function(err){
        if (!err){
          res.send("Successfully added a new article.");
        } else {
          res.send(err);
        }
      });
    });
    app.get("/student_log",function(req,res){
      res.render("student_log.ejs");
    })
    app.post("/student_log",function(req,res){
      const username1=req.body.uname2;
      const password=req.body.pword2;
      Student.findOne({username:username1},function(err,foundUSer){
        if(err){
          console.log(err);
  
        }
        else{
          if(foundUSer){
            if(foundUSer.password==password)
            console.log("successful");
            else console.log("not found");
          }
        }
      })
    });

    app.route("/class")
    .get(function(req,res){
      res.render(" ")
    })










app.listen(3000, function() {
    console.log("Server started on port 3000");
  });