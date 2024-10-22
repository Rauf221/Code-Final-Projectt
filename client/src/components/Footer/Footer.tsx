import {
    FaTruck,
    FaLock,
    FaHeadset,
    FaShieldAlt,
    FaApple,
    FaGooglePlay,
    FaTwitter,
    FaFacebookF,
    FaPinterestP,
    FaTumblr,
    FaSnapchatGhost,
    FaTiktok,
  } from "react-icons/fa";
  
  const Footer = () => {
    return (
      <footer className="bg-[#1F2024] text-white py-10 rubik">
        {/* Container */}
        <div className="container mx-auto max-w-[1500px] px-6 lg:px-4">
          {/* Top Section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-8 border-b border-gray-700">
            {/* Free Delivery */}
            <div className="flex items-center space-x-3">
              <FaTruck className="text-teal-400" size={30} />
              <div>
                <h4 className="font-medium text-base">Free Delivery</h4>
                <p className="text-xs text-gray-400">For all orders over $120</p>
              </div>
            </div>
  
            {/* Safe Payment */}
            <div className="flex items-center space-x-3">
              <FaLock className="text-teal-400" size={30} />
              <div>
                <h4 className="font-medium text-base">Safe Payment</h4>
                <p className="text-xs text-gray-400">100% secure payment</p>
              </div>
            </div>
  
            {/* 24/7 Help Center */}
            <div className="flex items-center space-x-3">
              <FaHeadset className="text-teal-400" size={30} />
              <div>
                <h4 className="font-medium text-base">24/7 Help Center</h4>
                <p className="text-xs text-gray-400">Dedicated 24/7 support</p>
              </div>
            </div>
  
            {/* Shop With Confidence */}
            <div className="flex items-center space-x-3">
              <FaShieldAlt className="text-teal-400" size={30} />
              <div>
                <h4 className="font-medium text-base">Shop With Confidence</h4>
                <p className="text-xs text-gray-400">If goods have problems</p>
              </div>
            </div>
          </div>
  
          {/* Middle Section */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 py-8">
            {/* Download App */}
            <div>
              <h4 className="font-medium text-base mb-3">Download App</h4>
              <p className="text-xs text-gray-400 mb-4">
                Morata App is now available on App Store & Google Play. Get it now.
              </p>
              <div className="flex space-x-3 mb-4">
                <button className="flex items-center space-x-2 px-2 border-[2px] w-[400px]  bg-gray-800 ">
                  <FaApple size={28} className="border-r pr-2" />
                  
                  <div className="flex flex-col items-start  ">
                  <span className="text-[0.60rem] font-medium">Download it from</span>
                  <span className="text-[0.65rem] font-medium">APP STORE</span>
                  </div>
                  
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-md">
                  <FaGooglePlay size={20} />
                  <span className="text-xs">Google Play</span>
                </button>
              </div>
  
              {/* Social Icons */}
              <div className="flex space-x-3">
                <div className="text-white rounded-sm bg-cyan-500  h-8 w-8 text-xs text-center justify-center flex items-center">
                    <FaTwitter size={20} />
                </div>
                <div className="text-white rounded-sm bg-[#3C5B9B]  h-8 w-8 text-xs text-center justify-center flex items-center">
                    <FaFacebookF size={20} />
                </div>
                <div className="text-white rounded-sm bg-[#E92E2E]  h-8 w-8 text-xs text-center justify-center flex items-center">
                    <FaPinterestP size={20} />
                </div>
                <div className="text-white rounded-sm bg-[#203864]  h-8 w-8 text-xs text-center justify-center flex items-center">
                    <FaTumblr size={20} />
                </div>
                <div className="text-white rounded-sm bg-[#F6EA3C]  h-8 w-8 text-xs text-center justify-center flex items-center">
                    <FaSnapchatGhost size={20} />
                </div>
                <div className="text-black rounded-sm bg-white  h-8 w-8 text-xs text-center justify-center flex items-center">
                    <FaTiktok size={20} />
                </div>
              </div>
            </div>
  
            {/* My Account */}
            <div>
              <h4 className="font-medium text-base mb-3">My Account</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>Product Support</li>
                <li>Checkout</li>
                <li>Shopping Cart</li>
                <li>Wishlist</li>
                <li>Custom Link</li>
                <li>Redeem Voucher</li>
              </ul>
            </div>
  
            {/* Customer Service */}
            <div>
              <h4 className="font-medium text-base mb-3">Customer Service</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Report Abuse</li>
                <li>Submit a Dispute</li>
                <li>Policies & Rules</li>
                <li>Online Returns Policy</li>
              </ul>
            </div>
  
            {/* Help & Customer Care */}
            <div>
              <h4 className="font-medium text-base mb-3">Help & Customer Care</h4>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>New Customers</li>
                <li>How to use My Account</li>
                <li>Placing an Order</li>
                <li>Payment Methods</li>
                <li>Delivery & Dispatch</li>
                <li>Problems with your Order</li>
              </ul>
            </div>
  
            {/* Newsletter */}
            <div>
              <h4 className="font-medium text-base mb-3">Sign Up To Newsletter</h4>
              <p className="text-xs text-gray-400 mb-4">
                Join 60,000+ subscribers and get a new discount coupon every Saturday.
              </p>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Your email address..."
                  className="w-full px-4 py-2 bg-gray-800 text-white text-xs rounded-l-md focus:outline-none"
                />
                <button className="px-4 py-2 bg-teal-400 text-white rounded-r-md text-xs">
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                By providing your email address, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>
  
          {/* Bottom Section */}
          <div className="flex flex-col lg:flex-col justify-center  items-center py-4 pt-16 border-t border-gray-700">
            <ul className="flex flex-wrap justify-center lg:justify-start space-x-4 text-xs text-gray-400 mb-4 lg:mb-8">
              <li>ABOUT US</li>
              <li>CUSTOMER SERVICE</li>
              <li>PRIVACY POLICY</li>
              <li>SITE MAP</li>
              <li>ADVANCED SEARCH</li>
              <li>CONTACT US</li>
            </ul>
            <div className="flex space-x-4">
              <img src="https://demo-morata.myshopify.com/cdn/shop/files/payments.png?v=1698422597&width=3840" alt="PayPal" className="h-6" />
             
            </div>
          </div>
  
          {/* Copyright */}
          <div className="text-center text-gray-500 mt-4 text-sm">
            Copyright<span className="text-[#16BCDC]">© Morata</span>. All Rights Reserved. Powered by{" "}
            <span className="text-[#16BCDC]">Alothemes</span>.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  