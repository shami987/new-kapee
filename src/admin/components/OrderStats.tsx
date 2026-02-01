import { Package, Clock, CheckCircle, XCircle } from 'lucide-react';

interface OrderStatsProps {
  stats: {
    total: number;
    pending: number;
    processing: number;
    delivered: number;
    cancelled: number;
  };
}

export const OrderStats = ({ stats }: OrderStatsProps) => {
  const statCards = [
    {
      title: 'Total Orders',
      value: stats.total,
      icon: <Package className="text-blue-600" />,
      color: 'bg-blue-50 border-blue-200',
      change: '+12%'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: <Clock className="text-yellow-600" />,
      color: 'bg-yellow-50 border-yellow-200',
      change: '+5%'
    },
    {
      title: 'Delivered',
      value: stats.delivered,
      icon: <CheckCircle className="text-green-600" />,
      color: 'bg-green-50 border-green-200',
      change: '+18%'
    },
    {
      title: 'Cancelled',
      value: stats.cancelled,
      icon: <XCircle className="text-red-600" />,
      color: 'bg-red-50 border-red-200',
      change: '-3%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((stat, index) => (
        <div key={index} className={`border rounded-lg p-6 ${stat.color}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <p className="text-sm text-gray-600 mt-2">
                <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                  {stat.change}
                </span>
                {' '}from last month
              </p>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};