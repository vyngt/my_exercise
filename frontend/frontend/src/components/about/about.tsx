import React from "react";

const About = () => {
  React.useEffect(() => {
    document.title = "About";
  }, []);

  return (
    <div>
      <h3>About</h3>
      <p>This is About.</p>
    </div>
  );
};

export default About;
