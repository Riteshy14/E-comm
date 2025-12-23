import Footer from "../component/Footer";
import { TopBar } from "../component/TopBar";
import { FaLeaf, FaAward, FaUsers, FaUserCircle } from "react-icons/fa";

export function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar icon={"search_icon.png"} />

      {/* Hero Section */}
      <section className="relative w-full h-[500px] bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1400&q=80"
          alt="E-comm clothing"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center px-6">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            About E-comm
          </h1>
          <p className="text-white md:text-lg max-w-3xl drop-shadow-md">
            We create timeless, high-quality apparel that celebrates your authentic self. From daily moments to life’s milestones, E-comm is your trusted companion in style and comfort.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <p className="mb-4">
              Founded with a mission to craft apparel that blends style, comfort, and authenticity, E-comm has grown into a brand trusted by thousands of customers. Each piece is designed to last, celebrate life’s moments, and reflect your unique style.
            </p>
            <p>
              We are committed to sustainability, quality, and timeless designs that make your wardrobe both functional and memorable.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80"
              alt="Our team"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Features / Values */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
              <FaAward className="text-5xl text-blue-600" />
              <h3 className="text-xl font-semibold">Premium Quality</h3>
              <p className="text-gray-600">
                Every garment is crafted with care and premium materials for comfort and durability.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
              <FaLeaf className="text-5xl text-green-500" />
              <h3 className="text-xl font-semibold">Sustainable Practices</h3>
              <p className="text-gray-600">
                Eco-friendly materials and production methods to protect our planet.
              </p>
            </div>

            <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
              <FaUsers className="text-5xl text-yellow-500" />
              <h3 className="text-xl font-semibold">Trusted by Customers</h3>
              <p className="text-gray-600">
                Thousands of happy customers rely on E-comm for quality and style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section with Profile Icons */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Meet the Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { role: "Founder" },
            { role: "Designer" },
            { role: "Marketing" },
            { role: "Operations" },
          ].map((member, index) => (
            <div key={index} className="flex flex-col items-center bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition">
              <FaUserCircle className="text-7xl text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold">Ritesh Yadav</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
