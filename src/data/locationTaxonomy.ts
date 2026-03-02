
export interface Subregion {
  name: string;
  count: number;
}

export interface Country {
  name: string;
  count: number;
  subregions?: Subregion[];
  trending?: boolean;
}

export interface Region {
  id: string;
  name: string;
  count: number;
  imageColor: string;
  countries: Country[];
}

export const LOCATION_TAXONOMY: Region[] = [
  {
    id: "australia-oceania",
    name: "Australia & Oceania",
    count: 450,
    imageColor: "bg-blue-100",
    countries: [
      { 
        name: "Australia", 
        count: 380, 
        trending: true,
        subregions: [
          { name: "Western Australia", count: 150 },
          { name: "Queensland", count: 90 },
          { name: "New South Wales", count: 60 },
          { name: "South Australia", count: 40 },
          { name: "Northern Territory", count: 30 },
          { name: "Victoria", count: 10 }
        ]
      },
      { name: "Papua New Guinea", count: 45 },
      { name: "New Zealand", count: 25 },
      { name: "Fiji", count: 5 }
    ]
  },
  {
    id: "north-america",
    name: "North America",
    count: 380,
    imageColor: "bg-indigo-100",
    countries: [
      { 
        name: "Canada", 
        count: 220, 
        trending: true,
        subregions: [
          { name: "Ontario", count: 60 },
          { name: "Quebec", count: 55 },
          { name: "British Columbia", count: 45 },
          { name: "Saskatchewan", count: 20 }
        ]
      },
      { 
        name: "United States", 
        count: 140, 
        trending: true,
        subregions: [
          { name: "Nevada", count: 45 },
          { name: "Arizona", count: 30 },
          { name: "Alaska", count: 20 }
        ]
      },
      { name: "Mexico", count: 20 }
    ]
  },
  {
    id: "south-america",
    name: "South America",
    count: 210,
    imageColor: "bg-green-100",
    countries: [
      { name: "Chile", count: 85, trending: true },
      { name: "Peru", count: 60, trending: true },
      { name: "Brazil", count: 45 },
      { name: "Argentina", count: 15 },
      { name: "Colombia", count: 5 }
    ]
  },
  {
    id: "africa",
    name: "Africa",
    count: 180,
    imageColor: "bg-yellow-100",
    countries: [
      { name: "South Africa", count: 45, trending: true },
      { name: "Ghana", count: 25 },
      { name: "Mali", count: 20 },
      { name: "DRC", count: 30 },
      { name: "Tanzania", count: 15 },
      { name: "Namibia", count: 15 },
      { name: "Botswana", count: 10 }
    ]
  },
  {
    id: "europe",
    name: "Europe",
    count: 95,
    imageColor: "bg-slate-200",
    countries: [
      { name: "Sweden", count: 20 },
      { name: "Finland", count: 18 },
      { name: "Spain", count: 15 },
      { name: "Portugal", count: 12 },
      { name: "Serbia", count: 10 }
    ]
  },
  {
    id: "asia",
    name: "Asia",
    count: 85,
    imageColor: "bg-red-50",
    countries: [
      { name: "Indonesia", count: 30 },
      { name: "Mongolia", count: 20 },
      { name: "Kazakhstan", count: 15 },
      { name: "Philippines", count: 10 }
    ]
  },
  {
    id: "middle-east",
    name: "Middle East",
    count: 40,
    imageColor: "bg-orange-100",
    countries: [
      { name: "Saudi Arabia", count: 25 },
      { name: "Turkey", count: 15 }
    ]
  }
];
