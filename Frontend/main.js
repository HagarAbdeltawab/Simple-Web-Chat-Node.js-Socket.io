let socket =io('http://localhost:3000/');

let msgInput = document.getElementById('msg');
let messages = document.getElementById('msgData');

function sendMsg (){
    let msg = msgInput.value;
    socket.emit('sendMsg',msg);
    msgInput.value = "";
}

socket.on('reply',(data)=>{
    let item = document.createElement('li');
    item.textContent= data;
    messages.append(item);
    window.scrollTo(0, document.body.scrollHeight)
})

msg.addEventListener('input', ()=>{
    socket.emit('typing');
})

msg.addEventListener('keyup', ()=>{
    socket.emit('stopTyping');
})

socket.on('userTyping',(data)=>{
    document.getElementById('typing').innerHTML = "Typing...";
    
})

socket.on('userStopTyping',(data)=>{
    setTimeout(() => {
        document.getElementById('typing').innerHTML = "";
    }, 1000);
})

function addMessage(){
    socket.emit('add',{message:msgInput.value});
}

document.addEventListener('DOMContentLoaded', () => { 
    socket.emit('getAllMessages');
    socket.on('allMessages', (data) => {
        messages.innerHTML = '';
        data.forEach((message) => {
            const item = document.createElement('li');
            item.textContent = message.message;
            messages.append(item);
        });
    });
});