import bcrypt from "bcryptjs";

import User from "../models/user";
import Product from "../models/product";

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

    return User.create({ ...args, email, password });
  },
  createProduct: async (parent, args, { userId }, info) => {
    // const userId = "5e96c92ace4f616570ef2fc0";

    // Check if user logged in
    if (!userId) throw new Error("Please log in.")

    if (!args.name || !args.description || !args.price) {
      throw new Error("Please provide all required fields.");
    }

    const product = await Product.create({ ...args, user: userId });

    const user = await User.findById(userId);

    if (!user.products) {
      user.products = [product];
    } else {
      user.products.push(product);
    }

    await user.save();

    return Product.findById(product.id).populate({
      path: "user",
      populate: { path: "products" }
    });
  },
  updateProduct: async (parent, args, { userId }, info) => {
    const { id, name, description, price } = args;

    // TODO: Check if user logged in
    // Check if user logged in
    if (!userId) throw new Error("Please log in.")

    // หา product ใน database
    const product = await Product.findById(id);

    // TODO: Check if user is the owner of the product
    // const userId = "5e96c92ace4f616570ef2fc0";

    if (userId !== product.user.toString()) {
      throw new Error("You are not authorized.");
    }

    // Form ที่ใช้ในการ updated
    const updateInfo = {
      name: !!name ? name : product.name,
      description: !!description ? description : product.description,
      price: !!price ? price : product.price
    };

    // Update product ใน database
    await Product.findByIdAndUpdate(id, updateInfo);

    // หา Product ที่ update มาแสดง
    const updatedProduct = await Product.findById(id).populate({
      path: "user"
    });

    return updatedProduct;
  },
  deleteProduct: async (parent, args, { userId }, info) => {
    const { id } = args;

    // Find product from given id
    const product = await Product.findById(id);

    // TODO: user id from request --> Find user
    // const userId = "5e96c92ace4f616570ef2fc0";

    // Check if user logged in
    if (!userId) throw new Error("Please log in.");

    const user = await User.findById(userId)

    // Check ownership of the product
    if (product.user.toString() !== userId) {
      throw new Error("Not authorized.")
    }

    // Delete product
    const deletedProduct = await Product.findOneAndRemove(id);

    // Update user's products
    const updatedUserProducts = user.products.filter(
      productId => productId.toString() !== deletedProduct.id.toString()
    );

    await User.findByIdAndUpdate(userId, { products: updatedUserProducts });

    return deletedProduct;
  }
};

export default Mutation;
