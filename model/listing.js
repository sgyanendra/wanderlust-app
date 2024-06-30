const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./Review.js");
let newlisting=Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:String,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review"
    },],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User", 
    }
});

newlisting.post("findOneAndDelete",async (listing)=>{
 if(listing){
   await Review.deleteMany({_id: {$in: listing.reviews}});
   console.log("findOneAndDelete is working");
 }
});
const Listing=mongoose.model("Listing",newlisting);
module.exports=Listing;

