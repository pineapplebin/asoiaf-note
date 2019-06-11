export function getSiteRoot() {
  return process.env.NODE_ENV === 'development' ? '' : '/asoiaf'
}
