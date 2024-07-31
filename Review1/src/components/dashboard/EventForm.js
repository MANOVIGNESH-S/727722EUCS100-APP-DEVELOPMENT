import React, { useState } from 'react';
import '../../EventForm.css';

function EventForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    location: '',
    rating: '',
    reviewCount: '',
    image: '',
    amenities: '',
    description: '',
    recentReview: '',
    basePrice: '',
    email: '',      // Added email field
    phone: ''       // Added phone field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate all fields
    if (Object.values(formData).some(field => field.trim() === '')) {
      alert('All fields are required.');
      return;
    }

    // Format data for submission
    const formattedData = {
      ...formData,
      rating: parseFloat(formData.rating),
      reviewCount: parseInt(formData.reviewCount),
      amenities: formData.amenities.split(',').map(amenity => amenity.trim()),
      basePrice: parseFloat(formData.basePrice),
    };

    try {
      const response = await fetch('http://localhost:5000/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        alert('Event added successfully!');
        // Reset form fields
        setFormData({
          id: '',
          name: '',
          location: '',
          rating: '',
          reviewCount: '',
          image: '',
          amenities: '',
          description: '',
          recentReview: '',
          basePrice: '',
          email: '',      // Reset email field
          phone: ''       // Reset phone field
        });
        // Optionally call onSubmit with the formattedData if needed
        if (onSubmit) {
          onSubmit(formattedData);
        }
      } else {
        alert('Failed to add event.');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h3>Add New Event</h3>
      {Object.keys(formData).map((key) => (
        <div className="form-group" key={key}>
          <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
          {key === 'description' || key === 'recentReview' ? (
            <textarea
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            ></textarea>
          ) : (
            <input
              type={key === 'id' || key === 'reviewCount' || key === 'basePrice' ? 'number' : 'text'}
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          )}
        </div>
      ))}
      <button type="submit" className="cta-button">Add Event</button>
    </form>
  );
}

export default EventForm;
