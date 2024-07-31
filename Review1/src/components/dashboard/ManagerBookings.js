import React, { useState, useEffect } from 'react';
import '../../ManagerBookings.css';  // Ensure this CSS file is imported

const imageUrls = [
  'https://img.freepik.com/free-photo/warm-welcoming-atmosphere-as-guests-arrive-party-venue_1268-30713.jpg',
  'https://img.freepik.com/free-photo/happy-people-celebrating-birthday-party-with-friends_1150-20515.jpg',
  'https://img.freepik.com/free-photo/guests-having-fun-celebration-with-balloons_1150-19978.jpg',
  'https://img.freepik.com/free-photo/party-time-with-friends-celebrating_1150-20168.jpg',
  'https://img.freepik.com/free-photo/people-having-fun-at-outdoor-party_1150-20624.jpg',
  'https://img.freepik.com/free-photo/group-friends-having-party-indoor_1150-20879.jpg',
  'https://img.freepik.com/free-photo/people-celebrating-new-year-party_1150-21203.jpg',
  'https://img.freepik.com/free-photo/cheerful-people-having-fun-party_1150-21134.jpg',
  'https://img.freepik.com/free-photo/friends-enjoying-party-together_1150-20488.jpg'
];

function ManagerBookings() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events.');
        }
        const data = await response.json();
        setEvents(data || []);
      } catch (err) {
        setError('Failed to load events.');
      }
    };

    fetchEvents();
  }, []);

  // Function to get a random image URL
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };

  return (
    <div className="manager-bookings">
      <h2>Event Tracking</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="booking-grid">
        {events.length === 0 && !error && <p>No events found.</p>}
        {events.map((event) => (
          <div
            key={event.id}
            className="booking-card"
            style={{ backgroundImage: `url(${getRandomImage()})` }}
          >
            <div className="booking-info">
              <h3>{event.name}</h3>
              <p><strong>ID:</strong> {event.id}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Rating:</strong> {event.rating}</p>
              <p><strong>Review Count:</strong> {event.reviewCount}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Base Price:</strong> ${event.basePrice.toFixed(2)}</p>
              <p><strong>Email:</strong> {event.email}</p>
              <p><strong>Phone:</strong> {event.phone}</p>
            </div>
            <div className="booking-actions">
              <button className="chat-button">Chat with Clients</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManagerBookings;
