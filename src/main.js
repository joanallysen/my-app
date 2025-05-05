// Get all required modules
const { app, BrowserWindow, ipcMain, nativeTheme, Menu } = require('electron');
const path = require('path');
const dotenv = require('dotenv');
const { MongoClient, ObjectId } = require('mongodb');

// Load environment variables
dotenv.config();

// MongoDB Connection
const uri = process.env.MONGODB_URI;
let dbClient = null;
let db = null;

async function connectToMongoDB() {
  try {
    dbClient = new MongoClient(uri);
    await dbClient.connect();
    console.log('Connected to MongoDB');
    db = dbClient.db(process.env.DB_NAME || 'myapp');
    return true;
  } catch (err) {
    console.error('Cannot connect to MongoDB:', err);
    return false;
  }
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
  });

  // Load the app - Vite dev server or built files
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
  // Menu.setApplicationMenu(menu);
  
  // Connect to MongoDB when the app starts

  connectToMongoDB();
};

// Create window when app is ready
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit app when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
  if (dbClient) {
    dbClient.close();
    console.log('MongoDB connection closed');
  }
  
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


// IPC Handlers for database operations
ipcMain.handle('get-items', async () => {
  try {
    if (!db) {
      const connected = await connectToMongoDB();
      if (!connected) return { success: false, items: [], error: 'Failed to connect to database' };
    }

    const collection = db.collection('items');
    const items = await collection.find({}).toArray();

    // Convert ObjectId to string for easier handling in the renderer process
    const itemsWithStringIds = items.map(item => ({
      ...item,
      _id: item._id.toHexString()  
    }));

    itemsWithStringIds.forEach(item => {
      console.log(item._id);  
    });

    return { success: true, items: itemsWithStringIds};
  } catch (error) {
    console.error('Error fetching items:', error);
    return { success: false, items: [], error: error.message };
  }
});

ipcMain.handle('add-item', async (item) => {
  try {
    if (!db) {
      console.log('hello world');
      const connected = await connectToMongoDB();
      if (!connected) return { success: false, error: 'Failed to connect to database' };
    }

    const collection = db.collection('items');
    const result = await collection.insertOne(item);
    return { success: true, id: result.insertedId };
  } catch (error) {
    console.error('Error adding item:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('remove-item', async(id) =>{
  try {
    if (!db) {
      const connected = await connectToMongoDB();
      if (!connected) return { success: false, error: 'Failed to connect to database' };
    }
    const collection = db.collection('items');
    await collection.deleteOne({ _id: new ObjectId(id) });

    return { success: true, message: 'Item successfully deleted' };
  } catch (error) {
    console.error('Error removing item:', error);
    return { success: false, error: error.message };
  }
})

