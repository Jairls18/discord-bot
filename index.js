require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');

async function go() {
    const canal = client.channels.cache.get(process.env.CHANNEL_ID); // 👦best-friends
    const rol = canal.guild.roles.cache.get(process.env.ROLE_ID); // @Los Timos (rol)
    canal.send(`Ya pero hoy go o khe? ${rol.toString()}`);
}
  
const client = new Client({intents: [GatewayIntentBits.Guilds]})

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} online!`);
    go();
    cron.schedule('00 12 * * *', () => {go();});
    cron.schedule('00 20 * * *', () => {go();});
});

client.login(process.env.DISCORD_TOKEN);