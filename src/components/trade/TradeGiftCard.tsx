'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiUpload, FiCreditCard, FiArrowRight, FiArrowLeft, FiCheck, FiImage, FiX, FiLoader } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { recordGiftCardClick } from '@/store/slices/assetSlice';
import { startTrade } from '@/store/slices/tradeSlice';
import { showToast } from '@/store/slices/uiSlice';
import { compressAndUpload } from '@/lib/imageUtils';

type Step = 'select' | 'details' | 'review';

export function TradeGiftCard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { assets, rates, isLoading: assetsLoading } = useAppSelector((state) => state.assets);
  const { isLoading: tradeLoading } = useAppSelector((state) => state.trade);

  const [currentStep, setCurrentStep] = useState<Step>('select');
  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);
  const [selectedRate, setSelectedRate] = useState<any | null>(null);
  const [cardType, setCardType] = useState('');
  const [country, setCountry] = useState('');
  const [amount, setAmount] = useState('');
  const [cardCode, setCardCode] = useState('');
  const [cardPin, setCardPin] = useState('');
  const [comments, setComments] = useState('');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [receiptImages, setReceiptImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const steps = [
    { id: 'select', label: 'Select Card', icon: FiCreditCard },
    { id: 'details', label: 'Card Details', icon: FiUpload },
    { id: 'review', label: 'Review', icon: FiCheck },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const assetRates = useMemo(() => {
    if (!selectedAsset) return [];
    return rates.filter((r) => r.asset?._id === selectedAsset._id);
  }, [rates, selectedAsset]);

  const availableCountries = useMemo(() => {
    return [...new Set(assetRates.map((r) => r.country))].sort();
  }, [assetRates]);

  const availableTypes = useMemo(() => {
    if (!country) return [];
    const pool = assetRates.filter((r) => r.country === country);
    return [...new Set(pool.map((r) => r.type))].sort();
  }, [assetRates, country]);

  useEffect(() => {
    if (!cardType || !country) {
      setSelectedRate(null);
      return;
    }
    const match = assetRates.find((r) => r.type === cardType && r.country === country);
    setSelectedRate(match || null);
  }, [cardType, country, assetRates]);

  const requiresReceipt = cardType
    ? /\breceipt\b/i.test(cardType) && !/\bno\s+receipt\b/i.test(cardType)
    : false;

  let isAmountValid = false;
  let validationMessage = '';

  if (selectedRate && amount) {
    const numAmount = Number(amount);
    if (selectedRate.fixRange) {
      const validAmounts = selectedRate.fixRange.split(',').map((s: string) => Number(s.trim()));
      isAmountValid = validAmounts.includes(numAmount);
      validationMessage = `Accepted fixed amounts: $${selectedRate.fixRange.split(',').join(', $')}`;
    } else if (selectedRate.range_above || !selectedRate.to) {
      isAmountValid = numAmount >= selectedRate.from;
      validationMessage = `Minimum amount is $${selectedRate.from}.`;
    } else {
      isAmountValid = numAmount >= selectedRate.from && numAmount <= selectedRate.to;
      validationMessage = `Minimum amount for this card is $${selectedRate.from} and maximum is $${selectedRate.to}.`;
    }
  }

  const calculatedAmount = isAmountValid ? Number(amount) * selectedRate.rate : 0;

  let amountPlaceholder = 'Enter card amount';
  if (selectedRate) {
    if (selectedRate.fixRange) {
      amountPlaceholder = `Fixed amounts: $${selectedRate.fixRange.split(',').join(', $')}`;
    } else if (selectedRate.range_above || !selectedRate.to) {
      amountPlaceholder = `Minimum $${selectedRate.from}`;
    } else {
      amountPlaceholder = `$${selectedRate.from} – $${selectedRate.to}`;
    }
  }

  const uploadFiles = async (files: FileList, setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setIsUploading(true);
    try {
      const urls = await Promise.all(Array.from(files).map((file) => compressAndUpload(file)));
      setter((prev) => [...prev, ...urls]);
    } catch {
      dispatch(showToast({ message: 'Could not upload one or more images.', type: 'error' }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) uploadFiles(e.target.files, setUploadedImages);
  };

  const handleReceiptUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) uploadFiles(e.target.files, setReceiptImages);
  };

  const removeImage = (index: number) => setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  const removeReceipt = (index: number) => setReceiptImages(receiptImages.filter((_, i) => i !== index));

  const handleNext = () => {
    if (currentStep === 'details') {
      if (!cardType || !country || !amount) {
        dispatch(showToast({ message: 'Please fill all required fields', type: 'error' }));
        return;
      }
      if (uploadedImages.length === 0 && !cardCode) {
        dispatch(showToast({ message: 'Please upload at least one card image or provide code', type: 'error' }));
        return;
      }
      if (requiresReceipt && receiptImages.length === 0) {
        dispatch(showToast({ message: 'Please upload your receipt', type: 'error' }));
        return;
      }
    }
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id as Step);
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id as Step);
    }
  };

  const handleSubmit = async () => {
    if (!user?.userid) return;
    try {
      const allImages = [...uploadedImages, ...receiptImages];
      await dispatch(
        startTrade({
          id: user.userid,
          data: [
            {
              rateSpec: selectedRate?._id,
              images: allImages,
              userAmount: Number(amount),
              quantity: 1,
              comments,
              cardType,
            },
          ],
        }),
      ).unwrap();

      dispatch(showToast({ message: 'Trade Submitted successfully!', type: 'success' }));
      router.push('/dashboard');
    } catch (error: any) {
      dispatch(showToast({ message: error || 'Submission failed. Try again.', type: 'error' }));
    }
  };

  const UploadSection = ({ label, description, images, onUpload, onRemove, inputId }: any) => (
    <div className="space-y-3">
      <label className="input-label mb-0">{label}</label>
      <p className="text-xs text-on-surface-variant font-medium">{description}</p>
      <label htmlFor={inputId} className="block cursor-pointer">
        <div className="border-2 border-dashed border-primary/30 rounded-2xl p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all bg-surface-container/50">
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
            {isUploading ? (
              <FiLoader className="w-6 h-6 text-primary animate-spin" />
            ) : (
              <FiImage className="w-6 h-6 text-primary" />
            )}
          </div>
          <p className="font-medium text-sm mb-1 text-on-surface">
            {isUploading ? 'Uploading…' : 'Click to upload or drag & drop'}
          </p>
          <p className="text-xs text-on-surface-variant">PNG, JPG up to 10MB</p>
        </div>
        <input id={inputId} type="file" accept="image/*" multiple onChange={onUpload} className="hidden" disabled={isUploading} />
      </label>
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((img: string, index: number) => (
            <div key={index} className="relative group">
              <img src={img} alt={`Upload ${index + 1}`} className="w-full h-24 object-cover rounded-xl border border-primary/20" />
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-1 right-1 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiX className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col gap-8 max-w-[1000px]">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-on-surface mb-2">Sell Gift Card</h2>
        <p className="text-on-surface-variant font-medium">Convert your gift cards to cash in just a few steps</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-4">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all ${
                    index <= currentStepIndex
                      ? 'bg-primary text-white shadow-lg shadow-primary/30'
                      : 'bg-surface-container-highest text-on-surface-variant'
                  }`}
                >
                  {index < currentStepIndex ? <FiCheck className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs mt-2 hidden md:block font-bold ${index <= currentStepIndex ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 md:w-32 h-0.5 mx-2 ${index < currentStepIndex ? 'bg-primary' : 'bg-surface-container-highest'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto w-full">
        <div className="glass-card p-6 md:p-8">
          
          {/* Step 1: Select Card */}
          {currentStep === 'select' && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold mb-6 text-on-surface">Select Gift Card Brand</h2>
              {assetsLoading ? (
                <div className="flex justify-center p-12">
                  <FiLoader className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[...assets].sort((a, b) => a.name.localeCompare(b.name)).map((asset) => {
                    const hasRates = rates.some((r) => r.asset?._id === asset._id);
                    return (
                      <button
                        key={asset._id}
                        type="button"
                        onClick={() => {
                          setSelectedAsset(asset);
                          setSelectedRate(null);
                          setCardType('');
                          setCountry('');
                          setAmount('');
                          setUploadedImages([]);
                          setReceiptImages([]);
                          if (hasRates) {
                            setTimeout(() => setCurrentStep('details'), 300);
                          } else {
                            dispatch(showToast({ message: 'This card has no active rates at the moment.', type: 'error' }));
                          }
                        }}
                        className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                          selectedAsset?._id === asset._id ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20 scale-[1.02]' : 'border-primary/10 bg-surface-container hover:border-primary/50'
                        }`}
                      >
                        <div className="w-20 h-12 rounded-xl flex items-center justify-center mb-3">
                          {asset.images?.[0] ? (
                            <img src={asset.images[0]} alt={asset.name} className="w-full h-full object-contain drop-shadow-sm" />
                          ) : (
                            <span className="text-xl font-bold text-on-surface-variant">{asset.name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 font-bold text-center text-xs text-on-surface tracking-wide uppercase">
                          <div className={`w-2 h-2 rounded-full ${(asset as any).cardActive === false ? 'bg-red-500' : 'bg-green-500'}`} />
                          {asset.name}
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Step 2: Details */}
          {currentStep === 'details' && (
            <div className="animate-fade-in flex flex-col gap-6">
              <h2 className="text-xl font-bold mb-2 text-on-surface">Card Details</h2>

              <div className="input-group">
                <label className="input-label">Gift Card Brand</label>
                <select
                  className="input-field appearance-none bg-surface-container"
                  value={selectedAsset?._id || ''}
                  onChange={(e) => {
                    const asset = assets.find((a) => a._id === e.target.value);
                    if (asset) {
                      setSelectedAsset(asset);
                      setCountry('');
                      setCardType('');
                      setAmount('');
                      setUploadedImages([]);
                      setReceiptImages([]);
                    }
                  }}
                >
                  <option value="" disabled>Select brand</option>
                  {[...assets].sort((a, b) => a.name.localeCompare(b.name)).map((asset) => (
                    <option key={asset._id} value={asset._id}>{asset.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="input-group">
                  <label className="input-label">Country</label>
                  <select
                    className="input-field appearance-none bg-surface-container"
                    value={country}
                    onChange={(e) => { setCountry(e.target.value); setCardType(''); }}
                  >
                    <option value="" disabled>Select country</option>
                    {availableCountries.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="input-group">
                  <label className={`input-label ${!country && 'opacity-50'}`}>Card Type</label>
                  <select
                    className="input-field appearance-none bg-surface-container disabled:opacity-50"
                    value={cardType}
                    onChange={(e) => {
                      setCardType(e.target.value);
                      if (user?.userid && selectedAsset) {
                        dispatch(recordGiftCardClick({
                          id: user.userid,
                          assetId: selectedAsset._id,
                          assetName: selectedAsset.name,
                          country: country,
                          type: e.target.value,
                        }) as any);
                      }
                    }}
                    disabled={!country}
                  >
                    <option value="" disabled>{country ? 'Select card type' : 'Select country first'}</option>
                    {availableTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label flex items-baseline justify-between">
                  <span>Card Amount (USD)</span>
                  {selectedRate && (
                    <span className="text-[10px] uppercase text-on-surface-variant tracking-widest">
                      {selectedRate.fixRange ? `Fixed: $${selectedRate.fixRange.split(',').join(', $')}` : 
                       selectedRate.range_above || !selectedRate.to ? `Min: $${selectedRate.from}` : `Range: $${selectedRate.from} – $${selectedRate.to}`}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-bold">$</span>
                  <input
                    type="number"
                    placeholder={amountPlaceholder}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {selectedRate && selectedRate.rateActive === false && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold flex items-start gap-3">
                  <FiX className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="flex-1">We are unable to redeem {selectedAsset?.name} at the moment due to an issue beyond our control. Our team is working to resolve this as soon as possible.</p>
                </div>
              )}

              {cardType.toLowerCase().includes('e-code') && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="input-label">Card Code</label>
                    <input type="text" placeholder="Enter gift card code" value={cardCode} onChange={(e) => setCardCode(e.target.value)} className="input-field" />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Card PIN (optional)</label>
                    <input type="text" placeholder="Enter PIN" value={cardPin} onChange={(e) => setCardPin(e.target.value)} className="input-field" />
                  </div>
                </div>
              )}

              {amount && selectedRate && selectedRate.rateActive !== false && (
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center p-5 rounded-xl bg-surface-container/50 border border-primary/10">
                    <span className="text-sm text-on-surface-variant font-bold uppercase tracking-widest">Current Rate</span>
                    <div className="text-xl font-bold text-secondary">₦{selectedRate.rate} / $1</div>
                  </div>

                  {!isAmountValid && Number(amount) > 0 ? (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold">
                      {validationMessage}
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
                      <span className="text-sm font-bold text-primary uppercase tracking-widest">Estimated Payout</span>
                      <span className="text-3xl font-black text-secondary">₦{calculatedAmount.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="h-px w-full bg-primary/10 my-2" />

              {requiresReceipt && (
                <UploadSection label="Receipt Upload" description="Upload a clear photo of your receipt" images={receiptImages} onUpload={handleReceiptUpload} onRemove={removeReceipt} inputId="receipt-upload" />
              )}
              <UploadSection label={requiresReceipt ? "Card Images (optional)" : "Card Images"} description="Upload clear photos of the front and back of your gift card" images={uploadedImages} onUpload={handleImageUpload} onRemove={removeImage} inputId="card-upload" />
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 'review' && (
            <div className="animate-fade-in flex flex-col gap-6">
              <h2 className="text-xl font-bold mb-2 text-on-surface">Review Your Trade</h2>
              
              <div className="p-6 rounded-2xl bg-surface-container/50 border border-primary/10 flex flex-col gap-4">
                <div className="flex items-center gap-4 border-b border-primary/10 pb-4">
                  <div className="w-14 h-10 rounded-lg bg-white flex items-center justify-center p-1">
                    {selectedAsset?.images?.[0] ? (
                      <img src={selectedAsset.images[0]} alt={selectedAsset.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="font-bold text-gray-400">{selectedAsset?.name?.charAt(0)}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface">{selectedAsset?.name}</h3>
                    <p className="text-xs text-on-surface-variant uppercase tracking-widest">{country} • {cardType}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-4 pt-2">
                  <div>
                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mb-1">Trade Amount</p>
                    <p className="font-bold text-on-surface">${amount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mb-1">Exchange Rate</p>
                    <p className="font-bold text-secondary">₦{selectedRate?.rate}/$</p>
                  </div>
                  {cardCode && (
                    <div className="col-span-2">
                      <p className="text-xs text-on-surface-variant font-bold uppercase tracking-widest mb-1">Card Code</p>
                      <p className="font-mono text-sm bg-surface-container-highest inline-block px-2 py-1 rounded">{cardCode}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
                <span className="text-sm font-bold text-primary uppercase tracking-widest">Total Payout</span>
                <span className="text-3xl font-black text-secondary">₦{calculatedAmount.toLocaleString()}</span>
              </div>

              <div className="input-group">
                <label className="input-label">Additional Comments (Optional)</label>
                <textarea
                  placeholder="Any specific instructions for the admin?"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  className="input-field min-h-[100px] resize-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-secondary/10 border border-secondary/20 flex items-start gap-3">
                <FiCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <p className="text-xs text-on-surface font-medium leading-relaxed">
                  By submitting this trade, you confirm that the provided details and images are accurate and belong to you. Fraudulent trades will lead to account suspension.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-10 pt-6 border-t border-primary/10">
            {currentStep !== 'select' ? (
              <button type="button" onClick={handleBack} className="btn btn-outline-primary" disabled={isUploading || tradeLoading}>
                <FiArrowLeft className="mr-2" /> Back
              </button>
            ) : <div />}

            {currentStep === 'review' ? (
              <button type="button" onClick={handleSubmit} className="btn btn-primary" disabled={tradeLoading || isUploading || !isAmountValid}>
                {tradeLoading ? <FiLoader className="animate-spin mr-2" /> : <FiCheck className="mr-2" />}
                Submit Trade
              </button>
            ) : currentStep !== 'select' ? (
              <button type="button" onClick={handleNext} className="btn btn-primary" disabled={isUploading || (currentStep === 'details' && !isAmountValid)}>
                Next <FiArrowRight className="ml-2" />
              </button>
            ) : null}
          </div>

        </div>
      </div>
    </div>
  );
}
