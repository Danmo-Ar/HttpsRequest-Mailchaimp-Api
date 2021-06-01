const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const client = require('@mailchimp/mailchimp_marketing');




const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/' , (req , res) => {
    res.sendFile(`${__dirname}/index.html`);
})

app.post('/' , (req , res) => {
    
    const username = req.body.username;
    const email = req.body.email;
    const address = req.body.address;

    const data = {
        members : [
            {
                email_address: email , 
                status : 'subscribed' , 
                merge_fields : {
                    FNAME : username,
                    LNAME : username,
                }
            }
        ]
    }

    const dataToSend = JSON.stringify(data);

    // res.setHeader('Content-Type' , 'text/html; charset=utf-8');
    // res.write(`<h1>Username : ${username}</h1>`);
    // res.write(`<h1>Email : ${email}</h1>`);
    // res.write(`<h1>Address : ${address}</h1>`);
   



    //https request
    const dc = 'us6';
    const apiKey = '1b9a724047da691357e58bc310fe38f6-us6';
    const url  = `https://${dc}.api.mailchimp.com/3.0/lists/49be6e5349`;
    const option = {
        method : 'POST',
        auth : `auth:${apiKey}`
    }

   const request =  https.request(url , option , (response)=> {
          
          res.statusCode === 200 ? res.send('<h1>Super</h1>') : res.send('<h1>Fail</h1>');
          response.on('data' , (data) => console.log(JSON.parse(data)));

    }).on('error' , (e) => console.log(e.message));

    request.write(dataToSend);
    request.end();

    // Autre Methode 
    
    // client.setConfig({
    //     apiKey : "1b9a724047da691357e58bc310fe38f6-us6",
    //     server : "us6"
    // })
   
    // async function run() {
    //     const response = await client.lists.getList("49be6e5349");
    //     console.log(response);
    // }
    
    //     run();

})


app.listen(3000 , ()=> console.log('Serveur demarré sur le port 3000'));
