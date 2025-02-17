"use client"

import { createListingAction } from '@/action/createListingAction';
import ApartmentInfo from '@/components/createListingComponent/ApartmentInfo';
import Category from '@/components/createListingComponent/Category';
import GeneralInformation from '@/components/createListingComponent/GeneralInformation';
import HouseInfo from '@/components/createListingComponent/HouseInfo';
import ImageUpload from '@/components/createListingComponent/ImageUpload';
import LandInfo from '@/components/createListingComponent/LandInfo';
import RoomInfo from '@/components/createListingComponent/RoomInfo';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import { CreateListingSchema } from '@/zod/schema';
import { useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent, useEffect } from 'react';

const CreateListingForm = () => {
    // State management
    const [formData, setFormData] = useState<CreateListingSchema>({
        title: '',
        description: '',
        price: 1,
        type: 'rent',
        category: 'house',
        location: '',
        bedrooms: null,
        bathrooms: null,
        images: [],
        landArea: null,
        numberOfFloors: null,
        houseArea: null,
        area: null
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'message' | 'error'>('idle')
    const router = useRouter();
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'bedrooms' || name === 'bathrooms' || name === 'price' || name === 'landArea' || name === 'numberOfFloors' || name === 'houseArea' || name === 'area' ? Number(value) : value,
        });
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({
                ...formData,
                images: Array.from(e.target.files),
            });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setFormStatus('idle')
        setLoading(true)
        // await new Promise(resolve => setTimeout(resolve, 5000));


        const response: any = await createListingAction(formData)
        console.log("Response", response)
        setLoading(false)
        if (response.error) {
            setError(response.error)
            setFormStatus('error')
            return
        }
        console.log(message)
        setMessage(response.message)
        setFormStatus('message')
        router.push("/")


    };

    useEffect(() => {
        if (formData.category === "house"){
            setFormData(prev => ({
                ...prev,
                area: null
            }))
        } else if (formData.category === "land"){
            setFormData(prev => ({
                ...prev,
                bedrooms: null,
                bathrooms: null,
                houseArea: null,
                numberOfFloors: null,
                area: null,
        
            }))
        } else if (formData.category === "apartment" || formData.category === "business" || formData.category === "flat"){
            setFormData(prev => ({
                ...prev,
                landArea: null,
                houseArea: null,
                numberOfFloors: null
            }))
        } else if (formData.category === "room"){
            setFormData(prev => ({
                ...prev,
                numberOfFloors: null,
                area: null,
                houseArea: null,
                landArea: null
            }))
        } else if (formData.category === "hostel_boys" || formData.category === "hostel_girls"){
            setFormData(prev => ({
                ...prev,
                landArea: null,
                numberOfFloors: null,
                area: null,
                houseArea: null,
                bathrooms: null,
                bedrooms: null
            }))
        }
    },[formData.category])

    return (
        <>
            {/* <Header/> */}
            <div className='p-6'>

                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
                    <GeneralInformation formData={formData} handleChange={handleChange} />
                    <Category formData={formData} handleChange={handleChange} />
                    {formData.category === 'house' && <HouseInfo formData={formData} handleChange={handleChange} />}
                    {(formData.category === 'apartment' || formData.category === 'flat' || formData.category === 'business') && <ApartmentInfo formData={formData} handleChange={handleChange} />}
                    {formData.category === 'land' && <LandInfo formData={formData} handleChange={handleChange} />}
                    {formData.category === 'room' && <RoomInfo formData={formData} handleChange={handleChange} />}
                    <ImageUpload formData={formData} handleFileChange={handleFileChange} />
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${loading ? "bg-indigo-300" : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            }`}
                    >
                        {loading ? (
                            <Loading/>
                        ) : (
                            "Create Listing"
                        )}
                    </button>

                    <div>
                        {formStatus === 'message' && (
                            <div className="bg-green-500 text-white p-4 rounded-md text-center">
                                {message}
                            </div>
                        )}
                        {formStatus === 'error' && (
                            <div className="bg-red-500 text-white p-4 rounded-md text-center">
                                {error}
                            </div>
                        )}
                    </div>

                </form>
            </div>
        </>
    );
};

export default CreateListingForm;
