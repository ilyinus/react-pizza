import ContentLoader from 'react-content-loader'

export default function Loader(props) {
  return (
    <ContentLoader
      className="pizza-block"
      speed={2}
      width={320}
      height={457.5}
      viewBox="0 0 280 457.5"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="143" cy="119" r="118" />
      <rect x="0" y="260" rx="5" ry="5" width="280" height="40" />
      <rect x="0" y="310" rx="10" ry="10" width="280" height="84" />
      <rect x="0" y="410" rx="5" ry="5" width="110" height="45" />
      <rect x="128" y="410" rx="20" ry="20" width="151" height="45" />
    </ContentLoader>
  )
}
