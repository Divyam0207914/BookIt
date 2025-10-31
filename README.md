🌄 BOOKIT - Experience Booking Platform
    A modern real-time booking platform built with Next.js, MongoDB, and Tailwind CSS — where users can explore, book, and manage   unique adventure experiences with live availability and promo code discounts.

🚀 Features

    ✅ Browse curated adventure & travel experiences
    ✅ Real-time slot availability with live database updates
    ✅ Secure booking confirmation flow
    ✅ Promo code validation and automatic discount application
    ✅ Responsive, clean UI built with Tailwind CSS
    ✅ Modular folder structure for easy scalability
    ✅ API routes for Experiences, Bookings, and Promo validation

🧩 Tech Stack
    Frontend - Next.js 14 (App Router), React, Tailwind CSS
    Backend - Next.js API Routes, Node.js
    Database - MongoDB + Mongoose
    Deployment - Vercel , RENDER 
    State Management - React Hooks, Axios
    Version Control - Git + GitHub

⚙️ Setup Instructions

    1️⃣ Clone the repository

    2️⃣ Install dependencies
        npm install

    3️⃣ Add environment variables
    Create a .env.local file in the project root and add:

        MONGODB_URI=your_mongodb_connection_string
        NEXT_PUBLIC_API_URL=http://localhost:3000

    4️⃣ Run the development server
        npm run dev
        Visit → http://localhost:3000


🌱 Database Seeding
    To populate the database with default experiences, run:
        GET /api/seed
    This will insert 15 sample experiences with multiple available slots.

💰Promo Codes
    Test promo validation via:
        POST /api/promo/validate

    Valid Codes:
        SAVE10 means 10% Off
        FLAT100	means ₹100 Off

🧾 API Endpoints
    /api/experiences-GET-Fetch all experiences
    /api/experiences/[id]-GET-Fetch single experience
    /api/bookings-POST-Create a booking
    /api/promo/validate-POST-Validate promo codes
    /api/seed-GET-Seed initial sample data

🧠 Future Enhancements

    ✨ Stripe Payment Integration
    Secure and real payment gateway for checkout.

    🧑‍💼 Admin Dashboard
    Manage experiences, bookings, and users.

    ⭐ Reviews & Ratings
    Enable feedback and experience reviews.

    📍 Geo-location Search
    Find experiences near user’s location.

    📱 Progressive Web App (PWA)
    Add offline access and app-like installable behavior.

    📧 Email Notifications
    Send booking confirmations and reminders.

    📊 Analytics Dashboard
    Track user engagement, revenue, and booking trends.

🧑‍💻 Author-Divyam Saraf
    Full-Stack Developer | Passionate about clean UI and scalable backend systems
    divyamsaraf192@gmail.com | https://www.linkedin.com/in/divyam-saraf-9a2057318
    
