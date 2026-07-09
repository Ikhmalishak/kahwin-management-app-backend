const pool = require("../config/db");

//find user by email
const findUserByEmail = async(email) => {
    const result = await pool.query(
        "SELECT * from users WHERE email = $1 AND deleted_at IS NULL",
        [email]
    );

    return result.rows[0];
}

module.exports = {
    findUserByEmail,
}