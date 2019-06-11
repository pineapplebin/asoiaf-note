export default ({ name, linkName = null, ...props }) => {
  return (
    <a
      target="_blank"
      href={`https://asoiaf.fandom.com/zh/wiki/${linkName || name}`}
      {...props}
    >
      {name}
    </a>
  )
}
