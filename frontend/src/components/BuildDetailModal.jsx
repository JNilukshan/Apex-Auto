export default function BuildDetailModal({ build, onClose }) {
  // Calculate total price from selected parts
  const totalPrice = build.selectedParts?.reduce((sum, part) => sum + part.price, 0) || 0;
  
  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 w-full max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {build.carModel?.brand} {build.carModel?.model} ({build.carModel?.year})
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            ✕
          </button>
        </div>

        {/* Car Image with Color Overlay */}
        <div className="relative mb-6">
          <img
            src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200"
            alt={`${build.carModel?.brand} ${build.carModel?.model}`}
            className="rounded-2xl w-full h-64 object-cover"
          />
          <div
            className="absolute inset-0 mix-blend-multiply opacity-30 rounded-2xl"
            style={{ backgroundColor: build.color?.primary }}
          />
        </div>

        {/* Car Details */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
            Vehicle Details
          </h3>
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-gray-600 text-sm mb-1">Brand</div>
                <div className="font-semibold text-black">{build.carModel?.brand}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600 text-sm mb-1">Model</div>
                <div className="font-semibold text-black">{build.carModel?.model}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600 text-sm mb-1">Year</div>
                <div className="font-semibold text-black">{build.carModel?.year}</div>
              </div>
              <div className="text-center">
                <div className="text-gray-600 text-sm mb-1">Build Date</div>
                <div className="font-semibold text-black">
                  {new Date(build.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Parts */}
        <div className="space-y-4 mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-900">
              Added Parts ({build.selectedParts?.length || 0} items)
            </h3>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Total: LKR {totalPrice.toLocaleString()}
            </div>
          </div>
          
          {/* Parts List */}
          {build.selectedParts && build.selectedParts.length > 0 ? (
            <div className="space-y-3">
              {build.selectedParts.map((part, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-lg">{part.name}</h4>
                          <p className="text-sm text-gray-500">Service ID: {part.serviceId}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-xl font-bold text-gray-900">
                        LKR {part.price.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="text-gray-400 text-4xl mb-3">📦</div>
              <div className="text-gray-500 text-lg font-medium mb-1">No parts added yet</div>
              <div className="text-gray-400 text-sm">Start building your custom car by adding parts</div>
            </div>
          )}

          {/* Summary */}
          {build.selectedParts && build.selectedParts.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-4 border border-blue-200">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Build Summary</div>
                  <div className="text-lg font-bold text-gray-900">
                    {build.selectedParts.length} parts • LKR {totalPrice.toLocaleString()}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">Average per part</div>
                  <div className="text-lg font-semibold text-gray-700">
                    LKR {Math.round(totalPrice / build.selectedParts.length).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition font-medium"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium"
          >
            Edit Build
          </button>
        </div>
      </div>
    </div>
  );
}
