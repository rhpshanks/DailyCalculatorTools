import { useEffect } from 'react';

export default function AdSidebar() {
  useEffect(() => {
    try {
      // Query only uninitialized adsbygoogle containers to prevent duplicate push errors
      const ads = document.querySelectorAll('.adsbygoogle:not([data-adsbygoogle-status])');
      ads.forEach(() => {
        try {
          ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        } catch (err) {
          console.error('AdSense individual push error', err);
        }
      });
    } catch (e) {
      console.error('AdSense script error', e);
    }
  }, []);

  return (
    <div className="hidden lg:flex flex-col gap-6 w-[300px] flex-shrink-0 sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto pb-6">
      <div className="flex flex-col items-center w-full">
        <span className="text-xs text-[var(--theme-text-muted)] mb-1.5 uppercase tracking-wider font-bold">Advertisement</span>
        <div className="w-[300px] min-h-[250px] bg-zinc-50 dark:bg-zinc-900/20 border border-[var(--theme-border)] rounded flex items-center justify-center overflow-hidden">
          <ins className="adsbygoogle"
               style={{ display: 'block', width: '100%', minHeight: '250px' }}
               data-ad-client="ca-pub-8869440014127177"
               data-ad-slot="1196308389"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        <span className="text-xs text-[var(--theme-text-muted)] mb-1.5 uppercase tracking-wider font-bold">Advertisement</span>
        <div className="w-[300px] min-h-[250px] bg-zinc-50 dark:bg-zinc-900/20 border border-[var(--theme-border)] rounded flex items-center justify-center overflow-hidden">
          <ins className="adsbygoogle"
               style={{ display: 'block', width: '100%', minHeight: '250px' }}
               data-ad-client="ca-pub-8869440014127177"
               data-ad-slot="1196308389"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      </div>
    </div>
  );
}
