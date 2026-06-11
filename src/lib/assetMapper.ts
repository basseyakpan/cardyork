export function mapAssetsToCards(assets: any[], rates: any[]) {
  return assets.map(asset => {
    const assetRates = rates.filter(r => r.asset?._id === asset._id);
    const topRate = assetRates.sort((a, b) => b.rate - a.rate)[0];
    
    return {
      id: asset._id,
      brand: asset.name,
      name: asset.name,
      category: topRate?.type || 'Gift Card',
      ratePerDollar: topRate?.rate || 0,
      icon: asset.images?.[0] || '',
      popular: assetRates.length > 0,
      minAmount: topRate?.from || 10,
      maxAmount: topRate?.to || 1000,
    };
  }).filter(c => c.popular).sort((a, b) => b.ratePerDollar - a.ratePerDollar);
}
