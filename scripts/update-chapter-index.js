const fs = require('fs')
const path = require('path')

const ROOT = path.resolve(__dirname, '..', 'src', 'chapters')

/**
 * @returns {string[]}
 */
function getChaptersDir() {
  return fs
    .readdirSync(ROOT)
    .filter(name => /^vol-\d+/.test(name))
    .map(name => path.resolve(ROOT, name))
}

/**
 *
 * @param {string} dir
 * @returns {string[]}
 */
function readDirFilesSync(dir) {
  const CHAP_REG = /^chap-(\d+)\.html\.mdx$/

  return fs
    .readdirSync(dir)
    .filter(name => CHAP_REG.test(name))
    .sort((aName, bName) => +aName.match(CHAP_REG)[1] - +bName.match(CHAP_REG)[1])
    .map(name =>
      fs.readFileSync(path.resolve(dir, name), { encoding: 'utf-8' })
    )
}

/**
 * @param {string} content
 * @returns {string}
 */
function getTitle(content) {
  const regexp = /title: '(.+)'/
  const matched = content.match(regexp)
  return matched ? matched[1] : null
}

const vols = getChaptersDir()
  .map(readDirFilesSync)
  .map(chap => chap.map(getTitle))

vols.forEach((vol, volNo) => {
  const json = vol.map((chap, chapNo) => ({
    index: chapNo,
    title: chap,
    link: `/chapters/vol-${volNo + 1}/chap-${chapNo}.html`,
  }))
  const filePath = path.resolve(ROOT, `vol-${volNo + 1}`, 'meta.json')
  // if (!fs.existsSync(filePath)) {
  // }
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', {
    encoding: 'utf-8',
    flag: 'w',
  })
})
