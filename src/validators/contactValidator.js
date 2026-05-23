const {

body

} =

require(
"express-validator"
);


exports.validateContact = [

body(
"first_name"
)

.notEmpty()

.withMessage(

"first_name required"

)

.isLength({

min:2

})

.withMessage(

"first_name minimum 2 characters"

),

body(
"last_name"
).optional(),



body(
"email")

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