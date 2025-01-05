import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const SearchFriendCard = ({ userName, email, _id }) => {
  const handleSentRequest = async (id) => {
    try {
      await axios.post('friends/send-request', { recipientId: id });
      toast.success('Friend request sent successful.');
    } catch (error) {
      console.log(error);
      toast.error('Unable to send request.');
    }
  };

  return (
    <div className="bg-slate-800 text-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-start">
          <h2>{userName}</h2>
          <p>{email}</p>
        </div>
        <div>
          <button
            onClick={() => handleSentRequest(_id)}
            className="border rounded-lg cursor-pointer px-4 py-2 hover:bg-slate-400"
          >
            Send Request
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SearchFriendCard;
