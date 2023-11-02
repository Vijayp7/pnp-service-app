import React, { Component } from 'react'
import PlacesAutocomplete, {geocodeByAddress,getLatLng} from 'react-places-autocomplete';

export class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
      }
  render() {
    return (

      <div class="s-main-menu">
        <div class="s-menu">

          <div className='s-ordr-sumry-sec'>
            <div class="location-access">
            <div class="close-icon" onClick={this.props.closePopUp}>
            <img src="close-icon.png" />
            </div>
            <div class="nav-info">
              <img src="map.png" />
              {/* <h5>Location</h5> */}
              {/* <p>Select Location options and proceed</p> */}
              <div class="nav-btns">
                <button class="active" onClick={this.props.useCurrentLocation}>Use Current Location</button>
                <h4>OR</h4>
              </div>
              
              <div className = 'st-location_page'>
                <div className='container'>
                <PlacesAutocomplete
                      onChange={this.props.handleChangeLocations}
                      onSelect={this.props.handleSelectLocations}
                      value={this.props.address}  >
                      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                  <div>
                      <div className='st_input'>
                          <input
                                {...getInputProps({
                                  placeholder: 'Search Places ...',
                                  className: 'location-search-input',
                                })}

                          />
                          <button className='use-btn' onClick={()=>this.props.useLocation(this.props.address)}>
                            Use
                          </button>
                      </div>
                      <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                              {suggestions.map(suggestion => {
                                const className = suggestion.active
                                  ? 'suggestion-item--active'
                                  : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                  : { backgroundColor: 'transparent', cursor: 'pointer',display:'block',borderRadius:'4px',border:'1px solid #616161',padding:'5px'};
                                return (
                                  <div
                                  key = {suggestion?.placeId}
                                    {...getSuggestionItemProps(suggestion, {
                                      className,
                                      style,
                                    })}
                                  >
                                    <span>{suggestion.description}</span>
                                  </div>
                                );
                              }) }
                      </div>
                    </div>
                    )}
                  </PlacesAutocomplete>
                  </div>
          </div>


            </div>
            </div>
          </div>

       </div>
       </div>




    )
  }
}

export default Location