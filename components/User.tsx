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
  headline?: string;
};

const User: React.FC<{ user: UserProps }> = ({ user }) => {
  return (
    <div className="profile">
      {user.image && (
        <div style={{ marginBottom: 20 }}>
          <ProfilePic image={user.image} />
        </div>
      )}
      <h3 style={{ margin: 0 }}>{user.name}</h3>
      <p style={{ fontSize: 16, margin: 0 }}>{user.headline}</p>
    </div>
  );
};

export default User;
