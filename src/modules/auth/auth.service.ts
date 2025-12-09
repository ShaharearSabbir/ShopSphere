import { pool } from "../../config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const signUp = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await pool.query(
    `
        INSERT INTO users(email, password) VALUES($1, $2) RETURNING *
        `,
    [email, hashedPassword]
  );

  return { success: true, message: "Signup successful", data: result.rows[0] };
};

const signIn = async (email: string, password: string) => {
  const result = await pool.query(
    `
        SELECT * FROM users WHERE email=$1
        `,
    [email]
  );
  if (!result.rowCount) {
    return { success: false, message: "Incorrect email or password." };
  }

  const user = result.rows[0];

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return { success: false, message: "Incorrect email or password." };
  }

  const secret = config.JWT_SECRET;
  const data = { id: user.id, email: user.email, role: user.role };

  const token = jwt.sign(data, secret, { expiresIn: "7d" });

  return {
    success: true,
    message: "Signin Successful",
    token: token,
    data: data,
  };
};

export const authService = {
  signUp,
  signIn,
};
