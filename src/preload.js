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
  }
});