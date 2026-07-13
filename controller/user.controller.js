const User = require("../models/User");
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ errors: "Please Enter a Unique Email" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashpass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email ,
        password: hashpass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const Authtoken = jwt.sign(data, process.env.JWT_SECRTE);
      res.json({ Authtoken });
      } catch (error) {
      console.log(error.message);
      res.status(400).send("Internal Server Error");
        
    }
}

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("Enter correct email");
      }
    
      const comparePass = await bcrypt.compare(password, user.password);
      if (!comparePass) {
        return res.status(400).send("Enter corect password");
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const Authtoken = jwt.sign(data, process.env.JWT_SECRTE);
      res.json({ Authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(400).send("Internal Server Error");
    }
}


module.exports = {
  register,
  login,
};


