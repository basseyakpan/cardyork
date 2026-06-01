export default function SupportPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-extrabold text-on-surface mb-2">Help & Support</h2>
        <p className="text-on-surface-variant">Need assistance? We're here to help you 24/7.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 flex flex-col items-center text-center gap-3 hover:border-primary/50 cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">💬</div>
          <h3 className="font-bold text-on-surface">Live Chat</h3>
          <p className="text-sm text-on-surface-variant">Talk to our support team instantly.</p>
        </div>
        <div className="glass-card p-6 flex flex-col items-center text-center gap-3 hover:border-primary/50 cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-2xl">📧</div>
          <h3 className="font-bold text-on-surface">Email Us</h3>
          <p className="text-sm text-on-surface-variant">support@cardyork.com</p>
        </div>
        <div className="glass-card p-6 flex flex-col items-center text-center gap-3 hover:border-primary/50 cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-2xl">📞</div>
          <h3 className="font-bold text-on-surface">Call Us</h3>
          <p className="text-sm text-on-surface-variant">+234 800 CARDYORK</p>
        </div>
      </div>

      <div className="glass-card p-6 mt-4">
        <h3 className="text-xl font-bold text-on-surface mb-6">Frequently Asked Questions</h3>
        <div className="flex flex-col gap-4">
          {[
            { q: 'How long does it take to process a trade?', a: 'Most gift card trades are processed within 5-15 minutes. High-value cards may occasionally take slightly longer for verification.' },
            { q: 'When will I receive my funds after withdrawal?', a: 'Withdrawals to Nigerian bank accounts are processed instantly. You should receive the alert within minutes.' },
            { q: 'What happens if a trade is rejected?', a: 'If your card is rejected due to invalidity or prior use, the trade status will be marked as Failed, and you will not be credited.' }
          ].map((faq, i) => (
            <div key={i} className="p-4 border border-outline-variant rounded-lg hover:bg-surface-container-low/50 transition-colors cursor-pointer">
              <h4 className="font-semibold text-on-surface">{faq.q}</h4>
              <p className="text-sm text-on-surface-variant mt-2">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
