# An Express.js CBT LAN APP

An application that allows you to serve a computer based test/exam on a local area network

**Software needed:**

- MongoDB
- nodejs

**Format:**

- 'npm install' to install needed modules (ejs, bodyParser, expressjs, mongoose, nodemon)
- Go to app.js and place your ipv4 where shown
- 'npm run dev' to run the app with nodemon
- Go to mongodb and create a collection in cbt called studentresults (all lowercase)
- Go to ipv4:5000/lecturer and set details then set questions
- After questions are set, students pages will be running on ipv4:3300/students (port can be changed if needed)
