const fs = require('fs');
const files = [
  'src/pages/visitor/HomePage.tsx',
  'src/components/shared/ProductCard.tsx',
  'src/components/shared/Header.tsx'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // Specific backgrounds
  content = content.replace(/bg-surface/g, 'bg-[var(--bg-surface)]');
  content = content.replace(/bg-background/g, 'bg-[var(--bg-page)]');
  content = content.replace(/bg-muted/g, 'bg-[var(--bg-muted)]');
  content = content.replace(/bg-secondary/g, 'bg-[var(--bg-subtle)]');
  content = content.replace(/bg-primary/g, 'bg-[var(--green-600)]');
  
  // Text colors
  content = content.replace(/text-foreground/g, 'text-[var(--text-primary)]');
  content = content.replace(/text-muted-foreground/g, 'text-[var(--text-muted)]');
  content = content.replace(/text-primary-foreground/g, 'text-[var(--text-inverse)]');
  content = content.replace(/text-secondary-foreground/g, 'text-[var(--text-secondary)]');
  content = content.replace(/text-primary/g, 'text-[var(--text-accent)]');
  
  // Borders
  content = content.replace(/border-border/g, 'border-[var(--border-light)]');
  
  // Adjust specific tailwind classes that might break
  content = content.replace(/bg-\[var\(--green-600\)\]\/10/g, 'bg-[var(--bg-subtle)]');
  content = content.replace(/bg-\[var\(--green-600\)\]\/5/g, 'bg-[var(--bg-subtle)]');
  content = content.replace(/shadow-\[var\(--green-600\)\]/g, 'shadow-[var(--green-600)]');
  
  // Section why (HomePage)
  if (file.includes('HomePage')) {
     content = content.replace(/bg-\[var\(--bg-subtle\)\] text-\[var\(--text-secondary\)\] overflow-hidden/g, 'bg-[var(--section-why-bg)] text-[var(--text-inverse)] overflow-hidden');
  }

  // Header tweaks
  if (file.includes('Header')) {
      content = content.replace(/border-\[var\(--border-light\)\]/g, 'border-[var(--border-light)]');
  }

  // Restore any accidental breaks like shadow-[var(--green-600)]/20 -> shadow-xl 
  
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated ${file}`);
});
