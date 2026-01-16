import React, { useState, useEffect, useRef } from 'react';
import elImg from '../images/El.png';
import mikeImg from '../images/Mike.png';
import willImg from '../images/Will.png';
import lucasImg from '../images/Lucas.png';
import maxImg from '../images/Max.png';
import dustinImg from '../images/Dustin.png';
import steveImg from '../images/Steve.png';
import robinImg from '../images/Robin.png';
import nancyImg from '../images/Nancy.png';
import jonathanImg from '../images/Jonathan.png';
import joyceImg from '../images/Joyce.png';
import hopperImg from '../images/Hopper.png';

const messages = [
    { character: 'Eleven', avatar: elImg, text: "Okay… I did not open that portal. Don't look at me.", align: 'left' },
    { character: 'Mike Wheeler', avatar: mikeImg, text: "So we're all agreeing this is bad, right? Like… end-of-the-world bad?", align: 'right' },
    { character: 'Will Byers', avatar: willImg, text: "Guys… it's cold. And that's never a good sign.", align: 'left' },
    { character: 'Lucas Sinclair', avatar: lucasImg, text: "I knew we should've stayed home. I knew it.", align: 'right' },
    { character: 'Max Mayfield', avatar: maxImg, text: "Great. Another supernatural nightmare. I just got over the last one.", align: 'left' },
    { character: 'Dustin Henderson', avatar: dustinImg, text: "Technically, if we don't die, this is gonna make an awesome story.", align: 'right' },
    { character: 'Steve Harrington', avatar: steveImg, text: "Okay, everybody, stay calm, I've handled worse. Probably. Maybe.", align: 'left' },
    { character: 'Robin Buckley', avatar: robinImg, text: "On a scale from one to screaming internally, I'm at a solid twelve.", align: 'right' },
    { character: 'Nancy Wheeler', avatar: nancyImg, text: "This isn't random. There's always a pattern, and I'm already mad at it.", align: 'left' },
    { character: 'Jonathan Byers', avatar: jonathanImg, text: "Can we please survive this without traumatizing Will again?", align: 'right' },
    { character: 'Joyce Byers', avatar: joyceImg, text: "Why does this keep happening to my family? We just wanted a normal day.", align: 'left' },
    { character: 'Hopper', avatar: hopperImg, text: "I leave town for five minutes and reality breaks. Figures.", align: 'right' }
];

const ConversationSequence = ({ onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // Auto-scroll to bottom whenever a new message appears or typing starts
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [currentIndex, isTyping]);

    useEffect(() => {
        if (currentIndex < messages.length) {
            const timer = setTimeout(() => {
                setIsTyping(true);

                // Show typing indicator for 500ms, then show message
                setTimeout(() => {
                    setIsTyping(false);
                    setCurrentIndex(currentIndex + 1);
                }, 500);
            }, currentIndex === -1 ? 0 : 700);

            return () => clearTimeout(timer);
        } else if (currentIndex === messages.length) {
            // All messages complete - wait 1 second then trigger cracks
            const timer = setTimeout(() => {
                onComplete();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [currentIndex, onComplete]);

    return (
        <div className="conversation-overlay">
            <div className="conversation-container">
                <div className="chat-messages" ref={scrollRef}>
                    {messages.slice(0, currentIndex + 1).map((msg, index) => (
                        <div key={index} className={`message-row ${msg.align}`}>
                            {msg.align === 'left' && (
                                <img src={msg.avatar} alt={msg.character} className="chat-avatar" />
                            )}
                            <div className="message-bubble-container">
                                <span className="character-name">{msg.character}</span>
                                <div className={`message-bubble ${msg.align}`}>
                                    {msg.text}
                                </div>
                            </div>
                            {msg.align === 'right' && (
                                <img src={msg.avatar} alt={msg.character} className="chat-avatar" />
                            )}
                        </div>
                    ))}

                    {isTyping && currentIndex < messages.length && (
                        <div className={`message-row ${messages[currentIndex + 1]?.align}`}>
                            {messages[currentIndex + 1]?.align === 'left' && (
                                <img src={messages[currentIndex + 1]?.avatar} alt="typing" className="chat-avatar" />
                            )}
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            {messages[currentIndex + 1]?.align === 'right' && (
                                <img src={messages[currentIndex + 1]?.avatar} alt="typing" className="chat-avatar" />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConversationSequence;
