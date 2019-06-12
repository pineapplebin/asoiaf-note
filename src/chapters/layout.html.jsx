import styled from '@emotion/styled'
import BookCover from '../components/BookCover.html.jsx'
import { getSiteRoot } from '../utils/tools.js'

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`

const Block = styled.div`
  width: 80%;
  padding: 10px;
  overflow: hidden;
  @media (max-width: 420px) {
    width: 100%;
  }
`

function getTitle(page) {
  const originTitle = page.meta.title

  return `${originTitle || 'Page'} - The Song of Ice and Fire`
}

export default function({
  meta,
  pov,
  place,
  hasCover = true,
  children,
  environment,
  pages,
}) {
  const currentPage = pages.find(page => page.meta.id === meta.id)
  const root = getSiteRoot(environment)

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <title>{getTitle(currentPage)}</title>
        <link rel="stylesheet" href={`${root}/styles/modern-normalize.css`} />
        <link rel="stylesheet" href={`${root}/styles/flexboxgrid.min.css`} />
        <link rel="stylesheet" href={`${root}/styles/chapters.css`} />
      </head>
      <body>
        <Container>
          <Block>
            {hasCover && (
              <>
                <BookCover
                  root={root}
                  volNo={meta.vol}
                  chapIndex={meta.index}
                  title={meta.title}
                  pov={pov}
                  place={place}
                />
                <hr />
              </>
            )}
            {children}
          </Block>
        </Container>
      </body>
    </html>
  )
}
