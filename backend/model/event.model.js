

const mongoose=require("mongoose")

const eventSchema=mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
})

const eventModel=mongoose.model("event",eventSchema)

module.exports={
    eventModel
}