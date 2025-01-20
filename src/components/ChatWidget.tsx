"use client";

import { useState } from 'react';
import { Button, Input, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { ChatBubbleLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) return;
    
    setIsSending(true);
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setName('');
        setEmail('');
        setMessage('');
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setIsSending(false);
  };

  return (
    <>
      <Button
        isIconOnly
        color="success"
        variant="shadow"
        aria-label="Chat"
        className="fixed bottom-8 left-4 sm:bottom-8 sm:right-8 z-50 w-12 h-12 text-white"
        onClick={() => setIsOpen(true)}
      >
        <ChatBubbleLeftIcon className="w-6 h-6" />
      </Button>

      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        placement="center"
        backdrop="blur"
      >
        <ModalContent className="dark:bg-background/95">
          <ModalHeader>Send me a message</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <Input
                label="Name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Input
                label="Email"
                placeholder="your@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Textarea
                label="Message"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="success"
              onClick={handleSubmit}
              isLoading={isSending}
              endContent={!isSending && <PaperAirplaneIcon className="w-4 h-4" />}
            >
              Send Message
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
} 