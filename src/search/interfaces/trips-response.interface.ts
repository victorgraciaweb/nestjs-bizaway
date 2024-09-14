export interface Trip {
  id: string;
  origin: string;
  destination: string;
  cost: number;
  duration: number;
  type: string;
  display_name: string;
}

export type TripsResponse = Trip[];
