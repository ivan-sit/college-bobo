import express from "express"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

import UserSchema from "../models/user.js"

const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'

export const login = async (req,res)=>{

    const {username, password} = req.body //required input

    const user = await UserSchema.findOne({username}) //to see if the username match with any username in the database

    if(!user){
        return res.json({status: 'error', error: 'Invalid username/password'})
    }

    if (await bcrypt.compare(password, user.password)){ //to see if the hash pw match with the one in vthe database
       
        const token = jwt.sign( //return the ytyken as the response to the front end
            {
                id: user._id,
                username: user.username
            },
            JWT_SECRET 
        )
        return res.json({status: 'ok', data: token})// the token generated is justr a random ass string generated from the server
    }
    res.json({status:'error', error: 'Invalid password'})

}

export const register = async (req,res) =>{

    console.log(req.body, "body")

    const{username, password, college, major,achievement1,achievement2,achievement3,achievement4} = req.body

    //console.log(password, "password");

    if (!username|| typeof username !='string')
    {
        return res.json({status: 'error', error:'Invalid username'})
    }

    if (!password|| typeof username !='string')
    {
        return res.json({status: 'error', error:'Invalid password'})
    }

    if (password.length < 4 && password.length < 16)
    {
        return res.json({status: 'error', error:'Damn see the requirement for length'})
    }

    const finalPassword = await bcrypt.hash(password, 10)
    
    try{
        const response = await UserSchema.create({
            username,
            password: finalPassword,
            college,
            major,
            achievement1,
            achievement2,
            achievement3,
            achievement4

        })
        console.log('User created successfully:', response)

        return res.json({status: "ok"})


    }catch(error)
    {
        if(error.code ===11000)
        {
            return res.json({status:'error',error: 'Username already in use'})
        }
    }
}