// src/components/OlympicRingsAnimation.jsx
import React from 'react';
import { motion } from 'framer-motion';

const rings = [
    { color: 'blue-500', x: -80, y: 0 },
    { color: 'black', x: -40, y: 0 },
    { color: 'red-500', x: 0, y: 0 },
    { color: 'yellow-400', x: -60, y: 20 },
    { color: 'green-500', x: -20, y: 20 },
];

function OlympicRingsAnimation() {
    return (
        <div className="relative w-full flex justify-center items-center mt-4">
            {rings.map((ring, index) => (
                <motion.div
                    key={index}
                    className={`w-12 h-12 rounded-full border-4 border-${ring.color} absolute`}
                    initial={{ y: 0 }}
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, repeatType: 'mirror', duration: 1.5, delay: index * 0.2 }}
                    style={{
                        transform: `translateX(${ring.x}px) translateY(${ring.y}px)`,
                        backgroundColor: 'transparent',
                    }}
                />
            ))}
        </div>
    );
}

export default OlympicRingsAnimation;
