const { SlashCommandBuilder } = require('@discordjs/builders');
const BalanceEmbed = require('../Embeds/BalanceEmbed');
const AccountsProvider = require('../Providers/AccountsProvider');

class Balance {

    constructor() {
        this.init();
    }

    execute(DAL, interaction) {
        this.DAL = DAL;
        this.AccountsProvider = new AccountsProvider(interaction.guild, DAL);
        this.AccountsProvider.getCookies(interaction.guild.id, interaction.user.id).then(cookies => {
            BalanceEmbed.send({
                interaction: interaction,
                cookies: cookies
            });
        });
    }

    init() {
        this.data = new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Mostra la quantità di cookie (biscotti) che hai nel tuo account');
    }

}


module.exports = new Balance();