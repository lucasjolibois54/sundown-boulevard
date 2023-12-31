"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { motion, AnimatePresence } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";

// Moment.js settings
const localizer = momentLocalizer(moment);

// Function to extract email from the URL
function getEmailFromURL() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("email");
}

function isValidEmail(email) {
  var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(email);
}

export default function TimePicker() {
  const [email, setEmail] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  const [emailInUrl, setEmailInUrl] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [customerCount, setCustomerCount] = useState(1);
  const [showTimeModal, setShowTimeModal] = useState(false);

  const timeSlots = [
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.9,
    },
  };

  // load data on mount
  useEffect(() => {
    Aos.init({ duration: 1000 });

    if (typeof window !== "undefined") {
      const urlEmail = getEmailFromURL();

      if (urlEmail && isValidEmail(urlEmail)) {
        setEmailInUrl(true);
      }

      if (urlEmail) {
        setEmail(urlEmail);
        const savedData = JSON.parse(localStorage.getItem(urlEmail) || "{}");
        if (savedData.date) {
          setSelectedDate(new Date(savedData.date)); // Convert string to Date object
        }
        if (savedData.customer) {
          setCustomerCount(savedData.customer); // Set the customer count
        }
      } else {
        // Fallback to lastMealId if no email found in the URL
        const lastMealId = localStorage.getItem("lastMealId") || ""; //Retrieve Email/ id from Local Storage
        setEmail(lastMealId);

        const savedData = JSON.parse(localStorage.getItem(lastMealId) || "{}");
        if (savedData.date) {
          setSelectedDate(new Date(savedData.date));
        }
        if (savedData.customer) {
          setCustomerCount(savedData.customer);
        }
      }
    }
  }, []);

  // Handle the selection of a date on the calendar
  const handleDateSelect = ({ start }) => {
    const currentDate = moment();
    if (moment(start).isBefore(currentDate, "day")) {
      return; // Exit the function if it's a past date
    }

    // NO Saturdays and Sundays
    const dayOfWeek = moment(start).day();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      setSelectedDate(start);
      setShowTimeModal(true); // Open modal if not a weekend
    }
  };

  // Handle the selection of a time slot
  const handleTimeSelect = (time) => {
    const dateTime = moment(
      `${selectedDate.toISOString().split("T")[0]} ${time}`
    );
    setSelectedTime(dateTime);
    setShowTimeModal(false);
  };

  // Update email state and displayEmail state when input value changes
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setDisplayEmail(newEmail);
  };

  const handleSaveDateTime = (e) => {
    if (!selectedDate || !selectedTime) {
      alert("Please choose a pickup time!");
      e.preventDefault();
      return;
    }

    // Save the current email as the last saved order email
    localStorage.setItem("LastSavedOrderEmail", email);

    const oldEmail = localStorage.getItem("lastMealId");

    // If no old email and no new email provided, return
    if (!oldEmail && !email) {
      console.warn("No identifier (email or lastMealId) available");
      return;
    }

    // Get existing data from the old email or default to an empty object
    let oldSavedData = oldEmail
      ? JSON.parse(localStorage.getItem(oldEmail))
      : {};

    // If there's a new email provided, fetch its existing data or default to an empty object
    let newSavedData = email
      ? JSON.parse(localStorage.getItem(email) || "{}")
      : {};

    // Update the data with the new values
    let updatedData = {
      ...newSavedData,
      ...oldSavedData,
      date: moment(selectedDate).format("YYYY-MM-DD"),
      time: selectedTime.format("HH:mm"),
      customer: customerCount,
    };

    if (email) {
      // Save updated data to the new email
      localStorage.setItem(email, JSON.stringify(updatedData));

      // Remove the old data if the old email is different from the new email
      if (oldEmail !== email) {
        localStorage.removeItem(oldEmail);
      }
    } else {
      // If there's no new email, just save the data back under the old email (from lastMealId)
      localStorage.setItem(oldEmail, JSON.stringify(updatedData));
    }
  };


  return (
    <main
      data-aos="fade-up"
      data-aos-delay="250"
      data-aos-duration="500"
      className="min-h-screen flex flex-col items-center py-12 max-w-6xl mx-auto"
    >
      <h1 className="text-6xl font-semibold text-center my-10 pb-5 text-white">
        Delivery Informations
      </h1>

      <div className="p-8 rounded-xl shadow-2xl space-y-8 w-full bg-white bg-opacity-10 backdrop-blur-md">
      {/* <input
          type="email"
          placeholder="Enter your email"
          value={displayEmail}
          onChange={handleEmailChange}
          className="p-2 rounded border"
        /> */}
        {!emailInUrl && (
          <input
            type="email"
            placeholder="Enter your email"
            value={displayEmail}
            onChange={handleEmailChange}
            className="p-2 rounded border"
          />
        )}
        <div className="react-calendar shadow-lg rounded-lg overflow-hidden">
          <Calendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            views={["month"]}
            style={{ height: "700px" }}
            onSelectSlot={handleDateSelect}
            selectable={true}
            dayPropGetter={(date) => {
              const currentDate = moment();
              const dayOfWeek = moment(date).day();

              // If the date is before the current date
              if (moment(date).isBefore(currentDate, "day")) {
                return {
                  style: {
                    backgroundColor: "#FF0000",
                    opacity: 0.5,
                    pointerEvents: "none", // make it unselectable
                  },
                };
              }
              // If the date is a weekend
              else if (dayOfWeek === 6 || dayOfWeek === 0) {
                return {
                  style: {
                    backgroundColor: "#FF0000",
                    opacity: 0.5,
                  },
                };
              }
              // If the date is the selected date
              else if (
                selectedDate &&
                moment(date).isSame(selectedDate, "day")
              ) {
                return {
                  style: {
                    backgroundColor: "#007DDB",
                  },
                };
              }
            }}
            components={{
              toolbar: (toolbarProps) => {
                return (
                  <div className="rbc-toolbar">
                    <span className="rbc-btn-group">
                      <button onClick={() => toolbarProps.onNavigate("PREV")}>
                        Back
                      </button>
                      <button onClick={() => toolbarProps.onNavigate("NEXT")}>
                        Next
                      </button>
                    </span>
                    <span className="rbc-toolbar-label">
                      {toolbarProps.label}
                    </span>
                    <span className="rbc-btn-group !text-gray-900 text-center">
                      <div className="flex gap-3">
                        <div className="hidden sm:flex items-center space-x-4 border-2 border-none px-2 py-1 rounded-lg ">
                          <label className="text-gray-300 font-medium mt-1 mr-2">
                            Customer:
                          </label>
                          <button
                            onClick={() =>
                              customerCount > 1 &&
                              setCustomerCount((prev) => prev - 1)
                            }
                            className={`!text-white !rounded !px-3 !py-2 !hover:bg-gray-600 !active:bg-gray-800 !focus:outline-none !focus:ring !focus:ring-gray-200 !transition-shadow !shadow-md ${
                              customerCount <= 1
                                ? "!bg-gray-900 cursor-not-allowed !border-black"
                                : "!bg-gray-700"
                            }`}
                          >
                            -
                          </button>

                          <input
                            type="number"
                            value={customerCount}
                            readOnly
                            className="border rounded px-3 py-1 pr-2 w-16 text-center shadow-md bg-transparent text-white"
                          />
                          <button
                            onClick={() =>
                              customerCount < 10 &&
                              setCustomerCount((prev) => prev + 1)
                            }
                            className={`!text-white !rounded !px-3 !py-2 !hover:bg-gray-600 !active:bg-gray-800 !focus:outline-none !focus:ring !focus:ring-gray-200 !transition-shadow !shadow-md ${
                              customerCount >= 10
                                ? "!bg-gray-900 cursor-not-allowed !border-black"
                                : "!bg-gray-700"
                            }`}
                          >
                            +
                          </button>
                        </div>
                        {isValidEmail(email) ? (
                          <Link
                            href="/order/receipt"
                            onClick={handleSaveDateTime}
                            className="hidden hover:cursor-none relative sm:inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 border-gray-400 border-2 hover:BORDER-bgColorDark rounded-lg group"
                          >
                            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-main-color rounded-full group-hover:w-72 group-hover:h-72"></span>
                            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                            <span className="relative">Complete Order</span>
                          </Link>
                        ) : (
                          <div className="hidden hover:cursor-none relative sm:inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 border-gray-400 border-2 hover:BORDER-bgColorDark rounded-lg group">
                            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-500 rounded-full group-hover:w-72 group-hover:h-72"></span>
                            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                            <span className="relative">Add Valid Email</span>
                          </div>
                        )}
                      </div>
                    </span>
                  </div>
                );
              },
            }}
          />
        </div>

        {/* Modal for time slot selection */}
        {showTimeModal && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
            transition={{ type: "spring", stiffness: 120 }}
            className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center"
          >
            <div className="bg-gray-800 rounded-lg p-4 space-y-4 w-1/3">
              <h2 className="text-xl text-white font-semibold mb-2 text-center">
                Select a time:
              </h2>
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSelect(time)}
                  className="hover:cursor-none relative w-full inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 border-gray-400 border-2 hover:border-gray-400 rounded-lg group"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-main-color rounded-full group-hover:w-full group-hover:h-72"></span>
                  <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                  <span className="relative">{time}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div className="flex sm:hidden items-center space-x-4">
          <label className="text-gray-300 font-medium mb-2 mr-2">
            Customer:
          </label>
          <button
            onClick={() =>
              customerCount > 1 && setCustomerCount((prev) => prev - 1)
            }
            className={`!text-white !rounded !px-3 !py-2 !hover:bg-gray-600 !active:bg-gray-800 !focus:outline-none !focus:ring !focus:ring-gray-200 !transition-shadow !shadow-md ${
              customerCount <= 1
                ? "!bg-gray-900 cursor-not-allowed !border-black"
                : "!bg-gray-700"
            }`}
          >
            -
          </button>
          <input
            type="number"
            value={customerCount}
            readOnly
            className="border rounded px-3 py-2 w-16 text-center shadow-md"
          />
          <button
            onClick={() =>
              customerCount < 10 && setCustomerCount((prev) => prev + 1)
            }
            className={`!text-white !rounded !px-3 !py-2 !hover:bg-gray-600 !active:bg-gray-800 !focus:outline-none !focus:ring !focus:ring-gray-200 !transition-shadow !shadow-md ${
              customerCount >= 10
                ? "!bg-gray-900 cursor-not-allowed !border-black"
                : "!bg-gray-700"
            }`}
          >
            +
          </button>
        </div>

        {isValidEmail(email) ? (
          <Link
            href="/order/receipt"
            onClick={handleSaveDateTime}
            className="sm:hidden hover:cursor-none relative inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 border-gray-400 border-2 hover:BORDER-bgColorDark rounded-lg group"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-main-color rounded-full group-hover:w-72 group-hover:h-72"></span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span className="relative">Complete Order</span>
          </Link>
        ) : (
          <div className="sm:hidden hover:cursor-none relative inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-red-600 border-gray-400 border-2 hover:BORDER-bgColorDark rounded-lg group">
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-red-500 rounded-full group-hover:w-72 group-hover:h-72"></span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-red-400"></span>
            <span className="relative">Add Valid Email</span>
          </div>
        )}

        {/* <button
          onClick={handleSaveDateTime}
          className=" w-full mt-4 bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-500 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200 transition-shadow shadow-md"
        >
          Save Date & Time
        </button> */}

        {/* <div className="mt-6 text-white">
          <p><strong>Selected Date:</strong> {selectedDate?.toDateString()}</p>
          <p><strong>Selected Time:</strong> {selectedTime?.format('HH:mm')}</p>
          <p><strong>Customer Count:</strong> {customerCount}</p>
        </div>
        
        <Link className="text-blue-400 mt-4 hover:underline focus:outline-none" href="/order/receipt" passHref>
          Receipt
        </Link> */}
      </div>
    </main>
  );
}
