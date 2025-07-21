import React, {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";

type VirtualScrollProps = {
  item: React.ReactNode;
}

const VirtualScroll: FC<VirtualScrollProps> = ({item}) => {
  const [messages, setMessages] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [isLoadingOlder, setIsLoadingOlder] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [oldestMessageId, setOldestMessageId] = useState(null);

  const containerRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const lastMessageRef = useRef(null);
  const isInitialLoadRef = useRef(true);

  // Tạo dữ liệu tin nhắn mẫu
  const generateMessages = useCallback((count = 50, startId = 0) => {
    const msgs = [];
    for (let i = 0; i < count; i++) {
      const id = startId + i;
      msgs.push({
        id: id,
        text: `Tin nhắn số ${id + 1}. ${id % 3 === 0 ? 'Đây là tin nhắn dài hơn để test việc hiển thị của component. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' : 'Tin nhắn ngắn.'}`,
        sender: id % 3 === 0 ? 'user' : 'bot',
        timestamp: new Date(Date.now() - (1000 - id) * 1000 * 60).toLocaleTimeString(),
        avatar: id % 3 === 0 ? '👤' : '🤖'
      });
    }
    return msgs;
  }, []);

  // Giả lập API fetch tin nhắn cũ
  const fetchOlderMessages = useCallback(async (beforeId, limit = 20) => {
    setIsLoadingOlder(true);

    // Giả lập delay API
    await new Promise(resolve => {setTimeout(resolve, 1000)});

    // Tạo tin nhắn cũ hơn
    const startId = Math.max(0, beforeId - limit);
    const count = beforeId - startId;

    if (count <= 0) {
      setHasMoreMessages(false);
      setIsLoadingOlder(false);
      return [];
    }

    const olderMessages = generateMessages(count, startId);
    setIsLoadingOlder(false);

    // Nếu đã load hết tin nhắn cũ nhất
    if (startId === 0) {
      setHasMoreMessages(false);
    }

    return olderMessages;
  }, [generateMessages]);

  // Khởi tạo messages với tin nhắn gần đây
  useEffect(() => {
    const initialMessages = generateMessages(30, 970); // Load 30 tin nhắn từ ID 970-999
    setMessages(initialMessages);
    setOldestMessageId(970);
    isInitialLoadRef.current = false;
  }, [generateMessages]);

  // Virtual scrolling logic
  const ITEM_HEIGHT = 80; // Chiều cao ước tính của mỗi tin nhắn
  const BUFFER_SIZE = 5; // Số tin nhắn buffer trước và sau viewport

  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const visibleRange = useMemo(() => {
    if (!containerHeight) return {start: 0, end: messages.length};

    const start = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - BUFFER_SIZE);
    const visibleCount = Math.ceil(containerHeight / ITEM_HEIGHT);
    const end = Math.min(messages.length, start + visibleCount + BUFFER_SIZE * 2);

    return {start, end};
  }, [scrollTop, containerHeight, messages.length]);

  const visibleMessages = useMemo(() => {
    return messages.slice(visibleRange.start, visibleRange.end).map((msg, index) => ({
      ...msg,
      virtualIndex: visibleRange.start + index
    }));
  }, [messages, visibleRange]);

  const totalHeight = messages.length * ITEM_HEIGHT;
  const offsetY = visibleRange.start * ITEM_HEIGHT;

  // Xử lý scroll với infinite scroll
  const handleScroll = useCallback(async (e) => {
    const container = e.target;
    const newScrollTop = container.scrollTop;
    const maxScroll = container.scrollHeight - container.clientHeight;

    setScrollTop(newScrollTop);

    // Kiểm tra xem có đang ở cuối không
    const atBottom = newScrollTop >= maxScroll - 10;
    setIsAtBottom(atBottom);
    setShowScrollButton(!atBottom && newScrollTop > 200);

    // Load tin nhắn cũ khi scroll gần đến đầu
    if (newScrollTop < 100 && !isLoadingOlder && hasMoreMessages && oldestMessageId !== null) {
      const prevScrollHeight = container.scrollHeight;
      const prevScrollTop = container.scrollTop;

      const olderMessages = await fetchOlderMessages(oldestMessageId);

      if (olderMessages.length > 0) {
        setMessages(prev => [...olderMessages, ...prev]);
        setOldestMessageId(olderMessages[0].id);

        // Maintain scroll position after adding messages
        setTimeout(() => {
          const newScrollHeight = container.scrollHeight;
          const scrollDiff = newScrollHeight - prevScrollHeight;
          container.scrollTop = prevScrollTop + scrollDiff;
        }, 0);
      }
    }

    // Clear timeout nếu đang auto scroll
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Đặt timeout để kết thúc auto scroll
    scrollTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(false);
    }, 150);
  }, [isLoadingOlder, hasMoreMessages, oldestMessageId, fetchOlderMessages]);

  // Cập nhật container height khi resize
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  // Auto scroll đến cuối khi có tin nhắn mới
  useEffect(() => {
    if (isAtBottom && containerRef.current) {
      setIsAutoScrolling(true);
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages.length, isAtBottom]);

  // Scroll đến cuối
  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      setIsAutoScrolling(true);
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  // Thêm tin nhắn mới (giả lập tin nhắn real-time)
  const addMessage = useCallback(() => {
    const newMessage = {
      id: 1000 + messages.length,
      text: `Tin nhắn mới số ${1000 + messages.length + 1}`,
      sender: Math.random() > 0.5 ? 'user' : 'bot',
      timestamp: new Date().toLocaleTimeString(),
      avatar: Math.random() > 0.5 ? '👤' : '🤖'
    };
    setMessages(prev => [...prev, newMessage]);
  }, [messages.length]);

  // Load nhiều tin nhắn cho demo
  const loadManyMessages = useCallback(() => {
    const allMessages = generateMessages(1000, 0);
    setMessages(allMessages);
    setOldestMessageId(0);
    setHasMoreMessages(false);
  }, [generateMessages]);

  // Message component
  const MessageItem = React.memo(({message}) => (
    <div
      className={`flex gap-3 p-4 transition-all duration-200 hover:bg-gray-50 ${
        message.sender === 'user' ? 'flex-row-reverse' : ''
      }`}
      style={{height: ITEM_HEIGHT}}
    >
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm ${
        message.sender === 'user'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-200 text-gray-600'
      }`}>
        {message.sender === 'user' ? <User size={16}/> : <Bot size={16}/>}
      </div>

      <div className={`flex-1 min-w-0 ${message.sender === 'user' ? 'text-right' : ''}`}>
        <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
          message.sender === 'user'
            ? 'bg-blue-500 text-white rounded-br-sm'
            : 'bg-gray-200 text-gray-800 rounded-bl-sm'
        }`}>
          <p className="text-sm break-words">{message.text}</p>
        </div>
        <p className="text-xs text-gray-500 mt-1 px-1">{message.timestamp}</p>
      </div>
    </div>
  ));

  return (
    <div className="relative">
      {/* Loading indicator for older messages */}
      {isLoadingOlder && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-white px-4 py-2 rounded-full shadow-lg border flex items-center gap-2">
            <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            <span className="text-sm text-gray-600">Đang tải tin nhắn cũ...</span>
          </div>
        </div>
      )}
      {/* Chat container */}
      <div
        ref={containerRef}
        className="h-96 overflow-y-auto border border-gray-300 rounded-lg bg-white relative"
        onScroll={handleScroll}
        style={{scrollBehavior: isAutoScrolling ? 'smooth' : 'auto'}}
      >
        {/* Virtual scroll viewport */}
        <div style={{height: totalHeight, position: 'relative'}}>
          <div
            style={{
              transform: `translateY(${offsetY}px)`,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            }}
          >
            {visibleMessages.map((message) => (
              <MessageItem key={message.id} message={message}/>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to bottom button */}
      {/*{showScrollButton && (*/}
      {/*  <button*/}
      {/*    onClick={scrollToBottom}*/}
      {/*    className="absolute bottom-4 right-4 w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 flex items-center justify-center hover:scale-105"*/}
      {/*  >*/}
      {/*    <ChevronDown size={20}/>*/}
      {/*  </button>*/}
      {/*)}*/}

      {/* Status indicator */}
      <div className="mt-4 text-sm text-gray-600 flex justify-between items-center">
        <span>Hiển thị {visibleMessages.length} / {messages.length} tin nhắn</span>
        <div className="flex items-center gap-4">
            <span className={`px-2 py-1 rounded-full text-xs ${
              isAtBottom ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
            }`}>
              {isAtBottom ? 'Ở cuối' : 'Đang cuộn'}
            </span>
          <span className={`px-2 py-1 rounded-full text-xs ${
            hasMoreMessages ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'
          }`}>
              {hasMoreMessages ? 'Còn tin nhắn cũ' : 'Hết tin nhắn'}
            </span>
          <span className="text-xs">
              Range: {visibleRange.start}-{visibleRange.end}
            </span>
        </div>
      </div>
    </div>
  );
};

export default VirtualScroll;
