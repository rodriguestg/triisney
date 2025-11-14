import authService from "../services/auth.service.js";

class AuthController {
  async register(req, res) {
    try {
      const userData = req.body;
      const newUser = await authService.registerUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const token = await authService.loginUser(email, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  async logout(req, res) {
    try {
      const userId = req.user.id;
      await authService.logoutUser(userId);
      res.status(200).json({ message: "Você saiu com sucesso!" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

export default new AuthController();