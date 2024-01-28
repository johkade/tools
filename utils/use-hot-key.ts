import { useEffect, useId } from "react"

type HotKey = "Enter" | "Escape" | "CommandI" | "CommandEnter"

const HOT_KEY_MAP: Record<HotKey, string[]> = {
  Enter: ["Enter", "NumpadEnter"],
  Escape: ["Escape"],
  CommandI: ["i"],
  CommandEnter: ["Enter", "NumpadEnter"],
}

/**
 * Calls a callback when a hotkey is pressed. By default, the event listener is only attached to the document.
 * If you want this to work while an input is focused, we need to attach it to that as well.
 * @example
 * const hotkeyProps = useHotKey(() => console.log("hello"))
 *
 * <TextInput {...hotkeyProps} />
 */
export const useHotKey = (
  callback: () => void,
  hotKeys: HotKey[],
  skip?: boolean
) => {
  const nativeID = useId()

  useEffect(() => {
    if (skip) return

    const listener = (event: KeyboardEvent) => {
      for (const hotKey of hotKeys) {
        if (!hotKey.startsWith("Command")) {
          if (HOT_KEY_MAP[hotKey ?? "Enter"].includes(event.code)) {
            event.preventDefault()
            callback?.()
          }
        } else {
          if (
            (event.metaKey || event.ctrlKey) &&
            HOT_KEY_MAP[hotKey].includes(event.key)
          ) {
            event.preventDefault()
            callback?.()
          }
        }
      }
    }

    document.addEventListener("keydown", listener)

    const extraComponent = document.getElementById(nativeID)
    extraComponent?.addEventListener?.("keydown", listener)

    return () => {
      document.removeEventListener("keydown", listener)
      extraComponent?.removeEventListener?.("keydown", listener)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, skip, nativeID])

  return { id: nativeID }
}
