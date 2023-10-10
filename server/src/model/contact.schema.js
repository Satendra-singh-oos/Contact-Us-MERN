import mongoose from "mongoose";


const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: ["true", "Please Provide a Last name"]
    },
    lastname: {
        type: String,
        require: ["true", "Please Provide a Last name"]
    },
    email: {
        type: String,
        required: ["true", "Emaile is Required"],
    },
    telephone: {
        type: Number,
        required: ["true", "Phone Number is Required"],
    },
    message: {
        type: String,
        required: ["true", "message is Required"],
    }

})

export default mongoose.model("Contact", contactSchema)