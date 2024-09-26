export const productCategories = [
  "Smartphones",
  "Tablets",
  "Laptops",
  "Wearables",
  "Audio Devices",
  "Smart Home Devices",
  "Cameras",
  "Drones",
  "Gaming Consoles",
  "Computer Accessories",
  "Networking Equipment",
  "Home Entertainment",
  "Virtual Reality (VR) Devices",
  "Health Tech Gadgets",
  "Other",
];

export const productCategoryOptions = productCategories.map((category) => ({
  label: category,
  value: category,
}));

export const operatingSystems = [
  "Windows",
  "macOS",
  "Linux",
  "Android",
  "iOS",
  "Chrome OS",
  "Ubuntu",
  "Fedora",
  "Debian",
  "Red Hat Enterprise Linux",
  "CentOS",
  "FreeBSD",
  "Kali Linux",
  "Tizen",
  "HarmonyOS",
  "Other",
];

export const operatingSystemOptions = operatingSystems.map((os) => ({
  label: os,
  value: os,
}));

export const connectivity = [
  "Bluetooth",
  "Wi-Fi",
  "Ethernet",
  "GSM",
  "CDMA",
  "3G",
  "4G",
  "WiMAX",
  "Wi-Fi Direct",
  "Wi-Fi Hotspot",
  "USB-C",
  "USB 3.0",
  "USB 2.0",
  "Other",
];

export const connectivityOptions = connectivity.map((c) => ({
  label: c,
  value: c,
}));

const powerSources = ["Battery", "Plug-in", "Other"];
export const powerSourceOptions = powerSources.map((ps) => ({
  label: ps,
  value: ps,
}));
