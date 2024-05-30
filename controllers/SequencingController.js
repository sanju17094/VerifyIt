const Squence = require('../models/SquencingModel')
const User = require('../models/UserModel')
exports.updateSquence = async (req,res)=>{
try{
if(!req.body){
    return res.status(400).json({
        success:false,
        message:"Please provide all the required fields"
    })
    
}
// console.log("above sequence");
const {sequence}=req.body;
// console.log("above sequence",sequence);
if(!sequence){
       return res.status(400).json({
         success: false,
         message: "Sequence is empty",
       });
}
const data = await Squence.find();
// console.log("data of data",data)
if(!data){
    const newEntry = await Squence.create();
    return res.status(200).json({
        success:true,
        sequence:newEntry
    })
}else{
const id = data[0]._id;
console.log("id",id)
const sequenceData = await Squence.findOneAndUpdate({ _id: id }, {sequence:sequence}, {
  new: true,
});
return res.status(200).json({
    success:true,
    sequence:sequenceData
}) 
}
}catch(err){
    return res.status(200).json({
        success:false,
        message:err.message
    })
}
}
exports.fetchSequence = async(req,res)=>{
    try{
const data = await Squence.find();
if(data.length==0){
    const newEntry = await Squence.create({});
    return res.status(200).json({
        success:true,
        sequence:newEntry
    })
}

return res.status(200).json({
    success:true,
    sequence:data[0]
})
    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message
        })
    }
}

exports.UserSquence = async(req,res)=>{
    try{
        const {id} = req.params;
        if(!id){
             return res.status(400).json({
               success: false,
               message:"The id is not found"
             });
        }
    const data = await User.findById(id).select("sequence");
    console.log("sequence", data);
    if(!data){
        return res.status(400).json({
            success:false,
            message:"The user is not found"
            })
        }
            
    return res.status(200).json({
      success: true,
      data: data.sequence.length == 0 ? null : data.sequence,
    });

    }catch(err){
 return res.status(500).json({
   success: false,
   message:err.message
 });
    }
}

exports.setSequenceUser = async(req,res)=>{
    try{
        const {sequence} = req.body;
        const {id} = req.params;
        if(!id){
            return res.status(400).json({
                success:false,
                message:"The id is not found"
            })
        }
        if(!sequence){
            return res.status(400).json({
                success:false,
                message:"The sequence is not found"
                })
        }
        const setSequence = await User.findByIdAndUpdate(id, {
          sequence: sequence,
        },{new:true});
        return res.status(200).json({
            success: true,
            data: setSequence
        })
    }catch(err){
return res.status(500).json({
    success:false,
    message:err.message
})
    }
}