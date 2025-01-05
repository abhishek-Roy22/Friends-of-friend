import axios from 'axios';
import { CircleCheckBig, CircleX } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

const FriendRequestedCard = ({ email, userName, _id }) => {
  const handleAcceptRequest = async (senderId) => {
    try {
      await axios.post('friends/manage-request', {
        senderId,
        action: 'accepted',
      });
      toast.success('Friend Request Accepted.');
    } catch (error) {
      console.log(error);
      toast.error('Unable to Accect request.');
    }
  };

  const handleRejectRequest = async (senderId) => {
    try {
      await axios.post('friends/manage-request', {
        senderId,
        action: 'rejected',
      });
      toast.success('Friend request rejected.');
    } catch (error) {
      console.log(error);
      toast.error('Unable to reject request.');
    }
  };

  return (
    <div className="bg-slate-800 text-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-start">
          <h2>{userName}</h2>
          <p>{email}</p>
        </div>
        <div className="flex gap-2 items-center">
          <button onClick={() => handleAcceptRequest(_id)}>
            <CircleCheckBig color="green" className="cursor-pointer" />
          </button>
          <button onClick={() => handleRejectRequest(_id)}>
            <CircleX color="red" className="cursor-pointer" />
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FriendRequestedCard;
