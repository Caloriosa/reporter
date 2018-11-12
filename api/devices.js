export function deviceByName (deviceName) {
  return '/devices/@' + encodeURIComponent(deviceName)
}
