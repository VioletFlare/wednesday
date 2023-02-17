const Discord = require("discord.js");

class BalanceEmbed {

    send(model) {
        const userMention = `<@${model.interaction.user.id}>`;
        let userAvatarURL = `https://cdn.discordapp.com/avatars/${model.interaction.user.id}/${model.interaction.user.avatar}.webp?size=256`;

        const cookies = String(model.cookies) + " 🍪";

        const embed = new Discord.MessageEmbed()
        .setColor('#000000')
        .setTitle("Balance                 ")
        .setDescription(`${userMention}`)
        .setThumbnail(userAvatarURL);

        embed.addFields(
            { name: 'Cookies', value: cookies, inline: true },
        );

        const embedContainer = { 
            embeds: [embed]
        };

        model.interaction.reply(embedContainer).catch(
            error => console.error(error)
        ); 
    }

}

module.exports = new BalanceEmbed();