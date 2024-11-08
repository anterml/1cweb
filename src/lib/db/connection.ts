import mongoose from 'mongoose'

main().catch(err => console.log(err))

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/yourDBname')
  } catch(e) {
    console.log('Cannot connection to mongodb')
  }
}

export default null