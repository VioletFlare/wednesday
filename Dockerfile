FROM node:18.19.1

ENV ENV_FLAG=--prod
ENV TZ=Europe/Rome

WORKDIR /wednesday

COPY . .

RUN npm i

RUN groupadd -r wednesday && useradd -rm -g wednesday wednesday

RUN echo "node wednesday.js \${ENV_FLAG}" > start.sh \ 
    && chown wednesday start.sh \
    && chmod u+x start.sh 

RUN apt-get update && apt-get install -y tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

USER wednesday

CMD ["sh", "-c", "./start.sh" ]