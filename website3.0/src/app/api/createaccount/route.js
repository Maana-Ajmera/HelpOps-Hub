import user from "@utils/models/user"; // Importing Mongoose model for newsletter subscription
import mongoose from "mongoose"; // Importing Mongoose for MongoDB interactions
import nodemailer from "nodemailer"; // Importing nodemailer to send welcome email
import { NextResponse } from "next/server"; // Importing Next.js server response utility
const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function POST(req) {
        const { MONGO_URI } = process.env; 
        let {email,name,password}=await req.json()
        // Connect to MongoDB using Mongoose
        await mongoose.connect(MONGO_URI);

        let data=await user.find({email:email})
        // checking if user exist or not 
        if(data.length>0){
          return NextResponse.json({ success: false,msg:"User Doesn't Valid"},{status:"200"});
        }
        // generating the hash to store in mongo db 
        bcrypt.hash(password, saltRounds,async function(err, hash) {
               let data = await user.create({
                    email:email,name:name,password:hash
                });
            });
        //sending response user 
            return NextResponse.json({success:true})
}


