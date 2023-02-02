class ServiceUtility {

    hasService(config, channel, service) {
        let hasService = false;

        if (channel) {
            config.channels.forEach((configChannel) => {
                if (channel.name.includes(configChannel.name)) {
                    hasService = configChannel.services.includes(service)
                }
            })
        }

        return hasService;
    }

}

module.exports = new ServiceUtility();