# USGS Earthquake Data Visualization

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet

![alt text](image-1.png)

## 📋 Description

This project creates an interactive map that:
- Displays earthquakes from the past 7 days
- Visualizes magnitude/depth using size and color
- Shows tectonic plate boundaries (optional)
- Includes layer controls and popup details


## 🚀 Features

### Core Features (Part 1)
- Dynamic earthquake markers with size ↔ magnitude correlation
- Color gradient based on earthquake depth (darker = deeper)
- Interactive popups with location/magnitude/depth details
- Depth legend for quick reference
- Responsive design for all devices

### Advanced Features (Part 2)
- Tectonic plate boundary overlay
- Multiple base maps (Street/Satellite)
- Layer control panel for toggling datasets
- Independent overlay management


## 📁 File Structure

```
leaflet-challenge/
├── Leaflet-Part-1/
│   ├── index.html       # Main HTML structure
│   ├── style.css        # Map/legend styling
│   └── logic.js         # Map logic & data handling
└── Leaflet-Part-2/      # Advanced features
```

## 🖱️ Usage

1. **Map Interactions**:
   - Click markers for earthquake details
   - Drag to pan, scroll to zoom
   - Use layer control (top-right) to toggle:
     - Base maps: Street/Satellite
     - Overlays: Earthquakes/Tectonic Plates

2. **Visual Keys**:
   - Larger circles = higher magnitude
   - Darker colors = greater depth
   - Reference legend (bottom-right) for depth scale

---

## 📡 Data Sources

| Dataset | Source |
|---------|--------|
| Earthquakes | [USGS GeoJSON Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) |
| Tectonic Plates | [fraxen/tectonicplates](https://github.com/fraxen/tectonicplates) |

---

## 🔧 Methods & Technologies

### 1. Leaflet.js Mapping
- `L.map()`: Initialize map container
- `L.tileLayer()`: Add base maps
- `L.geoJSON()`: Plot earthquake data
- `L.circleMarker()`: Custom markers with size/color logic

### 2. Data Handling
- **D3.js**: `d3.json()` for fetching GeoJSON data
- **GeoJSON**: Earthquake data structure parsing
- Color scaling function: `getColor(depth)` for depth visualization

### 3. Visualization Techniques
- Dynamic marker sizing: `radius: mag * 4`
- Depth-based color gradient: HSL color interpolation
- Layer controls: `L.control.layers()`

### 4. Styling
- CSS positioning for full-screen map
- Legend styling with box-shadow and gradients
- Responsive design with viewport units


##  Acknowledgments

- Leaflet.js for mapping capabilities
- USGS for earthquake data feeds
- OpenStreetMap for base map tiles
- D3.js for data manipulation
