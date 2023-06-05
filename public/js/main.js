const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');

// Message from server
socket.on('message',message =>{
   console.log(message);
   outputMessage(message);

   // Scroll Down
   ChatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const msg = e.target.elements.msg.value;
// Emit message to server
  socket.emit('chatMessage',msg);

  // clear Input
  e.target.elements.msg.value =  '';
  e.target.elements.msg.focus();

})

// Output message to Dom

function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<p class='meta'>Pallav<span>9:12pm</span></p>
  <p class='text'>
      ${message}
  </p>`;
  document.querySelector('.chat-messages').appendChild(div);    

}