import { BiConversation } from "react-icons/bi";
import {
  FaTruck,
  FaShieldAlt,
  FaApple,
  FaGooglePlay,
  FaTwitter,
  FaFacebookF,
  FaPinterestP,
  FaTumblr,
  FaSnapchatGhost,
  FaTiktok,
  FaRegCreditCard,
} from "react-icons/fa";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";

const Footer = () => {
  return (
    <footer className="bg-[#1F2024] text-white py-10 rubik">
      {/* Container */}
      <div className="container mx-auto max-w-[1500px] px-6 lg:px-4">
        {/* Top Section */}
        <div className="flex flex-wrap justify-around gap-8 pb-8 border-b border-gray-700">
          {/* Free Delivery */}
          <div className="flex items-center space-x-3 justify-center">
            <TbTruckDelivery className="text-[#16BCDC] hover:animate-bounce ease-in-out" size={40} />
            <div>
              <h4 className="font-medium text-base">Free Delivery</h4>
              <p className="text-sm text-gray-400">For all orders over $120</p>
            </div>
          </div>

          {/* Safe Payment */}
          <div className="flex items-center space-x-3 justify-center">
            <FaRegCreditCard className="text-[#16BCDC] hover:animate-bounce ease-in-out" size={40} />
            <div>
              <h4 className="font-medium text-base">Safe Payment</h4>
              <p className="text-sm text-gray-400">100% secure payment</p>
            </div>
          </div>

          {/* 24/7 Help Center */}
          <div className="flex items-center space-x-3 justify-center">
            <BiConversation className="text-[#16BCDC] hover:animate-bounce ease-in-out" size={40} />
            <div>
              <h4 className="font-medium text-base">24/7 Help Center</h4>
              <p className="text-sm text-gray-400">Dedicated 24/7 support</p>
            </div>
          </div>

          {/* Shop With Confidence */}
          <div className="flex items-center space-x-3 justify-center">
            <FaHandHoldingDollar className="text-[#16BCDC] hover:animate-bounce ease-in-out" size={40} />
            <div>
              <h4 className="font-medium text-base">Shop With Confidence</h4>
              <p className="text-sm text-gray-400">If goods have problems</p>
            </div>
          </div>
        </div>

        {/* Middle Section */}
        <div className="flex flex-wrap justify-between py-8 mb-20">
          {/* Download App */}
          <div className="w-full lg:w-[350px] mb-8 lg:mb-0">
            <h4 className="font-medium text-base mb-3">Download App</h4>
            <p className="text-sm text-gray-400 mb-4">
              Morata App is now available on App Store & Google <br />     Play. Get it
              now.
            </p>
            <div className="flex space-x-3 mb-10">
              <button className="flex items-center justify-evenly bg-[#2B2C31] space-x-2 p-2 w-40 h-10 rounded-sm py-0 border-[2px] border-[#525254] ">
                <FaApple size={28} className="border-r pr-2 border-[#525254]" />
                <div className="flex flex-col items-start">
                  <span className="text-[0.60rem] font-medium text-[#858587]">Download it from</span>
                  <span className="text-[0.65rem] font-medium">APP STORE</span>
                </div>
              </button>
              <button className="flex items-center bg-[#2B2C31] space-x-2 p-2 w-40 h-10 rounded-sm py-0 border-[2px] border-[#525254] justify-center">
                <FaGooglePlay size={28} className="border-r pr-2  border-[#525254]" />
                <div className="flex flex-col items-start">
                  <span className="text-[0.60rem] font-medium text-[#858587]">Download it from</span>
                  <span className="text-[0.65rem] font-medium">Google Play</span>
                </div>
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3 mt-10">
              <div className="text-white rounded-sm bg-cyan-500 h-8 w-8 text-sm text-center justify-center flex items-center">
                <FaTwitter size={20} />
              </div>
              <div className="text-white rounded-sm bg-[#3C5B9B] h-8 w-8 text-sm text-center justify-center flex items-center">
                <FaFacebookF size={20} />
              </div>
              <div className="text-white rounded-sm bg-[#E92E2E] h-8 w-8 text-sm text-center justify-center flex items-center">
                <FaPinterestP size={20} />
              </div>
              <div className="text-white rounded-sm bg-[#203864] h-8 w-8 text-sm text-center justify-center flex items-center">
                <FaTumblr size={20} />
              </div>
              <div className="text-white rounded-sm bg-[#F6EA3C] h-8 w-8 text-sm text-center justify-center flex items-center">
                <FaSnapchatGhost size={20} />
              </div>
              <div className="text-black rounded-sm bg-white h-8 w-8 text-sm text-center justify-center flex items-center">
                <FaTiktok size={20} />
              </div>
            </div>
          </div>

          {/* My Account / Customer Service / Help Section */}
          <div className="flex-1 flex justify-around lg:space-x-10 space-y-8 lg:space-y-0 lg:flex-row flex-col">
            <div>
              <h4 className="font-medium text-base mb-3">My Account</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Product Support</li>
                <li>Checkout</li>
                <li>Shopping Cart</li>
                <li>Wishlist</li>
                <li>Custom Link</li>
                <li>Redeem Voucher</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-base mb-3">Customer Service</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Report Abuse</li>
                <li>Submit a Dispute</li>
                <li>Policies & Rules</li>
                <li>Online Returns Policy</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-base mb-3">Help & Customer Care</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>New Customers</li>
                <li>How to use My Account</li>
                <li>Placing an Order</li>
                <li>Payment Methods</li>
                <li>Delivery & Dispatch</li>
                <li>Problems with your Order</li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full lg:w-[350px]">
            <h4 className="font-medium text-base mb-3">Sign Up To Newsletter</h4>
            <p className="text-sm text-gray-400 mb-4">
              Join 60,000+ subscribers and get a new discount coupon every
              Saturday.
            </p>
            <div className="flex mt-5">
              <input
                type="email"
                placeholder="Your email address..."
                className="w-full px-8 py-3 text-black text-sm rounded-l-sm focus:outline-none"
              />
              <button className="px-4 py-2 bg-[#16BCDC] text-white rounded-r-sm text-sm">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-5">
              By providing your email address, you agree to our Privacy Policy
              and Terms of Service.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-col justify-center items-center py-4 pt-16 border-t border-gray-700">
          <ul className="flex flex-wrap justify-center space-x-4 text-sm text-gray-400 mb-4">
            <li>ABOUT US</li>
            <li>CUSTOMER SERVICE</li>
            <li>PRIVACY POLICY</li>
            <li>SITE MAP</li>
            <li>ADVANCED SEARCH</li>
            <li>CONTACT US</li>
          </ul>
          <div className="flex space-x-4">
            <img
              src="https://demo-morata.myshopify.com/cdn/shop/files/payments.png?v=1698422597&width=3840"
              alt="PayPal"
              className="h-6"
            />
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 mt-4 text-sm">
          Copyright <span className="text-[#16BCDC]">© Morata</span>. All Rights
          Reserved. Powered by <span className="text-[#16BCDC]">Alothemes</span>.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
