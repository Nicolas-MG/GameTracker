const SummaryCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-md p-4 text-center">
    <h3 className="text-2xl font-bold">{value}</h3>
    <p className="text-gray-500">{title}</p>
  </div>
);

export default SummaryCard;
