const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
var prefix = ("~")

// Stuff for the timer
var NOTIFY_CHANNEL;
const targetMinute = 0; // 0 - 1:00, 2:00; 30 - 1:30, 2:30


client.on("ready", () => {
  console.log("I am ready!");
  NOTIFY_CHANNEL = client.channels.find('id', '381516248028020748');
});

client.on("message", (message) => {

  // Exit and stop if no prefix or author of message is bot
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Behaviour for changing prefix command
  if (message.content.startsWith(prefix + "changeprefix")) {
    let newPrefix = message.content.split(" ").slice(1,2)[0];
    prefix = newPrefix;
    message.channel.send("Prefix changed to: " + prefix);
  }

});

setInterval(function() {
  var d = new Date();
  if(d.getMinutes() !== targetMinute)
    return;
  NOTIFY_CHANNEL.sendMessage("Remember to drink water and stay hydrated!");
}, 60 * 1000); // Check every minute

client.login(process.env.BOT_TOKEN);