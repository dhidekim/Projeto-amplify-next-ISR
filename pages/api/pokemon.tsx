import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

interface ErrorResponse {
  error: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon | ErrorResponse>
) {
  try {
    const randomId = Math.floor(Math.random() * 151) + 1; // Pokémon de 1 a 151 (Kanto)
    const response = await axios.get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${randomId}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Falha ao obter dados" });
  }
}
