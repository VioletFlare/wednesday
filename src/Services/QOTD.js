const Questions = require('./Questions.js');
const AnswerCollector = require('./AnswerCollector.js');
const QuestionsProvider = require('../Providers/QuestionsProvider');

class QOTD {

    constructor(config, channel, guild, DAL) {
        this.config = config;
        this.channel = channel;
        this.guild = guild;
        this.DAL = DAL;
        this.storage = {
            questions: {
                QOTDMessageId: ""
            }
        };
    }

    _initStorage() {
        return this.QuestionsProvider.getQuestion(this.guild.id).then(question => {
            this.storage.questions.QOTDMessageId = question.message_id;
        });
    }

    _startQOTDServices() {
        new Questions(this.config, this.channel, this.storage, this.guild, this.DAL).init();

        this.answerCollector = new AnswerCollector(this.channel, this.storage);
        this.answerCollector.init();
    }

    init() {
        this.QuestionsProvider = new QuestionsProvider(this.DAL);

        this._initStorage().then(
            () => this._startQOTDServices()
        );
    }

    onMessageCreate(msg) {
        if (this.answerCollector) {
            this.answerCollector.onMessageCreate(msg);
        }
    }

}

module.exports = QOTD;