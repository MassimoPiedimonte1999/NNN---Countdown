const { TwitterApi }    = require('twitter-api-v2');
const conf              = require('./const.js');

const client = new TwitterApi(conf.BEARER_TOKEN);
const tweets = [];

// Cerco tutti i tweet di _superserio_ (escluse risposte e RTs)
client.v2.userTimeline('1164562334351798272', { exclude: ['replies', 'retweets'] }).then((val) => {
    // Prendo il giorno corrente della settimana
    let dayOfMonth = new Date().getDate();
    
    // Prendo gli ultimi N tweet di _superserio_ (N = giorno della settimana) 
    for(let i = 0; i < dayOfMonth; i++) {
        tweets.push(val.data.data[i].text);
    }

    // Ordino l'array dal primo giorno in poi...
    tweets.reverse();

    // Stampo l'array
    console.log(tweets);
}).catch((err) => console.log(err));