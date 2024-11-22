import React from 'react';

const TeamSection = () => {
  const teamMembers = [
    { 
      image:"https://demo-morata.myshopify.com/cdn/shop/files/img_our_team.png?v=1700020665&width=3840",
      name: 'Michael Anthony',
      role: 'Founder/CEO',
      description: 'Ced ut perspiciatis unde omnis iste natus error sitaccusantium doloremque laudan totam rem aperiam.',
    },
    { 
        image:"https://demo-morata.myshopify.com/cdn/shop/files/img_our_team_2.png?v=1700020666&width=3840",
      name: 'Alexandra Miller',
      role: 'Founder/CEO',
      description: 'Ced ut perspiciatis unde omnis iste natus error sitaccusantium doloremque laudan totam rem aperiam.',
    },
    {
        image:"https://demo-morata.myshopify.com/cdn/shop/files/img_our_team_3.png?v=1700020666&width=3840",
      name: 'Frank ge Bruyne',
      role: 'Founder/CEO',
      description: 'Ced ut perspiciatis unde omnis iste natus error sitaccusantium doloremque laudan totam rem aperiam.',
    },
    {
        image:"https://demo-morata.myshopify.com/cdn/shop/files/img_our_team.png?v=1700020665&width=3840",
      name: 'Helen Aleema',
      role: 'Founder/CEO',
      description: 'Ced ut perspiciatis unde omnis iste natus error sitaccusantium doloremque laudan totam rem aperiam.',
    },
  ];

  return (
    <div className="bg-white py-20 rubik">
       {/* Section Header */}
       <div className="text-center mb-8 px-6">
        <h2 className="text-md font-medium mb-2 text-[#16BCDC] uppercase">
          Why Choose Us
        </h2>
        <h1 className="text-3xl font-medium uppercase text-gray-900">
        Amazing People
        </h1>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Class aptent taciti sociosqu ad litora torquent per conubia nostra per inceptos vel pretium
        lectus qua. Nunc id cursus metus ididunt ut labore metus episcing.
        </p>
      </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="rounded-full w-52 h-52 overflow-hidden">
                <img
                  src={`${member.image}`}
                  alt={member.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="text-lg font-medium mt-4 mb-2">{member.name}</h3>
              <p className="text-gray-600  text-sm font-medium">{member.role}</p>
              <p className="text-gray-500 mt-2 text-center w-[90%]">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
  );
};

export default TeamSection;