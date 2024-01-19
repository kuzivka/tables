import { useNavigate } from 'react-router-dom';

export const GoBackBtn = () => {
  const navigate = useNavigate();
  const handleClick = () => [navigate(-1)];

  return <button onClick={handleClick}>go back</button>;
};
