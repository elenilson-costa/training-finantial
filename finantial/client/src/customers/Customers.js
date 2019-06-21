import React from 'react';
import '../FormDefault.css';
import './style.css';
import ActionBar from '../libs/ActionBar';
import axios from 'axios';
import BlockLib from '../libs/BlockLib';
import lib from '../libs/Lib';

class Customers extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            listCustomers: [],
            indexCustomer: 0,
            customer: this.cleanCustomer(),
            customerConfig:{arrayList: "listCustomers",
                            index: "indexCustomer",
                            objectName: "customer",
                            objectClean: ()=>this.cleanCustomer(),
                            readOnly: false,
                            changed: false,
                            insertData: ()=>this.insertData(),
                            updateData: ()=>this.updateData()
                           }

                       };

        this.customerBlock = new BlockLib("customer");

    }

    cleanCustomer(){
        return {cd_customer: {value: "", readOnly: true}, 
                nm_customer: {value: "", readOnly: true}, 
                dt_cliente_since: {value: "", readOnly: true}, 
                ds_adress: {value: "", readOnly: true}, 
                nr_adress_number: {value: "", readOnly: true}, 
                nm_neigborhood: {value: "", readOnly: true}, 
                nm_city: {value: "", readOnly: true}, 
                nm_state: {value: "", readOnly: true}, 
                ds_zip_code: {value: "", readOnly: true}, 
                ds_complement: {value: "", readOnly: true}, 
                vl_credit_limit: {value: "", readOnly: true}
            };
    }

    async stateController(state = this.state){
        await this.setState(state);
        return state;
    }

    afterCustomerInsertMode(){
        this.customer.nm_customer.focus();
     }

    clearCustomer(){
        this.setState({customer: this.cleanCustomer()});
    }

    closeComponent() {
        this.props.closeForm("customer");
    }

    async insertData(){
        const result = axios.post('http://localhost:5000/ConsoleApiPost', {
            params: {
                call: "InsertCustomer",
            },
            customer: lib.toDataObject(this.state.customer)
        })
        .then(async res =>{

            const result = await res.data;
            if (result.sequence === -1){
                return "Insert server return fall: "+result.error;
            }
            const customer = await this.state.customer;
            customer.cd_customer.value = result.sequence;
            await this.setState({customer: customer});
            
            
            return "OK";

        });

        return result;

    }

    async updateData(){
        const result = axios.put('http://localhost:5000/ConsoleApiPut', {
            params: {
                call: "UpdateCustomer",
            },
            customer: lib.toDataObject(this.state.customer)
        })
        .then(async res =>{

            const result = await res.data;
            if (result.code === "ERROR"){
                return "Update server return fall: "+result.error;
            }

            return "OK";

        });

        return result;

    }

    executeQuery(){

        axios.get('http://localhost:5000/ConsoleApiGet', {
            params: {
                call: "ListAllCurtomers"
                }
            })
            .then(async res => {

                const records = await res.data;
                console.log(records);
                const listCustomers = records;

                for (const index in listCustomers){
                    const objServer = listCustomers[index];
                    const attribArray = Object.getOwnPropertyNames(objServer);
                    for(let attribIndex in attribArray){
                        const attribName = attribArray[attribIndex];
                        if (listCustomers[index][attribName] === null) {
                            listCustomers[index][attribName] = "";
                        }
                    }
                }
        
                this.setState({
                    listCustomers: listCustomers
                });
                this.setState(this.customerBlock.renderValues(this.state));
            });

    }


    handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        const object = lib.getStringPart(name, 1, ".");
        const attrib = lib.getStringPart(name,2, ".");
        let forUpdate = this.state;
        forUpdate = forUpdate[object][attrib].value = value.toUpperCase();
        this.setState({forUpdate});
    }

    render(){
        return(
            <div className="outsideContainer">
                <div className="divTitle" >
                    <div sytle={{top:"0"}}>
                        <h3 className="formTitle" style={{left:"400px"}}>Customers Registers</h3>
                    </div>
                </div>

                <ActionBar callerState={this.state} 
                           stateController={(state)=>{this.stateController(state)}} 
                           objectList="listCustomers" 
                           object="customer"
                           blockLib={this.customerBlock}
                           renderValues={()=>{this.renderValues()}} 
                           executeQuery={()=>this.executeQuery()}
                           closeComponent={()=>this.closeComponent()}
                           />

                <div className="FormFieldsContainer">
                        <label className="labelField" style={{top:"3%", left:"1%"}}>
                            Code:
                            <br/>
                            <input value={this.state.customer.cd_customer.value} 
                                   name="customer.cd_customer"
                                   onChange={(e)=>{this.handleChange(e)}} 
                                   type="number" style={{width: "80px", textAlign:"right"}}
                                   readOnly={this.state.customer.cd_customer.readOnly}>
                            </input>
                        </label>
                        
                        <label className="labelField" style={{top:"13%", left:"1%"}}>
                            Name:
                            <br/>
                            <input value={this.state.customer.nm_customer.value} 
                                   name="customer.nm_customer"
                                   onChange={(e)=>{this.handleChange(e)}}
                                   style={{width:"500px"}} maxLength="100"
                                   readOnly={this.state.customer.nm_customer.readOnly}>
                                   </input>
                        </label>

                        <label className="labelField" style={{top:"13%", left:"52%"}}>
                            Client Since:
                            <br/>
                            <input value={this.state.customer.dt_cliente_since.value} 
                                   name="customer.dt_cliente_since"
                                   onChange={(e)=>{this.handleChange(e)}}
                                    type="date" style={{width:"110px"}} maxLength="100"
                                    readOnly={this.state.customer.dt_cliente_since.readOnly}>
                                    </input>
                        </label>

                        <label className="labelField" style={{top:"23%", left:"1%"}}>
                            Adress:
                            <br/>
                            <input value={this.state.customer.ds_adress.value} 
                                   name="customer.ds_adress"
                                   onChange={(e)=>{this.handleChange(e)}}    
                                   style={{width:"500px"}} maxLength="100"
                                   readOnly={this.state.customer.ds_adress.readOnly}>
                            </input>
                        </label>

                        <label className="labelField" style={{top:"23%", left:"52%"}}>
                            Adress Number:
                            <br/>
                            <input value={this.state.customer.nr_adress_number.value} 
                                   name="customer.nr_adress_number"
                                   onChange={(e)=>{this.handleChange(e)}}    
                                   type="number" style={{width:"105px"}} maxLength="100"
                                   readOnly={this.state.customer.nr_adress_number.readOnly}>
                                   </input>
                        </label>

                        <label className="labelField" style={{top:"33%", left:"1%"}}>
                            Neigborhood:
                            <br/>
                            <input value={this.state.customer.nm_neigborhood.value} 
                                   name="customer.nm_neigborhood"
                                   onChange={(e)=>{this.handleChange(e)}}    
                                   style={{width:"280px"}} maxLength="100"
                                   readOnly={this.state.customer.nm_neigborhood.readOnly}>
                                   </input>
                        </label>

                        <label className="labelField" style={{top:"43%", left:"1%"}}>
                            City:
                            <br/>
                            <input value={this.state.customer.nm_city.value} 
                                   name="customer.nm_city"
                                   onChange={(e)=>{this.handleChange(e)}}    
                                   style={{width:"280px"}} maxLength="100"
                                   readOnly={this.state.customer.nm_city.readOnly}>
                                   </input>
                        </label>

                        <label className="labelField" style={{top:"43%", left:"30%"}}>
                            State:
                            <br/>
                            <input value={this.state.customer.nm_state.value} 
                                   name="customer.nm_state"
                                   onChange={(e)=>{this.handleChange(e)}}
                                   style={{width:"280px"}} maxLength="100"
                                   readOnly={this.state.customer.nm_state.readOnly}>
                                   </input>
                        </label>
                        
                        <label className="labelField" style={{top:"53%", left:"1%"}}>
                            Zip Code:
                            <br/>
                            <input value={this.state.customer.ds_zip_code.value} 
                                   name="customer.ds_zip_code"
                                   onChange={(e)=>{this.handleChange(e)}}
                                   style={{width:"150px"}} maxLength="100"
                                   readOnly={this.state.customer.ds_zip_code.readOnly}>
                                   </input>
                        </label>

                        <label className="labelField" style={{top:"53%", left:"17%"}}>
                            Complement:
                            <br/>
                            <input value={this.state.customer.ds_complement.value} 
                                   name="customer.ds_complement"
                                   onChange={(e)=>{this.handleChange(e)}}
                                   style={{width:"400px"}} maxLength="100"
                                   readOnly={this.state.customer.ds_complement.readOnly}>
                                   </input>
                        </label>

                        <label className="labelField" style={{top:"63%", left:"1%"}}>
                            Credit Limit:
                            <br/>
                            <input value={this.state.customer.vl_credit_limit.value} 
                                   name="customer.vl_credit_limit"
                                   onChange={(e)=>{this.handleChange(e)}}
                                   type="number" style={{width:"150px"}} maxLength="100"
                                   readOnly={this.state.customer.vl_credit_limit.readOnly}>
                                   </input>
                        </label>
                </div>
            </div>
        );
    }
}

export default Customers;