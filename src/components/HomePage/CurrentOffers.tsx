import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Image from "next/image";
import image1 from "@/assets/mfs1.jpg";
import image2 from "@/assets/mfs2.jpg";
import image3 from "@/assets/mfs3.jpg";
import image4 from "@/assets/mfs4.jpg";
import image5 from "@/assets/mfs5.jpg";
import { Button } from "../ui/button";

const offers = [
  {
    id: 1,
    name: "offer1",
    img: image1,
  },
  {
    id: 2,
    name: "offer2",
    img: image2,
  },
  {
    id: 3,
    name: "offer3",
    img: image3,
  },
  {
    id: 4,
    name: "offer4",
    img: image4,
  },
  {
    id: 5,
    name: "offer5",
    img: image5,
  },
];

const CurrentOffers = () => {
  return (
    <div className="my-10">
      <div>
        <h1 className="text-3xl font-semibold text-center text-gray-700 dark:text-white my-10">
          Current Offers
        </h1>
      </div>
      <div className="container mx-auto relative">
        {/* Carousel */}
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          {/* Carousel Content */}
          <CarouselContent>
            {offers.map((offer, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/3"
              >
                <div className="relative w-full h-64 border drop-shadow-lg ring-accent rounded-md">
                  {" "}
                  {/* Adjust height as needed */}
                  <Image
                    alt={offer.name}
                    src={offer.img}
                    sizes="100%"
                    className="rounded-lg w-full"
                  />
                  
                    <Button className="absolute cursor-pointer bg-pink-800 hover:bg-pink-900 bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 text-center mx-auto px-10">
                      Details
                    </Button>
                 
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg text-sm sm:text-base dark:text-black" />
          <CarouselNext className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 sm:p-3 shadow-lg text-sm sm:text-base dark:text-black" />
        </Carousel>
      </div>
    </div>
  );
};

export default CurrentOffers;
