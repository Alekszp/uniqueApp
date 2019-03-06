import mongoose from "mongoose";
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    date: {
        type: Date
    },
    content: {
        type: String,
        minlength: 5
    },
    age: {
        type: Number,
        min: 16,
        max: 100,
        default: 20
    }
}, {
    versionKey: false,
    collection: "MessageCollection"
});

export default mongoose.model("MessageSchema", MessageSchema);