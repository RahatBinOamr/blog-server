const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const colors = require('colors');
const blogRouter = require('./src/modules/blogs/blogRouter');
const userROuter = require('./src/modules/users/userRouter');
const port = process.env.PORT || 5000;

/* middleware */
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

async function main() {
  try {
    const url = process.env.DB_URL;
    console.log(url);
    await mongoose.connect(url);
    console.log('database connection successful on port'.cyan.bold, port);
  } catch (err) {
    console.log(err.message.underline.red);
  }
}
main();

/* router handler  */
app.use('/api/v1/blog', blogRouter);
app.use('/api/v1/user', userROuter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`.yellow);
});
module.exports = app;
