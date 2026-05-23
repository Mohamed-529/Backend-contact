const Contact =
require("../models/Contact");

const {
validationResult
} =
require("express-validator");



exports.create =
async(req,res,next)=>{

try{

// 1. Validation errors check
const errors =
validationResult(req);

if(!errors.isEmpty()){
return res.status(400).json({
success:false,
message:"Validation failed",
errors:[]
});
}


// 2. Duplicate ACTIVE email check
const duplicate =
await Contact.findOne({
email:req.body.email,
status:"active"
});

if(duplicate){
return res.status(409).json({
success:false,
message:"Active email already exists",
errors:[]
});
}


// 3. Auto increment contactId
const lastContact =
await Contact.findOne()
.sort({ contactId:-1 });

const nextId =
lastContact && lastContact.contactId
? lastContact.contactId + 1
: 1;


// 4. Create contact
const contact =
await Contact.create({
contactId: nextId,
first_name: req.body.first_name,
last_name: req.body.last_name || "",
email: req.body.email,
phone: req.body.phone,
status: req.body.status || "active",
company: req.body.company
});


// 5. Clean response formatting
const responseData = {
contactId: contact.contactId,
first_name: contact.first_name,
last_name: contact.last_name,
email: contact.email,
phone: contact.phone,
status: contact.status,
company: contact.company,
createdAt: contact.createdAt,
updatedAt: contact.updatedAt
};


// 6. Success response
return res.status(201).json({
success:true,
message:"Contact created successfully",
data:responseData
});


}catch(err){
next(err);
}

};



exports.getAll =
async(req,res,next)=>{

try{

// pagination
const page =
parseInt(req.query.page) || 1;

const limit =
parseInt(req.query.limit) || 5;

const skip =
(page - 1) * limit;


// search
const search =
req.query.search || "";


// filter
const status =
req.query.status;


let filter = {
    deteled: false, 

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


// status filter
if(status){
filter.status = status;
}


// fetch raw data
const rawContacts =
await Contact.find(filter)

.select("-_id -__v -name")

.sort({ contactId:1 })

.skip(skip)

.limit(limit);


// transform response (IMPORTANT)
const contacts = rawContacts.map((c) => ({
contactId: c.contactId,
first_name: c.first_name,
last_name: c.last_name,
email: c.email,
phone: c.phone,
status: c.status,
company: c.company,
createdAt: c.createdAt,
updatedAt: c.updatedAt
}));


// total count
const total =
await Contact.countDocuments(filter);


// response
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

const contactId =
req.params.id;


// 1. find contact
const contact =
await Contact.findOne({
contactId: contactId
});


// 2. if not found
if(!contact){
return res.status(404).json({
success:false,
message:"Contact not found",
errors:[]
});
}


// 3. soft delete (NOT permanent delete)
contact.deleted = true;
contact.status = "inactive";

await contact.save();


// 4. response
return res.status(200).json({
success:true,
message:`Contact ${contactId} deleted successfully`,
data:null
});

}catch(err){
next(err);
}

};