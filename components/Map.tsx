import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import supercluster from "supercluster";

const Map = ({ announcements }) => {
  // Set the Mapbox Access Token
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

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

  // Function to load and parse roommate data
  const loadRoommatesData = () => {
    // console.log("Received announcements:", announcements); // Debug log
    const data = announcements
      .map((announcement) => {
        const { announcementId, cost, coordsX, coordsY, title, image } =
          announcement;

        // Attempt to parse coordinates as floats
        const parsedLon = parseFloat(coordsY);
        const parsedLat = parseFloat(coordsX);

        // Validate parsed coordinates
        if (
          isNaN(parsedLon) ||
          isNaN(parsedLat) ||
          parsedLon < -180 ||
          parsedLon > 180 ||
          parsedLat < -90 ||
          parsedLat > 90
        ) {
          console.warn(
            `Invalid coordinates for announcement ID: ${announcementId}. Received coordsX: ${coordsX}, coordsY: ${coordsY}`
          );
          return null; // Exclude invalid data
        }

        return {
          id: announcementId,
          price: cost,
          lat: parsedLat,
          lon: parsedLon,
          title: title || "Unknown Roommate",
          image: image,
        };
      })
      .filter(Boolean); // Remove null entries

    // console.log("Processed roommatesData:", data); // Debug log
    return data;
  };

  // Initialize the map and handle clustering
  useEffect(() => {
    // Initialize the map only once
    // if (map.current) return;

    // Create a new Mapbox map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [76.9286, 43.2383], // Centered on Almaty
      zoom: 12, // Adjusted zoom level
    });

    // Once the map is loaded, perform clustering and marker rendering
    map.current.on("load", () => {
      const roommatesData = loadRoommatesData();

      if (roommatesData.length === 0) {
        console.warn("No valid roommates data to display on the map.");
        return;
      }

      // Load data into Supercluster
      cluster.current.load(
        roommatesData.map((roommate) => ({
          type: "Feature",
          properties: {
            cluster: false, // Indicates individual points
            id: roommate.id,
            cost: roommate.price,
            title: roommate.title,
            image: roommate.image,
          },
          geometry: {
            type: "Point",
            coordinates: [roommate.lon, roommate.lat],
          },
        }))
      );

      // Function to render clusters and markers
      const renderClusters = () => {
        const bounds = map.current.getBounds();
        const zoom = Math.floor(map.current.getZoom());

        // Retrieve clusters within the current map bounds and zoom level
        const clusters = cluster.current.getClusters(
          [
            bounds.getWest(),
            bounds.getSouth(),
            bounds.getEast(),
            bounds.getNorth(),
          ],
          zoom
        );

        // Remove existing markers to avoid duplication
        markers.current.forEach((marker) => marker.remove());
        markers.current = [];

        // Iterate through each cluster or point and render markers accordingly
        clusters.forEach((clusterFeature) => {
          const [lng, lat] = clusterFeature.geometry.coordinates;

          if (clusterFeature.properties.cluster) {
            // It's a cluster
            const pointCount = clusterFeature.properties.point_count;
            const marker = new mapboxgl.Marker({
              color: "#FF5733", // Customize cluster marker color
            })
              .setLngLat([lng, lat])
              .setPopup(
                new mapboxgl.Popup().setHTML(
                  `<strong>${pointCount} обьявлении</strong>`
                )
              )
              .addTo(map.current);
            markers.current.push(marker);
          } else {
            // It's an individual point
            const { id, title, cost, image } = clusterFeature.properties;
            console.log(clusterFeature.properties);
            const marker = new mapboxgl.Marker({
              color: "#3FB1CE", // Customize individual marker color
            })
              .setLngLat([lng, lat])
              .setPopup(
                new mapboxgl.Popup().setHTML(`
                  <a href="/announcement/${id}" style="text-decoration: none; color: inherit;">
    <div style="
      padding: 10px; 
      background: white; 
      border-radius: 10px; 
      display: flex; 
      flex-direction: column; 
      align-items: flex-start; 
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
    ">
      <img 
        src="${image}" 
        alt="${title}" 
        style="
          width: 100%; 
          max-width: 400px; 
          height: 160px; 
          border-radius: 10px; 
          object-fit: cover; 
          margin-bottom: 10px;
        "
      />
      <strong style="font-size: 16px; font-weight: 700; color: #252525;">${title}</strong>
      <p style="margin: 10px 0 0; font-size: 16px; font-weight: 700; color: #252525;">
        ${cost}
        <span style="text-decoration: underline;">₸</span>
      </p>
    </div>
  </a>
                `)
              )
              .addTo(map.current);
            markers.current.push(marker);
          }
        });
      };

      // Initial rendering of clusters and markers
      renderClusters();

      // Re-render clusters and markers whenever the map is moved or zoomed
      map.current.on("moveend", () => {
        renderClusters();
      });
    });

    // Clean up on component unmount
    return () => {
      if (map.current) map.current.remove();
    };
  }, [announcements]); // Added 'announcements' as a dependency in case data changes

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

      {/* {scrollTopVisible && ( */}
      <button
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "10px",
          border: "none",
        }}>
        ↑
      </button>
      {/* )} */}
    </div>
  );
};

export default Map;
