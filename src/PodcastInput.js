import React, { Component } from "react";

class PodcastInput extends Component {
  constructor() {
    super();
    this.state = {
      podcastInput: "",
    };
  }

// componentDidMount() {
//     podcastCall = () => {
//         axios({
//         url: `https://listen-api.listennotes.com/api/v2/search`,
//         method: `GET`,
//         responseType: `json`,
//         headers: {
//           'X-ListenAPI-Key': `d45d36385df142229be4941f98e07c20`,
//         },
//         params: {
//           q: `star wars`,
//         },
//       }).then((res) => {
//         console.log(res);
//       });
//     }
// }
  

  render() {
    return (
      <form>
        <label htmlFor="podcastInput"></label>
        {/* <input type="text" id="podcastInput" value={this.state.PodcastInput}></input> */}
        
        {/* <select onChange={ this.whatDoesTheUserWant } type="whichCauldron" id="whichCauldron" name="userSelection">
          <option value="">PICK ONE PLZ</option>
          <option value="ministryOfMagic">Ministree of Magic</option>
          <option value="dumbledoresArmy">Army</option>
          <option value="orderOfThePhoenix">Order of Phoenix</option>
        </select> */}

      </form>
    );
  }
}

export default PodcastInput;
