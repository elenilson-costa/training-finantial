const pg = require('pg');
const conString = "postgres://postgres:1234567@localhost/dbtreino_english";
let connection = "";

class DbPostgres{

    static async dbConnect(){
        
        if (connection === ""){
            try{
                console.log("PG connecting...");
                connection = new pg.Client(conString);
                await connection.connect();
                console.log("PG connected !");
            }catch(exception){
                console.log("Database connection error: "+exception);
            }
        }
        return connection;
        
    }

    static async seqNextVal(sequence) {
        let connection = await DbPostgres.dbConnect();

        const result = await connection.query("SELECT nextval('"+sequence+"')")
                                        .then( (result) => {
                                            console.log(result.rows[0].nextval);
                                            return result.rows[0].nextval;
                                        }).catch((err) => {
                                            console.log("Database error menssage: "+err);
                                        });

        
        console.log("result.nextval: "+result);
        return result;
    }

}

module.exports = DbPostgres;