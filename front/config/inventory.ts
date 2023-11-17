import { Image } from "sanity"

interface InventoryProduct {
  id: string
  name: string
  image: string
  images: string[]
  categories: string[]
  sizes: string[]
  colors: string[]
  price: number
  currency: string
  description: string
  sku: string
}

export interface SanityProduct extends Omit<InventoryProduct, "images"> {
  _id: string
  _createdAt: Date
  slug: string
  images: Image[]
}

export const inventory: InventoryProduct[] = [
  {
    id: "83ea928a-d834-4c6d-a588-4c93ec2de3c0",
    sku: "secret_garden_bouquet_1",
    name: "Secret Garden Bouquet",
    description: `Unveil the enchantment of our Secret Garden bouquet, where delicate roses and daisies are harmoniously complemented by the soothing aroma of eucalyptus. This floral masterpiece is a vision in pink and purple, perfect for adding a touch of mystique and romance to any occasion.`,
    price: 13900,
    image:
      "public/flowers/secret_garden_bouquet_1.png",
    images: [
      "public/flowers/secret_garden_bouquet_1.png",
    ],
    sizes: ["roses", "daisies"],
    categories: ["bouquet"],
    colors: ["pink"],
    currency: "USD",
  },
  {
    id: "c5e8b3c6-0a9d-4f7d-8fa2-48db32ab65ca",
    sku: "golden_grace_bouquet_1",
    name: "Golden Grace Bouquet",
    description: `Radiate warmth and grace with our Golden Grace bouquet, showcasing the vibrant beauty of sunflowers and statice, elegantly accented by fragrant eucalyptus. This floral ensemble is a timeless masterpiece, perfect for adding a touch of sunshine and elegance to any occasion.`,
    price: 5400,
    image:
      "public/flowers/secret_garden_bouquet_1.png",
    images: [
      "public/flowers/secret_garden_bouquet_1.png",
    ],
    sizes: ["sunflowers", "statices"],
    categories: ["bouquet"],
    colors: ["yellow"],
    currency: "USD",
  },
  {
    id: "aab34d23-9db7-47f9-8103-ecf045b86b6d",
    sku: "daydream_fantasy_bouquet_1",
    name: "Daydream Fantasy Bouquet",
    description: `Embark on a journey into Daydream Fantasy with a captivating bouquet of roses and ruscus, adorned with fragrant eucalyptus. This arrangement is a dream in purple and red, ideal for infusing an air of passion and imagination into any moment.`,
    price: 8400,
    image:
      "public/flowers/secret_garden_bouquet_1.png",
    images: [
      "public/flowers/secret_garden_bouquet_1.png",
    ],
    sizes: ["roses", "ruscus"],
    categories: ["bouquet"],
    colors: ["purple"],
    currency: "USD",
  },
  {
    id: "362f9d13-84e3-4dcd-a2a7-7c8f31e5037e",
    sku: "midnight_velvet_bouquet_1",
    name: "Midnight Velvet Bouquet",
    description: `The Midnight Velvet bouquet, featuring sumptuous roses and lush ruscus, is an embodiment of timeless elegance in rich red. It's the perfect choice for adding a touch of opulence and sophistication to your special occasions.`,
    price: 16800,
    image:
      "public/flowers/secret_garden_bouquet_1.png",
    images: [
      "public/flowers/secret_garden_bouquet_1.png",
    ],
    sizes: ["roses", "ruscus"],
    categories: ["bouquet"],
    colors: ["red"],
    currency: "USD",
  },
  {
    id: "f2b54e62-d69f-487b-90cc-c2923c0c6951",
    sku: "versailles_dream_bouquet_1",
    name: "Versailles Dreams Bouquet",
    description: `Capture the essence of Versailles Dreams with a resplendent bouquet of lilies in shades of pink, red, white, and orange. This arrangement exudes regal beauty, making it an ideal choice for commemorating moments of love, passion, and grace.`,
    price: 12000,
    image:
      "public/flowers/secret_garden_bouquet_1.png",
    images: [
      "public/flowers/secret_garden_bouquet_1.png",
    ],
    sizes: ["lilies"],
    categories: ["bouquet"],
    colors: ["white"],
    currency: "USD",
  },
  {
    id: "78d01c3b-9d4b-49b5-a980-150fda67c3ca",
    sku: "cornsilk_surprise_box_1",
    name: "Cornsilk Surprise Box",
    description: `The Cornsilk Surprise bouquet showcases the pristine allure of white lilies, creating a sense of purity and simplicity. This bouquet is perfect for occasions where understated elegance is desired.`,
    price: 7400,
    image:
      "public/flowers/secret_garden_bouquet_1.png",
    images: [
      "public/flowers/secret_garden_bouquet_1.png",
    ],
    sizes: ["lilies"],
    categories: ["box"],
    colors: ["white"],
    currency: "USD",
  },
  {
    id: "eed5787a-38b3-4e99-8c33-f88a0793c7dd",
    sku: "luxe_passion_box_1",
    name: "Luxe Passion Box",
    description: `Exude an air of pure romance with our Luxe Passion bouquet, featuring stunning pink roses elegantly accented with the invigorating scent of eucalyptus. This arrangement is a symbol of love and tenderness, perfect for celebrating love in all its forms.`,
    price: 11000,
    image:
      "public/flowers/secret_garden_bouquet_1.png",
    images: [
      "public/flowers/secret_garden_bouquet_1.png",
    ],
    sizes: ["roses"],
    categories: ["box"],
    colors: ["pink"],
    currency: "USD",
  },
  {
    id: "2a7f4d08-ea08-4d1c-8f13-6e70c30e35e1",
    sku: "red_vibrancy_box_1",
    name: "Red Vibrancy Box",
    description: `The Red Vibrancy bouquet shines with the captivating allure of red roses. It's a classic choice for expressing deep love and passion, adding a bold statement of affection to any moment.`,
    price: 6500,
    image:
      "public/flowers/secret_garden_bouquet_1.png",
    images: [
      "public/flowers/secret_garden_bouquet_1.png",
    ],
    sizes: ["roses"],
    categories: ["box"],
    colors: ["red"],
    currency: "USD",
  },
  {
    id: "9bc24191-cb43-46c3-8f42-101f9352e964",
    sku: "welcome_baby_box_1",
    name: "Welcome Baby Box",
    description: `Celebrate the arrival of a precious new life with our Welcome Baby bouquet, combining the softness of white carnations and the joy of blue roses. This arrangement is a delightful way to welcome a newborn into the world.`,
    price: 14000,
    image:
      "public/flowers/secret_garden_bouquet_1.png",
    images: [
      "public/flowers/secret_garden_bouquet_1.png",
    ],
    sizes: ["carnations", "roses"],
    categories: ["box"],
    colors: ["blue"],
    currency: "USD",
  },
  {
    id: "b943feaa-24ec-4ab5-8f21-8b24f1b3ca6a",
    sku: "fall_flower_box_1",
    name: "Fall Flower Box",
    description: `Embrace the colors of autumn with our Fall Flower bouquet, featuring lilies, sunflowers, daisies, roses, and carnations in shades of orange and yellow. This arrangement captures the spirit of the season, making it perfect for fall festivities and celebrations.`,
    price: 10000,
    image:
      "public/flowers/secret_garden_bouquet_1.png",
    images: [
      "public/flowers/secret_garden_bouquet_1.png",
    ],
    sizes: ["lilies", "sunflowers", "daisies", "carnations"],
    categories: ["box"],
    colors: ["orange"],
    currency: "USD",
  },
  {
    id: "54d0f20e-07d2-41ef-8fa6-9368e24e5d91",
    sku: "simply_sweet_basket_1",
    name: "Simply sweet Basket",
    description: `The Simply Sweet bouquet exudes an aura of charm and innocence with its combination of white roses and delicate pink carnations. It's an ideal choice for moments of sweet sentiment and appreciation.`,
    price: 6700,
    image:
      "public/flowers/secret_garden_bouquet_1.png",
    images: [
      "public/flowers/secret_garden_bouquet_1.png",
    ],
    sizes: ["carnations", "roses"],
    categories: ["basket"],
    colors: ["white"],
    currency: "USD",
  },
  {
    id: "6e31b13f-28ad-4b33-8fb4-e5d628b2de2c",
    sku: "festival_floral_basket_1",
    name: "Festival Floral Basket",
    description: `Immerse yourself in the purity and simplicity of our Festival Floral bouquet, adorned with elegant white cones. This arrangement is perfect for adding a touch of natural beauty to any celebration.`,
    price: 19000,
    image:
      "public/flowers/secret_garden_bouquet_1.png",
    images: [
      "public/flowers/secret_garden_bouquet_1.png",
    ],
    sizes: ["cones"],
    categories: ["basket"],
    colors: ["white"],
    currency: "USD",
  },
  {
    id: "76c8d200-d8ea-4b6f-8f84-71ea34e27420",
    sku: "luminous_basket_1",
    name: "Luminous Basket",
    description: `Radiate with the Luminous bouquet, featuring pristine white roses and lush hydrangeas. This arrangement embodies purity and serenity, making it an excellent choice for moments of tranquility and reflection.`,
    price: 14000,
    image:
      "public/flowers/secret_garden_bouquet_1.png",
    images: [
      "public/flowers/secret_garden_bouquet_1.png",
    ],
    sizes: ["hydrangeas", "roses"],
    categories: ["basket"],
    colors: ["white"],
    currency: "USD",
  },
  {
    id: "8f4a2fb2-7a06-4a3a-8f18-f103f7c36a50",
    sku: "loving_you_basket_1",
    name: "Loving You Basket",
    description: `Declare your love with the Loving You bouquet, a stunning arrangement of deep red roses. It's the perfect choice for expressing your affection and devotion to someone special.`,
    price: 10900,
    image:
      "public/flowers/secret_garden_bouquet_1.png",
    images: [
      "public/flowers/secret_garden_bouquet_1.png",
    ],
    sizes: ["roses"],
    categories: ["basket"],
    colors: ["red"],
    currency: "USD",
  },
  {
    id: "a92f81de-d4d8-4905-8f31-0cf4d865f14d",
    sku: "suddenly_spring_basket_1",
    name: "Suddenly Spring Basket",
    description: `Welcome the beauty of spring with the Suddenly Spring bouquet, showcasing roses, daisies, and lilies in shades of pink, white, and purple. This arrangement is a breath of fresh air, perfect for celebrating the rejuvenation of nature and life.`,
    price: 18000,
    image:
      "public/flowers/secret_garden_bouquet_1.png",
    images: [
      "public/flowers/secret_garden_bouquet_1.png",
    ],
    sizes: ["daisies"],
    categories: ["basket"],
    colors: ["pink"],
    currency: "USD",
  },
  
]
