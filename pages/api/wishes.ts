import type { NextApiRequest, NextApiResponse } from "next"
import { createClient } from "@supabase/supabase-js"

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

    const { author, title } = req.body || {}

    if (!author || !title)
      return res.status(400).json({ message: "Invalid data" })

    try {
      // Insert a new record into the 'example_table'
      const { data, error } = await supabase
        .from("song_wishes")
        .insert([{ author, title }])

      if (error) {
        console.error(error)
        return res.status(500).json({ message: "Error inserting data" })
      }

      return res.status(200).json({ message: "Data inserted successfully" })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Internal Server Error" })
    }
  }

  if (req.method === "GET") {
    const supabase = createClient(SUPABASE_URL, KEY)

    try {
      // Retrieve the latest 5 entries
      const { data, error } = await supabase
        .from("song_wishes")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5)

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
