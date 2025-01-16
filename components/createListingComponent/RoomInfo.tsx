

export default function( {formData, handleChange} : any){
    return (
        <>
            <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Bedrooms</label>
                <input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.bedrooms ?? ""}
                    onChange={handleChange}
                    min="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    required
                />
            </div>

            <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Bathrooms</label>
                <input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms ?? ""}
                    onChange={handleChange}
                    min="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    required
                />
            </div>
        </>
    )
}