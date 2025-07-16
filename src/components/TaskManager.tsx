import React, { useState } from 'react';
import { Plus, Settings, Bell, Trash2, Clock, Key, Save, Play, Pause, Link, Search } from 'lucide-react';

interface Task {
  id: number;
  taskId: string;
  name: string;
}

interface TaskManagerProps {
  onShowBarkTutorial: () => void;
}

const TaskManager: React.FC<TaskManagerProps> = ({ onShowBarkTutorial }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, taskId: '40', name: 'BNB Chain' },
    { id: 2, taskId: '1659', name: '示例Space' },
    { id: 3, taskId: '34528', name: 'Recall' },
  ]);

  const [newTaskUrl, setNewTaskUrl] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [barkKey, setBarkKey] = useState('2vkiQ9mFTPskLPcdp3aiDL');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('22:00');
  const [allDayNotification, setAllDayNotification] = useState(false);
  const [notificationRunning, setNotificationRunning] = useState(true);

  const addTask = () => {
    if (newTaskUrl.trim() || newTaskName.trim()) {
      const newTask: Task = {
        id: tasks.length + 1,
        taskId: (Math.floor(Math.random() * 10000)).toString(),
        name: newTaskName || `任务 ${tasks.length + 1}`,
      };
      setTasks([...tasks, newTask]);
      setNewTaskUrl('');
      setNewTaskName('');
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleNotification = () => {
    setNotificationRunning(!notificationRunning);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Galxe 任务通知管理
          </h1>
          <p className="text-gray-600 text-lg">
            高效管理您的 Galxe 任务监控系统
          </p>
        </div>

        {/* Add Task Section - Similar to image */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
          <div className="p-8">
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-4">
                粘贴galxe项目链接或输入名称，如 https://app.galxe.com/BNBChain 或 BNBchain
              </p>
              <div className="flex gap-4 items-center mb-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="粘贴galxe项目链接或输入名称，如 https://app.galxe.com/BNBChain 或 BNBchain"
                    value={newTaskUrl}
                    onChange={(e) => setNewTaskUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <span className="text-gray-400 text-sm">或</span>
                <div className="w-48">
                  <input
                    type="text"
                    placeholder="输入空间名称..."
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <button
                  onClick={addTask}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  <Plus className="w-5 h-5" />
                  添加监控
                </button>
              </div>
              <p className="text-gray-500 text-sm">
                支持空间主页、任务列表页、任务详情页等所有 galxe 项目链接，或直接输入空间名称
              </p>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">序号</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">任务ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">名称</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">操作</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-600">
                      <span className="bg-gray-50 rounded-lg px-3 py-1">{task.taskId}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{task.name}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-all duration-200"
                        title="删除任务"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Bark Key Settings */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Key className="w-6 h-6" />
                Bark Key 设置
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Key
                    <button 
                      onClick={onShowBarkTutorial}
                      className="ml-2 text-blue-600 hover:text-blue-800 text-sm underline"
                    >
                      设置教程
                    </button>
                  </label>
                  <input
                    type="text"
                    value={barkKey}
                    onChange={(e) => setBarkKey(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 font-mono text-sm"
                    placeholder="输入您的 Bark Key..."
                  />
                </div>
                <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  <Save className="w-5 h-5" />
                  保存
                </button>
              </div>
            </div>
          </div>

          {/* Notification Time Settings */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Bell className="w-6 h-6" />
                通知时间段设置
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  <span className="text-gray-400">~</span>
                  <div className="flex-1">
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200"
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
                    全天推送
                  </label>
                </div>

                <button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  <Save className="w-5 h-5" />
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">总任务数</p>
                <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Settings className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">通知状态</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className={`text-2xl font-bold ${notificationRunning ? 'text-green-600' : 'text-gray-400'}`}>
                    {notificationRunning ? '运行中' : '未开启'}
                  </p>
                  <button
                    onClick={toggleNotification}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      notificationRunning 
                        ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                        : 'bg-green-100 text-green-600 hover:bg-green-200'
                    }`}
                    title={notificationRunning ? '停止通知' : '启动通知'}
                  >
                    {notificationRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className={`p-3 rounded-lg ${notificationRunning ? 'bg-green-100' : 'bg-gray-100'}`}>
                <Bell className={`w-6 h-6 ${notificationRunning ? 'text-green-600' : 'text-gray-400'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;