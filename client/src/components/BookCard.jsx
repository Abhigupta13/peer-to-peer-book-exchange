const BookCard = ({ book, showOwnerDetails = true }) => {
  
  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'available': return 'text-green-500';
      case 'rented': return 'text-yellow-500';
      case 'exchanged': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#0f3664] to-[#1e3c72] text-white p-4 rounded-lg shadow-md transition-all duration-300 hover:scale-105">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold truncate pr-2">{book.title}</h2>
        <span className={`font-semibold text-lg ${getStatusColor(book.status)}`}>
          {book.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center">
          <span className="mr-2">✍️</span>
          <p className="text-sm">
            <span className="font-medium">Author:</span> {book.author}
          </p>
        </div>

        {book.genre && (
          <div className="flex items-center">
            <span className="mr-2">📚</span>
            <p className="text-sm">
              <span className="font-medium">Genre:</span> {book.genre}
            </p>
          </div>
        )}

        <div className="flex items-center">
          <span className="mr-2">📍</span>
          <p className="text-sm">
            <span className="font-medium">Location:</span> {book.location}
          </p>
        </div>

        <div className="flex items-center">
          <span className="mr-2">📞</span>
          <p className="text-sm">
            <span className="font-medium">Contact:</span> {book.phoneNo}
          </p>
        </div>

        {showOwnerDetails && book.owner && (
          <div className="mt-3 pt-2 border-t border-gray-700">
            <div className="flex items-center">
              <span className="mr-2">👤</span>
              <p className="text-sm">
                <span className="font-medium">Owner Name:</span> {book.owner.name}
              </p>
            </div>
            <div className="flex items-center">
              <span className="mr-2">✉️</span>
              <p className="text-sm">
                <span className="font-medium">Owner Email:</span> {book.owner.email}
              </p>
            </div>
          </div>
        )}

        {book.createdAt && (
          <div className="flex items-center text-xs text-gray-400 mt-2">
            <span className="mr-2">🕒</span>
            Listed on: {new Date(book.createdAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;