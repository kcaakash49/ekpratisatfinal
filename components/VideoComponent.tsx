export default function() {
    return (
      <div className="relative h-screen">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/video/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
  
        {/* Content Overlay */}
        <div className="relative z-10">
          <div className="flex flex-col gap-6 p-28 px-3 max-w-7xl mx-auto">
            <h1 className="text-white font-bold text-3xl lg:text-6xl">
              Find your next <span className="text-slate-400">perfect</span>
              <br />
              place with ease
            </h1>
            <div className="text-gray-300 text-xs sm:text-sm">
              Ekpratisat is the best place to find your next perfect place to
              live.
              <br />
              We have a wide range of properties for you to choose from.
            </div>
            <div className="text-xs sm:text-sm text-blue-300 font-bold hover:underline">
              Let's get started...
            </div>
          </div>
        </div>
  
        {/* Overlay to darken video */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0"></div>
      </div>
    );
  }
  