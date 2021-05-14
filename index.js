const Discord = require("discord.js");
const config = require("./config.json");
const data = require("./data.json");
const fetch = require("node-fetch");

const client = new Discord.Client();
const prefix = "$";

client.on("message", async function(message) {
   if (message.author.bot) return;
   if (!message.content.startsWith(prefix)) return;

   const commandBody = message.content.slice(prefix.length);
   const args = commandBody.split(' ');
   const command = args.shift().toLowerCase();

   if (command === "mock") {
       message.reply(await getInsult());
   }
});

//For use with the data.json file
// const getRandomMock = () => {
//     let listLength = data.mockList.length;
//     return data.mockList[Math.floor(Math.random() * listLength)];
// }

async function getInsult (){
    let res = await fetch('https://insult.mattbas.org/api/insult');
    let data = await res.text();
    console.log(data);
    return data;
}

client.login(config.BOT_TOKEN);