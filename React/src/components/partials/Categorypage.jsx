import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const CategoryPage = ({ categoryName }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      const testData = [
        {
          id: 1,
          name: 'Business 1',
          image: 'https://via.placeholder.com/300',
          contact: '123-456-7890',
        },
        {
          id: 2,
          name: 'Business 2',
          image: 'https://via.placeholder.com/300',
          contact: '098-765-4321',
        },
        {
          id: 3,
          name: 'Business 3',
          image: 'https://via.placeholder.com/300',
          contact: '234-567-8901',
        },
        {
          id: 4,
          name: 'Business 4',
          image: 'https://via.placeholder.com/300',
          contact: '345-678-9012',
        },
        // Add more listings as needed
      ];

      // Uncomment the following lines for actual API call
      // axios.get('/latBusiness')
      //   .then(({ data }) => {
      //     if (data.data.length === 0) {
      //       setNotificationMessage('Listings not found.');
      //       setShowNotification(true);
      //     } else {
      //       setCards(data.data);
      //     }
      //     setLoading(false);
      //   })
      //   .catch(err => {
      //     console.error(err);
      //     setNotificationMessage('An error occurred while fetching data.');
      //     setShowNotification(true);
      //     setLoading(false);
      //   });

      if (testData.length === 0) {
        setNotificationMessage('Listings not found.');
        setShowNotification(true);
      } else {
        setCards(testData);
        setLoading(false);
      }
    }, 1000); // Simulate network delay
  }, []);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Category: {categoryName}</h1>
        {showNotification && (
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg z-50">
            <div className="flex items-center justify-between">
              <p>{notificationMessage}</p>
              <button onClick={handleCloseNotification} className="ml-4 text-white font-bold">
                &times;
              </button>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-blue-600 border-t-transparent" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.length === 0 ? (
            <p className="text-center text-gray-500 col-span-full">No listings available.</p>
          ) : (
            cards.map((card) => (
              <Link to={`/listing/${btoa(btoa(card.id))}`} key={card.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
                <img src={card.image} alt={card.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{card.name}</h2>
                  <p className="text-gray-700">{card.contact || 'Contact not available'}</p>
                  <p className="text-black font-semibold mt-2">Amount Requested: $5000</p>
                  <div className="flex items-center justify-between mt-4 text-blue-600">
                    <span className="font-bold">Learn More</span>
                    <FaChevronRight size={15} />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
