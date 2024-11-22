


export default function ErrorPage() {
 
 

 return (
   <div className="flex flex-col items-center justify-center h-screen  mt-20 mb-20 ">
     <div className="bg-white rounded-md flex  items-center justify-center flex-col ">
       <img
         src="https://demo-morata.myshopify.com/cdn/shop/files/404_540x.png?v=1704425830"
         alt="Opps! Page not found"
         className= "w-[500px] h-[500px] mb-4"
       />
       <h1 className="text-5xl font-bold mb-5">Opps! Page not found.</h1>
       <p className="text-gray-500 mb-4">
         Sorry for the inconvenience. Go to our homepage or check out our latest
         collections.
       </p>
       <a
         href="/home"
         className="bg-[#222222] rounded-full text-white px-8 py-4 text-sm font-bold hover:bg-[#16BCDC] transition-colors"
       >
         BACK TO HOMEPAGE
       </a>
     </div>
   </div>
 );
};

