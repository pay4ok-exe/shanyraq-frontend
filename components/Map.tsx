import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import supercluster from "supercluster";

const Map = () => {
  // Set the Mapbox Access Token
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWVpcm1hbi1pcy1yZWF0b3IiLCJhIjoiY2x5NjVpaWNlMDVneDJ0c2F6cTVxNzZqNSJ9.WVkGzQEf4yJGjr98WSgzpA";

  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);
  const cluster = useRef(
    new supercluster({
      radius: 60,
      maxZoom: 16,
    })
  );
  const [selectedRoommates, setSelectedRoommates] = useState([]);
  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  // Sample data for roomates
  const loadRoommatesData = () => {
    const data = [
      { id: 1, price: 3000000, lat: 40.7128, lon: -74.006, name: "Roommate 1" },
      { id: 2, price: 2500000, lat: 40.7338, lon: -74.016, name: "Roommate 2" },
      { id: 3, price: 5000000, lat: 40.7528, lon: -74.036, name: "Roommate 3" },
      { id: 4, price: 4500000, lat: 40.7428, lon: -74.026, name: "Roommate 4" },
    ];
    return data;
  };

  // Initialize the map
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.006, 40.7128], // Starting coordinates (New York)
      zoom: 12,
    });

    // Load room data
    const roommatesData = loadRoommatesData();

    // Add markers to the map
    roommatesData.forEach((roommate) => {
      const marker = new mapboxgl.Marker()
        .setLngLat([roommate.lon, roommate.lat])
        .addTo(map.current);
      markers.current.push(marker);
    });

    // Add clustering
    cluster.current.load(
      roommatesData.map((roommate) => ({
        type: "Feature",
        properties: {
          id: roommate.id,
          price: roommate.price,
          name: roommate.name,
        },
        geometry: { type: "Point", coordinates: [roommate.lon, roommate.lat] },
      }))
    );

    // Update clusters on zoom or move
    map.current.on("moveend", () => {
      const bounds = map.current.getBounds();
      const points = cluster.current.getClusters(
        [
          bounds.getWest(),
          bounds.getSouth(),
          bounds.getEast(),
          bounds.getNorth(),
        ],
        0
      );

      // Logic to display clusters or individual markers based on zoom level
      console.log(points);
    });

    return () => {
      map.current.remove();
    };
  }, []);

  // Scroll to Top logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setScrollTopVisible(true);
      } else {
        setScrollTopVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div
        ref={mapContainer}
        style={{ width: "100%", height: "970px" }}
        className="h-full"></div>

      {/* Scroll to Top Button */}
      {scrollTopVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px",
            borderRadius: "50%",
            border: "none",
          }}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Map;
