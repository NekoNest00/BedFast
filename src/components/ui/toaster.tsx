
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  // We'll use the toasts but won't display them
  const { toasts } = useToast()

  // Return an empty fragment, effectively hiding all toasts
  return null;
}
