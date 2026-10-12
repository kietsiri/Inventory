export interface MonitorMasterItem {
  name: string;
  panel: string;
  model: string;
  img: string;
}

export const MONITOR_MASTER: { [key: number]: MonitorMasterItem } = {
  1: { name: 'AOC 24G2SP Gaming', panel: '23.8" IPS 165Hz 1ms', model: '24G2SP', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80' },
  2: { name: 'ViewSonic VX2428', panel: '24" Fast IPS 180Hz', model: 'VX2428', img: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&q=80' },
  3: { name: 'Acer Nitro VG240Y', panel: '23.8" FHD IPS 180Hz', model: 'VG240Y-M3', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80' },
  4: { name: 'MSI G244F E2 Esports', panel: '23.8" Rapid IPS 180Hz', model: 'G244F-E2', img: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&q=80' },
  5: { name: 'Gigabyte G24F 2 Gaming', panel: '23.8" SS IPS 180Hz', model: 'G24F-2', img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80' },
  6: { name: 'ASUS TUF Gaming VG249Q3A', panel: '23.8" Fast IPS 180Hz', model: 'VG249Q3A', img: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=500&q=80' },
  7: { name: 'LG UltraGear 24GN65R-B', panel: '24" IPS 144Hz 1ms HDR', model: '24GN65R', img: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=500&q=80' },
  8: { name: 'BenQ MOBIUZ EX240N', panel: '23.8" VA 165Hz TreVolo', model: 'EX240N', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80' },
  9: { name: 'Lenovo Legion R25i-30', panel: '24.5" FHD IPS 180Hz', model: 'R25i-30', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80' },
  10: { name: 'Dell G2524H Fast Gaming', panel: '24.5" Fast IPS 280Hz', model: 'G2524H', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80' },
  11: { name: 'Samsung Odyssey G3 G30D', panel: '24" FHD 180Hz FreeSync', model: 'S24DG30', img: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=500&q=80' },
  12: { name: 'Philips Evnia 25M2N3200W', panel: '24.5" Fast VA 240Hz 0.5ms', model: '25M2N3200W', img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&q=80' },
  13: { name: 'Xiaomi G24i Fast IPS', panel: '23.8" IPS 180Hz HDR10', model: 'P24FBA-RG', img: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&q=80' },
  14: { name: 'HKC MG24G3F Esports', panel: '23.8" Fast IPS 165Hz', model: 'MG24G3F', img: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=500&q=80' },
  15: { name: 'Titan Army P24H2G Pro', panel: '24" Fast IPS 180Hz FreeSync', model: 'P24H2G', img: 'https://images.unsplash.com/photo-1545665277-5937489579f2?w=500&q=80' },
  16: { name: 'BenQ ZOWIE XL2411K Pro', panel: '24" TN 144Hz DyAc Esports', model: 'XL2411K', img: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=500&q=80' },
  17: { name: 'KOORUI 24E3 Gaming Pro', panel: '24" FHD IPS 165Hz 1ms', model: '24E3', img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80' },
  18: { name: 'ASRock Phantom Gaming PG27F15RS1A', panel: '27" Curved 240Hz 1ms', model: 'PG27F15RS', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80' },
  19: { name: 'Z-Edge UG24 Curved', panel: '24" 165Hz 1500R FreeSync', model: 'UG24', img: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&q=80' },
  20: { name: 'Sceptre E248B-FPT168', panel: '24" IPS 165Hz DisplayPort', model: 'E248B', img: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&q=80' },
  21: { name: 'ASUS TUF VG27AQ3A QHD', panel: '27" 2K Fast IPS 180Hz ELMB', model: 'VG27AQ3A', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80' },
  22: { name: 'LG UltraGear 27GN800-B', panel: '27" QHD IPS 144Hz 1ms HDR10', model: '27GN800', img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80' },
  23: { name: 'Gigabyte M27Q Rev 2.0', panel: '27" QHD SS IPS 170Hz KVM', model: 'M27Q-V2', img: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=500&q=80' },
  24: { name: 'MSI MAG 274QRF-QD E2', panel: '27" Rapid IPS 180Hz WQHD', model: 'MAG-274QRF', img: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=500&q=80' },
  25: { name: 'Dell UltraSharp U2724D', panel: '27" 2K Black IPS 120Hz 100% sRGB', model: 'U2724D', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80' },
  26: { name: 'Samsung Odyssey G5 G55C', panel: '27" 1000R QHD 165Hz 1ms', model: 'S27CG55', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80' },
  27: { name: 'BenQ MOBIUZ EX2710Q', panel: '27" 2K 165Hz HDRi TreVolo 2.1', model: 'EX2710Q', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80' },
  28: { name: 'AOC Q27G2S/EU Gaming', panel: '27" QHD IPS 165Hz G-Sync', model: 'Q27G2S', img: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=500&q=80' },
  29: { name: 'Acer Predator XB273U V3', panel: '27" WQHD 180Hz Agile-Splendor', model: 'XB273U-V3', img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&q=80' },
  30: { name: 'ViewSonic OMNI VX2728-2K', panel: '27" Fast IPS 180Hz QHD', model: 'VX2728-2K', img: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&q=80' },
  31: { name: 'HP OMEN 27q Gaming', panel: '27" QHD 165Hz 99% sRGB HDR', model: 'OMEN-27Q', img: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=500&q=80' },
  32: { name: 'Lenovo Legion Y27h-30', panel: '27" QHD 180Hz USB-C 75W', model: 'Y27h-30', img: 'https://images.unsplash.com/photo-1545665277-5937489579f2?w=500&q=80' },
  33: { name: 'ASUS ProArt PA278CV', panel: '27" 2K Calman Verified USB-C', model: 'PA278CV', img: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=500&q=80' },
  34: { name: 'Corsair XENEON 32QHD165', panel: '32" QHD IPS 165Hz Quantum Dot', model: '32QHD165', img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80' },
  35: { name: 'Gigabyte M28U UHD 4K', panel: '28" 4K SS IPS 144Hz 1ms KVM', model: 'M28U-4K', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80' },
  36: { name: 'BenQ ZOWIE XL2546K Pro', panel: '24.5" TN 240Hz DyAc⁺ Esports', model: 'XL2546K', img: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&q=80' },
  37: { name: 'MSI Optix MAG281URF 4K', panel: '27.9" Rapid IPS 4K 144Hz HDMI2.1', model: 'MAG281URF', img: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&q=80' },
  38: { name: 'Samsung Odyssey G6 OLED', panel: '27" QHD OLED 360Hz 0.03ms', model: 'G60SD-27', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80' },
  39: { name: 'ASUS ROG Strix XG27ACS', panel: '27" Fast IPS 180Hz Type-C', model: 'XG27ACS', img: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=500&q=80' },
  40: { name: 'LG UltraGear 27GR83Q-B', panel: '27" QHD IPS 240Hz 1ms G-Sync', model: '27GR83Q', img: 'https://images.unsplash.com/photo-1616763355548-1b606f439f86?w=500&q=80' },
  41: { name: 'BenQ ZOWIE XL2566K Esports', panel: '24.5" Fast TN 360Hz DyAc⁺', model: 'XL2566K', img: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=500&q=80' },
  42: { name: 'ASUS ROG Swift PG27AQDM OLED', panel: '27" QHD OLED 240Hz 0.03ms', model: 'PG27AQDM', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80' },
  43: { name: 'LG UltraGear 27GR95QE-B OLED', panel: '27" QHD OLED 240Hz G-SYNC', model: '27GR95QE', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80' },
  44: { name: 'Alienware AW3423DWF QD-OLED', panel: '34" Curved WQHD 165Hz HDR TrueBlack', model: 'AW-3423DWF', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80' },
  45: { name: 'Samsung Odyssey OLED G8', panel: '34" UWQHD 175Hz Neo Quantum Neo', model: 'G85SB-34', img: 'https://images.unsplash.com/photo-1591370874773-6702e8f12fd8?w=500&q=80' },
  46: { name: 'MSI MPG 271QRX QD-OLED', panel: '27" 2K QD-OLED 360Hz 0.03ms', model: '271QRX', img: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&q=80' },
  47: { name: 'ASUS ROG Swift OLED PG32UCDM', panel: '32" 4K QD-OLED 240Hz Gen 3', model: 'PG32UCDM', img: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500&q=80' },
  48: { name: 'LG UltraGear 32GS95UE Dual-Mode', panel: '32" 4K 240Hz & FHD 480Hz OLED', model: '32GS95UE', img: 'https://images.unsplash.com/photo-1517059224940-d4af9eec41b7?w=500&q=80' },
  49: { name: 'Samsung Odyssey Neo G9 57"', panel: '57" Dual 4K Curved 240Hz Mini-LED', model: 'G95NC-57', img: 'https://images.unsplash.com/photo-1545665277-5937489579f2?w=500&q=80' },
  50: { name: 'Alienware AW3225QF 4K QD-OLED', panel: '32" 4K Curved 240Hz Dolby Vision', model: 'AW-3225QF', img: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?w=500&q=80' },
  51: { name: 'Corsair XENEON FLEX 45WQHD240', panel: '45" Bendable OLED 240Hz Ultrawide', model: '45WQHD240', img: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&q=80' },
  52: { name: 'ASUS ROG Swift Pro PG248QP 540Hz', panel: '24.1" Esports TN 540Hz ULMB 2', model: 'PG248QP', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80' },
  53: { name: 'Acer Predator X32 X 4K OLED', panel: '31.5" UHD OLED 240Hz FreeSync Prem', model: 'X32-X', img: 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&q=80' },
  54: { name: 'BenQ ZOWIE XL2586X Fast TN', panel: '24.1" Fast TN 540Hz DyAc 2', model: 'XL2586X', img: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?w=500&q=80' },
  55: { name: 'Dell UltraSharp 6K U3224KB', panel: '31.5" 6K IPS Black HDR600 4K Cam', model: 'U3224KB', img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80' },
};
// ฟังก์ชันสุ่มสต็อกตาม ID สินค้า (เพื่อให้แต่ละรุ่นมีจำนวนสต็อกคงเหลือสมจริง)
export const getMonitorStock = (id: number): number => {
  const stockSeed = [18, 5, 24, 2, 0, 12, 7, 30, 4, 15, 3, 22, 8, 1, 16];
  return stockSeed[id % stockSeed.length];
};