
export default function({img,type}: {img: string, type: string}){
    return <div className="border-2 border-black">
        <div className="flex flex-col items-center p-2 hover:bg-slate-300">
            <div>
                <img src={img} alt="" className="h-48 w-48" />
            </div>
            <div className="font-bold font-custom">
                {type}
            </div>
        </div>
    </div>
}