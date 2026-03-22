const fs = require('fs');
const files = [
  'src/pages/visitor/HomePage.tsx',
  'src/components/shared/ProductCard.tsx',
  'src/components/shared/Header.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Order matters!
  content = content.replace(/text-primary-foreground/g, 'text-inverse');
  content = content.replace(/text-primary/g, 'text-accent');
  content = content.replace(/text-foreground/g, 'text-primary');
  
  content = content.replace(/bg-primary/g, 'bg-[var(--green-600)]');
  content = content.replace(/bg-background/g, 'bg-page');
  content = content.replace(/bg-secondary/g, 'bg-subtle');
  
  content = content.replace(/text-secondary-foreground/g, 'text-secondary');
  content = content.replace(/text-muted-foreground/g, 'text-caption');
  content = content.replace(/border-border/g, 'border-light');
  
  // Custom rules for HomePage
  if (file.includes('HomePage')) {
     content = content.replace(/bg-\[var\(--green-600\)\]\/10/g, 'bg-subtle'); // fixed backgrounds
     // Section why bg
     content = content.replace(/bg-secondary text-secondary-foreground overflow-hidden/g, 'bg-[var(--section-why-bg)] text-inverse overflow-hidden');
     content = content.replace(/text-secondary\/80/g, 'text-inverse/80');
     content = content.replace(/text-white\/95/g, 'text-inverse');
     content = content.replace(/text-white/g, 'text-inverse');
  }

  // Adjust specific tailwind classes that were broken
  content = content.replace(/shadow-\[var\(--green-600\)\]/g, 'shadow-[var(--green-600)]'); // Just sanity
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
