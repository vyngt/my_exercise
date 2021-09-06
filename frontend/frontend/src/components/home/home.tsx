import React from "react";

const Home: React.FC<{}> = () => {
  React.useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <div>
      <h3>Home</h3>
      <p>This is home</p>
    </div>
  );
};

export default Home;
