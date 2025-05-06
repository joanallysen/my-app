# 📝 Electron To-Do List

cross-platform desktop To-Do List app built with [Electron](https://www.electronjs.org/) and [MongoDB](https://www.mongodb.com/). Easily add, view, and delete your tasks with persistent cloud storage.

---

## 📸 Preview
![{45335A72-EDFD-43AB-808D-12D8FFF5DDF8}](https://github.com/user-attachments/assets/d927daf5-d43a-4555-ac75-f39965e01c63)
---

## ✨ Main Features

- 🔄 Add, fetch, and delete tasks
- 📦 MongoDB Atlas-backed task storage (cloud-based MongoDB)
- 💾 Environment variables with `dotenv`

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/joanallysen/simple-todo-electron
   cd my-app
   ```
   
2. **Install dependencies**
    ```bash
    npm install
    ```
--- 

## 🌐 Environment Setup

Create a `.env` file in the root folder and add your MongoDB connection URI:
  ```bash
  MONGODB_URI=your-mongodb-connection-uri
  DB_NAME=myapp
  ```

---

## 🍃 Mongo Database Setup
Before running the app, you need to create your own MongoDB database using MongoDB Compass or the MongoDB Atlas UI.

1. Create an account on MongoDB Atlas: If you don’t already have one, sign up at MongoDB Atlas.
2. Create a cluster: After signing in, create a new cluster and database.
3. Connect to your cluster:
   - In MongoDB Atlas, find your connection string (URI) in the Connect tab.
   - Copy the connection string and replace the <password> placeholder with your MongoDB password.
4. Set up MongoDB Compass (optional): You can use MongoDB Compass for a graphical interface to manage your database. Download it from MongoDB Compass.

Once your database is ready, paste your connection URI in the .env file under MONGODB_URI during next next step.

---

## ▶️ Usage
To start the application:
  ```bash
  npm start
  ```

---

## 📡 IPC Methods
`get-items` Fetches all items from the MongoDB database

`add-item` Adds a new to-do item to the database

`remove-item ` remove an existing to-do item by its _id.

---


  
