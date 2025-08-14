/* eslint-disable @typescript-eslint/no-explicit-any */
import { OFFERS_DATA } from "@/data/offer";
import Image from "next/image";


const OfferDetails = ({params}: any) => {
                                                 
const offer=OFFERS_DATA.find((offer)=>offer?.id==params?.id)

if(!offer){
return (
    <p>No offer found</p>
)
}

  return (
    <div className=" inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl ">
        {/* Header with close button */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-4 border-b flex justify-between items-center z-10">
          <div>
            <h2 className="text-xl font-bold">{offer.title}</h2>
            <p className="text-pink-600 dark:text-pink-400 font-medium">
              {offer.subtitle }
            </p>
          </div>
         
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image */}
          <div className="relative h-48 md:h-64 w-full mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
            <Image
              src={offer.img}
              alt={offer.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Discount badge */}
          <div className="bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 px-4 py-2 rounded-full inline-flex items-center mb-4">
            <span className="font-bold text-lg">{offer.discount}</span>
            {offer.code && (
              <span className="ml-3 bg-white dark:bg-gray-800 text-pink-600 dark:text-pink-300 px-3 py-1 rounded-full text-sm">
                Use code: {offer.code}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {offer.description}
          </p>

          {/* Features */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Offer Benefits:</h3>
            <ul className="space-y-2">
              {offer.features.map((feature: any, index: any) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-pink-500 mr-2 mt-0.5 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Terms */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-semibold mb-1">
                  Terms & Conditions:
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {offer.terms}
                </p>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Valid until: {offer.validity}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-pink-600 hover:bg-pink-700 py-6 text-lg flex-1">
              Avail Now
            </Button>
            <Button variant="outline" className="py-6 text-lg flex-1">
              Share Offer
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default OfferDetails;
