const ProgressPhotos = ({ photos = [] }) => {
  if (!photos.length) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
        No progress photos available.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-5">

      <h2 className="text-lg font-semibold mb-5">
        Progress Photos
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        {photos.map((photo, index) => (
          <div key={photo._id || index}>
            <img
              src={photo.url}
              alt={`Progress ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />

            {photo.date && (
              <p className="text-sm text-gray-500 mt-2">
                {new Date(photo.date).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}

      </div>

    </div>
  );
};

export default ProgressPhotos;