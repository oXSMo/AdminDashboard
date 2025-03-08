//////!   TOGGLE BUTTON   !//////

import { useEffect, useRef, useState } from "react";
import { darkSlice } from "../Store/darktheme";
import html2canvas from "html2canvas";
import axios from "axios";

export const useToggleTheme = () => {
  const { isDark, setisDark } = darkSlice();

  // Toggle dark mode
  const toggleTheme = () => {
    setisDark((prev) => !prev);
  };

  // Check saved theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setisDark(true);
    }
  }, []);

  // Apply dark mode class to <html> element
  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return { setisDark, isDark };
};

export const useScreenWidth = () => {
  const [width, setwidth] = useState();

  useEffect(() => {
    const handleResize = () => {
      setwidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return width;
};

export const useClickOut = (fn) => {
  const ref = useRef();

  useEffect(() => {
    let handle = (e) => {
      if (!ref.current.contains(e.target)) {
        fn();
      }
    };
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  });

  return ref;
};

export const useClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setIsCopied(text);
        setTimeout(() => setIsCopied(""), 2000); // Reset after 2 seconds
      })
      .catch((error) => {
        console.error("Failed to copy: ", error);
        setIsCopied("");
      });
  };

  return {
    isCopied,
    copyToClipboard,
  };
};

export const useScreenshot = () => {
  const [loading, setloading] = useState(false);
  const ref = useRef(null);
  const [image, setImage] = useState(null);

  // Take screenshot and return data URL
  const takeScreenshot = async (options = {}) => {
    if (!ref.current) return null;

    try {
      const canvas = await html2canvas(ref.current, options);
      const dataUrl = canvas.toDataURL("image/png");
      setImage(dataUrl);
      return dataUrl; // Return the data URL for immediate use
    } catch (error) {
      console.error("Screenshot failed:", error);
      return null;
    }
  };

  // Download the image
  const downloadImage = (dataUrl, filename = "screenshot.png") => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = dataUrl;
    link.click(); // Trigger download
  };

  return { ref, image, takeScreenshot, downloadImage };
};

export const useUploadImg = () => {
  const [loading, setloading] = useState(false);
  const [err, seterr] = useState(false);
  const [image, setimage] = useState();
  const upload = async (img) => {
    try {
      setloading(true);
      const formData = new FormData();
      formData.append("image", img);

      const resp = await axios.post(
        "https://api.imgbb.com/1/upload?key=e017e24585b5ce2b1a3904b241e8be8f",
        formData
      );

      setimage(resp.data.data.image.url);
      return resp.data.data.image.url;
    } catch (error) {
      seterr(true);
      console.log(error);
    } finally {
      setloading(false);
    }
  };

  return { loading, err, upload, image };
};
