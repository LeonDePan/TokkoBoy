const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "say", //Aquí ponemos el nombre del comando
  alias: ["s"], //Aquí un alias, esto será como un segundo nombre del comando, si no quieren ponerle alias tenéis que quitarle las " " y dejarlo así: alias: [],

  execute (client, message, args){

    if(message.deletable) message.delete()
    if (args.join(" ").length <1) return message.channel.send('Escribe algo!');
    let permisos = message.channel.permissionsFor(message.member);
    message.channel.send(args.join(" "), {
      disableMentions: permisos.has("MENTION_EVERYONE") ? "none" : "everyone"

    })
    .catch((err) => {
      return message.reply("Hubo un error al decir el mensaje");
    })

   }

} 