import User from '../models/user.model.js';

export const getAllUsers = (req, res) => {
    User.getAllUsers((err, data) => {
        if (err) {
            res.status(500).json({ 
                message: "Error retrieving users", error: err 
            });
        } else {
            res.json(data);
        }
    });
};

export const getUserById = (req, res) => {
    User.getUserById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({ 
                    message: `User with id ${req.params.id} not found` 
                });
            } else {
                res.status(500).json({ 
                    message: "Error retrieving user", error: err 
                });
            }
        } else {
            res.json(data);
        }
    });

};

export const updateUserById = (req, res) => {
    const userId = req.params.id;
    const userData = req.body;

    User.updateUserById(userId, userData, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `User not found with id ${userId}`
                });
            } else {
                res.status(500).json({
                    message: "Error updating user",
                    error: err
                });
            }
        } else {
            res.status(200).json({
                message: "User updated successfully",
                data: data
            });
        }
    });
};


export const deletedUserById = (req, res) => {
    const userId = req.params.id;
    const userData = req.body;
    

}


