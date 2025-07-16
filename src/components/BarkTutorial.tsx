import React from 'react';
import { X, Smartphone, Download, Settings, Key, Bell } from 'lucide-react';

interface BarkTutorialProps {
  onClose: () => void;
}

const BarkTutorial: React.FC<BarkTutorialProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900">Bark 推送设置教程</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Step 1 */}
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Download className="w-5 h-5" />
                下载 Bark 应用
              </h3>
              <p className="text-gray-600 mb-3">
                在 App Store 搜索并下载 "Bark" 应用（iOS 设备）
              </p>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-700">
                  📱 支持平台：iOS、macOS、watchOS
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                打开应用并注册
              </h3>
              <p className="text-gray-600 mb-3">
                首次打开 Bark 应用，按照提示完成设备注册
              </p>
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-sm text-blue-700">
                  💡 注册后会自动生成一个唯一的设备 Key
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Key className="w-5 h-5" />
                获取 API Key
              </h3>
              <p className="text-gray-600 mb-3">
                在 Bark 应用中找到您的专属 Key，通常显示在主界面
              </p>
              <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm">
                <p className="text-gray-700">
                  示例：2vkiQ9mFTPskLPcdp3aiDL
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              4
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                配置到 Alphaping
              </h3>
              <p className="text-gray-600 mb-3">
                将获取到的 Key 复制并粘贴到上方的 API Key 输入框中
              </p>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-sm text-green-700">
                  ✅ 配置完成后，您将收到任务更新的实时推送通知
                </p>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
              5
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Bell className="w-5 h-5" />
                测试推送
              </h3>
              <p className="text-gray-600 mb-3">
                保存 Key 后，系统会发送一条测试消息验证配置是否正确
              </p>
              <div className="bg-yellow-50 rounded-lg p-3">
                <p className="text-sm text-yellow-700">
                  ⚠️ 如果没有收到测试消息，请检查 Key 是否正确
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-900 mb-2">💡 使用小贴士</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 确保手机网络连接正常</li>
              <li>• 允许 Bark 应用发送通知</li>
              <li>• Key 请妥善保管，不要泄露给他人</li>
              <li>• 支持自定义通知声音和图标</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarkTutorial;