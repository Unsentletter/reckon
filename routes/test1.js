const request = require('request');

module.exports = app => {
  app.get('/test1', (req, res) => {

    const url1 = 'https://join.reckon.com/test1/rangeInfo';
    const url2 = 'https://join.reckon.com/test1/divisorInfo';

    calculateAnswer = () => {
      request({
        url: url1,
        json: true
      }, (error, response, body) => {
        if(error) {
          console.log('Error with API 1');
        }

        const endpoint1 = body;

        request({
          url: url2,
          json: true
        }, (error, response, body) => {
          if(error) {
            console.log('Error with API 2')
          }
          const endpoint2 = body;
          const upper = endpoint1.upper;
          const lower = endpoint1.lower;
          const divisor1 = endpoint2.outputDetails[0].divisor;
          const divisor2 = endpoint2.outputDetails[1].divisor;
          const output1 = endpoint2.outputDetails[0].output;
          const output2 = endpoint2.outputDetails[1].output;
          let answer = [];

          for (let i=lower; i < upper + 1; i++) {
            if((i % divisor1 === 0) && (i % divisor2 === 0)) {
              answer.push("\n" + i + ": " + output1 + " " + output2);
            } else if(i % divisor1 === 0) {
              answer.push("\n" + i + ": " + output1)
            } else if(i % divisor2 === 0) {
              answer.push("\n" + i + ": " + output2)
            } else {
              answer.push("\n" + i + ": ");
            }
          }

          const ansString = answer.toString();

          res.render('test1.hbs', {
                answer: ansString
              });
        });
      });
    };

    calculateAnswer();

  })
};