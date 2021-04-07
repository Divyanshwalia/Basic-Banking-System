import React, { Component } from 'react';
import classes from './Transfer.module.css';

import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import * as actions from '../../store/actions/index';

import {toast} from 'react-toastify';

class Transfer extends Component {
    state = {
        amount: ""
    }
    onAmountChange = (event) => {
        this.setState({amount: event.target.value});
    }
    balanceUpdates = () => {
        if(!this.state.amount){
            toast.error("Field empty");
        }else if(this.state.amount > this.props.sender.currentBalance){
            toast.error("Transfer amount larger than sender balance");
        }else{
            const sData = {
                ...this.props.sender,
                currentBalance: this.props.sender.currentBalance - this.state.amount
            };
            const rData = {
                ...this.props.receiver,
                currentBalance: parseInt(this.props.receiver.currentBalance) + parseInt(this.state.amount)
            }
            this.props.updateBalances(sData, rData);
        }
    }
    render() { 
        return (
            <div className="container mt-5">
                <div className={classes.outerForm + " shadow py-4"}>
                    <h1>Transfer Form</h1>
                    <form className={classes.transferForm}>
                        <div className={classes.formRow}>
                            <input type="text" disabled name="sender" 
                            value={"Sender :: "+this.props.sender.username} />
                            <input type="text" disabled
                            value={"Balance :: "+this.props.sender.currentBalance} />
                        </div>
                        <div className={classes.formRow}>
                            <input type="text" disabled name="receiver" 
                            value={"Receiver :: "+this.props.receiver.username} />
                            <input type="text" disabled
                            value={"Balance :: "+this.props.receiver.currentBalance} />
                        </div>
                        <input type="text" placeholder="Transfer Amount"
                                value={this.state.amount}
                                onChange={this.onAmountChange}
                                className={classes.amountInput} />
                        <div className={classes.btnGroup}>
                            <NavLink to="/">
                                <button onClick={this.balanceUpdates} className="btn btn-success">Transfer</button>
                            </NavLink>
                            <NavLink to="/">
                                <button className="btn btn-danger">Cancel</button>
                            </NavLink>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return {
        sender: state.transfer.sender,
        receiver: state.transfer.receiver
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        updateBalances: (sd, rd) => dispatch(actions.updateBalances(sd, rd))
    }
}
 
export default connect(mapStatetoProps, mapDispatchtoProps)(Transfer);