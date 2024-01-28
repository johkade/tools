import { sendEmail } from "@/utils/email"
import type { NextApiRequest, NextApiResponse } from "next"

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "POST") {
    const { author, text } = req.body || {}

    if (!author || !text)
      return res.status(400).json({ message: "Invalid data" })

    try {
      await sendEmail({ author, body: text })

      return res.status(200).json({ message: "Email sent successfully" })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" })
}
