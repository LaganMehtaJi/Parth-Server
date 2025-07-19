import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "chahatsharma76465@gmail.com",
        pass: "ltuc kuuk irtw pelx",
      },
    });

    await transporter.sendMail({
     from: `"PMS Admin" <chahatsharma76465@gmail.com>`,
     to,
      subject,
      text,
    });

    console.log("Email sent to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
