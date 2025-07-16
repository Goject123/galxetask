import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './components/HomePage';
import TaskManager from './components/TaskManager';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import MembershipPage from './components/MembershipPage';
import UserProfile from './components/UserProfile';
import BarkTutorial from './components/BarkTutorial';
import AdminDashboard from './components/AdminDashboard';
import NotificationSettings from './components/NotificationSettings';

type Page = 'home' | 'galxe' | 'login' | 'register' | 'profile' | 'membership' | 'notifications' | 'admin';

interface User {
  email: string;
  plan: 'free' | 'standard' | 'premium' | 'ultimate';
  joinDate: string;
  tasksUsed: number;
  tasksLimit: number;
  expiryDate?: string;
  isAdmin?: boolean;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [showBarkTutorial, setShowBarkTutorial] = useState(false);
  const [showMembershipModal, setShowMembershipModal] = useState(false);

  const handleLogin = (email: string) => {
    // 模拟登录
    const newUser: User = {
      email,
      plan: 'free',
      joinDate: '2024-01-15',
      tasksUsed: 3,
      tasksLimit: 10,
      isAdmin: email === 'admin@alphaping.com', // 管理员账户
    };
    setUser(newUser);
    setCurrentPage('home');
  };

  const handleRegister = (email: string) => {
    // 模拟注册 - 默认为免费会员
    const newUser: User = {
      email,
      plan: 'free',
      joinDate: new Date().toISOString().split('T')[0],
      tasksUsed: 0,
      tasksLimit: 10,
      isAdmin: false,
    };

    setUser(newUser);
    setCurrentPage('home');
  };

  const handleSelectPlan = (plan: 'free' | 'standard' | 'premium', duration: '1' | '3' | '12') => {
    if (!user) return;

    const taskLimits = { free: 10, standard: 50, premium: 200, ultimate: 999999 };
    const updatedUser = {
      ...user,
      plan,
      tasksLimit: taskLimits[plan],
    };

    // 如果是付费会员，设置到期时间
    if (plan !== 'free') {
      const expiryDate = new Date();
      const months = parseInt(duration);
      expiryDate.setMonth(expiryDate.getMonth() + months);
      updatedUser.expiryDate = expiryDate.toISOString().split('T')[0];
    } else {
      delete updatedUser.expiryDate;
    }

    setUser(updatedUser);
    setShowMembershipModal(false);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleNavigate = (page: Page) => {
    // 如果会员弹窗打开，先关闭弹窗再导航
    if (showMembershipModal) {
      setShowMembershipModal(false);
    }
    
    if ((page === 'galxe' || page === 'admin' || page === 'notifications') && !user) {
      setCurrentPage('login');
      return;
    }
    if (page === 'admin' && !user?.isAdmin) {
      return; // 非管理员无法访问
    }
    if (page === 'membership') {
      setShowMembershipModal(true);
      return;
    }
    setCurrentPage(page);
  };

  // 如果用户未登录且访问需要登录的页面
  if (!user && (currentPage === 'galxe' || currentPage === 'profile' || currentPage === 'admin' || currentPage === 'notifications')) {
    return (
      <LoginPage 
        onLogin={handleLogin}
        onNavigateToRegister={() => setCurrentPage('register')}
      />
    );
  }

  if (currentPage === 'login') {
    return (
      <LoginPage 
        onLogin={handleLogin}
        onNavigateToRegister={() => setCurrentPage('register')}
      />
    );
  }

  if (currentPage === 'register') {
    return (
      <RegisterPage 
        onRegister={handleRegister}
        onNavigateToLogin={() => setCurrentPage('login')}
      />
    );
  }


  if (currentPage === 'profile' && user) {
    return (
      <div className="min-h-screen">
        <Navigation 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          user={user}
          onLogout={handleLogout}
        />
        <UserProfile user={user} onLogout={handleLogout} />
        <UserProfile user={user} onLogout={handleLogout} onOpenMembership={() => setShowMembershipModal(true)} />
      </div>
    );
  }

  if (currentPage === 'notifications' && user) {
    return (
      <div className="min-h-screen">
        <Navigation 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          user={user}
          onLogout={handleLogout}
        />
        <NotificationSettings />
      </div>
    );
  }

  if (currentPage === 'admin' && user?.isAdmin) {
    return (
      <div className="min-h-screen">
        <Navigation 
          currentPage={currentPage} 
          onNavigate={handleNavigate}
          user={user}
          onLogout={handleLogout}
        />
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {showBarkTutorial && (
        <BarkTutorial onClose={() => setShowBarkTutorial(false)} />
      )}
      {showMembershipModal && (
        <MembershipPage 
          onSelectPlan={handleSelectPlan}
          onClose={() => setShowMembershipModal(false)}
          isOpen={showMembershipModal}
        />
      )}
      <Navigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
        user={user}
        onLogout={handleLogout}
      />
      {currentPage === 'home' ? (
        <HomePage onNavigateToGalxe={() => handleNavigate('galxe')} />
      ) : (
        <TaskManager />
      )}
    </div>
  );
}

export default App;