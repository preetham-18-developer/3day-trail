const fs = require('fs');
const path = require('path');

const categories = ['engineering', 'medical', 'commerce', 'law', 'design', 'science'];
const states = ['Maharashtra', 'Delhi NCR', 'Karnataka', 'Tamil Nadu', 'Telangana', 'Gujarat', 'West Bengal', 'Uttar Pradesh'];
const cities = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
  'Delhi NCR': ['New Delhi', 'Gurgaon', 'Noida'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
  'Telangana': ['Hyderabad', 'Warangal'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
  'West Bengal': ['Kolkata', 'Durgapur'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi']
};

const images = [
  'https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=80',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
  'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=600&q=80',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
  'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=80'
];

const adjectives = ['National', 'Global', 'Indian', 'Institute of', 'University of', 'Royal', 'Presidency', 'Apex', 'Pinnacle', 'Future', 'Tech'];
const nouns = ['Technology', 'Science', 'Management', 'Medical Sciences', 'Research', 'Design', 'Law', 'Commerce', 'Studies'];

const generateColleges = () => {
  const colleges = [];
  for (let i = 1; i <= 500; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const city = cities[state][Math.floor(Math.random() * cities[state].length)];
    
    // Generate name based on category
    let prefix = adjectives[Math.floor(Math.random() * adjectives.length)];
    let suffix = nouns[Math.floor(Math.random() * nouns.length)];
    let name = '';
    
    if (category === 'engineering') suffix = 'Technology';
    if (category === 'medical') suffix = 'Medical Sciences';
    if (category === 'commerce') suffix = 'Management';
    if (category === 'law') suffix = 'Law';
    if (category === 'design') suffix = 'Design';
    if (category === 'science') suffix = 'Science & Research';
    
    if (Math.random() > 0.5) {
      name = `${city} ${prefix} ${suffix}`;
    } else {
      name = `${prefix} Institute of ${suffix}, ${city}`;
    }

    const feeNum = (Math.random() * 20 + 2).toFixed(1);
    const fee = `₹${feeNum} Lakhs`;
    const feeValue = parseFloat(feeNum) * 100000;
    
    const isTop = Math.random() > 0.8;
    const rating = isTop ? (Math.random() * 0.5 + 4.5).toFixed(1) : (Math.random() * 1.5 + 3.0).toFixed(1);
    
    const avgPack = (Math.random() * 15 + 4).toFixed(1);
    const maxPack = (parseFloat(avgPack) * (Math.random() * 3 + 2)).toFixed(1);

    colleges.push({
      id: `college-${i}`,
      name,
      location: `${city}, ${state}`,
      category,
      rating: parseFloat(rating),
      reviews: Math.floor(Math.random() * 2000 + 50),
      fee,
      feeValue,
      placement: `${Math.floor(Math.random() * 20 + 80)}%`,
      avgPackage: `${avgPack} LPA`,
      highestPackage: `${maxPack} LPA`,
      image: images[Math.floor(Math.random() * images.length)],
      tags: isTop ? ['Top Ranked', 'Best ROI'] : ['UGC Approved'],
      isTopRated: isTop
    });
  }
  return colleges;
};

const dir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, 'colleges.json'), JSON.stringify(generateColleges(), null, 2));
console.log('Successfully generated 500 colleges in src/data/colleges.json');
