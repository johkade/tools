import { createClient } from "@supabase/supabase-js"
import type { NextApiRequest, NextApiResponse } from "next"

const SUPABASE_URL = "https://rvqvucmaaqokguqonakt.supabase.co"
const KEY = process.env.SUPABASE_SECRET

type ResponseData = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (!KEY) {
    console.log("MISSING KEY")
    return res.status(504).json({ message: "Missing secret key" })
  }

  if (req.method === "POST") {
    const supabase = createClient(SUPABASE_URL, KEY)

    const { isIn, by } = req.body || {}

    if (typeof isIn !== "boolean" || typeof by !== "string")
      return res.status(400).json({ message: "Invalid data" })

    try {
      const entries = await supabase
        .from("are_you_in")
        .select("*")
        .filter("by", "eq", by)

      if (entries.error) {
        console.error(entries.error)
        return res.status(500).json({ message: "Error reading data" })
      }

      if (!entries.data.length) {
        // Insert a new record
        const { error } = await supabase
          .from("are_you_in")
          .insert([{ isIn, by }])

        if (error) {
          console.error(error)
          return res.status(500).json({ message: "Error inserting data" })
        }
      } else {
        const { error } = await supabase
          .from("are_you_in")
          .update([{ isIn, by }])
          .filter("by", "eq", by)

        if (error) {
          console.error(error)
          return res.status(500).json({ message: "Error updating data" })
        }
      }

      return res.status(200).json({ message: "Data inserted successfully" })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }

  if (req.method === "GET") {
    const supabase = createClient(SUPABASE_URL, KEY)

    const { by } = req.query || {}

    if (typeof by !== "string")
      return res.status(400).json({ message: "Invalid data" })

    try {
      // Retrieve the latest 4 entries
      const { data, error } = await supabase
        .from("are_you_in")
        .select("*")
        .filter("by", "eq", by)
        .limit(1)

      if (error) {
        console.error(error)
        return res.status(500).json({ message: "Error fetching messages" })
      }

      // Data successfully fetched
      // @ts-ignore
      return res.status(200).json({ data })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }

  return res.status(405).json({ message: "Method Not Allowed" })
}
