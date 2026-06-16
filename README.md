# 📚 BookFolio — Your Literary Universe

A premium book catalog application built with **Next.js App Router**, **Firebase Authentication**, and **Tailwind CSS**. BookFolio lets readers discover, explore, and curate books — with a polished, responsive UI designed to feel at home in any serious reader's toolkit.

---

## ✨ Key Features

- **Curated Book Catalog** — 12 hand-selected titles across every major genre, with full metadata
- **Smart Discovery** — filter by genre, minimum rating, max price, and sort in multiple ways
- **Full Book Profiles** — cover image, full description, specs, related titles, and tags
- **Firebase Authentication** — email/password + Google sign-in, with protected routes
- **Add Books** — authenticated users can add new titles to the community catalog
- **Manage Books** — table/grid view with delete confirmation modal
- **Responsive Design** — mobile-first, works on all screen sizes
- **Sticky Navbar** — with user dropdown (avatar, name, email, quick actions)
- **Toast Notifications** — real-time feedback on all actions
- **404 + Loading states** — polished edge-case handling

---

## 🛠 Tech Stack

| Layer       | Technology                                 |
|-------------|---------------------------------------------|
| Framework   | Next.js (App Router)                    |
| Language    | TypeScript                                  |
| Styling     | Tailwind CSS                            |
| Auth & DB   | Firebase Auth          |
| Icons       | react-icons (Feather + Google)              |
| Toasts      | react-hot-toast                             |
| Animations  | Tailwind transitions + framer-motion-ready  |
| Images      | next/image with Unsplash                    |

---

## 🚀 Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/amitkbinfo/BookFolio-Next.git
cd bookfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project
3. Enable **Authentication** → Sign-in methods:
   - Email/Password ✓
   - G
### 6. Build for production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
BookFolio/
├── src/
│   ├── app/
│   │   ├── about/          # About page
│   │   ├── items/
│   │   │   ├── [id]/       # Dynamic book detail page
│   │   │   ├── add/        # Protected: Add a book
│   │   │   ├── manage/     # Protected: Manage books
│   │   │   └── page.tsx    # Books listing with filters
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   ├── globals.css
│   │   ├── layout.tsx      # Root layout with providers
│   │   ├── loading.tsx     # Global loading state
│   │   ├── not-found.tsx   # 404 page
│   │   └── page.tsx        # Homepage
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx  # Sticky navbar with user dropdown
│   │   │   └── Footer.tsx  # Footer with links and socials
│   │   ├── sections/       # Homepage sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── FeaturedBooksSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── CTABannerSection.tsx
│   │   └── ui/
│   │       ├── BookCard.tsx        # Reusable book card
│   │       ├── ProtectedRoute.tsx  # Auth guard wrapper
│   │       └── StarRating.tsx      # Star rating display
│   ├── context/
│   │   ├── AuthContext.tsx  # Firebase auth state
│   │   └── BooksContext.tsx # Books state (static + Firestore)
│   ├── data/
│   │   └── books.ts        # Static book data + testimonials + features
│   ├── lib/
│   │   └── firebase.ts     # Firebase initialization
│   └── types/
│       └── index.ts        # TypeScript interfaces
├── .env.local.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🗺 Route Summary

| Route              | Type      | Description                                  |
|--------------------|-----------|----------------------------------------------|
| `/`                | Public    | Homepage with 5 sections                     |
| `/items`           | Public    | Book catalog with search + filters            |
| `/items/[id]`      | Public    | Individual book detail page                  |
| `/about`           | Public    | About BookFolio, team, values, timeline      |
| `/login`           | Public    | Email/password + Google sign-in              |
| `/register`        | Public    | Account creation with password strength      |
| `/items/add`       | Protected | Add a new book (requires login)              |
| `/items/manage`    | Protected | Manage all books — view/delete (requires login) |

---

## 🔒 Authentication Flow

1. **Login / Register** — Firebase handles auth; user state is stored in `AuthContext`
2. **Protected routes** — `ProtectedRoute` component checks `user` state; redirects to `/login?redirect=...` if unauthenticated
3. **After login** — user is redirected back to the page they were trying to access (or `/`)
4. **Navbar** — shows login/register buttons when logged out, user dropdown with avatar when logged in

---

## 🌐 Deployment (Vercel)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Add all `NEXT_PUBLIC_FIREBASE_*` environment variables in Vercel's project settings
4. Deploy — Vercel will auto-build on every push to `main`

---

## 📝 Firestore Security Rules (Recommended)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /books/{bookId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow delete: if request.auth != null && 
                       request.auth.uid == resource.data.addedBy;
    }
  }
}
```

---

## 📄 License

MIT — free to use, modify, and deploy.

---

*Built with ❤️ for readers who mean it.*
