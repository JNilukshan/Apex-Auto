import rangeRoverImg from "../assets/langrover.png";
import landroverlogo from "../assets/landroverlogo.png";
import nissanGtrImg from "../assets/nissan.png";
import nissanGtrlogo from "../assets/nissanlogo.png";

import { Zap, Settings, Gauge, Car } from "lucide-react";

export default function HotCollectionsCard({ idx = 0 }) {
  const cardData = [
    {
      name: "Range Rover",
      model: "Evoque",
      engine: "1997 CC",
      power: "264.74 BHP",
      transmission: "6 Speed",
      engineType: "4 Cylinder",
      totalRun: "32,500km",
      price: 38700,
      image: rangeRoverImg,
      logo: landroverlogo,
      gradient: "from-orange-50 via-amber-50 to-orange-100",
    },
    {
      name: "Nissan GTR",
      model: "R35 Nismo",
      engine: "3799 CC",
      power: "591.4 BHP",
      transmission: "6 Speed",
      engineType: "6 Cylinder",
      totalRun: "9,254km",
      price: 187900,
      image: nissanGtrImg,
      logo: nissanGtrlogo,
      gradient: "from-gray-50 via-slate-100 to-gray-200",
    },
  ];

  const data = cardData[idx] || cardData[0];

  return (
    <div
      className={`bg-gradient-to-br ${data.gradient} rounded-3xl shadow-md p-6 flex items-center justify-between w-[560px] h-[250px] overflow-hidden`}
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col justify-between h-full w-[48%]">
        {/* Logo + Name */}
        <div className="flex items-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow mr-3">
            <img
              src={data.logo}
              alt={`${data.name} Logo`}
              className="w-8 h-8 object-contain"
            />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{data.name}</h3>
            <p className="text-sm text-gray-500">{data.model}</p>
          </div>
        </div>

        {/* Car Image */}
        <div className="flex justify-center items-center w-full">
          <img
            src={data.image}
            alt={data.name}
            className="w-[200px] h-[110px] object-contain drop-shadow-xl"
          />
        </div>

        {/* Price */}
        <div>
          <p className="text-[11px] text-gray-400 uppercase mb-1 tracking-wide">
            Asking Price
          </p>
          <div className="text-2xl font-bold text-gray-900">
            ${data.price.toLocaleString()}
            <span className="text-sm text-gray-400 ml-1">USD</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="grid grid-cols-2 gap-2 w-[44%]">
        {/* 4 Spec Boxes */}
        <SpecBox
          icon={<Zap className="text-orange-500 w-4 h-4" />}
          text={data.engine}
          color="bg-orange-100"
        />
        <SpecBox
          icon={<Gauge className="text-indigo-500 w-4 h-4" />}
          text={data.power}
          color="bg-indigo-100"
        />
        <SpecBox
          icon={<Settings className="text-green-600 w-4 h-4" />}
          text={data.transmission}
          color="bg-green-100"
        />
        <SpecBox
          icon={<Settings className="text-blue-500 w-4 h-4" />}
          text={data.engineType}
          color="bg-blue-100"
        />

        <div className="col-span-2 bg-green-100 rounded-2xl p-2 flex items-center justify-center h-[45px] shadow-sm mt-7 pt-6">
          <div className="flex items-center justify-center -translate-y-2">
            <div className="w-6 h-6 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center mr-2 shadow-sm border border-white/20">
              <Car className="text-green-600 w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-gray-800">
              Total Run: {data.totalRun}
            </span>
          </div>
        </div>
     </div>
    </div>
  );
}

function SpecBox({ icon, text, color }) {
  return (
    <div
      className={`${color} rounded-2xl flex flex-col items-center justify-center py-4 h-[60px] shadow-sm hover:shadow-md transition-all`}
    >
      <div className="w-7 h-7 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center mb-1 shadow-sm border border-white/20">
        {icon}
      </div>
      <span className="text-xs font-semibold text-gray-800 text-center">
        {text}
      </span>
    </div>
  );
}
