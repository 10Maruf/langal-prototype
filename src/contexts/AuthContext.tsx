import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserType = 'farmer' | 'customer' | 'expert';

export interface User {
    id: string;
    name: string;
    type: UserType;
    email: string;
    nidNumber?: string;
    phone?: string;
    profilePhoto?: string;
    location?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string, userType: UserType) => Promise<boolean>;
    register: (userData: any, userType: UserType) => Promise<boolean>;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check if user is stored in localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string, userType: UserType): Promise<boolean> => {
        // Simulate API call - in real app, this would be an actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock successful login
                const mockUser: User = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: userType === 'farmer' ? 'কৃষক' : userType === 'expert' ? 'কৃষি বিশেষজ্ঞ' : 'ক্রেতা',
                    type: userType,
                    email: email,
                    location: userType === 'farmer' ? 'বাংলাদেশ' : userType === 'expert' ? 'কৃষি বিশ্ববিদ্যালয়' : 'ঢাকা'
                };

                setUser(mockUser);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(mockUser));
                resolve(true);
            }, 1000);
        });
    };

    const register = async (userData: any, userType: UserType): Promise<boolean> => {
        // Simulate API call for registration - in real app, this would be an actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                // Mock successful registration
                console.log('Registration data:', userData, 'User type:', userType);
                resolve(true);
            }, 1000);
        });
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
