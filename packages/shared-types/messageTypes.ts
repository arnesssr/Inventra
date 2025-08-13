export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';
export type MessageType = 'text' | 'notification' | 'system';

export interface Message {
  id: string;
  content: string;
  type: MessageType;
  status: MessageStatus;
  senderId: string;
  recipientId?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  createdAt: string;
  updatedAt: string;
}
