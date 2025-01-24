import { categoryList } from "@/utils/categorylist";
import CategoryCard from "./CategoryCard";

export default function () {
    return (
        <div id="category-section" className="max-w-7xl mx-auto py-10">
            <div className="text-3xl font-bold pb-5 text-center">Browse Properties</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
                {
                    categoryList?.map((item, index) => (
                        <div key={index} className="cursor-pointer">
                            <a href={item.path}>
                                <CategoryCard img={item.img} type={item.type} />
                            </a>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
