export function getSiteRoot(env) {
  return env === 'development' ? '' : '/asoiaf-note'
}

const VOL_DATA = {
  [1]: {
    title: '权力的游戏',
    cover:
      'https://vignette.wikia.nocookie.net/asoiaf/images/9/93/AGameOfThrones.jpg/revision/latest/scale-to-width-down/220?cb=20140802162005&path-prefix=zh',
  },
}

export function getVolData(volNo) {
  return VOL_DATA[volNo]
}
