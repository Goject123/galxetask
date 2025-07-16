import React, { useState } from 'react';
import { User, Mail, Calendar, Crown, Settings, Bell, Shield, CreditCard, LogOut, Clock } from 'lucide-react';

interface UserProfileProps {
  user: {
    email: string;
    plan: 'free' | 'standard' | 'premium';
    joinDate: string;
    tasksUsed: number;
    tasksLimit: number;
    expiryDate?: string;
  };
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'settings'>('profile');

  const planInfo = {
    free: { name: '免费会员', color: 'text-gray-600', bgColor: 'bg-gray-100' },
    standard: { name: '标准会员', color: 'text-blue-600', bgColor: 'bg-blue-100' },
    premium: { name: '高级会员', color: 'text-amber-600', bgColor: 'bg-amber-100' },
  };

  const usagePercentage = (user.tasksUsed / user.tasksLimit) * 100;

  // 计算剩余天数
  const getRemainingDays = () => {
    if (!user.expiryDate || user.plan === 'free') return null;
    const today = new Date();
    const expiry = new Date(user.expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const remainingDays = getRemainingDays();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            用户中心
          </h1>
          <p className="text-gray-600 text-lg">
            管理您的账户信息和订阅设置
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              {/* User Avatar */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <span className="text-white text-2xl font-medium">
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                  {user.plan !== 'free' && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center">
                      <Crown className="w-3.5 h-3.5 text-white" />
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{user.email}</h3>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${planInfo[user.plan].bgColor} ${planInfo[user.plan].color} mt-2`}>
                  <Crown className="w-4 h-4 mr-1" />
                  {planInfo[user.plan].name}
                </div>
                {remainingDays !== null && (
                  <div className={`mt-2 text-sm ${remainingDays <= 7 ? 'text-red-600' : 'text-gray-600'}`}>
                    <Clock className="w-4 h-4 inline mr-1" />
                    剩余 {remainingDays} 天
                  </div>
                )}
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: 'profile', label: '个人资料', icon: User },
                  { id: 'subscription', label: '订阅管理', icon: CreditCard },
                  { id: 'settings', label: '兑换码', icon: Settings },
                ].map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-600 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 mt-6"
              >
                <LogOut className="w-5 h-5" />
                退出登录
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Info */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">个人资料</h2>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        邮箱地址
                      </label>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{user.email}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        注册时间
                      </label>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Calendar className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{user.joinDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Usage Statistics */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">使用统计</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">任务监控使用量</span>
                        <span className="text-sm text-gray-500">{user.tasksUsed} / {user.tasksLimit}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full transition-all duration-300 ${
                            usagePercentage > 80 ? 'bg-red-500' : usagePercentage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {usagePercentage > 80 ? '使用量较高，建议升级套餐' : '使用量正常'}
                      </p>
                    </div>

                    {/* Membership Status */}
                    {user.plan !== 'free' && remainingDays !== null && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">会员状态</h3>
                            <p className="text-gray-600">
                              您的{planInfo[user.plan].name}将在 {remainingDays} 天后到期
                            </p>
                          </div>
                          <div className={`w-16 h-16 bg-gradient-to-r ${user.plan === 'standard' ? 'from-blue-400 to-blue-500' : 'from-amber-400 to-amber-500'} rounded-full flex items-center justify-center`}>
                            <Crown className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        {remainingDays <= 7 && (
                          <div className="mt-4 p-3 bg-red-50 rounded-lg">
                            <p className="text-red-700 text-sm">
                              ⚠️ 您的会员即将到期，请及时续费以继续享受会员服务
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'subscription' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">订阅管理</h2>
                
                <div className="space-y-6">
                  {/* Current Plan */}
                  <div className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">当前套餐</h3>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${planInfo[user.plan].bgColor} ${planInfo[user.plan].color}`}>
                        {planInfo[user.plan].name}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{user.tasksLimit}</div>
                        <div className="text-sm text-gray-600">监控任务数</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">{user.tasksUsed}</div>
                        <div className="text-sm text-gray-600">已使用</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{user.tasksLimit - user.tasksUsed}</div>
                        <div className="text-sm text-gray-600">剩余可用</div>
                      </div>
                    </div>

                    {/* Expiry Info */}
                    {remainingDays !== null && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">到期时间</span>
                          <span className={`text-sm font-medium ${remainingDays <= 7 ? 'text-red-600' : 'text-gray-900'}`}>
                            {user.expiryDate} ({remainingDays} 天后)
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Upgrade Options */}
                  {user.plan !== 'premium' && (
                    <div className="border border-blue-200 rounded-xl p-6 bg-blue-50">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">升级套餐</h3>
                      <p className="text-gray-600 mb-4">
                        升级到更高级的套餐，享受更多监控任务和高级功能
                      </p>
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
                        立即升级
                      </button>
                    </div>
                  )}

                  {/* Renewal Options */}
                  {user.plan !== 'free' && remainingDays !== null && remainingDays <= 30 && (
                    <div className="border border-green-200 rounded-xl p-6 bg-green-50">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">续费服务</h3>
                      <p className="text-gray-600 mb-4">
                        您的会员即将到期，续费可继续享受所有会员权益
                      </p>
                      <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
                        立即续费
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">兑换码</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      会员兑换码
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="输入兑换码..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
                        兑换
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      输入有效的兑换码可获得相应的会员权益
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">兑换码</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      会员兑换码
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="输入兑换码..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      />
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
                        兑换
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      输入有效的兑换码可获得相应的会员权益
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;