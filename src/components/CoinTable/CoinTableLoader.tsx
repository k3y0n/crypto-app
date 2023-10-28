import ContentLoader from "react-content-loader";

const CoinTableLoader = () => (
  <ContentLoader
    speed={2}
    width={600}
    height={400}
    viewBox="0 0 600 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="8" ry="8" width="1200" height="701" />
  </ContentLoader>
);

export default CoinTableLoader;
