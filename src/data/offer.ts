import image1 from "@/assets/mfs1.jpg";
import image2 from "@/assets/mfs2.jpg";
import image3 from "@/assets/mfs3.jpg";
import image4 from "@/assets/mfs4.jpg";
import image5 from "@/assets/mfs5.jpg";

import { StaticImageData } from "next/image";

export type Offer = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  img: StaticImageData;
  discount: string;
  features: string[];
  terms: string;
  validity: string;
  code?: string;
};

export const OFFERS_DATA: Offer[] = [
  {
    id:'5c72d644-e659-4eb9-a2bf-056dee932544',
    title: "Flight Booking Special",
    subtitle: "Get Up To 10% Discount",
    description: "Book your domestic or international flights through our platform and enjoy instant discounts on all major airlines. Perfect for your next business trip or vacation!",
    img: image1,
    discount: "10% OFF",
    features: [
      "Applicable on all airlines",
      "Instant discount at checkout",
      "No minimum booking amount",
      "Extra rewards points earned",
      "Free cancellation options"
    ],
    terms: "Discount applies to base fare only. Not valid with other promotions.",
    validity: "Until December 31, 2025",
    code: "FLY10"
  },
  {
    id:"a97c56da-10ac-4d53-a5e9-94252ab2de9f",
    title: "QU Cash Payment Deal",
    subtitle: "Up To 70% Discount on Hotels & Dining",
    description: "Pay with QU Cash at participating hotels and restaurants to unlock massive savings. The more you use QU Cash, the more you save on your lifestyle expenses!",
    img: image2,
    discount: "70% OFF",
    features: [
      "Instant discounts at checkout",
      "Over 500+ participating venues",
      "No upper limit on savings",
      "Exclusive premium partners",
      "Double discounts on weekends"
    ],
    terms: "Discount percentage varies by merchant. Minimum transaction amount may apply.",
    validity: "Ongoing",
    code: "QCASH70"
  },
  {
    id:"b6f9a5ca-7087-4591-aa7a-fb042f60c131",
    title: "Air Ticket Promotion",
    subtitle: "15% Off All Bookings",
    description: "Special limited-time offer for all air ticket reservations made through our mobile app. Save on your next adventure with this exclusive deal!",
    img: image3,
    discount: "15% OFF",
    features: [
      "All domestic and international routes",
      "Applicable on economy and business class",
      "Extra baggage allowance",
      "Priority boarding included",
      "24/7 customer support"
    ],
    terms: "Must book through mobile app. Blackout dates may apply.",
    validity: "Until August 30, 2025",
    code: "AIR15"
  },
  {
    id:"6162a0f0-f449-4588-a805-af2e2609733b",
    title: "GrameenPhone Recharge",
    subtitle: "Unlimited Cashback Offers",
    description: "Recharge your GrameenPhone mobile balance and get cashback on every transaction. The more you recharge, the more you earn back!",
    img: image4,
    discount: "Cashback",
    features: [
      "5-15% cashback on every recharge",
      "No upper limit on cashback",
      "Instant balance update",
      "Bonus data packs included",
      "Special offers for auto-pay users"
    ],
    terms: "Cashback percentage varies by recharge amount. Valid for prepaid users only.",
    validity: "Permanent offer",
    code: "GPCASH"
  },
  {
    id:"ae23e30a-3eed-4e43-aeb4-03407d6a9a0f",
    title: "Instant Bank Bonus",
    subtitle: "Get ৳50 Bonus on ৳4950 Add Money",
    description: "Transfer money from your bank account and receive instant bonus cash. Perfect for adding funds to your digital wallet or payment apps!",
    img: image5,
    discount: "৳50 Bonus",
    features: [
      "Instant bonus credited",
      "No service charges",
      "24/7 processing",
      "All major banks supported",
      "Bonus can be used immediately"
    ],
    terms: "Exact transfer amount of ৳4950 required. Limit one bonus per user per day.",
    validity: "Until further notice",
    code: "BANK50"
  }
];