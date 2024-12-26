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
import { CreateListingSchema } from '@/zod/schema';
import { useState, ChangeEvent, FormEvent } from 'react';

const CreateListingForm = () => {
    // State management
    const [formData, setFormData] = useState<CreateListingSchema>({
        title: '',
        description: '',
        price: 1,
        type: 'rent',
        category: 'house',
        location: '',
        bedrooms: 1,
        bathrooms: 1,
        images: [],
        landArea: 1,
        numberOfFloors: 1,
        houseArea: 1,
        area: 1
    });

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
        console.log('Form submitted:', formData);
        const response = await createListingAction(formData)
        console.log(response)
        
        // Add your submission logic here, e.g., server actions or API calls
    };

    return (
        <>
            <Header className='bg-black' />
            <div className='p-6'>

                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-6">
                    <GeneralInformation formData={formData} handleChange={handleChange} />
                    <Category formData={formData} handleChange={handleChange} />
                    {formData.category === 'house' && <HouseInfo formData={formData} handleChange={handleChange}/>}
                    {(formData.category === 'apartment' || formData.category ==='flat' || formData.category === 'business') && <ApartmentInfo formData = {formData} handleChange = {handleChange} />}
                    {formData.category === 'land' && <LandInfo formData = {formData} handleChange = {handleChange} />}
                    {formData.category === 'room' && <RoomInfo formData = {formData} handleChange = {handleChange} />}
                    <ImageUpload formData = {formData} handleFileChange = {handleFileChange} />
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Create Listing
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateListingForm;
