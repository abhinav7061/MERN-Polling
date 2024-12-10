import * as Yup from "yup";

// Shema for the login form 
export const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters long")
        .max(50, "Password is too Long!")
        .required("Required"),
});

// shema for the registeration form
export const signupSchema = Yup.object().shape({
    name: Yup.string().min(3, "Too short name").required('Required'),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .max(50, "Password is too Long!")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
    cpassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref('password')], 'passwords must match'),
});

// shema for the forgot password form
export const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
});

// shema for the reset password form
export const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
        .required('New password is required')
        .max(50, "Password is too Long!")
        .min(8, 'Password must be at least 8 characters long')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        ),
    confirmPassword: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
});

// shema for the verify account
export const verifyAccountSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email address is required'),
    otp: Yup.string()
        .required('OTP is required')
        .matches(/^\d+$/, 'OTP should not have any characters other than digits')
        .length(6, 'OTP must be exactly 6 digits'),
});

export const PollSchema = Yup.object({
    question: Yup.string()
        .transform(value => value.trim())
        .min(3, 'Length of question should be min 3')
        .required('Question is required'),
    description: Yup.string()
        .transform(value => value.trim())
        .min(5, 'Description is required and length should be at least 5 characters')
        .required('Description is required'),
    optionList: Yup.array()
        .min(2, 'Minimum two options are required')
        .required('Options are required'),
})