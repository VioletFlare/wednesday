const CronJob = require('cron').CronJob;
const QOTDMessage = require('../Messages/QOTDMessage');
const ServiceUtility = require('../Modules/ServiceUtility');
const CookiesProvider = require('../Providers/CookiesProvider');

class Questions {

    constructor(config, channel) {
        this.config = config;
        this.channel = channel;
    }

    _sendQOTDMessage() {
        const model = {
            channel: this.channel,
            day: this._getDayOfYear()
        }

        const hasService = ServiceUtility.hasService(this.config, this.channel, 'questions');

        if (hasService) {
            QOTDMessage.send(model);
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
    }
}

module.exports = Questions;