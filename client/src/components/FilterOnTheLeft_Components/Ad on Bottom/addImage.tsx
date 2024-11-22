export default function AdImage() {
    return (
        <div className="overflow-hidden w-full mt-10 h-[600px] flex items-center justify-center">
            <img
                src="https://demo-morata.myshopify.com/cdn/shop/files/menu_2.png?v=1698913928&width=3840"
                className=" h-full object-cover transition-transform hover:scale-105 duration-1000"
                alt="ad"
            />
        </div>
    );
}
