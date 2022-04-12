import React from "react";

const useEffectWithoutFirst = (func, deps) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useEffectWithoutFirst;
