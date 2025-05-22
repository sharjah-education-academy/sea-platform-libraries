import * as Yup from "yup";
import { Utils } from "sea-platform-helpers";

export const name = Yup.string().min(3).max(50).required("Required");
export const birthDate = Yup.string().required("Required");
export const email = Yup.string().email().required("Required");
export const phoneNumber = Yup.string()
  .matches(Utils.String.phoneRegExp, "Phone number is not valid")
  .required("Required");
export const password = Yup.string().min(8).required("Required");
export const confirmPassword = Yup.string()
  .oneOf([Yup.ref("password"), undefined], "Passwords must match")
  .required("Confirm password is required");

export const identifier = Yup.string()
  .required("Identifier is required")
  .test(
    "is-email-or-phone",
    "Identifier must be a valid email or phone number",
    (value) =>
      !!value &&
      (Utils.String.emailRegex.test(value) ||
        Utils.String.phoneRegExp.test(value))
  );

export const otpCode = (length: number) =>
  Yup.string()
    .length(length, `OTP length must be ${length}`)
    .required("Required");
