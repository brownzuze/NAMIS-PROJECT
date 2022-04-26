import React, {Component} from 'react'
import {FormControl,InputLabel} from '@material-ui/core'
import { Select, MenuItem,TextField, Button} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles';
import {programs, periods } from '../programstore.js';
import $ from 'jquery';
import TransferVariable from './transfervariable';


//Dialog form styling 
const styles = theme => ({
    FormControl: {
        width: 500
    }
})

export default withStyles(styles)(class extends Component {
    constructor() {
        super();
        this.state = {
            orgValue: 'Airon',
            period: 'THIS_WEEK',
            Indicator: '',
            orgId: '',
            data: ''

        }
        this.loadOrganisationUnitsFromServer = this.loadOrganisationUnitsFromServer.bind(this)

      }
    
        loadOrganisationUnitsFromServer() {
            const organisationUnits = $.ajax({
                url: 'https://covmw.com/namis1/api' + `/organisationUnits.json`,
                dataType: "json",
                headers: { "Authorization": "Basic " + btoa('portal' + ":" + 'Namis71PortaL@*') },
                success: function (data) {},
                async: false,
                error: function (err) {
                 console.log(err);
                 }
                }).responseJSON;
                const data = organisationUnits.organisationUnits
                data.push({"id": 'regABjOxLLQ', "displayName": 'National'})
                this.setState({data: data})
                this.setState({orgValue: data[0].displayName})
                this.setState({orgId: data[0].id})

          }
        
          componentDidMount() {
            this.loadOrganisationUnitsFromServer();
            console.log(this.state.data)
          }
                    
     // form handler

      handleChange = (e) => {
        this.setState({orgId: e.target.value});
        //console.log(this.state.orgValue);
      };


    // Submit function
    handleSubmit = (e) => {
        e.preventDefault();
        const { orgId, period, Indicator} = this.state; 
        const isLoaded = true  
        this.props.onFormSubmit(orgId, period, Indicator, isLoaded);
        
    }

     handleChanges = (e) => {
            this.setState({period: e.target.value});
            //console.log(this.state.period);
          } 
     onTransferSubmit = (Indicator) => {
            this.setState({Indicator: Indicator});
          }
    //transfers


    render() {
         const data = this.state.data

        if ( !data ){
            return 'Loading'
        }
        

        return <form>
        {<FormControl style={{width: '450px'}}>
                <InputLabel>Organisation Unit</InputLabel>
                <Select
                    float = "center"
                    style = {{width: '115%'}}
                    value = {this.state.orgId}
                    name = {this.state.orgValue}
                    onChange={(e) => this.handleChange(e)}
                >   {data.map(item => 
                        <MenuItem  value = {item.id} >
                            {item.displayName}
                        </MenuItem>
                    )}
                </Select>
                </FormControl>}
            <br/>
            <FormControl style={{width: '450px'}}>
                <InputLabel>Period</InputLabel>
                <Select
                    float = "center"
                    style = {{width: '115%'}}
                    value={this.state.period} 
                    onChange={(e) => this.handleChanges(e)}
                >   {periods.map(item => 
                        <MenuItem value = {item}>
                            {item}
                        </MenuItem>
                    )}
                </Select>

            </FormControl>
            <br/>
            <TransferVariable onTransferSubmit={this.onTransferSubmit}/>

                <Button 
                variant="contained" 
                color="primary"
                style = {{margin: 50, marginRight: 50, float: "right"}}
                onClick={this.handleSubmit}
                >
                  update
                </Button>  
                {console.log(this.state.period)}
                {console.log(this.state.Indicator)}
                {console.log(this.state.orgValue)}
                {console.log(this.state.orgId)}


        </form>
        
    }
})
