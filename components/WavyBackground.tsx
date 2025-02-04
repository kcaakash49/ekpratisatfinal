import Header from "./Header";
import SearchBar from "./SearchBar";
import { SearchComponent } from "./SearchComponent";

export default function HeroSection() {
  return (
    <div
      className="relative w-full overflow-hidden transition-all duration-500 flex flex-col"
      style={{ minHeight: "clamp(60vh, 80vw, 90vh)" }} // Dynamic height
    >
      {/* Background Image */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-fixed bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg')",
        }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      {/* Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-[clamp(60vh,80vw,90vh)]">
        {/* Header */}
        <Header />

        {/* Centered Text & SearchComponent */}
        <div className="flex flex-1 flex-col items-center text-center px-4 sm:px-8 lg:px-28 max-w-7xl mx-auto font-custom justify-center">
          <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-6xl leading-tight">
            The Simplest <br /> Way to Find Property
          </h1>
          <p className="text-gray-200 text-xs sm:text-sm mt-4">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia. It is a paradisematic country.
          </p>

          {/* Search Bar */}
          <div className="pt-10 w-full">
            <SearchBar/>

          </div>
          
        </div>
        
        <div className="absolute bottom-20 w-full flex justify-center">
          
          <a
            href="#listing-section"
            className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full 
          hover:bg-green-600 transition-all duration-300 ease-in-out animate-bounce"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </a>
        </div>
      </div>

      {/* Wavy Bottom Shape */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          className="block w-full h-[80px] lg:h-[100px] xl:h-[120px] text-white"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,288L720,192L1440,288L1440,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Scroll Indicator */}
    </div>
  );
}
