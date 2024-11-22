import React from 'react';

const LocationGallery = () => {
  const locations = [
    {
      id: 1,
      name: 'MARTIN PLACE',
      image: 'https://demo-morata.myshopify.com/cdn/shop/files/1_65038d9a-7f35-4d68-b955-f31fc1f4ff5b.jpg?v=1700021448&width=3840',
      address: '268 St, South New York/NY 98944',
      phone: '+222-1800-2628',
      email: 'aloshopify@alothemes.com',
      hours: {
        weekday: 'Mon - Friday: 9:00am - 6:00pm',
        weekend: 'Saturday - Sunday: 10:00am - 5:00pm'
      }
    },
    {
      id: 2,
      name: 'MARTIN PLACE',
      image: 'https://demo-morata.myshopify.com/cdn/shop/files/2.jpg?v=1700021448&width=3840',
      address: '268 St, South New York/NY 98944',
      phone: '+222-1800-2628',
      email: 'aloshopify@alothemes.com',
      hours: {
        weekday: 'Mon - Friday: 9:00am - 6:00pm',
        weekend: 'Saturday - Sunday: 10:00am - 5:00pm'
      }
    },
    {
      id: 3,
      name: 'MARTIN PLACE',
      image: 'https://demo-morata.myshopify.com/cdn/shop/files/6_3077088a-1914-4878-81bc-bde6f94fffed.jpg?v=1700021448&width=3840',
      address: '268 St, South New York/NY 98944',
      phone: '+222-1800-2628',
      email: 'aloshopify@alothemes.com',
      hours: {
        weekday: 'Mon - Friday: 9:00am - 6:00pm',
        weekend: 'Saturday - Sunday: 10:00am - 5:00pm'
      }
    },
    {
      id: 4,
      name: 'South Fulon',
      image: 'https://demo-morata.myshopify.com/cdn/shop/files/4_6e75904c-20ff-41ac-9d5a-2b7580f57ff5.jpg?v=1700021447&width=3840',
      address: '268 St, South New York/NY 98944',
      phone: '+222-1800-2628',
      email: 'aloshopify@alothemes.com',
      hours: {
        weekday: 'Mon - Friday: 9:00am - 6:00pm',
        weekend: 'Saturday - Sunday: 10:00am - 5:00pm'
      }
    },
    {
      id: 5,
      name: 'MARTIN PLACE',
      image: 'https://demo-morata.myshopify.com/cdn/shop/files/3.jpg?v=1700021447&width=3840',
      address: '268 St, South New York/NY 98944',
      phone: '+222-1800-2628',
      email: 'aloshopify@alothemes.com',
      hours: {
        weekday: 'Mon - Friday: 9:00am - 6:00pm',
        weekend: 'Saturday - Sunday: 10:00am - 5:00pm'
      }
    },
    {
      id: 6,
      name: 'MARTIN PLACE',
      image: 'https://demo-morata.myshopify.com/cdn/shop/files/1_65038d9a-7f35-4d68-b955-f31fc1f4ff5b.jpg?v=1700021448&width=3840',
      address: '268 St, South New York/NY 98944',
      phone: '+222-1800-2628',
      email: 'aloshopify@alothemes.com',
      hours: {
        weekday: 'Mon - Friday: 9:00am - 6:00pm',
        weekend: 'Saturday - Sunday: 10:00am - 5:00pm'
      }
    }
  ];

  return (
    <div className="container mx-auto px-4 pt-14 pb-10 rubik">
         <div className="text-center mb-8 px-6">
        <h2 className="text-sm font-medium mb-2 text-[#16BCDC] uppercase">
        Our perfect team
        </h2>
        <h1 className="text-2xl font-medium  text-gray-900">
        Awesomeness people
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Commodo sociosqu venenatis cras dolor sagittis integer luctus maecenas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((location) => (
          <div key={location.id} className="bg-white  overflow-hidden  transition-shadow duration-300">
            <div className="relative h-72 overflow-hidden rounded-xl">
              <img
                src={location.image}
                alt={location.name}
                className="w-full h-full object-cover  rounderd-xl transform hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <div className="pt-6 ">
              <h3 className="text-md font-semibold mb-2">{location.name}</h3>
              
              <div className="space-y-2 text-[#777789]">
                <p className="text-sm ">{location.address}</p>
                <p className="text-sm">United States {location.phone}</p>
                <p className="text-sm text-[#777789] hover:underline">
                  <a href={`mailto:${location.email}`}>{location.email}</a>
                </p>
                
                <div className="pt-4 space-y-1">
                  <p className="text-sm">{location.hours.weekday}</p>
                  <p className="text-sm">{location.hours.weekend}</p>
                </div>
              </div>
               <div className='mt-5 w-full h-[1px] bg-slate-100'></div>
              <button className="mt-6 inline-block  border-b-2 border-black hover:border-[#16BCDC] hover:text-[#16BCDC] transition-colors duration-300 text-sm font-medium">
                SEE DETAILS
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationGallery;