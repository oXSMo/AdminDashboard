import React, { useEffect, useRef, useState } from "react";
import { dashboardSlice } from "../../Store/dashboard";
import ReactApexChart from "react-apexcharts";
import { darkSlice } from "../../Store/darktheme";
import Select from "../../Components/common/Select";
import CounterUp from "../../Components/common/CounterUp";
import { useScreenshot } from "../../Utils/Hooks";
import { MdAddAPhoto } from "react-icons/md";
import Tooltip from "../../Components/common/Tooltip";

function TotalChart() {
  const { total } = dashboardSlice();
  const { ref, image, takeScreenshot, downloadImage } = useScreenshot();

  const [credenitals, setcredenitals] = useState({ chartTime: "Month" });

  const handleScreenshot = async () => {
    const dataUrl = await takeScreenshot();
    if (dataUrl) {
      downloadImage(dataUrl, "my-screenshot.png"); // Custom filename
    }
  };

  return (
    <section className="p-4 w-full  border border-color rounded-xl sm:h-[500px] h-[400px] grid grid-rows-[auto_1fr] bg-white dark:bg-fif shadow-lg shadow-black/40">
      {/* HEADER  */}

      <header className="flex justify-between items-center">
        <aside>
          <h1 className=" tracking-wide opacity-70">
            Total This {credenitals.chartTime}
          </h1>
          <h2 className="text-4xl font-medium flex gap-2">
            {!total ? (
              0
            ) : (
              <CounterUp
                maxValue={total
                  ?.map((e) => e.totalPrice)
                  .reduce((a, b) => a + b)}
                duration={1500}
                steps={150}
              />
            )}
            <span className="mt-auto opacity-60 text-xl">DA</span>
          </h2>
        </aside>

        <article className="flex gap-2">
          <aside className="grid grid-cols-2 cursor-pointer border  rounded-md gap-1 w-36 font-medium border-color relative  text-xs overflow-hidden">
            <span
              className={`absolute w-1/2 duration-300 bg-neutral-200  dark:bg-neutral-700  top-1/2 z-0 -translate-y-1/2 h-full ${
                credenitals.chartTime === "Week"
                  ? "translate-x-0"
                  : "translate-x-full"
              }`}
            />
            <div
              onClick={() =>
                setcredenitals({ ...credenitals, chartTime: "Week" })
              }
              className="p-2 place-self-center relative z-10"
            >
              Week
            </div>
            <div
              onClick={() =>
                setcredenitals({ ...credenitals, chartTime: "Month" })
              }
              className="p-2 place-self-center relative z-10"
            >
              Month
            </div>
          </aside>

          <button
            onClick={handleScreenshot}
            className="button hs-tooltip [--placement:top] border border-color hover:border-transparent w-9 !p-0"
          >
            <MdAddAPhoto />
            <span
              className="hs-tooltip-content hs-tooltip-shown:opacity-100 text-xs hs-tooltip-shown:visible opacity-0 transition-opacity inline-block  absolute invisible z-10 p-1  bg-gray-900  font-medium text-white rounded shadow-sm dark:bg-neutral-700"
              role="tooltip"
            >
              ScreenShot
            </span>
          </button>
        </article>
      </header>

      {/* CART  */}
      <div ref={ref} className="mt-auto overflow-hidden">
        <Chart chartTime={credenitals.chartTime} />
      </div>
    </section>
  );
}

const Chart = ({ chartTime }) => {
  const { isDark } = darkSlice();
  const { total } = dashboardSlice();

  const ttl = getLast30Days().map((day, i) =>
    total?.find((t) => t._id === day)
      ? total?.find((t) => t._id === day)?.totalPrice
      : 0
  );

  const series = [
    {
      name: "2023",
      data: ttl,
    },
  ];

  // console.log({ days: getLast30Days(), ttl });

  const [options, setoptions] = useState();

  useEffect(() => {
    setoptions({
      chart: {
        type: "area",
        animations: {
          speed: 2500, // Increase the speed for faster animation
          animateGradually: {
            enabled: false, // Disable gradual animation
          },
        },
        toolbar: { show: false },
        zoom: { enabled: false },
        redrawOnParentResize: true,
        redrawOnWindowResize: true,
        parentHeightOffset: 0,
        zoom: {
          disabled: true,
          autoScaleYaxis: true,
        },
      },

      colors: ["#2563eb", "#9333ea"],
      legend: { show: false },
      dataLabels: { enabled: false },
      stroke: {
        curve: "straight",
        width: 2,
      },
      grid: {
        strokeDashArray: 3,
        borderColor: !isDark ? "#00000555" : "#393A3A",
      },
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          shadeIntensity: 1,
          opacityFrom: 0.5, // Increased starting opacity
          opacityTo: 0.2, // Reduced ending opacity
          stops: [100, 90, 0], // Reversed stops for dark mode
          colorStops: [
            {
              offset: 0,
              color: "#3b82f6",
              opacity: 0.4,
            },
            {
              offset: 100,
              color: "#1e3a8a",
              opacity: 0.1,
            },
          ],
        },
      },
      xaxis: {
        min: UnixBefore(chartTime === "Week" ? 7 : 30, "day"),
        type: "category",
        categories: getLast30Days(),
        tickPlacement: "on",
        type: "datetime",
        axisBorder: { show: true },
        axisTicks: { show: true },
        crosshairs: {
          stroke: { dashArray: 1 },
          dropShadow: { show: true },
        },
        tooltip: { enabled: false },
        labels: {
          style: {
            colors: isDark ? "#9ca3af" : "#000000aa",
            fontSize: "12px",
            fontWeight: 400,
          },
          // formatter: (title) => title.split(" ")[1].slice(0, 3),
        },
      },
      yaxis: {
        labels: {
          align: "left",
          minWidth: 0,
          maxWidth: 140,
          style: {
            colors: isDark ? "#9ca3af" : "#000000aa",
            fontSize: "12px",
            fontWeight: 400,
          },
          formatter: (value) => (value >= 1000 ? `${value / 1000}k` : value),
        },
      },
      tooltip: {
        x: { format: "MMMM yyyy" },
        y: {
          formatter: (value) =>
            `$${value >= 1000 ? `${value / 1000}k` : value}`,
        },
        custom: function ({ series, seriesIndex, dataPointIndex, w }) {
          return `<div class="min-w-48 dark:bg-fif    rounded-md p-4 py-3">
          <p class="text-sm dark:text-white text-gray-500 font-medium">Total Earned</p>
          ${series
            .map(
              (s, i) => `
            <div class="flex items-center mt-2">
              <span class="w-2 h-2 rounded-sm mr-2" style="background-color: ${
                w.globals.colors[i]
              }"></span>
              <div class="flex justify-between w-full">
                <span class="text-gray-500 text-xs">${
                  w.config.xaxis.categories[dataPointIndex]
                }</span>
                <span class="opacity-60 text-xs font-medium">
                  ${s[dataPointIndex].toLocaleString()} DA
                </span>
              </div>
            </div>
          `
            )
            .join("")}
        </div>`;
        },
      },
      responsive: [
        {
          breakpoint: 640,
          options: {
            chart: { height: 300 },
            xaxis: {
              labels: {
                style: {
                  colors: "#9ca3af",
                  fontSize: "11px",
                  fontFamily: "Inter, ui-sans-serif",
                  fontWeight: 400,
                },
                offsetX: -2,
                // formatter: (title) => title.split(" ")[1].slice(0, 3),
              },
            },
            yaxis: {
              opposite: true,
              labels: {
                style: {
                  colors: "#9ca3af",
                  fontSize: "11px",
                  fontFamily: "Inter, ui-sans-serif",
                  fontWeight: 400,
                },
                formatter: (value) =>
                  value >= 1000 ? `${value / 1000}k` : value,
              },
            },
          },
        },
      ],
    });
  }, [isDark, total, chartTime]);

  return (
    <div id="chart" className="">
      {options ? (
        <ReactApexChart
          options={options}
          series={series || 0}
          type="area"
          height={400}
          width={"100%"}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TotalChart;

function UnixBefore(interval, unit = "month", time) {
  const now = time ? new Date(time) : new Date();

  switch (unit) {
    case "month":
      now.setMonth(now.getMonth() - interval);
      break;
    case "year":
      now.setFullYear(now.getFullYear() - interval);
      break;
    case "day":
      now.setDate(now.getDate() - interval);
      break;
    default:
      throw new Error("Invalid unit");
  }

  return Math.floor(now.getTime());
}

function getLast30Days(days = 30) {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(today); // Create a copy of today's date
    date.setDate(today.getDate() - i); // Subtract 'i' days

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    dates.push(`${year}-${month}-${day}`);
  }

  return dates.reverse();
}
