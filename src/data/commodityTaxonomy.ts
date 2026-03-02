
export interface Commodity {
  id: string;
  name: string;
  count: number;
  trending?: boolean;
}

export interface Sector {
  id: string;
  name: string;
  description: string;
  commodities: Commodity[];
  totalListings: number;
  imageColor: string; // Tailwind class for placeholder background
}

export const COMMODITY_TAXONOMY: Sector[] = [
  {
    id: "precious-metals",
    name: "Precious Metals",
    description: "High-value metals including gold, silver, and PGMs.",
    totalListings: 412,
    imageColor: "bg-yellow-100",
    commodities: [
      { id: "gold", name: "Gold", count: 285, trending: true },
      { id: "silver", name: "Silver", count: 84 },
      { id: "platinum", name: "Platinum", count: 28 },
      { id: "palladium", name: "Palladium", count: 15 },
    ]
  },
  {
    id: "base-metals",
    name: "Base Metals",
    description: "Common industrial metals essential for infrastructure.",
    totalListings: 356,
    imageColor: "bg-orange-100",
    commodities: [
      { id: "copper", name: "Copper", count: 142, trending: true },
      { id: "zinc", name: "Zinc", count: 89 },
      { id: "nickel", name: "Nickel", count: 65 },
      { id: "lead", name: "Lead", count: 42 },
      { id: "tin", name: "Tin", count: 18 },
    ]
  },
  {
    id: "battery-metals",
    name: "Battery Metals",
    description: "Critical minerals powering the energy transition.",
    totalListings: 289,
    imageColor: "bg-green-100",
    commodities: [
      { id: "lithium", name: "Lithium", count: 156, trending: true },
      { id: "cobalt", name: "Cobalt", count: 45 },
      { id: "graphite", name: "Graphite", count: 52 },
      { id: "vanadium", name: "Vanadium", count: 24 },
      { id: "manganese", name: "Manganese", count: 12 },
    ]
  },
  {
    id: "bulk-commodities",
    name: "Bulk Commodities",
    description: "High-volume raw materials for steel and energy.",
    totalListings: 198,
    imageColor: "bg-slate-200",
    commodities: [
      { id: "iron-ore", name: "Iron Ore", count: 85 },
      { id: "coal-thermal", name: "Thermal Coal", count: 45 },
      { id: "coal-coking", name: "Coking Coal", count: 38 },
      { id: "bauxite", name: "Bauxite", count: 30 },
    ]
  },
  {
    id: "specialty-metals",
    name: "Specialty Metals",
    description: "Rare and specialized metals for high-tech applications.",
    totalListings: 145,
    imageColor: "bg-purple-100",
    commodities: [
      { id: "ree", name: "Rare Earth Elements", count: 68, trending: true },
      { id: "tungsten", name: "Tungsten", count: 25 },
      { id: "molybdenum", name: "Molybdenum", count: 22 },
      { id: "scandium", name: "Scandium", count: 15 },
      { id: "niobium", name: "Niobium", count: 15 },
    ]
  },
  {
    id: "industrial-minerals",
    name: "Industrial Minerals",
    description: "Non-metallic minerals used in various industries.",
    totalListings: 112,
    imageColor: "bg-stone-100",
    commodities: [
      { id: "potash", name: "Potash", count: 35 },
      { id: "phosphate", name: "Phosphate", count: 28 },
      { id: "silica", name: "Silica Sand", count: 24 },
      { id: "mineral-sands", name: "Mineral Sands", count: 25 },
    ]
  },
  {
    id: "non-renewable-energy",
    name: "Non-Renewable Energy",
    description: "Traditional energy sources including uranium.",
    totalListings: 85,
    imageColor: "bg-red-50",
    commodities: [
      { id: "uranium", name: "Uranium", count: 65, trending: true },
      { id: "oil-gas", name: "Oil & Gas", count: 20 },
    ]
  },
  {
    id: "renewable-energy",
    name: "Renewable Energy",
    description: "Sustainable energy projects and assets.",
    totalListings: 124,
    imageColor: "bg-emerald-100",
    commodities: [
      { id: "solar", name: "Solar", count: 45 },
      { id: "wind", name: "Wind", count: 38 },
      { id: "hydro", name: "Hydro", count: 22 },
      { id: "geothermal", name: "Geothermal", count: 19 },
    ]
  }
];
