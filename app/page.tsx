import axios from "axios";
import Image from "next/image";
//make db call here for beter fetching works only on server component
const getListing = async() => {
  return {
    name: "Aakash KC",
    email: "kcaakash04@gmail.com"
  }
}
export default async function Home() {
  const listing = await getListing();
  return (
      <div>
              <div className='flex flex-col gap-6 p-28 px-3 max-w-7xl mx-auto'>
        <h1 className='text-black font-bold text-3xl lg:text-6xl'>
          Find your next <span className='text-slate-400'>perfect</span>
          <br />
          place with ease
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Ekpratisat is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <div className='text-xs sm:text-sm text-blue-300 font-bold hover:underline'
        >
          Let's get started...
        </div>
        <div className="flex flex-col">
          {listing.name} {listing.email}
        </div>
      </div>
      </div>
  );
}
