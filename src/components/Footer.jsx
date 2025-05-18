import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import "./_footer.scss";

const Footer = () => {
  const [colors, setColors] = useState();

  // Initialize state based on current theme on component mount
  useEffect(() => {
    const computedStyle = getComputedStyle(document.documentElement);
    const currentTextColor = computedStyle.getPropertyValue('--color-text').trim();
    const currentBgColor = computedStyle.getPropertyValue('--color-background').trim();

    // Check if we're in dark mode (when background is dark)
    const isDarkMode = currentBgColor === "#111";

    setColors({
      text: currentTextColor,
      background: currentBgColor,
      night: isDarkMode,
    });
  }, []);

  const toggleNightMode = () => {
    if (!colors) {
      return
    }
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
