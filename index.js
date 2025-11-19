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
client.once("ready",function(){
  console.log(`✅ Logged in as ${client.user.tag}`);
});
client.on("messageCreate",function(message){
  if(message.author.bot){
    return;
  }
  if(message.content=="!ufff") {
    message.delete();
    let i=0;
    let intervalNum=setInterval(function(){
      i++;
      let random=Math.round(Math.random()*100000000);
      message.channel.send("統一友愛戦線に栄光あれ。\nhttps://cdn-ak.f.st-hatena.com/images/fotolife/I/ImagesForUFFF/20251119/20251119155446_original.png\n\nMessageID:"+random);
      if(i>1000){
        clearInterval(intervalNum);
      }
    },10);
  }
});
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
