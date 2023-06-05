require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');

const client = new Client({intents: [GatewayIntentBits.Guilds]})

async function go() {
    const canal = client.channels.cache.get(process.env.CHANNEL_ID); // 👦best-friends
    const rol = canal.guild.roles.cache.get(process.env.ROLE_ID); // @Los Timos (rol)
    canal.send(`Ya pero hoy go o khe? ${rol.toString()}`);
}
  
client.on('ready', () => {
    console.log(`Bot ${client.user.tag} online!`);
    cron.schedule('00 17 * * *', () => {go();});
    cron.schedule('00 24 * * *', () => {go();});
});

client.login(process.env.DISCORD_TOKEN);