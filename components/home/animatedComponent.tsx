import { useState } from "react";
import { useSpring, animated } from "react-spring";

const AnimatedComponent = () => {
  const [hovered, setHovered] = useState(false);

  const styles = useSpring({
    from: { opacity: 0, height: "0px" },
    to: {
      opacity: hovered ? 1 : 0,
      height: hovered ? "50px" : "0px",
      backgroundColor: hovered ? "white" : "transparent",
    },
  });

  return (
    <animated.div
      className="bg-zinc-600 bg-opacity-30 px-2 py-2 w-1/5 h-[18rem] flex flex-row gap-3 border-2 border-green-600 border-opacity-30"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ marginBottom: hovered ? "50px" : "0px" }}
    >
      <div className="h-full w-full bg-no-repeat bg-cover bg-[url('/images/vpn.webp')]">
        <animated.div
          className="bg-black w-full h-full lg:bg-opacity-30 cursor-pointer hover:bg-opacity-70"
          style={styles}
        >
          TEST
        </animated.div>
      </div>
    </animated.div>
  );
};

export default AnimatedComponent;