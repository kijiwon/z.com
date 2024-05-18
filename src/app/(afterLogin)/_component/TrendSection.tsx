import Trend from "./Trend";
import style from "./trendSection.module.css";

export default function TrendSection() {
  return (
    <div className={style.trendBg}>
      <div className={style.trend}>
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
        <Trend />
      </div>
    </div>
  );
}
