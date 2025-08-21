import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, MessageSquare, Users, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";

interface NotificationItem {
    id: string;
    type: 'consultation_request' | 'post_interaction' | 'system';
    title: string;
    message: string;
    time: string;
    read: boolean;
    farmerName?: string;
    postId?: string;
}

export const ExpertNotifications = () => {
    const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotifications();
    const [filter, setFilter] = useState<'all' | 'unread' | 'consultation'>('all');

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'consultation_request':
                return <MessageSquare className="h-5 w-5 text-blue-600" />;
            case 'post_interaction':
                return <Users className="h-5 w-5 text-green-600" />;
            case 'system':
                return <Bell className="h-5 w-5 text-orange-600" />;
            default:
                return <Bell className="h-5 w-5" />;
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CardTitle>নোটিফিকেশন</CardTitle>
                        {unreadCount > 0 && (
                            <Badge variant="destructive" className="h-5 w-5 flex items-center justify-center p-0 text-xs">
                                {unreadCount}
                            </Badge>
                        )}
                    </div>
                    {unreadCount > 0 && (
                        <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                            সব পড়া হয়েছে চিহ্নিত করুন
                        </Button>
                    )}
                </div>
                <CardDescription>
                    কৃষকদের অনুরোধ ও ইন্টারঅ্যাকশন
                </CardDescription>
            </CardHeader>
            <CardContent>
                {/* Filter Buttons */}
                <div className="flex gap-2 mb-4">
                    <Button
                        variant={filter === 'all' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('all')}
                    >
                        সব ({notifications.length})
                    </Button>
                    <Button
                        variant={filter === 'unread' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('unread')}
                    >
                        অপঠিত ({unreadCount})
                    </Button>
                    <Button
                        variant={filter === 'consultation' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setFilter('consultation')}
                    >
                        পরামর্শ ({notifications.filter(n => n.type === 'consultation_request').length})
                    </Button>
                </div>

                <div className="space-y-3">
                    {notifications.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>কোন নোটিফিকেশন নেই</p>
                        </div>
                    ) : (
                        notifications.filter(n => {
                            if (filter === 'unread') return !n.read;
                            if (filter === 'consultation') return n.type === 'consultation_request';
                            return true;
                        }).map((notification) => (
                            <div
                                key={notification.id}
                                className={`flex items-start gap-3 p-3 rounded-lg border transition-colors cursor-pointer hover:bg-muted/50 ${!notification.read ? 'bg-blue-50 border-blue-200' : 'bg-background'
                                    }`}
                                onClick={() => markAsRead(notification.id)}
                            >
                                <div className="flex-shrink-0 mt-1">
                                    {getNotificationIcon(notification.type)}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between">
                                        <h4 className={`text-sm font-medium ${!notification.read ? 'text-blue-900' : ''}`}>
                                            {notification.title}
                                        </h4>
                                        <div className="flex items-center gap-2 ml-2">
                                            <span className="text-xs text-muted-foreground flex-shrink-0">
                                                {notification.time}
                                            </span>
                                            {!notification.read && (
                                                <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                                            )}
                                        </div>
                                    </div>

                                    <p className="text-sm text-muted-foreground mt-1">
                                        {notification.message}
                                    </p>

                                    {notification.type === 'consultation_request' && (
                                        <div className="flex gap-2 mt-3">
                                            <Button size="sm" className="h-7 text-xs">
                                                উত্তর দিন
                                            </Button>
                                            <Button variant="outline" size="sm" className="h-7 text-xs">
                                                বিস্তারিত
                                            </Button>
                                        </div>
                                    )}

                                    {notification.type === 'post_interaction' && (
                                        <div className="flex gap-2 mt-3">
                                            <Button variant="outline" size="sm" className="h-7 text-xs">
                                                পোস্ট দেখুন
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
