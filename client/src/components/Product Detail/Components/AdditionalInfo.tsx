import React from "react";

const ProductSpecifications = () => {
  const specifications = [
    { label: "Color", value: "Space Black, Silver, Red" },
    { label: "Product Type", value: "New, Renewed, Refurbished, Used" },
    { label: "Storage", value: "64GB, 512GB, 2TB" },
    { label: "Brand", value: "Apple" },
    { label: "Display", value: "10.9-inch Liquid Retina display with True Tone" },
    { label: "Capacity", value: "128GB, 256GB, 512GB" },
    { label: "Chip (CPU)", value: "Apple M1 with 8-core CPU, 8-core GPU" },
    { label: "Camera and Video", value: "12MP – 4K Video" },
    { label: "Front Camera", value: "12MP Ultra Wide front camera with Center Stage and Smart HDR 3" },
    { label: "Battery Life", value: "Up to 10 hours on Wi-Fi, Up to 9 hours using cellular data network" },
    { label: "In the Box", value: "iPad Air, USB-C Charge Cable (1 meter), 20W USB-C Power Adapter" },
    { label: "Height", value: "9.74 inches (247.6 mm)" },
    { label: "Width", value: "7.02 inches (178.5 mm)" },
    { label: "Weight", value: "1.0 pound (458 grams) Wi-Fi model; 1.02 pounds (462 grams) Wi-Fi + Cellular" },
    { label: "Mobile Network", value: "5G" },
  ];

  return (
    <div className="container w-full mx-auto  py-4 mt-10 rubik">
      <div className= " rounded-md  overflow-hidden w-full">
        <table className="min-w-[1350px] p-24 border-collapse text-left text-sm text-gray-700">
          <tbody>
            {specifications.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-[#F1F5F6]" : "bg-white"} `}
              >
                <td className="px-4 py-3 font-medium text-gray-900 rounded-md">{item.label} </td>
                <td className="px-4 py-3">{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSpecifications;
