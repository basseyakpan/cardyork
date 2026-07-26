'use client';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { markAsRead } from '@/store/slices/notificationSlice';
import { FiBell } from 'react-icons/fi';

export default function NotificationBell() {
  const dispatch = useAppDispatch();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const { notifications, unreadCount } = useAppSelector(s => s.notification);

  return (
    <div className="relative flex items-center">
      <button 
        onClick={() => setIsNotifOpen(!isNotifOpen)} 
        className="relative p-2 rounded-full hover:bg-primary/10 transition-colors focus:outline-none text-primary"
      >
        <FiBell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background" />
        )}
      </button>
      
      {isNotifOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)} />
          <div className="absolute top-full right-0 mt-2 w-80 rounded-2xl glass-card border border-primary/10 p-2 z-50 shadow-xl animate-fade-in max-h-96 overflow-y-auto">
            <div className="p-3 border-b border-primary/10 flex justify-between items-center">
              <span className="font-bold text-on-surface">Notifications</span>
              <span className="text-xs text-on-surface-variant">{unreadCount} unread</span>
            </div>
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-on-surface-variant text-sm">No new notifications</div>
            ) : (
              <div className="flex flex-col">
                {notifications.map(notif => (
                  <div 
                    key={notif._id} 
                    onClick={() => dispatch(markAsRead(notif._id))}
                    className={`p-3 border-b border-primary/5 hover:bg-primary/5 transition-colors cursor-pointer flex flex-col gap-1 ${!notif.isRead ? 'bg-primary/5' : ''}`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <span className="font-bold text-sm text-on-surface line-clamp-1">{notif.title}</span>
                      {!notif.isRead && <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                    </div>
                    <span className="text-xs text-on-surface-variant line-clamp-2">{notif.message}</span>
                    <span className="text-[10px] text-on-surface-variant/70 mt-1">{new Date(notif.createdAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
