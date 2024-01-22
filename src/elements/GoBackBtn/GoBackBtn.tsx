import { useNavigate } from 'react-router-dom';
import './GoBackBtnStyles.scss';

export const GoBackBtn = () => {
  const navigate = useNavigate();
  const handleClick = () => [navigate(-1)];

  return (
    <button className="go-back-btn" onClick={handleClick}>
      <span className="material-symbols-outlined back-icon">arrow_back</span>
    </button>
  );
};
