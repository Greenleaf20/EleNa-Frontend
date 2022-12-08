import './MapView.css';
import React, { Component } from 'react';
import ReactMapGL, { Marker, ScaleControl } from 'react-map-gl';

export default class MapView extends Component {
    constructor(props) {
      super(props);
      this.state = {
        path: [],
        coordinates: {},
        viewport: {
            width: '74vw',
            height: '100vh',
            latitude: 42.373222,
            longitude: -72.519852,
            zoom: 12,
        },
      };
    }

    render() {
      const { viewport } = this.state;
  
      return (
        <>
          <ReactMapGL
            id="map"
            {...viewport}
            onViewportChange={(viewport) => this.setState({ viewport })}
            mapStyle={`https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAPTILLER_API_KEY}`}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
          >
            <ScaleControl maxWidth={100} unit={'imperial'} />
            {this.props.coordinates.start && this.props.coordinates.end && 
              <>
                <Marker
                        key={1}
                        latitude={this.props.coordinates.start[0]}
                        longitude={this.props.coordinates.start[1]}
                        offsetTop={-32}
                        offsetLeft={-18}
                        anchor="bottom"
                >
                  <div className="initial-markers"></div>
                </Marker>
                <Marker
                        key={2}
                        latitude={this.props.coordinates.end[0]}
                        longitude={this.props.coordinates.end[1]}
                        offsetTop={-32}
                        offsetLeft={-18}
                        anchor="bottom"
                >
                  <div className="initial-markers"></div>
                </Marker>
              </> 
            } 
            {this.props.path.length>0 && this.props.path.map(
              (element) => (
                <Marker
                    key={element.id}
                    latitude={element.data.coordinates[0]}
                    longitude={element.data.coordinates[1]}
                    offsetTop={-32}
                    offsetLeft={-18}
                    anchor="bottom"
                >
                  <div className="middle-markers"></div>
                </Marker>
              )
            )}
          </ReactMapGL>
        </>
      );
    }
  }
  