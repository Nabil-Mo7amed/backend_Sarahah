const Joi = require("joi");

let validArray = ["body", "params"];

const schema = {
  body: Joi.object({
    name: Joi.string().required().min(4).max(15),
    email: Joi.string()
      .required()
      .email({ maxDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string()
      .required()
      .pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/),
    repassword: Joi.ref("password"),
    age: Joi.number().required(),
  }),

  params: Joi.object({
    id: Joi.string().min(4).max(4).required(),
  }),
};

module.exports.userValidation = (req, res, next) => {
  let errArray = [];
  validArray.map((key) => {
    let { error } = schema[key].validate(req[key], { abortEarly: false });

    console.log(error);
    if (error) {
      error.details.map((msg) => {
        errArray.push(msg.message);
      });
    }
  });

  if (errArray.length > 0) {
    res.json(errArray);
  } else {
    next();
  }
};
