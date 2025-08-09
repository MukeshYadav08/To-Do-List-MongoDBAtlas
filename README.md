# 📝 To-Do List Web Application

A full-stack **To-Do List** web application built with **Node.js**, **Express.js**, **EJS**, and **MongoDB Atlas**.  
It allows users to **add, edit, delete, and mark tasks as complete** with priority settings.

---

## 📌 Features
- ➕ **Add Tasks** — with priority levels: `Low`, `High`, `Urgent`
- ✏️ **Edit Tasks** — update task title & priority (pencil icon)
- 🗑 **Delete Tasks** — remove tasks with confirmation alert (trash icon)
- ✅ **Mark Complete/Incomplete** — toggle with checkbox
- 🔍 **Filter by Priority** — view only tasks of a specific priority
- ⚡ **Real-Time Alerts** — success/error messages on actions
- 🎨 **Styled UI** — responsive design with priority color coding
- 📦 **Data Persistence** — all tasks stored in **MongoDB Atlas**

---

## 🛠 Tech Stack
- **Frontend**: EJS, CSS, Font Awesome
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas (via Mongoose)
- **Other**: method-override, body-parser

---

## 📂 Project Structure
📁 project-root
┣ 📁 public #  css folder
┃ ┗ 📄 styles.css # Main stylesheet
┣ 📁 views # EJS templates
┃ ┗ 📄 index.ejs # Main UI page
┣ 📄 index.js # Main server file
┣ 📄 package.json # Dependencies & scripts
┣ 📄 README.md # Project documentation
┗ 📄 .env # Environment variables (MongoDB URI)
