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
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if (existingUser) {
        throw new Error("Username or email already exists");
      }

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      return newUser;
    } catch (error) {
      // If there is an error creating the user, throw the error
      throw error;
    }
  },

  async signIn(username: string, password: string) {
    try {
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
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};

export default AuthService;
