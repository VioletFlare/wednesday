const { SlashCommandBuilder } = require('@discordjs/builders');

class Balance {

    constructor() {
        this.data = new SlashCommandBuilder()
                    .setName('balance')
                    .setDescription('Mostra la quantità di cookie (biscotti) che hai nel tuo account');
    }

    execute(interaction) {
        interaction.reply('Pong!');
    }

}


module.exports = new Balance();