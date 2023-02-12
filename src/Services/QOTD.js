const Questions = require('./Questions.js');
const AnswerCollector = require('./AnswerCollector.js');

class QOTD {

    constructor(config, channel, guild, DAL) {
        this.config = config;
        this.channel = channel;
        this.guild = guild;
        this.DAL = DAL;
        this.storage = {
            questions: {
                QOTDMessageId: 0
            }
        };
    }

    init() {
        new Questions(this.config, this.channel, this.storage, this.guild, this.DAL).init();

        this.answerCollector = new AnswerCollector(this.channel);
        this.answerCollector.init();
    }

    onMessageCreate(msg) {
        this.answerCollector.onMessageCreate(msg);
    }

}

module.exports = QOTD;