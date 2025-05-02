"use client";
import { useState } from 'react';
import { Camera, Lock, Mail, Eye, EyeOff, CheckCircle } from 'react-feather';

// Pindahkan interface ke luar komponen
interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

interface Password {
  current: string;
  new: string;
  confirm: string;
}

interface ShowPassword {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User>({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+628123456789',
    avatar: '/default-avatar.jpg',
  });

  const [password, setPassword] = useState<Password>({
    current: '',
    new: '',
    confirm: '',
  });

  const [showPassword, setShowPassword] = useState<ShowPassword>({
    current: false,
    new: false,
    confirm: false,
  });

  const [showResetModal, setShowResetModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

    // function handleAvatarChange(event: ChangeEvent<HTMLInputElement>): void {
    //     throw new Error('Function not implemented.');
    // }

//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: ProgressEvent<FileReader>) => {
//         if (e.target && typeof e.target.result === 'string') {
//           setUser((prev) => ({ ...prev, avatar: e.target.result as string }));
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Notification */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 mr-2" />
            Profile updated successfully!
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-center">
            <div className="relative inline-block group">
              <img 
                src={user.avatar} 
                // alt="Profile" 
                className="w-32 h-32 rounded-full border-4 border-white/20 object-cover"
              />
              <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-6 h-6 text-white" />
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                //   onChange={handleAvatarChange}
                />
              </label>
            </div>
            <h1 className="mt-4 text-2xl font-bold text-white">{user.name}</h1>
          </div>

          {/* Profile Content */}
          <div className="p-8 space-y-8">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-blue-600" />
                Personal Information
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={user.phone}
                    onChange={(e) => setUser({...user, phone: e.target.value})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div> */}
              </div>
            </div>

            {/* Password Management */}
            <div>
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-blue-600" />
                Password Management
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.current ? "text" : "password"}
                      value={password.current}
                      onChange={(e) => setPassword({...password, current: e.target.value})}
                      className="w-full p-3 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => setShowPassword({...showPassword, current: !showPassword.current})}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-blue-600"
                    >
                      {showPassword.current ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.new ? "text" : "password"}
                      value={password.new}
                      onChange={(e) => setPassword({...password, new: e.target.value})}
                      className="w-full p-3 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-blue-600"
                    >
                      {showPassword.new ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword.confirm ? "text" : "password"}
                      value={password.confirm}
                      onChange={(e) => setPassword({...password, confirm: e.target.value})}
                      className="w-full p-3 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-blue-600"
                    >
                      {showPassword.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setShowResetModal(true)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Forgot Password?
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 border-t">
              <button
                onClick={() => setShowSuccess(true)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* Reset Password Modal */}
        {showResetModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">Reset Password</h3>
              <p className="text-gray-600 mb-4">
                Enter your email address to receive password reset instructions
              </p>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-3 border rounded-lg mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowResetModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Send Instructions
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}