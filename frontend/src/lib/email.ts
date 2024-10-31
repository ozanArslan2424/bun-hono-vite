/* eslint-disable no-var */
// only works with var
var nodemailer = require("nodemailer");

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

type EmailProps = {
  userId: string;
  userEmail: string;
  verificationToken: string;
};

export const sendVerificationEmail = async (props: EmailProps) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_FROM,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
  });

  const verificationURL = `${baseURL}/auth/onboarding/verify-email?userId=${props.userId}&userEmail=${props.userEmail}&verificationToken=${props.verificationToken}`;

  const mail = {
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

  var mailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL_FROM,
    to: mail.to,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) {
      throw new Error(error.message);
    } else {
      console.log("Email sent. Info: " + info);
      return true;
    }
  });
};

export const sendPasswordResetEmail = async (props: EmailProps) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_FROM,
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
    },
  });

  const resetURL = `${baseURL}/auth/reset-password?userId=${props.userId}&userEmail=${props.userEmail}&verificationToken=${props.verificationToken}`;

  const mail = {
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

  var mailOptions = {
    from: process.env.NEXT_PUBLIC_EMAIL_FROM,
    to: mail.to,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
  };

  transporter.sendMail(mailOptions, function (error: Error, info: any) {
    if (error) {
      throw new Error(error.message);
    } else {
      console.log("Password reset email sent. Info: " + info);
      return true;
    }
  });
};
