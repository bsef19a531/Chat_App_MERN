import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../../context/chatProvider';
import { Avatar, Tooltip } from '@chakra-ui/react';



const ScrollableMessages = ({ messages }) => {

    const { user } = ChatState();


    const isSameSender = (messages, m, i, userId) => {
        return (
            i < messages.length - 1 && (messages[i + 1].sender._id !== m.sender._id || messages[i + 1].sender._id === undefined) && messages[i].sender._id === userId
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
                    return (
                        <div style={{ display: 'flex' }} key={m._id}  >
                            {
                                (isSameSender(messages, m, i, user._id)
                                    || isLastMessage(messages, i, user._id)) &&
                                (
                                    <Tooltip label={m.sender.name} placement='bottom-start' hasArrow  >
                                        <Avatar cursor='pointer' size='sm' mt='7px' mr={1} name={m.sender.name} src={m.sender.pic} />
                                    </Tooltip>
                                )
                            }
                        </div>
                    )
                })
            }
        </ScrollableFeed>
    )
}

export default ScrollableMessages