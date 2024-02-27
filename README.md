# LEARNING HUB

A College Based Data Management System.

## Getting Started

1) Clone the repository to your local machine using git clone<br>
2) Navigate to the project directory<br>
3) Install the required dependencies for both the frontend and backend using ```npm install``` in the backend and frontend directory.<br>
4) Configure the MongoDB connection string in the backend to connect to your local or remote MongoDB database.<br>
5) Run the whole application using ```npm run dev``` in the backend directory<br>
6) The application should now be accessible at http://localhost:3000 in your web browser

- There are three roles: Teacher, HOD and Student.

## Login Details

### Teacher

**username:** teacher1  
**pwd:** teacher1123

**username:** teacher2  
**pwd:** teacher2123

Teacher can add or edit notes in groups<br>
Teacher can start video conference call

### HOD

**username:** hod<br>
**pwd:** admin123

HOD can do everything Teacher can.  <br>
HOD can also add New Group and can upload notes.<br>
HOD can view all groups and can view uploaded notes by teachers.

### Student

**username:** stud1  <br>
**pwd:** stud1123

**username:** stud2<br>
**pwd:** stud2123

Register a new Student and Login.  <br>

Student can view notes in groups.<br>
Student can also join or leave a Group(Subject).

## Tech Stack

**Front-End:** <img src="https://cdn.svgporn.com/logos/react.svg" height="12" width="12"> React, <img src="https://cdn.svgporn.com/logos/tailwindcss-icon.svg" height="12" width="12"> TailwindCSS

**Server:** <img src="https://cdn.svgporn.com/logos/nodejs-icon.svg" height="12" width="12"> NodeJS, ExpressJS

**Database:** <img src="https://cdn.svgporn.com/logos/mongodb-icon.svg" height="12" width="12">MongoDB, Mongoose

## Other Features

- Profile
- Dark Theme
- Mobile Responsive

### Still getting errors?

In the Learning Hub project, go to config/allowedOptions.js. Make sure your front-end address is included:

```javascript
const allowedOrigins = ["http://localhost:3000"];
```
