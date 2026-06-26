# SunCart – Summer Essentials Store

SunCart is a modern summer eCommerce platform designed to offer users an interactive shopping experience for seasonal products like sunglasses, summer outfits, skincare, hydration kits, and beach accessories.

## Live Project Link
- **Live URL:** [suncart-summer-essentials](https://b13-a8-p9y1-git-main-nazifaneloys-projects.vercel.app/) 

---

## Key Features

1. **Responsive summer-themed layout:** Persistent glassmorphic navbar and footer that adapt seamlessly to mobile, tablet, and desktop viewports.
2. **Product Catalog:** A rich set of 6 summer items (shades, dresses, sunscreens, hydration bottles, hats, sand-free towels) loaded statically from a JSON database.
3. **Hero & Extra Sections:**
   - Summer sale banner highlighting "Summer Sale 50% OFF" and "Hot Deals 🔥".
   - Popular Products showcasing 3 recommended items.
   - **Summer Care Tips** providing skin, clothing, and hydration advice.
   - **Top Brands** grid highlighting partner manufacturers.
4. **Secure Authentication (BetterAuth):**
   - Credentials sign-up (Name, Email, Photo Link, Password).
   - Credentials sign-in (Email, Password) with immediate redirection and session restoration.
   - **Mock Google Social Login:** Clicking the Google button instantly registers/signs in a Google Examiner profile, making testing local OAuth credentials straightforward for the reviewer without needing live credentials.
5. **Protected Details Routing:** `/products/[id]` is fully guarded. Accessing it while logged out redirects the user to the login screen, with automatic redirect back to the product details page upon successful authentication.
6. **My Profile & Information Update (Challenge):**
   - Shows logged-in user's name, email, avatar image, and sign-up date.
   - Form-based profile updating using BetterAuth's `authClient.updateUser` to modify display name and photo URLs on the fly.
7. **Premium Animations:** Entrances and interactions powered by `animate.css` transitions.

---

## npm Packages Used

- **`better-auth`**: Lightweight and secure TypeScript auth engine.
- **`prisma`** & **`@prisma/client`**: High-performance database ORM mapping the SQLite credentials database.
- **`daisyui`**: Tailored, lightweight components integrated on top of Tailwind CSS.
- **`animate.css`**: Ready-to-use CSS animations for element transitions.
- **`react-hot-toast`**: Flexible and customized notifications framework.
- **`lucide-react`**: Vector icons for layout details.

---

## Local Setup & Run Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up the Database
Generate Prisma client and run migrations:
```bash
npx prisma migrate dev --name init
```

### 3. Environment Variables
Create a `.env` file in the root directory (already preconfigured for testing):
```env
DATABASE_URL="file:./dev.db"
BETTER_AUTH_SECRET="suncart_secret_summer_2026_xyz123"
BETTER_AUTH_URL="http://localhost:3000"
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.
