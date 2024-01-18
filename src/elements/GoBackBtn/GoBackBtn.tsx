import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

export const GoBackBtn = (props: Props) => {
  const navigate = useNavigate();
  const handleClick = () => [navigate(-1)];

  return <button onClick={handleClick}>go back</button>;
};
