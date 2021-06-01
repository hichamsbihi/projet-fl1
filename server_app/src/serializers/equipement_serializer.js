/**
 * In this module we define a generic serializer with valdator process of api comming data.
 *
 */
import { Validator } from "jsonschema";
import { ValidatorException } from "../exceptions/ValidatorException.js";
const EQUIPEMENT_API_SCHEMA = {
  type: "object",
  anyOf: [{ required: ["code"] }, { required: ["id"] }],
};

export class UserSerializer extends Validator {
  constructor(request, apiName) {
    super(EQUIPEMENT_API_SCHEMA);
    this.jsonSchema = EQUIPEMENT_API_SCHEMA;
    this.dataToValidate = request.body;
    this.validated_data = {};
    this.apiName = apiName;
    this.details = {};
  }

  is_valide({ raise_exception = false }) {
    this.details = this.validate(this.dataToValidate, this.jsonSchema);
    if (this.details.valid) {
      this.dataToValidate = this.validated_data;
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
}
