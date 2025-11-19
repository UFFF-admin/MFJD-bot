import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,   // ← メッセージ受信
    GatewayIntentBits.MessageContent,  // ← メッセージ本文を読む
  ],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  console.log(`[DEBUG] 受信: ${message.content}`); // ← これを追加
  if (message.author.bot) return;
  if (message.content === "!ping") {
    message.reply("Pong!");
  }
});
import express from "express";
const app = express();
app.get("/", (req, res) => res.send("alive"));
app.listen(process.env.PORT || 3000);
client.login(process.env.DISCORD_TOKEN);
