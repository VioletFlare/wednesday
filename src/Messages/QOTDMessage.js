// Question Of The Day

class QOTDMessage {
    
    send(model) {
        const question = model.questionOfTheDay;

        const message = `
(๑ > ᴗ < ๑) ♡〜٩( ˃▿˂ )۶〜♡ (^ .‿. ^)
**---[ Domanda Del Giorno ]---**

${question}
        `;

        const sentMessage = model.channel.send(message).catch(
            error => console.error(error)
        );

        return sentMessage;
    }

}

module.exports = new QOTDMessage();