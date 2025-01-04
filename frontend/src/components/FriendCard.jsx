const FriendCard = ({ userName, email }) => {
  return (
    <div className="bg-slate-800 text-white p-4 rounded-lg shadow-md">
      <img
        className="w-16 h-16 rounded-full mx-auto object-cover"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Avatar"
      />
      <h2 className="text-xl font-semibold mt-4 text-center">{userName}</h2>
      <p className="text-center mt-2">{email}</p>
    </div>
  );
};

export default FriendCard;
