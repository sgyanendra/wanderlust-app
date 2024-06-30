const List=require("../model/listing");
const mongoose=require("mongoose");



module.exports.index=async (req,res,next)=>{
    const alllisting=await List.find({});
    res.render("listing/listings.ejs",{ alllisting }); 
}
module.exports.showIndex=async (req,res,next)=>{
    const {id}=req.params;
    const data= await List.findById(id)
    .populate({path:"reviews",populate:{path:"author"}})
    .populate("owner");
    if(!data){
     req.flash("error","Listing you does not existing");
     return res.redirect("/listing");
    }
    // console.log(data);
    res.render("listing/show.ejs",{ data });
  }
module.exports.createList=(req,res)=>{
    res.render("listing/add.ejs");
}
module.exports.createnewList=async (req,res,next)=>{
    let url=req.file.path;
    let filename=req.file.filename;
    req.flash("success","listing added successfully");
    let list=req.body.list; 
    const newlist=new List(list);
    newlist.image={url,filename};
    newlist.owner=req.user._id; 
    await newlist.save();
    res.redirect("/listing");
}
module.exports.edit=async (req,res,next)=>{
    console.log("edit working");
    let {id}=req.params;
   const data=await List.findById(id);
   if(!data){
    req.flash("error","Listing you does not existing");
    return res.redirect("/listing");
   }
   let originalUrl=data.image.url;
   originalUrl=originalUrl.replace("/upload","/upload/w_300");
   res.render("listing/update.ejs",{data,originalUrl});    
  }
module.exports.update=async (req,res,next)=>{
    let {id}=req.params;
    let l=await List.findByIdAndUpdate(id,{...req.body.list});
     if(typeof req.file!="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        l.image={url,filename};
        await l.save();
     }
    req.flash("success","listing Update successfully");
    res.redirect("/listing");
}
module.exports.deleteList=async (req,res)=>{
    let {id} = req.params;
    await List.findByIdAndDelete(id);
    req.flash("success","listing Deleted");
    res.redirect("/listing");
 }