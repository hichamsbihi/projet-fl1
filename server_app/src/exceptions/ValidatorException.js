/***
 * All Exception classes declared in the exceptions folder for all the project, it must be used in all in/out modules
 * Exception  types {
 *   _LOGIC_ERROR => class (LogicalException) thrown case : the engine trace all the exception path. To be managed by the dev team.
 *   _TRIGGERED_BY_USER => class (UserException)  return a help message to the UI to signal the error
 *   _VALIDATION_EXCEPTION => *  class ValidatorException : validate schemas && data fetched or passed to the api
 * }
 */

 export class ValidatorException extends Error {
    constructor(message = "Error while validating some data",validationError= "Describe the wrong data type" ,apiName="", ...params) {
      // Pass remaining arguments (including vendor specific ones) to parent constructor
      super(message,...params);
  
      // Maintains proper stack trace for where our error was thrown (only available on V8)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ValidatorException);
      }
      
      // Custom debugging information
      this.date = Date.now();
      this.apiName=apiName;
      this.validationError = validationError;

    }
  }
  