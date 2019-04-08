import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcryptjs";

const UserProfileSchema = new Schema({
    addedAt: {
        type: Date,
        default: Date.now
    },
    firstName: {
        type: String,
        minlength: 1
    },
    lastName: {
        type: String,
        minlength: 1
    },
    userEmail: {
        type: String,
    },
    password: {
        type: String,
        required: true
    }
}, {
        versionKey: false,
        collection: 'UsersCollection'
    });


UserProfileSchema.pre('save', function (next) {
    if (this.isModified('password') || this.isNew()) {
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
});

export default mongoose.model("UsersModel", UserProfileSchema);