

const mongoose=require("mongoose")

const showSchema=mongoose.Schema({
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true }, // Reference to the Movie entity
    showTime: { type: Date, required: true },
    category: { type: String, enum: ['matinee', 'evening'], required: true },
})

const showModel=mongoose.model("show",showSchema)

module.exports={
    showModel
}