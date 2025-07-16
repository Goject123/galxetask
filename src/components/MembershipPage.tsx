import React, { useState } from 'react';
import { Zap, Check, Crown, Star, X } from 'lucide-react';

interface MembershipPageProps {
  onSelectPlan: (plan: 'free' | 'standard' | 'premium', duration: '1' | '3' | '12') => void;
  onClose: () => void;
  isOpen: boolean;
}

const MembershipPage: React.FC<MembershipPageProps> = ({ onSelectPlan, onClose, isOpen }) => {
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'standard' | 'premium'>('standard');
  const [selectedDuration, setSelectedDuration] = useState<'1' | '3' | '12'>('1');

  const plans = [
    {
      id: 'free' as const,
      name: '免费会员',
      price: '¥0',
      duration: '永久',
      monitors: 10,
      features: ['监控 10 个任务', '基础通知功能', '邮件支持'],
      icon: Star,
      color: 'from-gray-500 to-gray-600',
      popular: false,
    },
    {
      id: 'standard' as const,
      name: '标准会员',
      price: selectedDuration === '1' ? '¥29' : selectedDuration === '3' ? '¥79' : '¥299',
      duration: selectedDuration === '1' ? '1个月' : selectedDuration === '3' ? '3个月' : '12个月',
      monitors: 50,
      features: ['监控 50 个任务', '高级通知功能', '优先邮件支持', '数据统计'],
      icon: Star,
      color: 'from-blue-500 to-purple-500',
      popular: true,
    },
    {
      id: 'premium' as const,
      name: '高级会员',
      price: selectedDuration === '1' ? '¥99' : selectedDuration === '3' ? '¥279' : '¥999',
      duration: selectedDuration === '1' ? '1个月' : selectedDuration === '3' ? '3个月' : '12个月',
      monitors: 200,
      features: ['监控 200 个任务', '全功能通知', '24/7 专属支持', '高级数据分析', 'API 访问'],
      icon: Crown,
      color: 'from-amber-500 to-orange-500',
      popular: false,
    },
  ];

  const handleSelectPlan = () => {
    onSelectPlan(selectedPlan, selectedDuration);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">加入 Alphaping</h1>
              <p className="text-gray-600">选择适合您的会员计划，开始智能任务监控之旅</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Duration Selector for Paid Plans */}
          {(selectedPlan === 'standard' || selectedPlan === 'premium') && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">选择订阅时长</h3>
              <div className="flex gap-4">
                {[
                  { value: '1', label: '1个月', discount: '' },
                  { value: '3', label: '3个月', discount: '省10%' },
                  { value: '12', label: '12个月', discount: '省20%' },
                ].map((duration) => (
                  <button
                    key={duration.value}
                    onClick={() => setSelectedDuration(duration.value as '1' | '3' | '12')}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all duration-200 ${
                      selectedDuration === duration.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold text-gray-900">{duration.label}</div>
                      {duration.discount && (
                        <div className="text-sm text-green-600 font-medium">{duration.discount}</div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-xl shadow-lg border-2 transition-all duration-200 cursor-pointer transform hover:scale-105 flex flex-col ${
                    selectedPlan === plan.id
                      ? 'border-blue-500 shadow-xl'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        推荐
                      </div>
                    </div>
                  )}

                  <div className="p-6 flex flex-col h-full">
                    {/* Plan Header */}
                    <div className="text-center mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold text-gray-900 mb-1">{plan.price}</div>
                      <div className="text-sm text-gray-500">{plan.duration}</div>
                    </div>

                    {/* Monitor Count */}
                    <div className="text-center mb-6">
                      <div className="text-2xl font-bold text-blue-600 mb-1">{plan.monitors}</div>
                      <div className="text-sm text-gray-600">监控任务数量</div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-6 flex-grow">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Selection Indicator */}
                    <div className={`w-full py-3 rounded-xl text-center font-semibold transition-all duration-200 ${
                      selectedPlan === plan.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {selectedPlan === plan.id ? '已选择' : '选择此计划'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
            >
              取消
            </button>
            <button
              onClick={handleSelectPlan}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              {selectedPlan === 'free' ? '选择免费计划' : '立即开通'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;