import logo from "./logo.svg";
import React, { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";
import "./components/Sidebar.css"
import Sidebar from "./components/Sidebar";

function App() {
  const [rotateClockwise, setRotateClockwise] = useState(true);
  const [iconSize, setIconSize] = useState(50);
  const [isOpen, setIsOpen] = useState(true);
  const [sizeAdjustmentEnabled, setSizeAdjustmentEnabled] = useState(false);
  const [mouseStayTimeEnabled, setMouseStayTimeEnabled] = useState(false);
  const [toggleRotationEnabled, setToggleRotationEnabled] = useState(false);
  const [mouseInactiveTime, setMouseInactiveTime] = useState(0);

  const timer = useRef(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleRotationToggle = () => {
    setToggleRotationEnabled(!toggleRotationEnabled);
  };

  const handleSizeAdjustmentToggle = () => {
    setSizeAdjustmentEnabled(!sizeAdjustmentEnabled);
  };

  const handleMouseStayTimeToggle = () => {
    setMouseStayTimeEnabled(!mouseStayTimeEnabled);
  };

  const restartTimer = useCallback(() => {
    clearInterval(timer.current);
    timer.current = setInterval(
      () => setMouseInactiveTime((prev) => prev + 1),
      1000
    );
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (sizeAdjustmentEnabled) {
        const viewportWidth = window.innerWidth;
        const newSize = Math.min(
          1000,
          Math.max(50, (e.clientX / viewportWidth) * 100 + 50)
        );
        setIconSize(newSize);
      }

      if (mouseStayTimeEnabled) {
        restartTimer();
      } else {
        clearInterval(timer.current);
      }
    },
    [mouseStayTimeEnabled, restartTimer, sizeAdjustmentEnabled]
  );

  useEffect(() => {
    // Resume the timer when tab is focused
    const handleFocus = () => {
      if (mouseStayTimeEnabled && !timer.current) {
        restartTimer();
      }
    };

    // Remove the timer when tab is blurred
    const handleBlur = () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };

    if (mouseStayTimeEnabled) {
      restartTimer();
    }

    // Add event handlers on mount
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("mousemove", handleMouseMove);

    // Remove the event listeners and timeouts on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      clearInterval(timer.current);
    };
  }, [mouseStayTimeEnabled, timer, restartTimer, handleMouseMove]);

  const handleIconClick = () => {
    if (toggleRotationEnabled) setRotateClockwise((prevRotate) => !prevRotate);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          style={{ width: iconSize, height: iconSize }}
          onClick={handleIconClick}
          className={`App-logo ${
            rotateClockwise ? "clockwise" : "counterclockwise"
          }`}
          alt="logo"
        />
        <div className="timer">Time on page without moving in same tab: {mouseInactiveTime}s</div>
        <button className="button default" onClick={toggleSidebar}>Toggle Sidebar</button>
        <Sidebar
          isOpen={isOpen}
          sizeAdjustmentEnabled={sizeAdjustmentEnabled}
          mouseStayTimeEnabled={mouseStayTimeEnabled}
          toggleRotationEnabled={toggleRotationEnabled}
          onToggleRotation={handleRotationToggle}
          onToggleSizeAdjustment={handleSizeAdjustmentToggle}
          onToggleMouseStayTime={handleMouseStayTimeToggle}
        />
      </header>
    </div>
  );
}

export default App;
