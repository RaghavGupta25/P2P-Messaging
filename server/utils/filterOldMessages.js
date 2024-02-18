import Conversation from "../models/conversations.model.js";
import * as cron from "node-cron";

const messageAge = new Date();
messageAge.setDate(messageAge.getDate() - 1);

const removeExpiredMessages = async () => {
  try {
    const pipeline = [
      {
        $addFields: {
          messages: {
            $filter: {
              input: "$messages",
              as: "message",
              cond: { $gte: ["$$message.createdAt", messageAge] },
            },
          },
        },
      },
    ];

    const filteredMessages = await Conversation.aggregate(pipeline);
    for (const conversation of filteredMessages) {
      await Conversation.updateOne(
        { _id: conversation._id },
        { messages: conversation.messages }
      );
      console.log(`upadting ${conversation._id}`)
    }
  } catch (error) {
    console.log("error in removeExpiredMessages", error.message);
    resizeBy.status(500).json({ error: "Internal Server Error" });
  }
};


cron.schedule("* * * * *", () => {
  console.log("Running message cleanup...");
  removeExpiredMessages();
});
