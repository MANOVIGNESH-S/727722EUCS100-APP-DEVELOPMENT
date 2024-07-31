// src/components/Bookings.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContexts';
import axios from 'axios';
import '../../Bookings.css';

const imageUrls = [
  'https://th.bing.com/th/id/OIP.ocB5p8rvFFh5B58INjmXjAHaEK?w=305&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7',
  'https://img.freepik.com/free-photo/warm-welcoming-atmosphere-as-guests-arrive-party-venue_1268-30713.jpg',
  'https://img.freepik.com/free-vector/realistic-dynamic-fog-background_23-2149111508.jpg',
  'https://wallpapercave.com/wp/wp7488449.jpg'
];

function Bookings() {
  const { userRole } = useUser();
  const [bookings, setBookings] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const newBookingMade = location.state?.newBooking || false;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [newBookingMade]);

  const handleChat = (bookingId) => {
    // Implement chat functionality here
    console.log(`Chat initiated for booking ${bookingId}`);
  };

  const handlePay = (bookingId) => {
    // Navigate to Payment page with bookingId
    navigate('/payment', { state: { bookingId } });
  };

  // Function to get a random image
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    return imageUrls[randomIndex];
  };

  return (
    <div className="bookings">
      <h2>Booking Tracking</h2>
      {newBookingMade && <p className="success-message">New booking confirmed!</p>}
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="booking-card" style={{ backgroundImage: `url(${getRandomImage()})` }}>
              <div className="booking-info">
                <h3>Booking ID: {booking.id}</h3>
                <p><strong>Name:</strong> {booking.name}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p><strong>Number of People:</strong> {booking.numberOfPeople}</p>
                <p><strong>Total Cost:</strong> ${booking.cost}</p>
              </div>
              <div className="booking-actions">
                <button onClick={() => handleChat(booking.id)} className="chat-button">Click to Chat</button>
                <button onClick={() => handlePay(booking.id)} className="pay-button">Pay to Confirm</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Bookings;
