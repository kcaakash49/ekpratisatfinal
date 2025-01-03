

export default function ({ title, description, price, type, images, location,bathrooms,rooms }: any) {
    return (
        <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden bg-white transform hover:scale-105 transition-transform duration-300">
            <div className="flex">
                {/* Image Section */}
                <div className="w-1/3">
                    <img
                        src={`data:image/jpeg;base64,${images[0].url}`}
                        alt={title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Content Section */}
                <div className="w-2/3 p-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">{description}</p>
          <p className="text-sm text-gray-700 mb-2">Location: <span className="font-medium text-gray-800">{location}</span></p>

          <div className="flex items-center space-x-4 mb-3">
            {/* Rooms Icon and Text */}
            <div className="flex items-center space-x-1">
              <img
                src="/room-icon.png" /* Replace with the path to your room icon */
                alt="Rooms"
                className="w-5 h-5"
              />
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-800">{rooms}</span> Rooms
              </p>
            </div>

            {/* Bathrooms Icon and Text */}
            <div className="flex items-center space-x-1">
              <img
                src="/bathroom-icon.png" /* Replace with the path to your bathroom icon */
                alt="Bathrooms"
                className="w-5 h-5"
              />
              <p className="text-sm text-gray-700">
                <span className="font-medium text-gray-800">{bathrooms}</span> Bathrooms
              </p>
            </div>
          </div>

          <button className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded mb-2 shadow-md hover:bg-red-600 transition-colors duration-200">
            {type}
          </button>
          <p className="text-xl font-semibold text-blue-600">R{price}</p>
        </div>
      </div>
    </div>
        
        
    )
}