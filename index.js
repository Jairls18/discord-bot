require('dotenv').config();
const { Client, GatewayIntentBits, MessageAttachment} = require('discord.js');
const cron = require('node-cron');
let check_list = {};

const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions]});

async function clean() {
    check_list = {};
}

async function go() {

    const canal = client.channels.cache.get(process.env.CHANNEL_ID); // 👦best-friends
    const rol = canal.guild.roles.cache.get(process.env.ROLE_ID); // @Los Timos (rol)
    const question = 'Ya pero, ¿Hoy go o khe?';
    const options = 'GO!        Nola        Duda';

    if (Object.keys(check_list).length == 0) {
        
        const mensaje = await canal.send(`${question} ${rol.toString()}\n\n${options}`);
        mensaje.react('✅');
        mensaje.react('❌');
        mensaje.react('🤔');

    }else{

        let list_id = ''

        if (!('484958867864944641' in check_list)) list_id = list_id + `<@${'484958867864944641'}> `
        if (!('181991306749411328' in check_list)) list_id = list_id + `<@${'181991306749411328'}> `
        if (!('236175198410375168' in check_list)) list_id = list_id + `<@${'236175198410375168'}> `

        if (list_id != ''){
            const mensaje = await canal.send(`${question} ${list_id}\n\n${options}`);
            mensaje.react('✅');
            mensaje.react('❌');
            mensaje.react('🤔');
        }
    }

}

async function volvi() {

    const canal = client.channels.cache.get(process.env.CHANNEL_ID); // 👦best-friends

    await canal.send(`Ya volví perros, me extrañaron? 😎`);

}
  
client.on('ready', () => {
    console.log(`Bot ${client.user.tag} online!`);
    volvi();
    cron.schedule('00 5 * * *', () => {clean();});
    cron.schedule('00 13 * * *', () => {go();});
    cron.schedule('00 18 * * *', () => {go();});
    cron.schedule('00 23 * * *', () => {go();});
});

client.on('messageReactionAdd', (reaction, user) => {

    console.log(user);
    
    const canal = client.channels.cache.get(process.env.CHANNEL_ID); // 👦best-friends
    const name  = user.username;
    const id  = user.id;

    if (name != 'Botin'){

        if (id == '1819913067494113280'){
            canal.send(`🥳 🥳 🥳 ${name} ha confirmado GO! 🥳 🥳 🥳`);
            check_list[user.id] = true;
        } else {
            if (reaction.emoji.name == '✅'){
                canal.send(`🥳 🥳 🥳 ${name} ha confirmado GO! 🥳 🥳 🥳`);
                check_list[user.id] = true;
            }
            if (reaction.emoji.name == '❌'){
                canal.send(`🤬 🤬 🤬 ${name} es FALLA csm. 🤬 🤬 🤬`);
                check_list[user.id] = true;
            }
            if (reaction.emoji.name == '🤔'){
                canal.send(`🙄 🙄 🙄 ${name} apura oe. 🙄 🙄 🙄`);
            }
        }

    }

  });


  client.on('message', (message) => {

    if (message.content.toLowerCase().includes('calamardo')) {

        message.delete()
        .then(() => console.log('Mensaje eliminado'))
        .catch((error) => console.error('Error al eliminar el mensaje:', error));

        const imageBuffer = fs.readFileSync('https://arc-anglerfish-arc2-prod-copesa.s3.amazonaws.com/public/DRBGFCD22JEPPDHOHOD4L4QM5E.jpg'); // Reemplaza con la ruta de tu imagen
        const attachment = new MessageAttachment(imageBuffer, 'calamardo.jpg');

        message.channel.send(attachment)
        .then(sentImage => console.log('Imagen enviada correctamente'))
        .catch((error) => console.error('Error al enviar la imagen:', error));
    
    }

});

client.login(process.env.DISCORD_TOKEN);