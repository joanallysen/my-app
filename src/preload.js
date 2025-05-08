const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use ipcRenderer
contextBridge.exposeInMainWorld('electronAPI', {
  getItems: async () => {
    const result = await ipcRenderer.invoke('get-items');
    return result;
  },
  addItem: async (item) => {
    const result = await ipcRenderer.invoke('add-item', item);
    return result;
  },
  removeItem: async(id) =>{
    const result = await ipcRenderer.invoke('remove-item', id);
    return result;
  },
  updateItem: async(id, field, value) =>{
    const result = await ipcRenderer.invoke('update-item', id, field, value);
    return result;
  }
});

// contextBridge.exposeInMainWorld('darkMode',{
//   toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
//   system: () => ipcRenderer.invoke('dark-mode:system')
// })