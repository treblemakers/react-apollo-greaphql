import bcrypt from "bcryptjs"

import User from "../models/user"

// Fake database
// const users = [
//   {
//     id: "1",
//     name: "Somchai"
//   },
//   {
//     id: "2",
//     name: "Tom"
//   },
//   {
//     id: "3",
//     name: "Taro"
//   }
// ];

// const me = users[0];

const Mutation = {
    signup: async (parent, args, context, info) => {
      // ใช้ trim เพิ่อให้ไม่นับ spacebar หรือเว้นวรรค
      const email = args.email.trim().toLowerCase();
  
      // ตรวจสอบ E-mail กรณี E-mail นี้มีซ้ำใน database
      const currentUsers = await User.find({});
      const isEmailExist =
        currentUsers.findIndex(user => user.email === email) > -1;
  
      if (isEmailExist) {
        throw new Error("Email already exist.");
      }
  
      // ใส่เงื่อนไขเพื่อตรวจสอบ password
      if (args.password.trim().length < 6) {
        throw new Error("Password must be at least 6 characters.");
      }
  
      // ใช้ bcrypt เพื่อทำการแปลง password
      const password = await bcrypt.hash(args.password, 10);
  
      return User.create({ ...args, email, password })
    }
  };

export default Mutation