import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

interface BarChartProps {
  dataPoints: Array<{ y: number; label: string }>;
}
const BarChart = ({ dataPoints }: BarChartProps) => {
  const options = {
    title: {
      text: "Category Preference Overview",
    },
    data: [
      {
        type: "column",
        dataPoints: dataPoints,
      },
    ],
  };
  return <CanvasJSChart options={options} />;
};

export default BarChart;
