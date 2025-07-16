import React, { useState } from 'react';
import { Bell, Key, Save, Clock, Smartphone, MessageSquare, Download, CheckCircle, AlertCircle, Info } from 'lucide-react';

const NotificationSettings: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<'bark' | 'serverchan' | 'ntfy'>('bark');
  const [barkKey, setBarkKey] = useState('2vkiQ9mFTPskLPcdp3aiDL');
  const [serverChanKey, setServerChanKey] = useState('');
  const [ntfyTopic, setNtfyTopic] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('22:00');
  const [allDayNotification, setAllDayNotification] = useState(false);
  const [showBarkTutorial, setShowBarkTutorial] = useState(false);

  const providers = [
    {
      id: 'bark' as const,
      name: 'Bark',
      description: '苹果设备专用，免费推送服务',
      icon: Smartphone,
      color: 'from-blue-500 to-purple-500',
      platforms: ['iOS', 'macOS', 'watchOS'],
      price: '免费',
      recommended: 'iOS用户推荐',
    },
    {
      id: 'serverchan' as const,
      name: 'Server酱',
      description: '微信通知，跨平台支持',
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500',
      platforms: ['iOS', 'Android', '微信'],
      price: '付费',
      recommended: '微信用户推荐',
    },
    {
      id: 'ntfy' as const,
      name: 'ntfy',
      description: '开源免费，跨平台推送',
      icon: Bell,
      color: 'from-orange-500 to-red-500',
      platforms: ['iOS', 'Android', 'Web'],
      price: '免费',
      recommended: 'Android用户推荐',
    },
  ];

  const handleSave = () => {
    // 保存设置逻辑
    console.log('保存通知设置');
  };

  const handleTest = () => {
    // 测试通知逻辑
    console.log('发送测试通知');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            通知设置
          </h1>
          <p className="text-gray-600 text-lg">
            配置您的推送通知服务，及时获取任务更新
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Provider Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">选择通知服务</h2>
              
              <div className="space-y-4">
                {providers.map((provider) => {
                  const IconComponent = provider.icon;
                  return (
                    <div
                      key={provider.id}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedProvider === provider.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedProvider(provider.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${provider.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              provider.price === '免费' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {provider.price}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{provider.description}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {provider.platforms.map((platform) => (
                              <span key={platform} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {platform}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-blue-600 font-medium">{provider.recommended}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* API Configuration */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className={`bg-gradient-to-r ${providers.find(p => p.id === selectedProvider)?.color} px-6 py-4`}>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Key className="w-6 h-6" />
                  {providers.find(p => p.id === selectedProvider)?.name} 配置
                </h3>
              </div>
              <div className="p-6">
                {selectedProvider === 'bark' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bark API Key
                        <button 
                          onClick={() => setShowBarkTutorial(true)}
                          className="ml-2 text-blue-600 hover:text-blue-800 text-sm underline"
                        >
                          设置教程
                        </button>
                      </label>
                      <input
                        type="text"
                        value={barkKey}
                        onChange={(e) => setBarkKey(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
                        placeholder="输入您的 Bark Key..."
                      />
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-700">
                          <p className="font-medium mb-1">使用说明：</p>
                          <ul className="space-y-1 text-xs">
                            <li>• 需要在 App Store 下载 Bark 应用</li>
                            <li>• 完全免费，支持自定义通知声音</li>
                            <li>• 仅支持苹果设备（iPhone、iPad、Mac、Apple Watch）</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedProvider === 'serverchan' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Server酱 SendKey
                      </label>
                      <input
                        type="text"
                        value={serverChanKey}
                        onChange={(e) => setServerChanKey(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
                        placeholder="输入您的 SendKey..."
                      />
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-green-700">
                          <p className="font-medium mb-1">使用说明：</p>
                          <ul className="space-y-1 text-xs">
                            <li>• 通过微信接收通知，跨平台支持</li>
                            <li>• 需要关注"Server酱"微信公众号</li>
                            <li>• 付费服务，稳定可靠</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {selectedProvider === 'ntfy' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ntfy Topic
                      </label>
                      <input
                        type="text"
                        value={ntfyTopic}
                        onChange={(e) => setNtfyTopic(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
                        placeholder="输入您的 Topic 名称..."
                      />
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-orange-700">
                          <p className="font-medium mb-1">使用说明：</p>
                          <ul className="space-y-1 text-xs">
                            <li>• 开源免费的推送服务</li>
                            <li>• 需要下载 ntfy 应用（Google Play / App Store）</li>
                            <li>• 支持自定义服务器，隐私保护好</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3 mt-6">
                  <button 
                    onClick={handleSave}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <Save className="w-5 h-5" />
                    保存配置
                  </button>
                  <button 
                    onClick={handleTest}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200"
                  >
                    测试通知
                  </button>
                </div>
              </div>
            </div>

            {/* Time Settings */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Clock className="w-6 h-6" />
                  通知时间设置
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        开始时间
                      </label>
                      <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        disabled={allDayNotification}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                    <span className="text-gray-400 mt-6">~</span>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        结束时间
                      </label>
                      <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        disabled={allDayNotification}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100 disabled:text-gray-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="allDay"
                      checked={allDayNotification}
                      onChange={(e) => setAllDayNotification(e.target.checked)}
                      className="w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
                    />
                    <label htmlFor="allDay" className="text-sm font-medium text-gray-700">
                      全天推送（24小时接收通知）
                    </label>
                  </div>

                  <div className="bg-amber-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-amber-700">
                        <p className="font-medium mb-1">时间设置说明：</p>
                        <p className="text-xs">
                          设置通知的活跃时间段，避免在休息时间收到打扰。全天推送适合需要实时监控的用户。
                        </p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleSave}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <Save className="w-5 h-5" />
                    保存时间设置
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bark Tutorial Modal */}
        {showBarkTutorial && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">Bark 设置教程</h2>
                <button
                  onClick={() => setShowBarkTutorial(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  ×
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        下载 Bark 应用
                      </h3>
                      <p className="text-gray-600 mb-3">在 App Store 搜索并下载 "Bark" 应用（iOS 设备）</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">获取 API Key</h3>
                      <p className="text-gray-600 mb-3">打开 Bark 应用，复制显示的 Key</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">配置到系统</h3>
                      <p className="text-gray-600 mb-3">将 Key 粘贴到上方输入框中并保存</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-100">
                <button
                  onClick={() => setShowBarkTutorial(false)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  我知道了
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSettings;