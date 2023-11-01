const mongoose =require("mongoose");

const pollSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"title is required"],
    },
    description:{
        type:String,
        required:true,
    },
    options:[
        {
            subject:{
                type:String,
                required:true
            },
            votes:{
                type:Number,
                default:0
            },
            progress:{
                type:Number,
            }
        }
    ],
    allowMultipleVotes: {
        type: Boolean,
        default: false, 
      },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    startDate:{
        type:Date,
        default:Date.now
    },
    endDate:{
        type:Date,
        default:()=>Date.now()+24*60*60*1000  // 1 day
    },
    tags:[String],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    comments:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"User"
            },
            comment:String,
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Poll=mongoose.model("Poll",pollSchema);
module.exports=Poll;