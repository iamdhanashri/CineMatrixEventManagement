

const mongoose=require("mongoose")

const movieSchema=mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  img: { type: String, required: true },

  // Add other movie-related fields as needed
  shows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }],
})

const movieModel=mongoose.model("movie",movieSchema)

module.exports={
    movieModel
}