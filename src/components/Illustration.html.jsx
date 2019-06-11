import styled from '@emotion/styled'

const Container = styled.div`
  width: 100%;
  border: 1px solid #aaa;
  background-color: #f9f9f9;
  padding: 3px;
  margin: 10px 0;

  img {
    width: 100%;
  }

  @media (max-width: 420px) {
    width: 100% !important;
  }
`

const DescriptionBlock = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;

  .description {
    font-style: italic;
  }
`

export default ({ src, desc = '', width = null }) => {
  return (
    <Container style={{ width: width }}>
      <img src={src} alt="illustration" />
      <DescriptionBlock>
        <div className="description">{desc}</div>
      </DescriptionBlock>
    </Container>
  )
}
