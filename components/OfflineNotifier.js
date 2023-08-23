import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

const OfflineNotifier = () => {
    const [isOnline, setIsOnline] = useState(true);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            toast.success('You are now online.');
        };
        const handleOffline = () => {
            setIsOnline(false);
            toast.error('You are now offline. Please check your internet connection.');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return null;
};

export default OfflineNotifier;