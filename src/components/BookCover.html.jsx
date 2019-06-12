import styled from '@emotion/styled'
import { getVolData } from '../utils/tools.js'

const CoverHolder = styled.div`
  width: 100%;
  max-width: 60vw;
  border: 1px solid #aaa;
  padding: 5px;
  background-color: #f9f9f9;
  font-size: 14px;

  & > div {
    margin: 5px 0;
  }
`

const Cover = styled.img`
  width: 100%;
`

const NavContainer = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  margin-bottom: 10px;

  .current {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`

export default ({
  root,
  volNo,
  chapIndex,
  title = '',
  pov = null,
  place = null,
}) => {
  const meta = require(`../chapters/vol-${volNo}/meta.json`)
  const currentChap = meta[chapIndex]
  const prevChap = meta[chapIndex - 1]
  const nextChap = meta[chapIndex + 1]
  const prevPovChap = meta.find((chap, index) => {
    const regexp = new RegExp(`^${currentChap.title.split(' ')[0]}`)
    return index < chapIndex && regexp.test(chap.title)
  })
  const nextPovChap = meta.find((chap, index) => {
    const regexp = new RegExp(`^${currentChap.title.split(' ')[0]}`)
    return index > chapIndex && regexp.test(chap.title)
  })
  const currentVol = getVolData(volNo)

  return (
    <div className="row">
      <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">
        <h1>
          {currentVol.title} - {title}
        </h1>
        <NavContainer>
          {prevChap && (
            <div
              className="prev"
              style={{ marginTop: prevPovChap ? '52px' : 0 }}
            >
              <strong>
                <a href={root + prevChap.link}>{prevChap.title}</a>
              </strong>
              <span style={{ margin: `0 10px` }}>&larr;</span>
            </div>
          )}
          <div className="current">
            {prevPovChap && (
              <div className="flex-center" style={{ flexDirection: 'column' }}>
                <strong>
                  <a href={root + prevPovChap.link}>{prevPovChap.title}</a>
                </strong>
                <span style={{ margin: `10px 0` }}>&uarr;</span>
              </div>
            )}
            <strong>{currentChap.title}</strong>
            {nextPovChap && (
              <>
                <span style={{ margin: `10px 0` }}>&darr;</span>
                <strong>
                  <a href={root + nextPovChap.link}>{nextPovChap.title}</a>
                </strong>
              </>
            )}
          </div>
          {nextChap && (
            <div
              className="next"
              style={{ marginTop: prevPovChap ? '52px' : 0 }}
            >
              <span style={{ margin: `0 10px` }}>&rarr;</span>
              <strong>
                <a href={root + nextChap.link}>{nextChap.title}</a>
              </strong>
            </div>
          )}
        </NavContainer>
      </div>
      <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4">
        <CoverHolder>
          <Cover src={currentVol.cover} />
          <div className="flex-center">
            <a href={`${root}/chapters/vol-${volNo}/index.html`}>
              {currentVol.title}
            </a>
            <span>章节</span>
            <span style={{ marginLeft: '10px' }}>{chapIndex}</span>
          </div>
          <div className="flex-center">
            <strong>视点人物：</strong>
            {pov}
          </div>
          <div className="flex-center">
            <strong>发生地点：</strong>
            {place}
          </div>
        </CoverHolder>
      </div>
    </div>
  )
}
