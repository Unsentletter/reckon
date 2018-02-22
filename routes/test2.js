const request = require('request');

module.exports = app => {
  app.get('/test2', (req, res) => {

    const url1 = 'https://join.reckon.com/test2/textToSearch';
    const url2 = 'https://join.reckon.com/test2/subTexts';

    calculateAnswer = () => {
      request({
        url: url1,
        json: true
      }, (error, response, body) => {
        if(error) {
          console.log('Error with API1')
        }
        const endpoint1 = body;

        request({
          url: url2,
          json: true
        }, (error, response, body) => {
          if(error) {
            console.log('Error with API2')
          }
          const endpoint2 = body;
          const sentence = endpoint1.text.toLowerCase();
          const words = endpoint2.subTexts;
          let subTextResults = [];

          words.map(function(item) {
            const lowercaseWord = item.toLowerCase();
            const findPosition = sentence.split(lowercaseWord).map(function (splitSentence) {
              return this.pos += splitSentence.length + lowercaseWord.length
            }, {pos: -lowercaseWord.length+1}).slice(0, -1);

            if(findPosition.length === 0 ) {
              subTextResults.push({
                "subtext": item,
                "result": "<No Output>"
              })
            } else {
              subTextResults.push({
                "subtext": item,
                "result": findPosition
              });
            }
          });

          let answer = {
            "candidate" : "Tristan Southwell",
            "text": sentence,
            "results": subTextResults
          };

          request.post({
            url: 'https://join.reckon.com/test2/submitResults',
            answer: answer
          }, (error, response, body) => {
            if(error) {
              console.log("Error on test2 post" + error)
            }
            console.log(body);
          })
        })
      })
    };

    calculateAnswer();

  })
};