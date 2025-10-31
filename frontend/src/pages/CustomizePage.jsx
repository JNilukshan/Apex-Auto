import { useState, useEffect } from "react";
import { RotateCcw, Save, Palette } from "lucide-react";
import { useAuth } from "../context/useAuth";
import api from "../services/api";
import SilverGradientBackground from "../components/SilverGradientBackground";

export default function CustomizePage({ onNavigate }) {
  const { user } = useAuth();
  const [carModels, setCarModels] = useState([]);
  const [colors, setColors] = useState([]);
  const [selectedCarModel, setSelectedCarModel] = useState(null);
  const [bodyColor, setBodyColor] = useState("#dc2626");
  const [parts, setParts] = useState([]);
  const [selectedParts, setSelectedParts] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState("Engine");
  const [totalPrice, setTotalPrice] = useState(0);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: "Engine", name: "Engine" },
    { id: "Suspension", name: "Suspension" },
    { id: "Exterior", name: "Exterior" },
    { id: "Wheels", name: "Wheels" },
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (carModels.length > 0 && !selectedCarModel) {
      setSelectedCarModel(carModels[0]);
    }
  }, [carModels, selectedCarModel]);

  useEffect(() => {
    if (colors.length > 0 && bodyColor === "#dc2626") {
      setBodyColor(colors[0].hexValue);
    }
  }, [colors, bodyColor]);

  useEffect(() => {
    const total = Array.from(selectedParts).reduce((sum, partId) => {
      const part = parts.find((p) => p.id === partId);
      return sum + (part?.price || 0);
    }, 0);
    setTotalPrice(total);
  }, [selectedParts, parts]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [services, carModelsData, colorsData] = await Promise.all([
        api.getServices(),
        api.getCarModels(),
        api.getColors(),
      ]);
      setCarModels(carModelsData || []);
      setColors(colorsData || []);
      const categorizedParts = services.map((service) => {
        let category = "Engine";
        const name = service.name.toLowerCase();
        if (
          name.includes("suspension") ||
          name.includes("coilover") ||
          name.includes("sway") ||
          name.includes("lowering")
        ) {
          category = "Suspension";
        } else if (
          name.includes("body") ||
          name.includes("spoiler") ||
          name.includes("kit") ||
          name.includes("bumper")
        ) {
          category = "Exterior";
        } else if (
          name.includes("wheel") ||
          name.includes("tire") ||
          name.includes("rim")
        ) {
          category = "Wheels";
        } else if (
          name.includes("engine") ||
          name.includes("turbo") ||
          name.includes("intake") ||
          name.includes("exhaust")
        ) {
          category = "Engine";
        }
        return {
          id: service._id,
          name: service.name,
          description: service.description,
          price: service.price,
          category,
        };
      });
      setParts(categorizedParts);
    } catch (err) {
      console.error("Failed to load data:", err);
      setError("Failed to load data. Please try again.");
      setParts([]);
    } finally {
      setLoading(false);
    }
  };

  const togglePart = (partId) => {
    const newSelected = new Set(selectedParts);
    newSelected.has(partId) ? newSelected.delete(partId) : newSelected.add(partId);
    setSelectedParts(newSelected);
  };

  const handleReset = () => {
    if (carModels.length > 0) setSelectedCarModel(carModels[0]);
    if (colors.length > 0) setBodyColor(colors[0].hexValue);
    setSelectedParts(new Set());
  };

  const handleSave = async () => {
    if (!user) return onNavigate("login");
    if (selectedParts.size === 0) return alert("Please select at least one part.");

    setSaving(true);
    setError(null);

    try {
      const selectedPartsArray = Array.from(selectedParts).map((partId) => {
        const part = parts.find((p) => p.id === partId);
        return { serviceId: part.id, name: part.name, price: part.price };
      });

      const buildData = {
        carModel: {
          brand: selectedCarModel?.brand || "Unknown",
          model: selectedCarModel?.model || "Unknown",
          year: selectedCarModel?.year || new Date().getFullYear(),
        },
        color: {
          primary: bodyColor,
          secondary: bodyColor,
          accent: bodyColor,
        },
        selectedParts: selectedPartsArray,
      };

      await api.createBuild(buildData);
      alert("Build saved successfully!");
      onNavigate("dashboard");
    } catch (err) {
      console.error("Failed to save build:", err);
      setError("Failed to save build. Please try again.");
      alert(`Failed to save build: ${err.message || "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  };

  const filteredParts = parts.filter((p) => p.category === activeCategory);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400">
        <div className="text-gray-700">Loading customization options...</div>
      </div>
    );
  }

  if (error && !parts.length) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400">
        <div className="text-center bg-white rounded-3xl p-8 shadow-lg">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen p-6">
      <SilverGradientBackground />
      <div className="relative mt-24 max-w-screen-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Build Your Dream Car
          </h1>
          <p className="text-gray-500">
            Customize your vehicle with real-time configuration options.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Car Preview & Color Selector */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="aspect-video rounded-xl overflow-hidden relative mb-4">
                <img
                  src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt={selectedCarModel?.displayName || "Car Build"}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply opacity-30"
                  style={{ backgroundColor: bodyColor }}
                />
              </div>

              {/* Car Model Selector */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Car Model
                </label>
                <select
                  value={selectedCarModel?._id || ""}
                  onChange={(e) => {
                    const selected = carModels.find(
                      (model) => model._id === e.target.value
                    );
                    setSelectedCarModel(selected);
                  }}
                  className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
                >
                  {carModels.map((model) => (
                    <option key={model._id} value={model._id}>
                      {model.displayName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Minimized Body Color Section */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-gray-600" />
                  <span>Body Color</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color._id}
                      onClick={() => setBodyColor(color.hexValue)}
                      title={color.name}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        bodyColor === color.hexValue
                          ? "border-gray-900 scale-110"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{ backgroundColor: color.hexValue }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Parts Section */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-bold mb-4 text-gray-900">
                Customization Parts
              </h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                      activeCategory === cat.id
                        ? "bg-gray-900 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredParts.map((part) => (
                  <div
                    key={part.id}
                    onClick={() => togglePart(part.id)}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition ${
                      selectedParts.has(part.id)
                        ? "border-gray-900 bg-gray-100"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                  >
                    <h3 className="font-bold text-gray-900 mb-1">{part.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {part.description}
                    </p>
                    <p className="text-gray-800 font-semibold">
                      LKR {part.price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-6 text-gray-900">
                Build Summary
              </h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between border-b pb-3 text-sm">
                  <span className="text-gray-500">Model</span>
                  <span className="font-medium text-gray-800 truncate ml-2">
                    {selectedCarModel?.displayName || "Select a model"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-3 text-sm">
                  <span className="text-gray-500">Parts Selected</span>
                  <span className="font-medium text-gray-800">
                    {selectedParts.size}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-500 text-sm">Total Price</span>
                  <span className="text-2xl font-bold text-gray-900">
                    LKR {totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleSave}
                  disabled={saving || selectedParts.size === 0}
                  className="w-full py-3 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  <span>{saving ? "Saving..." : "Save Build"}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="w-full py-3 bg-white text-gray-800 border border-gray-200 rounded-lg font-bold hover:bg-gray-100 transition flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
