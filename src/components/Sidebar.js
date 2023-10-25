import React from "react";
import './Sidebar.css'

const Sidebar = ({ isOpen, toggleRotationEnabled, sizeAdjustmentEnabled, mouseStayTimeEnabled, onToggleRotation, onToggleSizeAdjustment, onToggleMouseStayTime }) => {
  const toggleText = (enabled) => {
    return enabled ? "disable" : "enable"
  };
  
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <h3 className="title">Control Panel</h3>
      <div className="option">
        <div className="label">Icon Click Rotation</div>
        <button className={`button ${toggleText(toggleRotationEnabled)}`} onClick={onToggleRotation}>{toggleText(toggleRotationEnabled)}</button>
      </div>
      <div className="option">
        <div className="label">Icon Size Adjustment</div>
        <button className={`button ${toggleText(sizeAdjustmentEnabled)}`} onClick={onToggleSizeAdjustment}>{toggleText(sizeAdjustmentEnabled)}</button>
      </div>
      <div className="hint">Move the cursor to the right of the the page width to increase the size when enabled</div>
      <div className="option">
        <div className="label">Mouse Stay Time in Tab</div>
        <button className={`button ${toggleText(mouseStayTimeEnabled)}`} onClick={onToggleMouseStayTime}>{toggleText(mouseStayTimeEnabled)}</button>
      </div>
    </div>
  );
};

export default Sidebar;