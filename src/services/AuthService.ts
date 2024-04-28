import bcrypt from "bcrypt";
import prisma from "../util/prisma";

const saltRounds = 10;

const AuthService = {
  // This function is used to sign up a new user
  async signUp(username: string, email: string, password: string) {
    // Hash the user's password using bcrypt
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);

    try {
      // Create a new user in the database
      const newUser = await prisma.user.create({
        data: {
          username, // The username of the new user
          email, // The email of the new user
          password: hashedPassword, // The hashed password of the new user
        },
      });
      return newUser;
    } catch (error) {
      // If there is an error creating the user, log the error and throw an error
      console.error(error);
      throw new Error("Error creating user");
    }
  },

  async signIn(username: string, password: string) {
    // Find the user with the provided username
    const user = await prisma.user.findUnique({ where: { username } });

    // Throw an error if the user does not exist
    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Compare the provided password with the hashed password of the user
    const isMatch = await bcrypt.compare(password, user.password);

    // Throw an error if the passwords do not match
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    // Return the user token if the sign in is successful
    return user;
  },
};

export default AuthService;
