import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";

// TopoJSON URL for US States
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// List of state abbreviations
const stateAbbreviations: { [key: string]: string } = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

export const MapofUSA = () => (
  <ComposableMap 
  projection="geoAlbersUsa"
    width={800}  
    height={500}  
    style={{ width: "100%", height: "100%" }} 
  >
    <Geographies geography={geoUrl}>
      {({ geographies }) =>
        geographies.map((geo) => {
          const centroid = geoCentroid(geo);
          const stateName = geo.properties.name;
          const abbreviation = stateAbbreviations[stateName];

          return (
            <>
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#d1d5db"
                stroke="#9ca3af"
                style={{
                  default: { fill: "#d1d5db", outline: "none" },
                  hover: { fill: "#3b82f6", outline: "none" },
                  pressed: { fill: "#2563eb", outline: "none" },
                }}
              />
              {abbreviation && (
                <Annotation
                  subject={centroid}
                  dx={0}
                  dy={0}
                  connectorProps={{ stroke: "none" }}
                >
                  <text
                    x={0}
                    y={0}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fill="#111827"
                    fontSize={10}
                    fontWeight={600}
                  >
                    {abbreviation}
                  </text>
                </Annotation>
              )}
            </>
          );
        })
      }
    </Geographies>
  </ComposableMap>
);
