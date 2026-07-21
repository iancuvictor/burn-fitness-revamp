# FULL-STACK PROJECT BUILT IN REACT.JS, MONGO.DB, EXPRESS.JS AND TAILWIND.CSS

This project is a revamp of the Burn Fitness Cluj-Napoca website. It is not meant in any way shape or form to be used for the actual business. This came as a learning experience mostly.

#### trial account (1) (student, so auto-discount is applied at checkout):
- username: iancu
- password: 1
#### trial account (2) (not student, no auto-discount):
- username: lorena
- password: 2

## As of now, the page only contains minimal content, just enough to prove the website works.
- In order to use the website to it's full potential, allow the Render backend to load first (could take up to a minute), so that all the resources load (subscriptions, account auth, etc)
- I have removed anything that is not yet filled with content, so the only thing remaining is the information for the Zorilor Gym.

### Known issues:
- Email sending can be rate limited, which leads to you not receiving your confirmation email for registration, or the free trial day.
  (The functionality is there. Account activation works fine, free trial as well, the only issue is the fact you can't actually receive the email)

### List of features
- Fully responsive design (mobile, desktop)
- Stripe payments (everything is free for now in order for you to be able to test it properly)
- User registration/authentication
- Admin dashboard with all the needed capabilities to mentain and update the website/users.
- Classes timetable built from scratch (with filtering)
- Signing up/out for classes
- Profile page with settings, data display and classes management.
- QR Code for easy check-in/check-out at the gym

### List of things that still need to be done:
- Fixing email bugs
- Polishing frontend (right now it contains only the minimal content needed for proof of concept)
- Polishing backend (eg. adding status codes to each response; proper error handling; etc)
- Polishing admin dashboard (unfinished, but usable enough to create, update, delete, and modify the website)
- Switching from hardcoded data to fully dynamic data (no page besides the landing page will exist because it was HARDCODED. Everything will be dynamically added by the admin through the admin dashboard)
- Overall structural changes, more conectivity between the mongodb Models (removing unnecessary models and or polishing schemas so they contain less lines)
- Switching to Typescript (this is more for learning purposes)
