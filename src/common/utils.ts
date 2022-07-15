import Vue, { getCurrentInstance } from 'vue'

function getVm() {
  const instance = getCurrentInstance()
  return instance?.proxy || new Vue({})
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useCookie = () => (getVm() as any).$cookie
export const useRouter = () => getVm().$router
export const useRoute = () => getVm().$route

export function formatBytes(bytes: number) {
  const negative = bytes < 0
  bytes = Math.abs(bytes)
  let formatted: string
  if (bytes >= Math.pow(1024, 4)) {
    formatted = (bytes / Math.pow(1024, 4)).toFixed(1) + 'T'
  } else if (bytes >= Math.pow(1024, 3)) {
    formatted = (bytes / Math.pow(1024, 3)).toFixed(1) + 'G'
  } else if (bytes >= Math.pow(1024, 2)) {
    formatted = (bytes / Math.pow(1024, 2)).toFixed(1) + 'M'
  } else if (bytes >= 1024) {
    formatted = (bytes / 1024).toFixed(1) + 'K'
  } else if (bytes > 0) {
    formatted = Number(bytes).toFixed(1) + 'B'
  } else {
    formatted = String(bytes)
  }
  return (negative ? '-' : '') + formatted
}
