import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

interface UserProfile {
  fullName: string;
  email: string;
  role: string;
  avatarInitial: string;
}

const Profile: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme(); // Use global theme
  const [activeTab, setActiveTab] = useState<'performance' | 'settings'>('performance');
  
  const [metrics] = useState({
    repScore: 98.4,
    totalSolves: 1204,
    successRate: 99.1,
  });

  const [integrations] = useState([
    { id: 1, project: "PROJECT DELTA", title: "Core Routing Optimization", verified: true },
    { id: 2, project: "NEXUS NODE", title: "Load Balancing Framework", verified: true },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<string>('');

  // User profile state with localStorage persistence
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    return {
      fullName: 'Alex Nodus',
      email: 'alex@nodus.com',
      role: 'Technical Architect',
      avatarInitial: 'A'
    };
  });

  // Form states for Profile Information
  const [fullName, setFullName] = useState(userProfile.fullName);
  const [email, setEmail] = useState(userProfile.email);
  const [role, setRole] = useState(userProfile.role);

  // Notification preferences states with localStorage persistence
  const [emailNotifications, setEmailNotifications] = useState(() => {
    const saved = localStorage.getItem('emailNotifications');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const [pushNotifications, setPushNotifications] = useState(() => {
    const saved = localStorage.getItem('pushNotifications');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const [weeklyDigest, setWeeklyDigest] = useState(() => {
    const saved = localStorage.getItem('weeklyDigest');
    return saved !== null ? JSON.parse(saved) : false;
  });

  const navigate = useNavigate();

  // Save user profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  // Save notification preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('emailNotifications', JSON.stringify(emailNotifications));
  }, [emailNotifications]);

  useEffect(() => {
    localStorage.setItem('pushNotifications', JSON.stringify(pushNotifications));
  }, [pushNotifications]);

  useEffect(() => {
    localStorage.setItem('weeklyDigest', JSON.stringify(weeklyDigest));
  }, [weeklyDigest]);

  // Save profile information and update sidebar
  const saveProfileInfo = () => {
    if (!fullName.trim()) {
      alert('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    if (!role.trim()) {
      alert('Please enter your role');
      return;
    }

    const avatarInitial = fullName.trim().charAt(0).toUpperCase();
    
    setUserProfile({
      fullName: fullName.trim(),
      email: email.trim(),
      role: role.trim(),
      avatarInitial: avatarInitial
    });

    console.log('Profile saved:', { fullName, email, role });
    alert('Profile information saved successfully!');
    closeModal();
  };

  // Save notification preferences
  const saveNotificationPreferences = () => {
    console.log('Notification preferences saved:', { emailNotifications, pushNotifications, weeklyDigest });
    alert('Notification preferences saved successfully!');
    closeModal();
  };

  const handleSettingClick = (title: string) => {
    if (title === 'Profile Information') {
      setFullName(userProfile.fullName);
      setEmail(userProfile.email);
      setRole(userProfile.role);
    }
    setModalType(title);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType('');
  };

  const goToMarketplace = () => navigate('/marketplace');
  const goToNetwork = () => navigate('/network');

  // Render modal content based on modalType
  const renderModalContent = () => {
    switch(modalType) {
      case "Profile Information":
        return (
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Update your personal and professional details.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  placeholder="Enter your full name"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                <input 
                  type="text" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-700 rounded-xl bg-white dark:bg-zinc-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent" 
                  placeholder="Enter your role"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={closeModal}
                className="px-6 py-2 border border-gray-300 dark:border-zinc-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveProfileInfo}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        );
      
      case "Notification Preferences":
        return (
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Manage how you receive updates from the network.
            </p>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" 
                />
                <span className="text-gray-700 dark:text-gray-300">Email notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" 
                />
                <span className="text-gray-700 dark:text-gray-300">Push notifications</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={weeklyDigest}
                  onChange={(e) => setWeeklyDigest(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500" 
                />
                <span className="text-gray-700 dark:text-gray-300">Weekly digest</span>
              </label>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={closeModal}
                className="px-6 py-2 border border-gray-300 dark:border-zinc-700 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={saveNotificationPreferences}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        );
      
      case "Appearance":
        return (
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Click the button below to switch between Light and Dark mode for the entire application.
            </p>
            <button
              onClick={toggleTheme}
              className="w-full py-4 bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-2xl font-medium mb-8 flex items-center justify-center gap-2 transition-colors"
            >
              {isDarkMode ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
            </button>
          </div>
        );
      
      case "Security":
        return (
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Password, 2FA, and session management.
            </p>
            <div className="space-y-4">
              <button 
                onClick={() => alert('Password change functionality would be implemented here')}
                className="w-full py-3 border border-indigo-600 text-indigo-600 rounded-xl font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
              >
                Change Password
              </button>
              <button 
                onClick={() => alert('2FA setup would be implemented here')}
                className="w-full py-3 border border-indigo-600 text-indigo-600 rounded-xl font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950 transition-colors"
              >
                Enable Two-Factor Authentication
              </button>
              <button 
                onClick={() => alert('Logging out all devices...')}
                className="w-full py-3 border border-red-600 text-red-600 rounded-xl font-medium hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
              >
                Log Out All Devices
              </button>
            </div>
          </div>
        );
      
      case "Integration Settings":
        return (
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Manage connected nodes and API access.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-zinc-800 rounded-xl">
                <div>
                  <div className="font-medium">API Key</div>
                  <div className="text-sm text-gray-500">••••••••••••••••</div>
                </div>
                <button 
                  onClick={() => alert('API key regenerated!')}
                  className="text-indigo-600 text-sm hover:text-indigo-700 transition-colors"
                >
                  Regenerate
                </button>
              </div>
              <button 
                onClick={() => alert('Add new integration form would open here')}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                Add New Integration
              </button>
            </div>
          </div>
        );
      
      case "Billing & Subscription":
        return (
          <div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Current plan and payment methods.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-indigo-50 dark:bg-indigo-950 rounded-xl">
                <div className="font-semibold">Pro Plan</div>
                <div className="text-2xl font-bold">$29<span className="text-sm font-normal">/month</span></div>
              </div>
              <button 
                onClick={() => alert('Upgrade plan options would be shown here')}
                className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
              >
                Upgrade Plan
              </button>
              <button 
                onClick={() => alert('Payment method update form would open here')}
                className="w-full py-3 border border-gray-300 dark:border-zinc-700 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
              >
                Update Payment Method
              </button>
            </div>
          </div>
        );
      
      default:
        return (
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            This section will allow you to manage {modalType.toLowerCase()}.
          </p>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-zinc-950 font-sans overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 flex flex-col">
        <div className="p-6">
          <div className="text-3xl font-bold tracking-tighter text-indigo-600">NODUS</div>

          <div className="flex items-center gap-4 my-10">
            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-2xl font-semibold">
              {userProfile.avatarInitial}
            </div>
            <div>
              <div className="font-semibold text-lg text-gray-900 dark:text-white">{userProfile.fullName}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{userProfile.role}</div>
            </div>
          </div>

          <nav className="space-y-2">
            <div
              onClick={() => setActiveTab('performance')}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl cursor-pointer transition-all ${
                activeTab === 'performance' ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700' : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              📊 Performance
            </div>
            <div
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl cursor-pointer transition-all ${
                activeTab === 'settings' ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700' : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              ⚙️ Settings
            </div>
          </nav>
        </div>

        <div className="mt-auto p-6">
          <button 
            onClick={() => handleSettingClick("Billing & Subscription")}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold py-3.5 rounded-2xl hover:shadow-lg transition-all"
          >
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 px-8 py-5 flex items-center justify-between">
          <div className="flex gap-8 text-sm font-medium">
            <button onClick={goToMarketplace} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Marketplace</button>
            <button onClick={goToNetwork} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Network</button>
            <span className="text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1">Portfolio</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-80">
              <input
                type="text"
                placeholder="Search projects or metrics..."
                className="w-full bg-gray-100 dark:bg-zinc-800 pl-11 py-3 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
              <span className="absolute left-4 top-3.5 text-gray-400">🔍</span>
            </div>
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Support</button>
            <button className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">Log Out</button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto p-10">
          {activeTab === 'performance' && (
            <>
              <div className="mb-10">
                <h1 className="text-4xl font-semibold text-gray-900 dark:text-white">Performance Metrics</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-xl">
                  An overview of your structural impact within the NODUS network. 
                  Tracking solves, success rates, and overall reputation scoring.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800">
                  <div className="uppercase text-xs tracking-widest text-gray-500 mb-2">REPSCORE</div>
                  <div className="text-7xl font-bold text-indigo-600">{metrics.repScore}</div>
                  <div className="h-28 flex items-end gap-2 mt-8">
                    {[35,48,62,75,82,88,95].map((h,i) => (
                      <div key={i} className="flex-1 bg-indigo-200 dark:bg-indigo-950 rounded-t" style={{height: `${h}%`}} />
                    ))}
                    <div className="flex-1 bg-indigo-600 rounded-t" style={{height: '100%'}} />
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800">
                  <div className="uppercase text-xs tracking-widest text-gray-500 mb-2">TOTAL SOLVES</div>
                  <div className="text-7xl font-bold text-gray-900 dark:text-white">{metrics.totalSolves.toLocaleString()}</div>
                  <p className="text-gray-600 dark:text-gray-400 mt-4">Verified solutions integrated across the global architecture.</p>
                </div>

                <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800">
                  <div className="uppercase text-xs tracking-widest text-gray-500 mb-2">SUCCESS RATE</div>
                  <div className="text-7xl font-bold text-gray-900 dark:text-white">
                    {metrics.successRate}<span className="text-3xl text-gray-400">%</span>
                  </div>
                  <div className="inline-block bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400 px-5 py-1.5 rounded-2xl text-sm mt-4">
                    Top 1% bracket
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800">
                <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Recent Integrations</h2>
                <div className="divide-y divide-gray-100 dark:divide-zinc-800">
                  {integrations.map(item => (
                    <div key={item.id} className="flex justify-between items-center py-6">
                      <div>
                        <div className="text-xs uppercase tracking-widest text-gray-500">{item.project}</div>
                        <div className="font-semibold text-lg mt-1 text-gray-900 dark:text-white">{item.title}</div>
                      </div>
                      <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-400 px-6 py-2 rounded-2xl text-sm font-medium">
                        Verified
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
            <div>
              <h1 className="text-4xl font-semibold text-gray-900 dark:text-white mb-10">Settings</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Profile Information", desc: "Update your personal and professional details" },
                  { title: "Notification Preferences", desc: "Manage how you receive updates from the network" },
                  { title: "Security", desc: "Password, 2FA, and session management" },
                  { title: "Integration Settings", desc: "Manage connected nodes and API access" },
                  { title: "Billing & Subscription", desc: "Current plan and payment methods" },
                  { title: "Appearance", desc: "Change between Light and Dark theme" },
                ].map((setting, i) => (
                  <div key={i} className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-gray-100 dark:border-zinc-800 hover:shadow-md transition-all">
                    <h3 className="font-semibold text-xl mb-3 text-gray-900 dark:text-white">{setting.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">{setting.desc}</p>
                    <button 
                      onClick={() => handleSettingClick(setting.title)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-medium transition-colors"
                    >
                      {setting.title === "Appearance" ? (isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode") : "Manage"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={closeModal}>
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{modalType}</h2>
              <button onClick={closeModal} className="text-3xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">×</button>
            </div>

            {renderModalContent()}

            {!['Profile Information', 'Notification Preferences'].includes(modalType) && modalType !== "Appearance" && (
              <div className="flex justify-end mt-6">
                <button 
                  onClick={closeModal}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
