const Contact =
require("../models/Contact");

const {
validationResult
} =
require("express-validator");



exports.create =
async(req,res,next)=>{

try{

const errors =validationResult(req);

if(

!errors.isEmpty()

){

return res
.status(400)
.json({

success:false,

message:

"Invalid input data",

errors:

errors.array()

});

}

const lastContact =
await Contact
.findOne()
.sort(
{
contactId:-1
}
);

const nextId =
lastContact
&&
lastContact.contactId?lastContact.contactId + 1:1;

const duplicate =

await Contact.findOne({

$or:[

{
email:
req.body.email
},

{
phone:
req.body.phone
}

]

});


if(
duplicate
){

return res
.status(409)
.json({

success:false,

message:

"Email or phone already exists"

});

}

const contact =
await Contact.create({

contactId:
nextId,

...req.body

});


res
res
.status(201)

.json({

success:true,

message:
"Contact created successfully",

data:
contact

});

}catch(err){

next(err);

}

};



exports.getAll =
async(req,res,next)=>{

try{

const page =
parseInt(req.query.page) || 1;

const limit =
parseInt(req.query.limit) || 5;

const skip =
(page - 1) * limit;

const search =
req.query.search || "";

const status =
req.query.status;


let filter = {

$or:[

{
first_name:{
$regex:search,
$options:"i"
}
},

{
email:{
$regex:search,
$options:"i"
}
}

]

};


if(status){
filter.status = status;
}


const contacts =
await Contact.find(filter)

.select("-_id -__v")

.sort({ contactId:1 })

.skip(skip)

.limit(limit);


const total =
await Contact.countDocuments(filter);


res.status(200).json({

success:true,
message:"Contacts retrieved successfully",
total,
page,
data:contacts

});

}catch(err){

next(err);

}

};

exports.getById =
async(req,res,next)=>{

try{

const contact =

await Contact.findOne({

contactId:
req.params.contactId

})

.select(
"-_id -__v"
);


if(!contact){

return res
.status(404)
.json({

success:false,

message:
"Contact not found"

});

}


res
.status(200)

.json({

success:true,

message:
"Contact retrieved successfully",

data:
contact

});

}catch(err){

next(err);

}

};



exports.update =
async(req,res,next)=>{

try{

const updated =

await Contact.findOneAndUpdate(

{

contactId:
req.params.contactId

},

req.body,

{
new:true
}

)

.select(
"-_id -__v"
);


if(!updated){

return res
.status(404)
.json({

success:false,

message:
"Contact not found"

});

}


res
.status(200)
.json({

success:true,

message:
"Contact updated successfully",

data:
updated

});

}catch(err){

next(err);

}

};



exports.delete =
async(req,res,next)=>{

try{

const deleted =

await Contact.findOneAndDelete({

contactId:
req.params.contactId

});


if(!deleted){

return res
.status(404)
.json({

success:false,

message:
"Contact not found"

});

}


res
.status(200)
.json({

success:true,

message:
`Contact ${deleted.contactId} deleted successfully`

});

}catch(err){

next(err);

}

};