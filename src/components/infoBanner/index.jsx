import React from "react";
import PeopleIcon from "../icons/peopleIcon";

/**
 * @param {React.ComponentProps<'div'> & {
 *  "title": string,
 *  "desc": string,
 * }} props
 */
function InfoBanner({ title, desc, ...rest }) {
  return (
    <div className="info-banner" {...rest}>
      <div className="info-icon-wrapper">
        <PeopleIcon />
      </div>
      <div className="info-content">
        <h4 className="info-title">{title}</h4>
        <p className="info-desc">{desc}</p>
      </div>
    </div>
  );
}

export default InfoBanner;
