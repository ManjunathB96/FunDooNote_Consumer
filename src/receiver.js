//import sendMailToUser from '../utils/sendEmail.js';

const sendMailToUser = require("./sendEmail");
var amqp = require("amqplib/callback_api");

const consumer = (queue) => {
  amqp.connect(`amqp://localhost`, function (err, connection) {
    if (err) {
      throw err;
    }
    connection.createChannel(function (error, channel) {
      if (error) {
        throw error;
      }

      channel.assertQueue(queue, {
        durable: false,
      });

      console.log(queue);

      channel.consume(
        queue,
        async function (msg) {
          const object = msg.content.toString();
          const data = JSON.parse(object);
          const Email = data.email;
          const Firstname = data.firstName;
          const Lastname = data.lastName;

          const result = await sendMailToUser(Email, Firstname, Lastname);

          console.log("result =====>  ", result);
        },
        {
          noAck: true, //noAck: true it  means  implicitly consume mtd will pass acknowledgement to every messages
        }
      );
    });
  });
};
consumer("RegistrationData");
