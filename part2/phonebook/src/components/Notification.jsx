const Notification = ({ message }) => {
  if (message !== undefined && message !== "") {
    return <div className="error success">{message}</div>;
  }

  return null;
};

export default Notification;
