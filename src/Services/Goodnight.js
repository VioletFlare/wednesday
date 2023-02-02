const CronJob = require('cron').CronJob;
const GoodnightEmbed = require('../Embeds/GoodnightEmbed');
const ServiceUtility = require('../Modules/ServiceUtility');

class Goodnight {

    constructor(config, channel) {
        this.config = config;
        this.channel = channel;
    }

    _setGoodnightMessage() {
        new CronJob(
            '0 0 23 * * *',
            () => this._sendGoodnightEmbed(),
            null,
            true,
            'Europe/Rome'
        );
    }

    _sendGoodnightEmbed() {
        const model = {
            channel: this.channel
        }

        const hasService = ServiceUtility.hasService(this.config, this.channel, 'goodnight');

        if (hasService) {
            GoodnightEmbed.send(model);
        }
    }

    init() {
        this._setGoodnightMessage();
    }

}

module.exports = Goodnight;