import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        minlength:6,
        required:true,
    },
});

adminSchema.pre('save', async function(next) {
    if (this.isModified('passkey')) {
        this.passkey = await bcrypt.hash(this.passkey, 10);
    }
    next();
});

const Admin = mongoose.model("Admin",adminSchema);

export default Admin;