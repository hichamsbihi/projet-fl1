/**
 * In this module we define a generic serializer with valdator process of api comming data.
 *
 */
import Validator from "./validator.js";
import { ValidatorException } from "../exceptions/ValidatorException.js";

const USER_API_SCHEMA = {
  id: "/user_apiSchema",
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    tele: { type: "string" },
  },
  required: ["email", "password", "tele", "name"],
};

export class UserSerializer extends Validator {
  constructor(request, apiName) {
    super();
    this.jsonSchema = USER_API_SCHEMA;
    this.dataToValidate = request.body;
    this.validated_data = {};
    this.apiName = apiName;
    this.details = {};
  }

  is_valide({ raise_exception = false }) {
    this.details = this.validate(this.dataToValidate, this.jsonSchema);
    if (this.details.valid) {
      this.validated_data.email = this.dataToValidate.email;
      this.validated_data.name = this.dataToValidate.name;
      this.validated_data.tele = this.dataToValidate.tele;
      this.validated_data.crypted_password = cryptPassword(
        this.dataToValidate.password
      );
      return true;
    }
    if (!this.details.valid && raise_exception) {
      throw new ValidatorException(
        JSON.stringify(
          this.details.errors.map((e) => {
            return e.stack;
          })
        ),
        this.apiName
      );
    } else return false;
  }
  validatePassword(hashFromDb) {
    return comparePass(this.dataToValidate.password, hashFromDb);
  }
}
