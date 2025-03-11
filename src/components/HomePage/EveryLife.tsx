import image1 from "@/assets/our customer/wooman.jpg";
import image2 from "@/assets/our customer/bikeman.jpg";
import image3 from "@/assets/our customer/cycle man.jpg";
import image4 from "@/assets/our customer/farmer.jpg";
import image5 from "@/assets/our customer/vilage.jpg";
import image6 from "@/assets/our customer/mudi.jpg";
import image7 from "@/assets/our customer/garments.jpg";
import image8 from "@/assets/our customer/paikari.jpg";
import image9 from "@/assets/our customer/tea stall.jpg";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const images = [
  { id: 1, img: image1, title: "Woman" },
  { id: 2, img: image2, title: "Bikeman" },
  { id: 3, img: image3, title: "Cycle Man" },
  { id: 4, img: image4, title: "Farmer" },
  { id: 5, img: image5, title: "Village" },
  { id: 6, img: image6, title: "Mudi" },
  { id: 7, img: image7, title: "Garments" },
  { id: 8, img: image8, title: "Paikari" },
  { id: 9, img: image9, title: "Tea Stall" },
];

const EveryLife = () => {
  return (
    <section className="container mx-auto my-20 px-6 md:px-0">
      {/* Heading Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          QKash in Everyday Life
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          QKash is for everyone. We are here to make your life easier and better.
          Whether you&apos;re a farmer, a student, or a business owner, QKash is
          designed to simplify your daily transactions.
        </p>
      </div>

      {/* Image Grid Section */}
      <div className="border shadow-lg p-5 rounded-lg ring-1 ring-gray-200 overflow-hidden bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group overflow-hidden rounded-lg transform transition-all duration-300 hover:scale-110"
            >
              <Image
                src={image.img}
                alt={image.title}
                width={400}
                height={400}
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="text-center mt-12">
        <p className="text-lg text-gray-600 mb-6">
          Join thousands of happy users and experience the convenience of QKash
          today!
        </p>
        <Button className="bg-gradient-to-tr from-pink-900 to-pink-700 text-white px-8 py-6 rounded-lg font-semibold hover:scale-105 transition-colors duration-300">
         <Link href={'/register'}
         className=""> Get Started</Link>
        </Button>
      </div>
    </section>
  );
};

export default EveryLife;