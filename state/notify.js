const subscribers = []

export const subscribe = (callback) => {
  subscribers.push(callback)
}

export const notify = () => {
  subscribers.forEach(callback => callback())
}