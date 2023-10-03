const  UserSchema  = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const register = async (data, res) => {
    try {
        let { email, password } = data;
        // first to check the email in database
        let user = await UserSchema.findOne({ email: email });
        if (!user) {
            // salt generation
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(password, salt);
            data.password = hash;
            await UserSchema.create(data);
            res.status(201).json({
                message: " user Register Successful",
            });
        } else {
            res.status(401).json({
                message: "Email address is already exists",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
        })
    }
};

 module.exports = register;





