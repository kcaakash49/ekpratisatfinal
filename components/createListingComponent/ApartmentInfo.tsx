import RoomInfo from "./RoomInfo";


export default function ({ formData, handleChange }: any) {
    return (
        <>
            <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700">Area (Sq ft)</label>
                <input
                    type="number"
                    id="area"
                    name="area"
                    value={formData.area ?? ""}
                    onChange={handleChange}
                    min="1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                    required
                />
            </div>
            <RoomInfo formData = {formData} handleChange = {handleChange}/>
        </>
    )
}