import { Zap, Wrench, Palette, Gauge, Shield, Award, ChevronRight } from 'lucide-react';

export default function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        <img
          src="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Sports car"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            UNLEASH YOUR RIDE'S
            <br />
            <span className="text-white animate-pulse border-b-4 border-white">TRUE POWER</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Sri Lanka's premier automotive performance and aesthetic modification specialists
          </p>
          <button
            onClick={() => onNavigate('customize')}
            className="group px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-gray-100 active:bg-gray-200 text-black rounded-2xl transition-all duration-300 font-bold text-base sm:text-lg shadow-lg shadow-white/50 hover:shadow-xl hover:shadow-white/70 flex items-center space-x-2 mx-auto touch-manipulation"
          >
            <span>CUSTOMIZE YOUR CAR</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="animate-bounce">
            <ChevronRight className="w-6 h-6 text-white rotate-90" />
          </div>
        </div>
      </section>

      <section id="services" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4">
            OUR <span className="text-white border-b-4 border-white">SERVICES</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-400 text-center mb-12 sm:mb-16 max-w-2xl mx-auto px-4">
            From engine tuning to custom body kits, we deliver unmatched quality and performance
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <ServiceCard
              icon={<Gauge className="w-12 h-12" />}
              title="Engine Tuning"
              description="ECU remapping, turbo upgrades, and performance optimization for maximum power output"
            />
            <ServiceCard
              icon={<Wrench className="w-12 h-12" />}
              title="Body Kits"
              description="Wide body conversions, spoilers, splitters, and aerodynamic enhancements"
            />
            <ServiceCard
              icon={<Palette className="w-12 h-12" />}
              title="Custom Paint"
              description="Premium paint jobs, wraps, and custom graphics designed to turn heads"
            />
            <ServiceCard
              icon={<Zap className="w-12 h-12" />}
              title="Lighting"
              description="LED upgrades, underglow systems, and custom headlight modifications"
            />
            <ServiceCard
              icon={<Shield className="w-12 h-12" />}
              title="Interior Mods"
              description="Racing seats, custom upholstery, and premium interior accessories"
            />
            <ServiceCard
              icon={<Award className="w-12 h-12" />}
              title="Full Builds"
              description="Complete vehicle transformations from concept to reality"
            />
          </div>
        </div>
      </section>

      <section id="builds" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16">
            FEATURED <span className="text-white border-b-4 border-white">BUILDS</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <BuildCard
              image="https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800"
              title="Nissan GTR R35"
              description="1200HP monster with full carbon body kit"
            />
            <BuildCard
              image="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=800"
              title="BMW M4 Competition"
              description="Wide body conversion with custom exhaust"
            />
            <BuildCard
              image="https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800"
              title="Toyota Supra A90"
              description="Stage 3 tuned with GT wing and custom wheels"
            />
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 md:mb-16">
            CLIENT <span className="text-white border-b-4 border-white">TESTIMONIALS</span>
          </h2>

          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <TestimonialCard
              name="Ravindu Silva"
              text="Apex transformed my Civic into a street beast. The attention to detail and quality is unmatched. Highly recommend!"
              rating={5}
            />
            <TestimonialCard
              name="Kasun Perera"
              text="Best modification shop in Colombo. The team knows what they're doing and the results speak for themselves."
              rating={5}
            />
            <TestimonialCard
              name="Nimesh Fernando"
              text="From consultation to final delivery, the experience was flawless. My car performs better than I ever imagined."
              rating={5}
            />
          </div>
        </div>
      </section>

      <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-gradient-to-t from-black to-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            READY TO <span className="text-white border-b-4 border-white">TRANSFORM</span> YOUR RIDE?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 sm:mb-8 px-4">
            Start building your dream car today with our interactive customizer
          </p>
          <button
            onClick={() => onNavigate('customize')}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-gray-100 active:bg-gray-200 text-black rounded-2xl transition-all duration-300 font-bold text-base sm:text-lg shadow-lg shadow-white/50 hover:shadow-xl hover:shadow-white/70 touch-manipulation"
          >
            START CUSTOMIZING
          </button>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, description }) {
  return (
    <div className="group p-4 sm:p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 hover:border-white transition-all duration-300 hover:transform hover:scale-105 active:scale-100">
      <div className="text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-lg sm:text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}

function BuildCard({ image, title, description }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl cursor-pointer touch-manipulation">
      <img src={image} alt={title} className="w-full h-64 sm:h-72 md:h-80 object-cover group-hover:scale-110 transition-transform duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent sm:via-black/50 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 sm:transform sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({ name, text, rating }) {
  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700">
      <div className="flex items-center space-x-1 mb-3 sm:mb-4">
        {[...Array(rating)].map((_, i) => (
          <span key={i} className="text-white text-lg sm:text-xl">★</span>
        ))}
      </div>
      <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4 italic">"{text}"</p>
      <p className="text-white font-bold text-sm sm:text-base">— {name}</p>
    </div>
  );
}
