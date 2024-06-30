const mongoose=require("mongoose");
const initData=require("./data");
const Listing=require("../model/listing");

main().then(()=>{
    console.log("connection successfully");
}).catch((err)=>{
  console.log(err);
});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDb= async ()=>{
   await Listing.deleteMany({});
   console.log("data deleted");
   initData.data=initData.data.map((obj)=>({
    ...obj,owner:"6676d1b6fb6c7639a7673e44",
   }));
   await Listing.insertMany(initData.data);
   console.log("data saved");
}

initDb();