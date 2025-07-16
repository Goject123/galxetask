import React, { useState } from 'react';
import { Plus, Settings, Trash2, Play, Pause, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Task {
  id: number;
  taskId: string;
  name: string;
}

interface TaskManagerProps {
}

const TaskManager: React.FC<TaskManagerProps> = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, taskId: '40', name: 'BNB Chain' },
    { id: 2, taskId: '1659', name: '示例Space' },
    { id: 3, taskId: '34528', name: 'Recall' },
    { id: 4, taskId: '1234', name: 'Polygon Space' },
    { id: 5, taskId: '5678', name: 'Arbitrum Hub' },
    { id: 6, taskId: '9012', name: 'Optimism Network' },
    { id: 7, taskId: '3456', name: 'Base Protocol' },
    { id: 8, taskId: '7890', name: 'Ethereum Layer' },
    { id: 9, taskId: '2468', name: 'Solana Ecosystem' },
    { id: 10, taskId: '1357', name: 'Avalanche Chain' },
    { id: 11, taskId: '9753', name: 'Fantom Opera' },
    { id: 12, taskId: '8642', name: 'BSC Network' },
  ]);

  const [newTaskUrl, setNewTaskUrl] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [notificationRunning, setNotificationRunning] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 10;

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

  // 搜索过滤
  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.taskId.includes(searchTerm)
  );

  // 分页逻辑
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  // 重置页码当搜索时
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

        {/* Stats Section - 移到上面 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                <Settings className={`w-6 h-6 ${notificationRunning ? 'text-green-600' : 'text-gray-400'}`} />
              </div>
            </div>
          </div>
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

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="搜索空间名称或任务ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-4 py-3 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                >
                  清除
                </button>
              )}
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2">
                找到 {filteredTasks.length} 个匹配的任务
              </p>
            )}
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 mb-8 overflow-hidden">
          {filteredTasks.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? '未找到匹配的任务' : '暂无任务'}
              </h3>
              <p className="text-gray-500">
                {searchTerm ? '请尝试其他搜索关键词' : '点击上方"添加监控"按钮开始添加任务'}
              </p>
            </div>
          ) : (
            <>
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
                {currentTasks.map((task, index) => (
                  <tr key={task.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 text-sm text-gray-900">{startIndex + index + 1}</td>
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

              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      显示 {startIndex + 1} - {Math.min(endIndex, filteredTasks.length)} 条，共 {filteredTasks.length} 条
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                              currentPage === page
                                ? 'bg-blue-500 text-white'
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;