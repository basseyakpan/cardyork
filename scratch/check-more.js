import * as si from 'react-icons/si';
import * as fa from 'react-icons/fa';

const check = ['sephora', 'nordstrom', 'amex', 'razer', 'vanilla'];
console.log("Checking in SI:");
Object.keys(si).forEach(k => {
  if (check.some(c => k.toLowerCase().includes(c.toLowerCase()))) {
    console.log(`- SI: ${k}`);
  }
});
console.log("Checking in FA:");
Object.keys(fa).forEach(k => {
  if (check.some(c => k.toLowerCase().includes(c.toLowerCase()))) {
    console.log(`- FA: ${k}`);
  }
});
