import CanvasJSReact from "@canvasjs/react-charts";
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function addSymbols(e) {
  const suffixes = ["", "K", "M", "B"];
  let order = Math.max(
    Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)),
    0
  );
  if (order > suffixes.length - 1) order = suffixes.length - 1;
  const suffix = suffixes[order];
  return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
}

interface BarChartProps {
  dataPoints: Array<{ y: number; label: string }>;
}
const BarChart = ({ dataPoints }: BarChartProps) => {
  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "All products That were bought",
    },
    axisX: {
      title: "Products",
      reversed: true,
    },
    axisY: {
      title: "Money spent (in $)",
      includeZero: true,
      labelFormatter: addSymbols,
    },
    data: [
      {
        type: "bar",
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default BarChart;
