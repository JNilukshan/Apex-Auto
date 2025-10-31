import { Plus, Trash2 } from "lucide-react";

export default function RegularCollectionsTable({
  builds,
  onNavigate,
  handleDeleteBuild,
  setSelectedBuild,
}) {
  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Regular Collections</h2>
        <button
          onClick={() => onNavigate("customize")}
          className="flex items-center bg-cyan-600 text-white px-6 py-3 rounded-3xl hover:bg-cyan-500 transition font-medium shadow-sm"
        >
          <Plus className="w-5 h-5 mr-2" /> New Build
        </button>
      </div>

      {builds.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl shadow-sm p-12 text-center">
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
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
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
      )}
    </section>
  );
}
