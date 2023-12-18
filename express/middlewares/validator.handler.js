const Boom = require('@hapi/boom'); 

/**
 * Middleware: validatorHandler
 *
 * @description
 * This middleware performs validation on the data present in the specified property of the request object
 * using the provided Joi schema. If validation fails, it generates a Boom badRequest error with the validation
 * error details. If validation succeeds, it passes the control to the next middleware in the chain.
 */
function validatorHandler(schema, property) {
  return (req, res, next) => {
    // Extracts the data to be validated from the specified property of the request object.
    const data = req[property];

    // Validates the data using the provided Joi schema with abortEarly set to false.
    const { error } = schema.validate(data, { abortEarly: false });

    // If validation fails, generates a Boom badRequest error with the validation error details.
    if (error) {
      next(Boom.badRequest(error));
    }

    // If validation succeeds, passes the control to the next middleware in the chain.
    next();
  };
}

module.exports = { validatorHandler };
