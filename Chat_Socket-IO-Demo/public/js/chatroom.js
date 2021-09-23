//client-site
//var {findMessage} = require('../../mongodb/findMessage');

(function connect (){

    let socket=io.connect("http://localhost:3000");
    let username=document.querySelector('#username');
    let usernameBtn=document.querySelector('#usernameBtn');
    let curUsername=document.querySelector('.card-header');
  

    usernameBtn.addEventListener('click',e=>{
        //console.log('log click e',e);
        console.log('Something Change name To: '+username.value);
        socket.emit('change_username',{username:username.value})
        curUsername.textContent=username.value  //step insert data username
        username.value='' // clear username to null
    })

    let message=document.querySelector('#message');
    let messageBtn=document.querySelector('#messageBtn');
    let messageList=document.querySelector('#message-list');
    
    messageBtn.addEventListener('click',e=>{
        socket.emit('new_message',{message: message.value})
        console.log(message.value);
        message.value=''
    })
//UI receive_message from server

    socket.on('receive_message',data=>{
        console.log(data);
        let listItem=document.createElement('li');
        listItem.textContent=data.username + ": " + data.message;
        listItem.classList.add('list-group-item');
        messageList.appendChild(listItem)
    })
//ui receive_dataClient from server
let clientConnect=document.querySelector('.card-header2');
   socket.on('broadcast',function(data){
        //document.body.innerHTML='';
        //document.write(data.description);
        clientConnect.textContent=data.description;
        console.log(clientConnect);
   })
   //typing client
let info=document.querySelector('.info');
    message.addEventListener('keypress',e=>{
        socket.emit('typing');
    })
    socket.on('typing',data=>{
      info.textContent=data.username +" is typing..." ;//display on ui "data.username is typing..."
        setTimeout(()=> { info.textContent=''},5000);//5ms clear data
    })
/*
//uploadFile
let uploadFile=document.querySelector('uploadFile');
let uploadBtn=document.querySelector('uploadBtn');
uploadBtn.addEventListener('click',e=>{
    console.log(uploadFile.name);
    
})
*/

})();