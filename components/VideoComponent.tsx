import Header from "./Header";

export default function() {
  return (
    <div className="relative min-h-screen">
      {/* Background Image with Parallax Effect */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-fixed bg-center bg-cover"
        style={{
          backgroundImage:
            "url('https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg')",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col">
        <Header />
        <div className="flex flex-col gap-6 px-4 sm:px-8 lg:px-28 max-w-7xl mx-auto font-custom min-h-[800px] justify-center">
          <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-6xl">
            Find your next <span className="text-slate-400">perfect</span>
            <br />
            place with ease
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm">
            Ekpratisat is the best place to find your next perfect place to
            live.
            <br />
            We have a wide range of properties for you to choose from.
          </p>
          <button className="mt-4 text-xs sm:text-sm text-blue-300 font-bold hover:underline">
            Let's get started...
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 w-full flex justify-center">
        <a
          href="#category-section"
          className="flex flex-col items-center text-white animate-bounce"
        >
          <div className="rounded-full border-2 border-white w-8 h-8 flex items-center justify-center">
            <span className="ion-ios-arrow-round-down"></span>
          </div>
          <span className="text-sm mt-2">Scroll</span>
        </a>
      </div>
    </div>
  );
}
