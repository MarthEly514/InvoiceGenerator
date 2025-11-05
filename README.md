# InvoiceGen

**InvoiceGen** is a simple React + TailwindCSS client-side invoice generator that allows users to create and export professional invoices in PDF format using **pdfMake**.

---

## Tech Stack

### Frontend
- **ReactJS** — Component-based UI
- **TailwindCSS** — Styling framework
- **TailwindCSS Animated** — For smooth transitions
- **pdfMake** — PDF generation
- **Lucide React** — Icon set
- **React Router DOM** — Routing and page management
- **Material UI** — Popups and Snackbars

### Deployment
- **Netlify** — Static site hosting

---

## Faced Issues and Fixes

### 1. React-pdf/renderer dynamic data update issues
**Problem:**  
When dynamically updating data (for live preview), `react-pdf/renderer` caused a fatal error:
TypeError: Eo is not a function

yaml
Copy code

**Fix:**  
No stable fix found. Replaced `react-pdf/renderer` with **pdfMake**, which supports dynamic data changes seamlessly.

---

### 2. Custom fonts failure in production
**Problem:**  
Fonts stored in `./src/fonts` were not found after deployment because the `src` folder does not exist in production builds.

**Fix:**  
Moved all fonts (and other assets as well) into the `./public` folder to ensure they are accessible in production.

---

### 3. Netlify deployment failure
**Problem:**  
Netlify build commands did not work properly when deploying directly from GitHub.

**Fix:**  
Created a `netlify.toml` file inside the `./public` folder with the following content:

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
#### Netlify Settings
| Setting | Value |
|----------|--------|
| **Runtime** | Not set |
| **Base directory** | `./frontend` |
| **Package directory** | Not set |
| **Build command** | `npm run build` |
| **Publish directory** | `./frontend/dist` |
| **Functions directory** | `./frontend/netlify/functions` |
| **Deploy log visibility** | Public |
| **Build status** | Active |

## License
This project is released under the MIT License.

## Author
Developed by [**Marth Ely**](https://www.linkedin.com/in/marthely-adjovi-2936a432b/).

Feel free to contribute, fork, or suggest improvements via pull requests.
