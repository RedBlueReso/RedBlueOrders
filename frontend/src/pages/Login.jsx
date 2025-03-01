import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useMutation } from '@apollo/client';
import { LOGIN_CUSTOMER } from '../graphql/mutation/customer.mutation';

const Login = () => {
  const {tn} = useParams();
  
  const isAdmin = tn==='admin'?true:false
  const [formData, setFormData] = useState(
    isAdmin 
      ? { email: '', password: '' }
      : { username: '', phoneNumber: '' }
  );
  const navigate = useNavigate();
  const [login, { loading: loginLoading }] = useMutation(LOGIN_CUSTOMER, {
    onCompleted: (data) => {
      toast.success('Login successful');
      
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    refetchQueries: ['authCustomer'],
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    // navigate('/')
    console.log(formData)
    const data = await login({
      variables : {
        input : {
          ...formData,
          tableNumber : tn
          
        }
      }
      
    })
    
    console.log('Login data:', data);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isAdmin ?"LOGIN":"Enter Details"}
        </h2>
        
        

        <form onSubmit={handleSubmit} className="space-y-4">
          {isAdmin ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full p-2 rounded-md  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  required
                  className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="username"
                  required
                  className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  required
                  maxLength="10"
                  pattern="[0-9]{10}"
                  className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
              </div>
            </>
          )}
          
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            {isAdmin ? "Login":"Enter"}
          </button>
        </form>

        {isAdmin && (
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-500 hover:text-blue-600">
              Sign up
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};
export default Login;