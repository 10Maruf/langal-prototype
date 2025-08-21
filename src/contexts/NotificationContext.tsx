import { createContext, useContext, useState, ReactNode } from 'react';

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

interface NotificationContextType {
    notifications: NotificationItem[];
    unreadCount: number;
    addNotification: (notification: Omit<NotificationItem, 'id'>) => void;
    markAsRead: (id: string) => void;
    markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([
        {
            id: '1',
            type: 'consultation_request',
            title: 'নতুন পরামর্শের অনুরোধ',
            message: 'আবদুল করিম তার ধানের সমস্যা নিয়ে আপনার পরামর্শ চেয়েছেন',
            time: '১০ মিনিট আগে',
            read: false,
            farmerName: 'আবদুল করিম'
        },
        {
            id: '2',
            type: 'post_interaction',
            title: 'আপনার পোস্টে মন্তব্য',
            message: 'ফাতেমা খাতুন আপনার টমেটো চাষের পোস্টে মন্তব্য করেছেন',
            time: '৩০ মিনিট আগে',
            read: false,
            postId: 'post_123'
        },
        {
            id: '3',
            type: 'consultation_request',
            title: 'জরুরি পরামর্শের অনুরোধ',
            message: 'রহিম উদ্দিন তার ফসলের জরুরি সমস্যার জন্য আপনার সাহায্য চেয়েছেন',
            time: '১ ঘন্টা আগে',
            read: false,
            farmerName: 'রহিম উদ্দিন'
        }
    ]);

    const unreadCount = notifications.filter(notif => !notif.read).length;

    const addNotification = (notification: Omit<NotificationItem, 'id'>) => {
        const newNotification: NotificationItem = {
            ...notification,
            id: Date.now().toString()
        };
        setNotifications(prev => [newNotification, ...prev]);
    };

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
    };

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            addNotification,
            markAsRead,
            markAllAsRead
        }}>
            {children}
        </NotificationContext.Provider>
    );
};
