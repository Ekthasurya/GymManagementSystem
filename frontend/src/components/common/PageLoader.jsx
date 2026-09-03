import LoadingSpinner from "./LoadingSpinner";

const PageLoader = () => {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
};

export default PageLoader;