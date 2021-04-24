const TOKEN = process.env['.env']
const Discord = require('discord.js'); //Definimos discord
const client = new Discord.Client();

const { Client, MessageEmbed, Collection, Guild } = require('discord.js'); //Definimos guild, MessageEmbed y otras cosas importantes
require('dotenv').config();
const keepAlive = require('./server.js'); //Definimos keepAlive que nos servirá para tener el bot 24/7

const fs = require('fs'); //Definimos fs
let { readdirSync } = require('fs'); //Definimos readdirSync que también lo necesitamos

let prefix = '-|' //Definimos un prefix para usar

//////////////////////////////Handler///////////////////////////

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./comandos').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./comandos/${file}`);
    client.commands.set(command.name, command);
}

//////////////////////////////Presencia/////////////////////////

const estados = [`Saltando Códigos`, `Buscando a Carrot`]
client.on('ready', () => {
  setInterval(() => {
    function presence() {
      client.user.setPresence({
        status: 'On',
        activity: {
        name: estados[Math.floor(Math.random() * estados.length)],
        type: 'PLAYING'
        }
      })
    }
    presence()
  }, 10000);
})

//////////////////////////////Evento Mensaje////////////////////

client.on('message', (message) => { //Abrimos un evento message, esto es muy importante porque es donde estarán los comandos

if(message.author.bot) return; //Con esto hacemos que el bot no responda a mensajes de otros bots lo cual evitará que entre en bucles
if(!message.content.startsWith(prefix)) return; //Aquí hacemos que si el mensaje no empieza con el prefix el bot no responda

let usuario = message.mentions.members.first() || message.member; //Definimos el usuario
const args = message.content.slice(prefix.length).trim().split(/ +/g); //Definimos los argumentos
const command = args.shift().toLowerCase(); //Definimos el comando

//////////////////////////////Handler///////////////////////////

let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
if(cmd){
cmd.execute(client, message, args)

}

//////////////////////Online 24/7//////////

const Monitor = require("ping-monitor")

keepAlive();
const monitor = new Monitor({
  website: "link",
  title: "Algo",
  interval: 5
})

}); //Cerramos el evento
client.login(process.env.TOKEN)

