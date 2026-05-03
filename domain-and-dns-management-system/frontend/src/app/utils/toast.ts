export const showToast = (message: string, type: "success" | "error" = "success") => {
  const toastContainer = document.getElementById("kt_toast_container")

  if (!toastContainer) return

  const toast = document.createElement("div")

  toast.className = `toast show align-items-center text-white ${
    type === "success" ? "bg-success" : "bg-danger"
  } border-0 mb-3`

  toast.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto"></button>
    </div>
  `

  toastContainer.appendChild(toast)

  // auto remove
  setTimeout(() => {
    toast.remove()
  }, 3000)
}