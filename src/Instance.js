const CronJob = require('cron').CronJob;
const GoodnightEmbed = require('./Embeds/GoodnightEmbed');

class Instance {

    constructor(guild) {
        this.guild = guild;
        this.config = {
            channels: [
                "chat",
                "nose-boop"
            ]
        }
    }

    init() {
        this._setup();
        this._setEvents();
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

        GoodnightEmbed.send(model);
    }

    _isAllowedChannel(channelname) {
        const isAllowedChannel = this.config.channels.find(
            channel => channel.includes(channelname)
        ) != undefined;

        return isAllowedChannel;
    }

    _setup() {
        this.channel = this.guild.channels.cache.find(
            channel => {
                const isAllowedChannel = this._isAllowedChannel(channel.name);
                const isCorrectChannel = isAllowedChannel && channel.type === "GUILD_TEXT"

                return isCorrectChannel;
            }
        );
    }

    _setEvents() {
        this._setGoodnightMessage();
    }

    onMessageCreate(msg) {
        ///
    }
}

module.exports = Instance;