import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Line, Marker, Annotation } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import { Tooltip } from 'react-tooltip';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles.css';

import gm1 from './gm1.jpg';
import gm2 from './gm2.jpg';
import gm3 from './gm3.jpg';
import gm4 from './gm4.jpg';
import gm5 from './gm5.png';
import gm6 from './gm6.jpg';

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const cities = [
  { name: "Chicago", coordinates: [-87.6298, 41.8781], population: 2700000, info: "Major industrial center" },
  { name: "Detroit", coordinates: [-83.0458, 42.3314], population: 1850000, info: "Automotive industry hub" },
  { name: "New York", coordinates: [-74.0059, 40.7128], population: 3500000, info: "Cultural melting pot" },
  { name: "Los Angeles", coordinates: [-118.2437, 34.0522], population: 2000000, info: "Entertainment capital" },
  { name: "Philadelphia", coordinates: [-75.1652, 39.9526], population: 1600000, info: "Historic city" },
  { name: "Pittsburgh", coordinates: [-79.9959, 40.4406], population: 1200000, info: "Steel industry center" },
];

const southernCities = [
  { name: "Atlanta", coordinates: [-84.3880, 33.7490], info: "Southern economic hub" },
  { name: "New Orleans", coordinates: [-90.0715, 29.9511], info: "Cultural center of the South" },
  { name: "Memphis", coordinates: [-90.0490, 35.1495], info: "Blues music birthplace" },
  { name: "Birmingham", coordinates: [-86.8025, 33.5186], info: "Civil rights movement focal point" },
];

const colorScale = scaleLinear().domain([1000000, 3500000]).range(["#FFB3BA", "#FF6B6B"]);

const GreatMigrationMap = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="map-container">
      <h2 className="title">Interactive Great Migration Map by Arjun Rao</h2>
      <ComposableMap projection="geoAlbersUsa">
        <g>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ))
            }
          </Geographies>
          {cities.map(({ name, coordinates, population, info }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle
                r={6 * Math.sqrt(population / 1000000)}
                fill={colorScale(population)}
                stroke="#fff"
                strokeWidth={2}
                onMouseEnter={() => setSelectedCity(name)}
                onMouseLeave={() => setSelectedCity(null)}
                data-tooltip-id="tooltip"
                data-tooltip-html={`City: ${name}<br>Population: ${population.toLocaleString()}<br>${info}`}
              />
              <Annotation
                subject={coordinates}
                dx={-30}
                dy={-10}
                connectorProps={{
                  stroke: "#FF6B6B",
                  strokeWidth: 2,
                  strokeLinecap: "round"
                }}
              >
                <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#F53" fontSize={10}>
                  {name}
                </text>
              </Annotation>
            </Marker>
          ))}
          {southernCities.map(({ name, coordinates, info }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={4} fill="#4CAF50" stroke="#fff" strokeWidth={2} 
                data-tooltip-id="tooltip"
                data-tooltip-html={`City: ${name}<br>${info}`}
              />
              <Annotation
                subject={coordinates}
                dx={-30}
                dy={-10}
                connectorProps={{
                  stroke: "#4CAF50",
                  strokeWidth: 2,
                  strokeLinecap: "round"
                }}
              >
                <text x="-8" textAnchor="end" alignmentBaseline="middle" fill="#4CAF50" fontSize={10}>
                  {name}
                </text>
              </Annotation>
            </Marker>
          ))}
          {selectedCity && cities.find(city => city.name === selectedCity) && (
            southernCities.map(({ coordinates }) => (
              <Line
                key={`${selectedCity}-${coordinates}`}
                from={cities.find(city => city.name === selectedCity).coordinates}
                to={coordinates}
                stroke="#FF6B6B"
                strokeWidth={2}
                strokeLinecap="round"
                className="migration-path"
              />
            ))
          )}
        </g>
      </ComposableMap>
      <Tooltip id="tooltip" />
      <div className="info">
        <p>Hover over cities for more information.</p>
        <p>Red circles: Destination cities (size indicates relative African American population)</p>
        <p>Green circles: Major southern departure points</p>
      </div>
      <div className="legend">
        <h3>Legend</h3>
        <p><span className="red-circle"></span> Destination cities</p>
        <p><span className="green-circle"></span> Major southern departure points</p>
      </div>
      <div className="poem-excerpt">
        <h3>Excerpt from "One-Way Ticket" by Langston Hughes</h3>
        <p>
          I pick up my life<br/>
          And take it with me<br/>
          And I put it down in<br/>
          Chicago, Detroit,<br/>
          Buffalo, Scranton,<br/>
          Any place that is<br/>
          North and East--<br/>
          And not Dixie.
        </p>
      </div>
      <Slider {...settings}>
        <div><img src={gm1} alt="Great Migration 1" className="carousel-image" /></div>
        <div><img src={gm2} alt="Great Migration 2" className="carousel-image" /></div>
        <div><img src={gm3} alt="Great Migration 3" className="carousel-image" /></div>
        <div><img src={gm4} alt="Great Migration 4" className="carousel-image" /></div>
        <div><img src={gm5} alt="Great Migration 5" className="carousel-image" /></div>
        <div><img src={gm6} alt="Great Migration 6" className="carousel-image" /></div>
      </Slider>
      <p className="author">Created by Arjun Rao</p>
    </div>
  );
};

export default GreatMigrationMap;