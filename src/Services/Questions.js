const CronJob = require('cron').CronJob;
const QOTDMessage = require('../Messages/QOTDMessage');
const ServiceUtility = require('../Modules/ServiceUtility');
const QuestionsProvider = require('../Providers/QuestionsProvider');
const QUESTIONS_CHILL_IT_V1 = require("../../static/questions_chill_it_v1");

class Questions {

    constructor(config, channel, storage, guild, DAL) {
        this.config = config;
        this.channel = channel;
        this.storage = storage;
        this.guild = guild;
        this.DAL = DAL;
    }

    _getQuestionOfTheDay() {
        const dayOfYear = this._getDayOfYear();
        const question = QUESTIONS_CHILL_IT_V1[dayOfYear].question;

        return question;
    }

    _sendQOTDMessage() {
        const questionOfTheDay = this._getQuestionOfTheDay();

        const model = {
            channel: this.channel,
            questionOfTheDay: questionOfTheDay
        };

        const hasService = ServiceUtility.hasService(this.config, this.channel, 'questions');

        if (hasService) {
            QOTDMessage.send(model).then(sentMessage => {
                this.QuestionsProvider.insertQuestion(this.guild.id, sentMessage.id, questionOfTheDay);

                this.storage.questions.QOTDMessageId = sentMessage.id;
            });
        }
    }

    _getDayOfYear() {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 0);
        const diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
        const oneDay = 1000 * 60 * 60 * 24;
        const day = Math.floor(diff / oneDay);

        return day;
    }

    _setQOTDMessage() {
        new CronJob(
            '0 0 11 * * *',
            () => this._sendQOTDMessage(),
            null,
            true,
            'Europe/Rome'
        );
    }

    init() {
        this._setQOTDMessage();

        this.QuestionsProvider = new QuestionsProvider(this.guild, this.DAL);
    }
}

module.exports = Questions;