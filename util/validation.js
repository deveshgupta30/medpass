import joi from "joi";

const loginSchema = joi
  .object({
    email: joi
      .string()
      .email()
      .lowercase()
      .required()
      .label("Email")
      .trim()
      .messages({
        "string.base": `Email should be a type of text`,
        "string.empty": `Email cannot be an empty field`,
        "any.required": `Email  is a required field`,
        "string.email": `Email must be valid email address`,
      }),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        )
      )
      .required()
      .label("Password")
      .trim()
      .min(8)
      .messages({
        "string.base": `Password should be a type of text`,
        "string.empty": `Password cannot be an empty field`,
        "any.required": `Password  is a required field`,
        "string:min": "Password must have atleast 8 characters",
        "string.pattern.base":
          "Password must contain atleast one uppercase and lower alphabet and special character like [#?!@$%^&*-]",
      }),
  })
  .options({ abortEarly: false });

// const registerSchema = joi
//   .object({
//     name: joi.string().required().label("Name").trim().messages({
//       "string.base": `Name should be a type of text`,
//       "string.empty": `Name cannot be an empty field`,
//       "any.required": `Name  is a required field`,
//     }),
//     email: joi
//       .string()
//       .email()
//       .lowercase()
//       .required()
//       .label("Email")
//       .trim()
//       .messages({
//         "string.base": `Email should be a type of text`,
//         "string.empty": `Email cannot be an empty field`,
//         "any.required": `Email  is a required field`,
//         "string.email": `Email must be valid email address`,
//       }),
//     password: joi
//       .string()
//       .pattern(
//         new RegExp(
//           "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
//         )
//       )
//       .required()
//       .label("Password")
//       .trim()
//       .messages({
//         "string.base": `Password should be a type of text`,
//         "string.empty": `Password cannot be an empty field`,
//         "any.required": `Password  is a required field`,
//         "string:min": "Password must have atleast 8 characters",
//         "string.pattern.base":
//           "Password must contain atleast one uppercase and lower  alphabet and digit and special character like [#?!@$%^&*-]",
//       }),
//   })
//   .options({ abortEarly: false });

const registerSchema = joi
  .object({
    name: joi.string().required().label("Name").trim(),
    email: joi.string().email().lowercase().required().label("Email").trim(),
    password: joi
      .string()
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        )
      )
      .required()
      .label("Password")
      .trim(),
    role: joi.string().valid("User", "Admin").label("User Role"),
  })
  .options({ abortEarly: false });
export { loginSchema, registerSchema };
