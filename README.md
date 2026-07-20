# FULL-STACK PROJECT BUILT IN REACT.JS, MONGO.DB, EXPRESS.JS AND TAILWIND.CSS

This project is a revamp of the Burn Fitness Cluj-Napoca website. It is not meant in any way shape or form to be used for the actual business. This came as a learning experience mostly.

## As of now, the page only contains minimal content, just enough to prove the website works.
- I have removed anything that is not yet filled with content, so the only thing remaining is the information for the Zorilor Gym.

### Known issues:
- Email sending can be rate limited, which leads to you not receiving your confirmation email for registration, or the free trial day.
  (The functionality is there. Account activation works fine, free trial as well, the only issue is the fact you can't actually receive the email)

### List of features
- Fully responsive design (mobile, desktop)
- Stripe payments
- User registration/authentication
- Admin dashboard with all the needed capabilities to mentain and update the website
- Classes timetable built from scratch (with filtering)
- Signing up/out for classes
- Profile page with settings, data display and classes management.
- QR Code for easy check-in/check-out at the gym

### List of things that still need to be done:
- Fixing email bugs
- Polishing frontend (right now it contains only the minimal content needed for proof of concept)
- Polishing backend (eg. adding status codes to each response; proper error handling; etc)
- Polishing admin dashboard (unfinished, but usable enough to create, update, delete, and modify the website)
- Overall structural changes, more conectivity between the mongodb Models (removing unnecessary models and or polishing schemas so they contain less lines)
- Adding page creation, not just page updating (right now you can update the pages but I will add a page creation system)
