import React from "react";

function About() {
  return (
    <section className="bg-linear-to-b from-white via-amber-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-6 py-20 md:px-20 mt-20 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-12">

        
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
            <span className="bg-linear-to-r from-amber-500 to-yellow-300 text-transparent bg-clip-text">
              Redefining Streetwear
            </span>
            <br />
            with GenZ Energy ⚡
          </h2>

          <p className="text-gray-700 text-lg leading-relaxed dark:text-gray-200">
            <strong>Naro Store</strong> isn’t just fashion — it’s an <em>attitude</em>. 
            A rebellion against the ordinary. Built for the dreamers, hustlers, and creators 
            who turn the streets into their runway.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed dark:text-gray-200">
            Every stitch, every fabric, every drop of ink is chosen with one purpose — 
            to make you <span className="font-semibold text-amber-600">stand out</span>.
            From oversized hoodies to minimalist tees, our pieces tell <strong>your story</strong>.
          </p>

          <p className="text-gray-700 text-lg leading-relaxed dark:text-gray-200">
            With <strong>custom designs, eco-conscious materials,</strong> and ultra-fast delivery — 
            we’re crafting the next generation of streetwear.  
            This is more than clothing — it’s <span className="text-amber-600 font-semibold">self-expression</span>.
          </p>

        
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
            {[
              {
                title: "🎨 Design Your Vibe",
                desc: "Customize every detail. Be your own designer.",
              },
              {
                title: "🌍 Conscious Fashion",
                desc: "Made with love and sustainability in mind.",
              },
              {
                title: "🚀 Fast Shipping",
                desc: "Your drip delivered in 3–5 days.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/80 dark:bg-gray-700 backdrop-blur-sm p-5 rounded-2xl text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>

        
          <div className="mt-10 bg-gray-900 text-white py-6 px-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Our Vision 👁️</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              To make fashion more personal, more creative, and unapologetically bold.  
              We don’t follow trends — we <strong>set them</strong>.  
              Every collection starts with a spark — and ends with your individuality.
            </p>
          </div>
        </div>

      
        <div className="w-full md:w-1/2 relative flex flex-col gap-6">
        
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/6311652/pexels-photo-6311652.jpeg?auto=compress&cs=tinysrgb&w=800
"
              alt="Streetwear fashion model wearing hoodie"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black/80 to-transparent p-6">
              <h3 className="text-white text-2xl font-semibold">Own the Streets</h3>
              <p className="text-gray-300 text-sm">
                Style is temporary. Confidence is forever.
              </p>
            </div>
          </div>

          
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1600181953707-5a89fcb2f20a?auto=format&fit=crop&w=800&q=80



"
              alt="Trendy GenZ streetwear look"
              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-0 left-0 bg-amber-500 text-black font-bold text-sm px-4 py-2 rounded-br-xl shadow-md">
              100% GenZ Made 💥
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
