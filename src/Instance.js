const Goodnight = require('./Services/Goodnight.js');
const Questions = require('./Services/Questions.js');

class Instance {

    constructor(guild) {
        this.guild = guild;
        this.config = {
            channels: [
                "┋💬・chat",
                //"nose-boop"
            ]
        }
    }

    init() {
        this._setup();
        this._startServices();
    }



    _isAllowedChannel(channelname) {
        let isAllowedChannel = false;

        this.config.channels.forEach((channel) => {
            if (channelname.includes(channel)) {
                isAllowedChannel = true;
            }
        })

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

    _startServices() {
        new Goodnight(this.channel).init();
        new Questions(this.channel).init();
    }

    onMessageCreate(msg) {
        ///
    }
}

module.exports = Instance;