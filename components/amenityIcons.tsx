import { FaParking, FaCouch, FaWater, FaSwimmingPool, FaSatelliteDish, FaWifi, FaSolarPanel, FaHotel, FaCarBattery, FaPhone, FaTools, FaShieldAlt, FaUserShield, FaChild } from "react-icons/fa";
import { GiBathtub, GiCctvCamera, GiGymBag, GiKitchenKnives, GiBrickWall, GiElevator, GiWaterTank, GiVacuumCleaner, GiWrench, GiGrass } from "react-icons/gi";
import { MdOutlineAir, MdBalcony, MdDeck, MdSecurity, MdOutlineBedroomParent, MdMicrowave, MdLocalLaundryService } from "react-icons/md";
import { TbWashMachine } from "react-icons/tb";
import { RiWaterFlashFill, RiContrastDrop2Fill } from "react-icons/ri";
import { BsHouseDoorFill, BsFillTreeFill } from "react-icons/bs";
import { IoWaterSharp } from "react-icons/io5";

const amenityIcons: Record<string, JSX.Element> = {
    "Parking": <FaParking />, // Parking space
    "Furnished": <FaCouch />, // Furnished property
    "Drainage": <GiWrench />, // Drainage system
    "Safety Tank": <RiContrastDrop2Fill />, // Underground waste storage tank
    "Lawn": <BsFillTreeFill />, // Lawn or garden
    "Jacuzzi": <GiBathtub />, // Jacuzzi or hot tub
    "Garage": <BsHouseDoorFill />, // Garage
    "Air Condition": <MdOutlineAir />, // Air conditioning
    "Balcony": <MdBalcony />, // Balcony
    "Deck": <MdDeck />, // Deck
    "Fencing": <GiBrickWall />, // Fencing
    "Water Supply": <IoWaterSharp />, // Water supply
    "Garden": <BsFillTreeFill />, // Garden
    "CCTV": <GiCctvCamera />, // CCTV camera
    "Gym": <GiGymBag />, // Gym
    "Microwave": <MdMicrowave />, // Microwave
    "Modular Kitchen": <GiKitchenKnives />, // Modular kitchen
    "Swimming Pool": <FaSwimmingPool />, // Swimming pool
    "TV Cable": <FaSatelliteDish />, // TV cable
    "Washing Machine": <MdLocalLaundryService />, // Washing machine
    "Wifi": <FaWifi />, // Wi-Fi
    "Solar Water": <FaSolarPanel />, // Solar water heating
    "Water Well": <RiWaterFlashFill />, // Water well
    "Water Tank": <GiWaterTank />, // Water storage tank
    "Cafeteria": <FaHotel />, // Cafeteria
    "Electricity Backup": <FaCarBattery />, // Electricity backup
    "Intercom": <FaPhone />, // Intercom system
    "Internet": <FaWifi />, // Internet
    "Kids Playground": <FaChild />, // Kids playground
    "Lift": <GiElevator />, // Lift or elevator
    "Maintenance": <FaTools />, // Maintenance
    "Security Staff": <FaUserShield /> // Security staff
};

export default amenityIcons;