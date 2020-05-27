import { EmailRegExp, PasswordRegExp } from "../../lib/regexp";

function validateForm({ email, password }) {
  let foundErrors = false;
  const errors = {};

  if (!EmailRegExp.test(email)) {
    errors.email = "Invalid e-mail.";
  }

  if (!PasswordRegExp.test(password)) {
    errors.password = "Invalid password.";
  }

  Object.entries(errors).forEach(([_key, value]) => {
    if (value) foundErrors = true;
  });

  return foundErrors ? errors : foundErrors;
}

export { validateForm };
