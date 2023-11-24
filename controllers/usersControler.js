const HttpError = require("../helpers/HttpError.js");

const {
  register,
  login,
  logout,
  changeStatus,
} = require("../services/UserAuthService.js");

class UsersController {
  signUp = async (req, res) => {
    const { email, password } = req.body;
    const newUser = await register(email, password, req.body);

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  };

  signIn = async (req, res) => {
    const { email, password } = req.body;

    const { updatedUser, token } = await login(email, password);

    res.json({
      token,
      user: {
        email: updatedUser.email,
        subscription: updatedUser.subscription,
      },
    });
  };

  getCurrentUser = async (req, res) => {
    const { email, subscription } = req.user;
    if (!email) {
      throw HttpError(401, "Not authorized");
    }

    res.json({
      email,
      subscription,
    });
  };

  logOut = async (req, res) => {
    const { _id } = req.user;
    const result = await logout(_id);
    if (!result) {
      throw HttpError(401, "Not authorized");
    }

    res.status(204).json({ message: "Logout Success" });
  };

  onChangeSubscription = async (req, res) => {
    const { subscription } = req.body;
    const { _id } = req.user;

    const user = await changeStatus(_id, subscription);

    res.status(201).json({
      user: {
        email: user.email,
        subscription,
      },
    });
  };
}

module.exports = new UsersController();
