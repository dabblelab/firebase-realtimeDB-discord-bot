

// User: I really liked your tutorial
// Bot: Perfect thanks, I'll let Dabble Lab know
// Bot sends the user's message to firebase realtime DB along with the user's name. 
// ----------------------------------------------

const Discord = require('discord.js');
const client = new Discord.Client();
const mySecret = process.env['DISCORD_TOKEN']
const firebase = require('firebase');
const randomstring = require("randomstring");

client.on("ready", () => {
  console.log("I am ready!");
});

// PLEASE FILL IN YOUR VALUES INSIDE CONFIG OBJECT. REFER TO THIS TUTORIAL TO GET STARTED : 

const config = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://PROJECT_ID.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
};

firebase.initializeApp(config);
const database = firebase.database();

 client.on("message", async message => {
  if (message.author === client.user) {
    return;
  }
  try {
    let ticket = randomstring.generate(7);
    firebase.database().goOnline();
    await database.ref('/Archive/' + ticket).set({
      Message: message.content,
      User: message.author.username,
      User_ID: message.author.id,
      Ticket_Number: ticket
    })
    
    firebase.database().goOffline();
    await client.channels.cache.get(`CHANNEL_ID`).send(`Thanks for the feedback. This is your Support Ticket Number ${ticket} We\'ll let Dabble Lab know! `);
  }
  
  catch (err) {
    console.log(err);
  }

}
);

client.login(mySecret);

