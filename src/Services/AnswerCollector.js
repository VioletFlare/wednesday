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

class AnswerCollector {

    constructor(channel, storage) {
        this.channel = channel;
        this.storage = storage;
    }

    init() {

    }

    onMessageCreate(msg) {
        if (msg.reference) {
            this.channel.messages.fetch(msg.reference.messageId).then(repliedTo => {
                const isReplyingToQOTD = msg.reference.messageId === this.storage.questions.QOTDMessageId;

                if (isReplyingToQOTD) {
                    msg.react('🍪');
                }
            });
        }
    }

}

module.exports = AnswerCollector;