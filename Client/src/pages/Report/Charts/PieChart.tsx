import CanvasJSReact from "@canvasjs/react-charts";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;
interface PieChartProps {
  dataPoints: Array<{ y: number; label: string }>;
}
function PieChart({ dataPoints }: PieChartProps) {
  const options = {
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Products Distribution",
    },
    data: [
      {
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  );
}

export default PieChart;
