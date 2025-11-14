export class FirestoreMock {
  constructor() {
    this.data = {};
  }

  collection(name) {
    if (!this.data[name]) this.data[name] = [];

    return {
      add: async (data) => {
        const id = String(Date.now() + Math.random());
        const doc = { id, ...data };
        this.data[name].push(doc);
        return { id };
      },

      where: (field, op, value) => {
        const results = this.data[name].filter(item => item[field] === value);

        return {
          get: async () => ({
            empty: results.length === 0,
            docs: results.map(doc => ({
              id: doc.id,
              data: () => doc
            }))
          })
        };
      },

      doc: (id) => ({
        get: async () => {
          const doc = this.data[name].find(d => d.id === id);
          return { exists: !!doc, id, data: () => doc };
        },

        set: async (data) => {
          const i = this.data[name].findIndex(d => d.id === id);

          if (i === -1) {
            const newDoc = { id, ...data };
            this.data[name].push(newDoc);
          } else {
            this.data[name][i] = { id, ...data };
          }
        },

        update: async (data) => {
          const i = this.data[name].findIndex(d => d.id === id);
          if (i === -1) throw new Error("Doc not found");
          this.data[name][i] = { ...this.data[name][i], ...data };
        },

        delete: async () => {
          this.data[name] = this.data[name].filter(d => d.id !== id);
        }
      }),

      get: async () => {
        const docs = this.data[name].map(doc => ({
          id: doc.id,
          data: () => doc
        }));
        return {
          docs,
          forEach: (cb) => docs.forEach(cb),
        };
      }
    };
  }
}

export const firestore = new FirestoreMock();
