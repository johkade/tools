import nodemailer from "nodemailer"
import SMTPTransport from "nodemailer/lib/smtp-transport"

// Create a transporter object using SMTP or other email services
const transporter = nodemailer.createTransport({
  service: "Gmail", // You can use other services or SMTP settings
  auth: {
    user: "johkade.dev@gmail.com",
    pass: process.env.GMAIL_PASS,
  },
})

export const sendEmail: (data: {
  author: string
  body: string
}) => Promise<SMTPTransport.SentMessageInfo> = async (data) => {
  const mailOptions: Parameters<typeof transporter.sendMail>[0] = {
    from: "Bekki & Johny are marrying",
    to: "johkade.dev@gmail.com",
    subject: `New message from ${data.author} via the Marriage-Website`,
    text: `This message was sent via the website: \n${data.body}`,
    cc: "rebekka.schueder@t-online.de",
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error)
      } else {
        return resolve(info)
      }
    })
  })
}
