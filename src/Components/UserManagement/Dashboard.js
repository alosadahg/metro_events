import { useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Context/LoginContext";

const Dashboard = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useContext(UserContext);

  console.log(userData);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
