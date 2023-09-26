"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { motion, AnimatePresence } from "framer-motion";
import Aos from "aos";
import "aos/dist/aos.css";
import OrderDetails from "@/app/components/main/OrderDetails";

// Moment.js settings
const localizer = momentLocalizer(moment);

// Function to extract email from the URL
function getEmailFromURL() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function isValidEmail(userEmail) {
  var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return re.test(userEmail);
}

export default function TimePicker() {
  const [email, setEmail] = useState("");
  const [displayEmail, setDisplayEmail] = useState("");
  const [emailInUrl, setEmailInUrl] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [customerCount, setCustomerCount] = useState(1);
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [disabledTimes, setDisabledTimes] = useState([]);
  const [ID, setID] = useState();
  const [userEmail, setUserEmail] = useState("");
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

      if (urlEmail) {
        setEmailInUrl(true);
      }

      if (urlEmail) {
        console.log(urlEmail, "URL EMAIL / ID");
        setID(urlEmail);
        const savedData = JSON.parse(localStorage.getItem(urlEmail) || "{}");
        // console.log(savedData, "saved data from an id");
        if (savedData.date) {
          setSelectedDate(new Date(savedData.date)); // Convert string to Date object
        }
        if (savedData.customer) {
          setCustomerCount(savedData.customer); // Set the customer count
        }
        if (savedData.email) {
          setUserEmail(savedData.email);
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
        if (savedData.email) {
          setUserEmail(savedData.email);
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
      disableTimes(start);
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
    console.log(disabledTimes);
  };

  // Update email state and displayEmail state when input value changes
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;

    setUserEmail(newEmail);
    setDisplayEmail(newEmail);
  };

  function disableTimes(day) {
    const date = ("selected date", moment(day).format("YYYY-MM-DD"));
    // console.log(date);

    const StoredData = Object.keys(localStorage).map((key) => {
      let parsedData = null;
      try {
        parsedData = JSON.parse(localStorage.getItem(key));
      } catch (error) {
        console.error(`Error parsing data for key ${key}: ${error}`);
      }
      return parsedData;
    });

    const validStoredData = StoredData.filter((data) => {
      return data && data.date === date && data.time;
    });

    // console.log("all stored data ", validStoredData);
    const foundTimes = validStoredData
      .map((data) => (data.date === date ? data.time : undefined)) // map to time or undefined
      .filter((time) => time !== undefined); // filter out undefined values

    // console.log("found times", foundTimes);
    setDisabledTimes(foundTimes);
  }

  // console.log(email, "email");
  // console.log(userEmail, "userEmail");

  const handleSaveDateTime = (e) => {
    if (!selectedDate || !selectedTime) {
      alert("Please choose a pickup time!");
      e.preventDefault();
      return;
    }
    if (ID) {
      console.log(ID, "I AM SAVING DATA WITH THIS ID/PARAMS ");
      localStorage.setItem("LastSavedOrderID", ID);
    } else {
      const newID = localStorage.getItem("lastMealId");
      setID(newID);
      localStorage.setItem("LastSavedOrderID", email);
      console.log("newID", newID);
    }

    // If no old email and no new email provided, return
    if (!ID && !email) {
      console.warn("No identifier (email or ID) available");
      return;
    }

    let oldSavedData = ID ? JSON.parse(localStorage.getItem(ID)) : {};
    console.log(oldSavedData, "OLD SAVED DATA");

    let newSavedData = email ? JSON.parse(localStorage.getItem(email)) : {};
    console.log(newSavedData, "NEW SAVED DATA");

    // Update the data with the new values
    let updatedData = {
      ...oldSavedData,
      ...newSavedData,
      date: moment(selectedDate).format("YYYY-MM-DD"),
      time: selectedTime.format("HH:mm"),
      customer: customerCount,
      email: userEmail,
      id: ID ? ID : email,
    };

    // console.log(updatedData, "UPDATED DATA");
    // console.log(email, "email");
    // console.log(userEmail, "userEmail");

    if (ID) {
      // Save updated data to the new email
      console.log("SAVING DATA TO LS WITH THIS ID", ID);
      localStorage.setItem(ID, JSON.stringify(updatedData));
    }

    if (email) {
      // Save updated data to the new email

      console.log("SAVING DATA TO LS WITH THIS ID", email);
      localStorage.setItem(email, JSON.stringify(updatedData));
    }

    // Fetch the last used ID from localStorage (return string as integer)
    const lastId = parseInt(localStorage.getItem("lastMealId") || "0", 10);
    // Increment the ID by one
    const nextId = lastId + 1;
    // Save the new ID to localStorage for future use

    localStorage.setItem("lastMealId", nextId.toString());
    return nextId; // Return the generated ID
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
                    backgroundColor: "gray",
                    opacity: 0.5,
                    pointerEvents: "none", // make it unselectable
                  },
                };
              }
              // If the date is a weekend
              else if (dayOfWeek === 6 || dayOfWeek === 0) {
                return {
                  style: {
                    backgroundColor: "gray",
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

                        <Link
                          href="/order/receipt"
                          onClick={handleSaveDateTime}
                          className="hidden hover:cursor-none relative sm:inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 border-gray-400 border-2 hover:BORDER-bgColorDark rounded-lg group"
                        >
                          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-main-color rounded-full group-hover:w-72 group-hover:h-72"></span>
                          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                          <span className="relative">Complete Order</span>
                        </Link>
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
                  disabled={disabledTimes.includes(time)}
                  className={`hover:cursor-none relative w-full inline-flex items-center justify-center px-7 py-2 overflow-hidden font-mono font-medium tracking-tighter text-white ${
                    disabledTimes.includes(time)
                      ? "opacity-30 bg-gray-900 cursor-not-allowed"
                      : "bg-gray-800"
                  } border-gray-400 border-2 hover:border-gray-400 rounded-lg group`}
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

        {isValidEmail(userEmail) ? (
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
      </div>
      <div id="basket" className="mt-20 w-full ">
        <OrderDetails />
      </div>
    </main>
  );
}
