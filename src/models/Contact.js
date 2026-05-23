const mongoose =
require("mongoose");

const contactSchema =
new mongoose.Schema({

contactId:{
type:Number,
unique:true
},

first_name:{
type:String,
required:true
},

last_name:{
type:String,
default:"",
required:true
},

email:{
type:String,
required:true,
unique:true
},

phone:{
type:String,
required:true
},

company:{

type:String,

required:true,

trim:true

},

deleted:{
type:Boolean,
default:false
},

status:{
type:String,
enum:[
"active",
"inactive"
],

default:
"active"
}

},

{
timestamps:true
}

);

module.exports =
mongoose.model(
"Contact",
contactSchema
);