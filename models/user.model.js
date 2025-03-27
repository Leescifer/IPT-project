import db from '../config/connect.config.js';

const User = {

    getAllUsers: (result) => {
        db.query("SELECT * FROM users", (err, res) => {
            if (err) {
                console.error("Error fetching users:", err);
                result(err, null);
                return;
            }
            result(null, res);
        });
    }, 

    getUserById: (id, result) => {
        db.query(
            "SELECT * FROM users WHERE id = ?",
            [id], (err, res) => {
                if (err) {
                    console.error("Error fetching user:", err);
                    result(err, null);
                    return;
                }
                if (res.length) {
                    result(null, res[0]);
                } else {
                    result({ kind: "not_found" }, null);
                }
            });
    },

    updateUserById: (id, userData, result) => {
        db.query(
            "UPDATE users SET ? WHERE id = ?",
            [userData, id],
            (err, res) => {
                if (err) {
                    console.error("Error updating user:", err);
                    result(err, null);
                    return;
                }
                if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }
                result(null, { id, ...userData });
            }
        );
    },

    deleteUserById: (id, result) => {
        db.query(
            "UPDATE users SET status = 'deactivted' WHERE id = ?", [id], (err, res) => {
            if (err) {
                console.error("Error deactivating user:", err);
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { message: "User deleted/deactivated successfully", id });
        });
    }
};

export default User;
