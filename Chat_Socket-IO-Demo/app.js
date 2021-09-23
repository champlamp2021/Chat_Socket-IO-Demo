//server-site
const {insert_massage} = require('./mongodb/insertMessage')//เรียกใช้ function insert_massage
const {findMessage}= require('./mongodb/findMessage')

const express=require("express");
const socketio =require("socket.io");
//const upload=require('express-fileupload');
const app=express();

app.set("view engine","ejs");
app.use(express.static("public"));

//app.use(upload());

app.get("/",(req,res)=>{
    res.render("index");
});

var clients=0;  //คอยนับจำนวนเครื่องที่เชื่อมต่อ
const server= app.listen(3000,()=>{
    console.log("server is running...");
    console.log('client connected =',clients);
});

//initialize socket for the server
const io=socketio(server);

    io.on("connection",(socket)=>{
        console.log("New user connection");
        socket.username="Anonymousssss"; //default username

    clients++;
        io.sockets.emit("broadcast",{description: clients});
        console.log('clientes concected:',clients);
        

        socket.on("change_username",data =>{
            console.log('data=',data); //data input from UI
            socket.username=data.username;  //input  username  insert to data 
       
        })

            //handle  the new message event
        socket.on("new_message", data => {
        /* var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            var today  = new Date();
            const time=today.toLocaleDateString("en-US", options);
    */
            var date = new Date();
            var datestring = date.getDate()  + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + " " +
            date.getHours() + ":" + date.getMinutes();

            //console.log(time);
            console.log('new_message=', data);  //data input from UI
            console.log(`message is = ${data.message},frome = ${socket.username}`);
            io.sockets.emit("receive_message",{ message: data.message, username: socket.username });
            insert_massage(socket.username,data.message,datestring);
        })
        //typing server
        socket.on('typing',data=>{
            socket.broadcast.emit('typing',{username:socket.username})
        })

        socket.on("disconnect",function(){
            clients--;
            console.log("user disconnect :",clients);
            io.sockets.emit("broadcast",{description: clients});
            //console.log('clients only:',clients);
        })

    });
    /*
app.post('/xxx',(req,res)=>{
    console.log(req.name);
    console.log("-----------------");
  
    if(req.files){
        console.log(req.files);
        var file=req.files.file
        var filename=file.name;
        console.log(filename);
    
            file.mv('./uploads/'+filename,function(err){
            if(err){
                res.send(err);
             
            }else{
                res.send("File Uploaded!...");
            }
        })     
    }
})
*/