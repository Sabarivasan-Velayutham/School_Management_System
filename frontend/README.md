# LEARNING HUB

A College Based Data Management System.

- There are three roles: Teacher, HOD and Student.

## Login Details

### Teacher

**username:** teacher1  
**pwd:** teacher1123

**username:** teacher2  
**pwd:** teacher2123

Teacher can add or edit

- Notes

### HOD

**username:** hod
**pwd:** admin123

HOD can do everything Teacher can.  
HOD can also

- Add New Group

### Student

**username:** stud1  
**pwd:** stud1123

**username:** stud2
**pwd:** stud2123

Register a new Student and Login.  
You can also login with the First Name of any student in the class.

Student can view

- Notes

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
