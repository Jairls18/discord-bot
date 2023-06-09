require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const cron = require('node-cron');
const check_list = {};

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions]});

async function go() {
    const canal = client.channels.cache.get(process.env.CHANNEL_ID); // 👦best-friends
    const rol = canal.guild.roles.cache.get(process.env.ROLE_ID); // @Los Timos (rol)
    const question = 'Ya pero, ¿Hoy go o khe?';
    const options = '✅ Go   ❌ Nola   🤔 Todavía';
    const mensaje = await canal.send(`${question} ${rol.toString()}\n\n${question}\n\n`);
    mensaje.react('✅');
    mensaje.react('❌');
    mensaje.react('🤔');
}
  
client.on('ready', () => {
    console.log(`Bot ${client.user.tag} online!`);
    go();
    cron.schedule('00 13 * * *', () => {go();});
    cron.schedule('00 18 * * *', () => {go();});
    cron.schedule('00 23 * * *', () => {go();});
});

client.on('messageReactionAdd', (reaction, user) => {

    console.log(user);
    
    const canal = client.channels.cache.get(process.env.CHANNEL_ID); // 👦best-friends
    const name  = user.username;

    if (name != 'Botin'){
        if (reaction.emoji.name == '✅'){
            canal.send(`${name} ha confirmado GO!`);
            check_list[name] = true;
        }
        if (reaction.emoji.name == '❌'){
            canal.send(`${name} es FALLA csm.`);
        }
        if (reaction.emoji.name == '🤔'){
            canal.send(`${name} apura oe.`);
        }
    }

  });

client.login(process.env.DISCORD_TOKEN);