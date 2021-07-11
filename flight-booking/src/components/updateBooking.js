import React, { Component } from "react";
import axios from "axios";

const url = "http://localhost:1050/updatebooking/";

class UpdateBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                bookingId: "",
                noOfTickets: ""
            },
            formErrorMessage: {
                bookingId: "",
                noOfTickets: ""
            },
            formValid: {
                bookingId: true,
                noOfTickets: false,
                buttonActive: false
            },
            successMessage: "",
            errorMessage: "",
            id: this.props.match.params.bookingId
        };
    }
    componentDidMount(){
        let iddum=this.state.form
        iddum.bookingId=this.state.id 
        this.setState({form:iddum})
    }
    updateBooking = async() => {    
        try{
            let res = await axios.put('http://localhost:1050/updatebooking/'+this.state.id,this.state.form)
            
            this.setState({successMessage:res.data.message,errorMessage:""})
        }catch(e){
            if(e.response){
                this.setState({successMessage:"",errorMessage:e.response.data.message})
            }else{
                this.setState({successMessage:"",errorMessage:e.message})
            }
        }
    
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.updateBooking();
        /* prevent page reload and invoke updateBooking() method */
    }
    handleChange = (event) => {
        let {name,value}=event.target
        let formdum=this.state.form
        formdum[name]=value
        this.setState({form:formdum})
        this.validateField(name,value)
        /* 
          invoke whenever any change happens any of the input fields
          and update form state with the value. Also, Inoke validateField() method to validate the entered value
        */
    }
    validateField = (fieldName, value) => {
        console.log(value)
        let errmge=""
        let formErrorMessagedum=this.state.formErrorMessage
        let formValiddum=this.state.formValid
        if(fieldName==="noOfTickets"){
            if(String(value).length==0){
        
                errmge="field required"
            }else if(!(value>0 && value<=10)){
        
                errmge="No of tickets should be greater than 0 and less than 10"
            }
            formErrorMessagedum.noOfTickets=errmge
            formValiddum.noOfTickets=errmge?false:true

            formValiddum.buttonActive=formValiddum.noOfTickets
        }
        this.setState({formErrorMessage:formErrorMessagedum,formValid:formValiddum})
        /* Perform Validations and assign error messages, Also, set the value of buttonActive after validation of the field */
    }

    render() {
        return (
            <React.Fragment>
                <div className="UpdateBooking">
                    <div className="row">
                        <div className="col-md-6 offset-md-3">
                            <br />
                            <div className="card">
                                <div className="card-header bg-custom">
                                    <h4>Update Flight Booking for id: {this.state.id}</h4>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="bookingId">bookingId</label>
                                            
                                            <input type="number" name="bookingId" value={this.state.id} id="bookingId"className="form-control" placeholder={this.state.id} onChange={this.handleChange} disabled/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="noOfTickets">noOfTickets</label>
                                            <input type="number" name="noOfTickets" id="noOfTickets" value={this.state.form.noOfTickets} className="form-control" placeholder="min-1 max-10"onChange={this.handleChange}/>
                                            <span className="text-danger" name="noOfTicketsError">{this.state.formErrorMessage.noOfTickets}</span>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary form-control" disabled={!this.state.formValid.buttonActive}>Update Booking</button>
                                        </div>                                       
                                        <span className="text-success" name="successmessage">{this.state.successMessage}</span>
                                        <span className="text-danger" name="ErrorMessage">{this.state.errorMessage}</span>
                                    </form>
                                    {/* code appropriately to render the form as shown in QP */}
                                    {/* display the success and error messages appropriately */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default UpdateBooking;