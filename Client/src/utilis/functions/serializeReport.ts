import CustomerReportInterface from "../interface/CustomerReport.interface";
export interface ChartData {
  bar: Array<{ y: number; label: string }>;
  pie: Array<{ y: number; label: string }>;
}
export const serializeReport = (report: CustomerReportInterface): ChartData => {
  const bar: { y: number; label: string }[] = [];
  const pie: { y: number; label: string }[] = [];
  const totalQuantity = report.report.reduce(
    (sum, item) => sum + item.total_quantity,
    0
  );
  report.report.forEach((item) => {
    bar.push({
      y: item.total_spent,
      label: item.product_name,
    });
    const percentage = (item.total_quantity / totalQuantity) * 100;
    pie.push({
      y: Math.round(percentage),
      label: item.product_name,
    });
  });

  return { bar, pie };
};
