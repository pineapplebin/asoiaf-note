import styled from '@emotion/styled'

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

export default function({ children, currentPageId, pages }) {
  const currentPage = pages.find(page => page.meta.id === currentPageId)

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <title>{getTitle(currentPage)}</title>
        <link rel="stylesheet" href="/styles/modern-normalize.css" />
        <link rel="stylesheet" href="/styles/flexboxgrid.min.css"/>
        <link rel="stylesheet" href="/styles/chapters.css" />
      </head>
      <body>
        <Container>
          <Block>{children}</Block>
        </Container>
      </body>
    </html>
  )
}
