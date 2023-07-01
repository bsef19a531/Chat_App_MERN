import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../../context/chatProvider';
import { Avatar, Tooltip } from '@chakra-ui/react';



const ScrollableMessages = ({ messages }) => {

    const { user } = ChatState();


    const isSameSender = (messages, m, i, userId) => {
        return (
            i < messages.length - 1 && (messages[i + 1].sender._id !== m.sender._id || messages[i + 1].sender._id === undefined) && messages[i].sender._id !== userId
        )
    }

    const isLastMessage = (messages, i, userId) => {
        return (
            i === messages.length - 1 && messages[messages.length - 1].sender._id !== userId && messages[messages.length - 1].sender._id
        )
    }

    return (
        <ScrollableFeed>
            {
                messages && messages.map((m, i) => {

                    const isCurrentUser = m.sender._id === user._id;
                    const messageStyle = {
                        backgroundColor: isCurrentUser ? '#2effaf' : '#a2c6fa',
                        borderRadius: '20px',
                        padding: '5px 15px',
                        maxWidth: '90%',
                        alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                        marginBottom: '3px',
                        marginTop: '3px',

                    };

                    return (
                        <div style={{ display: 'flex', flexDirection: isCurrentUser ? 'row-reverse' : 'row', alignItems: 'center', }} key={m._id}  >
                            {
                                (isSameSender(messages, m, i, user._id)
                                    || isLastMessage(messages, i, user._id)) &&
                                (
                                    <Tooltip label={m.sender.name} placement='bottom-start' hasArrow  >
                                        <Avatar cursor='pointer' size='sm' mr={1} name={m.sender.name} src={m.sender.pic} />
                                    </Tooltip>
                                )
                            }

                            {/* <span style={{ backgroundColor: `${m.sender._id === user._id ? "#23BF83" : "#669FF2"}`, borderRadius: '20px', padding: '5px 15px', maxWidth: '75%', alignSelf: `${m.sender._id === user._id ? 'flex-end' : 'flex-start'}` }}  >
                                {m.content}
                            </span> */}

                            <span style={messageStyle}>{m.content}</span>

                        </div>
                    )
                })
            }
        </ScrollableFeed >
    )
}

export default ScrollableMessages