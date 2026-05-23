const {

body

} =

require(
"express-validator"
);


exports.validateContact = [

body(
"name"
)

.notEmpty()

.withMessage(
"name is required"
)

.isLength({

min:3

})

.withMessage(

"name must be at least 3 characters"

),



body(
"email"
)

.notEmpty()

.withMessage(
"email is required"
)

.isEmail()

.withMessage(
"invalid email format"
),



body(
"phone"
)

.notEmpty()

.withMessage(
"phone number required"
)

.isLength({

min:10,

max:10

})

.withMessage(

"phone must contain 10 digits"

),

body(
"company"
)

.notEmpty()

.withMessage(

"company name required"

),



body(
"status"
)

.optional()

.isIn([

"active",

"inactive"

])

.withMessage(

"status must be active or inactive"

)

];