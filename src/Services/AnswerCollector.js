class AnswerCollector {

    constructor(channel) {
        this.channel = channel;
    }

    init() {

    }

    onMessageCreate(msg) {
        if (msg.reference) {
            this.channel.messages.fetch(msg.reference.messageId).then(repliedTo => {
                const isReplyingToQOTD = repliedTo.content.toLowerCase().includes("---[ domanda del giorno ]---");

                if (isReplyingToQOTD) {
                    msg.react('🍪');
                }
            });
        }
    }

}

module.exports = AnswerCollector;