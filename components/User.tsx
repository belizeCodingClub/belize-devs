import ProfilePic from "./ProfilePic";

export type UserProps = {
  id: number;
  name: string;
  email: string;
  image?: string;
  about?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  contactNumber?: string;
};

const User: React.FC<{ user: UserProps }> = ({ user }) => {
  return (
    <div className="profile">
      {user.image && <ProfilePic image={user.image} />}
      <h3>{user.name}</h3>
    </div>
  );
};

export default User;
