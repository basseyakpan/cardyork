import * as fa from 'react-icons/fa';
import * as si from 'react-icons/si';

const brands = [
  'Amazon', 'Apple', 'Steam', 'GooglePlay', 'Googleplay', 'Ebay', 'Sephora', 
  'Nike', 'Razer', 'Visa', 'Mastercard', 'Nordstrom', 'AmericanExpress', 'Americanexpress', 'Macys', 'Macy'
];

console.log("FA Icons:");
Object.keys(fa).forEach(k => {
  if (brands.some(b => k.toLowerCase().includes(b.toLowerCase()))) {
    console.log(`- ${k}`);
  }
});

console.log("\nSI Icons:");
Object.keys(si).forEach(k => {
  if (brands.some(b => k.toLowerCase().includes(b.toLowerCase()))) {
    console.log(`- ${k}`);
  }
});
