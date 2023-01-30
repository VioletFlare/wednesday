const CronJob = require('cron').CronJob;
const GoodnightEmbed = require('../Embeds/GoodnightEmbed');

class Goodnight {

    constructor(channel) {
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

        if (this.channel) {
            GoodnightEmbed.send(model);
        }
    }

    init() {
        this._setGoodnightMessage();
    }

}

module.exports = Goodnight;