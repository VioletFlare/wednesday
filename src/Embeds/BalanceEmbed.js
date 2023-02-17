class BalanceEmbed {

    send(model) {
        const embed = new Discord.MessageEmbed()
        .setColor('#DAA520')
        .setTitle("👑 Leader Board                 ")
        .setDescription("test")
        .setThumbnail('https://i.imgur.com/v5RR3ro.png')
        .setFooter({ text: "footer", iconURL: "" })

    const embedContainer = { 
        embeds: [embed]
    };

    if (model.isNewMessage) {
        model.msg.reply(embedContainer).catch(
            error => console.error(error)
        );
    } else {
        model.msg.edit(embedContainer).catch(
            error => console.error(error)
        );
    }

    }

}