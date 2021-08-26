import "./closeFriends.css";
export default function CloseFriends({ closeFriend }) {
  const Public_Folder = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend">
      <img
        src={Public_Folder + closeFriend.profilePicture}
        alt=""
        className="sidebarFriendImg"
      />
      <span className="sidebarFriendName">{closeFriend.username}</span>
    </li>
  );
}
