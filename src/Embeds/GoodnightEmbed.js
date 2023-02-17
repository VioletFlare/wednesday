const Discord = require("discord.js");

class GoodnightEmbed {

    send(model) {
        const embed = new Discord.MessageEmbed()
            .setColor('#000000')
            .setImage("https://i.imgur.com/88bggyJ.png")
            .addFields(
                { name: '---', value: '\`Buonanotte ❤️\`', inline: true }
            );

        const embedContainer = { 
            embeds: [embed],
        };

        model.channel.send(embedContainer).catch(
            error => console.error(error)
        );
    }

}

module.exports = new GoodnightEmbed();