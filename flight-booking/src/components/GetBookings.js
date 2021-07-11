import React, { Component } from "react";
import axios from "axios";
import Redirect from "../../node_modules/react-router-dom/Redirect";

const url = "http://localhost:1050/getAllBookings/";
const url1 = "http://localhost:1050/deleteBooking/";

class GetBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingData: "",
      bookingId: "",
      updateStatus: false,
      errorMessage: "",
      successMessage: ""
    };
  }
  updateBooking = (bid) => {
    this.setState({bookingId:bid,updateStatus:true})
    /* update the updateStatus and bookingId state with appropriate values */
  }
  componentDidMount(){
    this.fetchBooking();
  }
  fetchBooking = async() => {
    try{
      let res = await axios.get(url)
      this.setState({bookingData:res.data})
    }catch(err){
      if(err.response){
        this.setState({successMessage:"",errorMessage:err.response.data.message})
      }else{
        this.setState({successMessage:"",errorMessage:err.message})
      }
    }
  }
  deleteBooking =async (id) => {
    try{
      let res = await axios.delete("http://localhost:1050/deleteBooking/"+id)
      this.setState({successMessage:res.data.message,errorMessage:""})
      setTimeout(() => {
        this.fetchBooking();
        this.setState({ successMessage: "", errorMessage: "" })
      }, 3000)
    }catch(err){
      if(err.response){
        this.setState({successMessage:"",errorMessage:err.response.data.message})
      }else{
        this.setState({successMessage:"",errorMessage:err.message})
      }
    }
    
    /*
      Send an AXIOS DELETE request to the url http://localhost:1050/deleteBooking/ to delete the selected booking
      and handle the success and error cases appropriately 
    */
  }

  render() {
    let redirect=null
    if(this.state.successMessage){
      redirect=<Redirect to={'/updateBooking/'+this.state.bookingId}></Redirect>
    }
    return (
      <div className="GetBooking">
        <div className="row">
          <div className="col-md-8 offset-md-3">
            <br />
            <div className="card">
              <div className="card-header bg-custom">
                <h3 align="center">Booking Details</h3>
              </div>
              <div className="card-body">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Customer Id</th>
                      <th>Booking Id</th>
                      <th>Total Tickets</th>
                      <th>Total Cost</th>
                      <th>Action</th>
                      </tr>
                  </thead>
                  {this.state.bookingData?<tbody>
                    {this.state.bookingData.map((ele)=>{
                      return(
                        <tr key={ele.id}>
                          <td>{ele.customerId}</td>
                          <td>{ele.bookingId}</td>
                          <td>{ele.noOfTickets}</td>
                          <td>{ele.bookingCost}</td>
                          <td><button value={ele.bookingId} className="btn btn-success" onClick={(event)=>this.updateBooking(event.target.value)}>Update</button>
                          &nbsp;
                          <button value={ele.bookingId} className="btn btn-danger" onClick={(event)=>this.deleteBooking(event.target.value)}>Delete</button></td>
                        </tr>
                        
                      )
                    })}
                  </tbody>:null}
                </table>
                {/* code here to get the view as shown in QP for GetBooking component */}
                {/* Display booking data in tabular form */}
                {/* Display error message if the server is not running */}
                {/* code appropriately to redirect on click of update button */}
              </div>
            </div>
          </div>
        </div>
        {redirect}
      </div>
    );
  }
}

export default GetBooking;
