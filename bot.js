const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const fs = require("fs")

// Stuff for the timer
var NOTIFY_CHANNEL;
const targetMinute = 25; // 0 - 1:00, 2:00; 30 - 1:30, 2:30


client.on("ready", () => {
  console.log("I am ready!");
  NOTIFY_CHANNEL = client.channels.find('id', (config.channel));
});

client.on("message", (message) => {

  // Exit and stop if no prefix or author of message is bot
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  // Behaviour for changing prefix command
  if (message.content.startsWith(config.prefix + "changeprefix")) {
    let newPrefix = message.content.split(" ").slice(1,2)[0];
    config.prefix = newPrefix;

    fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);

    message.channel.send("Prefix changed to: " + newPrefix);
  }
  
  // Behaviour for setting channel to be reminded
  if (message.content.startsWith(config.prefix + "setchannel")) {
	  let curChannel = message.channel.id;
	  config.channel = curChannel;
	  
	  fs.writeFile("./config.json", JSON.stringify(config), (err) => console.error);
	  
	  message.channel.send("You will now get reminders in this channel!");
  }

});

setInterval(function() {
  var d = new Date();
  if(d.getMinutes() !== targetMinute)
    return;
  NOTIFY_CHANNEL.sendMessage("Remember to drink water and stay hydrated!");
}, 60 * 1000); // Check every minute

client.login(process.env.BOT_TOKEN);