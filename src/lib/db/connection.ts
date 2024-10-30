/* import mongoose from 'mongoose'

mongoose
  .connect('mongodb://127.0.0.1:27017/parse')
  .catch(err => console.log('Не получилось подключиться к БД', err));

 */

console.log("hello")
import mongoose from 'mongoose'

main().catch(err => console.log(err))

async function main() {
  try {
    console.log('trying to connect to DB')
    await mongoose.connect('mongodb://127.0.0.1:27017/saturn')
    console.log("connection ok")
  } catch(e) {
    console.log('Cannot connection to mongodb')
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

export default null