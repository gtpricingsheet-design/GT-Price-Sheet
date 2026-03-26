// GT Produce - Default Data
// Matches exactly DEFAULT_FRUIT and DEFAULT_VEG from original HTML

import type { Category } from './types'

export const DEFAULT_FRUIT: Category[] = [
  {
    id: "berry",
    icon: "\uD83E\uDED0",
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
    icon: "\uD83C\uDF47",
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
    icon: "\uD83C\uDF50",
    name: "Estate Pear Selection",
    color: "#7A9C3A",
    items: [
      { name: "Conference (Belgium \u2014 Taste)", price: 18.50, available: true },
      { name: "Conference PP (10x1kg)", price: 14.00, available: true },
      { name: "Conference (Urifruit)", price: 19.00, available: false },
      { name: "Conference Class I", price: 10.50, available: true },
      { name: "Ya Ya Pear x60", price: 15.00, available: true },
      { name: "Comice Pear (Stevens)", price: 6.50, available: false },
      { name: "Forelle (Qtee)", price: 18.00, available: true }
    ]
  },
  {
    id: "apples",
    icon: "\uD83C\uDF4E",
    name: "Heritage & Premium Apples",
    color: "#C0392B",
    items: [
      { name: "Braeburn (UK)", price: 18.50, available: true },
      { name: "Cox (UK)", price: 16.00, available: true },
      { name: "Royal Gala (UK, Budd)", price: 19.00, available: true },
      { name: "Royal Gala (UK)", price: 18.50, available: true },
      { name: "Royal Gala (PP x10)", price: 13.00, available: true },
      { name: "Pink Lady (French)", price: 28.50, available: true },
      { name: "Rubis Gold x66", price: 20.00, available: true },
      { name: "Golden Delicious (Perlim)", price: 19.00, available: true },
      { name: "Red Delicious (Blue Whale)", price: 19.50, available: true },
      { name: "Granny Smith (Emporda)", price: 20.50, available: true },
      { name: "Granny Smith (Blue Whale)", price: 21.00, available: true },
      { name: "Bramley (Naked)", price: 21.00, available: true }
    ]
  },
  {
    id: "stone",
    icon: "\uD83C\uDF51",
    name: "Stone Fruit Selection",
    color: "#E07B39",
    items: [
      { name: "Nectarines x20", price: 10.00, available: true },
      { name: "Flat Nectarines 9kg", price: 8.00, available: false },
      { name: "Peaches", price: 8.50, available: false },
      { name: "Yellow Plums", price: 18.00, available: false },
      { name: "Plum PP", price: 8.00, available: true },
      { name: "Plums (Laetitia AA)", price: 14.50, available: true }
    ]
  },
  {
    id: "citrus",
    icon: "\uD83C\uDF4A",
    name: "Citrus Reserve",
    color: "#D35400",
    items: [
      { name: "Nadorcott x80", price: 14.00, available: true },
      { name: "Nadorcott x94 (Mandarin)", price: 10.00, available: true },
      { name: "Nadorcott x74", price: 14.00, available: true },
      { name: "Nadorcott x84", price: 16.50, available: true },
      { name: "Nadorcott x96", price: 14.50, available: true },
      { name: "Nadorcott PP x10", price: 25.00, available: true },
      { name: "Nadorcott Leafy 7kg", price: 14.80, available: true },
      { name: "Clems (Ortan Mandarin, Best)", price: 15.50, available: true },
      { name: "Clems (Nova)", price: 12.00, available: true },
      { name: "Orange x90 Tray", price: 19.50, available: true },
      { name: "Orange x88", price: 13.00, available: true },
      { name: "Mussa x54", price: 21.00, available: true },
      { name: "Mussa x48", price: 22.00, available: true },
      { name: "Egyptian x48", price: 15.50, available: true },
      { name: "PP Blood (10x1kg)", price: 13.00, available: true },
      { name: "Consuay x54", price: 21.00, available: true },
      { name: "Chico x40", price: 22.00, available: true },
      { name: "Blood Orange (Roldan) x64", price: 19.00, available: true },
      { name: "Cara Cara 10kg", price: 15.00, available: false }
    ]
  },
  {
    id: "seasonal",
    icon: "\uD83C\uDF4B",
    name: "Seasonal Highlights",
    color: "#F1C40F",
    items: [
      { name: "Pineapple x8", price: 14.50, available: true },
      { name: "Lemons 5kg", price: 9.00, available: true },
      { name: "Lemons x70 (Mussa)", price: 23.00, available: true },
      { name: "Lime x60", price: 12.50, available: true },
      { name: "Watermelon x5", price: 20.00, available: true },
      { name: "Honeydew x10", price: 15.00, available: true },
      { name: "Honeydew x8", price: 15.50, available: true },
      { name: "Honeydew x6 (Piel de Sapo)", price: 15.50, available: true },
      { name: "Galia x6 (Premium)", price: 12.50, available: true },
      { name: "Cantaloupe x6", price: 12.50, available: true },
      { name: "Ruby Grapefruit x40 (Spanish)", price: 19.50, available: true },
      { name: "Banana (Chiquita) 19kg \u2014 Panama", price: 21.50, available: true }
    ]
  },
  {
    id: "exotic",
    icon: "\uD83E\uDD6D",
    name: "The Exotic Collection",
    color: "#27AE60",
    items: [
      { name: "Passion Fruit 2kg", price: 13.00, available: true },
      { name: "Lychee XL 2kg", price: 11.00, available: false },
      { name: "Physalis x12", price: 14.40, available: true },
      { name: "Pomegranate x12 (Class 1)", price: 12.00, available: true },
      { name: "Figs x24 (Brazil)", price: 12.50, available: true },
      { name: "Figs (Dried PP)", price: 26.00, available: true },
      { name: "RTE Avocado", price: 19.00, available: true },
      { name: "Green Avocado", price: 14.50, available: true },
      { name: "Kiwi x33", price: 9.00, available: true },
      { name: "Kiwiberry x12", price: 26.40, available: false }
    ]
  },
  {
    id: "dates",
    icon: "\uD83C\uDF34",
    name: "Premium Dates & Speciality",
    color: "#8B4513",
    items: [
      { name: "Medjoul (Egypt) x12", price: 33.60, available: true },
      { name: "Medjoul Red Box 5kg", price: 34.00, available: true },
      { name: "Medjoul x16 PP", price: 51.20, available: true },
      { name: "Ravier Dates 25x200g (Tunisia)", price: 10.50, available: true },
      { name: "Jordan Dates Large x21", price: 73.50, available: true },
      { name: "Jordan Dates Medium x21", price: 63.00, available: true }
    ]
  },
  {
    id: "tropical",
    icon: "\uD83D\uDC09",
    name: "Tropical Rarities",
    color: "#E91E63",
    items: [
      { name: "Dragon Fruit (Red) x8", price: 26.00, available: true },
      { name: "Sharon Fruit (Kaki) x24", price: 10.50, available: true },
      { name: "Mango RTE x9", price: 12.50, available: true },
      { name: "Mango (Airfreight) x12", price: 36.00, available: true },
      { name: "Papaya x8", price: 20.00, available: false },
      { name: "Quince x14", price: 9.00, available: true }
    ]
  }
]

export const DEFAULT_VEG: Category[] = [
  {
    id: "salad",
    icon: "\uD83E\uDD6C",
    name: "Salad & Leaves",
    color: "#3D8C3A",
    items: [
      { name: "Iceberg Lettuce x12", price: 12, available: true },
      { name: "Little Gem x20", price: 8.5, available: true },
      { name: "Baby Spinach 1.5kg", price: 11, available: true },
      { name: "Rocket 1kg", price: 9.5, available: true }
    ]
  },
  {
    id: "root",
    icon: "\uD83E\uDD55",
    name: "Root Vegetables",
    color: "#C86A30",
    items: [
      { name: "Carrots 10kg", price: 6.5, available: true },
      { name: "Parsnips 10kg", price: 9, available: true },
      { name: "Sweet Potato 6kg", price: 8, available: true },
      { name: "Celeriac x8", price: 10, available: true }
    ]
  },
  {
    id: "allium",
    icon: "\uD83E\uDDC5",
    name: "Onions & Alliums",
    color: "#8C6A3A",
    items: [
      { name: "White Onions 10kg", price: 5.5, available: true },
      { name: "Red Onions 10kg", price: 7, available: true },
      { name: "Garlic \u2014 Spanish 5kg", price: 18, available: true },
      { name: "Spring Onions x24", price: 9.6, available: true },
      { name: "Leeks x12", price: 8.5, available: true }
    ]
  },
  {
    id: "brassica",
    icon: "\uD83E\uDD66",
    name: "Brassica Collection",
    color: "#2D6B3F",
    items: [
      { name: "Broccoli x8", price: 7, available: true },
      { name: "Cauliflower x6", price: 8, available: true },
      { name: "Savoy Cabbage x8", price: 6, available: true },
      { name: "Brussels Sprouts 2.5kg", price: 5.5, available: true }
    ]
  },
  {
    id: "mediterranean",
    icon: "\uD83C\uDF45",
    name: "Mediterranean Selection",
    color: "#E74C3C",
    items: [
      { name: "Vine Tomatoes 6kg", price: 12, available: true },
      { name: "Cherry Tomatoes 3kg", price: 10, available: true },
      { name: "Courgettes 5kg", price: 7, available: true },
      { name: "Aubergine x12", price: 8.5, available: true },
      { name: "Mixed Peppers x30", price: 14, available: true }
    ]
  },
  {
    id: "herbs",
    icon: "\uD83C\uDF3F",
    name: "Fresh Herbs",
    color: "#1ABC9C",
    items: [
      { name: "Basil x12 pots", price: 14, available: true },
      { name: "Coriander x12 bunches", price: 9, available: true },
      { name: "Flat Parsley x12", price: 7.5, available: true },
      { name: "Mint x12 bunches", price: 8, available: true },
      { name: "Rosemary x12 pots", price: 16, available: true }
    ]
  }
]
