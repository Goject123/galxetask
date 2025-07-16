import React, { useState } from 'react';
import { Users, Crown, TrendingUp, DollarSign, Eye, Calendar, BarChart3, Activity } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'today' | '7days' | '30days'>('7days');

  // 模拟数据
  const stats = {
    users: {
      total: 1247,
      free: 892,
      standard: 267,
      premium: 88,
      ultimate: 0, // 隐藏会员
      newToday: 23,
      newWeek: 156,
    },
    revenue: {
      today: 2890,
      week: 18650,
      month: 67420,
    },
    traffic: {
      todayVisitors: 1456,
      todayPageviews: 4823,
      weekVisitors: 8934,
      weekPageviews: 28456,
    },
    spaces: [
      { name: 'BNB Chain', users: 234, growth: '+12%' },
      { name: 'Polygon', users: 189, growth: '+8%' },
      { name: 'Arbitrum', users: 156, growth: '+15%' },
      { name: 'Optimism', users: 134, growth: '+6%' },
      { name: 'Base', users: 98, growth: '+22%' },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            管理员控制台
          </h1>
          <p className="text-gray-600 text-lg">
            系统运营数据总览
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">数据概览</h2>
            <div className="flex gap-2">
              {[
                { value: 'today', label: '今天' },
                { value: '7days', label: '7天' },
                { value: '30days', label: '30天' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setTimeRange(option.value as any)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                    timeRange === option.value
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">总用户数</p>
                <p className="text-2xl font-bold text-gray-900">{stats.users.total.toLocaleString()}</p>
                <p className="text-sm text-green-600">今日新增 +{stats.users.newToday}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {timeRange === 'today' ? '今日收入' : timeRange === '7days' ? '7日收入' : '30日收入'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ¥{(timeRange === 'today' ? stats.revenue.today : 
                      timeRange === '7days' ? stats.revenue.week : 
                      stats.revenue.month).toLocaleString()}
                </p>
                <p className="text-sm text-green-600">较上期 +15.2%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Visitors */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {timeRange === 'today' ? '今日访客' : '7日访客'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {(timeRange === 'today' ? stats.traffic.todayVisitors : stats.traffic.weekVisitors).toLocaleString()}
                </p>
                <p className="text-sm text-blue-600">
                  浏览量 {(timeRange === 'today' ? stats.traffic.todayPageviews : stats.traffic.weekPageviews).toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Growth */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">用户增长</p>
                <p className="text-2xl font-bold text-gray-900">+{stats.users.newWeek}</p>
                <p className="text-sm text-green-600">本周新增</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Member Distribution */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Crown className="w-6 h-6" />
              会员分布
            </h3>
            <div className="space-y-4">
              {[
                { type: '免费会员', count: stats.users.free, color: 'bg-gray-500', percentage: (stats.users.free / stats.users.total * 100).toFixed(1) },
                { type: '标准会员', count: stats.users.standard, color: 'bg-blue-500', percentage: (stats.users.standard / stats.users.total * 100).toFixed(1) },
                { type: '高级会员', count: stats.users.premium, color: 'bg-amber-500', percentage: (stats.users.premium / stats.users.total * 100).toFixed(1) },
                { type: '终极会员', count: stats.users.ultimate, color: 'bg-purple-500', percentage: (stats.users.ultimate / stats.users.total * 100).toFixed(1) },
              ].map((member) => (
                <div key={member.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 ${member.color} rounded-full`}></div>
                    <span className="text-gray-700">{member.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{member.count.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">{member.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Spaces */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              热门空间
            </h3>
            <div className="space-y-4">
              {stats.spaces.map((space, index) => (
                <div key={space.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 font-medium">{space.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{space.users} 用户</div>
                    <div className="text-sm text-green-600">{space.growth}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-6 h-6" />
            最近活动
          </h3>
          <div className="space-y-4">
            {[
              { time: '2分钟前', action: '用户 user@example.com 开通了标准会员', type: 'membership' },
              { time: '5分钟前', action: '新用户注册：newuser@gmail.com', type: 'register' },
              { time: '8分钟前', action: 'BNB Chain 空间新增 3 个监控任务', type: 'task' },
              { time: '12分钟前', action: '用户 premium@example.com 升级到高级会员', type: 'upgrade' },
              { time: '15分钟前', action: '系统发送了 156 条通知', type: 'notification' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'membership' ? 'bg-blue-500' :
                  activity.type === 'register' ? 'bg-green-500' :
                  activity.type === 'task' ? 'bg-purple-500' :
                  activity.type === 'upgrade' ? 'bg-amber-500' :
                  'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;