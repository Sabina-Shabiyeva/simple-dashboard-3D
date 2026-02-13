const STORAGE_KEY = "designers";

const getStoredData = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

const setStoredData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const designerService = {
  getAll: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStoredData());
      }, 500);
    });
  },

  create: async (designer) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentData = getStoredData();
        const newDesigner = { ...designer, id: Date.now() };
        const updatedData = [...currentData, newDesigner];
        setStoredData(updatedData);
        resolve(newDesigner);
      }, 500);
    });
  },

  update: async (id, values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentData = getStoredData();
        const updatedData = currentData.map((item) =>
          item.id === id ? { ...item, ...values } : item
        );
        setStoredData(updatedData);
        resolve({ id, ...values });
      }, 500);
    });
  },

  delete: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentData = getStoredData();
        const updatedData = currentData.filter((item) => item.id !== id);
        setStoredData(updatedData);
        resolve(id);
      }, 500);
    });
  },
};