import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { toast } from 'sonner';

const IsAuthenticatedUser = ({ children }) => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
      toast.info('Login First To Access The Resources');
    }
  }, [userInfo, navigate]);

  return userInfo ? children : null;
};

export default IsAuthenticatedUser;
