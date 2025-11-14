import jwt from "jsonwebtoken";

export function createTestUser() {
  return {
    id: "test-user-123",
    name: "Gabriel Test",
    email: "gabriel@test.com"
  };
}

export function generateTestToken(user = createTestUser()) {
  return jwt.sign(user, process.env.JWT_SECRET || "test-secret", {
    expiresIn: "1h",
  });
}