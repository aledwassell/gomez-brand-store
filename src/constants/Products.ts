import { Product } from "~/models/Product.model";

export const products: Product[] = [
  {
    id: "t-shirt",
    name: "T-shirt",
    price: 12.95,
    amount: 1,
    defaultImage: "https://placehold.net/5.png",
    hoverImage: "https://placehold.net/3.png",
  },
  {
    id: "gomez",
    name: "Gomez",
    price: 10,
    amount: 1,
    defaultImage: "https://placehold.net/4.png",
    hoverImage: "https://placehold.net/10.png",
  },
  {
    id: "gomez-hat",
    name: "Gomez Hat",
    price: 23,
    amount: 1,
    defaultImage: "https://placehold.net/1.png",
    hoverImage: "https://placehold.net/2.png",
  },
  {
    id: "gomezs-mystical-staff",
    name: "Gomez's Mystical Staff",
    price: 45.99,
    amount: 1,
    defaultImage: "https://placehold.net/7.png",
    hoverImage: "https://placehold.net/6.png",
  },
];
