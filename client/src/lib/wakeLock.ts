export class WakeLockManager {
  private wakeLock: any = null;

  async request(): Promise<void> {
    if ('wakeLock' in navigator) {
      try {
        this.wakeLock = await (navigator as any).wakeLock.request('screen');
        console.log('[WAKE LOCK] Screen wake lock activated');
      } catch (err) {
        console.error('[WAKE LOCK] Failed to activate:', err);
      }
    }
  }

  async release(): Promise<void> {
    if (this.wakeLock) {
      try {
        await this.wakeLock.release();
        this.wakeLock = null;
        console.log('[WAKE LOCK] Screen wake lock released');
      } catch (err) {
        console.error('[WAKE LOCK] Failed to release:', err);
      }
    }
  }
}

export const wakeLockManager = new WakeLockManager();
