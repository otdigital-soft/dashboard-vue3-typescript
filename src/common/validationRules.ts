import { defineRule } from "vee-validate"

export const defineValidatorRules = () => {
  defineRule("required", value => {
    if (value === undefined || value === null) {
      return "This field is required"
    }

    if (typeof (value) === "string") {
      if (!value.length) {
        return "This field is required"
      }
    } else {
      if (!value) {
        return "This field is required"
      }
    }

    return true
  })

  defineRule("locationRequired", value => {
    if (value === undefined || value === null) {
      return "This field is required"
    }

    return true
  })

  defineRule("email", value => {
  // Field is empty, should pass
    if (!value || !value.length) {
      return true
    }
    // Check if email
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return "This field must be a valid email"
    }
    return true
  })

  defineRule("password", value => {
    if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)) {
      return true
    }
    return "Minimum 8 characters, at least 1 letter, 1 number and 1 special character"
  })

  defineRule("confirmed", (value, [target], ctx) => {
    if (value === ctx.form[target]) {
      return true
    }
    return "Passwords must match"
  })

  defineRule("minLength", (value, [limit]) => {
  // The field is empty so it should pass
    if (!value || !value.length) {
      return true
    }
    if (value.length < limit) {
      return `This field must be at least ${limit} characters`
    }
    return true
  })

  defineRule("maxLength", (value, [limit]) => {
  // The field is empty so it should pass
    if (!value || !value.length) {
      return true
    }
    if (value.length > limit) {
      return `This field must be less than ${limit} characters`
    }
    return true
  })

  defineRule("minMax", (value, [min, max]) => {
  // The field is empty so it should pass
    if (!value || !value.length) {
      return true
    }
    const numericValue = Number(value)
    if (numericValue < min) {
      return `This field must be greater than ${min}`
    }
    if (numericValue > max) {
      return `This field must be less than ${max}`
    }
    return true
  })
}
