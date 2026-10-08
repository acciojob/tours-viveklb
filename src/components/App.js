import React, { useEffect, useState } from "react";

const Tour = ({ tour, removeTour }) => {
  const [showMore, setShowMore] = useState(false);
  const info = tour.info || tour.description || "";

  return (
    <div className="single-tour">
      <img src={tour.image} alt={tour.name} />
      <h2>{tour.name}</h2>
      <p className="tour-price">${tour.price}</p>
      <p className="tour-info">
        {showMore ? info : `${info.slice(0, 200)}${info.length > 200 ? "..." : ""}`}
        {info.length > 200 && (
          <button onClick={() => setShowMore(!showMore)}>
            {showMore ? "See less" : "Show more"}
          </button>
        )}
      </p>
      <button className="delete-btn" onClick={() => removeTour(tour.id)}>Remove</button>
    </div>
  );
};

const App = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTours = () => {
    setLoading(true);
    fetch("https://www.course-api.com/react-tours-project")
      .then((response) => response.json())
      .then((data) => setTours(data))
      .catch(() => setTours([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getTours();
  }, []);

  return (
    <main id="main">
      <h1 className="title">Our Tours</h1>
      {loading ? (
        <h2 className="loading">Loading...</h2>
      ) : tours.length === 0 ? (
        <div>
          <h2>No tours left</h2>
          <button className="btn" onClick={getTours}>Refresh</button>
        </div>
      ) : (
        tours.map((tour) => (
          <Tour
            key={tour.id}
            tour={tour}
            removeTour={(id) => setTours(tours.filter((item) => item.id !== id))}
          />
        ))
      )}
    </main>
  );
};

export default App;
