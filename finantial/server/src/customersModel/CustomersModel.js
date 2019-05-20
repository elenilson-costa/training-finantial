const DbPostgres = require("../database/DbPostgres");

class CustomersModel{
    
    async listAllCustomers() {
        let connection = await DbPostgres.dbConnect();

        const result = await connection.query(`SELECT cd_customer, 
                                                nm_customer, 
                                                to_char(dt_cliente_since, 'yyyy-mm-dd') dt_cliente_since, 
                                                ds_adress, 
                                                nr_adress_number, 
                                                nm_neigborhood, 
                                                nm_city, 
                                                nm_state, 
                                                ds_zip_code, 
                                                ds_complement, 
                                                vl_credit_limit
                                        FROM app.customers`)
                                        .then( (result) => {
                                            return result.rows;
                                        }).catch((err) => {
                                            console.log("Database menssage: "+err);
                                        });

        return result;
    }

    async insertData(dataObject){

        let connection = await DbPostgres.dbConnect();
        const sequence = await DbPostgres.seqNextVal("app.seq_customers");
        try{
            await connection.query(`INSERT INTO app.customers 
            (cd_customer, 
                nm_customer, 
                dt_cliente_since, 
                ds_adress, 
                nr_adress_number, 
                nm_neigborhood, 
                nm_city, 
                nm_state, 
                ds_zip_code, 
                ds_complement, 
                vl_credit_limit)
        VALUES ($1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8,
                $9,
                $10,
                $11)`
                ,
                [sequence, 
                dataObject.nm_customer, 
                dataObject.dt_cliente_since, 
                dataObject.ds_adress, 
                dataObject.nr_adress_number, 
                dataObject.nm_neigborhood, 
                dataObject.nm_city, 
                dataObject.nm_state, 
                dataObject.ds_zip_code, 
                dataObject.ds_complement, 
                dataObject.vl_credit_limit]
                );
                console.log("Inserted with code: "+sequence);
            }
        catch(exception){
            console.log(exception);
            return {sequence: -1, error: exception};
        }

        return {sequence: sequence, error: null};

    }

    async updateData(key ,dataObject){

        let connection = await DbPostgres.dbConnect();
        const code = key;
        try{
            await connection.query(
            `UPDATE app.customers 
            nm_customer = $1, 
             dt_cliente_since = $2, 
             ds_adress = $3, 
             nr_adress_number = $4, 
             nm_neigborhood = $5, 
             nm_city = $6, 
             nm_state = $7, 
             ds_zip_code = $8, 
             ds_complement = $9, 
             vl_credit_limit = $10
        WHERE cd_customer = $11)`
                ,
                [dataObject.nm_customer, 
                dataObject.dt_cliente_since, 
                dataObject.ds_adress, 
                dataObject.nr_adress_number, 
                dataObject.nm_neigborhood, 
                dataObject.nm_city, 
                dataObject.nm_state, 
                dataObject.ds_zip_code, 
                dataObject.ds_complement, 
                dataObject.vl_credit_limit,
                code]
                );
                console.log("Inserted with code: "+sequence);
            }
        catch(exception){
            console.log(exception);
            return {code: -1, error: exception};
        }

        return {code: code, error: null};

    }

}

module.exports = CustomersModel;