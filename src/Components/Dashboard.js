import { useParams } from 'react-router-dom';

const Dashboard = () => {
    const { userId } = useParams();

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;