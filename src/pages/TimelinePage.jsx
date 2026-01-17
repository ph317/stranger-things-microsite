import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ParticleSystem from '../components/ParticleSystem';
import LightningEffect from '../components/LightningEffect';
import '../styles/TimelinePage.css';

const timelineEvents = [
    {
        year: "1800s",
        title: "Hawkins is Founded",
        description: "The town of Hawkins is founded in Indiana, secretly built upon a network of dimensional nexus points."
    },
    {
        year: "1848",
        title: "The Case of Phineas Gage",
        description: "September 13: Railroad worker Phineas Gage survives an iron rod through his brain. His case is later studied by Dr. Brenner for its psychic implications."
    },
    {
        year: "1919-1923",
        title: "The Creel Generation",
        description: "Victor and Virginia Creel are born. In 1923, the last unexplained disappearance occurs in Hawkins—a peace that would last 60 years."
    },
    {
        year: "1947",
        title: "Birth of a Monster",
        description: "Henry Creel is born in Nevada. From birth, he possesses a sensitivity to the hidden layers of reality."
    },
    {
        year: "1955",
        title: "The Cave Encounter",
        description: "At age eight, Henry explores a Nevada cave and is exposed to Mind Flayer particles from a black stone, awakening his dark potential."
    },
    {
        year: "1959",
        title: "The Creel House Murders",
        description: "March: The Creels move to Hawkins. Henry torments his family and murders his mother and sister. He becomes Brenner's Subject 001."
    },
    {
        year: "1971",
        title: "Subject 011",
        description: "Jane Ives (Eleven) is born to Terry Ives and immediately taken to Hawkins Lab to be raised as a psychic weapon."
    },
    {
        year: "1979",
        title: "The Lab Massacre",
        description: "September 8: Henry (One) massacres the staff and children. Eleven overpowers him and banishes him to Dimension X, where he becomes Vecna."
    },
    {
        year: "1983",
        title: "The Vanishing of Will Byers",
        description: "November 6: Eleven escapes the lab, unintentionally opening a permanent gate. Will Byers is pulled into the Upside Down."
    },
    {
        year: "1983",
        title: "Rescue from the Void",
        description: "November 13: Eleven defeats the Demogorgon at the middle school and vanishes. Will is successfully rescued from the dark dimension."
    },
    {
        year: "1984",
        title: "Closing the Gate",
        description: "November 5: Eleven returns from hiding. She uses her full power to close the Hawkins Lab gate, severing the Mind Flayer's connection."
    },
    {
        year: "1985",
        title: "The Battle of Starcourt",
        description: "July 4: The Mind Flayer manifests in the right-side up. Billy sacrifices himself to save Eleven. Hopper is captured by Soviets."
    },
    {
        year: "1986",
        title: "The Mega-Rift",
        description: "March 28: Vecna opens four gates through ritual murders. They merge to create a catastrophic rift across Hawkins. Max is left in a coma."
    },
    {
        year: "1987",
        title: "The Siege of Hawkins",
        description: "Fall: Hawkins is under military quarantine. Metal plates cover the rifts as the town is besieged by the creeping rot of the Upside Down."
    },
    {
        year: "1987",
        title: "The Final Offensive",
        description: "November 6: The group tracks Vecna to the core of the Abyss. Kali (Eight) joins the fight but falls. Will weakens the hive mind for the final blow."
    },
    {
        year: "1987",
        title: "The Death of Vecna",
        description: "Joyce Byers decapitates Henry Creel with an axe. Eleven makes a final sacrifice to close the rifts, causing the Upside Down to vanish."
    },
    {
        year: "1988-1990",
        title: "The Conclusion",
        description: "Normalcy returns as the world heals. The saga ends on New Year's Eve 1990, marking the definitive end of an era for the Hawkins heroes."
    }
];

const TimelinePage = () => {
    const [visibleEvents, setVisibleEvents] = useState([]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        window.scrollTo(0, 0); // Ensure page starts at top
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setScrollProgress(scrolled);
        };

        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = parseInt(entry.target.getAttribute('data-index'));
                    setVisibleEvents(prev => [...new Set([...prev, index])]);
                }
            });
        }, { threshold: 0.2 });

        const elements = document.querySelectorAll('.timeline-event');
        elements.forEach(el => observer.observe(el));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="timeline-page">
            <div
                className="vecna-bloom"
                style={{ opacity: 0.3 + (scrollProgress / 200) }}
            />

            {/* Parallax Ash Overlay */}
            <div
                className="parallax-ashes"
                style={{
                    transform: `translate(${(mousePos.x - window.innerWidth / 2) * 0.02}px, ${(mousePos.y - window.innerHeight / 2) * 0.02}px)`
                }}
            />

            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.4 }}>
                <ParticleSystem />
            </div>

            <div className="timeline-container">
                <header className="timeline-header">
                    <Link to="/" className="back-link">← Return to Hawkins</Link>
                    <h1 className="timeline-title">Hawkins Timeline</h1>
                    <div className="timeline-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
                </header>

                <div className="timeline-trail">
                    {timelineEvents.map((event, index) => (
                        <div
                            key={index}
                            data-index={index}
                            className={`timeline-event ${visibleEvents.includes(index) ? 'visible' : ''} ${index % 2 === 0 ? 'left' : 'right'}`}
                        >
                            <div className="event-card glass">
                                <span className="event-year">{event.year}</span>
                                <h2 className="event-title">{event.title}</h2>
                                <p className="event-description">{event.description}</p>
                            </div>
                            <div className="timeline-dot"></div>
                        </div>
                    ))}
                    {/* The growing line based on scroll */}
                    <div className="timeline-line">
                        <div className="timeline-line-inner" style={{ height: `${scrollProgress}%` }}></div>
                    </div>
                </div>

                {/* Final Call to Action */}
                <div className={`timeline-footer ${scrollProgress > 98 ? 'visible' : ''}`}>
                    <div className="cta-content glass">
                        <h2 className="cta-tagline">The story isn't over. It just began elsewhere.</h2>
                        <p className="cta-subtext">Return to the source and witness the legacy of Hawkins.</p>
                        <a
                            href="https://www.netflix.com/title/80057281"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="netflix-cta-link"
                        >
                            <button className="cta-button glass">Enter the Upside Down on Netflix</button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimelinePage;
