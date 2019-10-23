const db = require('./conn'); 

class Buyer {
    constructor(name) {
        this.name = name;  
    }
    static async getAll() {
        try {
            const response = await db.any(`SELECT * from buyers`)  
            // console.log('response', response); 
            return response; 
        } catch(error) {
            return error.message; 
        }
    }
    static async getById(id) {
        try{
            const response = await db.one(
                `SELECT * FROM buyers WHERE id = ${id};`
                ); 
                // console.log("response", response);
                return response; 
        } catch(err) {
            return err.message; 
        }
    }
}

module.exports = Buyer; 