/*
                      (
                        )     (
                 ___...(-------)-....___
             .-""       )    (          ""-.
       .-'``'|-._             )         _.-|
      /  .--.|   `""---...........---""`   |
     /  /    |                             |
     |  |    |                             |
      \  \   |                             |
       `\ `\ |                             |
         `\ `|                             |
         _/ /\                             /
        (__/  \                           /
     _..---""` \                         /`""---.._
  .-'           \                       /          '-.
 :               `-.__             __.-'              :
 :                  ) ""---...---"" (                 :
  '._               `"--...___...--"`              _.'
    \""--..__                              __..--""/
     '._     """----.....______.....----"""     _.'
        `""--..,,_____            _____,,..--""`
                      `"""----"""`
                        CZ923JE
                       02/02/2023
*/

const AccountsProvider = require('../Providers/AccountsProvider');

class AnswerCollector {

    constructor(channel, storage, guild, DAL) {
        this.channel = channel;
        this.storage = storage;
        this.guild = guild;
        this.DAL = DAL;
    }

    init() {
        this.AccountsProvider = new AccountsProvider(this.guild, this.DAL);
    }

    onMessageCreate(msg) {
        if (msg.reference) {
            this.channel.messages.fetch(msg.reference.messageId).then(repliedTo => {
                const isReplyingToQOTD = msg.reference.messageId === this.storage.questions.QOTDMessageId;

                if (isReplyingToQOTD) {
                    msg.react('🍪');
                    this.AccountsProvider.incrementCookies(this.guild.id, msg.author.id, 1);
                }
            });
        }
    }

}

module.exports = AnswerCollector;