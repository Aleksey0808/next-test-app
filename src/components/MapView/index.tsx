"use client";

const MapView = () => {
  return (
    <iframe
      title="Kyiv map"
      src="https://www.openstreetmap.org/export/embed.html?bbox=30.4031%2C50.4017%2C30.6431%2C50.5017&layer=mapnik"
      style={{
        width: "100%",
        height: "360px",
        border: "0",
        borderRadius: "20px",
      }}
    />
  );
};

export default MapView;
