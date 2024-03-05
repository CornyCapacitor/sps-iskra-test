import Swal from "sweetalert2"

const themeBackground = "#000000"
const themeColor = "#ffffff"

export const errorSwal = (title: string) => {
  Swal.fire({
    icon: 'error',
    iconColor: '#e71f1f',
    background: `${themeBackground}`,
    color: `${themeColor}`,
    title: `${title}`,
    timer: 5000,
  })
  return
}

export const questionSwal = (title: string, confirmText: string, cancelText: string, resultFunc: VoidFunction) => {
  Swal.fire({
    icon: 'question',
    iconColor: '#2563eb',
    background: `${themeBackground}`,
    color: `${themeColor}`,
    title: `${title}`,
    showConfirmButton: true,
    confirmButtonText: `${confirmText}`,
    showCancelButton: true,
    cancelButtonText: `${cancelText}`,
  }).then((result) => {
    if (result.isConfirmed) {
      resultFunc()
    }
    return
  })
}

export const toAdminSuccessSwal = (title: string, resultFunc: VoidFunction) => {
  Swal.fire({
    icon: 'success',
    iconColor: 'green',
    background: `${themeBackground}`,
    color: `${themeColor}`,
    title: `${title}`,
    showConfirmButton: true,
    confirmButtonText: "Ok",
    timer: 5000,
  }).then((result) => {
    if (result.isConfirmed || result.dismiss) {
      resultFunc()
    }
  })
}