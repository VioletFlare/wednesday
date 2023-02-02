const IntegrityCheck = require('./Services/IntegrityCheck.js');
const Goodnight = require('./Services/Goodnight.js');
const Questions = require('./Services/Questions.js');

class Instance {

    constructor(guild) {
        this.guild = guild;
        this.config = {
            channels: [
                {
                    name: "┋💬・chat",
                    services: ['goodnight', 'questions']
                },
                {
                    name: "nose-boop",
                    services: ['questions']
                }
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
            if (channelname.includes(channel.name)) {
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
        new IntegrityCheck().init();
        new Goodnight(this.config, this.channel).init();
        new Questions(this.config, this.channel).init();
    }

    onMessageCreate(msg) {
        ///
    }
}

module.exports = Instance;