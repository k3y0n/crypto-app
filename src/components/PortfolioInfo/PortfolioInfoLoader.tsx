import ContentLoader from "react-content-loader";

const PortfolioInfoLoader = () => (
  <ContentLoader
    speed={2}
    width={450}
    height={180}
    viewBox="0 0 450 180"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="8" ry="8" width="1200" height="701" />
  </ContentLoader>
);

export default PortfolioInfoLoader;
