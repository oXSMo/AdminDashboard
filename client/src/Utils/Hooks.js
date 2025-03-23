//////!   TOGGLE BUTTON   !//////

import { useCallback, useEffect, useRef, useState } from "react";
import { darkSlice } from "../Store/darktheme";
import html2canvas from "html2canvas";
import axios from "axios";
import html2pdf from "html2pdf.js";

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

export const useDownloadInvoic = () => {
  const invoiceRef = useRef();

  const handleDownload = () => {
    const options = {
      margin: 10,
      filename: "invoice.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    html2pdf().from(invoiceRef.current).set(options).save();
  };

  return { invoiceRef, handleDownload };
};

export const useAnimatedCounter = (target, duration = 2000, stepSize = 1) => {
  const [current, setCurrent] = useState(target);
  const prevTargetRef = useRef(target);
  const animationRef = useRef();
  const startValueRef = useRef(target);

  useEffect(() => {
    const prevTarget = prevTargetRef.current;
    prevTargetRef.current = target;
    startValueRef.current = current;

    const start = current;
    const end = target;
    const range = end - start;
    const startTime = performance.now();

    const animate = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Calculate total possible steps
      const totalSteps = Math.ceil(Math.abs(range) / stepSize);
      // Calculate how many steps we should have taken by now
      const stepsTaken = Math.floor(progress * totalSteps);

      // Calculate new value
      let newValue = start + stepsTaken * stepSize * Math.sign(range);

      // Ensure we don't overshoot the target
      newValue = range > 0 ? Math.min(newValue, end) : Math.max(newValue, end);

      setCurrent(newValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setCurrent(end); // Ensure final value is exact
      }
    };

    if (prevTarget !== target) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target, duration, stepSize]);

  const formatNumber = useCallback((num) => {
    return num.toLocaleString();
  }, []);

  return {
    current: formatNumber(current),
    rawCurrent: current,
  };
};
