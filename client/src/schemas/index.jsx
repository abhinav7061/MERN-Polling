import * as Yup from "yup";

// Shema for the login form 
export const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .min(8, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
});

// shema for the registeration form
export const signupSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too short name").required('Required'),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .min(8, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    cpassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref('password')], 'passwords must match'),
});