import { categoryList } from "@/utils/categorylist";
import CategoryCard from "./CategoryCard";

export default function (){
    
    return (
    <div className="max-w-7xl mx-auto py-10">
        <div className="text-3xl font-bold pb-5">Rents</div>
        <div className="flex gap-x-11">
           {
            categoryList?.map((item,index) => (
                <div key = {index} className="cursor-pointer">
                    <a href={item.path}>
                        <CategoryCard img = {item.img} type = {item.type} />

                    </a>
                </div>
            ))
           }

    </div>
    </div>

    )
}