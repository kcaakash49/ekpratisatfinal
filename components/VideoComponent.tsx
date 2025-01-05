import Header from "./Header";

export default function Home() {
  return (
    <div className="relative hidden sm:block">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover sm:block lg:block"
      >
        <source src="/video/time.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="relative z-10">
        {/* <Header className="bg-transparent" /> */}
        <div
          className="flex flex-col gap-6 p-4 sm:p-8 lg:p-28 px-3 max-w-7xl mx-auto font-custom
                     items-center text-center lg:items-start lg:text-left"
        >
          <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-6xl">
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
      <div
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-0 
                   hidden sm:block lg:block"
      ></div>
    </div>
  );
}
