import React from 'react';
import { Zap, Bell, Clock, Shield, ArrowRight, CheckCircle } from 'lucide-react';

interface HomePageProps {
  onNavigateToGalxe: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigateToGalxe }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Zap className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-6">
            Alphaping
          </h1>
          <p className="text-2xl text-gray-600 mb-4">
            任务通知，快人一步
          </p>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            智能化的任务监控系统，让您永远不会错过重要的机会
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">实时通知</h3>
            <p className="text-gray-600">第一时间获取任务更新，抢占先机</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">智能调度</h3>
            <p className="text-gray-600">自定义通知时间，精准控制推送节奏</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">安全可靠</h3>
            <p className="text-gray-600">企业级安全保障，数据隐私无忧</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">简单易用</h3>
            <p className="text-gray-600">直观的界面设计，轻松上手管理</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            开始您的智能通知之旅
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            立即体验 Alphaping 的强大功能，让任务管理变得更加高效
          </p>
          <button
            onClick={onNavigateToGalxe}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 rounded-2xl text-lg font-semibold flex items-center gap-3 mx-auto transition-all duration-300 transform hover:scale-105 shadow-xl"
          >
            进入 Galxe 管理
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
            <div className="text-gray-600">系统稳定性</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">&lt;1s</div>
            <div className="text-gray-600">通知延迟</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">全天候监控</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;