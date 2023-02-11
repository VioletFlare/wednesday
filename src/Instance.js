const IntegrityCheck = require('./Services/IntegrityCheck.js');
const Goodnight = require('./Services/Goodnight.js');
const Questions = require('./Services/Questions.js');
const AnswerCollector = require('./Services/AnswerCollector.js');

class Instance {

    constructor(guild, DAL) {
        this.guild = guild;
        this.DAL = DAL;
        this.config = {
            channels: [
                {
                    name: "┋💬・chat",
                    services: ['goodnight', 'questions']
                },
                {
                    name: "❤-nose-boop",
                    services: ['questions']
                }
            ]
        }
    }

    init() {
        this.DAL.insertGuild(this.guild.id, this.guild.name);
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

        this.answerCollector = new AnswerCollector(this.channel);
        this.answerCollector.init()
    }

    onMessageCreate(msg) {
        this.answerCollector.onMessageCreate(msg);
    }
}

module.exports = Instance;