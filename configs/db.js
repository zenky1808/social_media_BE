const mongoose = require('mongoose');
const DB = `mongodb://localhost:27017/social_media`
async function connect(){
  try {
    await mongoose.connect(DB,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('****************************')
    console.log('*    Starting Server')
    console.log(`*    Port: ${DB}`)
    console.log(`*    Database: MongoDB`)
    console.log(`*    Connect successfully `)
    console.log('****************************')
  } catch (error) {
    console.log(`** Connect fail **`);
    console.log(error);
  }
}

module.exports = { connect };