import { useEffect, useState } from 'react';
import api from './api/api';
import './App.css';
import { Notification } from './components/Notification/Notification';
import { REQUEST_STATUS } from './defaults/requestStatus.defaults';

const REQUESTS_FOR = {

}
function App() {

  // lista de notifications

  const [postsRequestStatus, setPostsRequestStatus] = useState({ status: REQUEST_STATUS.NULL, message: "" });
  const [usersRequestStatus, setUsersRequestStatus] = useState({ status: REQUEST_STATUS.NULL, message: "" });

  useEffect(() => {
    (async () => {
      const responsePosts = await api.get("/api/post", { setRequestStatus: setPostsRequestStatus, requestFor: "Posturile" });
      const responseUsers = await api.get("/api/auth/users/Suceava/Suceava", { requestFor: "Utilizatorii " });
    })()
  }, [])

  return (
    <div className="App">
      {/* {notification.map()} */}
      <Notification message={postsRequestStatus.message} />
      <Notification message={usersRequestStatus.message} />
    </div>
  );
}



export default App;
