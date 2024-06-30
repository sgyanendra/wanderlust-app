const express=require("express");
const route=express.Router();
const User=require("../model/user.js");
const wrapAsync = require("../utils/wrapAsync");
const Passport = require("passport");
const { saveRedirectUrl } = require("../middileware.js");

route.get("/signup",(req,res)=>{
        res.render("users/signup.ejs");
});

route.post("/signup", wrapAsync(async(req,res)=>{
    try{
        const {username,email,password}=req.body;
        const newUser=new User({email,username});
        const registeruser=await User.register(newUser,password);
        console.log(registeruser);
        req.login(registeruser,(err)=>{
            if(err){
              return next(err);
            }
            req.flash("success","Welcome to Wanderlust!");
            res.redirect("/listing");
        });
    }catch(err){
        req.flash("error","This UserName is already registers");
        res.redirect("/signup");
    }
}));

route.get("/login",(req,res)=>{
  res.render("users/login.ejs");
})
route.post("/login",saveRedirectUrl,Passport.authenticate("local",{failureRedirect:"/login",failureFlash:true,}),async (req,res)=>{
 req.flash("success","welcome back to wanderlust!");
 let redirectUrl=res.locals.redirectUrl|| "/listing";
 res.redirect(redirectUrl);
})

route.get("/logout",(req,res,next)=>{
     req.logout((err)=>{
        if(err){
           return next(err);
        }
        req.flash("success","You have logged out this page");
        res.redirect("/listing");
     });
});
module.exports=route;