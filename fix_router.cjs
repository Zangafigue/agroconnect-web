const fs = require('fs');
let content = fs.readFileSync('src/router/index.tsx', 'utf8');

content = content.replace(
  /export const router = createBrowserRouter\(\[/,
  'export const router = createBrowserRouter([\n  { element: <RootLayout />, children: ['
);

content = content.replace(
  /\]\);$/,
  '  ]}\n]);'
);

fs.writeFileSync('src/router/index.tsx', content, 'utf8');
console.log("Router fixed");
