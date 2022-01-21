import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Header from "../component/Header";
import ChatList from "../component/ChatList";

const ChatScreen = () => {
    return (
        <SafeAreaView>
            <Header title="Chat" callEnabled />
            <ChatList />
        </SafeAreaView>
    )
}

export default ChatScreen;
