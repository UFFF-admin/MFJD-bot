import { Client, GatewayIntentBits } from "discord.js";
import express from "express";

// ====== Discord Bot ======
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  console.log(`[DEBUG] 受信: ${message.content}`);
  if (message.author.bot) return;

  if (message.content === "!ping") {
    message.reply("Pong!");
  }
});

// ====== HTTP server for Render ======
const app = express();
app.get("/", (req, res) => res.send("alive"));
app.listen(process.env.PORT || 3000, () => {
  console.log("🌐 Web server is running.");
});

// ====== Login ======
client.login(process.env.DISCORD_TOKEN);
