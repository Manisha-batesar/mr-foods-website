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
  },
  {
    id: 'cold-drinks',
    name: 'Cold Drinks',
    title: 'Our Special Cold Drinks',
    hideOnMenupage: true,
    items: [
      { id: 25, name: 'Coca Cola', price: 49, image: '/images/cocacola.jpg' },
      { id: 26, name: 'Pepsi', price: 49, image: '/images/pepsi.jpg' },
      { id: 27, name: 'Sprite', price: 49, image: '/images/sprite.jpg' },
      { id: 28, name: 'Fanta Orange', price: 49, image: '/images/fenta.jpg' },
      { id: 29, name: 'Mountain Dew', price: 49, image: '/images/mountaindew.jpg' },
      { id: 30, name: 'Thumbs Up', price: 49, image: '/images/thumsup.jpg' },
      { id: 31, name: 'Cappuccino', price: 89, image: '/images/cappuccino.jpg' },
      { id: 32, name: 'Latte', price: 99, image: '/images/latte.jpg' },
      { id: 33, name: 'Espresso', price: 79, image: '/images/espresso.jpg' },
      { id: 34, name: 'Americano', price: 89, image: '/images/Americano.jpg' },
      { id: 35, name: 'Iced Coffee', price: 109, image: '/images/Iced Coffee.jpg' },
      { id: 36, name: 'Cold Brew', price: 119, image: '/images/Cold Brew.jpg' },
      { id: 37, name: 'Classic Mojito', price: 129, image: '/images/classic mojito.jpg' },
      { id: 38, name: 'Strawberry Mojito', price: 149, image: '/images/Strawberry Mojito.jpg' },
      { id: 39, name: 'Mango Mojito', price: 149, image: '/images/Mango Mojito.jpg' },
      { id: 40, name: 'Blue Curacao Mojito', price: 159, image: '/images/Blue Curacao Mojito.jpg' },
      { id: 41, name: 'Virgin Mojito', price: 119, image: '/images/Virgin Mojito.jpg' },
      { id: 42, name: 'Fresh Lime Soda', price: 69, image: '/images/Fresh Lime Soda.jpg' },
      { id: 43, name: 'Mango Lassi', price: 89, image: '/images/Mango Lassi.jpg' },
      { id: 44, name: 'Iced Tea', price: 79, image: '/images/Iced Tea.jpg' },
    ]
  }
]

// Flat list of all items for order page, with category
export const ALL_FOOD_ITEMS = FOOD_CATEGORIES.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.name })))
