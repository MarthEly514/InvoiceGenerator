InvoiceGen

This is a simple React-TailwindCSS client-side Invoice generator

Tech stack:
Frontend:
ReactJS
TailwindCSS
TailwindCSS Animated
pdfMake (For pdf generation)
Lucide React (For Icons)
React-router-dom (For navigation and pages handling)

Deployment: Netlify;

Backend:
Firebase(For User Registration)
Django (API server)


Faced Issues:
React-pdf/renderer dynamic data update issues:
When data dynamically updates (for live preview), react-pdf/renderer throws a "TypeError, Eo is not a function" that crashes the whole page.
-Fix: No fix found. Had to replace it with pdfMake, which handles the dynamic changes very well.

Custom fonts failure in production:
In production, fonts stored in ./src/fonts folder cannot be used, due to the absence of the src folder in production.
-Fix: Moved every asset(font folder as well) into the ./public folder for better accessibility in prodution.

Netlify Deployment failure:
Build commands didn't work as expected (deploying from Github).
-Fix: Created a netlify.toml file in the ./public folder 
content:
```toml
[build]
  command = "cd frontend && npm run build"
  publish = "frontend/dist"

# Optional redirect for React Router (single-page app)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Netlify settings:

Runtime: Not set
Base directory: ./frontend
Package directory: Not set
Build command: npm run build
Publish directory: ./frontend/dist
Functions directory: ./frontend/netlify/functions
Deploy log visibility: Logs are public
Build status: Active.


