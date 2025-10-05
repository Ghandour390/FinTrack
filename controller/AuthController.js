const bcrypt = require("bcrypt");
// const session = require("express-session");
const { User } = require("../models");
const nodemailer = require("nodemailer");
const GeneRate4number = require("../service/Generate4number");

// console.log("session: ", session);

class AuthController {
  constructor() {
    // On peut ajouter des propriétés partagées ici
    this.saltRounds = 10;
  }

  async register(req, res) {
    const { lastName, firstName, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, this.saltRounds);
      const newUser = await User.create({
        lastName,
        firstName,
        email,
        password: hashedPassword,
      });
      req.session.user = {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      };
      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
        
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

 async login(req, res) {
  // console.log("reste");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.render("login", { message: "user indifined" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("login", { message: "password invalide" });
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    res.redirect("/dashboard");

  } catch (error) {
    console.error("Error logging in:", error);
    res.render("login", { message: "Internal server error" });
  }
}


  async modifieMotpasse(req, res) {
    const { email, oldPassword, newPassword } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid current password" });
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, this.saltRounds);
      user.password = hashedNewPassword;
      await user.save();
      res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  async restPasword(req, res) {
    const { email } = req.body;
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }
      const generate4number = new GeneRate4number();
      const code = generate4number.generate4number();
      const codeHash = await bcrypt.hash(code, this.saltRounds);
      user.restPasswordToken = codeHash;
      user.restPasswordExpires = new Date(Date.now() + 1000 * 60 * 60);
      await user.save();

      // Vérifier que les variables d'environnement sont définies
      console.log(
        "EMAIL_USER:",
        process.env.EMAIL_USER ? "Defini" : "Non defini"
      );
      console.log(
        "EMAIL_PASS:",
        process.env.EMAIL_PASS ? "Defini" : "Non defini"
      );

      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        return res
          .status(500)
          .json({
            message:
              "Email configuration missing. Please set EMAIL_USER and EMAIL_PASS environment variables.",
          });
      }

      // Test transporter configuration
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      // Verify transporter
      await transporter.verify();
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Reset Password",
        html: `<h1>Hello ${user.firstName}, your new password is ${code}</h1>
              <p>Your code will expire in 1 hour</p>
              <p>If you did not request a password reset, please ignore this email</p>`,
      };
      await transporter.sendMail(mailOptions);
      console.log("Code de réinitialisation généré et envoyé par email:", code);
      return res.render("CodeRestpasword", {
        message: "Password reset email sent successfully",
        email: email,
      });
    } catch (error) {
      console.error("Error updating password:", error);
      res
        .status(500)
        .json({ message: "Internal server error ", error: error.message });
    }
  }
  async modifieMotpasseByCode(req, res) {
    const { email, code } = req.body;
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      const isMatch = await bcrypt.compare(code, user.restPasswordToken);
      if (!isMatch) {
        return res.status(404).json({ message: "Invalid code" });
      }
      if (user.restPasswordExpires < new Date()) {
        return res.status(404).json({ message: "Code expired" });
      }

      res.render("profil", {
        message: "Password reset successfully",
        user: user,
      });
    } catch (error) {
      console.error("Error updating password:", error);

      res.render("CodeRestpasword", { message: "Invalid code" });
    }
  }

  async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).json({ message: "Failed to logout" });
        }
        res.clearCookie('connect.sid');
        return res.status(200).json({ message: "Logout successful" });
      });
    } catch (error) {
      console.error("Error during logout:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

}

module.exports = AuthController;
