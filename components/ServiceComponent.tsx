import Link from "next/link";

export default function ({className}:any){
    return  <div className={`absolute top-full left-0 mt-2 shadow-md rounded-md w-40 z-10 border border-gray-800 ${className}`}>
    {["Vastu", "Construction", "Interior Design", "Home Loan", "Property Management"].map((service) => (
      <Link
        key={service}
        href={`/${service.toLowerCase().replace(" ", "-")}`}
        className="block px-4 py-2 text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] to-[#C0C0C0] hover:from-[#FFC300] hover:to-[#D9D9D9] font-medium text-sm tracking-normal hover:scale-105 transform-gpu"
      >
        {service}
      </Link>
    ))}
  </div>
}