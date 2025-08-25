import React from "react";
import Navbar from "../components/Navbar";
import { FaUsers, FaShieldAlt, FaHandshake, FaGlobe } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="text-center py-20 px-6 md:px-20">
        <h1 className="text-4xl md:text-6xl font-bold text-green-500">
          About SafeCity Hub
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          SafeCity Hub is a platform where communities unite to identify,
          report, and solve real-life issues. Together, we’re building safer,
          stronger, and more connected neighborhoods.
        </p>
        <img
          src="https://images.unsplash.com/photo-1555069855-e580a9adbf43?q=80&w=1283&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Community illustration"
          className="mx-auto mt-10 w-full md:w-1/2 rounded"
        />
      </section>

      {/* Mission Section */}
      <section className="bg-gray-900 py-16 px-6 md:px-20 rounded-2xl max-w-6xl mx-auto mb-12 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h2 className="text-3xl font-semibold text-green-400 mb-6">
            Our Mission
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Our mission is to empower individuals and communities by providing a
            platform where concerns are heard and acted upon. We believe in
            transparency, accountability, and collective action to make cities
            safer for everyone.
          </p>
        </div>
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1730342582682-1447653f62b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Q29tbXVuaXR5JTIwaWxsdXN0cmF0aW9uJTIwcGVvcGxlJTIwZ2F0aGVyaW5nJTIwdG9nZXRoZXJ8ZW58MHx8MHx8fDA%3D"
            alt="Mission illustration"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6 md:px-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-green-400 text-center mb-12">
          What We Stand For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <FaUsers className="text-5xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Community First</h3>
            <p className="text-gray-400 mb-4">
              We prioritize the voice of the community, ensuring that every
              concern is acknowledged and addressed.
            </p>
            <img
              src="https://plus.unsplash.com/premium_photo-1723575614216-bc1732f9dee2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fENvbW11bml0eSUyMGlsbHVzdHJhdGlvbiUyMHBlb3BsZSUyMGdhdGhlcmluZyUyMHRvZ2V0aGVyfGVufDB8fDB8fHww"
              alt="Community image"
              className="rounded-lg mx-auto"
            />
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <FaShieldAlt className="text-5xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Safety & Security</h3>
            <p className="text-gray-400 mb-4">
              Our platform promotes safety by enabling faster reporting and
              resolution of community issues.
            </p>
            <img
              src="https://images.unsplash.com/photo-1697549396341-7fdd7a09628a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q29tbXVuaXR5JTIwaWxsdXN0cmF0aW9uJTIwcGVvcGxlJTIwZ2F0aGVyaW5nJTIwdG9nZXRoZXIlMjBzYWZldHklMjBhbmQlMjBzZWN1cml0eXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Security image"
              className="rounded-lg mx-auto"
            />
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <FaHandshake className="text-5xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Collaboration</h3>
            <p className="text-gray-400 mb-4">
              We believe progress happens when people, leaders, and institutions
              work together.
            </p>
            <img
              src="https://plus.unsplash.com/premium_photo-1664303080614-528e425206cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fENvbW11bml0eSUyMGlsbHVzdHJhdGlvbiUyMHBlb3BsZSUyMGdhdGhlcmluZyUyMHRvZ2V0aGVyJTIwY29sbGFib3JhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
              alt="Collaboration image"
              className="rounded-lg mx-auto"
            />
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center">
            <FaGlobe className="text-5xl text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Transparency</h3>
            <p className="text-gray-400 mb-4">
              We encourage openness and accountability so that solutions are
              fair and effective.
            </p>
            <img
              src="https://images.unsplash.com/photo-1752659504452-1736acab1662?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fENvbW11bml0eSUyMGlsbHVzdHJhdGlvbiUyMHBlb3BsZSUyMGdhdGhlcmluZyUyMHRvZ2V0aGVyJTIwdHJhbnNwZXJhbmN5fGVufDB8fDB8fHww"
              alt="Transparency image"
              className="rounded-lg mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-900 py-16 text-center px-6">
        <h2 className="text-3xl font-bold text-white">Be Part of the Change</h2>
        <p className="mt-4 text-white text-lg max-w-2xl mx-auto">
          Join SafeCity Hub today and help us build safer, stronger, and more
          resilient communities.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
