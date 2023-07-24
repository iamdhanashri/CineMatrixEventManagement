

const mongoose=require("mongoose")

const participantSchema=mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
})

const ParticipantModel=mongoose.model("participant",participantSchema)

module.exports={
  ParticipantModel
}