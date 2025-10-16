import './SummaryCard.css';

const SummaryCard = ({ title, value, icon }) => (
  <div className="summary-card">
    <div className="summary-card-icon">{icon}</div>
    <h3 className="summary-card-value">{value}</h3>
    <p className="summary-card-title">{title}</p>
  </div>
);

export default SummaryCard;
