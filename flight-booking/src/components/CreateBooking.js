import React, { Component } from "react";
import axios from "axios";
const url = "http://localhost:1050/bookFlight/";
const url1 = "http://localhost:1050/getFlightIds/";
class CreateBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        customerId: "",
        flightId: "",
        noOfTickets: ""
      },
      formErrorMessage: {
        customerId: "",
        noOfTickets: "",
        flightId: ""
      },
      formValid: {
        customerId: false,
        flightId: false,
        noOfTickets: false,
        buttonActive: false
      },
      flightIds: [],
      errorMessage: "",
      successMessage: ""
    };
  }

  submitBooking = async() => {
    try{
      
      let res = await axios.post('http://localhost:1050/bookFlight/',this.state.form)
      
      this.setState({successMessage:res.data.message,errorMessage:""})
    }catch(err){
      if(err.response){
        this.setState({successMessage:"",errorMessage:err.response.data.message})
      }
      else{
        this.setState({successMessage:"",errorMessage:'Please start your Express server'})
      }
    }
  }
  componentDidMount(){
    this.fetchFlightIds()
  }

  fetchFlightIds =async () => {
    try{
      let res = await axios.get('http://localhost:1050/getFlightIds/')
      this.setState({flightIds:res.data,errorMessage:""})
    }catch(err){
      if(err.response){
        this.setState({errorMessage:err.response.data.message})
      }
      else{
        this.setState({errorMessage:'Please start your Express server'})
      }
    }
    /* 
      Make a axios GET request to http://localhost:1050/getFlightIds/ to fetch the flightId's array 
      from the server and handle the success and error cases appropriately 
    */
  }

  handleSubmit = event => {
    event.preventDefault();
    this.submitBooking();
  }
  handleChange = event => {
    let {name,value}=event.target
    let formdum=this.state.form
    formdum[name]=value
    this.setState({form:formdum})
    this.validateField(name,value)
  }
  validateField = (name, value) => {
    let errorMessage =""
    let formErrorMessagedum=this.state.formErrorMessage
    let formValiddum=this.state.formValid
    if(name==="customerId"){
      let index=value.charAt(0)
      let index2=value.slice(1,5)
      if(value.length===0){
        errorMessage="field required"
      }else if(!(String(index) && index ===index.toUpperCase() && value.length===5 && Number(index2) )){
        errorMessage="Customer Id must start with an alphabet followed by 4 digits"
      }
      formErrorMessagedum.customerId=errorMessage
      formValiddum.customerId=errorMessage?false:true
      }
      else if(name==="flightId"){
        if(value==="--select-flight"){
          errorMessage="Select a Flight"
        }
        formErrorMessagedum.flightId=errorMessage
        formValiddum.flightId=errorMessage?false:true
      }
      else if(name==="noOfTickets"){
        if(String(value).length==0){
          errorMessage="field required"
        }else if(!(value>0 && value<=10)){
          errorMessage="No of tickets should be greater than 0 and less than 10"
        }
        formErrorMessagedum.noOfTickets=errorMessage
        formValiddum.noOfTickets=errorMessage?false:true
      }
    formValiddum.buttonActive=formValiddum.customerId && formValiddum.flightId && formValiddum.noOfTickets
    this.setState({formErrorMessage:formErrorMessagedum,formValid:formValiddum})
    /* Perform Validations and assign error messages, Also, set the value of buttonActive after validation of the field */
  }
  render() {
    return (
      <div className="CreateBooking ">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <br />
            <div className="card">
              <div className="card-header bg-custom">
                <h3>Flight Booking Form</h3>
              </div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="customerId">customerId</label>
                    <input type="text" name="customerId" id="customerId" className="form-control" onChange={this.handleChange} placeholder="e.g.-P1001"></input>
                    <span className="text-danger" name="customerIdError">{this.state.formErrorMessage.customerId}</span>
                  </div>
                  
                  <div className="form-group">
                  
                    <label htmlFor="flightId">flightId</label>
                    <select type="dropdown" className="form-control" name="flightId" onChange={this.handleChange} id="flightId">
                      <option value="--select-flight" selected>--select-flight</option>
                      {this.state.flightIds?
                        this.state.flightIds.map((ele)=>{
                          return <option value={ele}>{ele}</option>
                        })
                      :null}
                    </select>
                    <span className="text-danger" name="noOfTicketsError">{this.state.formErrorMessage.flightId}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="noOfTickets">noOfTickets</label>
                    <input type="number" className='form-control' name="noOfTickets" id="noOfTickets" onChange={this.handleChange} placeholder="min-1 max-10"></input>
                    <span className="text-danger" name="flightIdError">{this.state.formErrorMessage.noOfTickets}</span>
                  </div>
                  <div className="form-group">
                    <button type="sumbit" disabled={!this.state.formValid.buttonActive} className="btn btn-primary">Book Flight</button>
                  </div>
                  <span className="text-success" name="successMessage" >{this.state.successMessage}</span>
                  <span className="text-danger" name="errorMessage">{this.state.errorMessage}</span>
                </form>
        
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBooking;
