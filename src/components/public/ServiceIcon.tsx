import {
  Target,
  Layout,
  ShoppingBag,
  Bot,
  Cpu,
  BarChart3,
} from 'lucide-react';
import { ServiceCategory } from '@/config/services';

export function ServiceIcon({
  name,
  className = 'w-6 h-6',
}: {
  name: ServiceCategory['iconName'];
  className?: string;
}) {
  switch (name) {
    case 'target':
      return <Target className={className} />;
    case 'layout':
      return <Layout className={className} />;
    case 'shopping-bag':
      return <ShoppingBag className={className} />;
    case 'bot':
      return <Bot className={className} />;
    case 'cpu':
      return <Cpu className={className} />;
    case 'bar-chart-3':
      return <BarChart3 className={className} />;
    default:
      return <Target className={className} />;
  }
}
