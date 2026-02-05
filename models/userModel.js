import  {Schema,model}  from 'mongoose'


const userSchema=Schema({

    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    travelPoints:{
        type:Number,
        default:0
    },
    trips:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:"trips"
        }],
        default:[]

    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    paymentCode:{
        length:16,
        type:String,
        required:true

    },
    balance:{
        type:Number,
        default:0,
        required:true
    },
    notifications:{
        type:[{date:{type:Date,required:true},message:{type:String,required:true}}],
        default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})


const userModel=model("users",userSchema)
export default userModel