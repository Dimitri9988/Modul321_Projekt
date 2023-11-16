const mariadb = require('mariadb');
const { executeSQL } = require("./database");

const initializeAPI = (app) => {
  // default REST api endpoint
  app.get("/api/hello", hello);
  //app.post("/api/sendChat", receiveChat);
};



const hello = (req, res) => {
  res.send("Hello World!");
};


module.exports = { initializeAPI };