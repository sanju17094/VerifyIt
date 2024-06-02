const nodemailer = require("nodemailer");

exports.mail = async (req, res) => {
  try {
    const { senderEmail, senderName, recipientEmail, subject, text ,token} = req.body.mail;
console.log("token in mail",token);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "iamvikas.j30n@gmail.com",
        pass: "mvbn oslu uiuu rfke",
      },
    });

    // Send mail
    const info = await transporter.sendMail({
      from: `"${senderName}" <${senderEmail}>`,
      to: recipientEmail,
      subject: subject,
      text: text,
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      token:token
    });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: err.message,
    });
  }
};
