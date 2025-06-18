import { Book, ExternalLink, HelpCircle, Mail, MessageCircle, Phone, Search, Video } from 'lucide-react';
import React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const faqData = [
  {
    id: '1',
    question: 'How do I add a new virtual meter?',
    answer: 'To add a new virtual meter, navigate to the Virtual Meters page and click the "Add New Meter" button. Fill in the required information including meter name, location, type, and configuration settings.',
    category: 'meters',
  },
  {
    id: '2',
    question: 'Why is my meter showing offline status?',
    answer: 'A meter may show offline status due to connectivity issues, power outages, or configuration problems. Check the physical connection and ensure the meter is properly configured in the system.',
    category: 'troubleshooting',
  },
  {
    id: '3',
    question: 'How can I export my energy consumption data?',
    answer: 'You can export your data from the Reports section. Select the desired date range and format, then click the Export button to download your energy consumption data.',
    category: 'reports',
  },
  {
    id: '4',
    question: 'What do the different alert types mean?',
    answer: 'Error alerts indicate critical issues requiring immediate attention. Warning alerts suggest potential problems that should be monitored. Info alerts provide general notifications about system status.',
    category: 'alerts',
  },
  {
    id: '5',
    question: 'How do I set up automated reports?',
    answer: 'In the Reports section, click "Create Report" and select "Scheduled Report". Choose your preferred frequency (daily, weekly, monthly) and configure the report parameters.',
    category: 'reports',
  },
];

const supportChannels = [
  {
    icon: Mail,
    title: 'Email Support',
    description: 'Get help via email within 24 hours',
    action: 'support@energyhub.com',
    color: 'primary',
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    description: 'Chat with our support team in real-time',
    action: 'Start Chat',
    color: 'success',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    description: 'Call us for immediate assistance',
    action: '+1 (555) 123-4567',
    color: 'warning',
  },
  {
    icon: Video,
    title: 'Video Call',
    description: 'Schedule a video call with our experts',
    action: 'Schedule Call',
    color: 'error',
  },
];

const resources = [
  {
    title: 'Getting Started Guide',
    description: 'Learn the basics of EnergyHub and set up your first meters',
    icon: Book,
    link: '#',
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step video guides for common tasks',
    icon: Video,
    link: '#',
  },
  {
    title: 'API Documentation',
    description: 'Technical documentation for developers and integrations',
    icon: ExternalLink,
    link: '#',
  },
  {
    title: 'Best Practices',
    description: 'Tips and recommendations for optimal energy management',
    icon: HelpCircle,
    link: '#',
  },
];

export const Help = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  const categories = ['all', 'meters', 'reports', 'alerts', 'troubleshooting'];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Help & Support
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Find answers to your questions and get the help you need
        </p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles, FAQs, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg"
            />
          </div>
        </CardContent>
      </Card>

      {/* Support Channels */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Contact Support
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportChannels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    channel.color === 'primary' ? 'bg-primary-100 dark:bg-primary-900' :
                    channel.color === 'success' ? 'bg-success-100 dark:bg-success-900' :
                    channel.color === 'warning' ? 'bg-warning-100 dark:bg-warning-900' :
                    'bg-error-100 dark:bg-error-900'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      channel.color === 'primary' ? 'text-primary-600 dark:text-primary-400' :
                      channel.color === 'success' ? 'text-success-600 dark:text-success-400' :
                      channel.color === 'warning' ? 'text-warning-600 dark:text-warning-400' :
                      'text-error-600 dark:text-error-400'
                    }`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {channel.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {channel.description}
                  </p>
                  <Button variant={channel.color} size="sm" className="w-full">
                    {channel.action}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Resources */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Resources & Documentation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-xl">
                      <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {resource.description}
                      </p>
                      <Button variant="ghost" size="sm">
                        Learn More
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Frequently Asked Questions
        </h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFAQs.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <HelpCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No FAQs found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search terms or category filter
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredFAQs.map((faq) => (
              <Card key={faq.id} className="hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Contact CTA */}
      <Card className="bg-gradient-to-r from-primary-50 to-success-50 dark:from-primary-900/20 dark:to-success-900/20 border-primary-200 dark:border-primary-700">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Still need help?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Our support team is here to help you with any questions or issues
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" icon={<MessageCircle className="w-4 h-4" />}>
              Start Live Chat
            </Button>
            <Button variant="secondary" icon={<Mail className="w-4 h-4" />}>
              Send Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};