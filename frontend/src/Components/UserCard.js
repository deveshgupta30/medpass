const UserCard = ({ userData }) => {
  const {
    userId: { name, email },
    gender,
    bloodGroup,
    contactNumber,
    emergencyNumber,
  } = userData;
  return (
    <tr>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div>
            <p className="text-gray-800 text-md font-bold tracking-wide">
              {name}
            </p>
            <p className="text-gray-500 text-sm font-semibold tracking-wide">
              {email}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">{gender}</td>
      <td className="px-6 py-4 text-center">{bloodGroup}</td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div>
            <p className="text-gray-800 text-md font-medium tracking-wide">
              {contactNumber}
            </p>
            <p className="text-gray-500 text-sm font-normal tracking-wide">
              {emergencyNumber}
            </p>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default UserCard;
