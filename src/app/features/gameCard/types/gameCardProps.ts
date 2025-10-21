/**
 * @typedef {Object} gameCardProps Type for defining the props of GameCard.tsx
 * @property {string} title The title of the game
 * @property {string} imgUrl The url to the game image
 * @property {string} altText Alt text describing the image
 */
interface gameCardProps {
    title: string;
    imgUrl: string;
    altText: string;
}

export type {gameCardProps};