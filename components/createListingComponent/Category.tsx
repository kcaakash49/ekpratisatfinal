

export default function ({ formData, handleChange }: any) {
    return (
        <>
        <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <div className="flex gap-4 mt-2">
                {['rent', 'sell'].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="type"
                            value={type}
                            checked={formData.type === type}
                            onChange={handleChange}
                            className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                        />
                        <span className="text-sm font-medium text-gray-700 capitalize">{type}</span>
                    </label>
                ))}
            </div>
        </div>
        <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <div className="flex flex-wrap gap-4 mt-2">
                        {['house', 'flat', 'apartment', 'business', 'hostel_boys', 'hostel_girls', 'land','room'].map((category) => (
                            <label key={category} className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="category"
                                    value={category}
                                    checked={formData.category === category}
                                    onChange={handleChange}
                                    className="h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                                />
                                <span className="text-sm font-medium text-gray-700 capitalize">{category.replace('_', ' ')}</span>
                            </label>
                        ))}
                    </div>
                </div>
        </>
    )
}