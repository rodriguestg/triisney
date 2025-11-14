export const db = {
  collection: jest.fn(() => db),
  doc: jest.fn(() => db),
  set: jest.fn(() => Promise.resolve()),
  update: jest.fn(() => Promise.resolve()),
  delete: jest.fn(() => Promise.resolve()),
  get: jest.fn(() => Promise.resolve({
    exists: true,
    data: () => ({ title: "Mock Movie", year: 1979 })
  })),
};