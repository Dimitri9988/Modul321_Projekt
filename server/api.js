const mariadb = require('mariadb');
const { executeSQL } = require("./database");

const initializeAPI = (app) => {
  // default REST api endpoint
  app.get("/api/hello", hello);
  //app.post("/api/sendChat", receiveChat);
  app.post("/api/sendUser", receiveUser);
};



const hello = (req, res) => {
  res.send("Hello World!");
};







/*
const receiveChat = async (req, res) => {
  const { message, username, timeStamp } = req.body;
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
    const newMessage = ""
    const query = `INSERT INTO messages (user_id, message, timestamp) VALUES (${userId}, "${newMessage}", "${timeStamp}")`;
    await executeSQL(query);
  }
  else {
    const query = `INSERT INTO messages (user_id, message, timestamp) VALUES (${userId}, "${message}", "${timeStamp}")`;
    await executeSQL(query);
  }

} */


const receiveUser = async (req, res) => {
  const { username} = req.body;
  console.log(username)

  const query = `INSERT INTO users (name) VALUES ("${username}")`;

  await executeSQL(query);

}
module.exports = { initializeAPI };