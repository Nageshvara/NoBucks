
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { ArrowLeft, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

interface FormErrors {
  username?: string;
  password?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  
  const { loading: authLoading } = useAppSelector(state => state.auth);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const from = location.state?.from || '/checkout';
  
  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    dispatch(loginStart());
    
    try {

        const response = await axios.post('https://nobucks.onrender.com/api/login', {
          username: formData.username,
          password: formData.password
        });

        dispatch(loginSuccess({
          userId: response.data.userId,
          username: response.data.username
        }));
        
        toast.success('Login successful!');
        navigate(from);
        
        dispatch(loginSuccess({
          userId: formData.username,
          username: formData.username
        }));
        
        toast.success('Login successful');
        navigate(from);

    } catch (error) {
      console.error('Login error:', error);
      dispatch(loginFailure('Login failed. Please check your credentials.'));
    }
  };
  
  return (
    <div className="min-h-screen pt-20 pb-16 px-4 md:px-6">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <Button 
              variant="ghost" 
              className="pl-0" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <h1 className="text-2xl md:text-3xl font-medium mt-3">Login to Your Account</h1>
            <p className="text-gray-600 mt-2">Please log in to continue your checkout.</p>
          </div>
          
          <div className="border rounded-lg p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    className={errors.username ? 'border-red-500' : ''}
                    disabled={authLoading}
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">{errors.username}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={errors.password ? 'border-red-500' : ''}
                    disabled={authLoading}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>
                
                <Button 
                  type="submit"
                  className="w-full"
                  disabled={authLoading}
                >
                  {authLoading ? 'Logging in...' : 'Login'}
                  <Lock className="ml-2 h-4 w-4" />
                </Button>
                
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link 
                      to="/register" 
                      state={{ from }}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Register
                    </Link>
                  </p>
                  
                  <p className="text-sm text-gray-500 mt-2">
                    For demo purposes: Any username and password (min 6 chars) will work
                  </p>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;