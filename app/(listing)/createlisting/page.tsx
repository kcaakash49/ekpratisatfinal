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

    // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files) {
    //         setFormData({
    //             ...formData,
    //             images: Array.from(e.target.files),
    //         });
    //     }
    // };
    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
        const byteArray = new Uint8Array(buffer);
        let binary = '';
        byteArray.forEach((byte) => {
            binary += String.fromCharCode(byte);
        });
        return window.btoa(binary); // Converts binary string to Base64 string
    };
    
    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
        
            // Convert files to ArrayBuffer and then to Base64
            const base64Images = await Promise.all(
                files.map((file) =>
                    new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => {
                            const base64 = arrayBufferToBase64(reader.result as ArrayBuffer);
                            resolve(base64); // Convert ArrayBuffer to Base64 string
                        };
                        reader.onerror = (error) => reject(error);
                        reader.readAsArrayBuffer(file); // Convert file to ArrayBuffer
                    })
                )
            );
            console.log(base64Images);
            setFormData({
                ...formData,
                images: base64Images, // Set Base64 encoded images
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
            {/* <Header className='bg-black' /> */}
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
