//import amqlib library
const amqp = require('amqplib');

//open a connection with rabbit mq server
connect();

//define connect function
async function connect() {

    try {
        //open amqp connection 
        const connection = await amqp.connect("amqp://localhost:5672");

        //create a channel to send my messages
        const channel = await connection.createChannel();

        //make sure the job queue exists on our server
        const result =  await channel.assertQueue("jobs");

        //throw a consume envent from job queue
        channel.consume("jobs", message => {
            //getting message and parsing to json format
            const input = JSON.parse(message.content.toString());

            //loggin my message
            console.log(`Recievid job with input ${input.number}`);

            //create a ack condition with my number message its = 7 this message will 'got'from this queue
            if(input.number == 7){
                channel.ack(message);
                console.log(`the message ${input.number} has neen acknowledged by consumer`);
            }                
        })

        console.log("Waiting for messages ...");
    }catch (ex) {
        console.error(ex);
    }
}