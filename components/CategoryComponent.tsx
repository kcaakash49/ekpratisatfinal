import { categoryList } from "@/utils/categorylist";
import CategoryCard from "./CategoryCard";

export default function() {
    return (
        <div id="category-section" className="max-w-7xl mx-auto py-10 px-4">
            <div className="text-3xl font-bold pb-5 text-center">Browse Properties</div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categoryList?.map((item, index) => (
                    <a href={item.path} key={index} className="w-full flex justify-center">
                        <CategoryCard img={item.img} type={item.type} />
                    </a>
                ))}
            </div>
        </div>
    );
}
