import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toStrinf, 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        varifyToken: hashedToken,
        varifyExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "63f88e14460eeb",
        pass: "7ac0effabbe468",
      },
    });

    const mailOptions = {
      from: "basurajp135@gmail.com", // sender address
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email " : "Reset your password ", // Subject line

      html: `<p>Click  <a href="${
        process.env.DOMAIN
      }/varifyemail?token=${hashedToken}"> here </a> to ${
        emailType === "VERIFY" ? "Verify your email " : "Reset  your Password"
      }
      or copy and paste the Link in yout browser 
  <br>  ${process.env.DOMAIN
  }/varifyemail?token=${hashedToken}}
  </p>`, // html body
    };

    const mailResponse = await transport.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
