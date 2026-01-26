"use client";
import { useState } from "react";

import Image from "next/image"; //img
import Link from "next/link"; //btn

const IMAGE_DIFFERENCES = [
	{ id: 1, x: 4, y: 20, radius: 30 },
	{ id: 2, x: 120, y: 67, radius: 30 },
	{ id: 3, x: 78, y: 64, radius: 30},
	{ id: 4, x: 143, y: 163, radius: 30 },
	{ id: 5, x: 410, y: 330, radius: 30 },
	{ id: 6, x: 270, y: 170, radius: 30 },
	/*{ id: 7, x: },
	{ id: 8, x: },
	{ id: 9, x: },
	{ id: 10, x: },
	{ id: 11, x: },
	{ id: 12, x: },
	{ id: 13, x: },
	{ id: 14, x: },
	{ id: 15, x: }*/
];

function whatthediff(
	x: number,
	y: number,
	spot: { x: number; y: number; radius: number }
) {
	const dx = x - spot.x;
	const dy = y - spot.y;
	return dx * dx + dy * dy <= spot.radius * spot.radius;
}


export default function SpotTheDifference() {
	const [foundIds, setFoundIds] = useState<number[]>([]);
	const [gameState, setGameState] = useState<"Start" | "Playing" | "Won">("Playing");

	const handleClick = (x: number, y: number) => {
		const spot = IMAGE_DIFFERENCES.find(
			(s) => !foundIds.includes(s.id) && isInsideSpot(x, y, s)
		);
	if (spot) {
		const newFound = [...foundIds, spot.id];
		setFoundIds(newFound);
		if (newFound.length === IMAGE.DIFFERENCES.length) {
			setGameState("Won");
		}
	}
