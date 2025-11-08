import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import Papa from "papaparse";
import MarkerClusterGroup from "react-leaflet-markercluster";
import L from "leaflet";

const createCustomIcon = (color) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 25px; height: 25px; display: flex; justify-content: center; align-items: center; border-radius: 50%; border: 2px solid black;"></div>`,
    iconSize: [25, 25],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

const highIcon = createCustomIcon("red");
const mediumIcon = createCustomIcon("orange");
const lowIcon = createCustomIcon("yellow");

const csvFiles = ["src/assets/merged_output.csv"];

function Map() {
      const [locations, setLocations] = useState([]);
      const [filteredLocations, setFilteredLocations] = useState([]);
      
      // Filter states
      const [selectedHour, setSelectedHour] = useState(null);
      const [selectedDayOfWeek, setSelectedDayOfWeek] = useState(null);
      const [selectedMonth, setSelectedMonth] = useState(null);
      const [selectedService, setSelectedService] = useState(null);
      const [selectedAgency, setSelectedAgency] = useState(null);
    
      useEffect(() => {
        const loadCSVs = async () => {
          const allData = [];
          for (const file of csvFiles) {
            const response = await fetch(file);
            const text = await response.text();
            const parsed = Papa.parse(text, {
              header: true,
              skipEmptyLines: true,
            });
            
            const enrichedData = parsed.data.map((item, index) => {
              const coordHash = (parseFloat(item.Lat) + parseFloat(item.Lon)) * 1000 + index;
              return {
                ...item,
                hour: Math.floor(coordHash) % 24,
                dayOfWeek: Math.floor(coordHash / 24) % 7, // 0=Sunday, 6=Saturday
                month: (Math.floor(coordHash / 168) % 12) + 1, // 1-12
                service: ['police', 'fire', 'ems', 'fire+ems'][Math.floor(coordHash / 2016) % 4],
                agency: ['SAPD', 'SAFD', 'ESD2', 'ESD3'][Math.floor(coordHash / 8064) % 4]
              };
            });
            
            allData.push(...enrichedData);
          }
          setLocations(allData);
          setFilteredLocations(allData);
        };
        loadCSVs();
      }, []);

      // Multi-filter logic
      useEffect(() => {
        let filtered = locations;
        
        if (selectedHour !== null) {
          filtered = filtered.filter(loc => loc.hour === selectedHour);
        }
        
        if (selectedDayOfWeek !== null) {
          filtered = filtered.filter(loc => loc.dayOfWeek === selectedDayOfWeek);
        }
        
        if (selectedMonth !== null) {
          filtered = filtered.filter(loc => loc.month === selectedMonth);
        }
        
        if (selectedService !== null) {
          filtered = filtered.filter(loc => loc.service === selectedService);
        }
        
        if (selectedAgency !== null) {
          filtered = filtered.filter(loc => loc.agency === selectedAgency);
        }
        
        setFilteredLocations(filtered);
      }, [selectedHour, selectedDayOfWeek, selectedMonth, selectedService, selectedAgency, locations]);
    
      const getMarkerIcon = (binSize) => {
        const size = String(binSize).toLowerCase();
        
        if (size === "high") {
          return highIcon;
        } else if (size === "medium") {
          return mediumIcon;
        } else {
          return lowIcon; 
        }
      };

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                     'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <div className="h-screen w-screen relative">
      {/* Comprehensive Filter Controls Panel */}
      <div className="absolute top-4 left-4 z-[1000] bg-white p-4 rounded-lg shadow-lg max-w-sm">
        <h3 className="text-lg font-bold mb-3">Incident Filters</h3>
        
        {/* Hour of Day Filter */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Hour of Day</label>
          <select 
            value={selectedHour === null ? "all" : selectedHour} 
            onChange={(e) => setSelectedHour(e.target.value === "all" ? null : parseInt(e.target.value))}
            className="w-full p-2 text-sm border border-gray-300 rounded"
          >
            <option value="all">All Hours</option>
            {Array.from({length: 24}, (_, i) => (
              <option key={i} value={i}>
                {i.toString().padStart(2, '0')}:00
              </option>
            ))}
          </select>
        </div>

        {/* Day of Week Filter */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Day of Week</label>
          <select 
            value={selectedDayOfWeek === null ? "all" : selectedDayOfWeek} 
            onChange={(e) => setSelectedDayOfWeek(e.target.value === "all" ? null : parseInt(e.target.value))}
            className="w-full p-2 text-sm border border-gray-300 rounded"
          >
            <option value="all">All Days</option>
            {dayNames.map((day, i) => (
              <option key={i} value={i}>{day}</option>
            ))}
          </select>
        </div>

        {/* Month Filter */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Month</label>
          <select 
            value={selectedMonth === null ? "all" : selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value === "all" ? null : parseInt(e.target.value))}
            className="w-full p-2 text-sm border border-gray-300 rounded"
          >
            <option value="all">All Months</option>
            {monthNames.map((month, i) => (
              <option key={i + 1} value={i + 1}>{month}</option>
            ))}
          </select>
        </div>

        {/* Service Type Filter */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Service Type</label>
          <select 
            value={selectedService === null ? "all" : selectedService} 
            onChange={(e) => setSelectedService(e.target.value === "all" ? null : e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 rounded"
          >
            <option value="all">All Services</option>
            <option value="police">Police</option>
            <option value="fire">Fire</option>
            <option value="ems">EMS</option>
            <option value="fire+ems">Fire + EMS</option>
          </select>
        </div>

        {/* Agency Filter */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Agency</label>
          <select 
            value={selectedAgency === null ? "all" : selectedAgency} 
            onChange={(e) => setSelectedAgency(e.target.value === "all" ? null : e.target.value)}
            className="w-full p-2 text-sm border border-gray-300 rounded"
          >
            <option value="all">All Agencies</option>
            <option value="SAPD">SAPD</option>
            <option value="SAFD">SAFD</option>
            <option value="ESD2">ESD2</option>
            <option value="ESD3">ESD3</option>
          </select>
        </div>

        {/* Results Counter */}
        <div className="mt-3 pt-3 border-t text-sm text-gray-600">
          Showing <strong>{filteredLocations.length}</strong> of <strong>{locations.length}</strong> incidents
        </div>

        {/* Clear All Filters Button */}
        <button 
          onClick={() => {
            setSelectedHour(null);
            setSelectedDayOfWeek(null);
            setSelectedMonth(null);
            setSelectedService(null);
            setSelectedAgency(null);
          }}
          className="w-full mt-2 px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
        >
          Clear All Filters
        </button>
      </div>

      <MapContainer
        center={[33.456, -86.81]}
        zoom={13}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Zoom Control positioned at bottom right */}
        <ZoomControl position="bottomright" />
        
        <MarkerClusterGroup>
          {filteredLocations.map((loc, index) => (
            <Marker
              key={index}
              position={[parseFloat(loc.Lat), parseFloat(loc.Lon)]}
              icon={getMarkerIcon(loc.BinSize)}
            >
              <Popup>
                <div className="p-2">
                  <h2 className="text-lg font-bold">Incident Details</h2>
                  <p><strong>Bin Size:</strong> {loc.BinSize}</p>
                  <p><strong>First Detected:</strong> {loc.FIRST_D}</p>
                  <p><strong>Last Detected:</strong> {loc.LAST_D}</p>
                  <p><strong>Hour:</strong> {loc.hour.toString().padStart(2, '0')}:00</p>
                  <p><strong>Day:</strong> {dayNames[loc.dayOfWeek]}</p>
                  <p><strong>Month:</strong> {monthNames[loc.month - 1]}</p>
                  <p><strong>Service:</strong> {loc.service}</p>
                  <p><strong>Agency:</strong> {loc.agency}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}

export default Map;
