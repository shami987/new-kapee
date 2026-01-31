import { Plus, Package, Users, Settings, BarChart3, FileText } from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

export const QuickActions = () => {
  const actions: QuickAction[] = [
    {
      title: 'Add Product',
      description: 'Create new product listing',
      icon: <Plus size={20} />,
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => console.log('Add product')
    },
    {
      title: 'Manage Inventory',
      description: 'Update stock levels',
      icon: <Package size={20} />,
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => console.log('Manage inventory')
    },
    {
      title: 'View Customers',
      description: 'Customer management',
      icon: <Users size={20} />,
      color: 'bg-purple-500 hover:bg-purple-600',
      onClick: () => console.log('View customers')
    },
    {
      title: 'Analytics',
      description: 'Detailed reports',
      icon: <BarChart3 size={20} />,
      color: 'bg-orange-500 hover:bg-orange-600',
      onClick: () => console.log('View analytics')
    },
    {
      title: 'Generate Report',
      description: 'Export sales data',
      icon: <FileText size={20} />,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      onClick: () => console.log('Generate report')
    },
    {
      title: 'Settings',
      description: 'System configuration',
      icon: <Settings size={20} />,
      color: 'bg-gray-500 hover:bg-gray-600',
      onClick: () => console.log('Settings')
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 group"
          >
            <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
              {action.icon}
            </div>
            <h4 className="font-medium text-gray-900 text-sm mb-1">{action.title}</h4>
            <p className="text-xs text-gray-500 text-center">{action.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};