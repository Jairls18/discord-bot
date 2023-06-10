require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions]});

async function go() {
    const canal = client.channels.cache.get(process.env.CHANNEL_ID); // 👦best-friends
    const id = '181991306749411328';
    await canal.send(`<@${id}> es FALLA csm!`);
}
  
client.on('ready', () => {
    console.log(`Bot ${client.user.tag} online!`);
    setInterval(go, 10000);
});

client.login(process.env.DISCORD_TOKEN);


// DAZS     181991306749411328
// GUARDA   236175198410375168
// JAIR     484958867864944641
// SEBAS    562417509135810561