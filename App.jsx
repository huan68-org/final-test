import React, { useState } from 'react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [inputValue, setInputValue] = useState('');

  
  const addTask = () => {
    if (inputValue.trim() !== '') {
      const newTask = {
        id: Date.now(),
        text: inputValue,
        active: true
      };
      setTasks([...tasks, newTask]);
      setInputValue('');
    }
  };

  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, active: !task.active } : task
    ));
  };

  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  
  const deleteAllCompleted = () => {
    setTasks(tasks.filter(task => task.active));
  };

  
  const getFilteredTasks = () => {
    switch (activeTab) {
      case 'active':
        return tasks.filter(task => task.active);
      case 'completed':
        return tasks.filter(task => !task.active);
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();
  const completedTasks = tasks.filter(task => !task.active);

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-6">
      
      <h1 className="text-3xl font-light text-center text-gray-800 mb-8"> tu đu list của Công Huân</h1>

      
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === 'all' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Công việc
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === 'active' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          trạng thái
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === 'completed' 
              ? 'text-blue-600 border-b-2 border-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Đã hoàn thành
        </button>
      </div>

      
      {(activeTab === 'all' || activeTab === 'active') && (
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="thêm việc cầm làm ở đây ^^"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={addTask}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Add
          </button>
        </div>
      )}

      
      <div className="space-y-3">
        {filteredTasks.map(task => (
          <div key={task.id} className="flex items-center gap-3 p-2">
            <input
              type="checkbox"
              checked={!task.active}
              onChange={() => toggleTask(task.id)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span 
              className={`flex-1 text-gray-800 ${
                !task.active ? 'line-through text-gray-500' : ''
              }`}
            >
              {task.text}
            </span>
            
            {activeTab === 'completed' && !task.active && (
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

     
      {activeTab === 'completed' && completedTasks.length > 0 && (
        <div className="mt-6 text-right">
          <button
            onClick={deleteAllCompleted}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            🗑 Xoá Tất cả
          </button>
        </div>
      )}

      
      {filteredTasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          {activeTab === 'all' && 'chưa có công việc nào'}
          {activeTab === 'active' && 'chưa có công việc nào'}
          {activeTab === 'completed' && 'chưa có công việc nào'}
        </div>
      )}
    </div>
  );
};

export default TodoApp;
