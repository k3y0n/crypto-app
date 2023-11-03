import ContentLoader from "react-content-loader";

interface LoaderProps {
  width: number;
  height: number;
}

const Loader = ({ width, height }: LoaderProps) => (
  <ContentLoader
    speed={2}
    viewBox="0 0 600 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    width={width}
    height={height}
  >
    <rect x="0" y="0" rx="8" ry="8" width="1200" height="701" />
  </ContentLoader>
);

export default Loader;
