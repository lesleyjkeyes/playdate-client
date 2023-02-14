import { Button } from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import DogCard from '../components/DogCard';

function Home() {
  const { user } = useAuth();
  return (
    <div>
      <DogCard />
      <h1>Hello {user.fbUser.displayName}! </h1>
      <p>Click the button below to logout!</p>
      <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
