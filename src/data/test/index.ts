import eco from "@/assets/images/miner-plans/eco.png";
import ecoLayer from "@/assets/images/miner-plans/eco-layer.png";
import standard from "@/assets/images/miner-plans/standard.png";
import standardLayer from "@/assets/images/miner-plans/standard-layer.png";
import gold from "@/assets/images/miner-plans/gold.png";
import goldLayer from "@/assets/images/miner-plans/gold-layer.png";

export const minerPlans = [
  {
    plan: "Eco",
    speed: 10,
    availability: "In Stock",
    withdrawal: 1,
    contract: "30 days",
    icon: eco,
    color: "#fffffF",
    layer: ecoLayer,
    price: 10,
  },
  {
    plan: "Standard",
    speed: 20,
    availability: "In Stock",
    withdrawal: 0.9,
    contract: "30 days",
    icon: standard,
    color: "#FFFFCE",
    layer: standardLayer,
    price: 20,
  },
  {
    plan: "Gold",
    speed: 30,
    availability: "In Stock",
    withdrawal: 0.8,
    contract: "30 days",
    icon: gold,
    color: "#FDF400",
    layer: goldLayer,
    price: 30,
  },
];
