const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  name: "addrole", //Aquí ponemos el nombre del comando
  alias: ["addr"], //Aquí un alias, esto será como un segundo nombre del comando, si no quieren ponerle alias tenéis que quitarle las " " y dejarlo así: alias: [],

  async execute (client, message, args){

    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.id == args[1])
    let owner = message.guild.owner.user.id;

    if(message.author == owner){
      if(!args[0]) return message.channel.send('Necesitas mencionar a alguien')
      if(!user) return message.channel.send('Este usuario no existe')
      if(!args[1]) return message.channel.send('Necesitas mencionar un rol')
      if(!role) return message.channel.send('Este ro rol no es válido')
      if(!role.editable) return message.channel.send('Este rol es superior al mio')
      if(user.roles.cache.has(role.id)) return message.channel.send('Este usuario ya tiene e rol')
      await user.roles.add(role.id)
      return message.channel.send(`El rol ${role.name} dado a ${user}`)
    }
    if(!message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) return message.channel.send("No tienes los permisos para usar este comando")
    if(!message.guild.me.hasPermission("MANAGE_ROLES", "ADMINISTRATOR")) return message.channel.send("No tengo permisos para ejecutar el comando")
    if(!args[0]) return message.channel.send("Necesitas mencionar a alguien")
    if(!user) return message.channel.send("Este usuario no existe")
    if(user == owner) return message.channel.send("No puedes otorgarle roles al Dueño")
    if(user = message.author.id){
      if(!args[1]) return message.channel.send("Necesitas mencionar un rol")
      if(!role) return message.channel.send("Rol inválido")
      if(role.comparativePositionTo(message.member.roles.highest)>= 0) return message.channel.send("No puedes darle el rol al usuario")
      if(!role.editable) return message.channel.send("El rol es superior a mio")
      if(user.roles.cache.has(role.id)) return message.channel.send("El usuario ya tiene el rol")
      await user.roles.add(role.id)
      return message.channel.send(`El rol ${role.name} dado a ${user}`)
    }
    if(message.roles.highest.comparePositionTo(user.roles.highest)<= 0) return message.channel.send("No puedes darle este rol al usuario")
    if(!args [1]) return message.channel.send("Necesitas mencionar un rol")
    if(!role) return message.channel.send("Rol inválido")
    if(role.comparativePositionTo(message.member.roles.highest)>= 0) return message.channel.send("No puedes otorgar un rol por encima del tuyo")
    if(!role.editable) return message.channel.send("Estoy debajo de este rol")
    if(user.roles.cache.has(role.id)) return message.channel.send("El usuario ya tiene el rol")
    await user.roles.add(role.id)
    return message.channel.send(`El rol ${role.name} dado a ${member.displayName} | Dado por ${message.member.displayName}`)

  }

} 