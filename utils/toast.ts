import { toast } from "sonner"

export function showToast(text: string) {
  toast(text, { duration: 7000 })
}
