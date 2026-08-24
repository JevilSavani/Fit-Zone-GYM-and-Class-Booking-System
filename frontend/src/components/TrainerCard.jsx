import React from 'react';

function TrainerCard({ name, specialization, available }) {
    const availabilityText = available ? 'Available' : 'Fully Booked';

    return (
        <article className="trainer-card">
            <div>
                <h3>{name}</h3>
                <p>{specialization}</p>
            </div>
            <span className={available ? 'availability available' : 'availability booked'}>
                {availabilityText}
            </span>
        </article>
    );
}

export default TrainerCard;
