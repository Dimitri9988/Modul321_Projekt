const WebSocket = require("ws");
const { executeSQL } = require("./database");

const initializeWebsocketServer = (server) => {
  const websocketServer = new WebSocket.Server({ server });
  websocketServer.on("connection", onConnection);
};

let websockets = [];

const onConnection = (ws) => {
  console.log("Neue WebSocket-Verbindung");
  
  console.log(websockets)
  ws.on("message", (message) => onMessage(ws, message));
};



const onMessage = async (ws, message) => {
  const getMessagEntry = JSON.parse(message);
  if (getMessagEntry[0].type === "sendChatData") {
    const newMessageEntry = JSON.parse(getMessagEntry[0].message);
    const messageOutput = newMessageEntry.message;
    const usernameOutput = newMessageEntry.username;
    const timeStampOutput = newMessageEntry.timeStamp;
    await receiveChat(messageOutput, usernameOutput, timeStampOutput);
  }
  else if (getMessagEntry[0].type === "sendUserData") {
    const newMessageEntry = JSON.parse(getMessagEntry[0].message);
    const usernameOutput = newMessageEntry.username;

  }
  websockets.push(ws);
  const messageDatas = await loadMessages();
  const wsMessage = JSON.stringify([
    {
      type: "messagesData",
      message: JSON.stringify(messageDatas),
    },
  ]);
  
  console.log(websockets.length)
  for (let i = 0; i < websockets.length; i++) {
    websockets[i].send(wsMessage)
  }

};



const loadMessages = async() => {
  const messageDb = await executeSQL("SELECT * FROM messages;");
  const userIDs = messageDb.map(entry => entry.user_id);

  const getUsersWithID = async(userID) => {
    const user = await executeSQL(`SELECT name FROM users WHERE id = ${userID}`);
    return { name: user[0].name };
  }
  const userDb = await Promise.all(userIDs.map(getUsersWithID));

  const combinate = (firstArray, secondArray) => {
    const combinedArray = [];

    for (let i = 0; i < firstArray.length; i++) {
      const combinateEntry = { name: firstArray[i].name, message: secondArray[i].message, timestamp: secondArray[i].timestamp };
      combinedArray.push(combinateEntry);
    }
    return combinedArray;
  };

  const fullMesageDatas2 = combinate(userDb, messageDb)
  
  return(fullMesageDatas2);
  
  
}

const receiveChat = async (messageInput, usernameInput, timeStampInput) => {
  const message = messageInput
  const username = usernameInput
  const timeStamp = timeStampInput
  const userIdResult = await executeSQL(`SELECT id FROM users WHERE name = '${username}'`);
  if (userIdResult && userIdResult.length > 0) {
    userId = userIdResult[0].id;
  } else {
    userId = 17;
  }
  if (message === "smile") {
    const newMessage = "(＾◡＾)"
    const query = `INSERT INTO messages (user_id, message, timestamp) VALUES (${userId}, "${newMessage}", "${timeStamp}")`;
    await executeSQL(query);
  }
  else if (message === "wizard") {
    const newMessage = "(∩^o^)⊃━☆"
    const query = `INSERT INTO messages (user_id, message, timestamp) VALUES (${userId}, "${newMessage}", "${timeStamp}")`;
    await executeSQL(query);
  }
  else if (message === "") {
    const newMessage = "--This user was too stupid for a message--\n--LG KIM--"
    const query = `INSERT INTO messages (user_id, message, timestamp) VALUES (${userId}, "${newMessage}", "${timeStamp}")`;
    await executeSQL(query);
    const query2 = `INSERT INTO messages (user_id, message, timestamp) VALUES (21, "Hahahahahahahahahaha", "${timeStamp}")`;
    await executeSQL(query2);
  }
  else {
    const query = `INSERT INTO messages (user_id, message, timestamp) VALUES (${userId}, "${message}", "${timeStamp}")`;
    await executeSQL(query);
  }

}
const receiveUser = async (usernameInput) => {
  const username = usernameInput

  const query = `INSERT INTO users (name) VALUES ("${username}")`;

  await executeSQL(query);

}


module.exports = { initializeWebsocketServer };