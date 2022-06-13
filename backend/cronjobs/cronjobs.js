const cron = require("node-cron");
const Hashtags = require("../models/hashtags");

const {processHashtags} = require ("../utils/reusable");
/**
 * Search by query all the data of the last week
 * @param {*} req
 * @param {*} res
 */
 
//every day cronjobs
async function createCronJobs() {
  
  await cron.schedule("0 0 0 * * *", () => {
    
     
    Hashtags.find({}).then((hashtags) => { 
      
        hashtags.forEach(async (hashtag) => {
            console.log(hashtag);
            await processHashtags(hashtag.name);
        });
     });
  
  });

}
module.exports = {
  createCronJobs,
};
