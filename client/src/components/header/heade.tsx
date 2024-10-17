import { FaUser, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { MdOutlineKeyboardArrowDown, MdSearch } from 'react-icons/md';
import { PiUser } from 'react-icons/pi';
import { RiShoppingCartLine } from 'react-icons/ri';

const Header = () => {
  return (
    <header className="bg-blue-800 text-white rubik">
      <div className="flex justify-between items-center px-4 py-2 text-sm">
        <div className="flex items-center space-x-2">
          <span className="flex items-center">
            <img src="/us-flag.png" alt="US Flag" className="h-4 w-4" />
            <span className="ml-1">English</span>
            <MdOutlineKeyboardArrowDown />
          </span>
          <span className="flex items-center">
            <span>United States (USD $)</span>
            <MdOutlineKeyboardArrowDown />
          </span>
        </div>
        <div>Need Help? +001 123 456 789</div>
      </div>

      <div className="flex justify-between items-center px-4 py-5 border-t-white border-t border-b border-b-white">
        {/* Logo */}
        <div className="">
        <img  className="w-36 mr-20" src="https://demo-morata.myshopify.com/cdn/shop/files/logo_150x@2x.png?v=1697202938" alt="" />
        </div>

        {/* Search Bar */}
        <div className="flex items-center w-[700px]  rounded-sm overflow-hidden border bg-white p-1">
          <select className="bg-white text-black text-sm px-3 py-1.5  overflow-hidden outline-none ">
            <option>All Categories</option>
            <option>Accesories</option>
            <option>Basketball</option>
            <option>Clothing</option>
            <option>Computer</option>
            <option>Computer & Dekstop</option>
            <option>Cutting Machine</option>
            <option>Dinning & Kitchen</option>
            <option>Drills</option>
            <option>electronic</option>
            <option>Electronics</option>
            <option>Fresh Vegetables</option>
            <option>Furniture</option>
            <option>Garden</option>
            <option>Handheld Power Drills</option>
            <option>Health & Beauty</option>
            <option>Jawelry</option>
            <option>Laptop</option>
            <option>Logitech</option>
            <option>makeup</option>
            <option>Sectional Sofas</option>
            <option>Smart Phones & Tablets</option>
            <option>Snack & Beverage</option>
            <option>T-Shirt</option>
            <option>Televisions</option>
            <option>Tools</option>
            <option>Watches</option>
            <option>Women’s</option>
            <option>Watches & Eyewear</option>

          </select>
          <div className='h-7 w-[1px]  ml-4 mr-4 flex items-center bg-white'>
            <div className='h-7  w-[1px]  bg-gray-300'></div>
          </div>
          <input
            type="text"
            placeholder="Search for products ..."
            className="flex-grow  py-1.5 text-black outline-none "
          />
          <button className="bg-cyan-400 px-2 py-1.5 rounded-sm">
            <MdSearch size={28} className='' />
          </button>
        </div>
        
        {/* Icons */}
        <div className="flex items-center space-x-6 ">
          <div className="flex items-center">
            <PiUser  className='text-4xl' />
            <span className="ml-1">Account</span>
          </div>
          <div className="flex items-center relative ">
            <FiHeart className='text-4xl' />
            <span className="ml-1">My Wishlist</span>
            <span className= " absolute top-0 left-5 bg-cyan-400 text-white text-xs rounded-full ml-1 px-2">0</span>
          </div>
          <div className="flex items-center relative gap-3">
            <RiShoppingCartLine  className='text-4xl' />
           <div className='flex flex-col text-sm '>
           <span className="ml-1  font-semibold text-gray-400">Your Cart</span>
           <span className="ml-1 font-bold">$0.00</span>
           </div>
            <span className="absolute top-0 left-5 bg-cyan-400 text-white text-xs rounded-full ml-1 px-2">0</span>
          </div>
        </div>
      </div>
    </header>

  );
};

export default Header;
