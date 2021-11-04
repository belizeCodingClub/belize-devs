export type UserProps = {
  id: number;
  name: string;
  email: string;
};

const User: React.FC<{ user: UserProps }> = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <small>By {user.email}</small>
    </div>
  );
};

export default User;
