import Image from "next/image";

export type UserProps = {
  id: number;
  name: string;
  email: string;
  image?: string;
};

const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1, e2, e3) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r, g, b) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

const User: React.FC<{ user: UserProps }> = ({ user }) => {
  return (
    <div className="profile">
      {user.image && (
        <Image
          src={user.image}
          width={120}
          height={120}
          alt={user.name}
          placeholder="blur"
          blurDataURL={rgbDataURL(164, 164, 164)}
          className="avatar"
        />
      )}
      <h3>{user.name}</h3>
      <small>{user.email}</small>
    </div>
  );
};

export default User;
