const socket = new WebSocket("ws://localhost:3000");

socket.addEventListener("open", (event) => {
    console.log("WebSocket connected!");
    socket.send(JSON.stringify("Hello, server!"));
  });





socket.addEventListener("close", (event) => {
  console.log("WebSocket closed.");
});

socket.addEventListener("error", (event) => {
  console.error("WebSocket error:", event);
});
socket.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    const messagedatasWsOutput = data[0].message;
    const messageDatas = JSON.parse(messagedatasWsOutput)
    const messages = messageDatas
    const userInput = document.getElementById('user-input');
    const chatBox = document.getElementById('chatwindow');
    console.log(messageDatas)


    for (let i = 0; i < messages.length; i++) {
    
        const message = (messages[i].message)
        const name = (messages[i].name)
        const timestamp = (messages[i].timestamp)
    
        const chatBoxElement = 
        `<div id="chatbox" class="w-5/12 h-fit bg-indigo-100 rounded-lg">
            <span class="text-xl font-bold">${name}</span> 
            <div class="border-t border-gray-500 my-1"></div> 
            <p class="">${message}</p>
            <div class="border-t border-gray-500 my-1"></div> 
            <span class="text-xs text-left underline-offset-1">${timestamp}</span>
        </div>`;
        chatBox.innerHTML += chatBoxElement;
    }
    chatBox.scrollTop = chatBox.scrollHeight;
})






const selectUser = async () => {
    const userInput = document.getElementById('user-input');

    const username = userInput.value;
    const userData = {
        username: username
    };
    const wsUser = JSON.stringify([
        {
          type: "sendUserData",
          message: JSON.stringify(userData)
        }
      ])
    
      socket.send(wsUser) 
};




const newChatBox = async () => {
    const chatBox = document.getElementById('chatwindow');
    const msgInput = document.getElementById('message-input');
    const userInput = document.getElementById('user-input');

    const username = userInput.value;
    const message = msgInput.value;
    const timeStamp = new Date().toLocaleDateString("de-CH", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    const chatData = {
        username: username,
        message: message,
        timeStamp: timeStamp 
    };

    const chatBoxElement = 
        `<div id="chatboxUser" class="w-5/12 h-fit bg-indigo-100 rounded-lg outline">
            <span class="text-xl font-bold">${username}</span> 
            <div class="border-t border-gray-500 my-1"></div> 
            <p class="">${message}</p>
            <div class="border-t border-gray-500 my-1"></div> 
            <span class="text-xs text-left underline-offset-1">${timeStamp}</span>
        </div>`;

    chatBox.innerHTML += chatBoxElement;
    chatBox.scrollTop = chatBox.scrollHeight;

    
  
    const wsMessage = JSON.stringify([
      {
        type: "sendChatData",
        message: JSON.stringify(chatData)
      }
    ])
  
    socket.send(wsMessage)    
};



document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById('sendButton').addEventListener('click', function () {
        newChatBox();
        
    });
    document.getElementById('selectUser').addEventListener('click', function () {
        selectUser();
    });
});
