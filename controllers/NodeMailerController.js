const nodemailer = require("nodemailer");

exports.mail = async (req, res) => {
  try {
    const { senderEmail, senderName, recipientEmail, subject, text } = req.body;

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

    res.json({
      success: true,
      message: "Email sent successfully",
      data: info,
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
