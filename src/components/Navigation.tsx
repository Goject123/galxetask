import React, { useState } from 'react';
import { Zap, Home, Settings, User, LogOut, Menu, X, Crown, Bell } from 'lucide-react';

type Page = 'home' | 'galxe' | 'login' | 'register' | 'profile' | 'membership' | 'notifications';

interface User {
  email: string;
  plan: 'free' | 'standard' | 'premium';
  joinDate: string;
  tasksUsed: number;
  tasksLimit: number;
  expiryDate?: string; // 会员到期时间
}

interface NavigationProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  user?: User | null;
  onLogout?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, user, onLogout }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const planColors = {
    free: 'from-gray-400 to-gray-500',
    standard: 'from-blue-400 to-blue-500',
    premium: 'from-amber-400 to-amber-500',
  };

  const planNames = {
    free: '免费会员',
    standard: '标准会员',
    premium: '高级会员',
  };

  // 计算剩余天数
  const getRemainingDays = () => {
    if (!user?.expiryDate || user.plan === 'free') return null;
    const today = new Date();
    const expiry = new Date(user.expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const remainingDays = getRemainingDays();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Alphaping</h1>
              <p className="text-xs text-gray-500">智能任务管理</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                currentPage === 'home'
                  ? 'bg-blue-50 text-blue-600 font-medium'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>首页</span>
            </button>
            
            {user && (
              <button
                onClick={() => onNavigate('galxe')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === 'galxe'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Galxe 管理</span>
              </button>
            )}
            
            {user && (
              <button
                onClick={() => onNavigate('notifications')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  currentPage === 'notifications'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Bell className="w-5 h-5" />
                <span>通知设置</span>
              </button>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {/* Membership Button */}
            {user && user.plan === 'free' && (
              <button
                onClick={() => onNavigate('membership')}
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Crown className="w-4 h-4" />
                开通会员
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  <div className={`w-8 h-8 bg-gradient-to-r ${planColors[user.plan]} rounded-full flex items-center justify-center relative shadow-lg`}>
                    <span className="text-white text-sm font-medium">
                      {user.email.charAt(0).toUpperCase()}
                    </span>
                    {user.plan !== 'free' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full flex items-center justify-center">
                        <Crown className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-gray-900">{user.email}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      {planNames[user.plan]}
                      {remainingDays !== null && (
                        <span className={`ml-1 ${remainingDays <= 7 ? 'text-red-500' : 'text-gray-500'}`}>
                          · {remainingDays}天
                        </span>
                      )}
                    </div>
                  </div>
                </button>

                {/* User Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                    <button
                      onClick={() => {
                        onNavigate('profile');
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                    >
                      <User className="w-4 h-4" />
                      个人中心
                    </button>
                    {user.plan === 'free' && (
                      <button
                        onClick={() => {
                          onNavigate('membership');
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-amber-600 hover:bg-amber-50 transition-colors duration-200"
                      >
                        <Crown className="w-4 h-4" />
                        开通会员
                      </button>
                    )}
                    {user?.isAdmin && (
                      <button
                        onClick={() => {
                          onNavigate('admin');
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-left text-purple-600 hover:bg-purple-50 transition-colors duration-200"
                      >
                        <Settings className="w-4 h-4" />
                        管理员后台
                      </button>
                    )}
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={() => {
                        onLogout?.();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      退出登录
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <button
                  onClick={() => onNavigate('login')}
                  className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  登录
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  注册
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <div className="space-y-2">
              <button
                onClick={() => {
                  onNavigate('home');
                  setShowMobileMenu(false);
                }}
                className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentPage === 'home'
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Home className="w-5 h-5" />
                <span>首页</span>
              </button>
              
              {user && (
                <button
                  onClick={() => {
                    onNavigate('galxe');
                    setShowMobileMenu(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    currentPage === 'galxe'
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  <span>Galxe 管理</span>
                </button>
              )}

              {user && (
                <button
                  onClick={() => {
                    onNavigate('notifications');
                    setShowMobileMenu(false);
                  }}
                  className={`w-full flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                    currentPage === 'notifications'
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span>通知设置</span>
                </button>
              )}

              {user && user.plan === 'free' && (
                <button
                  onClick={() => {
                    onNavigate('membership');
                    setShowMobileMenu(false);
                  }}
                  className="w-full flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg transition-all duration-200"
                >
                  <Crown className="w-5 h-5" />
                  <span>开通会员</span>
                </button>
              )}

              {!user && (
                <>
                  <button
                    onClick={() => {
                      onNavigate('login');
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                  >
                    登录
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('register');
                      setShowMobileMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg transition-all duration-200"
                  >
                    注册
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close menus */}
      {(showUserMenu || showMobileMenu) && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => {
            setShowUserMenu(false);
            setShowMobileMenu(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navigation;