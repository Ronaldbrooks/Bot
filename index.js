const Discord = require("discord.js");
const config = require("./config.json");
const data = require("./data.json");
const fetch = require("node-fetch");

const client = new Discord.Client();
const prefix = "$";

client.on("message", async function(message) {
   if (message.author.bot) return;
   if (!message.content.startsWith(prefix)) return;
//    console.log("Message: " + message.content)
   const commandBody = message.content.slice(prefix.length);
//    console.log("CommandBody: " + commandBody)
   const args = commandBody.split(' ');
//    console.log("Args: " + args)
   const command = args.shift().toLowerCase();
//    console.log("Command: " + command)

   if (command === "insult") {
       message.reply(await getInsult());
   }

   if (command === "mock") {
    //const mocks = message.mentions.users.map(user =>{ console.log("user " + user); return user.lastMessage; });
    // const lastMessageIDs = message.channel.members.map(member => {

    //     // console.log(member.user.username + ": " + member.lastMessageID);
    //     // console.log(message.mentions.members.first().user.username);
    //     if(member.user.username === message.mentions.members.first().user.username && (member.lastMessageID === '' || member.lastMessageID === null))
    //     {
    //         return member.lastMessageID;
    //     }
    // });
    // console.log(message.channel.members);
    const lastMessageIDs = message.channel.members.filter(member => {
        console.log(member);
        return (member.lastMessageID != null) && (member.user.id!= message.member.user.id)
    }).first().lastMessageID;

    console.log(lastMessageIDs);

    // let lastMessageContent = message.channel.messages.cache.filter(id => {
    //     //console.log(id.channel.lastMessageID);
    //     //console.log(id.channel);
    //     return id.channel.lastMessageID == lastMessageIDs;
    // });
    //console.log(lastMessageContent);
    //TODO msg if empty logic
    message.channel.send(lastMessageContent);
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
