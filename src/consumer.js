var amqp = require("amqplib/callback_api");

amqp.connect(`amqp://localhost`, function (err, connection) {
  if (err) {
    throw err;
  }
  connection.createChannel(function (error, channel) {
    if (error) {
      throw error;
    }
    var queue = "FunDoo_Notes";
    channel.assertQueue(queue, {
      durable: false,
    });

    console.log(queue);
    console.log(`sent email to user after completion of ${queue} registration`);

    channel.consume(
      queue,
      function (msg) {
        console.log(`Email`, msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  });
});
