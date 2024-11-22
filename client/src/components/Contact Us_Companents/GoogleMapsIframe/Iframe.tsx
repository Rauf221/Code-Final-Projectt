import Link from 'next/link';
import React from 'react';

const LocationMapIframe = () => {
  return (
    <>
    <nav className="py-2 flex items-center justify-between border-b mb-10 ">
        <div className="flex items-center space-x-8">
          <div className="flex  text-gray-600">
            <Link href="/home" className="px-3 py-2 hover:text-[#16BCDC]">
              Home
            </Link>
            <span className="px-1 py-2">/</span>
            <Link href="/contact-us" className="px-3 py-2 hover:text-[#16BCDC]">
              Contact Us
            </Link>
          </div>
        </div>
      </nav>

    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.4110460614964!2d-122.08394518463974!3d37.38610077982909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5a5a1c2201d%3A0x37e623aedd6c80fb!2sBeverly%20St%2C%20Mountain%20View%2C%20CA%2094043%2C%20USA!5e0!3m2!1sen!2str!4v1623370800000!5m2!1sen!2str"
      width="100%"
      height="500"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
    </>
  );

};

export default LocationMapIframe;