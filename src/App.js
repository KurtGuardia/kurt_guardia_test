import React from "react";
import {
  NotificationContainer,
  NotificationManager
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import OnlineStatusMock from "./OnlineStatusMock";
import "./App.css";
import useEffectWithoutFirst from "./useEffectWithoutFirst";
import { default as _ } from "lodash";

const App = () => {
  const [isOnline, setIsOnline] = React.useState(false);
  const prevOnlineRef = React.useRef(false);

  const debouncedNotify = React.useCallback(
    _.debounce((isOnline, prevOnlineRef) => {
      if (isOnline !== prevOnlineRef.current) {
        NotificationManager.info(isOnline ? "Online" : "Offline");
        prevOnlineRef.current = isOnline;
      }
    }, 2000),
    []
  );

  useEffectWithoutFirst(() => {
    debouncedNotify(isOnline, prevOnlineRef);
  }, [isOnline]);

  return (
    <>
      <OnlineStatusMock
        onIsOnlineChange={(isOnline) => setIsOnline(isOnline)}
        className="status"
      />
      <div className={isOnline ? "online" : "offline"}>
        {isOnline ? "Online" : "Offline"}
        <NotificationContainer />
      </div>
    </>
  );
};

export default App;
