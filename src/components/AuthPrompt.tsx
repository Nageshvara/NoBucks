
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Lock, UserPlus } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '../components/ui/card';

const AuthPrompt = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <h2 className="text-lg font-medium">Account Required</h2>
        <p className="text-gray-600 text-sm">
          Please login or create an account to complete your purchase.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-2">
        <Button 
          className="w-full"
          onClick={() => navigate('/login', { state: { from: '/checkout' } })}
        >
          Login to Existing Account
          <Lock className="ml-2 h-4 w-4" />
        </Button>
        
        <Button 
          variant="outline"
          className="w-full"
          onClick={() => navigate('/register', { state: { from: '/checkout' } })}
        >
          Create New Account
          <UserPlus className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-center">
        <p className="text-sm text-gray-500">
          For demo purposes: Any username and password (min 6 chars) will work
        </p>
      </CardFooter>
    </Card>
  );
};

export default AuthPrompt;