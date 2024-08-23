type ResultsCountProps = {
  totalNumberOfJobItems: number;
};

export default function ResultsCount({
  totalNumberOfJobItems,
}: ResultsCountProps) {
  return (
    <p className="count">
      <span className="u-bold">{totalNumberOfJobItems}</span> results
    </p>
  );
}
