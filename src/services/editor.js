const OBJECTS_KEY = "objects";
const DESIGNERS_KEY = "designers";

const getStoredObjects = () =>
  JSON.parse(localStorage.getItem(OBJECTS_KEY)) || [];
const setStoredObjects = (data) =>
  localStorage.setItem(OBJECTS_KEY, JSON.stringify(data));

export const editorService = {
  getObjects: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getStoredObjects()), 300);
    });
  },

  getDesigners: async () => {
    return new Promise((resolve) => {
      const designers = JSON.parse(localStorage.getItem(DESIGNERS_KEY)) || [];
      setTimeout(() => resolve(designers), 300);
    });
  },

  createObject: async (objectData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const objects = getStoredObjects();
        const newObj = { ...objectData, id: Date.now() };
        setStoredObjects([...objects, newObj]);
        resolve(newObj);
      }, 300);
    });
  },

  updateObject: async (id, values) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const objects = getStoredObjects();
        const updated = objects.map((obj) =>
          obj.id === id ? { ...obj, ...values } : obj,
        );
        setStoredObjects(updated);
        resolve(updated);
      }, 300);
    });
  },

  deleteObject: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const objects = getStoredObjects();
        const filtered = objects.filter((obj) => obj.id !== id);
        setStoredObjects(filtered);
        resolve(filtered);
      }, 300);
    });
  },
};
