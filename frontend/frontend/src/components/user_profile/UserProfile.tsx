import axios from "axios";

const get_user_data = () => {
  const url: string = "http://127.0.0.1:8000/api/test/";
  const token =
    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMwNjgwODk1LCJqdGkiOiJmYTZjYTViZDQ0ZGI0NTBiYTY5NjIxY2UwYzVjZjYyOSIsInVzZXJfaWQiOjF9.WuOjZlMqABBXmm4Tt-qXdOVITlxm61p-hy0ZfedcWiE";
  const config = {
    headers: { Authorization: token },
  };
  axios
    .get(url, config)
    .then((response) => console.log(response.data))
    .catch(() => console.log("Fetch failed"));
};

const UserProfile = () => {
  return (
    <div>
      <h3>User Profile</h3>
      <div>
        <div></div>
        <button type="button" onClick={() => get_user_data()}>
          Get
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
