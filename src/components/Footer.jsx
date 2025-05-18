import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import "./_footer.scss";

const Footer = () => {
  const [colors, setColors] = useState({
    text: "#111",
    background: "#fff",
    night: false,
  });

  const toggleNightMode = () => {
    const text = colors.background;
    const background = colors.text;

    document.documentElement.style.setProperty("--color-text", text);
    document.documentElement.style.setProperty("--color-background", background);

    setColors({ text, background, night: !colors.night });
  };

  return (
    <footer>
      <button className="switch" onClick={toggleNightMode}>
        <FontAwesomeIcon icon={faLightbulb} />
      </button>
    </footer>
  );
};

export default Footer;
