import SummaryCard from "./SummaryCard";

function SummarySection({ preData, afterData }) {
  return (
    <section className="mb-6 grid gap-6 lg:grid-cols-2">
      <SummaryCard data={preData} title="Pre Harvesting" />
      <SummaryCard accent data={afterData} title="After Harvesting" />
    </section>
  );
}

export default SummarySection;
