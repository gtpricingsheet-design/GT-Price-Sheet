import type { Category } from './types'

export const DEFAULT_FRUIT: Category[] = [
  {
    id: "berry",
    icon: "🫐",
    name: "The Berry Collection",
    color: "#8C285A",
    items: [
      { name: "Strawberries x16", price: 28.00, available: true },
      { name: "Strawberries 12x400g (Driscoll)", price: 31.20, available: true },
      { name: "Strawberries x12 (Calinda)", price: 45.00, available: true },
      { name: "Blueberries (Driscoll) x12", price: 21.60, available: true },
      { name: "Blueberries x12", price: 24.00, available: true },
      { name: "Raspberries x12 (Onuba)", price: 26.40, available: true },
      { name: "Blackberries x12", price: 28.80, available: true },
      { name: "Cherries 30+ (2.5kg)", price: 34.00, available: false },
      { name: "Cherries 28/30 (5kg)", price: 50.00, available: false }
    ]
  },
  {
    id: "grapes",
    icon: "🍇",
    name: "Signature Grapes",
    color: "#6B3FA0",
    items: [
      { name: "Black Grape (PP x10)", price: 17.00, available: true },
      { name: "Black Grape (Loose)", price: 17.50, available: true },
      { name: "Green Grape (Loose)", price: 17.50, available: true },
      { name: "Green Grape (PP x10)", price: 18.00, available: true }
    ]
  },
  {
    id: "pears",
    icon: "🍐",
    name: "Estate Pear Selection",
    color: "#7A9C3A",
    items: [
      { name: "Conference (Belgium — Taste)", price: 18.50, available: true },
      { name: "Conference PP (10x1kg)", price: 14.00, available: true },
      { name: "Conference (Urifruit)", price: 15.00, available: true },
      { name: "Comice Pears", price: 22.00, available: true }
    ]
  },
  {
    id: "apples",
    icon: "🍎",
    name: "Heritage Apples",
    color: "#C23B22",
    items: [
      { name: "Royal Gala", price: 17.00, available: true },
      { name: "Braeburn", price: 17.00, available: true },
      { name: "Pink Lady", price: 22.00, available: true },
      { name: "Granny Smith", price: 17.00, available: true },
      { name: "Jazz", price: 19.00, available: true },
      { name: "Envy", price: 24.00, available: true }
    ]
  },
  {
    id: "citrus",
    icon: "🍊",
    name: "Citrus Grove",
    color: "#E67E22",
    items: [
      { name: "Oranges (Large)", price: 16.00, available: true },
      { name: "Oranges (Juicing)", price: 14.00, available: true },
      { name: "Lemons (125s)", price: 18.00, available: true },
      { name: "Limes (48s)", price: 14.00, available: true },
      { name: "Satsumas (Easy Peel)", price: 12.00, available: true },
      { name: "Clementines", price: 14.00, available: true },
      { name: "Grapefruit (Pink)", price: 18.00, available: true }
    ]
  },
  {
    id: "tropical",
    icon: "🥭",
    name: "Tropical Exotics",
    color: "#F39C12",
    items: [
      { name: "Bananas (18kg)", price: 18.00, available: true },
      { name: "Pineapple (Large)", price: 2.50, available: true },
      { name: "Mango (Ready)", price: 1.80, available: true },
      { name: "Papaya", price: 3.50, available: true },
      { name: "Passion Fruit (36s)", price: 18.00, available: true },
      { name: "Kiwi (36s)", price: 12.00, available: true },
      { name: "Coconut (Fresh)", price: 2.00, available: true }
    ]
  },
  {
    id: "melon",
    icon: "🍈",
    name: "Melon Selection",
    color: "#27AE60",
    items: [
      { name: "Watermelon (Whole)", price: 8.00, available: true },
      { name: "Cantaloupe", price: 3.50, available: true },
      { name: "Honeydew", price: 3.50, available: true },
      { name: "Galia", price: 3.50, available: true }
    ]
  }
]

export const DEFAULT_VEG: Category[] = [
  {
    id: "roots",
    icon: "🥕",
    name: "Root Vegetables",
    color: "#D35400",
    items: [
      { name: "Carrots (10kg)", price: 8.00, available: true },
      { name: "Parsnips (10kg)", price: 12.00, available: true },
      { name: "Beetroot (5kg)", price: 8.00, available: true },
      { name: "Swede", price: 1.20, available: true },
      { name: "Turnips (10kg)", price: 10.00, available: true },
      { name: "Celeriac", price: 2.50, available: true }
    ]
  },
  {
    id: "potatoes",
    icon: "🥔",
    name: "Potatoes",
    color: "#8B7355",
    items: [
      { name: "Maris Piper (25kg)", price: 14.00, available: true },
      { name: "King Edward (25kg)", price: 16.00, available: true },
      { name: "New Potatoes (10kg)", price: 12.00, available: true },
      { name: "Sweet Potato (6kg)", price: 14.00, available: true },
      { name: "Baby Potatoes (2.5kg)", price: 6.00, available: true }
    ]
  },
  {
    id: "onions",
    icon: "🧅",
    name: "Onions & Alliums",
    color: "#9B59B6",
    items: [
      { name: "Brown Onions (20kg)", price: 12.00, available: true },
      { name: "Red Onions (10kg)", price: 10.00, available: true },
      { name: "Spring Onions (12 bunches)", price: 8.00, available: true },
      { name: "Shallots (5kg)", price: 14.00, available: true },
      { name: "Leeks (5kg)", price: 10.00, available: true },
      { name: "Garlic (1kg)", price: 8.00, available: true }
    ]
  },
  {
    id: "brassicas",
    icon: "🥦",
    name: "Brassicas",
    color: "#27AE60",
    items: [
      { name: "Broccoli (5kg)", price: 12.00, available: true },
      { name: "Cauliflower (6s)", price: 10.00, available: true },
      { name: "Cabbage (Savoy)", price: 1.50, available: true },
      { name: "Cabbage (White)", price: 1.50, available: true },
      { name: "Cabbage (Red)", price: 1.80, available: true },
      { name: "Brussels Sprouts (5kg)", price: 10.00, available: true },
      { name: "Kale (200g x12)", price: 14.00, available: true }
    ]
  },
  {
    id: "salad",
    icon: "🥬",
    name: "Salads & Leaves",
    color: "#2ECC71",
    items: [
      { name: "Iceberg Lettuce (12s)", price: 12.00, available: true },
      { name: "Little Gem (20s)", price: 10.00, available: true },
      { name: "Romaine Hearts (6s)", price: 6.00, available: true },
      { name: "Mixed Leaves (500g)", price: 4.00, available: true },
      { name: "Rocket (500g)", price: 5.00, available: true },
      { name: "Spinach (500g)", price: 4.00, available: true },
      { name: "Watercress (12 bags)", price: 12.00, available: true }
    ]
  },
  {
    id: "tomatoes",
    icon: "🍅",
    name: "Tomatoes",
    color: "#E74C3C",
    items: [
      { name: "Vine Tomatoes (6kg)", price: 14.00, available: true },
      { name: "Cherry Tomatoes (3kg)", price: 16.00, available: true },
      { name: "Plum Tomatoes (6kg)", price: 12.00, available: true },
      { name: "Beef Tomatoes (5kg)", price: 14.00, available: true },
      { name: "Baby Plum (3kg)", price: 14.00, available: true }
    ]
  },
  {
    id: "peppers",
    icon: "🫑",
    name: "Peppers & Chillies",
    color: "#E91E63",
    items: [
      { name: "Mixed Peppers (5kg)", price: 14.00, available: true },
      { name: "Red Peppers (5kg)", price: 16.00, available: true },
      { name: "Green Peppers (5kg)", price: 12.00, available: true },
      { name: "Yellow Peppers (5kg)", price: 16.00, available: true },
      { name: "Red Chillies (1kg)", price: 12.00, available: true },
      { name: "Green Chillies (1kg)", price: 10.00, available: true }
    ]
  },
  {
    id: "cucumber",
    icon: "🥒",
    name: "Cucumbers & Courgettes",
    color: "#1ABC9C",
    items: [
      { name: "Cucumber (12s)", price: 10.00, available: true },
      { name: "Courgettes (5kg)", price: 10.00, available: true },
      { name: "Baby Courgettes (2kg)", price: 8.00, available: true }
    ]
  },
  {
    id: "mushrooms",
    icon: "🍄",
    name: "Mushrooms",
    color: "#795548",
    items: [
      { name: "Button Mushrooms (2.5kg)", price: 10.00, available: true },
      { name: "Chestnut Mushrooms (2.5kg)", price: 12.00, available: true },
      { name: "Portobello (2kg)", price: 10.00, available: true },
      { name: "Oyster Mushrooms (1kg)", price: 14.00, available: true },
      { name: "Shiitake (500g)", price: 10.00, available: true }
    ]
  },
  {
    id: "herbs",
    icon: "🌿",
    name: "Fresh Herbs",
    color: "#4CAF50",
    items: [
      { name: "Basil (12 pots)", price: 12.00, available: true },
      { name: "Coriander (12 bunches)", price: 10.00, available: true },
      { name: "Parsley (Flat) (12 bunches)", price: 10.00, available: true },
      { name: "Parsley (Curly) (12 bunches)", price: 10.00, available: true },
      { name: "Mint (12 bunches)", price: 12.00, available: true },
      { name: "Rosemary (12 bunches)", price: 14.00, available: true },
      { name: "Thyme (12 bunches)", price: 14.00, available: true },
      { name: "Chives (12 bunches)", price: 12.00, available: true },
      { name: "Dill (12 bunches)", price: 12.00, available: true }
    ]
  }
]
