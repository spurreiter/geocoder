export const argv = ({ forward, reverse }) => {
  const argv = process.argv.slice(2)
  const cmd = {}

  while (argv.length) {
    const arg = argv.shift()

    switch (arg) {
      case '--limit':
        cmd.limit = +argv.shift()
        break
      case '-l':
      case '--language':
        cmd.language = argv.shift()
        break
      case '-f':
      case '--forward':
        cmd.forward = argv.shift() || forward
        break
      case '-r':
      case '--reverse':
        cmd.reverse = argv.shift() || reverse
        break
      default:
        if (arg.indexOf('--') === 0) {
          const key = arg.substring(2)
          cmd[key] = argv.shift()
        } else {
          cmd.forward = arg
        }
        break
    }
  }

  if (!cmd.forward && !cmd.reverse) {
    cmd.forward = forward
  }

  return cmd
}
