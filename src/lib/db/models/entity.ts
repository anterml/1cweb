import mongoose from 'mongoose'
const { Schema } = mongoose

const Entity = new Schema({
  name: String,
  type: String,
  requisites: [],
  forms: [],
  tableParts: [],
})

export default mongoose.model('Entity', Entity)