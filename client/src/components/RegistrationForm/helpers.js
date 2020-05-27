import { EmailRegExp, PasswordRegExp } from "../../lib/regexp";

function validateForm({ first_name, last_name, email, password, password_confirmed }) {
  let foundError = false;

  const errors = {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    password_confirmed: null,
  };

  if (first_name.length < 1 || first_name.length > 24) {
    errors.first_name = "Maximum characters allowed between 1 and 24.";
  }

  if (last_name.length < 1 || last_name.length > 24) {
    errors.last_name = "Maximum characters allowed between 1 and 24.";
  }

  if (!EmailRegExp.test(email)) {
    errors.email = "Invalid e-mail.";
  }

  if (!PasswordRegExp.test(password)) {
    errors.password = "Invalid password.";
  }

  if (password !== password_confirmed) {
    errors.password_confirmed = "Passwords must match.";
  }

  Object.entries(errors).forEach(([_key, value]) => {
    if (value) foundError = true;
  });

  return foundError ? errors : false;
}

export { validateForm };
