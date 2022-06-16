import mongoose from "mongoose"


const UserSchema = new mongoose.Schema(
    {
        
        username:{type: String, required: true, unique: true},
        password: {type:String, rquired: true},
        name:{type:String, rquired: true},
        college: {type: String, required: true },
        major: {type:String, required: true},
        achievement:{type:[String], required: true},
        bio: {type:String},
    },
    {collection: 'user'}
)

const User = mongoose.model('UserSchema',UserSchema)

export default User;



