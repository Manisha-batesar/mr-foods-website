// Food categories and items for menu and order pages
export const FOOD_CATEGORIES = [
  {
    id: 'indian',
    name: 'Indian Food',
    title: 'Our Special Indian Food',
    items: [
      { id: 1, name: 'Butter Chicken', price: 299, image: '/images/butter-chicken.png' },
      { id: 2, name: 'Biryani', price: 249, image: '/images/flavorful-chicken-biryani.png' },
      { id: 3, name: 'Dal Makhani', price: 199, image: '/images/creamy-dal-makhani.png' },
      { id: 4, name: 'Paneer Tikka', price: 229, image: '/images/paneer-tikka.png' },
      { id: 5, name: 'Naan Bread', price: 49, image: '/images/naan-bread.png' },
      { id: 6, name: 'Tandoori Chicken', price: 279, image: '/images/tandoori-chicken.png' },
    ]
  },
  {
    id: 'fast-food',
    name: 'Fast Food',
    title: 'Our Special Fast Food',
    items: [
      { id: 7, name: 'Classic Burger', price: 149, image: '/images/classic-burger.png' },
      { id: 8, name: 'Chicken Pizza', price: 399, image: '/images/chicken-pizza.png' },
      { id: 9, name: 'French Fries', price: 99, image: '/images/crispy-french-fries.png' },
      { id: 10, name: 'Hot Dog', price: 129, image: '/images/classic-hot-dog.png' },
      { id: 11, name: 'Chicken Wings', price: 199, image: '/images/crispy-chicken-wings.png' },
      { id: 12, name: 'Sandwich', price: 119, image: '/images/classic-sandwich.png' },
    ]
  },
  {
    id: 'chinese',
    name: 'Chinese Food',
    title: 'Our Special Chinese Food',
    items: [
      { id: 13, name: 'Fried Rice', price: 179, image: '/images/fried-rice.png' },
      { id: 14, name: 'Chow Mein', price: 199, image: '/images/delicious-chow-mein.png' },
      { id: 15, name: 'Sweet & Sour Chicken', price: 249, image: '/images/sweet-sour-chicken.png' },
      { id: 16, name: 'Spring Rolls', price: 129, image: '/images/fresh-spring-rolls.png' },
      { id: 17, name: 'Manchurian', price: 189, image: '/images/manchurian-dish.png' },
      { id: 18, name: 'Hakka Noodles', price: 169, image: '/images/hakka-noodles.png' },
    ]
  },
  {
    id: 'rajasthani',
    name: 'Rajasthani Food',
    title: 'Our Special Rajasthani Food',
    items: [
      { id: 19, name: 'Dal Baati Churma', price: 199, image: '/images/dal-baati-churma.png' },
      { id: 20, name: 'Laal Maas', price: 329, image: '/images/laal-maas.png' },
      { id: 21, name: 'Gatte ki Sabzi', price: 179, image: '/images/gatte-ki-sabzi.png' },
      { id: 22, name: 'Ker Sangri', price: 159, image: '/images/ker-sangri.png' },
      { id: 23, name: 'Rajasthani Thali', price: 299, image: '/images/rajasthani-thali.png' },
      { id: 24, name: 'Pyaaz Kachori', price: 89, image: '/images/pyaaz-kachori.png' },
    ]
  }
]

// Flat list of all items for order page, with category
export const ALL_FOOD_ITEMS = FOOD_CATEGORIES.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.name })))
