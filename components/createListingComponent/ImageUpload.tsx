

export default function ({ formData, handleFileChange }: any) {
    return (
        <>
            <div>
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
                <input
                    type="file"
                    id="images"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                />
            </div>
        </>
    )
}