import { eventHandler } from 'h3'

export default eventHandler(() => {
  return {
    user: 'username',
    date: new Date(),
  }
})
