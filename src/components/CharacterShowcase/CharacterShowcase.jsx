import React from 'react';
import './CharacterShowcase.css';
import gangImg from '../../images/gang.jpg';
import vecnaImg from '../../images/vecna.jpg';

const CharacterShowcase = ({ isUpsideDown }) => {
    const cards = [
        {
            id: 1,
            nameHawkins: "THE PARTY",
            nameUpsideDown: "THE HIVE MIND",
            imgHawkins: gangImg,
            imgUpsideDown: vecnaImg, // Using Vecna as the counter to the gang for now
            descHawkins: "Mike, Dustin, Lucas, Will, Max, and El. Friends don't lie.",
            descUpsideDown: "A collective consciousness controlled by the Mind Flayer."
        },
        {
            id: 2,
            nameHawkins: "HAWKINS LABORATORY",
            nameUpsideDown: "THE RIFT",
            imgHawkins: "https://images.unsplash.com/photo-1516339901601-2e1b87b47e09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Placeholder scientific
            imgUpsideDown: "https://images.unsplash.com/photo-1618557219648-26798e4c7600?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Placeholder scary
            descHawkins: "Department of Energy. Restricted Access. Do not enter.",
            descUpsideDown: "The gateway between worlds. It acts as a wound in reality."
        }
    ];

    return (
        <section className="showcase-section">
            <h2 className="section-title">
                {isUpsideDown ? "SUBJECTS & TARGETS" : "HAWKINS YEARBOOK"}
            </h2>

            <div className="cards-grid">
                {cards.map((card) => (
                    <div key={card.id} className={`flip-card ${isUpsideDown ? 'flipped' : ''}`}>
                        <div className="flip-card-inner">
                            {/* Front (Hawkins) */}
                            <div className="flip-card-front">
                                <div className="card-image" style={{ backgroundImage: `url(${card.imgHawkins})` }}></div>
                                <div className="card-content">
                                    <h3>{card.nameHawkins}</h3>
                                    <p>{card.descHawkins}</p>
                                </div>
                            </div>

                            {/* Back (Upside Down) */}
                            <div className="flip-card-back">
                                <div className="card-image" style={{ backgroundImage: `url(${card.imgUpsideDown})` }}></div>
                                <div className="card-content">
                                    <h3>{card.nameUpsideDown}</h3>
                                    <p>{card.descUpsideDown}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CharacterShowcase;
