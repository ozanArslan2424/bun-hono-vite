import nodemailer from "nodemailer";

type EmailProps = {
  userId: string;
  userEmail: string;
  verificationToken: string;
};

const baseURL = process.env.BASE_URL;
const emailFrom = process.env.EMAIL_FROM;
const emailPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: emailFrom,
    pass: emailPassword,
  },
});

export const sendVerificationEmail = async (props: EmailProps) => {
  const verificationURL = `${baseURL}/auth/onboarding/verify-email?userId=${props.userId}&userEmail=${props.userEmail}&verificationToken=${props.verificationToken}`;

  const mailOptions = {
    from: emailFrom,
    to: props.userEmail,
    subject: "Classes Email Verification.",
    text: `Complete your registration using this code: ${props.verificationToken} or by clicking this link: ${verificationURL}`,
    html: `
      <div style="text-align: center; margin-top: 24px">
        <h1>Hello!</h1>
        <p>You are on the final step to complete your registration and onboarding!</p>
        <p>Click the link below to verify your email:</p>
        <a style="margin-top: 24px; font-size: large" href=${verificationURL}>Click Here!</a>
        <p>Or use the code below on the onboarding screen:</p>
        <p style="font-size: large">${props.verificationToken}</p>
      </div>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(error.message);
    } else {
      console.log("Email sent. Info: " + info);
      return true;
    }
  });
};

export const sendPasswordResetEmail = async (props: EmailProps) => {
  const resetURL = `${baseURL}/auth/reset-password?userId=${props.userId}&userEmail=${props.userEmail}&verificationToken=${props.verificationToken}`;

  const mailOptions = {
    from: emailFrom,
    to: props.userEmail,
    subject: "Password Reset Request",
    text: `You requested a password reset. Use this code: ${props.verificationToken} or click this link: ${resetURL}`,
    html: `
      <div style="text-align: center; margin-top: 24px">
        <h1>Password Reset Request</h1>
        <p>We received a request to reset your password.</p>
        <p>Click the link below to reset your password:</p>
        <a style="margin-top: 24px; font-size: large" href=${resetURL}>Reset Password</a>
        <p>Or use the code below to reset your password:</p>
        <p style="font-size: large">${props.verificationToken}</p>
      </div>
      `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      throw new Error(error.message);
    } else {
      console.log("Password reset email sent. Info: " + info);
      return true;
    }
  });
};
