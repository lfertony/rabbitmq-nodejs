//import amqlib library
const amqp = require('amqplib');

//open a connection with rabbit mq server
connect();

// create a variable to store my message value by terminal argument
const msg = {number: process.argv[2]};

//define my connect function
async function connect(){

    try {
        //open amqp connection 
         const connection = await amqp.connect("amqp://localhost:5672");

         //create a channel to send my messages
         const channel = await connection.createChannel();

         //make sure the job queue exists on our server
         const result = await channel.assertQueue("jobs");

         //parse my message to string format and sent to my job queue
         channel.sendToQueue("jobs",Buffer.from(JSON.stringify(msg)));

         //loging my message success
         console.log(`Job sent successfully ${msg.number }`);
    }catch (ex) {
        console.error(ex);
    }
}