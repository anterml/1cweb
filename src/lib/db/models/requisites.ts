import mongoose from 'mongoose'
const { Schema } = mongoose

const Requisites = new Schema({
  entityId: mongoose.Types.ObjectId,
  name: String,
  title: String,
  settings: {},
})

export default mongoose.model('Requisites', Requisites)