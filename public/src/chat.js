const socketChatGral = io();

socketChatGral.on("renderchat", ()=>{
    renderChat()
})

function renderChat(){
    const tabla = document.getElementById('tBodyChat');
    const url = '/api/chat';
 
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
       
        tabla.innerHTML="";
        for (const chat of data.messages) {
            let fila = document.createElement('tr');
            let aux1 = document.createElement('td');            
            let color="green"
            if ( chat.tipo === 'sistema') color="blue" 
            aux1.innerHTML = `<strong><font color="${color}">${chat.author}</font></strong>`;            
            let aux2 = document.createElement('td');
            aux2.innerHTML = `<i><font color="green">${chat.body}</font></i>`;
            fila.appendChild(aux1);             
            fila.appendChild(aux2);
            tabla.appendChild(fila);
        }
        
    })
    .catch(function(error) {
      console.log(error);
    });
    return false;
}

function enviarChat(evt){
    evt.preventDefault();
   
    const url = '/api/chat';
    let data = {
        msg: document.getElementById('msg').value
    }

    const request = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
    };
    
    fetch(url, request)
        .then(function() {         
            document.getElementById('msg').value = "";
            socketChatGral.emit("chat", "");
    }); 
}

function main(){
    const url = '/login';
    const options = {
        method: "GET"
    }
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        if (data) { 
             let x = document.getElementById("usuarioLogin");
            x.innerHTML = `${data.user}` 
            let y = document.getElementById("usuarioAvatar") 
            y.innerHTML = `<img src = './avatars/${data.avatar}' width="40"height="40" style="border-radius: 20px;"></img>`
           
            
        }else{
            //window.location.href = "login.html";
        }
    })
    .catch(function(error) {
        console.log(error);
      });
}