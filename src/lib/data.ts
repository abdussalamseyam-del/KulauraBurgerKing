export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  id: string;
  customer_name: string;
  phone_number: string;
  address: string;
  items: CartItem[];
  total: number;
  payment_method: string;
  status: 'pending' | 'accepted' | 'delivered' | 'rejected';
  bkash_trx_id?: string;
  created_at: string;
};

export type Settings = {
  restaurantName: string;
  city: string;
  phone: string;
  whatsapp: string;
  address: string;
  mapEmbed: string;
  hours: { day: string; time: string }[];
};

export const DEFAULT_SETTINGS: Settings = {
  restaurantName: 'Burger King',
  city: 'Kulaura, Sylhet',
  phone: '+880 1993-239956',
  whatsapp: '8801993239956',
  address: 'Main Bazar Road, Kulaura 3220, Sylhet, Bangladesh',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3635.2!2d91.9676!3d24.5295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDMxJzQ2LjIiTiA5McKwNTgnMDMuNCJF!5e0!3m2!1sen!2sbd!4v1700000000000',
  hours: [
    { day: 'Saturday – Thursday', time: '11:00 AM – 11:00 PM' },
    { day: 'Friday', time: '2:00 PM – 11:00 PM' },
  ],
};

export const DEFAULT_PRODUCTS: Product[] = [
  { id: 'p01', name: 'Classic Smash Burger', price: 250, category: 'Burgers', image: 'https://images.pexels.com/photos/18867543/pexels-photo-18867543.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p02', name: 'Double Smash Burger', price: 350, category: 'Burgers', image: 'https://images.pexels.com/photos/20722045/pexels-photo-20722045.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p03', name: 'King Burger', price: 450, category: 'Burgers', image: 'https://images.pexels.com/photos/14678998/pexels-photo-14678998.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p04', name: 'Cheese Blast Burger', price: 320, category: 'Burgers', image: 'https://images.pexels.com/photos/5041475/pexels-photo-5041475.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p05', name: 'BBQ Burger', price: 380, category: 'Burgers', image: 'https://images.pexels.com/photos/20722030/pexels-photo-20722030.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p06', name: 'Crispy Chicken Burger', price: 300, category: 'Burgers', image: 'https://images.pexels.com/photos/12129480/pexels-photo-12129480.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p07', name: 'Zinger Burger', price: 340, category: 'Burgers', image: 'https://images.pexels.com/photos/27758748/pexels-photo-27758748.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p08', name: 'Fish Burger', price: 330, category: 'Burgers', image: 'https://images.pexels.com/photos/32807693/pexels-photo-32807693.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p09', name: 'Veggie Burger', price: 220, category: 'Burgers', image: 'https://images.pexels.com/photos/20741663/pexels-photo-20741663.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p10', name: 'Loaded Fries', price: 180, category: 'Sides', image: 'https://images.pexels.com/photos/27758758/pexels-photo-27758758.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p11', name: 'Cheese Fries', price: 220, category: 'Sides', image: 'https://images.pexels.com/photos/29285461/pexels-photo-29285461.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p12', name: 'Chicken Wings 6pcs', price: 280, category: 'Sides', image: 'https://images.pexels.com/photos/8743924/pexels-photo-8743924.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p13', name: 'Chicken Nuggets 8pcs', price: 250, category: 'Sides', image: 'https://images.pexels.com/photos/14686443/pexels-photo-14686443.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p14', name: 'Fried Chicken Bucket', price: 650, category: 'Sides', image: 'https://images.pexels.com/photos/20003232/pexels-photo-20003232.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p15', name: 'Chicken Sandwich', price: 260, category: 'Sides', image: 'https://images.pexels.com/photos/5446513/pexels-photo-5446513.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p16', name: 'Shawarma', price: 200, category: 'Sides', image: 'https://images.pexels.com/photos/29306501/pexels-photo-29306501.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p17', name: 'Pizza Slice', price: 180, category: 'Sides', image: 'https://images.pexels.com/photos/30504705/pexels-photo-30504705.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p18', name: 'Cold Coffee', price: 150, category: 'Drinks', image: 'https://images.pexels.com/photos/38028984/pexels-photo-38028984.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p19', name: 'Oreo Shake', price: 200, category: 'Drinks', image: 'https://images.pexels.com/photos/11512980/pexels-photo-11512980.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { id: 'p20', name: 'Soft Drink', price: 80, category: 'Drinks', image: 'https://images.pexels.com/photos/31966524/pexels-photo-31966524.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

export const HERO_IMAGES = {
  burger: 'https://images.pexels.com/photos/12325274/pexels-photo-12325274.jpeg?auto=compress&cs=tinysrgb&w=1200',
  deconstruct: 'https://images.pexels.com/photos/6896381/pexels-photo-6896381.jpeg?auto=compress&cs=tinysrgb&w=1200',
  sear: 'https://images.pexels.com/photos/20042199/pexels-photo-20042199.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

export const BURGER_LAYERS = [
  { name: 'Toasted Brioche Bun', description: 'Golden, buttery, freshly baked', color: '#d4a055' },
  { name: 'Melted Cheese', description: 'Aged cheddar, perfectly melted', color: '#e8c44a' },
  { name: 'Double Smash Patty', description: '100% beef, smashed & seared', color: '#7a4a2a' },
  { name: 'Pickles', description: 'Crunchy, tangy dill pickles', color: '#5a7a3a' },
  { name: 'Onions', description: 'Caramelized sweet onions', color: '#c4a070' },
  { name: 'House Sauce', description: 'Our signature secret sauce', color: '#c02828' },
];

export type BurgerIngredient = {
  id: string;
  name: string;
  price: number;
  emoji: string;
  color: string;
};

export const BURGER_BUNS: BurgerIngredient[] = [
  { id: 'bun-brioche', name: 'Brioche Bun', price: 30, emoji: '🍞', color: '#d4a055' },
  { id: 'bun-sesame', name: 'Sesame Bun', price: 25, emoji: '🍔', color: '#c89040' },
  { id: 'bun-lettuce', name: 'Lettuce Wrap', price: 20, emoji: '🥬', color: '#5a8a3a' },
];

export const BURGER_PATTIES: BurgerIngredient[] = [
  { id: 'patty-beef', name: 'Beef Patty', price: 120, emoji: '🥩', color: '#7a4a2a' },
  { id: 'patty-chicken', name: 'Chicken Patty', price: 100, emoji: '🍗', color: '#c4a070' },
  { id: 'patty-veggie', name: 'Veggie Patty', price: 80, emoji: '🥗', color: '#5a7a3a' },
  { id: 'patty-double', name: 'Double Beef', price: 200, emoji: '🥩🥩', color: '#6a3a1a' },
];

export const BURGER_TOPPINGS: BurgerIngredient[] = [
  { id: 'top-cheese', name: 'Cheese', price: 30, emoji: '🧀', color: '#e8c44a' },
  { id: 'top-bacon', name: 'Bacon', price: 50, emoji: '🥓', color: '#a04030' },
  { id: 'top-pickles', name: 'Pickles', price: 15, emoji: '🥒', color: '#5a7a3a' },
  { id: 'top-onions', name: 'Onions', price: 10, emoji: '🧅', color: '#c4a070' },
  { id: 'top-jalapenos', name: 'Jalapeños', price: 20, emoji: '🌶️', color: '#2a8a3a' },
  { id: 'top-tomato', name: 'Tomato', price: 15, emoji: '🍅', color: '#c02828' },
];

export const BURGER_SAUCES: BurgerIngredient[] = [
  { id: 'sauce-house', name: 'House Sauce', price: 15, emoji: ' sauces', color: '#c02828' },
  { id: 'sauce-bbq', name: 'BBQ Sauce', price: 20, emoji: '🍖', color: '#7a3a1a' },
  { id: 'sauce-spicy', name: 'Spicy Sauce', price: 20, emoji: '🔥', color: '#c01828' },
  { id: 'sauce-garlic', name: 'Garlic Mayo', price: 25, emoji: '🧄', color: '#e8e0c8' },
];

export const OFFERS = [
  { id: 'o1', title: 'Buy 1 Get 1 Free', description: 'On all Classic Smash Burgers every Tuesday', code: 'TUESDAY2', badge: 'Today Only' },
  { id: 'o2', title: '20% Off on 1000+', description: 'Orders above 1000 TK get 20% discount', code: 'SAVE20', badge: 'Popular' },
  { id: 'o3', title: 'Free Delivery', description: 'On all orders within Kulaura town over 500 TK', code: 'FREESHIP', badge: 'Always' },
];

export const REVIEWS = [
  { id: 'r1', name: 'Rahim Ahmed', rating: 5, text: 'Best burger in Kulaura, no competition. The Double Smash is absolutely unreal — juicy, cheesy, perfection.', role: 'Food Blogger' },
  { id: 'r2', name: 'Sadia Rahman', rating: 5, text: 'Ordered the King Burger and it was massive! Delivery was fast and everything arrived hot. Will order again.', role: 'Regular Customer' },
  { id: 'r3', name: 'Tanvir Hasan', rating: 5, text: 'The Build Your Own Burger feature is genius. I made a triple beef with extra cheese and bacon. Unreal.', role: 'Burger Enthusiast' },
  { id: 'r4', name: 'Nusrat Jahan', rating: 5, text: 'Loved the Loaded Fries and Oreo Shake. The quality is premium and the packaging is beautiful.', role: 'Foodie' },
  { id: 'r5', name: 'Arif Khan', rating: 5, text: 'Best burger shop in Kulaura area. The sear on the patties is perfect. Highly recommend to everyone.', role: 'Local Foodie' },
  { id: 'r6', name: 'Farzana Yasmin', rating: 5, text: 'The bKash payment is so convenient. Food arrived in 25 minutes, hot and fresh. Highly recommend!', role: 'Happy Customer' },
];

export const DELIVERY_ZONES = [
  { area: 'Kulaura Town', fee: 30, time: '20-30 min' },
  { area: 'Brahmanpara', fee: 40, time: '25-35 min' },
  { area: 'Kadipur', fee: 35, time: '20-30 min' },
  { area: 'Sreemangal', fee: 50, time: '30-40 min' },
  { area: 'Maulvibazar', fee: 50, time: '30-40 min' },
  { area: 'Sylhet City', fee: 60, time: '35-45 min' },
];

export const BKASH_NUMBER = '01603176361';
export const WHATSAPP_NUMBER = '8801993239956';

export const ADMIN_CREDENTIALS = {
  email: 'abdussalamseyam@gmail.com',
  password: '123456',
};
