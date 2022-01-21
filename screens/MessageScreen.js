import { Text, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, FlatList, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../component/Header';
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import { useRoute } from '@react-navigation/native';
import tw from "tailwind-rn";
import SenderMessage from '../component/SenderMessage';
import ReceiverMessage from '../component/ReceiverMessage';
import { serverTimestamp } from '@firebase/firestore';
import { addDoc, collection, onSnapshot, orderBy, query } from "@firebase/firestore";
import { db } from "../firebase";


const MessageScreen = () => {
    const { user } = useAuth();
    const { params } = useRoute();
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const { matchDetails } = params;

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, 'matches', matchDetails.id, 'messages'),
                    orderBy('timestamp', 'desc')
                ),
                (snapshot) =>
                    setMessages(
                        snapshot.docs.map(doc => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    )
            ),
        [matchDetails, db]
    );

    const sendMessage = () => {
        addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
            timestamp: serverTimestamp(),
            userId: user.uid,
            displayName: user.displayName,
            photoURL: matchDetails.user[user.uid].photoURL,
            message: input,
        });

        setInput("");
    };

    return (
        <SafeAreaView style={tw("flex-1")}>
            <Header
                title={getMatchedUserInfo(matchDetails.users, user.uid).displayName}
                callEnabled
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={tw("flex-1")}
                keyboardVerticalOffset={10}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <FlatList
                        data={messages}
                        inverted={-1}
                        style={tw("pl-4")}
                        keyExtractor={item => item.id}
                        renderItem={({ item: message }) =>
                            message.userId === user.uid ? (
                                <SenderMessage key={message.id} messages={message} />
                            ) : (
                                <ReceiverMessage key={message.id} message={message} />
                            )
                        }
                    />
                </TouchableWithoutFeedback>

                <View
                    style={tw(
                        "flex-row justify-between items-center border-t border-gray-200 px-5 py-2"
                    )}>

                    <TextInput style={tw("h-10 text-lg")}
                        placeholder="Send Message..."
                        onChangeText={setInput}
                        onSubmitEditing={sendMessage}
                        value={input}
                    />
                    <Button title='Send' onPress={sendMessage} color="#FF5864" />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default MessageScreen;
