import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

interface AnalyticsOverviewProps {
  data: {
    conversionRate: number;
    avgOrderValue: number;
    customerRetention: number;
    categoryBreakdown: Array<{
      name: string;
      value: number;
      color: string;
    }>;
  };
}

export const AnalyticsOverview = ({ data }: AnalyticsOverviewProps) => {
  const metrics = [
    {
      title: 'Conversion Rate',
      value: `${data.conversionRate}%`,
      change: '+2.1%',
      icon: <Activity className="text-purple-600" />,
      color: 'purple'
    },
    {
      title: 'Avg Order Value',
      value: `$${data.avgOrderValue}`,
      change: '+5.4%',
      icon: <TrendingUp className="text-green-600" />,
      color: 'green'
    },
    {
      title: 'Customer Retention',
      value: `${data.customerRetention}%`,
      change: '-1.2%',
      icon: <TrendingDown className="text-red-600" />,
      color: 'red'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Additional Metrics */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">{metric.title}</span>
              {metric.icon}
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
              <span className={`text-sm font-medium ${
                metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Sales by Category</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data.categoryBreakdown}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.categoryBreakdown.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 space-y-2">
          {data.categoryBreakdown.map((category, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: category.color }}
                ></div>
                <span className="text-sm text-gray-600">{category.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{category.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};