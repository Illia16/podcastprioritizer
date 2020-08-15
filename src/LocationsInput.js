import React, { Component } from 'react'
import axios from 'axios'

class LocationInput extends Component {
  constructor () {
    super()
    this.state = {
      userInputFrom: '',
      userInputTo: '',
      results: []
    }
  }

  handleFromOnChange = e => {
    e.preventDefault()

    this.setState({
      userInputFrom: e.target.value
    })
  }

  handleToOnChange = e => {
    e.preventDefault()

    this.setState({
      userInputTo: e.target.value
    })
  }

  locationData = e => {
    e.preventDefault()

    axios({
      url: `https://www.mapquestapi.com/directions/v2/route`,
      method: `GET`,
      responseType: `json`,
      params: {
        key: `x3MrPIPmomzlRE4OXlE1fjsepd4chw3q`,
        from: this.state.userInputFrom,
        to: this.state.userInputTo,
        
        
      }
    }).then(res => {
      console.log(res)

      this.setState({
        results: res
      })
    })
  }

  render () {
    return (
      <div className='App'>
        <form action='submit'>
          <fieldset>
            <label htmlFor='userInputFrom'>From</label>
            <input
              type='text'
              name='userInputFrom'
              id='userInputFrom'
              value={this.state.userInputFrom}
              onChange={this.handleFromOnChange}
            />

            <label htmlFor='userInputTo'>To</label>
            <input
              type='text'
              name='userInputTo'
              id='userInputTo'
              value={this.state.userInputTo}
              onChange={this.handleToOnChange}
            />

            <button onClick={this.locationData}>Submit</button>
          </fieldset>
        </form>
      </div>
    )
  }
}

export default LocationInput
