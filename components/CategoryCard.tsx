export default function({ img, type }: { img: string, type: string }) {
    return (
        <div className="border-2 border-black rounded-lg overflow-hidden shadow-lg">
            <div className="flex flex-col items-center p-4 hover:bg-slate-300">
                <div className="sm:w-56 sm:h-56 lg:w-56 lg:h-56">
                    <img src={img} alt="" className="w-full h-full" />
                </div>
                <div className="font-bold font-custom text-center mt-2">
                    {type}
                </div>
            </div>
        </div>
    );
}
