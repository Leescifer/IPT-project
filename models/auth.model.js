import db from '../config/connect.config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY= SECRET_KEY;

const Auth = {
    signUp: async (name, email, password, age, status, callback) => {
        try {
            //Pasword hashing
            const hashedPassword = await bcrypt.hash(password, 10); 
            db.query(
                'INSERT INTO users (name, email, password, age, status) VALUES (?, ?, ?, ?, ?)',
                [name, email, hashedPassword, age, status],
                (err, res) => {
                    if (err) {
                        console.error("Error creating user:", err);
                        callback(err, null);
                        return;
                    }
                    callback(null, { id: res.insertId, name, email, age, status });
                }
            );
        } catch (error) {
            console.error("Error hashing password:", error);
            callback(error, null);
        }
    },

    signIn: (email, password, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], async (err, res) => {
            if (err) {
                console.error("Error signing in user:", err);
                callback(err, null);
                return;
            }

            if (!res.length) {
                callback({ kind: "not_found" }, null);
                return;
            }

            const user = res[0];

            // Compare hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                callback({ kind: "invalid_password" }, null);
                return;
            }

            // Generate JWT Token
            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

            callback(null, { user: { id: user.id, name: user.name, email: user.email, age: user.age, status: user.status }, token });
        });
    },

    signOut: (email, callback) => {
        // Normally, you’d manage tokens client-side (e.g., remove JWT from local storage).
        // If using sessions, you'd clear session data from the DB or memory.
        callback(null, { message: "Signed out successfully" });
    }
};

export default Auth;
