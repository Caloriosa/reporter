const colors = [
  'red', 'pink', 'purple', 'deep-purple',
  'indigo', 'blue', 'light-blue', 'cyan',
  'teal', 'green', 'light-green', 'lime',
  'yellow', 'amber', 'orange', 'deep-orange',
  'brown', 'blue-grey', 'grey'
]

const shadows = [ '', 'darken', 'lighten' ]

/**
 * @param {String} str
 */
export default function colorize (str) {
  let chSum = 0
  for (let i = 0; i < str.length; i++) {
    chSum += str.charCodeAt(i)
  }
  console.log(chSum)
  console.log(colors.length)
  let color = colors[chSum % colors.length]
  let shadow = Math.round(chSum / str.length) % shadows.length
  console.log(shadow)
  if (shadow) {
    let brb = (str.length % 3) + 1
    color += ' ' + shadows[shadow] + '-' + brb
  }
  return color
}
