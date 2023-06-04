const socket = io();
const chatForm = document.getElementById('chat-form');

socket.on('message',message =>{
   console.log(message);
});

chatForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const msg = e.target.elments.msg.value;

  console.log(msg);
})