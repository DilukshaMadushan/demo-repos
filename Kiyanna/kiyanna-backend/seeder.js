const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

//Load Models
// const User = require('./models/User');
// const Profile = require('./models/MP_Profile');
// const Idea = require('./models/Idea');
const Idea = require('./models/User_Profile');
const profile = require('./models/User');
// const Comment = require('./models/Comment');

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Read the JSON files

// const profiles = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/profiles.json`, 'utf-8')
// );

// const images = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/images.json`, 'utf-8')
// );
// const resources = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/resources.json`, 'utf-8')
// );
// const votes = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/votes.json`, 'utf-8')
// );

const comments = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/comments.json`, 'utf-8')
);

//Impoort into DB
const importData = async () => {
  try {
    // await Image.create(images);
    // await Resource.create(resources);
    // await Vote.create(votes);
    // await Comment.create(comments);

    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

//Delete data
const deleteData = async () => {
  try {
    // await Profile.deleteMany();
    // await Resource.deleteMany();
    await Idea.deleteMany();
    await profile.deleteMany();
    // await Pet.deleteMany();
    // await User.deleteMany();
    // await Comment.deleteMany();

    console.log('Data Destroyed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
