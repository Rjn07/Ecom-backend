const mongoose=require("mongoose")



const catigeorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type : String,
        required:true
    }

})

module.exports=mongoose.model("Catigeory",catigeorySchema)