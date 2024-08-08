import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import './index.css';

const Modal = ({ showModal, handleClose, department, handleSave }) => {
  const fadeIn = useSpring({
    opacity: showModal ? 1 : 0,
    transform: showModal ? 'translateY(0)' : 'translateY(-50px)',
    config: { duration: 300 }
  });

  const [shortText, setShortText] = useState('');
  const [longText, setLongText] = useState('');
  const [file, setFile] = useState(null);

  if (!showModal) return null;

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = {
      department,
      shortText,
      longText,
      fileName: file ? file.name : 'No file uploaded',
    };
    const savedData = JSON.parse(localStorage.getItem('formData')) || {};
    savedData[department] = formData;
    localStorage.setItem('formData', JSON.stringify(savedData));
    handleSave();
  };

  return (
    <animated.div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      style={fadeIn}
    >
      <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Submit your {department} details</h2>
          <img
            src="https://img.icons8.com/ios/50/000000/close-window.png"
            alt="Close"
            onClick={handleClose}
            className="w-4 cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label className="block">
            Question (up to 15 words):
            <input
              type="text"
              value={shortText}
              onChange={(e) => setShortText(e.target.value)}
              placeholder="Enter your short text"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block">
            Why to Join (up to 100 words):
            <textarea
              value={longText}
              onChange={(e) => setLongText(e.target.value)}
              placeholder="Enter your long text"
              className="mt-1 w-full p-2 border border-gray-300 rounded"
            />
          </label>
          <label className="block">
            Upload a File:
            <input
              type="file"
              onChange={handleFileChange}
              className="mt-1 w-full"
            />
          </label>
        </div>
        <button
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg shadow-md hover:bg-red-400 transition duration-300"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </animated.div>
  );
};

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    year: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [notification, setNotification] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (formData.name && formData.email && formData.mobile && formData.year) {
      setStep(2);
    } else {
      alert('Please fill out all personal details.');
    }
  };

  const handleSubmitForm = (department) => {
    setSelectedDepartment(department);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = () => {
    setShowModal(false);
    setNotification(true);
    setTimeout(() => setNotification(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col items-center p-6">
      <header className="w-full bg-gray-900 p-4 text-center text-2xl font-bold">
        Recruitment Form
      </header>
      {step === 1 && (
        <div className="w-full max-w-lg p-6 bg-gray-900 rounded-lg shadow-lg relative">
          <h1 className="text-2xl font-semibold mb-6 text-center">Personal Details</h1>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg mb-1">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Name"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg mb-1">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="mobile" className="block text-lg mb-1">Mobile No:</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter Mobile No"
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="year" className="block text-lg mb-1">Year:</label>
              <select
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg"
              >
                <option value="">Select Year</option>
                <option value="1">First</option>
                <option value="2">Second</option>
                <option value="3">Third</option>
              </select>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-400 transition duration-300"
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 2 && (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl flex flex-wrap gap-4 justify-center">
            <button
              className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-400 transition duration-300 flex-1 max-w-[200px]"
              onClick={() => handleSubmitForm('Web Development')}
            >
              Web Development
            </button>
            <button
              className="bg-red-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-red-400 transition duration-300 flex-1 max-w-[200px]"
              onClick={() => handleSubmitForm('App Development')}
            >
              App Development
            </button>
            <button
              className="bg-yellow-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-yellow-400 transition duration-300 flex-1 max-w-[200px]"
              onClick={() => handleSubmitForm('Writing')}
            >
              Writing
            </button>
            <button
              className="bg-purple-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-purple-400 transition duration-300 flex-1 max-w-[200px]"
              onClick={() => handleSubmitForm('Photography')}
            >
              Photography
            </button>
          </div>
        </div>
      )}

      <Modal
        showModal={showModal}
        handleClose={handleCloseModal}
        department={selectedDepartment}
        handleSave={handleSave}
      />

      {notification && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
          <p>You can fill any number of department forms.</p>
        </div>
      )}
    </div>
  );
};

export default App;
