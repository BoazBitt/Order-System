import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../store/store";
import { getCustomerReport } from "../../utilis/actions/customerActions.api";
import {
  ChartData,
  serializeReport,
} from "../../utilis/actions/functions/serializeReport";
import { useLocation } from "react-router-dom";
import classes from "./Report.module.scss";

// import BarChart from "./Charts/BarChart";
// import PieChart from "./Charts/PieChart";
const Report = () => {
  const location = useLocation();
  const { Name } = location.state || {};
  const [report, setReport] = useState<ChartData | null>(null);
  const { id } = useParams();
  const token = useSelector((state: RootState) => state.user.token);
  console.log(report);
  useEffect(() => {
    const getCharts = async () => {
      const data = await getCustomerReport(token, id);
      const charts = serializeReport(data);
      setReport(charts);
    };
    if (id) {
      getCharts();
    }
  }, []);
  return (
    <>
      <div className={classes.__report}>
        <h1>Report Page</h1>
        <h3>Customer Name: {Name}</h3>
      </div>
      {report && (
        <>
          {" "}
          {/* <BarChart dataPoints={report.bar} /> */}
          {/* <PieChart dataPoints={report.pie} /> */}
        </>
      )}
    </>
  );
};

export default Report;
