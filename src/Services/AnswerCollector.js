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
const QuestionsProvider = require('../Providers/QuestionsProvider');

class AnswerCollector {

    constructor(channel, storage, guild, DAL) {
        this.channel = channel;
        this.storage = storage;
        this.guild = guild;
        this.DAL = DAL;
    }

    init() {
        this.AccountsProvider = new AccountsProvider(this.guild, this.DAL);
        this.QuestionsProvider = new QuestionsProvider(this.guild, this.DAL);
    }

    onMessageCreate(msg) {
        if (msg.reference) {
            this.channel.messages.fetch(msg.reference.messageId).then(repliedTo => {
                const isReplyingToQOTD = msg.reference.messageId === this.storage.questions.QOTDMessageId;

                if (isReplyingToQOTD) {
                    this.QuestionsProvider.collectAnswer(this.channel, this.storage.questions.QOTDMessageId, msg.author.id, msg.id).then(hasBeenCollected => {
                        if (hasBeenCollected) {
                            msg.react('🍪');
                            this.AccountsProvider.incrementCookies(this.guild.id, msg.author.id, 1);
                        }
                    });
                }
            });
        }
    }

}

module.exports = AnswerCollector;