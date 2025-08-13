import { ValidationSchema, ValidationResult } from "@/types/security.types";

export class RequestValidator {
  static validate(data: any, schema: ValidationSchema): ValidationResult {
    const errors: string[] = [];

    Object.entries(schema).forEach(([field, rules]) => {
      const value = data[field];

      if (rules.required && !value) {
        errors.push(`${field} is required`);
        return;
      }

      if (value) {
        if (typeof value !== rules.type) {
          errors.push(`${field} must be of type ${rules.type}`);
        }

        if (rules.min !== undefined && value < rules.min) {
          errors.push(`${field} must be at least ${rules.min}`);
        }

        if (rules.max !== undefined && value > rules.max) {
          errors.push(`${field} must be at most ${rules.max}`);
        }

        if (rules.pattern && !rules.pattern.test(value)) {
          errors.push(`${field} has invalid format`);
        }
      }
    });

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}
