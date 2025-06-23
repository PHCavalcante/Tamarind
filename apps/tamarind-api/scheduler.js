import cron from "node-cron";
import connectToDb from "./src/config/dbconfig.js";

cron.schedule("0 0 * * *", async () => {
  try {
    const connection = await connectToDb(process.env.STRING_CONNECTION);
    const db = connection.db("todoDB");
    const routines = db.collection("routines");
    await routines.updateMany({}, { $set: { isCompletedToday: false } });
    console.log("Routines were reset successfully at midnight.");
  } catch (err) {
    console.error("Error resetting routines:", err);
  }
});
