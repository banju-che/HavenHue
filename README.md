# 🛍️ HavenHue

**HavenHue** is a full-stack e-commerce web app focused on home décor and furnishings. It is built with **React**,
**TailwindCSS**, and **Django REST Framework**, supporting essential e-commerce functionality like product listings, cart operations, and order handling.

---

## 🔥 Features

- 🛒 Browse and search home décor products
- 👤 User signup/login with Django session-based authentication
- 🧺 Add to cart, update quantities, and remove items
- 🧾 Place and view orders
- ⚙️ Admin panel for managing products and users

---

## 🛠️ Tech Stack

| Layer     | Technology                 |
|-----------|----------------------------|
| Frontend  | React, TailwindCSS, Axios  |
| Backend   | Django, Django REST Framework |
| Auth      | Django built-in auth (sessions) |
| Database  | SQLite (default, easy switch to PostgreSQL) |

---

## 🚀 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/banju-che/HavenHue.git
cd HavenHue

2. Setup Backend

        cd havenhue_backend
    
    # Run migrations
    
        python manage.py migrate
    
    # Create an admin user
    
        python manage.py createsuperuser
    
    # Start the backend server
    
        python manage.py runserver

3. Setup Frontend

      cd havenhue-frontend
      npm install
      npm run dev
      Open your browser at http://localhost:5173 and start using the app.

📸 Screenshots
(Add UI screenshots for product list, cart, order summary)

📚 What I Learned
    Built a functional e-commerce backend using Django
    
    Built reusable components and stateful pages in React
    
    Implemented cart logic and session-based authentication
    
    Styled modern UI with TailwindCSS


🧑‍💻 Author
Julius Gacheru — @banju-che


---

### 🛠️ Now, What Does This Do?

