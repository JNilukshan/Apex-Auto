import { Plus, Trash2 } from "lucide-react";

export default function RegularCollectionsTable({
  builds,
  onNavigate,
  handleDeleteBuild,
  setSelectedBuild,
}) {
  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 text-center sm:text-left">Regular Collections</h2>
        <button
          onClick={() => onNavigate("customize")}
          className="flex items-center justify-center bg-cyan-600 text-white px-4 sm:px-6 py-3 rounded-3xl hover:bg-cyan-500 transition font-medium shadow-sm w-full sm:w-auto"
        >
          <Plus className="w-5 h-5 mr-2" /> New Build
        </button>
      </div>

      {builds.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl shadow-sm p-8 sm:p-12 text-center">
          <p className="text-gray-500 mb-4">
            No builds yet. Create your first one!
          </p>
          <button
            onClick={() => onNavigate("customize")}
            className="bg-cyan-600 text-white px-6 py-3 rounded-3xl hover:bg-cyan-500 transition"
          >
            Create Build
          </button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <table className="w-full">
              <thead className="bg-white border-b border-gray-100">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Parts Count
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Color
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Total Price
                  </th>
                  <th className="py-4 px-6"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {builds.map((build) => (
                  <tr key={build._id} className="hover:bg-gray-50 transition">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src="https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=100"
                          alt={build.buildName}
                          className="w-14 h-14 rounded-xl object-cover shadow-sm"
                        />
                        <span className="font-medium text-gray-900">
                          {build.carModel?.brand} {build.carModel?.model} (
                          {build.carModel?.year})
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">
                      {build.selectedParts?.length || 0} Parts
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: build.color?.primary }}
                        />
                        <span className="text-gray-600">
                          {build.color?.primary || "Not specified"}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="font-semibold text-gray-900">
                        LKR{" "}
                        {(
                          build.selectedParts?.reduce(
                            (sum, part) => sum + part.price,
                            0
                          ) || 0
                        ).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 justify-end">
                        <button
                          onClick={() => setSelectedBuild(build)}
                          className="px-5 py-2.5 text-sm bg-cyan-600 text-white rounded-3xl hover:bg-cyan-500 transition font-medium shadow-sm"
                        >
                          See details →
                        </button>
                        <button
                          onClick={() => handleDeleteBuild(build._id)}
                          className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {builds.map((build) => (
              <div key={build._id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src="https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=100"
                    alt={build.buildName}
                    className="w-16 h-16 rounded-xl object-cover shadow-sm flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-lg mb-1 truncate">
                      {build.carModel?.brand} {build.carModel?.model}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">({build.carModel?.year})</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                      <span>{build.selectedParts?.length || 0} Parts</span>
                      <div className="flex items-center gap-1">
                        <div
                          className="w-3 h-3 rounded-full border border-gray-300"
                          style={{ backgroundColor: build.color?.primary }}
                        />
                        <span className="truncate">{build.color?.primary || "Not specified"}</span>
                      </div>
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-4">
                      LKR{" "}
                      {(
                        build.selectedParts?.reduce(
                          (sum, part) => sum + part.price,
                          0
                        ) || 0
                      ).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedBuild(build)}
                    className="flex-1 px-4 py-3 text-sm bg-cyan-600 text-white rounded-2xl hover:bg-cyan-500 transition font-medium shadow-sm"
                  >
                    See details →
                  </button>
                  <button
                    onClick={() => handleDeleteBuild(build._id)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-2xl transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
